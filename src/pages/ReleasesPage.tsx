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
      <header className="border-b border-zinc-200 pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500">
          <Tag className="w-4 h-4 text-zinc-700" />
          <span>Release Ledger &amp; Version History</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 font-mono">
          Scytale Releases
        </h1>
        <p className="text-zinc-600 text-sm sm:text-base max-w-3xl leading-relaxed">
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
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white border border-zinc-200">
            <GitBranch className="w-4 h-4 text-zinc-700" />
          </div>
          <div>
            <p className="font-semibold text-zinc-900">Official Git Tagged Releases</p>
            <p className="text-zinc-500">All releases are tagged in the canonical repository with signed commits.</p>
          </div>
        </div>
        <a
          href={SITE_CONFIG.githubReleasesUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-800 font-medium transition-colors shrink-0"
        >
          <span>View on GitHub</span>
          <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
        </a>
      </div>
    </div>
  );
};
