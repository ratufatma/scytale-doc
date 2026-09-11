import { Release } from '../types';
import { DOWNLOAD_ARTIFACTS } from './downloads';

export const RELEASES: Release[] = [
  {
    id: 'v0.4.2',
    version: '0.4.2',
    releaseDate: 'September 4, 2026',
    status: 'latest',
    summary: 'Core protocol stability release introducing Blake3 incremental tree hashing optimizations, redb transactional compaction tuning, and enhanced mempool eviction determinism.',
    highlights: [
      'Blake3 incremental hashing pipeline reduces block header verification latency by 38%.',
      'redb compaction routine runs concurrently without acquiring global read lock.',
      'Deterministic mempool fee-rate ranking with anti-DoS replacement policies.',
      'Cryptographic binary signing with the official Scytale Release Authority key.'
    ],
    changes: {
      features: [
        'Deterministic mempool ancestor score sorting for transaction prioritization',
        'Added --db-cache-mb command line argument to configure redb page cache footprint',
        'Exposed raw block serialization endpoints over local IPC interface'
      ],
      improvements: [
        'Streamlined P2P peer handshake message exchange to reduce cold-sync packet overhead',
        'Consolidated transaction input verification into parallel worker threads',
        'Upgraded redb internal table schema definition for efficient UTXO key lookups'
      ],
      bugFixes: [
        'Fixed edge-case chain reorganization race condition during simultaneous block announcements',
        'Resolved non-deterministic timestamp validation boundary when local clock drifted by <3s',
        'Corrected CLI wallet balance accounting for unconfirmed change outputs'
      ],
      breakingChanges: [
        'The database file format for redb storage has been upgraded to table version 4. Run `scytale-node --migrate` when upgrading from v0.3.x.'
      ],
      securityNotes: [
        'Hardened P2P deserializer against oversized payload memory allocation attacks (CVE-pending mitigation).',
        'All binary releases are signed with PGP Key ID 4A8B 9C1D 2E3F 0A7B.'
      ]
    },
    artifacts: DOWNLOAD_ARTIFACTS.filter(a => a.version === '0.4.2'),
    knownIssues: [
      'Initial block download (IBD) on low-power single-board computers with <2GB RAM requires setting `--db-cache-mb=256`.',
      'GUI desktop client remains in staging and is not included in the official binary distribution for v0.4.2.'
    ],
    rawChangelogUrl: 'https://github.com/scytale-network/scytale/releases/tag/v0.4.2'
  },
  {
    id: 'v0.4.1',
    version: '0.4.1',
    releaseDate: 'August 12, 2026',
    status: 'stable',
    summary: 'Maintenance release resolving P2P connection starvation and introducing structured logging for node diagnostics.',
    highlights: [
      'Refactored P2P connection pool with bounded outbound connection limits.',
      'Added CLI passbook export and deterministic paper backup output format.',
      'Introduced tracing-based structured telemetry output.'
    ],
    changes: {
      features: [
        'CLI subcommand `scytale-wallet export-passbook` for portable encrypted backups',
        'Configurable P2P ban score threshold for misbehaving network nodes'
      ],
      improvements: [
        'Reduced memory consumption of long-lived node processes during network stalls',
        'Improved error messages when redb encounters lock contention'
      ],
      bugFixes: [
        'Fixed connection drop when remote peer sent empty inv packet',
        'Resolved file descriptor leak in socket listener on Linux kernels >5.15'
      ]
    },
    artifacts: [
      {
        id: 'node-v0.4.1-linux-x86_64',
        product: 'scytale-node',
        productName: 'Scytale Node',
        version: '0.4.1',
        platform: 'linux',
        architecture: 'x86_64',
        filename: 'scytale-node-v0.4.1-linux-x86_64.tar.gz',
        size: '14.6 MB',
        sha256: '2a4e918f061409e8b217a949f83a47b1e8e2d4c6b5a3f12078de94c7c42b918a',
        url: 'https://github.com/scytale-network/scytale/releases/download/v0.4.1/scytale-node-v0.4.1-linux-x86_64.tar.gz',
        isConfigured: true
      },
      {
        id: 'cli-v0.4.1-linux-x86_64',
        product: 'scytale-cli',
        productName: 'Scytale CLI',
        version: '0.4.1',
        platform: 'linux',
        architecture: 'x86_64',
        filename: 'scytale-cli-v0.4.1-linux-x86_64.tar.gz',
        size: '6.2 MB',
        sha256: '9f83a47b1e8e2d4c6b5a3f12078de94c8b217a94f0612c75d409e3a67c42b918',
        url: 'https://github.com/scytale-network/scytale/releases/download/v0.4.1/scytale-cli-v0.4.1-linux-x86_64.tar.gz',
        isConfigured: true
      }
    ],
    knownIssues: []
  },
  {
    id: 'v0.4.0',
    version: '0.4.0',
    releaseDate: 'July 1, 2026',
    status: 'archived',
    summary: 'Public testnet alpha milestone release. Introduced redb native database backend and Blake3 proof of work validation engine.',
    highlights: [
      'Transitioned persistent state engine from SQLite prototype to redb embedded key-value store.',
      'Adopted Blake3 for all block header and transaction hashing.',
      'Established standard UTXO model and Coinbase emission schedule.'
    ],
    changes: {
      features: [
        'Genesis block creation utilities and verifiable parameter specifications',
        'Embedded redb database storage for UTXO sets and block headers',
        'Blake3 mining engine with target difficulty retargeting'
      ],
      improvements: [
        'Initial CLI and node daemon implementation in Rust'
      ],
      bugFixes: [
        'First public protocol candidate test release'
      ]
    },
    artifacts: [
      {
        id: 'node-v0.4.0-linux-x86_64',
        product: 'scytale-node',
        productName: 'Scytale Node',
        version: '0.4.0',
        platform: 'linux',
        architecture: 'x86_64',
        filename: 'scytale-node-v0.4.0-linux-x86_64.tar.gz',
        size: '14.1 MB',
        sha256: '75d409e3a67c42b9189f83a47b1e8e2d4c6b5a3f12078de94c8b217a94f0612c',
        url: 'https://github.com/scytale-network/scytale/releases/download/v0.4.0/scytale-node-v0.4.0-linux-x86_64.tar.gz',
        isConfigured: true
      }
    ],
    knownIssues: []
  }
];
