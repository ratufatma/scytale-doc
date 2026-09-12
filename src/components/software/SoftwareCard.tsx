import React from 'react';
import { Software } from '../../types';
import { PlatformBadge } from '../ui/Badges';
import { ArrowRight, BookOpen, Download, Cpu, Terminal, Wallet, Layout, Smartphone, Globe, Wrench } from 'lucide-react';

interface SoftwareCardProps {
  software: Software;
  onSelect: (slug: string) => void;
  onNavigateDoc: (path: string) => void;
}

export const SoftwareCard: React.FC<SoftwareCardProps> = ({
  software,
  onSelect,
  onNavigateDoc
}) => {
  const getIcon = () => {
    const iconClass = "w-5 h-5 text-slate-900 dark:text-white";
    switch (software.slug) {
      case 'node':
        return <Cpu className={iconClass} />;
      case 'cli':
        return <Terminal className={iconClass} />;
      case 'wallet':
        return <Wallet className={iconClass} />;
      case 'desktop':
        return <Layout className={iconClass} />;
      case 'mobile':
        return <Smartphone className={iconClass} />;
      case 'explorer':
        return <Globe className={iconClass} />;
      case 'devtools':
        return <Wrench className={iconClass} />;
      default:
        return <Cpu className={iconClass} />;
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827] p-6 shadow-2xs space-y-4 hover:border-slate-300 dark:hover:border-white/20 transition-colors flex flex-col justify-between">
      <div className="space-y-3">
        {/* Top header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10">
              {getIcon()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">{software.name}</h3>
                {software.status === 'coming-soon' && (
                  <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 whitespace-nowrap">
                    Akan Segera Terbit
                  </span>
                )}
              </div>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {software.category} &bull; v{software.latestRelease}
              </span>
            </div>
          </div>
        </div>

        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">{software.tagline}</p>

        {/* Platforms */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          {software.platforms.map(p => (
            <PlatformBadge key={p} platform={p} />
          ))}
        </div>

        {/* Highlights */}
        <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-white/10">
          {software.features.slice(0, 3).map((f, idx) => (
            <li key={idx} className="flex items-start gap-1.5">
              <span className="text-slate-400 font-mono">&bull;</span>
              <span className="line-clamp-1">{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Actions */}
      <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-2 text-xs">
        <button
          onClick={() => onNavigateDoc(software.documentationPath)}
          className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Documentation</span>
        </button>

        <button
          onClick={() => onSelect(software.slug)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-950 font-medium shadow-2xs transition-colors"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
