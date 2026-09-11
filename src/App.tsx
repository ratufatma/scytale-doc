import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/navigation/Header';
import { Footer } from './components/navigation/Footer';
import { BackToTop } from './components/navigation/BackToTop';
import { MetaManager } from './components/seo/MetaManager';
import { SearchModal } from './components/ui/SearchModal';
import { HomePage } from './pages/HomePage';
import { DocsPage } from './pages/DocsPage';
import { DownloadsPage } from './pages/DownloadsPage';
import { ReleasesPage } from './pages/ReleasesPage';
import { ReleaseDetailPage } from './pages/ReleaseDetailPage';
import { SoftwarePage } from './pages/SoftwarePage';
import { SoftwareDetailPage } from './pages/SoftwareDetailPage';
import { NetworkPage } from './pages/NetworkPage';
import { ProtocolPage } from './pages/ProtocolPage';
import { DevelopersPage } from './pages/DevelopersPage';
import { SearchPage } from './pages/SearchPage';

export default function App() {
  // Normalize current path from window.location
  const getInitialPath = (): string => {
    if (typeof window === 'undefined') return '/';
    // Support both hash routes (e.g. /#docs/intro) and standard paths
    if (window.location.hash && window.location.hash.startsWith('#/')) {
      return window.location.hash.slice(1);
    }
    return window.location.pathname || '/';
  };

  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);

  // Synchronize on popstate and hashchange
  useEffect(() => {
    const handleLocationChange = () => {
      if (window.location.hash && window.location.hash.startsWith('#/')) {
        setCurrentPath(window.location.hash.slice(1));
      } else {
        setCurrentPath(window.location.pathname || '/');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState(null, '', `#${path}`);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route Dispatcher
  const renderCurrentRoute = () => {
    // 1. Home
    if (currentPath === '' || currentPath === '/') {
      return <HomePage onNavigate={navigateTo} />;
    }

    // 2. Documentation: /docs, /docs/:section, /docs/:section/:page
    if (currentPath.startsWith('/docs')) {
      const parts = currentPath.split('/').filter(Boolean);
      // parts[0] === 'docs', parts[1] === section, parts[2] === page
      const sectionSlug = parts[1] || 'intro';
      const pageSlug = parts[2] || (sectionSlug === 'intro' ? 'what-is-scytale' : undefined);

      return (
        <DocsPage
          sectionSlug={sectionSlug}
          pageSlug={pageSlug}
          onNavigate={navigateTo}
        />
      );
    }

    // 3. Downloads: /downloads
    if (currentPath === '/downloads' || currentPath.startsWith('/downloads/')) {
      return <DownloadsPage />;
    }

    // 4. Releases: /releases/:version or /releases
    if (currentPath.startsWith('/releases/')) {
      const version = currentPath.replace('/releases/', '');
      return (
        <ReleaseDetailPage
          version={version}
          onBack={() => navigateTo('/releases')}
          onSelectRelease={v => navigateTo(`/releases/${v}`)}
        />
      );
    }
    if (currentPath === '/releases') {
      return (
        <ReleasesPage
          onSelectRelease={v => navigateTo(`/releases/${v}`)}
        />
      );
    }

    // 5. Software: /software/:slug or /software
    if (currentPath.startsWith('/software/')) {
      const slug = currentPath.replace('/software/', '');
      return (
        <SoftwareDetailPage
          slug={slug}
          onBack={() => navigateTo('/software')}
          onNavigateDoc={docPath => navigateTo(docPath)}
        />
      );
    }
    if (currentPath === '/software') {
      return (
        <SoftwarePage
          onSelectSoftware={slug => navigateTo(`/software/${slug}`)}
          onNavigateDoc={docPath => navigateTo(docPath)}
        />
      );
    }

    // 6. Network: /network
    if (currentPath === '/network') {
      return <NetworkPage />;
    }

    // 7. Protocol: /protocol
    if (currentPath === '/protocol') {
      return <ProtocolPage />;
    }

    // 8. Developers: /developers
    if (currentPath === '/developers') {
      return <DevelopersPage />;
    }

    // 9. Search: /search
    if (currentPath.startsWith('/search')) {
      return <SearchPage onNavigate={navigateTo} />;
    }

    // Fallback: 404 Not Found Page
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500">
          HTTP 404
        </span>
        <h1 className="text-3xl font-bold text-zinc-950 font-mono">Resource Not Found</h1>
        <p className="text-sm text-zinc-600">
          The requested path <code className="font-mono bg-zinc-100 px-1.5 py-0.5 rounded">{currentPath}</code> does not exist in the Scytale portal index.
        </p>
        <div className="pt-4">
          <button
            onClick={() => navigateTo('/')}
            className="px-4 py-2 rounded-lg bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 transition-colors"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  };

  return (
    <LanguageProvider>
      <ThemeProvider>
        <MetaManager currentPath={currentPath} />
        <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased selection:bg-zinc-900 selection:text-white dark:selection:bg-zinc-100 dark:selection:text-zinc-900 transition-colors">
          {/* Header Navigation */}
          <Header
            currentPath={currentPath}
            onNavigate={navigateTo}
            onOpenSearch={() => setSearchModalOpen(true)}
          />

          {/* Main Content View */}
          <main className="flex-1 w-full">
            {renderCurrentRoute()}
          </main>

          {/* Footer Navigation */}
          <Footer onNavigate={navigateTo} />

          {/* Floating Back to Top Button */}
          <BackToTop threshold={300} />

          {/* Search Modal Keyboard Shortcut (Cmd+K) */}
          <SearchModal
            isOpen={searchModalOpen}
            onClose={() => setSearchModalOpen(false)}
            onNavigate={navigateTo}
          />
        </div>
      </ThemeProvider>
    </LanguageProvider>
  );
}
