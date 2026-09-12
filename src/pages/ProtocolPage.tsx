import React, { useState } from 'react';
import { Cpu, Lock, Database, Terminal, GitBranch, ArrowRight, ShieldCheck } from 'lucide-react';
import { CodeBlock } from '../components/ui/CodeBlock';
import { Callout } from '../components/ui/Callout';
import { PreCopyButton } from '../components/ui/PreCopyButton';

const TX_OBJECT_DIAGRAM = `+-----------------------------------------------------------------------------------+
|                            Scytale Transaction Object                             |
+-----------------------------------------------------------------------------------+
|  version: u32 (1)                                                                 |
|  lock_time: u64 (unix seconds or block height)                                    |
|                                                                                   |
|  inputs: Vec<TxIn>                                                                |
|  +-----------------------------------------------------------------------------+  |
|  |  previous_output: { txid: [u8; 32], vout: u32 }                             |  |
|  |  signature_script: Vec<u8> (Schnorr/Ed25519 signature + public key)       |  |
|  |  sequence: u32                                                              |  |
|  +-----------------------------------------------------------------------------+  |
|                                                                                   |
|  outputs: Vec<TxOut>                                                              |
|  +-----------------------------------------------------------------------------+  |
|  |  value: u64 (atomic SCY units, 1 SCY = 100,000,000)                         |  |
|  |  public_key_script: Vec<u8> (Address predicate verification)               |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+`;

const REDB_SCHEMA_CODE = `// Table Definitions in crates/storage/src/schema.rs
pub const TABLE_HEADERS: TableDefinition<&[u8; 32], &[u8]> = TableDefinition::new("headers");
pub const TABLE_BLOCKS: TableDefinition<u64, &[u8]> = TableDefinition::new("blocks");
pub const TABLE_UTXO: TableDefinition<&[u8; 36], &[u8]> = TableDefinition::new("utxo_set");
pub const TABLE_CHAIN_INDEX: TableDefinition<u64, &[u8; 32]> = TableDefinition::new("chain_index");
pub const TABLE_META: TableDefinition<&str, &[u8]> = TableDefinition::new("meta");`;

const P2P_WIRE_DIAGRAM = `+------------------+-------------------+-----------------+-------------------+
| Magic (4 bytes)  | Command (12 bytes)| Length (4 bytes)| Checksum (4 bytes)|
| 0x53 0x43 0x59 0x54 ("SCYT")         | Little-endian   | Blake3 prefix     |
+------------------+-------------------+-----------------+-------------------+
| Payload (Length bytes) ...                                                 |
+-----------------------------------------------------------------------------+`;

