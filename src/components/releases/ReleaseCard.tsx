import React from 'react';
import { Release } from '../../types';
import { VersionBadge } from '../ui/Badges';
import { Calendar, ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface ReleaseCardProps {
  release: Release;
  onViewDetails: (version: string) => void;
}

export const ReleaseCard: React.FC<ReleaseCardProps> = ({ release, onViewDetails }) => {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-2xs space-y-4 hover:border-zinc-300 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-4">
        <div className="flex items-center gap-3">
          <VersionBadge version={release.version} status={release.status} />
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
            <Calendar className="w-3.5 h-3.5" />
            <span>{release.releaseDate}</span>
          </div>
        </div>

        <button
          onClick={() => onViewDetails(release.version)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 hover:text-black hover:underline"
        >
          <span>View Release Notes &amp; Binaries</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <p className="text-zinc-700 text-sm leading-relaxed">{release.summary}</p>

      {/* Highlights */}
      {release.highlights && release.highlights.length > 0 && (
        <div className="space-y-2 pt-1">
          <h4 className="text-xs font-semibold uppercase tracking-wider font-mono text-zinc-500">
            Key Highlights
          </h4>
          <ul className="space-y-1.5 text-xs text-zinc-700">
            {release.highlights.map((h, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Verification & Artifacts count footer */}
      <div className="pt-2 flex items-center justify-between text-xs text-zinc-500 font-mono border-t border-zinc-50">
        <div className="flex items-center gap-1.5 text-emerald-700">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>PGP Signature &amp; SHA-256 Verified</span>
        </div>
        <span>{release.artifacts.length} compiled artifacts</span>
      </div>
    </div>
  );
};
