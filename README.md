# Scytale Official Portal & Documentation Engine

The official web portal, technical documentation, binary download center, release ledger, and protocol specification engine for **Scytale**—a lightweight blockchain network built around simple, verifiable primitives.

---

## 1. Project Overview

Scytale is an open-source, engineering-driven blockchain protocol written in Rust. It prioritizes protocol transparency, deterministic execution, and minimal systemic complexity:

- **UTXO Accounting Model**: Discrete, unspent outputs eliminating balance-race hazards and enabling parallel validation.
- **Blake3 Cryptographic Hashing**: Tree-hashed, SIMD-accelerated 256-bit digests across headers, transactions, and addresses.
- **redb Storage Engine**: Embedded, pure-Rust transactional key-value store with ACID guarantees and zero native C++ runtime dependencies.
- **Proof of Work**: Unforgeable objective ordering via Blake3 difficulty retargeting.
- **Fixed Supply**: Mathematical cap strictly set to 42,000,000 SCY.

This portal serves as the authoritative entry point for node operators, miners, wallet users, developers, and protocol auditors.

---

## 2. Information Architecture

```
/                           # Homepage (Primitives, status, software preview, quickstart)
├── /docs/                  # Documentation 3-column portal
│   ├── /docs/intro/        # Introduction, rationale, architecture, status
│   ├── /docs/getting-started/ # Installation, running a node, wallet passbook, sending SCY
│   ├── /docs/node/         # Node lifecycle, redb storage, mining, troubleshooting
│   ├── /docs/cli/          # Command-line interface reference & automation
│   ├── /docs/protocol/     # Formal UTXO mechanics, Coinbase, Blake3, difficulty
│   ├── /docs/devs/         # Build workflow, testing, simnet cluster, contribution
│   └── /docs/reference/    # scytale.toml configuration & consensus error codes
├── /downloads/             # Centralized binary downloads (Linux, macOS, Windows, Android, Source)
├── /releases/              # Release ledger, version timeline (v0.4.2, v0.4.1, v0.4.0)
├── /releases/:version/     # Granular release notes, compiled targets, SHA-256 digests
├── /software/              # Official software catalog (Node, CLI, Wallet, Desktop, Mobile, etc.)
├── /software/:slug/        # Detailed software specifications, system requirements, quickstart
├── /network/               # Consensus parameters, genesis anchor, RPC telemetry connector
├── /protocol/              # Deep-dive interactive protocol tabs & ASCII diagrams
├── /developers/            # Engineering crate hierarchy, Cargo workflows, and local testnet
└── /search/                # Global keyword search indexing docs, CLI commands, and releases
```

---

## 3. Requirements & Prerequisites

- **Node.js**: `v18.0.0` or higher
- **Package Manager**: `npm` (v9+)
- **Build Engine**: Vite + TypeScript

---

## 4. Development & Build

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```
The application will be served on `http://localhost:3000`.

### Production Build
```bash
npm run build
```
Generates production-ready, minified static assets in the `dist/` directory.

### Run Type Checks and Linters
```bash
npm run lint
```

---

## 5. Content Management & Maintainer Workflow

The architecture decouples UI components from release, software, and documentation data. Maintainers update metadata in central data files without modifying component templates:

### A. Adding a New Release
Edit `src/data/releases.ts`:
```typescript
{
  id: 'v0.4.3',
  version: '0.4.3',
  releaseDate: 'October 15, 2026',
  status: 'latest', // 'latest' | 'stable' | 'pre-release' | 'archived'
  summary: 'Consensus upgrade description...',
  highlights: ['Incremental sync speedup', 'Mempool fee refactor'],
  changes: {
    features: ['...'],
    improvements: ['...'],
    bugFixes: ['...'],
    breakingChanges: ['...'],
    securityNotes: ['...']
  },
  artifacts: DOWNLOAD_ARTIFACTS.filter(a => a.version === '0.4.3')
}
```

### B. Adding Download Artifacts & Updating Checksums
Edit `src/data/downloads.ts`:
```typescript
{
  id: 'node-v0.4.3-linux-x86_64',
  product: 'scytale-node',
  productName: 'Scytale Node',
  version: '0.4.3',
  platform: 'linux',
  architecture: 'x86_64',
  filename: 'scytale-node-v0.4.3-linux-x86_64.tar.gz',
  size: '15.2 MB',
  sha256: '<computed-64-character-sha256-hash>',
  signature: {
    status: 'verified',
    signer: 'Scytale Release Authority <releases@scytale-network.org>',
    fingerprint: '7A8F 3B90 41C2 8E6D 9051 B8A1 24DC 5E78 91FA 3320'
  },
  url: 'https://github.com/scytale-network/scytale/releases/download/v0.4.3/...',
  isConfigured: true
}
```

### C. Adding or Modifying Documentation Pages
Edit `src/data/docs.ts`. Add pages with structured content blocks:
- `heading`: Section headers (`level: 2 | 3 | 4`)
- `paragraph`: Formatted text
- `code`: Code blocks with language and copyable text
- `callout`: Alert boxes (`note`, `tip`, `warning`, `security`)
- `table`: Structured reference tables
- `diagram`: Monospace ASCII diagrams

---

## 6. Integrity & Security Verification

Every binary artifact distributed via Scytale includes a published SHA-256 digest and detached PGP signature:

```bash
# Verify checksum
sha256sum scytale-node-v0.4.2-linux-x86_64.tar.gz

# Verify PGP signature against the official Release Authority key
gpg --verify scytale-node-v0.4.2-linux-x86_64.tar.gz.asc
```

---

## 7. License

Scytale software and documentation are dual-licensed under Apache-2.0 and MIT.