export const ProtocolPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'utxo' | 'pow' | 'storage' | 'hashing' | 'reorg' | 'p2p'>('utxo');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-white/10 pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Core Engineering Specification</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-mono">
          Scytale Protocol Specification
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          Formal protocol mechanics, invariant rules, binary serialization layouts, and consensus state machines governing the Scytale distributed ledger.
        </p>
      </header>

      {/* Interactive Topic Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-white/10 text-xs font-mono">
        {[
          { id: 'utxo', label: '1. UTXO & Transaction Model' },
          { id: 'pow', label: '2. PoW & Difficulty Target' },
          { id: 'hashing', label: '3. Blake3 Hashing' },
          { id: 'storage', label: '4. redb Persistence' },
          { id: 'reorg', label: '5. Chain Selection & Reorg' },
          { id: 'p2p', label: '6. P2P Wire Protocol' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: UTXO Model */}
      {activeTab === 'utxo' && (
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-mono">1. UTXO &amp; Transaction Model</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">Deterministic State Transitions</p>
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
            Scytale transactions operate on immutable outpoints. A transaction consumes previously created unspent transaction outputs (UTXOs) in their entirety and produces new outputs. Unspent values cannot be partially decremented.
          </p>

          {/* ASCII Architecture Diagram */}
          <div className="relative group/pre p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800 dark:border-white/10 leading-normal">
            <div className="absolute top-2.5 right-2.5 opacity-0 group-hover/pre:opacity-100 focus-within:opacity-100 transition-opacity duration-150 z-10">
              <PreCopyButton text={TX_OBJECT_DIAGRAM} />
            </div>
            <pre className="selection:bg-slate-800">{TX_OBJECT_DIAGRAM}</pre>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827] space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm font-mono">Consensus Invariant: Conservation</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                The arithmetic sum of output amounts must never exceed the sum of referenced input amounts. Any positive remainder is permanently allocated as the miner fee:
              </p>
              <div className="p-2 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10">
                Fee = ∑(Input.value) - ∑(Output.value) ≥ 0
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827] space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm font-mono">Coinbase Transaction Rules</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                The first transaction in every block has a single input with a zeroed TxID (32 zero bytes) and index 0xFFFFFFFF. Its output sum is bounded by:
              </p>
              <div className="p-2 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10">
                Coinbase.value ≤ BlockSubsidy(Height) + TotalBlockFees
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tab 2: Proof of Work */}
      {activeTab === 'pow' && (
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-mono">2. Proof of Work &amp; Difficulty Adjustment</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">Blake3 Objective Consensus Ordering</p>
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
            Proof of work provides objective, unforgeable consensus history. Valid blocks must satisfy the inequality:
          </p>

          <div className="p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs border border-slate-800 dark:border-white/10">
            <code>Blake3(HeaderBytes) &le; CurrentTarget</code>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-mono">Difficulty Retargeting Window</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Every 1,440 blocks (~24 hours at 60s target block time), all nodes independently recompute the target threshold using cumulative timestamps from the previous window.
            </p>
            <CodeBlock
              language="rust"
              caption="Consensus Retargeting Logic"
              code="pub fn compute_target(prev_target: U256, actual_time: u64) -> U256 {\n    const TARGET_WINDOW_SECS: u64 = 1440 * 60; // 86,400s\n    // Clamp adjustment factor to [1/4, 4x] to prevent extreme swings\n    let clamped_time = actual_time.clamp(TARGET_WINDOW_SECS / 4, TARGET_WINDOW_SECS * 4);\n    \n    prev_target.saturating_mul(U256::from(clamped_time)) / U256::from(TARGET_WINDOW_SECS)\n}"
            />
          </div>
        </section>
      )}

      {/* Tab 3: Blake3 Hashing */}
      {activeTab === 'hashing' && (
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-mono">3. Blake3 Cryptographic Hashing</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">Universal Cryptographic Primitive</p>
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
            Blake3 was selected as the sole cryptographic hash function for Scytale due to its verified 128-bit security level, pure tree-hashing architecture, and exceptional performance on commodity hardware without custom ASICs.
          </p>

          <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827] overflow-hidden shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-semibold font-mono text-xs">
                <tr>
                  <th className="px-4 py-3 border-r border-slate-200 dark:border-white/10">Domain</th>
                  <th className="px-4 py-3 border-r border-slate-200 dark:border-white/10">Input Data</th>
                  <th className="px-4 py-3">Output Digest</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/10">
                <tr>
                  <td className="px-4 py-3 font-semibold font-mono text-slate-800 dark:text-slate-200 border-r border-slate-200 dark:border-white/10">Block Header Hash</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400 font-mono text-xs border-r border-slate-200 dark:border-white/10">80-byte serialized header (version + prev_hash + merkle_root + timestamp + bits + nonce)</td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-mono text-xs">32 bytes (Checked against Target)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold font-mono text-slate-800 dark:text-slate-200 border-r border-slate-200 dark:border-white/10">Transaction ID</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400 font-mono text-xs border-r border-slate-200 dark:border-white/10">Blake3(Blake3(serialized_tx_bytes))</td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-mono text-xs">32 bytes unique TxID</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold font-mono text-slate-800 dark:text-slate-200 border-r border-slate-200 dark:border-white/10">Merkle Root</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400 font-mono text-xs border-r border-slate-200 dark:border-white/10">Binary tree leaf pairs of all transaction IDs in the block</td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-mono text-xs">32 bytes root committed in header</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Tab 4: redb Storage */}
      {activeTab === 'storage' && (
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-mono">4. redb Embedded Storage Engine</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">Safe, Pure-Rust ACID Key-Value Storage</p>
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
            Scytale stores all chain state in `redb`. Because redb is written in 100% safe Rust, the daemon has zero dependency on C++ runtime linkers or dynamic libraries.
          </p>

          <div className="relative group/pre p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800 dark:border-white/10">
            <div className="absolute top-2.5 right-2.5 opacity-0 group-hover/pre:opacity-100 focus-within:opacity-100 transition-opacity duration-150 z-10">
              <PreCopyButton text={REDB_SCHEMA_CODE} />
            </div>
            <pre className="selection:bg-slate-800">{REDB_SCHEMA_CODE}</pre>
          </div>
        </section>
      )}

      {/* Tab 5: Chain Selection & Reorg */}
      {activeTab === 'reorg' && (
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-mono">5. Chain Selection &amp; Reorganization</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">Cumulative Work Consensus Rule</p>
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
            When competing chain branches are broadcast across the P2P network, nodes select the branch with the highest cumulative chain work (total expected Blake3 hashes), not merely block height.
          </p>

          <Callout type="warning" title="Reorganization Invariant">
            During a chain reorganization, all UTXOs created on the superseded branch are revoked from the redb UTXO table, while original spent outputs are restored. Valid transactions are returned to the local mempool.
          </Callout>
        </section>
      )}

      {/* Tab 6: P2P */}
      {activeTab === 'p2p' && (
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-mono">6. Peer-to-Peer Wire Framing</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">Direct TCP Socket Communication</p>
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
            Nodes communicate over TCP on port 9000 using a compact binary framing standard. Every message packet begins with a 4-byte network magic delimiter followed by the command name, length, and payload checksum.
          </p>

          <div className="relative group/pre p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800 dark:border-white/10">
            <div className="absolute top-2.5 right-2.5 opacity-0 group-hover/pre:opacity-100 focus-within:opacity-100 transition-opacity duration-150 z-10">
              <PreCopyButton text={P2P_WIRE_DIAGRAM} />
            </div>
            <pre className="selection:bg-slate-800">{P2P_WIRE_DIAGRAM}</pre>
          </div>
        </section>
      )}
    </div>
  );
};
