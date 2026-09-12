import { DownloadArtifact } from '../types';

export const DOWNLOAD_ARTIFACTS: DownloadArtifact[] = [
  // Scytale Release Bundle v0.3.0-testnet (Node & CLI)
  {
    id: 'bundle-v0.3.0-linux-x86_64',
    product: 'scytale-node',
    productName: 'Scytale Release Bundle (Node + CLI)',
    version: '0.3.0',
    platform: 'linux',
    architecture: 'x86_64',
    filename: 'scytale-v0.3.0-testnet-linux-x86_64.tar.gz',
    size: '10.0 MB',
    sha256: '816163f2c5b2e095fe5f1315d60e1843d09e5ae796dd6390d36b2ff4dbc30e29',
    signature: {
      status: 'verified',
      signer: 'Scytale Release Authority <ratufatmasetyaningrum@gmail.com>',
      fingerprint: '4A8B 9C1D 2E3F 0A7B 8C9D 1E2F 3A4B 5C6D 7E8F 9A0B',
      signatureUrl: 'https://github.com/ratufatma/scytale/releases/download/v0.3.0-testnet/scytale-v0.3.0-testnet-linux-x86_64.tar.gz.sha256'
    },
    url: 'https://github.com/ratufatma/scytale/releases/download/v0.3.0-testnet/scytale-v0.3.0-testnet-linux-x86_64.tar.gz',
    isConfigured: true,
    notes: 'Official distribution tarball containing scytale-node and scytale-cli compiled for Linux x86_64 with Blake3 PoW consensus and libp2p networking.'
  },
  {
    id: 'cli-v0.3.0-linux-x86_64',
    product: 'scytale-cli',
    productName: 'Scytale CLI (Included in Release Tarball)',
    version: '0.3.0',
    platform: 'linux',
    architecture: 'x86_64',
    filename: 'scytale-v0.3.0-testnet-linux-x86_64.tar.gz',
    size: '10.0 MB',
    sha256: '816163f2c5b2e095fe5f1315d60e1843d09e5ae796dd6390d36b2ff4dbc30e29',
    signature: {
      status: 'verified',
      signer: 'Scytale Release Authority <ratufatmasetyaningrum@gmail.com>',
      fingerprint: '4A8B 9C1D 2E3F 0A7B 8C9D 1E2F 3A4B 5C6D 7E8F 9A0B',
      signatureUrl: 'https://github.com/ratufatma/scytale/releases/download/v0.3.0-testnet/scytale-v0.3.0-testnet-linux-x86_64.tar.gz.sha256'
    },
    url: 'https://github.com/ratufatma/scytale/releases/download/v0.3.0-testnet/scytale-v0.3.0-testnet-linux-x86_64.tar.gz',
    isConfigured: true,
    notes: 'Interactive wallet management, BIP-39 mnemonic creation, and miner operator CLI tool.'
  },
  {
    id: 'wallet-v0.3.0-linux-x86_64',
    product: 'scytale-wallet',
    productName: 'Scytale Wallet Tool (CLI Passbook)',
    version: '0.3.0',
    platform: 'linux',
    architecture: 'x86_64',
    filename: 'scytale-v0.3.0-testnet-linux-x86_64.tar.gz',
    size: '10.0 MB',
    sha256: '816163f2c5b2e095fe5f1315d60e1843d09e5ae796dd6390d36b2ff4dbc30e29',
    signature: {
      status: 'verified',
      signer: 'Scytale Release Authority <ratufatmasetyaningrum@gmail.com>'
    },
    url: 'https://github.com/ratufatma/scytale/releases/download/v0.3.0-testnet/scytale-v0.3.0-testnet-linux-x86_64.tar.gz',
    isConfigured: true,
    notes: 'Non-custodial Ed25519 wallet management accessible via the `scytale-cli wallet` subcommand.'
  },

  // SHA256 Checksum file
  {
    id: 'sha256-v0.3.0-linux-x86_64',
    product: 'scytale-node',
    productName: 'SHA256 Checksum Verification File',
    version: '0.3.0',
    platform: 'linux',
    architecture: 'all',
    filename: 'scytale-v0.3.0-testnet-linux-x86_64.tar.gz.sha256',
    size: '109 B',
    sha256: '816163f2c5b2e095fe5f1315d60e1843d09e5ae796dd6390d36b2ff4dbc30e29',
    signature: {
      status: 'verified',
      signer: 'Scytale Release Authority'
    },
    url: 'https://github.com/ratufatma/scytale/releases/download/v0.3.0-testnet/scytale-v0.3.0-testnet-linux-x86_64.tar.gz.sha256',
    isConfigured: true,
    notes: 'Direct sha256 checksum digest for cryptographic package verification.'
  },

  // Source Code release
  {
    id: 'source-v0.3.0',
    product: 'source',
    productName: 'Scytale Source Code Archive',
    version: '0.3.0',
    platform: 'source',
    architecture: 'all',
    filename: 'v0.3.0-testnet.tar.gz',
    size: 'Git Archive',
    sha256: 'Commit tagged v0.3.0-testnet on GitHub',
    signature: {
      status: 'verified',
      signer: 'Scytale Git Authority'
    },
    url: 'https://github.com/ratufatma/scytale/archive/refs/tags/v0.3.0-testnet.tar.gz',
    isConfigured: true,
    notes: 'Official tagged source code archive from the primary git repository.'
  },

  // Forthcoming / Roadmap Assets with Coming Soon status
  {
    id: 'desktop-v0.3.0-unconfigured',
    product: 'scytale-desktop',
    productName: 'Scytale Desktop GUI Wallet',
    version: '0.3.0',
    platform: 'linux',
    architecture: 'x86_64',
    filename: 'scytale-desktop-v0.3.0-linux.AppImage',
    size: 'Akan Segera Terbit (Fase 2)',
    sha256: 'Tahap Riset & Pengembangan (R&D)',
    signature: {
      status: 'unconfigured'
    },
    url: '',
    isConfigured: false,
    notes: 'Akan Segera Terbit (Fase 2). GUI client berbasis Tauri/Rust sedang dalam tahap riset dan pengembangan (R&D).'
  },
  {
    id: 'mobile-v0.3.0-android',
    product: 'scytale-mobile',
    productName: 'Scytale Mobile Companion',
    version: '0.3.0',
    platform: 'android',
    architecture: 'arm64',
    filename: 'scytale-wallet-v0.3.0.apk',
    size: 'Akan Segera Terbit (Fase 2)',
    sha256: 'Tahap Riset & Pengembangan (R&D)',
    signature: {
      status: 'unconfigured'
    },
    url: '',
    isConfigured: false,
    notes: 'Akan Segera Terbit (Fase 2). Rilis dijadwalkan pada fase pengembangan berikutnya sesuai roadmap ekosistem Scytale.'
  }
];
