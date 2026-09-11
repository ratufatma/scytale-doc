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
    <aside className={`w-full lg:w-64 shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 lg:bg-transparent ${className}`}>
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-4 space-y-4 text-sm">
        {/* Quick Filter */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-zinc-400 dark:text-zinc-500" />
          <input
            type="text"
            value={filterText}
            onChange={e => setFilterText(e.target.value)}
            placeholder={language === 'id' ? 'Cari dokumentasi...' : 'Filter documentation...'}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-hidden focus:border-zinc-400"
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
                  className="flex items-center justify-between w-full text-left px-2 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 font-mono transition-colors"
                >
                  <span>{section.title}</span>
                  {isOpen ? (
                    <ChevronDown className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
                  )}
                </button>

                {isOpen && (
                  <div className="space-y-0.5 pl-2 border-l border-zinc-200 dark:border-zinc-800 ml-2">
                    {section.pages.map(page => {
                      const isActive =
                        section.slug === currentSectionSlug && page.slug === currentPageSlug;
                      return (
                        <button
                          key={page.id}
                          onClick={() => onSelectPage(section.slug, page.slug)}
                          className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition-colors block ${
                            isActive
                              ? 'bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 font-medium shadow-2xs'
                              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
                          }`}
                        >
                          {page.title}
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
