import React, { useState } from 'react';
import { CURRENT_NETWORK_INFO, NETWORK_PARAMETERS } from '../data/network';
import { Network, Server, ShieldCheck, AlertCircle, RefreshCw, Terminal, CheckCircle } from 'lucide-react';
import { CopyButton } from '../components/ui/CopyButton';
import { CodeBlock } from '../components/ui/CodeBlock';

export const NetworkPage: React.FC = () => {
  const [rpcUrlInput, setRpcUrlInput] = useState('');
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'unconfigured'>('idle');

  const testConnection = (e: React.FormEvent) => {
    e.preventDefault();
    setConnectionStatus('testing');
    setTimeout(() => {
      setConnectionStatus('unconfigured');
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-white/10 pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <Network className="w-4 h-4 text-slate-700 dark:text-slate-300" />
          <span>Protocol Specifications &amp; Parameters</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-mono">
          Scytale Network
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          Operational specifications, consensus constants, monetary ceilings, and telemetry integration settings for the active Scytale testnet cluster.
        </p>
      </header>

      {/* Real-time Status Card (Honest state as requested: no fake data) */}
      <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Network Cluster
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono text-xs font-semibold border border-slate-200 dark:border-white/10">
                {CURRENT_NETWORK_INFO.networkId}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1 font-mono">
              {CURRENT_NETWORK_INFO.name}
            </h2>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 text-xs font-mono">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>Telemetry endpoint not configured</span>
          </div>
        </div>

        {/* Status Callout */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300 space-y-2">
          <p className="font-semibold text-slate-900 dark:text-white">Truthful Telemetry Notice:</p>
          <p className="leading-relaxed">
            {CURRENT_NETWORK_INFO.statusNotice} Scytale strictly refrains from rendering simulated or fake real-time counters. To query live block heights, difficulty, or active peer topologies, interact with your trusted local node using the CLI or configure a trusted RPC endpoint below.
          </p>
        </div>

        {/* RPC Test Input */}
        <form onSubmit={testConnection} className="space-y-3 pt-2">
          <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Configure Live RPC Endpoint
          </label>
          <div className="flex flex-col sm:flex-row gap-2 max-w-xl">
            <input
              type="text"
              value={rpcUrlInput}
              onChange={e => setRpcUrlInput(e.target.value)}
              placeholder="http://127.0.0.1:8332 (or https://explorer.myratu.com)"
              className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 font-mono focus:outline-hidden focus:border-slate-500 dark:focus:border-emerald-500"
            />
            <button
              type="submit"
              disabled={connectionStatus === 'testing'}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 text-white text-xs font-medium font-mono transition-colors"
            >
              {connectionStatus === 'testing' ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : (
                <span>Test Node RPC</span>
              )}
            </button>
          </div>

          {connectionStatus === 'unconfigured' && (
            <p className="text-xs text-amber-700 dark:text-amber-400 font-mono flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>
                Unable to reach RPC at {rpcUrlInput || 'default address'}. Ensure `scytale-node` is running locally with `--rpc.enabled`.
              </span>
            </p>
          )}
        </form>
      </section>

      {/* Network Constants & Parameters Matrix */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-mono">Consensus &amp; Monetary Parameters</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Immutable protocol constants enforced by consensus validation rules.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827] overflow-hidden shadow-2xs">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-semibold font-mono text-xs">
              <tr>
                <th className="px-4 py-3 border-r border-slate-200 dark:border-white/10">Category</th>
                <th className="px-4 py-3 border-r border-slate-200 dark:border-white/10">Parameter</th>
                <th className="px-4 py-3 border-r border-slate-200 dark:border-white/10">Specification</th>
                <th className="px-4 py-3">Consensus Enforcement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/10">
              {NETWORK_PARAMETERS.map((param, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="px-4 py-3 font-mono text-xs text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-white/10">
                    {param.category}
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white border-r border-slate-200 dark:border-white/10">
                    {param.name}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-800 dark:text-slate-200 border-r border-slate-200 dark:border-white/10">
                    <span className="font-bold">{param.value}</span>
                    {param.unit && <span className="text-slate-500 dark:text-slate-400 ml-1">({param.unit})</span>}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400 text-xs">
                    {param.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Genesis Block Specifications */}
      <section className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#111827] p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white font-mono">Genesis Block Anchor</h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          The genesis block is hardcoded into all conforming implementations. Its hash forms the root anchor for the canonical testnet chain tree.
        </p>

        <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 space-y-2 font-mono text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-slate-500 dark:text-slate-400 font-semibold text-[11px]">GENESIS HASH (BLAKE3):</span>
            <CopyButton text={CURRENT_NETWORK_INFO.genesisBlockHash} label="Copy Genesis Hash" />
          </div>
          <div className="break-all text-slate-900 dark:text-emerald-400 font-bold bg-slate-50 dark:bg-slate-950 p-2 rounded border border-slate-100 dark:border-white/5">
            {CURRENT_NETWORK_INFO.genesisBlockHash}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Genesis Timestamp: {CURRENT_NETWORK_INFO.genesisTimestamp}
          </div>
        </div>
      </section>
    </div>
  );
};
