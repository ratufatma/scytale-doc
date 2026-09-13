import React from 'react';
import { RELEASES } from '../data/releases';
import { VersionBadge } from '../components/ui/Badges';
import { DownloadCard } from '../components/downloads/DownloadCard';
import { Callout } from '../components/ui/Callout';
import { ArrowLeft, ArrowRight, Calendar, ExternalLink, Check, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ReleaseDetailPageProps {
  version: string;
  onBack: () => void;
  onSelectRelease: (version: string) => void;
}

export const ReleaseDetailPage: React.FC<ReleaseDetailPageProps> = ({
  version,
  onBack,
  onSelectRelease
}) => {
  const { t, language } = useLanguage();
  const cleanVersion = version.replace(/^v/, '');
  const releaseIndex = RELEASES.findIndex(r => r.version === cleanVersion);
  const release = releaseIndex !== -1 ? RELEASES[releaseIndex] : RELEASES[0];

  const prevRelease = releaseIndex < RELEASES.length - 1 ? RELEASES[releaseIndex + 1] : null;
  const nextRelease = releaseIndex > 0 ? RELEASES[releaseIndex - 1] : null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>{t.releases.backToHub}</span>
      </button>

      {/* Main Release Header */}
      <header className="border-b border-slate-200 dark:border-white/10 pb-8 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <VersionBadge version={release.version} status={release.status} />
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <Calendar className="w-3.5 h-3.5" />
            <span>{release.releaseDate}</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-mono">
          Scytale v{release.version}
        </h1>

        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
          {release.summary}
        </p>

        {release.rawChangelogUrl && (
          <a
            href={release.rawChangelogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white underline pt-2"
          >
            <span>{language === 'id' ? 'Lihat tag Git mentah dan commit bertanda tangan' : 'View raw Git tag and signed commit'}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </header>

      {/* Overview & Highlights */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t.releases.highlights}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-700 dark:text-slate-300">
          {release.highlights.map((h, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 p-3.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827] shadow-2xs"
            >
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span className="leading-snug text-xs sm:text-sm">{h}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Security Notes & Breaking Changes */}
      {release.changes.securityNotes && release.changes.securityNotes.length > 0 && (
        <section className="space-y-2">
          <Callout type="security" title={t.releases.securityNotes}>
            <ul className="list-disc list-inside space-y-1">
              {release.changes.securityNotes.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          </Callout>
        </section>
      )}

      {release.changes.breakingChanges && release.changes.breakingChanges.length > 0 && (
        <section className="space-y-2">
          <Callout type="warning" title={t.releases.breakingChanges}>
            <ul className="list-disc list-inside space-y-1">
              {release.changes.breakingChanges.map((change, idx) => (
                <li key={idx}>{change}</li>
              ))}
            </ul>
          </Callout>
        </section>
      )}

      {/* Downloads for this release */}
      <section className="space-y-6 border-t border-slate-200 dark:border-white/10 pt-8">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t.releases.artifactsTitle}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {language === 'id'
              ? 'Unduh target biner terkompilasi untuk Linux, macOS, Windows, dan arsip kode sumber mentah.'
              : 'Download pre-built binary targets for Linux, macOS, Windows, and raw source archives.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {release.artifacts.map(art => (
            <DownloadCard key={art.id} artifact={art} />
          ))}
        </div>
      </section>

      {/* Detailed Changelog */}
      <section className="space-y-6 border-t border-slate-200 dark:border-white/10 pt-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t.releases.changelogTitle}</h2>

        <div className="space-y-6 text-sm">
          {/* Features */}
          {release.changes.features.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold text-slate-900 dark:text-white font-mono text-xs uppercase tracking-wider">
                {t.releases.features}
              </h3>
              <ul className="space-y-1.5 list-disc list-inside text-slate-700 dark:text-slate-300 pl-2">
                {release.changes.features.map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Improvements */}
          {release.changes.improvements.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold text-slate-900 dark:text-white font-mono text-xs uppercase tracking-wider">
                {t.releases.improvements}
              </h3>
              <ul className="space-y-1.5 list-disc list-inside text-slate-700 dark:text-slate-300 pl-2">
                {release.changes.improvements.map((im, idx) => (
                  <li key={idx}>{im}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Bug Fixes */}
          {release.changes.bugFixes.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold text-slate-900 dark:text-white font-mono text-xs uppercase tracking-wider">
                {t.releases.fixes}
              </h3>
              <ul className="space-y-1.5 list-disc list-inside text-slate-700 dark:text-slate-300 pl-2">
                {release.changes.bugFixes.map((bf, idx) => (
                  <li key={idx}>{bf}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Known Issues */}
      {release.knownIssues && release.knownIssues.length > 0 && (
        <section className="space-y-3 border-t border-slate-200 dark:border-white/10 pt-8">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t.releases.knownIssues}</h2>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            {release.knownIssues.map((issue, idx) => (
              <li key={idx} className="flex items-start gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10">
                <AlertCircle className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0 mt-0.5" />
                <span>{issue}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Navigation between releases */}
      <div className="border-t border-slate-200 dark:border-white/10 pt-8 flex items-center justify-between gap-4">
        {prevRelease ? (
          <button
            onClick={() => onSelectRelease(prevRelease.version)}
            className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827] hover:bg-slate-50 dark:hover:bg-slate-800 text-left transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400" />
            <div>
              <span className="block text-[10px] uppercase font-mono text-slate-400">{t.releases.prevRelease}</span>
              <span className="text-xs font-semibold text-slate-900 dark:text-white">v{prevRelease.version}</span>
            </div>
          </button>
        ) : (
          <div />
        )}

        {nextRelease ? (
          <button
            onClick={() => onSelectRelease(nextRelease.version)}
            className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827] hover:bg-slate-50 dark:hover:bg-slate-800 text-right transition-colors"
          >
            <div>
              <span className="block text-[10px] uppercase font-mono text-slate-400">{t.releases.nextRelease}</span>
              <span className="text-xs font-semibold text-slate-900 dark:text-white">v{nextRelease.version}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};
