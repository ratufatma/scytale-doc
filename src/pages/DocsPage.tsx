import React, { useState } from 'react';
import { DOC_SECTIONS } from '../data/docs';
import { DocSidebar } from '../components/documentation/DocSidebar';
import { DocViewer } from '../components/documentation/DocViewer';
import { TableOfContents } from '../components/documentation/TableOfContents';
import { Menu, X, BookOpen } from 'lucide-react';

interface DocsPageProps {
  sectionSlug?: string;
  pageSlug?: string;
  onNavigate: (path: string) => void;
}

export const DocsPage: React.FC<DocsPageProps> = ({
  sectionSlug = 'intro',
  pageSlug = 'what-is-scytale',
  onNavigate
}) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Find active section and page
  const currentSection =
    DOC_SECTIONS.find(s => s.slug === sectionSlug || s.id === sectionSlug) || DOC_SECTIONS[0];
  const currentPage =
    currentSection.pages.find(p => p.slug === pageSlug || p.id === pageSlug) || currentSection.pages[0];

  // Wire prev and next page navigation references
  const allFlatPages = DOC_SECTIONS.flatMap(s =>
    s.pages.map(p => ({
      ...p,
      fullPath: `/docs/${s.slug}/${p.slug}`
    }))
  );

  const currentIndex = allFlatPages.findIndex(p => p.id === currentPage.id);
  const prevPageRef =
    currentIndex > 0
      ? { title: allFlatPages[currentIndex - 1].title, path: allFlatPages[currentIndex - 1].fullPath }
      : undefined;
  const nextPageRef =
    currentIndex < allFlatPages.length - 1
      ? { title: allFlatPages[currentIndex + 1].title, path: allFlatPages[currentIndex + 1].fullPath }
      : undefined;

  const enrichedPage = {
    ...currentPage,
    prevPage: prevPageRef,
    nextPage: nextPageRef
  };

  const handleSelectPage = (newSectionSlug: string, newPageSlug: string) => {
    onNavigate(`/docs/${newSectionSlug}/${newPageSlug}`);
    setMobileSidebarOpen(false);
  };

  return (
    <div className="w-full">
      {/* Mobile documentation bar toggle */}
      <div className="lg:hidden sticky top-16 z-30 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-md border-b border-slate-200 dark:border-white/10 px-4 py-2.5 flex items-center justify-between text-xs font-mono">
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold px-2.5 py-1.5 rounded-md border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800"
        >
          {mobileSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span>{currentSection.title} &bull; {currentPage.title}</span>
        </button>
        <span className="text-slate-500 dark:text-slate-400 text-[11px]">Docs Menu</span>
      </div>

      {/* 3-Column Layout Container */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        {/* Left Column: Sidebar Navigation (Desktop always, Mobile via drawer) */}
        <div className={`lg:block ${mobileSidebarOpen ? 'block' : 'hidden'}`}>
          <DocSidebar
            sections={DOC_SECTIONS}
            currentSectionSlug={currentSection.slug}
            currentPageSlug={currentPage.slug}
            onSelectPage={handleSelectPage}
          />
        </div>

        {/* Center Column: Content Viewer */}
        <DocViewer
          page={enrichedPage}
          onNavigatePage={path => onNavigate(path)}
        />

        {/* Right Column: Table of Contents */}
        <TableOfContents content={currentPage.content} />
      </div>
    </div>
  );
};
