import React from 'react';
import { Platform, Architecture, ReleaseStatus } from '../../types';

export const PlatformBadge: React.FC<{ platform: Platform }> = ({ platform }) => {
  const labels: Record<Platform, string> = {
    linux: 'Linux',
    macos: 'macOS',
    windows: 'Windows',
    android: 'Android',
    source: 'Source Code'
  };

  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
      {labels[platform] || platform}
    </span>
  );
};

export const ArchitectureBadge: React.FC<{ arch: Architecture }> = ({ arch }) => {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-zinc-50 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
      {arch}
    </span>
  );
};

export const VersionBadge: React.FC<{ version: string; status?: ReleaseStatus }> = ({ version, status }) => {
  const statusClasses: Record<ReleaseStatus, string> = {
    latest: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50',
    stable: 'bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800/50',
    'pre-release': 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/50',
    archived: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700'
  };

  return (
    <div className="inline-flex items-center gap-1.5">
      <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950">
        v{version}
      </span>
      {status && (
        <span className={`px-2 py-0.5 rounded text-[11px] font-medium border uppercase tracking-wider ${statusClasses[status]}`}>
          {status}
        </span>
      )}
    </div>
  );
};

export const ComingSoonBadge: React.FC<{ label?: string; className?: string }> = ({ label, className = '' }) => {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 whitespace-nowrap ${className}`}>
      {label || 'Akan Segera Terbit (Fase 2)'}
    </span>
  );
};
