import React from 'react';
import { RELEASES } from '../data/releases';
import { VersionBadge } from '../components/ui/Badges';
import { DownloadCard } from '../components/downloads/DownloadCard';
import { CodeBlock } from '../components/ui/CodeBlock';
import { Callout } from '../components/ui/Callout';
import { ArrowLeft, ArrowRight, Calendar, ExternalLink, ShieldCheck, Check, AlertCircle, AlertTriangle } from 'lucide-react';
import { SITE_CONFIG } from '../data/config';

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
        className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-600 hover:text-zinc-950 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Releases Hub</span>
      </button>

      {/* Main Release Header */}
      <header className="border-b border-zinc-200 pb-8 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <VersionBadge version={release.version} status={release.status} />
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
            <Calendar className="w-3.5 h-3.5" />
            <span>{release.releaseDate}</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 font-mono">
          Scytale v{release.version}
        </h1>

        <p className="text-base text-zinc-700 leading-relaxed max-w-3xl">
          {release.summary}
        </p>

        {release.rawChangelogUrl && (
          <a
            href={release.rawChangelogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-mono text-zinc-600 hover:text-zinc-950 underline pt-2"
          >
            <span>View raw Git tag and signed commit</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </header>

      {/* Overview & Highlights */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-950">Release Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-zinc-800">
          {release.highlights.map((h, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 p-3.5 rounded-lg border border-zinc-200 bg-white shadow-2xs"
            >
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="leading-snug text-xs sm:text-sm">{h}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Security Notes & Breaking Changes */}
      {release.changes.securityNotes && release.changes.securityNotes.length > 0 && (
        <section className="space-y-2">
          <Callout type="security" title="Security Advisories &amp; Cryptographic Notes">
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
          <Callout type="warning" title="Breaking Protocol or Schema Changes">
            <ul className="list-disc list-inside space-y-1">
              {release.changes.breakingChanges.map((change, idx) => (
                <li key={idx}>{change}</li>
              ))}
            </ul>
          </Callout>
        </section>
      )}

      {/* Downloads for this release */}
      <section className="space-y-6 border-t border-zinc-200 pt-8">
        <div>
          <h2 className="text-xl font-bold text-zinc-950">Compiled Release Artifacts</h2>
          <p className="text-xs text-zinc-500 mt-1">
            Download pre-built binary targets for Linux, macOS, Windows, and raw source archives.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {release.artifacts.map(art => (
            <DownloadCard key={art.id} artifact={art} />
          ))}
        </div>
      </section>

      {/* Detailed Changelog */}
      <section className="space-y-6 border-t border-zinc-200 pt-8">
        <h2 className="text-xl font-bold text-zinc-950">Detailed Changelog</h2>

        <div className="space-y-6 text-sm">
          {/* Features */}
          {release.changes.features.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold text-zinc-900 font-mono text-xs uppercase tracking-wider">
                New Features &amp; Capabilities
              </h3>
              <ul className="space-y-1.5 list-disc list-inside text-zinc-700 pl-2">
                {release.changes.features.map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Improvements */}
          {release.changes.improvements.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold text-zinc-900 font-mono text-xs uppercase tracking-wider">
                Performance &amp; Architectural Improvements
              </h3>
              <ul className="space-y-1.5 list-disc list-inside text-zinc-700 pl-2">
                {release.changes.improvements.map((im, idx) => (
                  <li key={idx}>{im}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Bug Fixes */}
          {release.changes.bugFixes.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold text-zinc-900 font-mono text-xs uppercase tracking-wider">
                Bug Fixes &amp; Stability
              </h3>
              <ul className="space-y-1.5 list-disc list-inside text-zinc-700 pl-2">
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
        <section className="space-y-3 border-t border-zinc-200 pt-8">
          <h2 className="text-lg font-bold text-zinc-950">Known Issues &amp; Errata</h2>
          <ul className="space-y-2 text-xs sm:text-sm text-zinc-600">
            {release.knownIssues.map((issue, idx) => (
              <li key={idx} className="flex items-start gap-2 p-3 rounded-lg bg-zinc-50 border border-zinc-200">
                <AlertCircle className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                <span>{issue}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Navigation between releases */}
      <div className="border-t border-zinc-200 pt-8 flex items-center justify-between gap-4">
        {prevRelease ? (
          <button
            onClick={() => onSelectRelease(prevRelease.version)}
            className="flex items-center gap-2 p-3 rounded-lg border border-zinc-200 hover:bg-zinc-50 text-left transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-zinc-400" />
            <div>
              <span className="block text-[10px] uppercase font-mono text-zinc-400">Previous Release</span>
              <span className="text-xs font-semibold text-zinc-900">v{prevRelease.version}</span>
            </div>
          </button>
        ) : (
          <div />
        )}

        {nextRelease ? (
          <button
            onClick={() => onSelectRelease(nextRelease.version)}
            className="flex items-center gap-2 p-3 rounded-lg border border-zinc-200 hover:bg-zinc-50 text-right transition-colors"
          >
            <div>
              <span className="block text-[10px] uppercase font-mono text-zinc-400">Next Release</span>
              <span className="text-xs font-semibold text-zinc-900">v{nextRelease.version}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-400" />
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};
