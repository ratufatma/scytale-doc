import { Software } from '../types';

export const SOFTWARE_CATALOG: Software[] = [
  {
    id: 'node',
    name: 'Scytale Node',
    slug: 'node',
    tagline: 'Full consensus validation daemon and peer-to-peer network participant.',
    description: 'The reference implementation of the Scytale protocol daemon written in Rust. It manages persistent blockchain state using redb, maintains the active UTXO set, performs chain validation, executes Proof of Work difficulty retargeting, and powers peer-to-peer block and transaction propagation.',
    category: 'Core Node',
    platforms: ['linux', 'macos', 'windows'],
    documentationPath: '/docs/node',
    repositoryPath: 'https://github.com/scytale-network/scytale/tree/main/crates/node',
    latestRelease: '0.4.2',
    features: [
      'Pure Rust zero-cost safety and concurrency architecture',
      'Embedded redb ACID key-value storage engine for fast, durable queries',
      'Blake3 cryptographic hashing pipeline for blocks, transactions, and state roots',
      'Fully autonomous P2P networking with bounded peer rotation and anti-eclipse protections',
      'Configurable RPC/IPC interface for local client integration and mining coordination',
      'Deterministic mempool eviction with fee-rate ancestor scoring'
    ],
    systemRequirements: {
      os: 'Linux 64-bit (glibc 2.31+ / musl), macOS 12.0+, Windows 10/Server 2019+',
      cpu: '2 cores (x86_64 or ARM64)',
      ram: '2 GB minimum (4 GB recommended for initial block download)',
      storage: '10 GB SSD for current testnet chain state'
    },
    installQuickstart: [
      {
        title: 'Run using binary release (Linux)',
        command: 'tar -xzf scytale-node-v0.4.2-linux-x86_64.tar.gz\n./scytale-node --config scytale.toml',
        description: 'Extract the official archive and launch the daemon with default peer seeds.'
      },
      {
        title: 'Build from source via Cargo',
        command: 'git clone https://github.com/scytale-network/scytale\ncd scytale\ncargo build --release -p scytale-node\n./target/release/scytale-node',
        description: 'Compile the latest tagged commit using the standard Rust toolchain.'
      }
    ]
  },
  {
    id: 'cli',
    name: 'Scytale CLI',
    slug: 'cli',
    tagline: 'Comprehensive command-line tool for node operations, network inspection, and scripting.',
    description: 'The official CLI client designed for node operators, developers, and automated scripts. It provides deep diagnostic commands for querying node status, mining coordination, inspecting mempool entries, broadcasting raw transactions, and testing protocol primitives.',
    category: 'Client Tools',
    platforms: ['linux', 'macos', 'windows'],
    documentationPath: '/docs/cli',
    repositoryPath: 'https://github.com/scytale-network/scytale/tree/main/crates/cli',
    latestRelease: '0.4.2',
    features: [
      'Interactive and non-interactive scripted JSON/text output formats',
      'Direct Unix domain socket IPC connection or authenticated HTTP RPC connection',
      'Granular chain inspection (block by hash or height, raw transaction deserialization)',
      'Built-in mining benchmark tool using Blake3 worker threads',
      'Network peer topology inspector and connection diagnostics'
    ],
    systemRequirements: {
      os: 'Any modern Linux, macOS, or Windows operating system',
      cpu: '1 core',
      ram: '256 MB',
      storage: '20 MB disk space'
    },
    installQuickstart: [
      {
        title: 'Verify local node connection',
        command: 'scytale-cli status',
        description: 'Verify the active local node RPC connection and print sync height.'
      },
      {
        title: 'Inspect latest block header',
        command: 'scytale-cli block get --latest --format json',
        description: 'Retrieve and format the current canonical tip block header.'
      }
    ]
  },
  {
    id: 'wallet',
    name: 'Scytale Wallet',
    slug: 'wallet',
    tagline: 'Deterministic UTXO passbook and key management client.',
    description: 'The standard key manager and transaction construction engine for Scytale. It adheres strictly to the UTXO model, generating deterministic key pairs, computing unspent transaction output balances, signing inputs with constant-time authorization algorithms, and crafting raw transactions with change outputs.',
    category: 'User Applications',
    platforms: ['linux', 'macos', 'windows'],
    documentationPath: '/docs/wallet',
    repositoryPath: 'https://github.com/scytale-network/scytale/tree/main/crates/wallet',
    latestRelease: '0.4.2',
    features: [
      'BIP-39 style deterministic 24-word recovery phrase standard',
      'Encrypted passbook storage on disk using Argon2id + ChaCha20-Poly1305',
      'Automatic coin selection algorithm to minimize transaction size and fees',
      'Cold storage and air-gapped transaction signing support',
      'Zero telemetry and zero external dependency connections'
    ],
    systemRequirements: {
      os: 'Linux, macOS, or Windows',
      cpu: '1 core',
      ram: '512 MB',
      storage: '50 MB disk space'
    },
    installQuickstart: [
      {
        title: 'Initialize a new passbook wallet',
        command: 'scytale-wallet init --passbook ~/.scytale/wallet.passbook',
        description: 'Generate your 24-word mnemonic phrase and create an encrypted passbook.'
      },
      {
        title: 'Generate receiving address',
        command: 'scytale-wallet address new',
        description: 'Derive a new Blake3-keyed recipient address for incoming SCY transfers.'
      }
    ]
  },
  {
    id: 'desktop',
    name: 'Scytale Desktop',
    slug: 'desktop',
    tagline: 'Minimalist desktop GUI for node management and passbook operations.',
    description: 'An open-source desktop interface currently in active staging. It provides a visual dashboard for node synchronization, active peer status, passbook address books, and local transaction history without exposing users to web-based attack vectors.',
    category: 'User Applications',
    platforms: ['linux', 'macos', 'windows'],
    documentationPath: '/docs/wallet',
    repositoryPath: 'https://github.com/scytale-network/scytale-desktop',
    latestRelease: '0.4.2-staging',
    features: [
      'Embedded node controller with one-click background sync',
      'Air-gapped transaction builder with QR code payload display',
      'Local-only telemetry: never communicates with third-party tracking services',
      'Dark and light technical interfaces with high contrast accessibility'
    ],
    systemRequirements: {
      os: 'Linux (AppImage / Flatpak), macOS 12.0+, Windows 10/11',
      cpu: '2 cores',
      ram: '2 GB',
      storage: '200 MB (+ blockchain storage if running full node)'
    },
    installQuickstart: [
      {
        title: 'Status: In Active Staging',
        command: '# Pre-release build instructions:\ngit clone https://github.com/scytale-network/scytale-desktop\ncargo tauri dev',
        description: 'Binary releases are being staged for milestone 2 security evaluation.'
      }
    ]
  },
  {
    id: 'mobile',
    name: 'Scytale Mobile',
    slug: 'mobile',
    tagline: 'Lightweight mobile companion passbook for everyday payments.',
    description: 'A mobile client utilizing SPV (Simplified Payment Verification) / compact block filter synchronization to allow safe, trust-minimized transacting from mobile devices without storing the full chain history.',
    category: 'User Applications',
    platforms: ['android'],
    documentationPath: '/docs/wallet',
    repositoryPath: 'https://github.com/scytale-network/scytale-mobile',
    latestRelease: '0.4.0-preview',
    features: [
      'Compact block filter filtering (BIP-158 inspired) for bandwidth-saving verification',
      'Biometric and hardware enclave key storage protection',
      'Zero-fee local address book with offline QR scanning'
    ],
    systemRequirements: {
      os: 'Android 10.0+ (ARM64)',
      cpu: 'Modern 64-bit ARM processor',
      ram: '2 GB',
      storage: '100 MB free space'
    },
    installQuickstart: [
      {
        title: 'Status: Alpha Staging',
        command: '# Android APK compilation pipeline:\ngit clone https://github.com/scytale-network/scytale-mobile\n./gradlew assembleRelease',
        description: 'Official signed APKs will be released upon completion of consensus light-client audit.'
      }
    ]
  },
  {
    id: 'explorer',
    name: 'Scytale Explorer',
    slug: 'explorer',
    tagline: 'Lightweight, self-hostable block and transaction explorer.',
    description: 'A static, self-contained web explorer that connects directly to any Scytale node over HTTP/IPC to inspect blocks, transactions, mempool state, and difficulty graphs without third-party trackers or analytic cookies.',
    category: 'Network Tools',
    platforms: ['source'],
    documentationPath: '/docs/developers',
    repositoryPath: 'https://github.com/scytale-network/scytale-explorer',
    latestRelease: '0.4.2',
    features: [
      'Connects directly to your local node without intermediary database dependencies',
      'Real-time mempool inspection and UTXO script visualizer',
      'Full cryptographic proof verification directly inside the browser',
      'Zero external web fonts or remote JavaScript assets'
    ],
    systemRequirements: {
      os: 'Any platform with a modern standards-compliant web browser',
      cpu: '1 core',
      ram: '512 MB',
      storage: '10 MB'
    },
    installQuickstart: [
      {
        title: 'Launch local explorer',
        command: 'git clone https://github.com/scytale-network/scytale-explorer\ncd scytale-explorer\nnpm install && npm run build\nnode server.js --node-rpc http://127.0.0.1:8332',
        description: 'Host your own independent explorer pointing to your trusted Scytale node.'
      }
    ]
  },
  {
    id: 'devtools',
    name: 'Developer Tools',
    slug: 'devtools',
    tagline: 'Test harness, mock network generator, and protocol fuzzers.',
    description: 'A collection of developer utilities for testing protocol edge cases, generating mock multi-node local networks, simulating chain reorgs, and fuzzing deserialization boundaries.',
    category: 'Development',
    platforms: ['linux', 'macos', 'windows'],
    documentationPath: '/docs/developers',
    repositoryPath: 'https://github.com/scytale-network/scytale/tree/main/crates/dev-tools',
    latestRelease: '0.4.2',
    features: [
      'Multi-node local cluster orchestration script (`scytale-simnet`)',
      'Continuous differential fuzzing harness for Blake3 block verification',
      'Deterministic UTXO state generator for benchmarking redb throughput',
      'Raw transaction crafting and signing test utility'
    ],
    systemRequirements: {
      os: 'Linux, macOS, or Windows',
      cpu: '4 cores recommended for multi-node simulation',
      ram: '4 GB',
      storage: '1 GB'
    },
    installQuickstart: [
      {
        title: 'Start local 3-node simulation',
        command: 'cargo run -p scytale-simnet -- --nodes 3 --auto-mine',
        description: 'Spin up three isolated local nodes communicating over loopback sockets.'
      }
    ]
  }
];
