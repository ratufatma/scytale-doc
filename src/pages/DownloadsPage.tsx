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
      <header className="border-b border-slate-200 dark:border-white/10 pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{t.downloads.badge}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-mono">
          {t.downloads.title}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          {t.downloads.description}
        </p>
      </header>

      {/* Filter Bar */}
      <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827] p-4 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
          <Filter className="w-3.5 h-3.5" />
          <span>{t.downloads.filterHeader}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Software Product Filter */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">{t.downloads.productLabel}</label>
            <select
              value={productFilter}
              onChange={e => setProductFilter(e.target.value)}
              className="w-full text-xs rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:outline-hidden focus:border-slate-400"
            >
              <option value="all">{language === 'id' ? 'Semua Perangkat Lunak' : 'All Software'}</option>
              <option value="scytale-node">Scytale Node</option>
              <option value="scytale-cli">Scytale CLI</option>
              <option value="scytale-passbook">Scytale Passbook</option>
              <option value="scytale-studio">Scytale Studio</option>
              <option value="scytale-wallet">Scytale Wallet</option>
              <option value="scytale-desktop">Scytale Desktop</option>
              <option value="scytale-mobile">Scytale Mobile</option>
              <option value="source">{language === 'id' ? 'Arsip Kode Sumber' : 'Source Code Archive'}</option>
            </select>
          </div>

          {/* Platform Filter */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">{t.downloads.osLabel}</label>
            <select
              value={platformFilter}
              onChange={e => setPlatformFilter(e.target.value)}
              className="w-full text-xs rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:outline-hidden focus:border-slate-400"
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
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">{t.downloads.archLabel}</label>
            <select
              value={archFilter}
              onChange={e => setArchFilter(e.target.value)}
              className="w-full text-xs rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:outline-hidden focus:border-slate-400"
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
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
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
          <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827] p-12 text-center text-slate-500 dark:text-slate-400 space-y-2">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{language === 'id' ? 'Tidak ada biner yang cocok dengan filter yang dipilih' : 'No binary matches the selected filter'}</p>
            <p className="text-xs">{language === 'id' ? 'Sesuaikan filter platform atau arsitektur untuk melihat target rilis yang tersedia.' : 'Adjust your platform or architecture filters to view available release targets.'}</p>
            <button
              onClick={() => {
                setPlatformFilter('all');
                setProductFilter('all');
                setArchFilter('all');
              }}
              className="mt-3 inline-flex px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              {t.common.resetFilters}
            </button>
          </div>
        )}
      </div>

      {/* Verify your download section */}
      <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100/70 dark:bg-slate-900/40 p-6 sm:p-8 space-y-6">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            <Key className="w-4 h-4 text-slate-700 dark:text-slate-400" />
            <span>{language === 'id' ? 'Integritas & Verifikasi Kriptografis' : 'Integrity & Cryptographic Verification'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t.downloads.verifyTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.downloads.verifySubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Step 1: Checksum */}
          <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827] p-5 space-y-3">
            <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white text-sm">
              <span className="w-5 h-5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center text-xs font-mono">1</span>
              <span>{t.downloads.step1Title}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {t.downloads.step1Desc}
            </p>
            <CodeBlock
              language="bash"
              caption="Terminal Checksum Command"
              code="# Linux:\nsha256sum scytale-v0.3.0-testnet-linux-x86_64.tar.gz\n\n# Expected Output:\n# 84e539e4c0be9ec575c3f0c4c9bc43eca42ff72bf2f4a79c725a5d339d87c5ad  scytale-v0.3.0-testnet-linux-x86_64.tar.gz"
            />
          </div>

          {/* Step 2: PGP Signature */}
          <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827] p-5 space-y-3">
            <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white text-sm">
              <span className="w-5 h-5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center text-xs font-mono">2</span>
              <span>{t.downloads.step2Title}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {language === 'id'
                ? `Verifikasi langsung menggunakan file checksum SHA256 resmi yang diterbitkan di GitHub Release:`
                : `Verify directly using the official SHA256 checksum file published on GitHub Releases:`}
            </p>
            <CodeBlock
              language="bash"
              caption="SHA256 Checksum Verification"
              code="# Download file dan checksum resmi:\ncurl -LO https://github.com/ratufatma/scytale/releases/download/v0.3.0-testnet/scytale-v0.3.0-testnet-linux-x86_64.tar.gz\ncurl -LO https://github.com/ratufatma/scytale/releases/download/v0.3.0-testnet/scytale-v0.3.0-testnet-linux-x86_64.tar.gz.sha256\n\n# Jalankan verifikasi otomatis:\nsha256sum -c scytale-v0.3.0-testnet-linux-x86_64.tar.gz.sha256"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
