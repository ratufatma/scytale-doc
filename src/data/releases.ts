import { Release } from '../types';
import { DOWNLOAD_ARTIFACTS } from './downloads';

export const RELEASES: Release[] = [
  {
    id: 'v0.4.0-testnet',
    version: '0.4.0',
    releaseDate: 'September 12, 2026',
    status: 'latest',
    summary: 'Scytale Layer-1 Public Testnet (v0.4.0) — Embedded Stratum Mining Pool (SSP-1) release featuring high-performance TCP line-delimited JSON-RPC 2.0 mining server, hardened memory management with active job eviction (MAX_ACTIVE_JOBS = 16), 2,048 worker session concurrency limit, 120-second idle timeout, and real-time Blake3 PoW share validation.',
    highlights: [
      'Active Embedded Stratum Server (SSP-1) running directly in scytale-node via --stratum-bind and --stratum-diff.',
      'Public Pool Online: stratum+tcp://seed.myratu.com:3333 (116.212.72.89:3333) with auto-diff target scaling.',
      'Production Hardening: Dynamic eviction of old job templates (16 max) and automatic pruning of expired share replay history.',
      'Resource Caps & DoS Resistance: 2,048 simultaneous TCP worker sessions with 120-second idle connection timeout.',
      'Blake3 PoW Header Layout: Canonical 120-byte block header serialization with extranonce1 & extranonce2 Merkle branch reconstruction.',
      'Seamless Consensus Submission: Discovered blocks submitted immediately to node consensus and propagated across P2P swarm.'
    ],
    changes: {
      features: [
        'scytale-stratum (v0.4.0): Embedded line-delimited JSON-RPC 2.0 Stratum mining pool server engine',
        'Added --stratum-bind and --stratum-diff CLI options to scytale-node start command',
        'Automatic difficulty negotiation (mining.set_difficulty) and mining.notify template broadcasts on tip change',
        'Full worker session state machine with duplicate share detection and real-time Blake3 target checks'
      ],
      improvements: [
        'Bounded memory footprint with VecDeque and DashMap active job rotation',
        'Zero-allocation fast path for invalid share rejection',
        'Clean connection teardown on worker idle timeout',
        'Full test suite coverage with 5-scenario strict adversarial and stress tests'
      ],
      bugFixes: [
        'Prevented stale block submissions by caching recent job templates across tip transitions',
        'Eliminated unbounded growth in submitted share hash tables'
      ],
      securityNotes: [
        'Firewall configured to allow TCP port 3333 on public testnet bootnode (116.212.72.89:3333).',
        'All binaries compiled with strict cargo release profile and verified sha256 checksums.'
      ]
    },
    artifacts: DOWNLOAD_ARTIFACTS.filter(a => a.version === '0.4.0'),
    knownIssues: [],
    rawChangelogUrl: 'https://github.com/ratufatma/scytale/releases/tag/v0.4.0-testnet'
  },
  {
    id: 'v0.3.0-testnet',
    version: '0.3.0',
    releaseDate: 'September 12, 2026',
    status: 'stable',
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
    knownIssues: [],
    rawChangelogUrl: 'https://github.com/ratufatma/scytale/releases/tag/v0.3.0-testnet'
  }
];
