import React from 'react';
import { SOFTWARE_CATALOG } from '../data/software';
import { DOWNLOAD_ARTIFACTS } from '../data/downloads';
import { PlatformBadge } from '../components/ui/Badges';
import { DownloadCard } from '../components/downloads/DownloadCard';
import { CodeBlock } from '../components/ui/CodeBlock';
import { ArrowLeft, ExternalLink, BookOpen, Check, Cpu, HardDrive, Terminal } from 'lucide-react';

interface SoftwareDetailPageProps {
  slug: string;
  onBack: () => void;
  onNavigateDoc: (path: string) => void;
}

export const SoftwareDetailPage: React.FC<SoftwareDetailPageProps> = ({
  slug,
  onBack,
  onNavigateDoc
}) => {
  const software =
    SOFTWARE_CATALOG.find(s => s.slug === slug || s.id === slug) || SOFTWARE_CATALOG[0];

  const matchingArtifacts = DOWNLOAD_ARTIFACTS.filter(a => {
    if (software.slug === 'node') return a.product === 'scytale-node';
    if (software.slug === 'cli') return a.product === 'scytale-cli';
    if (software.slug === 'wallet') return a.product === 'scytale-wallet';
    if (software.slug === 'desktop') return a.product === 'scytale-desktop';
    if (software.slug === 'mobile') return a.product === 'scytale-mobile';
    return false;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Software Catalog</span>
      </button>

      {/* Main Header */}
      <header className="border-b border-slate-200 dark:border-white/10 pb-8 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {software.category}
          </span>
          <span className="text-slate-300 dark:text-slate-600">&bull;</span>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 dark:bg-emerald-500/20 text-white dark:text-emerald-400 font-semibold border border-transparent dark:border-emerald-500/30">
            v{software.latestRelease}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-mono">
          {software.name}
        </h1>

        <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
          {software.tagline}
        </p>

        <div className="flex items-center gap-2 flex-wrap pt-2">
          <span className="text-xs text-slate-500 dark:text-slate-400 mr-1">Target Platforms:</span>
          {software.platforms.map(p => (
            <PlatformBadge key={p} platform={p} />
          ))}
        </div>

        <div className="flex items-center gap-4 pt-3">
          <button
            onClick={() => onNavigateDoc(software.documentationPath)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-[#111827] hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>Read Documentation</span>
          </button>

          <a
            href={software.repositoryPath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <span>Source Code</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {software.status === 'coming-soon' && (
          <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 flex items-start gap-3">
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 whitespace-nowrap shrink-0 mt-0.5">
              Akan Segera Terbit (Fase 2)
            </span>
            <p className="text-xs sm:text-sm leading-relaxed">
              Fitur ini sedang dalam tahap riset dan pengembangan (R&D). Rilis dijadwalkan pada fase pengembangan berikutnya sesuai roadmap ekosistem Scytale.
            </p>
          </div>
        )}
      </header>

      {/* Description & Overview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Architectural Overview</h2>
        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed max-w-3xl">
          {software.description}
        </p>
      </section>

      {/* Features List */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Key Engineering Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {software.features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 p-3 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827] shadow-2xs text-xs sm:text-sm text-slate-800 dark:text-slate-200"
            >
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* System Requirements */}
      <section className="space-y-4 border-t border-slate-200 dark:border-white/10 pt-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">System Requirements</h2>
        <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827] overflow-hidden shadow-2xs">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-semibold font-mono text-xs">
              <tr>
                <th className="px-4 py-3 border-r border-slate-200 dark:border-white/10">Component</th>
                <th className="px-4 py-3">Requirement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/10">
              <tr>
                <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200 border-r border-slate-200 dark:border-white/10 font-mono">Operating System</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{software.systemRequirements.os}</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200 border-r border-slate-200 dark:border-white/10 font-mono">CPU</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{software.systemRequirements.cpu}</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200 border-r border-slate-200 dark:border-white/10 font-mono">RAM</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{software.systemRequirements.ram}</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200 border-r border-slate-200 dark:border-white/10 font-mono">Storage</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{software.systemRequirements.storage}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Installation Quickstart */}
      <section className="space-y-4 border-t border-slate-200 dark:border-white/10 pt-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Installation &amp; Execution</h2>
        <div className="space-y-4">
          {software.installQuickstart.map((q, idx) => (
            <div key={idx} className="space-y-1.5">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{q.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">{q.description}</p>
              <CodeBlock
                code={q.command}
                language="bash"
                isTerminal={true}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Downloads matching this software */}
      {matchingArtifacts.length > 0 && (
        <section className="space-y-6 border-t border-slate-200 dark:border-white/10 pt-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Official Download Artifacts</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Verified binaries and build targets specifically for {software.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {matchingArtifacts.map(art => (
              <DownloadCard key={art.id} artifact={art} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
