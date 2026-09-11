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
    switch (software.slug) {
      case 'node':
        return <Cpu className="w-5 h-5 text-zinc-900" />;
      case 'cli':
        return <Terminal className="w-5 h-5 text-zinc-900" />;
      case 'wallet':
        return <Wallet className="w-5 h-5 text-zinc-900" />;
      case 'desktop':
        return <Layout className="w-5 h-5 text-zinc-900" />;
      case 'mobile':
        return <Smartphone className="w-5 h-5 text-zinc-900" />;
      case 'explorer':
        return <Globe className="w-5 h-5 text-zinc-900" />;
      case 'devtools':
        return <Wrench className="w-5 h-5 text-zinc-900" />;
      default:
        return <Cpu className="w-5 h-5 text-zinc-900" />;
    }
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-2xs space-y-4 hover:border-zinc-300 transition-colors flex flex-col justify-between">
      <div className="space-y-3">
        {/* Top header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-zinc-100 border border-zinc-200">
              {getIcon()}
            </div>
            <div>
              <h3 className="font-bold text-zinc-950 text-base">{software.name}</h3>
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                {software.category} &bull; v{software.latestRelease}
              </span>
            </div>
          </div>
        </div>

        <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">{software.tagline}</p>

        {/* Platforms */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          {software.platforms.map(p => (
            <PlatformBadge key={p} platform={p} />
          ))}
        </div>

        {/* Highlights */}
        <ul className="space-y-1 text-xs text-zinc-700 pt-2 border-t border-zinc-100">
          {software.features.slice(0, 3).map((f, idx) => (
            <li key={idx} className="flex items-start gap-1.5">
              <span className="text-zinc-400 font-mono">&bull;</span>
              <span className="line-clamp-1">{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Actions */}
      <div className="pt-4 border-t border-zinc-100 flex items-center justify-between gap-2 text-xs">
        <button
          onClick={() => onNavigateDoc(software.documentationPath)}
          className="inline-flex items-center gap-1.5 text-zinc-600 hover:text-zinc-950 font-medium transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Documentation</span>
        </button>

        <button
          onClick={() => onSelect(software.slug)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-medium shadow-2xs transition-colors"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
