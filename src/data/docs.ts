import { DocSection, DocPage } from '../types';

// ============================================================
// CANONICAL PROTOCOL PARAMETERS (DO NOT MODIFY WITHOUT REVIEW)
// ============================================================
// Genesis Block Hash : 4033f099ae89051a629c871e9af28a215898ff345505ffdbbce65c27a29585c9
// Max Supply         : 66,000,000 SCY (scale: 10^8 quanta)
// Genesis Allocation : 33,000,000 SCY (Founder 19.8M + Dev 13.2M)
// Block Subsidy Era 0: 25.00000000 SCY
// Halving Interval   : 420,000 blocks
// P2PKH Locking Scrip: 73 a0 20 <32-byte-hash> 88 ac
// Bootnode Multiaddr : /dns4/seed.myratu.com/tcp/9000/p2p/12D3KooWMNVcoP79QMoLfg8NKeFyCRfLBq6HngTQpmnkbD9oBWMc
// Explorer URL       : https://explorer.myratu.com
// RPC HTTP Port      : 8332
// P2P Wire Port      : 9000
// ============================================================

export const DOC_SECTIONS: DocSection[] = [
  // ─────────────────────────────────────────────────────────────
  // SECTION 1: Introduction
  // ─────────────────────────────────────────────────────────────
  {
    id: 'intro',
    title: 'Introduction',
    slug: 'introduction',
    description: 'Fundamental concepts, design rationale, and project overview.',
    pages: [
      {
        id: 'what-is-scytale',
        title: 'What is Scytale?',
        slug: 'what-is-scytale',
        sectionId: 'intro',
        sectionTitle: 'Introduction',
        summary: 'An introduction to Scytale as a minimalist, verifiable blockchain protocol.',
        content: [
          {
            type: 'paragraph',
            text: 'Scytale is a lightweight, open-source blockchain network engineered around simple, verifiable primitives. Built from the ground up in Rust, it emphasizes protocol transparency, deterministic execution, and minimal systemic complexity.'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Core Architectural Pillars',
            id: 'core-pillars'
          },
          {
            type: 'paragraph',
            text: 'Rather than introducing speculative smart contract layers or fragile state bloat, Scytale focuses squarely on durable peer-to-peer value transfer and cryptographic auditability.'
          },
          {
            type: 'list',
            items: [
              'eUTXO Ledger Model: Discrete, unspent transaction outputs ensure mathematical tractability and simple parallel validation.',
              'Blake3 Hashing: Modern, tree-hash cryptographic pipeline (OpBlake3 — opcode 0xa0) providing unmatched performance across commodity CPUs.',
              'redb Storage Engine: Pure Rust, embedded ACID key-value store with zero native C-library dependencies.',
              'Proof of Work Consensus: Time-tested, unforgeable physical expenditure securing consensus order and difficulty targeting.',
              'Fixed Monetary Supply: Strictly capped at 66,000,000 SCY with no administrative minting capabilities.'
            ]
          },
          {
            type: 'callout',
            calloutType: 'note',
            text: 'Scytale is an engineering-driven infrastructure project. It does not issue speculative utility tokens, pre-mines beyond the genesis allocation, or custodial mechanisms.'
          }
        ]
      },
      {
        id: 'why-scytale',
        title: 'Why Scytale?',
        slug: 'why-scytale',
        sectionId: 'intro',
        sectionTitle: 'Introduction',
        summary: 'Design rationale and the problem of complexity in modern distributed ledgers.',
        content: [
          {
            type: 'paragraph',
            text: 'Modern blockchain networks have accumulated monumental cognitive and technical overhead. Gigabytes of VM dependencies, complex state trie serialization, and unpredictable state reorganization dynamics make running an independent full node prohibitive for average engineers.'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Radical Simplicity as a Security Property',
            id: 'simplicity-security'
          },
          {
            type: 'paragraph',
            text: 'Scytale treats codebase size, protocol simplicity, and auditability as first-order security properties. By reducing the protocol surface area to well-defined primitives, a single developer can audit the entire consensus engine in days rather than months.'
          },
          {
            type: 'table',
            table: {
              headers: ['Design Attribute', 'Typical Modern Chains', 'Scytale Approach'],
              rows: [
                ['Consensus Engine', 'Complex multi-role PoS or heavy DAG', 'Clean Proof of Work (Blake3)'],
                ['State Model', 'Account balance global state trie', 'Strict eUTXO model with parallel checks'],
                ['Storage Layer', 'RocksDB / LevelDB (C++ legacy)', 'redb (Pure Rust, ACID, zero C dependencies)'],
                ['Cryptographic Hash', 'SHA-256 / Keccak-256 / BLAKE2', 'Blake3 (tree hashing, SIMD accelerated)'],
                ['Max Supply', 'Dynamic, staking emissions, burns', 'Strictly fixed 66,000,000 SCY']
              ]
            }
          }
        ]
      },
      {
        id: 'architecture',
        title: 'Architecture Overview',
        slug: 'architecture',
        sectionId: 'intro',
        sectionTitle: 'Introduction',
        summary: 'High-level component breakdown of the Scytale node and ecosystem.',
        content: [
          {
            type: 'paragraph',
            text: 'The Scytale codebase is structured as a modular Rust workspace consisting of isolated crates with strict interface boundaries.'
          },
          {
            type: 'diagram',
            diagramContent: `+-------------------------------------------------------------+
|                      User Applications                      |
|         scytale-cli     |     scytale-wallet     |  GUI     |
+-------------------------------------------------------------+
                               | (RPC / IPC Protocol)
+-------------------------------------------------------------+
|                     Scytale Node Daemon                     |
|                                                             |
|  +--------------------+   +-------------------------------+ |
|  |     P2P Engine     |   |       Mempool Manager         | |
|  | (libp2p TCP/9000)  |   | (Fee priority, DoS limits)    | |
|  +--------------------+   +-------------------------------+ |
|            |                              |                 |
|  +--------------------------------------------------------+ |
|  |               Consensus & Chain Validation             | |
|  |        (Blake3 PoW, Difficulty Target, Reorgs)         | |
|  +--------------------------------------------------------+ |
|                               |                             |
|  +--------------------------------------------------------+ |
|  |              Storage Engine: redb Layer                | |
|  |   [blocks]  [headers]  [utxo_set]  [chain_index]       | |
|  +--------------------------------------------------------+ |
+-------------------------------------------------------------+`
          },
          {
            type: 'heading',
            level: 2,
            text: 'Key Crate Responsibilities',
            id: 'crate-responsibilities'
          },
          {
            type: 'list',
            items: [
              'scytale-primitives: Cryptographic definitions, Blake3 hashing wrappers, and serialization helpers.',
              'scytale-consensus: Block header validation, PoW difficulty computation, and chain selection rules.',
              'scytale-core: eUTXO validation, P2PKH script interpreter (OpDup/OpBlake3/OpEqualVerify/OpCheckSig), coinbase rules.',
              'scytale-storage: The redb transactional storage layer handling tables for block bodies, headers, and the UTXO view.',
              'scytale-network: Asynchronous libp2p peer discovery (Kademlia DHT), Gossipsub propagation, and message serialization.',
              'scytale-node: The unified binary wiring consensus, storage, network, and HTTP RPC servers (port 8332).'
            ]
          }
        ]
      },
      {
        id: 'project-status',
        title: 'Project Status & Roadmap',
        slug: 'project-status',
        sectionId: 'intro',
        sectionTitle: 'Introduction',
        summary: 'Current development milestone, testnet phases, and verified deliverables.',
        content: [
          {
            type: 'paragraph',
            text: 'Scytale is currently operating in Public Testnet Phase 1 (v0.3.0-testnet). The consensus primitives, redb persistence engine, P2P mesh network, and CLI tools are fully operational and subject to peer review and community solo mining.'
          },
          {
            type: 'callout',
            calloutType: 'warning',
            text: 'The Scytale network is in public testnet. Do not treat testnet coins as having financial value. Protocol parameters may be refined prior to mainnet genesis candidate release.'
          },
          {
            type: 'table',
            table: {
              headers: ['Milestone', 'Target Scope', 'Status'],
              rows: [
                ['Milestone 0: Genesis Primitives', 'Blake3 hashing, eUTXO serialization, redb backend, genesis block 0x4033f099...', 'Complete'],
                ['Milestone 1: Public Testnet Phase 1', 'libp2p P2P wire protocol, difficulty adjustment, CLI wallet, HTTP RPC :8332, Solo Mining', 'Operational (v0.3.0-testnet)'],
                ['Milestone 2: Security, Pools & Hardening', 'Formal audit, Stratum mining pool protocol, Desktop GUI wallet, peer fuzzing', 'In Progress (Fase 2)'],
                ['Milestone 3: Mainnet Candidate', 'Deterministic genesis seed, final parameter freeze (66M SCY)', 'Scheduled']
              ]
            }
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // SECTION 2: Getting Started
  // ─────────────────────────────────────────────────────────────
  {
    id: 'getting-started',
    title: 'Getting Started',
    slug: 'getting-started',
    description: 'Practical guides from installation to running your first node and transacting.',
    pages: [
      {
        id: 'installation',
        title: 'Installation',
        slug: 'installation',
        sectionId: 'getting-started',
        sectionTitle: 'Getting Started',
        summary: 'Compile Scytale from source using the official Git repository.',
        content: [
          {
            type: 'paragraph',
            text: 'Scytale is distributed as source code. Compile using a recent stable Rust toolchain (1.85+ required).'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Prerequisites',
            id: 'prerequisites'
          },
          {
            type: 'list',
            items: [
              'Operating System: Linux (Ubuntu 22.04/24.04, Debian 12) or macOS.',
              'Rust: Version 1.85+ stable (install via rustup).',
              'Build tools: build-essential, pkg-config, libssl-dev, git, curl.'
            ]
          },
          {
            type: 'code',
            language: 'bash',
            caption: 'Install system dependencies (Ubuntu/Debian)',
            code: 'sudo apt update && sudo apt install -y build-essential pkg-config libssl-dev git curl\n\n# Install Rust toolchain if not already present\ncurl --proto \'=https\' --tlsv1.2 -sSf https://sh.rustup.rs | sh\nsource ~/.cargo/env'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Compile from Source',
            id: 'compile-source'
          },
          {
            type: 'code',
            language: 'bash',
            caption: 'Clone and build Scytale',
            code: 'git clone https://github.com/ratufatma/scytale.git\ncd scytale\n\n# Compile daemon node and CLI wallet with release optimizations\ncargo build --release -p scytale-node -p scytale-cli\n\n# Binaries available at:\nls -lh target/release/scytale-node target/release/scytale-cli'
          }
        ]
      },
      {
        id: 'running-a-node',
        title: 'Running a Node',
        slug: 'running-a-node',
        sectionId: 'getting-started',
        sectionTitle: 'Getting Started',
        summary: 'Initialize the local redb state and connect to testnet peers via canonical bootnode.',
        content: [
          {
            type: 'paragraph',
            text: 'Launching a Scytale node begins peer discovery via libp2p Kademlia DHT, initializes the local redb storage tables, and syncs from canonical bootnode peers.'
          },
          {
            type: 'code',
            language: 'bash',
            caption: 'Launch Scytale node daemon',
            code: './target/release/scytale-node start\n\n# Or with explicit payout address for mining:\n./target/release/scytale-node start \\\n  --mine \\\n  --payout-address <ALAMAT_BECH32_ANDA>'
          },
          {
            type: 'paragraph',
            text: 'Node akan secara otomatis menghubungi bootnode kanonikal dan memulai Initial Block Download (IBD).'
          },
          {
            type: 'code',
            language: 'bash',
            caption: 'Cek status node via HTTP RPC',
            code: '# Status runtime & tinggi rantai\ncurl -s http://127.0.0.1:8332/api/v1/status\n\n# Informasi blok tip terbaru\ncurl -s http://127.0.0.1:8332/api/v1/blocks/tip'
          },
          {
            type: 'callout',
            calloutType: 'tip',
            text: 'Node mengekspos HTTP RPC di 127.0.0.1:8332 dan publik melalui https://explorer.myratu.com'
          }
        ]
      },
      {
        id: 'creating-a-wallet',
        title: 'Creating a Wallet',
        slug: 'creating-a-wallet',
        sectionId: 'getting-started',
        sectionTitle: 'Getting Started',
        summary: 'Generate a cryptographic Ed25519 key pair and deterministic Bech32 address.',
        content: [
          {
            type: 'paragraph',
            text: 'The Scytale CLI wallet generates an Ed25519 key pair from entropy and derives a Bech32m-encoded address (prefix scy1...) using Blake3 hash of the compressed public key.'
          },
          {
            type: 'code',
            language: 'bash',
            caption: 'Buat dompet baru',
            code: './target/release/scytale-cli wallet new\n\n# Output contoh:\n# Public Key  : <32-byte hex>\n# Address     : scy1nw7vhxmxyz2jlw89vz88tdv938692xk968uxn89787fa4w207s8sddvv3q\n# Mnemonic    : word1 word2 ... word12'
          },
          {
            type: 'callout',
            calloutType: 'warning',
            text: 'Simpan mnemonic dan private key dengan aman. Siapapun yang memiliki akses ke mnemonic dapat membelanjakan semua UTXO Anda.'
          },
          {
            type: 'paragraph',
            text: 'Untuk memulihkan dompet dari mnemonic yang ada:'
          },
          {
            type: 'code',
            language: 'bash',
            caption: 'Restore wallet',
            code: './target/release/scytale-cli wallet restore --mnemonic "kata1 kata2 ... kata12"'
          }
        ]
      },
      {
        id: 'transacting',
        title: 'Sending & Receiving SCY',
        slug: 'transacting',
        sectionId: 'getting-started',
        sectionTitle: 'Getting Started',
        summary: 'How eUTXO coin selection, fee calculation, and Ed25519 transaction signing operate.',
        content: [
          {
            type: 'paragraph',
            text: 'Semua transaksi di Scytale mereferensi UTXO yang belum dibelanjakan. CLI menghitung saldo dengan kueri ke node lokal via UNIX socket atau HTTP RPC.'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Cek Saldo',
            id: 'check-balance'
          },
          {
            type: 'code',
            language: 'bash',
            code: './target/release/scytale-cli wallet balance --address <ALAMAT_BECH32>\n# Confirmed balance: 25.00000000 SCY\n# Available UTXOs : 1'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Kirim SCY',
            id: 'send-scy'
          },
          {
            type: 'code',
            language: 'bash',
            caption: 'Kirim SCY ke alamat penerima',
            code: './target/release/scytale-cli wallet send \\\n  --from-key <PATH_PRIVATE_KEY_ATAU_MNEMONIC> \\\n  --to <ALAMAT_PENERIMA_SCY1> \\\n  --amount <JUMLAH_SCY> \\\n  --fee <FEE_QUANTA>'
          },
          {
            type: 'paragraph',
            text: 'CLI secara otomatis memilih UTXO input minimal, menghitung output kembalian, menandatangani dengan Ed25519, dan men-submit transaksi ke mempool node.'
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // SECTION 3: Protocol Specification (CANONICAL)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'protocol-spec',
    title: 'Protocol Specification',
    slug: 'protocol',
    description: 'Spesifikasi teknis formal konsensus Scytale, genesis block, tokenomics, dan eUTXO model.',
    pages: [
      {
        id: 'genesis',
        title: 'Genesis Block',
        slug: 'genesis',
        sectionId: 'protocol-spec',
        sectionTitle: 'Protocol Specification',
        summary: 'Parameter blok genesis kanonikal: hash, alokasi awal, dan konfigurasi target PoW.',
        content: [
          {
            type: 'paragraph',
            text: 'Genesis block (height 0) adalah titik awal rantai kanonikal Scytale. Semua parameter genesis bersifat deterministik dan hardcoded dalam scytale-consensus.'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Parameter Genesis Kanonikal',
            id: 'genesis-params'
          },
          {
            type: 'table',
            table: {
              headers: ['Parameter', 'Nilai Kanonikal'],
              rows: [
                ['Genesis Block Hash', '4033f099ae89051a629c871e9af28a215898ff345505ffdbbce65c27a29585c9'],
                ['Height', '0'],
                ['Version', '1'],
                ['Previous Block Hash', '0000000000000000000000000000000000000000000000000000000000000000'],
                ['Timestamp', 'Epoch Unix (dikodekan di genesis header)'],
                ['Difficulty Target', '0x1f00ffff (easy testnet target)'],
                ['Nonce', 'Variabel (PoW mined)'],
                ['Total Genesis Allocation', '33,000,000 SCY'],
                ['Founder Allocation', '19,800,000 SCY (60% dari 33M)'],
                ['Developer Allocation', '13,200,000 SCY (40% dari 33M)']
              ]
            }
          },
          {
            type: 'callout',
            calloutType: 'note',
            text: 'Genesis hash 4033f099ae89051a629c871e9af28a215898ff345505ffdbbce65c27a29585c9 adalah hash kanonikal yang muncul sebagai previous_block_hash di blok height 1. Dapat diverifikasi via: curl -s http://127.0.0.1:8332/api/v1/blocks/0'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Verifikasi Genesis via RPC',
            id: 'verify-genesis'
          },
          {
            type: 'code',
            language: 'bash',
            caption: 'Ambil genesis block via HTTP RPC',
            code: '# Via local node\ncurl -s http://127.0.0.1:8332/api/v1/blocks/0\n\n# Via canonical hash\ncurl -s http://127.0.0.1:8332/api/v1/blocks/0x4033f099ae89051a629c871e9af28a215898ff345505ffdbbce65c27a29585c9\n\n# Via public explorer\ncurl -s https://explorer.myratu.com/api/v1/blocks/0'
          }
        ]
      },
      {
        id: 'tokenomics',
        title: 'Monetary Policy & Tokenomics',
        slug: 'tokenomics',
        sectionId: 'protocol-spec',
        sectionTitle: 'Protocol Specification',
        summary: 'Suplai maksimum, jadwal emisi, dan alokasi genesis SCY.',
        content: [
          {
            type: 'paragraph',
            text: 'Scytale memiliki kebijakan moneter yang sepenuhnya deterministik dan tidak dapat diubah setelah genesis. Tidak ada inflasi tambahan, burn mekanisme, atau staking reward.'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Parameter Moneter Kanonikal',
            id: 'monetary-params'
          },
          {
            type: 'table',
            table: {
              headers: ['Parameter', 'Nilai'],
              rows: [
                ['Total Suplai Maksimum', '66,000,000 SCY'],
                ['Satuan Terkecil (Quanta)', '1 SCY = 100,000,000 quanta (10^8)'],
                ['Subsidi Blok Era 0 (height 0–419,999)', '25.00000000 SCY per blok'],
                ['Interval Halving', 'Setiap 420,000 blok (~8 tahun pada target 60 detik/blok)'],
                ['Alokasi Genesis (Pre-mine)', '33,000,000 SCY (50% dari total suplai)'],
                ['Suplai via Mining', '33,000,000 SCY (50% dari total suplai)'],
                ['Target Waktu Blok', '60 detik per blok'],
                ['Difficulty Adjustment Interval', 'Setiap 1,440 blok (~24 jam)']
              ]
            }
          },
          {
            type: 'heading',
            level: 2,
            text: 'Jadwal Emisi',
            id: 'emission-schedule'
          },
          {
            type: 'table',
            table: {
              headers: ['Era', 'Rentang Height', 'Subsidi per Blok', 'Total Emisi Era'],
              rows: [
                ['Era 0', '0 – 419,999', '25.00000000 SCY', '10,500,000 SCY'],
                ['Era 1', '420,000 – 839,999', '12.50000000 SCY', '5,250,000 SCY'],
                ['Era 2', '840,000 – 1,259,999', '6.25000000 SCY', '2,625,000 SCY'],
                ['Era 3+', 'Berlanjut...', 'Halvings berlanjut', '~14,750,000 SCY tersisa']
              ]
            }
          },
          {
            type: 'callout',
            calloutType: 'note',
            text: 'Total 33,000,000 SCY didistribusikan melalui mining. Dikombinasikan dengan 33,000,000 SCY alokasi genesis, suplai kumulatif maksimum tidak pernah melebihi 66,000,000 SCY.'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Formula Subsidi Blok',
            id: 'subsidy-formula'
          },
          {
            type: 'code',
            language: 'rust',
            caption: 'Implementasi Rust di scytale-consensus',
            code: '/// Subsidi blok kanonikal berdasarkan halving setiap 420,000 blok.\n/// Era 0: 25 SCY, Era 1: 12.5 SCY, Era 2: 6.25 SCY, dst.\npub fn block_subsidy(height: u64) -> u64 {\n    const INITIAL_SUBSIDY_QUANTA: u64 = 25_00000000; // 25 SCY in quanta\n    const HALVING_INTERVAL: u64 = 420_000;\n    let era = height / HALVING_INTERVAL;\n    if era >= 64 { return 0; }\n    INITIAL_SUBSIDY_QUANTA >> era\n}'
          }
        ]
      },
      {
        id: 'eutxo-model',
        title: 'eUTXO Transaction Model',
        slug: 'eutxo-model',
        sectionId: 'protocol-spec',
        sectionTitle: 'Protocol Specification',
        summary: 'Struktur transaksi eUTXO, format locking script P2PKH kanonikal, dan aturan validasi.',
        content: [
          {
            type: 'paragraph',
            text: 'Scytale menggunakan model Extended Unspent Transaction Output (eUTXO). Setiap transaksi mengonsumsi UTXO yang ada dan menghasilkan UTXO baru — tidak ada global state, hanya himpunan output yang belum dibelanjakan.'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Struktur Transaksi',
            id: 'tx-structure'
          },
          {
            type: 'diagram',
            diagramContent: `Transaction
├── version: u32
├── inputs: Vec<TxInput>
│   ├── previous_output: OutPoint (txid: Hash32, index: u32)
│   └── authorization_proof: Vec<u8> (Ed25519 Signature 64B + PublicKey 32B)
├── outputs: Vec<TxOutput>
│   ├── value_quanta: u64
│   ├── locking_script: Vec<u8>  ← P2PKH: 73 a0 20 <hash32> 88 ac
│   └── op_return_payload: Option<Vec<u8>>
└── locktime: u64`
          },
          {
            type: 'heading',
            level: 2,
            text: 'P2PKH Locking Script — Format Kanonikal',
            id: 'p2pkh-script'
          },
          {
            type: 'paragraph',
            text: 'Pay-to-Public-Key-Hash (P2PKH) adalah bentuk skrip standar untuk pembayaran ke alamat pengguna Scytale. Opcode yang digunakan adalah opcode KANONIKAL Scytale (bukan Bitcoin):'
          },
          {
            type: 'table',
            table: {
              headers: ['Byte (Hex)', 'Opcode', 'Deskripsi'],
              rows: [
                ['0x73', 'OP_DUP', 'Duplikasi item teratas stack'],
                ['0xa0', 'OP_BLAKE3', 'Hash Blake3 item teratas stack (menghasilkan 32 byte)'],
                ['0x20', 'PUSH 32', 'Push 32 byte berikutnya ke stack (panjang hash)'],
                ['<32 bytes>', '<pubkey_hash>', 'Blake3 hash dari public key Ed25519'],
                ['0x88', 'OP_EQUALVERIFY', 'Verifikasi kesamaan dua item teratas stack'],
                ['0xac', 'OP_CHECKSIG', 'Verifikasi tanda tangan Ed25519']
              ]
            }
          },
          {
            type: 'code',
            language: 'text',
            caption: 'Format byte locking script P2PKH kanonikal',
            code: '73 a0 20 <32-byte-blake3-pubkey-hash> 88 ac\n\nContoh konkret (37 bytes total):\n73 a0 20\nf8d4 9a7b c3e1 0256 a4b8 7c9d 3f2e 1a05\n8b7c 6e4d 2a9f 0e3c 1b5a 7d8e 4c2b 0f6a\n88 ac'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Alamat Bech32m',
            id: 'bech32-address'
          },
          {
            type: 'paragraph',
            text: 'Alamat Scytale diencode dengan Bech32m, Human-Readable Part (HRP): scy, prefix: scy1...'
          },
          {
            type: 'code',
            language: 'rust',
            caption: 'Derivasi alamat dari public key',
            code: '// 1. Komputasi Blake3 hash dari Ed25519 compressed public key (32 byte)\nlet pubkey_hash = blake3::hash(public_key.as_bytes());\n\n// 2. Encode ke Bech32m dengan HRP "scy"\nlet address = bech32m_encode("scy", pubkey_hash.as_bytes());\n// Hasil: scy1nw7vhxmxyz2jlw89vz88tdv938692xk968uxn89787fa4w207s8sddvv3q'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Aturan Validasi Konsensus',
            id: 'validation-rules'
          },
          {
            type: 'list',
            items: [
              'No Inflation Rule: Σ inputs ≥ Σ outputs. Selisih adalah miner fee.',
              'Double-Spend Prevention: Setiap OutPoint hanya bisa muncul sekali di UTXO set.',
              'Coinbase Maturity: Output coinbase hanya bisa dibelanjakan setelah 100 blok konfirmasi.',
              'Script Evaluation: OP_DUP → OP_BLAKE3 → PUSH32 → OP_EQUALVERIFY → OP_CHECKSIG harus semua pass.',
              'Ed25519 Signature Verification: 64-byte signature atas sighash Blake3(tx_without_witness).'
            ]
          }
        ]
      },
      {
        id: 'pow-difficulty',
        title: 'Proof of Work & Difficulty Adjustment',
        slug: 'proof-of-work',
        sectionId: 'protocol-spec',
        sectionTitle: 'Protocol Specification',
        summary: 'Formulasi matematis retargeting target kesulitan PoW Scytale.',
        content: [
          {
            type: 'paragraph',
            text: 'Proof of Work memberikan urutan konsensus yang objektif dan permissionless. Sebuah blok valid jika dan hanya jika hash Blake3 dari header-nya secara numerik lebih kecil atau sama dengan target saat ini.'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Difficulty Retargeting',
            id: 'retarget'
          },
          {
            type: 'code',
            language: 'rust',
            caption: 'Formula retarget di scytale-consensus',
            code: '/// Difficulty recalculates every 1,440 blocks (~24 hours at 60s target)\npub fn calculate_next_target(prev_target: U256, actual_time_span: u64) -> U256 {\n    const TARGET_TIME_SPAN: u64 = 1440 * 60; // 86,400 seconds\n    // Clamp to prevent extreme oscillations\n    let clamped = actual_time_span.clamp(TARGET_TIME_SPAN / 4, TARGET_TIME_SPAN * 4);\n    // next_target = (prev_target * clamped) / TARGET_TIME_SPAN\n    prev_target.saturating_mul(U256::from(clamped)) / U256::from(TARGET_TIME_SPAN)\n}'
          },
          {
            type: 'table',
            table: {
              headers: ['Parameter PoW', 'Nilai'],
              rows: [
                ['Hash Function', 'Blake3 (256-bit output)'],
                ['Target Block Time', '60 detik'],
                ['Retarget Interval', '1,440 blok (~24 jam)'],
                ['Clamp Factor', '4x (min 1/4, max 4x perubahan target)'],
                ['Genesis Target (Testnet)', '0x1f00ffff (easy)'],
                ['Mining Algorithm', 'CPU PoW — Blake3(header_bytes) < target']
              ]
            }
          }
        ]
      },
      {
        id: 'coinbase-spec',
        title: 'Coinbase Transaction Rules',
        slug: 'coinbase',
        sectionId: 'protocol-spec',
        sectionTitle: 'Protocol Specification',
        summary: 'Aturan transaksi coinbase dan penegakan batas subsidi blok.',
        content: [
          {
            type: 'paragraph',
            text: 'Transaksi pertama dalam setiap blok adalah transaksi Coinbase. Transaksi ini tidak memiliki input dari chain sebelumnya dan menciptakan SCY baru sesuai jadwal emisi yang telah ditentukan ditambah semua biaya transaksi dari blok tersebut.'
          },
          {
            type: 'table',
            table: {
              headers: ['Parameter', 'Aturan', 'Penegakan Protokol'],
              rows: [
                ['Max Subsidy Era 0', '25.00000000 SCY', 'Output sum tidak boleh melebihi subsidi + fees.'],
                ['Halving Formula', '25 SCY >> (height / 420,000)', 'Dihitung deterministik di scytale-consensus.'],
                ['Input Count', 'Tepat 1 input', 'Previous outpoint txid harus 32 byte nol.'],
                ['Coinbase Maturity', '100 blok', 'Tidak dapat direferensikan sebagai input hingga height + 100.']
              ]
            }
          }
        ]
      },
      {
        id: 'hashing-blake3',
        title: 'Blake3 Cryptographic Hashing',
        slug: 'hashing',
        sectionId: 'protocol-spec',
        sectionTitle: 'Protocol Specification',
        summary: 'Rasional kriptografis dan penerapan primitif tree-hashing Blake3.',
        content: [
          {
            type: 'paragraph',
            text: 'Scytale menggunakan Blake3 sebagai fungsi hash kriptografis utama di semua domain konsensus. Blake3 adalah fungsi hash berbasis pohon yang memberikan keamanan 128-bit terhadap semua serangan sambil jauh lebih cepat dari SHA-256 dan BLAKE2.'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Penerapan Blake3 di Scytale',
            id: 'blake3-applications'
          },
          {
            type: 'list',
            items: [
              'Block Header Hashing: Target PoW dievaluasi terhadap Blake3(header_bytes).',
              'Transaction Identifiers: TxID = Blake3(Blake3(serialized_tx_without_witness)).',
              'Address Derivation: PublicKey → Blake3(pubkey_bytes) → 32-byte hash → Bech32m encode.',
              'P2PKH Script: OP_BLAKE3 (opcode 0xa0) menghash pubkey di stack saat evaluasi script.',
              'UTXO Commitment Root: Merkle tree dari UTXO set menggunakan Blake3 sebagai node hash function.'
            ]
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // SECTION 4: Network
  // ─────────────────────────────────────────────────────────────
  {
    id: 'network',
    title: 'Network',
    slug: 'network',
    description: 'Arsitektur P2P libp2p, bootnode kanonikal, dan mekanisme peer discovery.',
    pages: [
      {
        id: 'p2p-architecture',
        title: 'P2P Networking Architecture',
        slug: 'p2p-architecture',
        sectionId: 'network',
        sectionTitle: 'Network',
        summary: 'Tumpukan protokol jaringan P2P berbasis libp2p v0.56 pada Scytale.',
        content: [
          {
            type: 'paragraph',
            text: 'Scytale mengimplementasikan tumpukan jaringan P2P menggunakan Rust libp2p v0.56 dengan transport TCP asynchronous via Tokio runtime.'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Lapisan Transport & Keamanan',
            id: 'transport-security'
          },
          {
            type: 'list',
            items: [
              'Transport: TCP dengan integrasi tokio asynchronous runtime.',
              'Resolusi Domain: libp2p::dns::tokio::Transport untuk multiaddr DNS (/dns4/...).',
              'Enkripsi Saluran: Noise Protocol Framework (pola handshake Noise XX) menggunakan kunci identitas Ed25519.',
              'Multiplexing: Yamux — memungkinkan banyak sub-stream logis berjalan di atas satu koneksi TCP tunggal.'
            ]
          },
          {
            type: 'heading',
            level: 2,
            text: 'Sub-sistem Protokol P2P',
            id: 'protocol-subsystems'
          },
          {
            type: 'diagram',
            diagramContent: `libp2p Swarm
├── Identity: Ed25519 PeerId
├── Transport: TCP + DNS (Port 9000/9005)
├── Encryption: Noise XX
├── Multiplexing: Yamux
└── Behaviours:
    ├── Gossipsub: Propagasi blok & transaksi real-time
    ├── Kademlia DHT: Penemuan rekan terdesentralisasi (/scytale/kad/1.0.0)
    ├── Request-Response: Sinkronisasi blok terarah (Direct Block Sync)
    ├── Ping: Pemantauan liveness & RTT latency
    └── Identify: Pertukaran metadata versi protokol`
          },
          {
            type: 'heading',
            level: 2,
            text: 'Topik Gossipsub',
            id: 'gossipsub-topics'
          },
          {
            type: 'table',
            table: {
              headers: ['Topik', 'Deskripsi'],
              rows: [
                ['/scytale/blocks/1.0.0', 'Publikasi blok baru ke seluruh validator jaringan (<10ms propagasi)'],
                ['/scytale/transactions/1.0.0', 'Penyebaran transaksi mempool baru antar node']
              ]
            }
          },
          {
            type: 'heading',
            level: 2,
            text: 'Sinkronisasi Blok (Direct Block Sync)',
            id: 'block-sync'
          },
          {
            type: 'list',
            items: [
              '1. Node mengirim request GetHeaders { locator, stop_hash } ke rekan terdekat.',
              '2. Rekan membalas dengan daftar header blok yang hilang.',
              '3. Node meminta batch blok penuh via GetBlocks { hashes }.',
              '4. Blok divalidasi berurutan dan di-commit ke redb lokal hingga mencapai konsensus rantai terberat.'
            ]
          }
        ]
      },
      {
        id: 'bootnodes',
        title: 'Bootnodes & Peer Discovery',
        slug: 'bootnodes',
        sectionId: 'network',
        sectionTitle: 'Network',
        summary: 'Daftar bootnode resmi Scytale dan mekanisme peer discovery via Kademlia DHT.',
        content: [
          {
            type: 'paragraph',
            text: 'Semua node Scytale yang dijalankan tanpa argumen --bootnodes akan secara otomatis menghubungi bootnode kanonikal berikut:'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Bootnode Kanonikal (Production VPS)',
            id: 'canonical-bootnode'
          },
          {
            type: 'table',
            table: {
              headers: ['Tipe', 'Multiaddr'],
              rows: [
                ['DNS (Rekomendasi)', '/dns4/seed.myratu.com/tcp/9000/p2p/12D3KooWMNVcoP79QMoLfg8NKeFyCRfLBq6HngTQpmnkbD9oBWMc'],
                ['Direct IP (Fallback)', '/ip4/116.212.72.89/tcp/9000/p2p/12D3KooWMNVcoP79QMoLfg8NKeFyCRfLBq6HngTQpmnkbD9oBWMc']
              ]
            }
          },
          {
            type: 'table',
            table: {
              headers: ['Property', 'Nilai'],
              rows: [
                ['Canonical Peer ID', '12D3KooWMNVcoP79QMoLfg8NKeFyCRfLBq6HngTQpmnkbD9oBWMc'],
                ['Wire Port', 'TCP 9000'],
                ['Server IP', '116.212.72.89'],
                ['DNS Alias', 'seed.myratu.com']
              ]
            }
          },
          {
            type: 'heading',
            level: 2,
            text: 'Mekanisme Peer Discovery',
            id: 'peer-discovery'
          },
          {
            type: 'list',
            items: [
              '1. Bootstrap Dial: Node baru dial ke bootnode kanonikal via TCP + Noise + Yamux.',
              '2. Kademlia Routing Table: Setelah terhubung, node memicu kueri bootstrap Kademlia DHT (/scytale/kad/1.0.0).',
              '3. Gossipsub Mesh: Peer bergabung ke topik /scytale/blocks/1.0.0 dan /scytale/transactions/1.0.0.'
            ]
          },
          {
            type: 'callout',
            calloutType: 'note',
            text: 'DNS Seeder lama berbasis Python (port 53 UDP/TCP) telah dipensiunkan secara permanen. Node modern menggunakan libp2p-dns multiaddr dan Kademlia DHT tanpa ketergantungan pada port DNS legacy.'
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // SECTION 5: Node Operations
  // ─────────────────────────────────────────────────────────────
  {
    id: 'node-ops',
    title: 'Node Operations',
    slug: 'node',
    description: 'Panduan mendalam lifecycle node, konfigurasi, redb storage, mining, dan deployment production VPS.',
    pages: [
      {
        id: 'quickstart',
        title: 'Quickstart Guide',
        slug: 'quickstart',
        sectionId: 'node-ops',
        sectionTitle: 'Node Operations',
        summary: 'Kompilasi biner, buat dompet, dan jalankan node solo miner Scytale dalam 5 menit.',
        content: [
          {
            type: 'paragraph',
            text: 'Panduan ini menuntun Anda mengompilasi biner resmi, membuat dompet baru, dan menjalankan node penambang (solo miner) yang terhubung langsung ke Testnet Scytale.'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Prasyarat Sistem',
            id: 'prerequisites'
          },
          {
            type: 'list',
            items: [
              'OS: Linux (Ubuntu 22.04/24.04, Debian 12) atau macOS.',
              'Rust: Versi 1.85+ stable.',
              'Paket: build-essential, pkg-config, libssl-dev, git, curl.'
            ]
          },
          {
            type: 'code',
            language: 'bash',
            caption: 'Instal dependensi (Ubuntu/Debian)',
            code: 'sudo apt update && sudo apt install -y build-essential pkg-config libssl-dev git curl'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Kompilasi Biner',
            id: 'compile'
          },
          {
            type: 'code',
            language: 'bash',
            caption: 'Clone dan build',
            code: 'git clone https://github.com/ratufatma/scytale.git\ncd scytale\n\n# Kompilasi daemon node dan CLI wallet\ncargo build --release -p scytale-node -p scytale-cli\n\n# Hasil di:\n# target/release/scytale-node\n# target/release/scytale-cli'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Buat Dompet untuk Hadiah Tambang',
            id: 'create-wallet'
          },
          {
            type: 'code',
            language: 'bash',
            caption: 'Generate Ed25519 key pair dan Bech32 address',
            code: './target/release/scytale-cli wallet new\n\n# Simpan output:\n# Address: scy1nw7vhxmxyz2jlw89vz88tdv938692xk968uxn89787fa4w207s8sddvv3q'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Jalankan Node & Mulai Mining',
            id: 'start-mining'
          },
          {
            type: 'code',
            language: 'bash',
            caption: 'Solo miner dengan payout address',
            code: './target/release/scytale-node start \\\n  --mine \\\n  --payout-address <ALAMAT_BECH32_ANDA>\n\n# Node akan otomatis:\n# 1. Hubungi bootnode seed.myratu.com:9000\n# 2. Sinkronisasi seluruh blok yang ada\n# 3. Mulai PoW BLAKE3 paralel di semua core CPU\n# 4. Publish blok via Gossipsub saat solusi ditemukan'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Cek Status Node',
            id: 'check-status'
          },
          {
            type: 'code',
            language: 'bash',
            caption: 'Verifikasi koneksi dan sinkronisasi',
            code: '# Status runtime & tinggi rantai\ncurl -s http://127.0.0.1:8332/api/v1/status\n\n# Blok terbaru (tip)\ncurl -s http://127.0.0.1:8332/api/v1/blocks/tip'
          }
        ]
      },
      {
        id: 'mining',
        title: 'Solo Mining Guide',
        slug: 'mining',
        sectionId: 'node-ops',
        sectionTitle: 'Node Operations',
        summary: 'Mekanisme CPU mining Blake3 PoW dan parameter reward subsidi Scytale.',
        content: [
          {
            type: 'paragraph',
            text: 'Mining di Scytale menggunakan fungsi hash kriptografis Blake3. Karena Blake3 dioptimalkan natively untuk CPU 64-bit multi-core dan ekstensi SIMD (AVX-512, NEON), komputer komoditas dapat berpartisipasi langsung dalam konsensus tanpa ASIC.'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Reward Mining',
            id: 'mining-reward'
          },
          {
            type: 'table',
            table: {
              headers: ['Era', 'Height Range', 'Subsidi per Blok'],
              rows: [
                ['Era 0 (saat ini)', '0 – 419,999', '25.00000000 SCY'],
                ['Era 1', '420,000 – 839,999', '12.50000000 SCY'],
                ['Era 2', '840,000 – 1,259,999', '6.25000000 SCY']
              ]
            }
          },
          {
            type: 'code',
            language: 'bash',
            caption: 'Start internal CPU miner',
            code: './target/release/scytale-node start \\\n  --mine \\\n  --payout-address scy1<ALAMAT_ANDA>'
          },
          {
            type: 'callout',
            calloutType: 'tip',
            text: 'Subsidi Era 0 adalah 25.00000000 SCY per blok (bukan 50 SCY). Setiap 420,000 blok subsidi dihalving.'
          }
        ]
      },
      {
        id: 'storage-redb',
        title: 'Storage Architecture (redb)',
        slug: 'storage',
        sectionId: 'node-ops',
        sectionTitle: 'Node Operations',
        summary: 'Mengapa Scytale menggunakan redb dan bagaimana data blockchain terstruktur di disk.',
        content: [
          {
            type: 'paragraph',
            text: 'Berbeda dengan proyek blockchain yang mengandalkan storage engine C++ (LevelDB/RocksDB), Scytale menggunakan redb — database key-value embedded 100% safe Rust dengan ACID dan MVCC.'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Tabel redb Utama',
            id: 'redb-tables'
          },
          {
            type: 'table',
            table: {
              headers: ['Table Name', 'Key Format', 'Value Format', 'Description'],
              rows: [
                ['blocks', 'u64 (height)', 'Serialized Raw Block', 'Full historical block body storage.'],
                ['headers', '[u8; 32] (hash)', 'Serialized Header', 'All validated block headers in the tree.'],
                ['utxo_set', '[u8; 36] (txid + vout)', 'Output Payload (amount + script)', 'Active unspent output view.'],
                ['chain_index', 'u64 (height)', '[u8; 32] (hash)', 'Mapping from height to canonical block hash.'],
                ['meta', 'str', 'str / u64', 'Database schema version, best tip hash, timestamp.']
              ]
            }
          },
          {
            type: 'callout',
            calloutType: 'tip',
            text: 'redb menggunakan MVCC (Multi-Version Concurrency Control) — memungkinkan pembacaan non-blocking saat consensus thread meng-commit blok baru.'
          }
        ]
      },
      {
        id: 'systemd-vps',
        title: 'Systemd Production VPS',
        slug: 'systemd-vps',
        sectionId: 'node-ops',
        sectionTitle: 'Node Operations',
        summary: 'Konfigurasi layanan systemd untuk deployment scytale-node pada VPS production.',
        content: [
          {
            type: 'paragraph',
            text: 'Untuk deployment production di VPS Linux, jalankan scytale-node sebagai systemd service agar auto-restart saat crash dan logging terpadu via journald.'
          },
          {
            type: 'code',
            language: 'bash',
            caption: 'Salin binary ke sistem',
            code: '# Copy binary ke /usr/local/bin\nsudo install -m 755 target/release/scytale-node /usr/local/bin/\nsudo install -m 755 target/release/scytale-cli /usr/local/bin/\n\n# Buat direktori data dan user sistem\nsudo useradd -r -s /sbin/nologin scytale\nsudo mkdir -p /var/lib/scytale/data\nsudo chown scytale:scytale /var/lib/scytale/data'
          },
          {
            type: 'code',
            language: 'ini',
            caption: '/etc/systemd/system/scytale-node.service',
            code: '[Unit]\nDescription=Scytale L1 Blockchain Node\nAfter=network-online.target\nWants=network-online.target\n\n[Service]\nType=simple\nUser=scytale\nGroup=scytale\nWorkingDirectory=/var/lib/scytale\nRuntimeDirectory=scytale\nRuntimeDirectoryMode=0755\n\nEnvironmentFile=-/etc/scytale/node.env\n\nExecStart=/usr/local/bin/scytale-node \\\n    --data-dir /var/lib/scytale/data \\\n    --socket /run/scytale/node.sock \\\n    start \\\n    --http-bind 127.0.0.1:8332 \\\n    --explorer-url http://127.0.0.1:3000/api/ingest \\\n    $NODE_EXTRA_ARGS\n\nRestart=on-failure\nRestartSec=5s\n\nLimitNOFILE=65535\nLimitNPROC=32768\n\nNoNewPrivileges=true\nProtectSystem=full\nProtectHome=true\nPrivateTmp=true\n\nStandardOutput=journal\nStandardError=journal\nSyslogIdentifier=scytale-node\n\n[Install]\nWantedBy=multi-user.target'
          },
          {
            type: 'code',
            language: 'bash',
            caption: 'Aktifkan dan jalankan service',
            code: 'sudo systemctl daemon-reload\nsudo systemctl enable --now scytale-node\n\n# Pantau log real-time\nsudo journalctl -u scytale-node -f'
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // SECTION 6: API & Developer Reference
  // ─────────────────────────────────────────────────────────────
  {
    id: 'api-ref',
    title: 'API Reference',
    slug: 'api',
    description: 'HTTP RPC v1 API, CLI reference, dan Web Explorer & Indexer.',
    pages: [
      {
        id: 'rpc-v1',
        title: 'HTTP RPC v1 API',
        slug: 'rpc-v1',
        sectionId: 'api-ref',
        sectionTitle: 'API Reference',
        summary: 'Endpoint REST gateway HTTP Scytale — status, blocks, passbook, dan broadcast transaksi.',
        content: [
          {
            type: 'paragraph',
            text: 'Gateway HTTP Scytale menyediakan antarmuka REST read-only dan endpoint broadcast transaksi.'
          },
          {
            type: 'table',
            table: {
              headers: ['Target', 'URL'],
              rows: [
                ['Local Node', 'http://127.0.0.1:8332'],
                ['Public Testnet', 'https://explorer.myratu.com']
              ]
            }
          },
          {
            type: 'heading',
            level: 2,
            text: 'GET /api/v1/status',
            id: 'get-status'
          },
          {
            type: 'paragraph',
            text: 'Mengembalikan status sinkronisasi, tinggi rantai, tip hash saat ini, dan status penambangan node.'
          },
          {
            type: 'code',
            language: 'bash',
            code: 'curl -s http://127.0.0.1:8332/api/v1/status'
          },
          {
            type: 'code',
            language: 'json',
            caption: 'Contoh Respons (200 OK)',
            code: '{\n  "runtime_state": "Running",\n  "canonical_height": 1,\n  "canonical_tip": "0x0000000074857748e2050bff75595a287e1e7b507d2a4dcfabc9db4ee70ef552",\n  "utxo_root": "0xc9fc38f76aa898bc68ea6b4014d0f0e08b9bce9aab102113e8c6eb5bd1db85c8",\n  "peer_count": 1,\n  "mempool_tx_count": 0,\n  "mining_active": false\n}'
          },
          {
            type: 'heading',
            level: 2,
            text: 'GET /api/v1/blocks/tip',
            id: 'get-tip'
          },
          {
            type: 'paragraph',
            text: 'Mengembalikan detail penuh dari blok tertinggi kanonikal saat ini, termasuk previous_block_hash yang menunjuk ke genesis hash.'
          },
          {
            type: 'code',
            language: 'bash',
            code: 'curl -s http://127.0.0.1:8332/api/v1/blocks/tip\n\n# Atau via public explorer:\ncurl -s https://explorer.myratu.com/api/v1/blocks/tip'
          },
          {
            type: 'heading',
            level: 2,
            text: 'GET /api/v1/blocks/{height_or_hash}',
            id: 'get-block'
          },
          {
            type: 'code',
            language: 'bash',
            caption: 'Contoh permintaan blok genesis',
            code: '# Ambil genesis block (height 0)\ncurl -s http://127.0.0.1:8332/api/v1/blocks/0\n\n# Atau via canonical genesis hash:\ncurl -s http://127.0.0.1:8332/api/v1/blocks/0x4033f099ae89051a629c871e9af28a215898ff345505ffdbbce65c27a29585c9'
          },
          {
            type: 'heading',
            level: 2,
            text: 'GET /api/v1/passbook?address={address}',
            id: 'get-passbook'
          },
          {
            type: 'paragraph',
            text: 'Mengambil daftar UTXO aktif, saldo Quanta total, dan riwayat transaksi untuk alamat Bech32.'
          },
          {
            type: 'code',
            language: 'bash',
            code: 'curl -s "http://127.0.0.1:8332/api/v1/passbook?address=scy1nw7vhxmxyz2jlw89vz88tdv938692xk968uxn89787fa4w207s8sddvv3q"'
          },
          {
            type: 'heading',
            level: 2,
            text: 'POST /api/v1/tx',
            id: 'post-tx'
          },
          {
            type: 'paragraph',
            text: 'Mengirimkan transaksi yang telah ditandatangani dalam format byte hex untuk divalidasi ke mempool dan disebarkan via Gossipsub.'
          },
          {
            type: 'code',
            language: 'bash',
            caption: 'Broadcast transaksi',
            code: 'curl -X POST https://explorer.myratu.com/api/v1/tx \\\n  -H "Content-Type: application/json" \\\n  -d \'{"raw_tx_hex": "0100000001..."}\''
          },
          {
            type: 'heading',
            level: 2,
            text: 'Error Codes',
            id: 'error-codes'
          },
          {
            type: 'table',
            table: {
              headers: ['HTTP Status', 'Kondisi'],
              rows: [
                ['400 Bad Request', 'Format JSON atau heksadesimal tidak valid.'],
                ['404 Not Found', 'Blok atau transaksi tidak ditemukan pada rantai kanonikal.'],
                ['422 Unprocessable Entity', 'Transaksi gagal validasi konsensus / double spend.'],
                ['429 Too Many Requests', 'Melampaui batas rate limit Nginx (burst exhausted).'],
                ['502 Bad Gateway', 'Node backend tidak dapat dihubungi.']
              ]
            }
          }
        ]
      },
      {
        id: 'cli-reference',
        title: 'CLI Wallet Reference',
        slug: 'cli',
        sectionId: 'api-ref',
        sectionTitle: 'API Reference',
        summary: 'Referensi lengkap perintah scytale-cli untuk manajemen dompet HD dan kueri node.',
        content: [
          {
            type: 'paragraph',
            text: 'scytale-cli adalah perkakas antarmuka baris perintah untuk pengelolaan dompet HD, pembuatan kunci Ed25519, penandatanganan transaksi, dan kueri interaktif ke node via Unix Socket atau HTTP RPC.'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Perintah Wallet',
            id: 'wallet-commands'
          },
          {
            type: 'table',
            table: {
              headers: ['Perintah', 'Deskripsi'],
              rows: [
                ['wallet new', 'Buat dompet baru — hasilkan Ed25519 key pair dan alamat Bech32.'],
                ['wallet restore --mnemonic "..."', 'Pulihkan dompet dari 12/24 kata BIP-39 mnemonic.'],
                ['wallet balance --address <scy1...>', 'Cek saldo UTXO terkonfirmasi untuk alamat.'],
                ['wallet send --from-key ... --to <scy1...> --amount X --fee Y', 'Kirim SCY ke alamat penerima.']
              ]
            }
          },
          {
            type: 'code',
            language: 'bash',
            caption: 'Contoh lengkap operasi wallet',
            code: '# 1. Buat dompet baru\n./target/release/scytale-cli wallet new\n\n# 2. Cek saldo\n./target/release/scytale-cli wallet balance \\\n  --address scy1nw7vhxmxyz2jlw89vz88tdv938692xk968uxn89787fa4w207s8sddvv3q\n\n# 3. Kirim SCY\n./target/release/scytale-cli wallet send \\\n  --from-key ~/.scytale/wallet.key \\\n  --to scy1<PENERIMA> \\\n  --amount 5.0 \\\n  --fee 1000'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Kueri Node via CLI',
            id: 'node-queries'
          },
          {
            type: 'code',
            language: 'bash',
            caption: 'Kueri status node dan blok',
            code: '# Cek status node\n./target/release/scytale-cli status\n\n# Cek tip blok\n./target/release/scytale-cli tip\n\n# Detail blok spesifik\n./target/release/scytale-cli block --height 1'
          }
        ]
      },
      {
        id: 'explorer',
        title: 'Web Explorer & Indexer',
        slug: 'explorer',
        sectionId: 'api-ref',
        sectionTitle: 'API Reference',
        summary: 'Arsitektur Web Explorer Node.js, ingestion worker, dan konfigurasi reverse proxy publik.',
        content: [
          {
            type: 'paragraph',
            text: 'Web Explorer Scytale adalah aplikasi Node.js yang mengindex metadata blok dan menyajikan antarmuka publik di https://explorer.myratu.com.'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Arsitektur Komponen',
            id: 'explorer-architecture'
          },
          {
            type: 'diagram',
            diagramContent: `┌─────────────────┐   HTTP Ingest (POST)    ┌─────────────────────────┐
│  scytale-node   │ ──────────────────────> │  scytale-explorer       │
│  (Port 8332)    │   Header: X-Indexer-Key │  (Port 3000 Node.js)    │
└─────────────────┘                         └───────────┬─────────────┘
                                                        │ Local Proxy
                                                        v
┌─────────────────┐      HTTPS (Port 443)   ┌─────────────────────────┐
│  Browser Publik │ <─────────────────────  │  Nginx Reverse Proxy    │
│                 │   explorer.myratu.com   │  (Rate Limit + SSL)     │
└─────────────────┘                         └─────────────────────────┘`
          },
          {
            type: 'heading',
            level: 2,
            text: 'Ingestion Worker',
            id: 'ingestion-worker'
          },
          {
            type: 'paragraph',
            text: 'Ketika node memvalidasi blok baru, modul indexer mem-push metadata ke Explorer backend:'
          },
          {
            type: 'table',
            table: {
              headers: ['Parameter', 'Nilai'],
              rows: [
                ['Target URL', 'http://127.0.0.1:3000/api/ingest'],
                ['Header Keamanan', 'X-Indexer-Key: <SECRET_KEY>'],
                ['Public URL', 'https://explorer.myratu.com'],
                ['SSL Certificate', "Let's Encrypt ECDSA (auto-renewal via certbot)"]
              ]
            }
          },
          {
            type: 'callout',
            calloutType: 'note',
            text: 'Docs portal tersedia di https://explorer.myratu.com/docs/ — React SPA dengan routing hash dan Tailwind v4.'
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // SECTION 7: CLI & Developer
  // ─────────────────────────────────────────────────────────────
  {
    id: 'devs',
    title: 'Developers',
    slug: 'developers',
    description: 'Struktur repositori, panduan kompilasi, test suite, dan kebijakan kontribusi.',
    pages: [
      {
        id: 'dev-workflow',
        title: 'Developer Workflow & Building',
        slug: 'development-workflow',
        sectionId: 'devs',
        sectionTitle: 'Developers',
        summary: 'Kompilasi, menjalankan testnet lokal, dan eksekusi test suite.',
        content: [
          {
            type: 'paragraph',
            text: 'Berkontribusi ke Scytale membutuhkan keakraban dengan Rust modern idiomatik, pemrograman asynchronous dengan Tokio, dan kriptografi dasar (Ed25519, Blake3, Bech32m).'
          },
          {
            type: 'code',
            language: 'bash',
            caption: 'Clone, test, dan linter checks',
            code: '# Clone repositori resmi\ngit clone https://github.com/ratufatma/scytale\ncd scytale\n\n# Jalankan semua unit dan integration test\ncargo test --all\n\n# Linter check\ncargo clippy --all-targets -- -D warnings\n\n# Verifikasi formatting\ncargo fmt --check'
          },
          {
            type: 'callout',
            calloutType: 'note',
            text: 'Semua pull request memerlukan 100% passing tests dan kepatuhan ketat terhadap zero C-library dependencies eksternal yang tidak terverifikasi.'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Struktur Workspace Rust',
            id: 'workspace-structure'
          },
          {
            type: 'table',
            table: {
              headers: ['Crate', 'Path', 'Tanggung Jawab'],
              rows: [
                ['scytale-primitives', 'crates/scytale-primitives', 'Blake3, Ed25519, serialisasi, tipe dasar.'],
                ['scytale-consensus', 'crates/scytale-consensus', 'PoW validation, difficulty, chain selection.'],
                ['scytale-core', 'crates/scytale-core', 'eUTXO model, P2PKH script eval, coinbase rules.'],
                ['scytale-storage', 'crates/scytale-storage', 'redb tables: blocks, headers, utxo_set, meta.'],
                ['scytale-network', 'crates/scytale-network', 'libp2p Gossipsub, Kademlia, Noise, Yamux.'],
                ['scytale-node', 'apps/scytale-node', 'Binary utama: HTTP RPC :8332, IPC socket.'],
                ['scytale-cli', 'apps/scytale-cli', 'CLI wallet: new, restore, balance, send.']
              ]
            }
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // SECTION 8: Reference
  // ─────────────────────────────────────────────────────────────
  {
    id: 'reference',
    title: 'Reference',
    slug: 'reference',
    description: 'Tabel parameter protokol kanonikal, kode error, dan ringkasan konfigurasi.',
    pages: [
      {
        id: 'canonical-params',
        title: 'Canonical Protocol Parameters',
        slug: 'canonical-params',
        sectionId: 'reference',
        sectionTitle: 'Reference',
        summary: 'Tabel lengkap semua parameter protokol kanonikal Scytale.',
        content: [
          {
            type: 'table',
            table: {
              headers: ['Parameter', 'Nilai Kanonikal'],
              rows: [
                ['Genesis Block Hash', '4033f099ae89051a629c871e9af28a215898ff345505ffdbbce65c27a29585c9'],
                ['Total Max Supply', '66,000,000 SCY'],
                ['Genesis Allocation (Pre-mine)', '33,000,000 SCY (19.8M Founder + 13.2M Dev)'],
                ['Mining Supply', '33,000,000 SCY'],
                ['Quanta per SCY', '100,000,000 (10^8)'],
                ['Block Subsidy Era 0', '25.00000000 SCY'],
                ['Halving Interval', '420,000 blocks'],
                ['Target Block Time', '60 seconds'],
                ['Difficulty Retarget', 'Every 1,440 blocks'],
                ['P2PKH Locking Script', '73 a0 20 <32-byte-hash> 88 ac'],
                ['Address Prefix', 'scy1... (Bech32m HRP: scy)'],
                ['Signature Scheme', 'Ed25519 (64-byte sig, 32-byte pubkey)'],
                ['Hash Function', 'Blake3 (256-bit)'],
                ['Storage Engine', 'redb (Pure Rust ACID MVCC)'],
                ['P2P Library', 'libp2p v0.56 (Tokio async)'],
                ['P2P Port', 'TCP 9000'],
                ['HTTP RPC Port', '8332'],
                ['Bootnode PeerID', '12D3KooWMNVcoP79QMoLfg8NKeFyCRfLBq6HngTQpmnkbD9oBWMc'],
                ['Bootnode DNS', '/dns4/seed.myratu.com/tcp/9000/p2p/12D3KooWMNVcoP79QMoLfg8NKeFyCRfLBq6HngTQpmnkbD9oBWMc'],
                ['Bootnode IP', '/ip4/116.212.72.89/tcp/9000/p2p/12D3KooWMNVcoP79QMoLfg8NKeFyCRfLBq6HngTQpmnkbD9oBWMc'],
                ['Public Explorer', 'https://explorer.myratu.com'],
                ['Coinbase Maturity', '100 blocks']
              ]
            }
          }
        ]
      },
      {
        id: 'error-reference',
        title: 'Error Codes Reference',
        slug: 'errors',
        sectionId: 'reference',
        sectionTitle: 'Reference',
        summary: 'Kode penolakan konsensus dan alasan disconnect P2P.',
        content: [
          {
            type: 'table',
            table: {
              headers: ['Error Code', 'Symbol', 'Description', 'Recovery Action'],
              rows: [
                ['E101', 'ERR_BAD_POW', 'Block header Blake3 hash exceeds current difficulty target.', 'Discard block; disconnect sending peer.'],
                ['E102', 'ERR_FUTURE_TIMESTAMP', 'Block timestamp is >2 hours ahead of median peer time.', 'Wait for local clock or re-synchronize NTP.'],
                ['E201', 'ERR_UTXO_NOT_FOUND', 'Transaction input references an outpoint missing from redb.', 'Wait for prerequisite transactions to confirm.'],
                ['E202', 'ERR_BAD_SIGNATURE', 'Ed25519 input signature fails public key verification.', 'Transaction invalid; reject immediately.'],
                ['E203', 'ERR_INVALID_SCRIPT', 'P2PKH script evaluation failed (OpDup/OpBlake3/OpEqualVerify/OpCheckSig chain).', 'Reject transaction; check locking script format.'],
                ['E301', 'ERR_COINBASE_PREMATURE', 'Coinbase output spent prior to 100 block maturity depth.', 'Wait until maturity height is reached.'],
                ['E302', 'ERR_SUBSIDY_EXCEEDED', 'Coinbase output exceeds block_subsidy(height) + fees.', 'Block invalid; reject and disconnect peer.']
              ]
            }
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // SECTION 9: Ecosystem Roadmap & R&D (Akan Segera Terbit)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'roadmap',
    title: 'Roadmap & R&D',
    slug: 'roadmap',
    description: 'Modul dan fitur masa depan dalam tahap riset dan pengembangan (Fase 2).',
    pages: [
      {
        id: 'smart-contracts',
        title: 'Smart Contracts / Virtual Machine',
        slug: 'smart-contracts',
        sectionId: 'roadmap',
        sectionTitle: 'Roadmap & R&D',
        status: 'coming-soon',
        summary: 'Spesifikasi eUTXO WebAssembly execution engine dan model deterministik smart contract Scytale.',
        content: [
          {
            type: 'paragraph',
            text: 'Scytale merancang lapisan smart contract deterministik berbasis model eUTXO (extended UTXO) dan WebAssembly (WASM). Berbeda dengan account-based virtual machine yang rentan terhadap re-entrancy bugs dan state bloat, model eUTXO Scytale memproses eksekusi kontrak secara stateless dan parallelizable.'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Arsitektur eUTXO Smart Contract',
            id: 'eutxo-contracts'
          },
          {
            type: 'list',
            items: [
              'WebAssembly Sandboxing: Eksekusi bytecode WASM sandboxed dengan batasan fuel deterministik tanpa instruksi floating-point.',
              'Datum & Redeemer Pattern: Script pengeluaran memverifikasi pasangan datum state dan redeemer input secara matematis.',
              'Zero State Bloat: Bukti eksekusi kontrak terkomit langsung ke dalam pohon UTXO tanpa memerlukan database state trie global yang membesar tak terbatas.'
            ]
          }
        ]
      },
      {
        id: 'mining-pool',
        title: 'Mining Pool Protocol (Stratum Pool)',
        slug: 'mining-pool',
        sectionId: 'roadmap',
        sectionTitle: 'Roadmap & R&D',
        status: 'coming-soon',
        summary: 'Protokol koordinasi penambangan terdistribusi dan pool shares berbasis Stratum v2 / Blake3.',
        content: [
          {
            type: 'paragraph',
            text: 'Protokol Mining Pool Scytale dirancang untuk memfasilitasi agregasi hashrate CPU secara efisien melalui protokol Stratum berlatensi rendah dengan validasi share berbasis Blake3 PoW.'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Fitur Utama Protokol Mining Pool',
            id: 'pool-features'
          },
          {
            type: 'list',
            items: [
              'Stratum Binary Protocol: Komunikasi hemat bandwidth antara mining worker rig dan pool coordinator daemon.',
              'Variable Difficulty (Vardiff): Penyesuaian otomatis target share individual untuk meminimalkan beban jaringan penambang.',
              'PPLNS Accounting: Skema pembagian reward coinbase terverifikasi dengan auditability transparan bagi seluruh penambang.'
            ]
          }
        ]
      },
      {
        id: 'desktop-extension-wallet',
        title: 'GUI Desktop Wallet & Extension',
        slug: 'desktop-extension-wallet',
        sectionId: 'roadmap',
        sectionTitle: 'Roadmap & R&D',
        status: 'coming-soon',
        summary: 'Aplikasi antarmuka grafis desktop berbasis Tauri dan ekstensi peramban non-custodial.',
        content: [
          {
            type: 'paragraph',
            text: 'Dompet desktop berbasis Tauri/Rust dan ekstensi peramban menyediakan antarmuka visual intuitif untuk mengelola passbook UTXO, menandatangani transaksi secara offline (air-gapped), dan berinteraksi dengan ekosistem Scytale tanpa kompromi keamanan.'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Pilar Desain Dompet Grafis',
            id: 'wallet-pillars'
          },
          {
            type: 'list',
            items: [
              'Tauri Native App: Antarmuka ultra-ringan dengan konsumsi memori rendah (<50MB RAM) dan keamanan sandboxed.',
              'Enkripsi Argon2id + ChaCha20: Penyimpanan kunci privat terisolasi pada disk lokal dengan POSIX permission ketat.',
              'Dukungan Air-Gapped QR: Penandatanganan transaksi dingin tanpa menghubungkan perangkat penyimpanan kunci ke jaringan.'
            ]
          }
        ]
      },
      {
        id: 'cross-chain-governance',
        title: 'Cross-Chain Bridge & Governance',
        slug: 'cross-chain-governance',
        sectionId: 'roadmap',
        sectionTitle: 'Roadmap & R&D',
        status: 'coming-soon',
        summary: 'Jembatan interoperabilitas kriptografis SPV dan mekanisme konsensus tata kelola proposal perbaikan Scytale (SIP).',
        content: [
          {
            type: 'paragraph',
            text: 'Protokol jembatan cross-chain memungkinkan transfer nilai tanpa kustodian terpusat berbasis verifikasi bukti kriptografis SPV (Simplified Payment Verification), didampingi kerangka tata kelola Scytale Improvement Proposals (SIP).'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Mekanisme Interoperabilitas & Tata Kelola',
            id: 'bridge-governance'
          },
          {
            type: 'list',
            items: [
              'SPV Light Client Proofs: Verifikasi header rantai silang berbasis bukti pohon inklusi Blake3.',
              'Scytale Improvement Proposals (SIP): Mekanisme upgrade protokol on-chain dengan sinyal hashrate penambang dan konsensus node operator.',
              'Non-Custodial Escrow: Penguncian multi-sig deterministik tanpa ketergantungan oracle terpusat.'
            ]
          }
        ]
      }
    ]
  }
];
