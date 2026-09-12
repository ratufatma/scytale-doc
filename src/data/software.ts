import { Software } from '../types';

export const SOFTWARE_CATALOG: Software[] = [
  {
    id: 'node',
    name: 'Scytale Node',
    slug: 'node',
    tagline: 'Full consensus validation daemon and peer-to-peer network participant.',
    description: 'The reference implementation of the Scytale protocol daemon written in Rust. It manages persistent blockchain state using redb, maintains the active UTXO set, performs chain validation, executes Proof of Work difficulty retargeting, and powers peer-to-peer block and transaction propagation.',
    category: 'Core Node',
    platforms: ['linux'],
    documentationPath: '/docs/node-ops/quickstart',
    repositoryPath: 'https://github.com/ratufatma/scytale/tree/main/apps/scytale-node',
    latestRelease: '0.4.0',
    status: 'active',
    features: [
      'Pure Rust zero-cost safety and concurrency architecture',
      'Embedded redb ACID key-value storage engine for fast, durable queries',
      'Blake3 cryptographic hashing pipeline for blocks, transactions, and state roots',
      'Autonomous P2P networking with Gossipsub block propagation and Kademlia DHT discovery',
      'Configurable HTTP RPC gateway (:8332) and Unix IPC socket interface',
      'Embedded Stratum mining pool server (:3333) with auto-diff target scaling and memory hardening',
      'Deterministic mempool eviction with fee-rate priority sorting'
    ],
    systemRequirements: {
      os: 'Linux 64-bit (glibc 2.31+ / musl)',
      cpu: '2 cores (x86_64)',
      ram: '2 GB minimum (4 GB recommended for initial block download)',
      storage: '10 GB SSD for current testnet chain state'
    },
    installQuickstart: [
      {
        title: 'Run using binary release (Linux)',
        command: 'tar -xzvf scytale-v0.4.0-testnet-linux-x86_64.tar.gz\ncd scytale-v0.4.0-testnet-linux-x86_64\n./scytale-node start --stratum-bind 0.0.0.0:3333 --miner-address <ALAMAT_DOMPET_SCY_ANDA>',
        description: 'Extract the official archive and launch the daemon with embedded Stratum mining pool.'
      },
      {
        title: 'Build from source via Cargo',
        command: 'git clone https://github.com/ratufatma/scytale\ncd scytale\ncargo build --release -p scytale-node -p scytale-cli\n./target/release/scytale-node start',
        description: 'Compile the latest tagged commit using the standard Rust toolchain.'
      }
    ]
  },
  {
    id: 'cli',
    name: 'Scytale CLI',
    slug: 'cli',
    tagline: 'Comprehensive command-line tool for node operations, network inspection, and wallet management.',
    description: 'The official CLI client designed for node operators, miners, and developers. It provides deep diagnostic commands for querying node status, generating BIP-39 wallets, inspecting passbook balances, broadcasting raw transactions, and coordinating mining payout addresses.',
    category: 'Client Tools',
    platforms: ['linux'],
    documentationPath: '/docs/api/cli',
    repositoryPath: 'https://github.com/ratufatma/scytale/tree/main/apps/scytale-cli',
    latestRelease: '0.4.0',
    status: 'active',
    features: [
      'BIP-39 mnemonic phrase generation (12/24 words) and Bech32m address derivation',
      'Direct Unix domain socket IPC connection or authenticated HTTP RPC connection',
      'Granular chain inspection (block by hash or height, tip status, passbook balances)',
      'Transaction builder for Ed25519 P2PKH transfer execution',
      'Integrated mining address and worker configuration'
    ],
    systemRequirements: {
      os: 'Any modern Linux 64-bit operating system',
      cpu: '1 core',
      ram: '256 MB',
      storage: '20 MB disk space'
    },
    installQuickstart: [
      {
        title: 'Create new wallet address',
        command: './scytale-cli wallet new --mnemonic',
        description: 'Generate a new Ed25519 keypair and display the Bech32 address (scy1...).'
      },
      {
        title: 'Inspect node runtime status',
        command: './scytale-cli status',
        description: 'Query active block height, tip hash, and mining status from local node.'
      }
    ]
  },
  {
    id: 'wallet',
    name: 'Scytale Wallet',
    slug: 'wallet',
    tagline: 'Deterministic UTXO passbook and key management client.',
    description: 'The standard non-custodial key manager and transaction construction engine for Scytale. It adheres strictly to the UTXO model, generating deterministic key pairs, computing unspent transaction output balances, and crafting raw transactions with change outputs.',
    category: 'User Applications',
    platforms: ['linux'],
    documentationPath: '/docs/api/cli',
    repositoryPath: 'https://github.com/ratufatma/scytale/tree/main/apps/scytale-cli',
    latestRelease: '0.3.0',
    status: 'active',
    features: [
      'BIP-39 deterministic 12/24-word recovery phrase standard',
      'POSIX 0600 secure file permission enforcement for wallet keys',
      'Automatic coin selection algorithm to minimize transaction size and fees',
      'Cold storage and air-gapped transaction signing support',
      'Zero external web telemetry dependencies'
    ],
    systemRequirements: {
      os: 'Linux 64-bit',
      cpu: '1 core',
      ram: '256 MB',
      storage: '50 MB disk space'
    },
    installQuickstart: [
      {
        title: 'Initialize a new wallet',
        command: 'scytale-cli wallet new --mnemonic',
        description: 'Generate your mnemonic phrase and create your non-custodial wallet file.'
      },
      {
        title: 'Check confirmed balance',
        command: 'scytale-cli wallet balance --address <ALAMAT_SCY>',
        description: 'Query active UTXO set for confirmed and unconfirmed Quanta balances.'
      }
    ]
  },
  {
    id: 'desktop',
    name: 'Scytale Desktop (GUI)',
    slug: 'desktop',
    tagline: 'Minimalist desktop GUI for node management and passbook operations.',
    description: 'An open-source desktop interface currently in active research and development (R&D). It provides a visual dashboard for node synchronization, active peer status, passbook address books, and local transaction history without exposing users to web-based attack vectors.',
    category: 'User Applications',
    platforms: ['linux', 'macos', 'windows'],
    documentationPath: '/docs/roadmap/desktop-extension-wallet',
    repositoryPath: 'https://github.com/ratufatma/scytale-desktop',
    latestRelease: 'Fase 2 (R&D)',
    status: 'coming-soon',
    badge: 'Akan Segera Terbit (Fase 2)',
    features: [
      'Embedded node controller with one-click background sync',
      'Air-gapped transaction builder with QR code payload display',
      'Local-only telemetry: never communicates with third-party tracking services',
      'Dark and light technical interfaces with high contrast accessibility'
    ],
    systemRequirements: {
      os: 'Linux (AppImage), macOS 12.0+, Windows 10/11',
      cpu: '2 cores',
      ram: '2 GB',
      storage: '200 MB (+ blockchain storage if running full node)'
    },
    installQuickstart: [
      {
        title: 'Status: Akan Segera Terbit (Fase 2)',
        command: '# Tahap Riset dan Pengembangan (R&D)\n# Rilis dijadwalkan pada roadmap ekosistem Scytale Fase 2.',
        description: 'Fitur ini sedang dalam tahap riset dan pengembangan (R&D).'
      }
    ]
  },
  {
    id: 'mobile',
    name: 'Scytale Mobile',
    slug: 'mobile',
    tagline: 'Lightweight mobile companion passbook for everyday payments.',
    description: 'A mobile client utilizing compact block filter synchronization to allow safe, trust-minimized transacting from mobile devices without storing the full chain history.',
    category: 'User Applications',
    platforms: ['android'],
    documentationPath: '/docs/roadmap/desktop-extension-wallet',
    repositoryPath: 'https://github.com/ratufatma/scytale',
    latestRelease: 'Fase 2 (R&D)',
    status: 'coming-soon',
    badge: 'Akan Segera Terbit (Fase 2)',
    features: [
      'Compact block filter filtering for bandwidth-saving verification',
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
        title: 'Status: Akan Segera Terbit (Fase 2)',
        command: '# Rilis dijadwalkan pada fase pengembangan berikutnya.',
        description: 'Tahap riset dan pengembangan (R&D) light-client.'
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
    documentationPath: '/docs/api/explorer',
    repositoryPath: 'https://github.com/ratufatma/scytale/tree/main/explorer',
    latestRelease: '0.3.0',
    status: 'active',
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
        title: 'Akses Explorer Publik',
        command: 'curl -s https://explorer.myratu.com/api/v1/status',
        description: 'Buka https://explorer.myratu.com pada browser Anda untuk menjelajahi rantai live.'
      }
    ]
  }
];
