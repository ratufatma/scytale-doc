import React from 'react';
import { SITE_CONFIG } from '../data/config';
import { RELEASES } from '../data/releases';
import { SOFTWARE_CATALOG } from '../data/software';
import { ArrowRight, Download, Terminal, Database, Cpu, Lock, Network, Coins, Check, FileText, GitBranch, ShieldCheck } from 'lucide-react';
import { CopyButton } from '../components/ui/CopyButton';
import { useLanguage } from '../context/LanguageContext';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const latestRelease = RELEASES[0];
  const { t, language } = useLanguage();

  const primitives = [
    {
      icon: Lock,
      title: t.home.primitives.utxoTitle,
      description: t.home.primitives.utxoDesc,
    },
    {
      icon: Cpu,
      title: t.home.primitives.powTitle,
      description: t.home.primitives.powDesc,
    },
    {
      icon: Database,
      title: t.home.primitives.redbTitle,
      description: t.home.primitives.redbDesc,
    },
    {
      icon: Terminal,
      title: t.home.primitives.blake3Title,
      description: t.home.primitives.blake3Desc,
    },
    {
      icon: Network,
      title: language === 'id' ? 'Protokol P2P Otonom' : 'Autonomous P2P Wire',
      description: language === 'id'
        ? 'Jaringan soket TCP langsung dengan rotasi peer anti-eclipse, pool koneksi terikat, dan pembingkaian pesan biner padat.'
        : 'Direct TCP socket networking with anti-eclipse peer rotation, bounded connection pools, and compact binary serialized message framing.',
    },
    {
      icon: Coins,
      title: t.home.primitives.supplyTitle,
      description: t.home.primitives.supplyDesc,
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs font-mono text-zinc-700 dark:text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Testnet Alpha v{SITE_CONFIG.version} Released</span>
            <span className="text-zinc-400 dark:text-zinc-600">&bull;</span>
            <button
              onClick={() => onNavigate(`/releases/${SITE_CONFIG.version}`)}
              className="font-semibold text-zinc-900 dark:text-white hover:underline flex items-center gap-0.5"
            >
              <span>{language === 'id' ? 'Catatan Rilis' : 'Release Notes'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-950 dark:text-white font-mono">
            {SITE_CONFIG.name}
          </h1>

          <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-2xl font-medium">
            {t.home.headline}
          </p>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
            {t.home.subheadline}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('/docs/getting-started/installation')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-950 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 text-sm font-medium shadow-xs transition-colors"
              id="hero-get-started"
            >
              <span>{t.home.ctaQuickstart}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('/downloads')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-sm font-medium shadow-2xs transition-colors"
              id="hero-download"
            >
              <Download className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
              <span>{t.home.ctaDownload}</span>
            </button>

            <button
              onClick={() => onNavigate('/protocol')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white text-sm font-medium transition-colors"
            >
              <span>{t.home.ctaProtocol}</span>
            </button>
          </div>
        </div>

        {/* Quick Command Box */}
        <div className="mt-10 max-w-2xl rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-900 dark:bg-black text-zinc-100 p-4 shadow-xs font-mono text-xs">
          <div className="flex items-center justify-between text-zinc-400 pb-2 border-b border-zinc-800 text-[11px]">
            <span>{language === 'id' ? 'MULAI CEPAT (KOMPILASI & JALANKAN)' : 'QUICK START (COMPILE & RUN)'}</span>
            <CopyButton
              text="git clone https://github.com/scytale-network/scytale && cd scytale && cargo build --release && ./target/release/scytale-node start"
              className="border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            />
          </div>
          <div className="pt-3 text-zinc-300 overflow-x-auto">
            <span className="text-zinc-500">$ </span>
            <span>git clone https://github.com/scytale-network/scytale &amp;&amp; cd scytale</span>
            <br />
            <span className="text-zinc-500">$ </span>
            <span>cargo build --release</span>
            <br />
            <span className="text-zinc-500">$ </span>
            <span className="text-emerald-400">./target/release/scytale-node start --network testnet</span>
          </div>
        </div>
      </section>

      {/* Verifiable Primitives Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-12 space-y-8">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {language === 'id' ? 'Fondasi Protokol' : 'Protocol Foundation'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white mt-1">
              {t.home.primitivesTitle}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl">
              {t.home.primitivesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {primitives.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-2xs space-y-3 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-900 dark:text-zinc-100">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-zinc-950 dark:text-white text-base">{item.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Release Summary */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  {t.home.latestReleaseTitle}
                </span>
                <span className="px-2 py-0.5 rounded bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-mono text-xs font-semibold">
                  v{latestRelease.version}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white mt-1 font-mono">
                Scytale v{latestRelease.version}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">
                {language === 'id' ? `Dirilis pada ${latestRelease.releaseDate}` : `Released on ${latestRelease.releaseDate}`}
              </p>
            </div>

            <button
              onClick={() => onNavigate(`/releases/${latestRelease.version}`)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 text-xs font-medium transition-colors self-start sm:self-auto"
            >
              <span>{language === 'id' ? 'Lihat Catatan Rilis & Biner' : 'View Release Notes & Binaries'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-3xl">
            {latestRelease.summary}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-700 dark:text-zinc-300">
            {latestRelease.highlights.map((h, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>{h}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>{language === 'id' ? 'Checksum SHA-256 dan tanda tangan PGP resmi dipublikasikan' : 'SHA-256 and PGP cryptographic signatures published'}</span>
            </div>
            <button
              onClick={() => onNavigate('/downloads')}
              className="hover:text-zinc-900 dark:hover:text-white underline"
            >
              {language === 'id' ? 'Unduh Linux, macOS, Windows, atau Kode Sumber →' : 'Download Linux, macOS, Windows, or Source →'}
            </button>
          </div>
        </div>
      </section>

      {/* Software Ecosystem Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                {language === 'id' ? 'Ekosistem' : 'Ecosystem'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white mt-1">
                {t.home.softwareTitle}
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/software')}
              className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 hover:underline inline-flex items-center gap-1"
            >
              <span>{language === 'id' ? 'Jelajahi seluruh perangkat lunak' : 'Explore all software'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SOFTWARE_CATALOG.slice(0, 3).map(sw => (
              <div
                key={sw.id}
                className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-2xs space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-zinc-950 dark:text-white text-base">{sw.name}</h3>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      v{sw.latestRelease}
                    </span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs mt-2 leading-relaxed">{sw.tagline}</p>
                </div>
                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <button
                    onClick={() => onNavigate(sw.documentationPath)}
                    className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white font-medium"
                  >
                    {t.nav.docs}
                  </button>
                  <button
                    onClick={() => onNavigate(`/software/${sw.slug}`)}
                    className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 hover:text-black dark:hover:text-white inline-flex items-center gap-1"
                  >
                    <span>{language === 'id' ? 'Rincian' : 'Details'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Systematic Documentation Entry Points */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-8 space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {language === 'id' ? 'Panduan Sistematis' : 'Systematic Guides'}
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white mt-1">
              {language === 'id' ? 'Dokumentasi untuk operator node, penambang, dan pengembang' : 'Documentation for node operators, miners, and developers'}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2">
              {language === 'id'
                ? 'Panduan langkah demi langkah mengenai konfigurasi node, penyiapan peer P2P, pemulihan kunci passbook, parameter penambangan, dan spesifikasi protokol.'
                : 'Step-by-step guides covering node configuration, P2P peer setup, key recovery passbooks, mining parameters, and raw protocol specifications.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => onNavigate('/docs/getting-started/installation')}
              className="text-left p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-2xs space-y-1 group"
            >
              <FileText className="w-4 h-4 text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white mb-2" />
              <h4 className="font-semibold text-zinc-950 dark:text-white text-sm">
                {language === 'id' ? 'Instalasi' : 'Installation'}
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {language === 'id' ? 'Alur kerja biner terverifikasi dan kompilasi sumber.' : 'Verified binaries and source compilation workflows.'}
              </p>
            </button>

            <button
              onClick={() => onNavigate('/docs/getting-started/running-a-node')}
              className="text-left p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-2xs space-y-1 group"
            >
              <Cpu className="w-4 h-4 text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white mb-2" />
              <h4 className="font-semibold text-zinc-950 dark:text-white text-sm">
                {language === 'id' ? 'Menjalankan Node' : 'Running a Node'}
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {language === 'id' ? 'Sinkronisasi peer, jalur disk redb, dan kontrol daemon.' : 'Peer synchronization, redb disk paths, and daemon control.'}
              </p>
            </button>

            <button
              onClick={() => onNavigate('/docs/getting-started/creating-a-wallet')}
              className="text-left p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-2xs space-y-1 group"
            >
              <Lock className="w-4 h-4 text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white mb-2" />
              <h4 className="font-semibold text-zinc-950 dark:text-white text-sm">
                {language === 'id' ? 'Dompet & Passbook' : 'Wallet & Passbook'}
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {language === 'id' ? 'Derivasi kunci deterministik dan penandatanganan UTXO offline.' : 'Deterministic key derivation and offline UTXO signing.'}
              </p>
            </button>

            <button
              onClick={() => onNavigate('/protocol')}
              className="text-left p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-2xs space-y-1 group"
            >
              <GitBranch className="w-4 h-4 text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white mb-2" />
              <h4 className="font-semibold text-zinc-950 dark:text-white text-sm">
                {language === 'id' ? 'Referensi Protokol' : 'Protocol Reference'}
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {language === 'id' ? 'Aturan invarian UTXO, hashing Blake3, dan target PoW.' : 'UTXO invariant rules, Blake3 hashing, and PoW targets.'}
              </p>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
