import React from 'react';
import { Terminal, GitPullRequest } from 'lucide-react';
import { CodeBlock } from '../components/ui/CodeBlock';
import { PreCopyButton } from '../components/ui/PreCopyButton';
import { useLanguage } from '../context/LanguageContext';

export const DevelopersPage: React.FC = () => {
  const { language } = useLanguage();

  const crateStructure = `scytale/
├── Cargo.toml                 # Workspace manifest
├── crates/
│   ├── primitives/            # Cryptographic types, Blake3 wrappers, transaction serialization
│   ├── consensus/             # PoW validation, difficulty adjustment, chain selection
│   ├── storage/               # redb database controller, tables, migration utilities
│   ├── network/               # P2P actor, wire framing, peer discovery & ban scoring
│   ├── mempool/               # In-memory transaction pool with fee-rate ancestor scoring
│   ├── node/                  # Primary daemon wiring storage, consensus, network, & RPC
│   ├── cli/                   # Administrative command line interface tool
│   ├── wallet/                # UTXO coin selection, passbook encryption, signing
│   └── dev-tools/             # Fuzzers, cluster simulation, benchmarking
└── tests/                     # Multi-node integration test scenarios`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-white/10 pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <Terminal className="w-4 h-4 text-slate-700 dark:text-slate-300" />
          <span>Engineering Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-mono">
          {language === 'id' ? 'Panduan Pengembang & Perkakas' : 'Developer Guide & Tooling'}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          {language === 'id'
            ? 'Instruksi untuk berkontribusi pada protokol Scytale, kompilasi dari kode sumber, menjalankan rangkaian pengujian, dan orkestrasi jaringan simulasi multi-node lokal.'
            : 'Instructions for contributing to the Scytale protocol, compiling from source, executing the test suite, and orchestrating local multi-node simulation networks.'}
        </p>
      </header>

      {/* Repository Structure */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white font-mono">
          {language === 'id' ? 'Struktur Crate Ruang Kerja' : 'Workspace Crate Structure'}
        </h2>
        <div className="relative group/pre p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800 dark:border-white/10">
          <div className="absolute top-2.5 right-2.5 opacity-0 group-hover/pre:opacity-100 focus-within:opacity-100 transition-opacity duration-150 z-10">
            <PreCopyButton text={crateStructure} />
          </div>
          <pre>{crateStructure}</pre>
        </div>
      </section>

      {/* Build from Source */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white font-mono">
          {language === 'id' ? 'Kompilasi dari Kode Sumber' : 'Compiling from Source'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          {language === 'id'
            ? 'Kompilasi seluruh proyek menggunakan perkakas standar Rust (memerlukan Rust 1.75+):'
            : 'Compile the entire project using standard Rust tooling (Rust 1.75+ required):'}
        </p>
        <CodeBlock
          language="bash"
          caption={language === 'id' ? 'Alur Kerja Bangun & Uji' : 'Build and Test Workflow'}
          code={`# 1. Clone canonical repository\ngit clone https://github.com/ratufatma/scytale.git\ncd scytale\n\n# 2. Compile all crates with release profile\ncargo build --release\n\n# 3. Run all unit tests and invariant assertions\ncargo test --workspace\n\n# 4. Run strict linting passes\ncargo clippy --all-targets -- -D warnings\n\n# 5. Check formatting\ncargo fmt --check`}
        />
      </section>

      {/* Local Simulation Network */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white font-mono">
          Simnet: Local Multi-Node Cluster
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          {language === 'id'
            ? 'Untuk pengujian integrasi dan fuzzing konsensus, Scytale menyertakan harness lokal otomatis yang menjalankan beberapa daemon berkomunikasi pada antarmuka loopback:'
            : 'For integration testing and consensus fuzzing, Scytale includes an automated multi-node local harness that spins up multiple communicating daemons on loopback interfaces:'}
        </p>
        <CodeBlock
          language="bash"
          caption={language === 'id' ? 'Jalankan Simnet Lokal' : 'Launch Local Simnet'}
          code={`cargo run -p scytale-simnet -- \\\n  --nodes 3 \\\n  --block-time-ms 500 \\\n  --auto-mine`}
        />
      </section>

      {/* Contributing Guidelines */}
      <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#111827] p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-lg">
          <GitPullRequest className="w-5 h-5 text-slate-900 dark:text-slate-100" />
          <span>{language === 'id' ? 'Prinsip Kontribusi' : 'Contribution Invariants'}</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {language === 'id'
            ? 'Setiap kontribusi harus menjunjung tinggi komitmen proyek terhadap kesederhanaan radikal dan keselamatan:'
            : "Every contribution must uphold the project's commitment to radical simplicity and safety:"}
        </p>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside">
          <li><strong>{language === 'id' ? 'Nol Dependensi C Tidak Terverifikasi:' : 'Zero Unverified C Dependencies:'}</strong> {language === 'id' ? 'Jangan memperkenalkan pustaka C/C++ eksternal. Semua operasi penyimpanan, kriptografi, dan jaringan harus tetap Rust murni.' : 'Do not introduce external native C/C++ libraries. All storage, cryptography, and network operations must remain pure Rust.'}</li>
          <li><strong>{language === 'id' ? 'Pengujian Deterministik:' : 'Deterministic Tests:'}</strong> {language === 'id' ? 'Setiap perubahan aturan protokol harus dipasangkan dengan pengujian regresi adverserial otomatis yang mensimulasikan fork jaringan dan tanda tangan tidak valid.' : 'Any protocol rule change must be paired with automated adversarial regression tests simulating network forks and invalid signatures.'}</li>
          <li><strong>{language === 'id' ? 'Tanpa Pembengkakan Fitur:' : 'No Scope Creep:'}</strong> {language === 'id' ? 'Fitur yang dapat diimplementasikan dengan bersih di lapisan klien atau RPC tidak boleh ditambahkan ke mesin konsensus inti.' : 'Features that can be implemented cleanly at the client or RPC layer must not be added to the core consensus engine.'}</li>
        </ul>
      </section>
    </div>
  );
};
