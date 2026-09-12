import React from 'react';
import { DownloadArtifact } from '../../types';
import { PlatformBadge, ArchitectureBadge } from '../ui/Badges';
import { ChecksumBlock } from '../ui/ChecksumBlock';
import { Download, AlertCircle, FileCode, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface DownloadCardProps {
  artifact: DownloadArtifact;
}

export const DownloadCard: React.FC<DownloadCardProps> = ({ artifact }) => {
  const { language } = useLanguage();

  return (
    <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827] p-5 shadow-2xs space-y-4 hover:border-slate-300 dark:hover:border-white/20 transition-colors">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-white/10 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">{artifact.productName}</h3>
            <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              v{artifact.version}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">{artifact.filename}</p>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <PlatformBadge platform={artifact.platform} />
          <ArchitectureBadge arch={artifact.architecture} />
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono px-2 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded">
            {artifact.size}
          </span>
        </div>
      </div>

      {/* Checksum & Signature Block */}
      <ChecksumBlock
        sha256={artifact.sha256}
        filename={artifact.filename}
        signature={artifact.signature}
      />

      {/* Notes */}
      {artifact.notes && (
        <p className="text-xs text-slate-500 dark:text-slate-400 italic bg-slate-50/70 dark:bg-slate-800/40 p-2.5 rounded border border-slate-200/60 dark:border-white/10">
          {artifact.notes}
        </p>
      )}

      {/* Download / Action Row */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
        {artifact.isConfigured ? (
          <>
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>{language === 'id' ? 'Aset rilis terverifikasi & siap' : 'Release asset verified & ready'}</span>
            </div>
            <a
              href={artifact.url}
              download
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-950 text-xs font-medium shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{language === 'id' ? `Unduh Biner (${artifact.size})` : `Download Binary (${artifact.size})`}</span>
            </a>
          </>
        ) : (
          <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-lg bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-xs text-amber-900 dark:text-amber-300">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>{language === 'id' ? 'Aset rilis belum dikonfigurasi. Bangun dari sumber tersedia.' : 'Release asset not configured yet. Build from source available.'}</span>
            </div>
            <div className="inline-flex items-center gap-1 text-slate-700 dark:text-slate-300 font-mono font-medium">
              <FileCode className="w-3.5 h-3.5" />
              <span>cargo build --release</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
