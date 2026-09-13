import React, { useState } from 'react';
import { DOWNLOAD_ARTIFACTS } from '../data/downloads';
import { DownloadCard } from '../components/downloads/DownloadCard';
import { CodeBlock } from '../components/ui/CodeBlock';
import {
  ShieldCheck,
  Filter,
  Key,
  Wallet,
  Code2,
  Server,
  AlertTriangle,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { SITE_CONFIG } from '../data/config';
import { useLanguage } from '../context/LanguageContext';

export type PersonaCategory = 'wallet' | 'developer' | 'node';

export const DownloadsPage: React.FC = () => {
  const [selectedPersona, setSelectedPersona] = useState<PersonaCategory>('wallet');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [archFilter, setArchFilter] = useState<string>('all');
  const { t, language } = useLanguage();

  // Filter artifacts first by persona, then by platform & architecture
  const personaArtifacts = DOWNLOAD_ARTIFACTS.filter(item => {
    if (!item.persona) return selectedPersona === 'node';
    return item.persona === selectedPersona;
  });

  const filteredArtifacts = personaArtifacts.filter(item => {
    const matchPlatform = platformFilter === 'all' || item.platform === platformFilter;
    const matchArch = archFilter === 'all' || item.architecture === archFilter || item.architecture === 'all';
    return matchPlatform && matchArch;
  });

  // Count artifacts per persona for the tab badges
  const walletCount = DOWNLOAD_ARTIFACTS.filter(a => a.persona === 'wallet').length;
  const devCount = DOWNLOAD_ARTIFACTS.filter(a => a.persona === 'developer').length;
  const nodeCount = DOWNLOAD_ARTIFACTS.filter(a => !a.persona || a.persona === 'node').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
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

      {/* 3 PERSONA CATEGORY TABS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {language === 'id' ? 'PILIH KATEGORI PENGGUNA (PERSONA):' : 'SELECT USER CATEGORY (PERSONA):'}
          </span>
          <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
            v{SITE_CONFIG.version}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* TAB 1: DOMPET PENGGUNA (WALLET) */}
          <button
            type="button"
            onClick={() => {
              setSelectedPersona('wallet');
              setPlatformFilter('all');
            }}
            className={`relative flex flex-col text-left p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer ${
              selectedPersona === 'wallet'
                ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30 ring-2 ring-emerald-500/20 shadow-md'
                : 'border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827] hover:border-slate-300 dark:hover:border-white/20 opacity-80 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-2.5">
              <div className="flex items-center gap-2">
                <div
                  className={`p-2 rounded-xl ${
                    selectedPersona === 'wallet'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <Wallet className="w-5 h-5" />
                </div>
                <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white font-mono">
                  {t.downloads.personaTabs.walletTitle}
                </span>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                {walletCount}
              </span>
            </div>

            {/* Rekomendasi Badge */}
            <div className="inline-flex items-center gap-1 text-[11px] font-bold font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 w-fit mb-2 border border-emerald-300 dark:border-emerald-700/50">
              <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>{t.downloads.personaTabs.walletBadge}</span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-auto">
              {t.downloads.personaTabs.walletSubtitle}
            </p>
          </button>

          {/* TAB 2: DEVELOPER TOOLS & IDE */}
          <button
            type="button"
            onClick={() => {
              setSelectedPersona('developer');
              setPlatformFilter('all');
            }}
            className={`relative flex flex-col text-left p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer ${
              selectedPersona === 'developer'
                ? 'border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/30 ring-2 ring-indigo-500/20 shadow-md'
                : 'border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827] hover:border-slate-300 dark:hover:border-white/20 opacity-80 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-2.5">
              <div className="flex items-center gap-2">
                <div
                  className={`p-2 rounded-xl ${
                    selectedPersona === 'developer'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <Code2 className="w-5 h-5" />
                </div>
                <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white font-mono">
                  {t.downloads.personaTabs.devTitle}
                </span>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                {devCount}
              </span>
            </div>

            <div className="inline-flex items-center gap-1 text-[11px] font-bold font-mono px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-200 w-fit mb-2 border border-indigo-300 dark:border-indigo-700/50">
              <span>{t.downloads.personaTabs.devBadge}</span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-auto">
              {t.downloads.personaTabs.devSubtitle}
            </p>
          </button>

          {/* TAB 3: NODE VALIDATOR & MINING (SERVER/CLI) */}
          <button
            type="button"
            onClick={() => {
              setSelectedPersona('node');
              setPlatformFilter('all');
            }}
            className={`relative flex flex-col text-left p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer ${
              selectedPersona === 'node'
                ? 'border-amber-500 bg-amber-50/70 dark:bg-amber-950/30 ring-2 ring-amber-500/20 shadow-md'
                : 'border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827] hover:border-slate-300 dark:hover:border-white/20 opacity-80 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-2.5">
              <div className="flex items-center gap-2">
                <div
                  className={`p-2 rounded-xl ${
                    selectedPersona === 'node'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <Server className="w-5 h-5" />
                </div>
                <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white font-mono">
                  {t.downloads.personaTabs.nodeTitle}
                </span>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                {nodeCount}
              </span>
            </div>

            <div className="inline-flex items-center gap-1 text-[11px] font-bold font-mono px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 w-fit mb-2 border border-amber-300 dark:border-amber-700/50">
              <span>{t.downloads.personaTabs.nodeBadge}</span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-auto">
              {t.downloads.personaTabs.nodeSubtitle}
            </p>
          </button>
        </div>
      </div>

      {/* SPECIAL CALLOUT BANNER PER PERSONA */}
      {selectedPersona === 'wallet' && (
        <div className="rounded-2xl border border-emerald-300 dark:border-emerald-800/60 bg-emerald-50/80 dark:bg-emerald-950/25 p-4 sm:p-5 flex items-start gap-3.5 shadow-2xs">
          <div className="p-2 rounded-xl bg-emerald-600 text-white shrink-0 mt-0.5">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-emerald-950 dark:text-emerald-200 font-mono">
              {language === 'id' ? 'PILIHAN UTAMA UNTUK PENGGUNA DOMPET SCYTALE' : 'PRIMARY CHOICE FOR SCYTALE WALLET USERS'}
            </h3>
            <p className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed">
              {language === 'id'
                ? 'Gunakan Scytale Passbook untuk menyimpan saldo, melihat riwayat transaksi passbook, dan melakukan transfer nilai tanpa perlu menjalankan daemon validator atau baris perintah.'
                : 'Use Scytale Passbook to manage balances, review ledger passbook statements, and send transfers without operating a full validator daemon or terminal console.'}
            </p>
          </div>
        </div>
      )}

      {selectedPersona === 'developer' && (
        <div className="rounded-2xl border border-indigo-300 dark:border-indigo-800/60 bg-indigo-50/80 dark:bg-indigo-950/25 p-4 sm:p-5 flex items-start gap-3.5 shadow-2xs">
          <div className="p-2 rounded-xl bg-indigo-600 text-white shrink-0 mt-0.5">
            <Code2 className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-indigo-950 dark:text-indigo-200 font-mono">
              {language === 'id' ? 'LINGKUNGAN PENGEMBANGAN KONTRAK PINTAR eUTXO' : 'eUTXO SMART CONTRACT WORKBENCH'}
            </h3>
            <p className="text-xs text-indigo-800 dark:text-indigo-300 leading-relaxed">
              {language === 'id'
                ? 'Scytale Studio mengintegrasikan editor kode, terminal PTY, emulator eUTXO lokal, dan inspektur transaksi untuk merancang smart contract berbasis WebAssembly.'
                : 'Scytale Studio pairs a visual IDE workbench with built-in PTY terminal emulation, local eUTXO state machine simulator, and contract deployment inspector.'}
            </p>
          </div>
        </div>
      )}

      {selectedPersona === 'node' && (
        /* WARNING BOX MERAH WAJIB SESUAI SPESIFIKASI */
        <div className="rounded-2xl border-2 border-rose-500 bg-rose-50 dark:bg-rose-950/40 p-5 sm:p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-rose-600 text-white shrink-0 mt-0.5 shadow-xs">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-rose-950 dark:text-rose-200 font-mono tracking-tight">
                {t.downloads.personaTabs.nodeWarningTitle}
              </h3>
              <p className="text-xs sm:text-sm text-rose-900 dark:text-rose-300 leading-relaxed font-medium">
                {t.downloads.personaTabs.nodeWarningText}
              </p>
              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedPersona('wallet')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  <Wallet className="w-3.5 h-3.5" />
                  <span>{language === 'id' ? 'Beralih ke Dompet Pengguna (Passbook)' : 'Switch to User Wallet (Passbook)'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FILTER BAR DALAM PERSONA */}
      <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827] p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
            <Filter className="w-3.5 h-3.5" />
            <span>{t.downloads.filterHeader}</span>
          </div>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            {language === 'id'
              ? `Menampilkan ${filteredArtifacts.length} dari ${personaArtifacts.length} biner`
              : `Showing ${filteredArtifacts.length} of ${personaArtifacts.length} binaries`}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Platform Filter */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">{t.downloads.osLabel}</label>
            <select
              value={platformFilter}
              onChange={e => setPlatformFilter(e.target.value)}
              className="w-full text-xs rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:outline-hidden focus:border-slate-400"
            >
              <option value="all">{language === 'id' ? 'Semua Sistem Operasi' : 'All Operating Systems'}</option>
              <option value="windows">Windows</option>
              <option value="android">Android</option>
              <option value="linux">Linux</option>
              <option value="macos">macOS</option>
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
              <option value="all">{language === 'id' ? 'Semua Arsitektur CPU' : 'All Architectures'}</option>
              <option value="x86_64">x86_64 (Intel / AMD 64-bit)</option>
              <option value="arm64">arm64 (Apple Silicon / AArch64)</option>
              <option value="all">Universal / All</option>
            </select>
          </div>
        </div>
      </div>

      {/* ARTIFACTS GRID */}
      <div className="space-y-6">
        {filteredArtifacts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredArtifacts.map(artifact => (
              <DownloadCard key={artifact.id} artifact={artifact} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827] p-12 text-center text-slate-500 dark:text-slate-400 space-y-2">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {language === 'id' ? 'Tidak ada berkas yang cocok dengan filter yang dipilih' : 'No binary matches the selected filter'}
            </p>
            <p className="text-xs">
              {language === 'id'
                ? 'Ubah filter sistem operasi atau pilih kategori persona lain di atas.'
                : 'Adjust your platform filter or select another persona tab above.'}
            </p>
            <button
              onClick={() => {
                setPlatformFilter('all');
                setArchFilter('all');
              }}
              className="mt-3 inline-flex px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              {t.common.resetFilters}
            </button>
          </div>
        )}
      </div>

      {/* VERIFY YOUR DOWNLOAD SECTION */}
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
              caption="Terminal Checksum Command (Windows & Linux)"
              code={`# Windows PowerShell:\nGet-FileHash -Algorithm SHA256 .\\scytale-v0.3.0-testnet-windows-x86_64.zip\n\n# Linux / macOS:\nsha256sum scytale-v0.3.0-testnet-linux-x86_64.tar.gz`}
            />
          </div>

          {/* Step 2: Verification */}
          <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827] p-5 space-y-3">
            <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white text-sm">
              <span className="w-5 h-5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center text-xs font-mono">2</span>
              <span>{t.downloads.step2Title}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {language === 'id'
                ? 'Verifikasi langsung menggunakan file checksum SHA256 resmi yang diterbitkan di GitHub Release:'
                : 'Verify directly using the official SHA256 checksum file published on GitHub Releases:'}
            </p>
            <CodeBlock
              language="bash"
              caption="Automated Hash Verification"
              code={`# Download file dan checksum resmi:\ncurl -LO https://github.com/ratufatma/scytale/releases/download/v0.3.0-testnet/scytale-v0.3.0-testnet-linux-x86_64.tar.gz\ncurl -LO https://github.com/ratufatma/scytale/releases/download/v0.3.0-testnet/scytale-v0.3.0-testnet-linux-x86_64.tar.gz.sha256\n\n# Jalankan verifikasi otomatis:\nsha256sum -c scytale-v0.3.0-testnet-linux-x86_64.tar.gz.sha256`}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
