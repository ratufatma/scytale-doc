import React from 'react';
import { Release } from '../../types';
import { VersionBadge } from '../ui/Badges';
import { Calendar, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface ReleaseCardProps {
  release: Release;
  onViewDetails: (version: string) => void;
}

export const ReleaseCard: React.FC<ReleaseCardProps> = ({ release, onViewDetails }) => {
  const { language } = useLanguage();

  return (
    <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827] p-6 shadow-2xs space-y-4 hover:border-slate-300 dark:hover:border-white/20 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <VersionBadge version={release.version} status={release.status} />
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <Calendar className="w-3.5 h-3.5" />
            <span>{release.releaseDate}</span>
          </div>
        </div>

        <button
          onClick={() => onViewDetails(release.version)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-white hover:text-black dark:hover:text-slate-200 hover:underline"
        >
          <span>{language === 'id' ? 'Lihat Catatan Rilis & Biner' : 'View Release Notes & Binaries'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{release.summary}</p>

      {/* Highlights */}
      {release.highlights && release.highlights.length > 0 && (
        <div className="space-y-2 pt-1">
          <h4 className="text-xs font-semibold uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400">
            {language === 'id' ? 'Sorotan Utama' : 'Key Highlights'}
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {release.highlights.map((h, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Verification & Artifacts count footer */}
      <div className="pt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono border-t border-slate-100 dark:border-white/10">
        <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{language === 'id' ? 'Tanda Tangan PGP & SHA-256 Terverifikasi' : 'PGP Signature & SHA-256 Verified'}</span>
        </div>
        <span>{language === 'id' ? `${release.artifacts.length} artefak terkompilasi` : `${release.artifacts.length} compiled artifacts`}</span>
      </div>
    </div>
  );
};
