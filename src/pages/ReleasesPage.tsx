import React from 'react';
import { RELEASES } from '../data/releases';
import { ReleaseCard } from '../components/releases/ReleaseCard';
import { Tag, ExternalLink, GitBranch } from 'lucide-react';
import { SITE_CONFIG } from '../data/config';

interface ReleasesPageProps {
  onSelectRelease: (version: string) => void;
}

export const ReleasesPage: React.FC<ReleasesPageProps> = ({ onSelectRelease }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-white/10 pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <Tag className="w-4 h-4 text-slate-700 dark:text-slate-300" />
          <span>Release Ledger &amp; Version History</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-mono">
          Scytale Releases
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          Comprehensive release history, protocol upgrades, changelogs, breaking changes, and cryptographic audit records for the Scytale blockchain network.
        </p>
      </header>

      {/* Release Timeline List */}
      <div className="space-y-6">
        {RELEASES.map(release => (
          <ReleaseCard
            key={release.id}
            release={release}
            onViewDetails={onSelectRelease}
          />
        ))}
      </div>

      {/* GitHub Release Sync Note */}
      <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100/70 dark:bg-slate-900/40 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10">
            <GitBranch className="w-4 h-4 text-slate-700 dark:text-slate-300" />
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">Official Git Tagged Releases</p>
            <p className="text-slate-500 dark:text-slate-400">All releases are tagged in the canonical repository with signed commits.</p>
          </div>
        </div>
        <a
          href={SITE_CONFIG.githubReleasesUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium transition-colors shrink-0"
        >
          <span>View on GitHub</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>
      </div>
    </div>
  );
};
