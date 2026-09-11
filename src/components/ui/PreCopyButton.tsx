import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface PreCopyButtonProps {
  text: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
}

export const PreCopyButton: React.FC<PreCopyButtonProps> = ({
  text,
  label,
  copiedLabel,
  className = ''
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
        throw new Error('Clipboard unavailable');
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
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
        console.error('Failed to copy code snippet', err);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? defaultCopiedLabel : defaultLabel}
      title={copied ? defaultCopiedLabel : (language === 'id' ? 'Salin kode ke papan klip' : 'Copy code to clipboard')}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium rounded-md transition-all duration-200 cursor-pointer shadow-xs border select-none ${
        copied
          ? 'bg-emerald-950/90 text-emerald-300 border-emerald-700/80 shadow-emerald-950/30'
          : 'bg-zinc-800/90 hover:bg-zinc-700/95 text-zinc-200 hover:text-white border-zinc-700 hover:border-zinc-500'
      } backdrop-blur-xs ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="text-[11px]">{defaultCopiedLabel}</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-200 shrink-0" />
          <span className="text-[11px]">{defaultLabel}</span>
        </>
      )}
    </button>
  );
};
