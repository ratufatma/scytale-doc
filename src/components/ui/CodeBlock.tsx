import React from 'react';
import { CopyButton } from './CopyButton';
import { PreCopyButton } from './PreCopyButton';
import { Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  caption?: string;
  id?: string;
  isTerminal?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'bash',
  caption,
  id,
  isTerminal = false
}) => {
  const blockId = id || `code-block-${Math.random().toString(36).substring(2, 8)}`;

  return (
    <div id={blockId} className="my-4 rounded-lg border border-slate-800 dark:border-white/10 bg-slate-950 text-slate-100 overflow-hidden shadow-sm">
      {/* Code Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800 text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-2">
          {isTerminal || language === 'bash' || language === 'sh' ? (
            <Terminal className="w-3.5 h-3.5 text-slate-400" />
          ) : (
            <span className="w-2 h-2 rounded-full bg-slate-600" />
          )}
          <span>{caption || language.toUpperCase()}</span>
        </div>
        <CopyButton
          text={code}
          className="border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:border-slate-600"
        />
      </div>

      {/* Code Body with hover copy button over <pre> */}
      <div className="relative group/pre p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed text-slate-200">
        <div className="absolute top-2.5 right-2.5 opacity-0 group-hover/pre:opacity-100 focus-within:opacity-100 transition-opacity duration-150 z-10">
          <PreCopyButton text={code} />
        </div>
        <pre className="selection:bg-slate-800">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};
