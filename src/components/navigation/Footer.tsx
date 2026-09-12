import React from 'react';
import { Layers, ShieldCheck, GitBranch } from 'lucide-react';
import { SITE_CONFIG } from '../../data/config';
import { useLanguage } from '../../context/LanguageContext';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827] text-slate-600 dark:text-slate-400 text-xs mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Col 1: Brand & Identity */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center font-mono text-xs">
                <Layers className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-slate-900 dark:text-white text-sm font-mono tracking-tight">
                {SITE_CONFIG.name}
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="flex items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400 pt-2 font-mono">
              <span className="flex items-center gap-1">
                <GitBranch className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                <span>v{SITE_CONFIG.version} (Testnet Alpha)</span>
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Deterministic Rules</span>
              </span>
            </div>
          </div>

          {/* Col 2: Documentation */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-slate-900 dark:text-white text-xs uppercase tracking-wider font-mono">
              {t.footer.docsTitle}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('/docs/introduction/what-is-scytale')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  What is Scytale?
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/docs/getting-started/installation')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Installation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/docs/getting-started/running-a-node')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Running a Node
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/docs/getting-started/creating-a-wallet')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Creating a Wallet
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/docs/reference/configuration')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Configuration
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Ecosystem & Releases */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-slate-900 dark:text-white text-xs uppercase tracking-wider font-mono">
              {t.footer.softwareTitle}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('/downloads')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Download Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/releases')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Release History
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/software/node')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Scytale Node
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/software/cli')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Scytale CLI
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/software/wallet')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Scytale Wallet
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Protocol & Project */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-slate-900 dark:text-white text-xs uppercase tracking-wider font-mono">
              {t.footer.protocolTitle}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('/protocol')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Protocol Specification
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/network')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Network Parameters
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/developers')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Developer Workflow
                </button>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.githubRepositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.githubIssuesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Issue Tracker
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 dark:text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </div>
          <div className="flex items-center gap-4 font-mono">
            <span>Fixed Supply: 66,000,000 SCY</span>
            <span>&bull;</span>
            <span>Blake3 / redb / PoW</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
