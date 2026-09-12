import React, { useState } from 'react';
import { DocSection } from '../../types';
import { ChevronRight, ChevronDown, Search } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface DocSidebarProps {
  sections: DocSection[];
  currentSectionSlug: string;
  currentPageSlug: string;
  onSelectPage: (sectionSlug: string, pageSlug: string) => void;
  className?: string;
}

export const DocSidebar: React.FC<DocSidebarProps> = ({
  sections,
  currentSectionSlug,
  currentPageSlug,
  onSelectPage,
  className = ''
}) => {
  const { language } = useLanguage();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    sections.forEach(s => {
      initial[s.slug] = s.slug === currentSectionSlug || true;
    });
    return initial;
  });
  const [filterText, setFilterText] = useState('');

  const toggleSection = (slug: string) => {
    setOpenSections(prev => ({
      ...prev,
      [slug]: !prev[slug]
    }));
  };

  const filteredSections = sections.map(section => {
    const matchingPages = section.pages.filter(page =>
      page.title.toLowerCase().includes(filterText.toLowerCase()) ||
      section.title.toLowerCase().includes(filterText.toLowerCase())
    );
    return {
      ...section,
      pages: matchingPages
    };
  }).filter(section => section.pages.length > 0 || !filterText);

  return (
    <aside className={`w-full lg:w-64 shrink-0 border-r border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827] lg:bg-transparent ${className}`}>
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-4 space-y-4 text-sm">
        {/* Quick Filter */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            value={filterText}
            onChange={e => setFilterText(e.target.value)}
            placeholder={language === 'id' ? 'Cari dokumentasi...' : 'Filter documentation...'}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:border-slate-400"
          />
        </div>

        {/* Section List */}
        <nav className="space-y-4">
          {filteredSections.map(section => {
            const isOpen = openSections[section.slug] !== false;
            return (
              <div key={section.id} className="space-y-1">
                <button
                  onClick={() => toggleSection(section.slug)}
                  className="flex items-center justify-between w-full text-left px-2 py-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-mono transition-colors"
                >
                  <span>{section.title}</span>
                  {isOpen ? (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  )}
                </button>

                {isOpen && (
                  <div className="space-y-0.5 pl-2 border-l border-slate-200 dark:border-white/10 ml-2">
                    {section.pages.map(page => {
                      const isActive =
                        section.slug === currentSectionSlug && page.slug === currentPageSlug;
                      return (
                        <button
                          key={page.id}
                          onClick={() => onSelectPage(section.slug, page.slug)}
                          className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition-colors flex items-center justify-between gap-1.5 ${
                            isActive
                              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-medium shadow-2xs'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          <span className="truncate">{page.title}</span>
                          {page.status === 'coming-soon' && (
                            <span className="shrink-0 px-1.5 py-0.5 rounded-full text-[9px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                              Fase 2
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
