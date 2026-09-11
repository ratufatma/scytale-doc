import React from 'react';
import { DocContentItem } from '../../types';
import { AlignLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface TableOfContentsProps {
  content: DocContentItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const { language } = useLanguage();
  const headings = content.filter(item => item.type === 'heading' && item.id && item.text);

  if (headings.length === 0) {
    return null;
  }

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="hidden xl:block w-56 shrink-0 text-xs">
      <div className="sticky top-20 pl-4 py-2 border-l border-zinc-200 dark:border-zinc-800 space-y-3">
        <div className="flex items-center gap-1.5 font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider font-mono text-[11px]">
          <AlignLeft className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
          <span>{language === 'id' ? 'Di halaman ini' : 'On this page'}</span>
        </div>

        <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
          {headings.map(h => (
            <li key={h.id}>
              <button
                onClick={() => scrollToHeading(h.id!)}
                className="text-left hover:text-zinc-950 dark:hover:text-white transition-colors line-clamp-1 cursor-pointer"
              >
                {h.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
