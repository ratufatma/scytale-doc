import React from 'react';
import { SOFTWARE_CATALOG } from '../data/software';
import { SoftwareCard } from '../components/software/SoftwareCard';
import { Package, GitFork } from 'lucide-react';
import { SITE_CONFIG } from '../data/config';
import { useLanguage } from '../context/LanguageContext';

interface SoftwarePageProps {
  onSelectSoftware: (slug: string) => void;
  onNavigateDoc: (path: string) => void;
}

export const SoftwarePage: React.FC<SoftwarePageProps> = ({
  onSelectSoftware,
  onNavigateDoc
}) => {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-white/10 pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <Package className="w-4 h-4 text-slate-700 dark:text-slate-300" />
          <span>{t.software.badge}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-mono">
          {t.software.title}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          {t.software.description}
        </p>
      </header>

      {/* Grid of software */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SOFTWARE_CATALOG.map(software => (
          <SoftwareCard
            key={software.id}
            software={software}
            onSelect={onSelectSoftware}
            onNavigateDoc={onNavigateDoc}
          />
        ))}
      </div>

      {/* Open Source Notice */}
      <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#111827] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10">
            <GitFork className="w-4 h-4 text-slate-700 dark:text-slate-300" />
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">
              {language === 'id' ? 'Arsitektur Modular & Terbuka' : 'Extensible Architecture'}
            </p>
            <p className="text-slate-500 dark:text-slate-400">
              {language === 'id'
                ? 'Semua aplikasi berkomunikasi melalui protokol standar Scytale JSON-RPC/IPC atau framing jaringan P2P.'
                : 'All applications communicate via the standard Scytale JSON-RPC/IPC protocol or P2P wire framing.'}
            </p>
          </div>
        </div>
        <a
          href={SITE_CONFIG.githubRepositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 text-white font-medium transition-colors shrink-0"
        >
          <span>{language === 'id' ? 'Jelajahi Repositori Kode' : 'Explore Source Repositories'}</span>
        </a>
      </div>
    </div>
  );
};
