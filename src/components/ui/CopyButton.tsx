import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface CopyButtonProps {
  text: string;
  label?: string;
  copiedLabel?: string;
  showIconOnly?: boolean;
  className?: string;
  id?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  label,
  copiedLabel,
  showIconOnly = false,
  className = '',
  id
}) => {
  const [copied, setCopied] = useState(false);
  const { language } = useLanguage();

  const defaultLabel = label ?? (language === 'id' ? 'Salin' : 'Copy');
  const defaultCopiedLabel = copiedLabel ?? (language === 'id' ? 'Tersalin' : 'Copied');

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        throw new Error('Clipboard API unavailable');
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text', err);
      }
    }
  };

  return (
    <button
      id={id || `copy-btn-${Math.random().toString(36).substring(2, 7)}`}
      onClick={handleCopy}
      type="button"
      aria-label={copied ? defaultCopiedLabel : defaultLabel}
      className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700 hover:border-zinc-400 transition-colors cursor-pointer ${className}`}
      title={copied ? defaultCopiedLabel : (language === 'id' ? 'Salin ke papan klip' : 'Copy to clipboard')}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          {!showIconOnly && (
            <span className="text-emerald-700 dark:text-emerald-400 font-mono font-medium">
              {defaultCopiedLabel}
            </span>
          )}
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400 shrink-0" />
          {!showIconOnly && <span>{defaultLabel}</span>}
        </>
      )}
    </button>
  );
};
