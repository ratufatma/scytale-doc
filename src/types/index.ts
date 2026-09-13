export type Platform = 'linux' | 'windows' | 'macos' | 'android' | 'source';
export type Architecture = 'x86_64' | 'arm64' | 'universal' | 'all';
export type ReleaseStatus = 'latest' | 'stable' | 'pre-release' | 'archived';

export interface SignatureInfo {
  status: 'verified' | 'pending' | 'unconfigured';
  signer?: string;
  fingerprint?: string;
  signatureUrl?: string;
}

export interface DownloadArtifact {
  id: string;
  product: string;
  productName: string;
  version: string;
  platform: Platform;
  architecture: Architecture;
  filename: string;
  size: string;
  sha256: string;
  signature?: SignatureInfo;
  url: string;
  isConfigured: boolean;
  notes?: string;
  persona?: 'wallet' | 'developer' | 'node';
}

export interface ReleaseChanges {
  features: string[];
  improvements: string[];
  bugFixes: string[];
  breakingChanges?: string[];
  securityNotes?: string[];
}

export interface Release {
  id: string;
  version: string;
  releaseDate: string;
  status: ReleaseStatus;
  summary: string;
  highlights: string[];
  changes: ReleaseChanges;
  artifacts: DownloadArtifact[];
  knownIssues?: string[];
  rawChangelogUrl?: string;
}

export interface Software {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  category: 'Core Node' | 'Client Tools' | 'User Applications' | 'Network Tools' | 'Development';
  platforms: Platform[];
  documentationPath: string;
  repositoryPath: string;
  latestRelease: string;
  features: string[];
  status?: 'active' | 'coming-soon';
  badge?: string;
  systemRequirements: {
    os: string;
    cpu: string;
    ram: string;
    storage: string;
  };
  installQuickstart: {
    title: string;
    command: string;
    description: string;
  }[];
}

export type DocCalloutType = 'note' | 'tip' | 'warning' | 'security';

export interface DocTable {
  headers: string[];
  rows: string[][];
}

export interface DocContentItem {
  type: 'heading' | 'paragraph' | 'code' | 'callout' | 'table' | 'list' | 'diagram';
  level?: 2 | 3 | 4;
  id?: string;
  text?: string;
  language?: string;
  code?: string;
  caption?: string;
  calloutType?: DocCalloutType;
  items?: string[];
  table?: DocTable;
  diagramContent?: string;
}

export interface DocPage {
  id: string;
  title: string;
  slug: string;
  sectionId: string;
  sectionTitle: string;
  summary: string;
  content: DocContentItem[];
  status?: 'active' | 'coming-soon';
  badge?: string;
  nextPage?: { title: string; path: string };
  prevPage?: { title: string; path: string };
}

export interface DocSection {
  id: string;
  title: string;
  slug: string;
  description: string;
  pages: DocPage[];
}

export interface NetworkParameter {
  name: string;
  value: string;
  unit?: string;
  description: string;
  category: 'Consensus' | 'Storage' | 'Monetary' | 'P2P' | 'Genesis';
}

export interface NetworkInfo {
  networkId: string;
  name: string;
  phase: 'Testnet Alpha' | 'Testnet' | 'Mainnet';
  consensus: string;
  hashingAlgorithm: string;
  storageEngine: string;
  maxSupply: string;
  supplyUnit: string;
  targetBlockTime: string;
  difficultyAdjustmentInterval: string;
  initialBlockReward: string;
  halvingInterval: string;
  p2pPort: number;
  rpcPort: number;
  genesisBlockHash: string;
  genesisTimestamp: string;
  parameters: NetworkParameter[];
  statusNotice: string;
  isRpcConnected: boolean;
}

export interface SearchItem {
  id: string;
  title: string;
  section: string;
  description: string;
  path: string;
  category: 'Documentation' | 'Protocol' | 'CLI' | 'Software' | 'Release';
  keywords: string[];
}
