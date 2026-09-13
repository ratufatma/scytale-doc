import React, { useState } from 'react';
import { Search, Menu, X, ExternalLink, Download, ArrowRight, Layers, Sun, Moon, Globe } from 'lucide-react';
import { SITE_CONFIG } from '../../data/config';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate, onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, setLanguage, t } = useLanguage();

  const navLinks = [
    { label: t.nav.docs, path: '/docs' },
    { label: t.nav.downloads, path: '/downloads' },
    { label: t.nav.releases, path: '/releases' },
    { label: t.nav.software, path: '/software' },
    { label: t.nav.network, path: '/network' },
    { label: t.nav.protocol, path: '/protocol' },
    { label: t.nav.devs, path: '/developers' },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => handleLinkClick('/')}
            className="flex items-center gap-2.5 text-left group"
            id="brand-link"
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center shadow-xs border border-slate-200 dark:border-white/10 group-hover:scale-105 transition-transform">
              <img src={`${import.meta.env.BASE_URL}gemini-svg.svg`} alt="Scytale Logo" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white font-mono">
                {SITE_CONFIG.name}
              </span>
              <span className="hidden xl:inline-block ml-2 text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10">
                v{SITE_CONFIG.version}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-400">
            {navLinks.map(link => {
              const active = isActive(link.path);
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    active
                      ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 font-semibold'
                      : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <a
              href={SITE_CONFIG.githubRepositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/60 transition-colors"
            >
              <span>{t.nav.github}</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </nav>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Search Trigger Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 text-slate-500 dark:text-slate-400 text-xs font-mono transition-colors"
            id="search-trigger"
            title="Search documentation and protocols (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <span className="hidden sm:inline">{t.nav.searchPlaceholder}</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded text-slate-400 dark:text-slate-500">
              ⌘K
            </kbd>
          </button>

          {/* Language Switcher Segmented Control */}
          <div className="flex items-center rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-slate-800/80 p-0.5 text-xs font-mono font-medium">
            <button
              type="button"
              onClick={() => setLanguage('id')}
              id="lang-btn-id"
              className={`px-2 py-1 rounded-md transition-all ${
                language === 'id'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Ganti ke Bahasa Indonesia"
              aria-pressed={language === 'id'}
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              id="lang-btn-en"
              className={`px-2 py-1 rounded-md transition-all ${
                language === 'en'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Switch to English"
              aria-pressed={language === 'en'}
            >
              EN
            </button>
          </div>

          {/* Global Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            id="theme-toggle-btn"
            aria-label={theme === 'dark' ? t.nav.themeLight : t.nav.themeDark}
            title={theme === 'dark' ? t.nav.themeLight : t.nav.themeDark}
            className="p-2 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform duration-200 rotate-0 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 transition-transform duration-200 rotate-0 hover:-rotate-12" />
            )}
          </button>

          {/* CTAs */}
          <button
            onClick={() => handleLinkClick('/docs/getting-started/installation')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            id="cta-get-started"
          >
            <span>{t.nav.getStarted}</span>
            <ArrowRight className="w-3 h-3 text-slate-400" />
          </button>

          <button
            onClick={() => handleLinkClick('/downloads')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-950 shadow-xs transition-colors"
            id="cta-download"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.nav.downloadBtn}</span>
          </button>

          {/* Mobile menu hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            id="mobile-menu-toggle"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map(link => (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(link.path)
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                {link.label}
              </button>
            ))}
            <a
              href={SITE_CONFIG.githubRepositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <span>{t.nav.github}</span>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-2">
            <span className="text-xs text-slate-500 font-mono">{t.nav.language}:</span>
            <div className="flex items-center rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-slate-800/80 p-0.5 text-xs font-mono font-medium">
              <button
                type="button"
                onClick={() => setLanguage('id')}
                className={`px-3 py-1 rounded-md transition-all ${
                  language === 'id'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                ID (Indonesia)
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-md transition-all ${
                  language === 'en'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                EN (English)
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-2">
            <span className="text-xs text-slate-500 font-mono">Theme mode:</span>
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-slate-800/80 text-xs font-mono text-slate-700 dark:text-slate-300"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
              <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
          </div>

          <div className="pt-2 grid grid-cols-2 gap-2">
            <button
              onClick={() => handleLinkClick('/docs/getting-started/installation')}
              className="w-full py-2 text-center text-xs font-medium rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              {t.nav.getStarted}
            </button>
            <button
              onClick={() => handleLinkClick('/downloads')}
              className="w-full py-2 text-center text-xs font-medium rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-medium"
            >
              {t.nav.downloadBtn}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
