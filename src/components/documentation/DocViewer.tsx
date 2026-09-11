import React, { useRef } from 'react';
import { DocPage } from '../../types';
import { CodeBlock } from '../ui/CodeBlock';
import { Callout } from '../ui/Callout';
import { PreCopyButton } from '../ui/PreCopyButton';
import { ChevronRight, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { usePreClipboard } from '../../hooks/usePreClipboard';

interface DocViewerProps {
  page: DocPage;
  onNavigatePage: (path: string) => void;
}

export const DocViewer: React.FC<DocViewerProps> = ({ page, onNavigatePage }) => {
  const { language } = useLanguage();
  const articleRef = useRef<HTMLElement>(null);

  // Hook to ensure any dynamic/markdown/raw <pre> tags in the documentation have hover copy buttons
  usePreClipboard(articleRef, language);

  return (
    <article ref={articleRef} className="flex-1 min-w-0 max-w-4xl py-6 px-4 sm:px-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 font-mono mb-6" aria-label="Breadcrumb">
        <button
          onClick={() => onNavigatePage('/docs')}
          className="hover:text-zinc-950 dark:hover:text-white transition-colors"
        >
          {language === 'id' ? 'Dokumentasi' : 'Docs'}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-600" />
        <span className="text-zinc-700 dark:text-zinc-300">{page.sectionTitle}</span>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-600" />
        <span className="text-zinc-950 dark:text-white font-medium truncate">{page.title}</span>
      </nav>

      {/* Page Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 pb-6 mb-8">
        <div className="flex items-center gap-2 text-xs font-mono font-medium text-emerald-700 dark:text-emerald-400 mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{page.sectionTitle}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
          {page.title}
        </h1>
        {page.summary && (
          <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
            {page.summary}
          </p>
        )}
      </header>

      {/* Page Content Stream */}
      <div className="space-y-6 text-zinc-800 dark:text-zinc-200 text-sm sm:text-base leading-relaxed">
        {page.content.map((item, idx) => {
          switch (item.type) {
            case 'heading': {
              const headingClasses =
                item.level === 2
                  ? 'text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white mt-10 mb-4 pt-4 border-t border-zinc-100 dark:border-zinc-800'
                  : 'text-lg font-semibold text-zinc-900 dark:text-zinc-100 mt-6 mb-3';

              if (item.level === 3) {
                return (
                  <h3 key={idx} id={item.id} className={headingClasses}>
                    {item.text}
                  </h3>
                );
              }
              if (item.level === 4) {
                return (
                  <h4 key={idx} id={item.id} className={headingClasses}>
                    {item.text}
                  </h4>
                );
              }
              return (
                <h2 key={idx} id={item.id} className={headingClasses}>
                  {item.text}
                </h2>
              );
            }

            case 'paragraph':
              return (
                <p key={idx} className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {item.text}
                </p>
              );

            case 'code':
              return (
                <CodeBlock
                  key={idx}
                  code={item.code || ''}
                  language={item.language || 'bash'}
                  caption={item.caption}
                  isTerminal={item.language === 'bash' || item.language === 'sh'}
                />
              );

            case 'callout':
              return (
                <Callout key={idx} type={item.calloutType || 'note'}>
                  {item.text}
                </Callout>
              );

            case 'list':
              return (
                <ul key={idx} className="my-4 space-y-2 list-disc list-inside text-zinc-700 dark:text-zinc-300 text-sm pl-2">
                  {item.items?.map((li, lIdx) => (
                    <li key={lIdx} className="leading-relaxed">
                      {li}
                    </li>
                  ))}
                </ul>
              );

            case 'table':
              return (
                <div key={idx} className="my-6 overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    {item.table?.headers && (
                      <thead className="bg-zinc-50 dark:bg-zinc-800/70 border-b border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 font-semibold font-mono text-xs">
                        <tr>
                          {item.table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="px-4 py-3 border-r border-zinc-200 dark:border-zinc-700 last:border-r-0">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                    )}
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900 font-sans">
                      {item.table?.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40">
                          {row.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className="px-4 py-2.5 border-r border-zinc-200 dark:border-zinc-800 last:border-r-0 text-zinc-700 dark:text-zinc-300"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );

            case 'diagram':
              return (
                <div
                  key={idx}
                  className="relative group/pre my-6 p-4 rounded-lg bg-zinc-950 text-zinc-200 font-mono text-xs overflow-x-auto border border-zinc-800 leading-tight"
                >
                  <div className="absolute top-2.5 right-2.5 opacity-0 group-hover/pre:opacity-100 focus-within:opacity-100 transition-opacity duration-150 z-10">
                    <PreCopyButton text={item.diagramContent || ''} />
                  </div>
                  <pre className="selection:bg-zinc-800">{item.diagramContent}</pre>
                </div>
              );

            default:
              return null;
          }
        })}
      </div>

      {/* Prev / Next Pagination */}
      <div className="mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
        {page.prevPage ? (
          <button
            onClick={() => onNavigatePage(page.prevPage!.path)}
            className="flex items-center gap-2 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-left transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-zinc-400" />
            <div>
              <span className="block text-[10px] uppercase font-mono text-zinc-400">{language === 'id' ? 'Sebelumnya' : 'Previous'}</span>
              <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{page.prevPage.title}</span>
            </div>
          </button>
        ) : (
          <div />
        )}

        {page.nextPage ? (
          <button
            onClick={() => onNavigatePage(page.nextPage!.path)}
            className="flex items-center gap-2 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-right transition-colors"
          >
            <div>
              <span className="block text-[10px] uppercase font-mono text-zinc-400">{language === 'id' ? 'Berikutnya' : 'Next'}</span>
              <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{page.nextPage.title}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-400" />
          </button>
        ) : (
          <div />
        )}
      </div>
    </article>
  );
};
