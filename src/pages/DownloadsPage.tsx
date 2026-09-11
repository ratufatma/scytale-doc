import React, { useState } from 'react';
import { DOWNLOAD_ARTIFACTS } from '../data/downloads';
import { DownloadCard } from '../components/downloads/DownloadCard';
import { CodeBlock } from '../components/ui/CodeBlock';
import { ShieldCheck, Filter, Key } from 'lucide-react';
import { SITE_CONFIG } from '../data/config';
import { useLanguage } from '../context/LanguageContext';

export const DownloadsPage: React.FC = () => {
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [productFilter, setProductFilter] = useState<string>('all');
  const [archFilter, setArchFilter] = useState<string>('all');
  const { t, language } = useLanguage();

  const filteredArtifacts = DOWNLOAD_ARTIFACTS.filter(item => {
    const matchPlatform = platformFilter === 'all' || item.platform === platformFilter;
    const matchProduct = productFilter === 'all' || item.product === productFilter;
    const matchArch = archFilter === 'all' || item.architecture === archFilter || item.architecture === 'all';
    return matchPlatform && matchProduct && matchArch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{t.downloads.badge}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white font-mono">
          {t.downloads.title}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          {t.downloads.description}
        </p>
      </header>

      {/* Filter Bar */}
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">
          <Filter className="w-3.5 h-3.5" />
          <span>{t.downloads.filterHeader}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Software Product Filter */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400">{t.downloads.productLabel}</label>
            <select
              value={productFilter}
              onChange={e => setProductFilter(e.target.value)}
              className="w-full text-xs rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:border-zinc-400"
            >
              <option value="all">{language === 'id' ? 'Semua Perangkat Lunak' : 'All Software'}</option>
              <option value="scytale-node">Scytale Node</option>
              <option value="scytale-cli">Scytale CLI</option>
              <option value="scytale-wallet">Scytale Wallet</option>
              <option value="scytale-desktop">Scytale Desktop</option>
              <option value="scytale-mobile">Scytale Mobile</option>
              <option value="source">{language === 'id' ? 'Arsip Kode Sumber' : 'Source Code Archive'}</option>
            </select>
          </div>

          {/* Platform Filter */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400">{t.downloads.osLabel}</label>
            <select
              value={platformFilter}
              onChange={e => setPlatformFilter(e.target.value)}
              className="w-full text-xs rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:border-zinc-400"
            >
              <option value="all">{language === 'id' ? 'Semua Platform' : 'All Platforms'}</option>
              <option value="linux">Linux</option>
              <option value="macos">macOS</option>
              <option value="windows">Windows</option>
              <option value="android">Android</option>
              <option value="source">{language === 'id' ? 'Kode Sumber' : 'Source Code'}</option>
            </select>
          </div>

          {/* Architecture Filter */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400">{t.downloads.archLabel}</label>
            <select
              value={archFilter}
              onChange={e => setArchFilter(e.target.value)}
              className="w-full text-xs rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:border-zinc-400"
            >
              <option value="all">{language === 'id' ? 'Semua Arsitektur' : 'All Architectures'}</option>
              <option value="x86_64">x86_64 (Intel / AMD 64-bit)</option>
              <option value="arm64">arm64 (Apple Silicon / AArch64)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Artifacts List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-mono">
          <span>{language === 'id' ? `Menampilkan ${filteredArtifacts.length} artefak rilis` : `Showing ${filteredArtifacts.length} release artifacts`}</span>
          <span>Latest Release: v{SITE_CONFIG.version}</span>
        </div>

        {filteredArtifacts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredArtifacts.map(artifact => (
              <DownloadCard key={artifact.id} artifact={artifact} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-12 text-center text-zinc-500 dark:text-zinc-400 space-y-2">
            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{language === 'id' ? 'Tidak ada biner yang cocok dengan filter yang dipilih' : 'No binary matches the selected filter'}</p>
            <p className="text-xs">{language === 'id' ? 'Sesuaikan filter platform atau arsitektur untuk melihat target rilis yang tersedia.' : 'Adjust your platform or architecture filters to view available release targets.'}</p>
            <button
              onClick={() => {
                setPlatformFilter('all');
                setProductFilter('all');
                setArchFilter('all');
              }}
              className="mt-3 inline-flex px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            >
              {t.common.resetFilters}
            </button>
          </div>
        )}
      </div>

      {/* Verify your download section */}
      <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-6 sm:p-8 space-y-6">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            <Key className="w-4 h-4 text-zinc-700 dark:text-zinc-400" />
            <span>{language === 'id' ? 'Integritas & Verifikasi Kriptografis' : 'Integrity & Cryptographic Verification'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
            {t.downloads.verifyTitle}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {t.downloads.verifySubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Step 1: Checksum */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-3">
            <div className="flex items-center gap-2 font-semibold text-zinc-950 dark:text-white text-sm">
              <span className="w-5 h-5 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center text-xs font-mono">1</span>
              <span>{t.downloads.step1Title}</span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              {t.downloads.step1Desc}
            </p>
            <CodeBlock
              language="bash"
              caption="Terminal Checksum Command"
              code="# Linux / macOS:\nsha256sum scytale-node-v0.4.2-linux-x86_64.tar.gz\n\n# Windows (PowerShell):\nGet-FileHash scytale-node-v0.4.2-windows-x86_64.zip -Algorithm SHA256"
            />
          </div>

          {/* Step 2: PGP Signature */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-3">
            <div className="flex items-center gap-2 font-semibold text-zinc-950 dark:text-white text-sm">
              <span className="w-5 h-5 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center text-xs font-mono">2</span>
              <span>{t.downloads.step2Title}</span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              {language === 'id'
                ? `Rilis resmi ditandatangani oleh Otoritas Rilis Scytale dengan fingerprint kunci ${SITE_CONFIG.pgpKeyId}.`
                : `Official releases are signed by the Scytale Release Authority with key fingerprint ${SITE_CONFIG.pgpKeyId}.`}
            </p>
            <CodeBlock
              language="bash"
              caption="GPG Signature Check"
              code="# Download detached signature:\ncurl -LO https://github.com/scytale-network/scytale/releases/download/v0.4.2/scytale-node-v0.4.2-linux-x86_64.tar.gz.asc\n\n# Verify against official release key:\ngpg --verify scytale-node-v0.4.2-linux-x86_64.tar.gz.asc"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
