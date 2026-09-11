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
        className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-600 hover:text-zinc-950 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Software Catalog</span>
      </button>

      {/* Main Header */}
      <header className="border-b border-zinc-200 pb-8 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500">
            {software.category}
          </span>
          <span className="text-zinc-300">&bull;</span>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-900 text-white font-semibold">
            v{software.latestRelease}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 font-mono">
          {software.name}
        </h1>

        <p className="text-base sm:text-lg text-zinc-700 leading-relaxed max-w-3xl">
          {software.tagline}
        </p>

        <div className="flex items-center gap-2 flex-wrap pt-2">
          <span className="text-xs text-zinc-500 mr-1">Target Platforms:</span>
          {software.platforms.map(p => (
            <PlatformBadge key={p} platform={p} />
          ))}
        </div>

        <div className="flex items-center gap-4 pt-3">
          <button
            onClick={() => onNavigateDoc(software.documentationPath)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 bg-white hover:bg-zinc-50 text-xs font-medium text-zinc-800 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-zinc-500" />
            <span>Read Documentation</span>
          </button>

          <a
            href={software.repositoryPath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-950 underline font-mono"
          >
            <span>View Crate Source Code</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </header>

      {/* Description & Overview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-950">Architectural Overview</h2>
        <p className="text-zinc-700 text-sm leading-relaxed max-w-3xl">
          {software.description}
        </p>
      </section>

      {/* Features List */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-950">Key Engineering Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {software.features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 p-3 rounded-lg border border-zinc-200 bg-white shadow-2xs text-xs sm:text-sm text-zinc-800"
            >
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* System Requirements */}
      <section className="space-y-4 border-t border-zinc-200 pt-8">
        <h2 className="text-xl font-bold text-zinc-950">System Requirements</h2>
        <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden shadow-2xs">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-900 font-semibold font-mono text-xs">
              <tr>
                <th className="px-4 py-3 border-r border-zinc-200">Component</th>
                <th className="px-4 py-3">Requirement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              <tr>
                <td className="px-4 py-3 font-semibold text-zinc-800 border-r border-zinc-200 font-mono">Operating System</td>
                <td className="px-4 py-3 text-zinc-600">{software.systemRequirements.os}</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-zinc-800 border-r border-zinc-200 font-mono">CPU</td>
                <td className="px-4 py-3 text-zinc-600">{software.systemRequirements.cpu}</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-zinc-800 border-r border-zinc-200 font-mono">RAM</td>
                <td className="px-4 py-3 text-zinc-600">{software.systemRequirements.ram}</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-zinc-800 border-r border-zinc-200 font-mono">Storage</td>
                <td className="px-4 py-3 text-zinc-600">{software.systemRequirements.storage}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Installation Quickstart */}
      <section className="space-y-4 border-t border-zinc-200 pt-8">
        <h2 className="text-xl font-bold text-zinc-950">Installation &amp; Execution</h2>
        <div className="space-y-4">
          {software.installQuickstart.map((q, idx) => (
            <div key={idx} className="space-y-1.5">
              <h4 className="text-sm font-semibold text-zinc-900">{q.title}</h4>
              <p className="text-xs text-zinc-500">{q.description}</p>
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
        <section className="space-y-6 border-t border-zinc-200 pt-8">
          <div>
            <h2 className="text-xl font-bold text-zinc-950">Official Download Artifacts</h2>
            <p className="text-xs text-zinc-500 mt-1">
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
