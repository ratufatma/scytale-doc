import { Release } from '../types';
import { DOWNLOAD_ARTIFACTS } from './downloads';

export const RELEASES: Release[] = [
  {
    id: 'v0.3.0-testnet',
    version: '0.3.0',
    releaseDate: 'September 12, 2026',
    status: 'latest',
    summary: 'Scytale Layer-1 Public Testnet (v0.3.0) — Phase 1 Genesis & P2P Mesh Launch featuring pure Blake3 Proof of Work consensus, 66,000,000 SCY fixed maximum supply, 25.0 SCY initial block subsidy, redb ACID persistence, and live libp2p network mesh.',
    highlights: [
      'Official Genesis block hash: 4033f099ae89051a629c871e9af28a215898ff345505ffdbbce65c27a29585c9.',
      'Pure Blake3 Proof of Work consensus engine with CPU-friendly SIMD-optimized mining.',
      'Strict 66,000,000 SCY monetary cap with 25.0 SCY block reward in Era 0.',
      'Safe embedded ACID key-value storage engine using redb in 100% pure Rust.',
      'Canonical seed bootnode online at /dns4/seed.myratu.com/tcp/9000/p2p/12D3KooWMNVcoP79QMoLfg8NKeFyCRfLBq6HngTQpmnkbD9oBWMc.',
      'Production systemd service units hardened with Restart=always policy.'
    ],
    changes: {
      features: [
        'scytale-node: Full consensus node daemon with HTTP RPC gateway (:8332) and IPC socket control',
        'scytale-cli: BIP-39 mnemonic key generation, Bech32m address derivation, balance check, and transfer-p2pkh execution',
        'Integrated Blake3 CPU miner worker with --mine and --miner-payout flags',
        'Initial Block Download (IBD) block synchronizer over libp2p Gossipsub and Kademlia DHT',
        'Web Explorer integration with real-time block ingestion at https://explorer.myratu.com'
      ],
      improvements: [
        'Zero C-library dependencies across consensus, storage, and networking layers',
        'Deterministic zero-float integer arithmetic for all transaction amounts and fee calculations',
        'Strict 120-byte block header format with state authenticated utxo_root commitment',
        'Sub-millisecond block verification and mempool admission latency'
      ],
      bugFixes: [
        'Hardened network deserializers against oversized wire payload allocations',
        'Ensured deterministic difficulty adjustment clamping across 1,440-block retarget windows'
      ],
      securityNotes: [
        'All binaries compiled with strict cargo profile release and verified sha256 checksums.',
        'Primary seed node operational at 116.212.72.89:9000.'
      ]
    },
    artifacts: DOWNLOAD_ARTIFACTS.filter(a => a.version === '0.3.0'),
    knownIssues: [
      'Mining pool stratum coordinator is in R&D staging (scheduled for Phase 2).'
    ],
    rawChangelogUrl: 'https://github.com/ratufatma/scytale/releases/tag/v0.3.0-testnet'
  }
];
