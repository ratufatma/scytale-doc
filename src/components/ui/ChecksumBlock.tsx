import React from 'react';
import { CopyButton } from './CopyButton';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import { SignatureInfo } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface ChecksumBlockProps {
  sha256: string;
  filename: string;
  signature?: SignatureInfo;
  id?: string;
}

export const ChecksumBlock: React.FC<ChecksumBlockProps> = ({
  sha256,
  filename,
  signature,
  id
}) => {
  const { language } = useLanguage();
  const isConfigured = !sha256.toLowerCase().includes('pending') && sha256.length === 64;

  return (
    <div
      id={id || `checksum-${filename.replace(/[^a-zA-Z0-9]/g, '-')}`}
      className="rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827] p-3.5 text-xs text-slate-700 dark:text-slate-300 space-y-2.5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
          <span>SHA-256 Digest</span>
          {isConfigured ? (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
              Official
            </span>
          ) : (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50 font-mono">
              {language === 'id' ? 'Menunggu Build' : 'Pending Build'}
            </span>
          )}
        </div>

        {signature && signature.status === 'verified' && (
          <div className="flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{language === 'id' ? 'Tanda Tangan PGP Terverifikasi' : 'PGP Signature Verified'}</span>
          </div>
        )}

        {signature && signature.status === 'unconfigured' && (
          <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{language === 'id' ? 'Tanda Tangan Tertunda' : 'Signature Pending'}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-2 p-2 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 font-mono text-[11px] break-all">
        <span className="text-slate-800 dark:text-slate-200">{sha256}</span>
        {isConfigured && <CopyButton text={sha256} label={language === 'id' ? 'Salin Hash' : 'Copy Hash'} className="shrink-0" />}
      </div>

      {isConfigured && (
        <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
          <p className="font-medium text-slate-600 dark:text-slate-400">
            {language === 'id' ? 'Perintah verifikasi:' : 'Verification command:'}
          </p>
          <div className="flex items-center justify-between p-1.5 rounded bg-slate-950 text-slate-300 border border-slate-800 dark:border-white/10 font-mono">
            <code>sha256sum {filename}</code>
            <CopyButton
              text={`sha256sum ${filename}`}
              label={language === 'id' ? 'Salin' : 'Copy'}
              className="border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
            />
          </div>
        </div>
      )}
    </div>
  );
};
