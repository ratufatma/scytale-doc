import { NetworkInfo, NetworkParameter } from '../types';

export const NETWORK_PARAMETERS: NetworkParameter[] = [
  {
    name: 'Total Maximum Supply',
    value: '66,000,000',
    unit: 'SCY',
    description: 'Fixed mathematical ceiling. No inflationary emission or arbitrary minting exists within the protocol rules.',
    category: 'Monetary'
  },
  {
    name: 'Smallest Atomic Unit',
    value: '10^-8',
    unit: 'base unit (1 SCY = 100,000,000 base units)',
    description: 'All internal ledger calculations are represented as 64-bit unsigned integers.',
    category: 'Monetary'
  },
  {
    name: 'Target Block Time',
    value: '60',
    unit: 'seconds',
    description: 'The mathematical target interval between valid mined blocks.',
    category: 'Consensus'
  },
  {
    name: 'Difficulty Retarget Interval',
    value: '1,440',
    unit: 'blocks (~24 hours)',
    description: 'Proof of work difficulty recalculates dynamically based on cumulative timestamps across the window.',
    category: 'Consensus'
  },
  {
    name: 'Initial Block Subsidy',
    value: '25',
    unit: 'SCY',
    description: 'Coinbase reward granted to the miner of a valid block in epoch 0.',
    category: 'Monetary'
  },
  {
    name: 'Subsidy Halving Interval',
    value: '420,000',
    unit: 'blocks (~480 days)',
    description: 'The block reward halves geometrically until the 66,000,000 SCY cap is reached.',
    category: 'Monetary'
  },
  {
    name: 'Cryptographic Hashing Algorithm',
    value: 'Blake3',
    unit: '256-bit digest',
    description: 'Applied universally across block headers, transaction identifiers, Merkle tree nodes, and address derivations.',
    category: 'Consensus'
  },
  {
    name: 'Primary Storage Engine',
    value: 'redb',
    unit: 'pure Rust embedded ACID KV store',
    description: 'Durable key-value storage engine storing headers, block indices, and unspent transaction outputs (UTXO).',
    category: 'Storage'
  },
  {
    name: 'Maximum Block Payload Size',
    value: '2,000,000',
    unit: 'bytes (2 MB)',
    description: 'Strict upper bound on serialized block byte length to prevent bandwidth exhaustion.',
    category: 'Consensus'
  },
  {
    name: 'Coinbase Maturity',
    value: '100',
    unit: 'blocks',
    description: 'Newly mined coins cannot be spent until 100 subsequent blocks have been appended to prevent reorg hazards.',
    category: 'Consensus'
  },
  {
    name: 'Default P2P Port',
    value: '9000',
    unit: 'TCP',
    description: 'Standard listening port for peer-to-peer wire protocol synchronization.',
    category: 'P2P'
  },
  {
    name: 'Default RPC/IPC Port',
    value: '8332',
    unit: 'TCP / UNIX socket',
    description: 'Standard interface for client commands, local wallet calls, and mining rigs.',
    category: 'P2P'
  },
  {
    name: 'Genesis Block Hash',
    value: '4033f099ae89051a629c871e9af28a215898ff345505ffdbbce65c27a29585c9',
    description: 'The cryptographic seed block hardcoded into all conforming node client releases.',
    category: 'Genesis'
  },
  {
    name: 'Genesis Timestamp',
    value: '0 (Canonical epoch zero)',
    description: 'Epoch start time for the Scytale testnet cluster.',
    category: 'Genesis'
  }
];

export const CURRENT_NETWORK_INFO: NetworkInfo = {
  networkId: 'scytale-testnet-1',
  name: 'Scytale Testnet Alpha',
  phase: 'Testnet Alpha',
  consensus: 'Proof of Work (Blake3)',
  hashingAlgorithm: 'Blake3',
  storageEngine: 'redb',
  maxSupply: '66,000,000 SCY',
  supplyUnit: 'SCY',
  targetBlockTime: '60 seconds',
  difficultyAdjustmentInterval: '1,440 blocks',
  initialBlockReward: '25 SCY',
  halvingInterval: '420,000 blocks',
  p2pPort: 9000,
  rpcPort: 8332,
  genesisBlockHash: '4033f099ae89051a629c871e9af28a215898ff345505ffdbbce65c27a29585c9',
  genesisTimestamp: '0 (Canonical epoch zero)',
  parameters: NETWORK_PARAMETERS,
  statusNotice: 'Live network telemetry is not connected to a public RPC server. To stream live block height, peer count, and hash rate, configure your node RPC connection via SCYTALE_RPC_URL or the local CLI client.',
  isRpcConnected: false
};
