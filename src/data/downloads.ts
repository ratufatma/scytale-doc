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
    sha256: '84e539e4c0be9ec575c3f0c4c9bc43eca42ff72bf2f4a79c725a5d339d87c5ad',
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
    sha256: '84e539e4c0be9ec575c3f0c4c9bc43eca42ff72bf2f4a79c725a5d339d87c5ad',
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
    sha256: '84e539e4c0be9ec575c3f0c4c9bc43eca42ff72bf2f4a79c725a5d339d87c5ad',
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
    sha256: '84e539e4c0be9ec575c3f0c4c9bc43eca42ff72bf2f4a79c725a5d339d87c5ad',
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

  // Linux Desktop Clients (.deb & .AppImage)
  {
    id: 'desktop-deb-v0.3.0-linux-x86_64',
    product: 'scytale-desktop',
    productName: 'Scytale Desktop Explorer (.deb)',
    version: '0.3.0',
    platform: 'linux',
    architecture: 'x86_64',
    filename: 'scytale-desktop_0.3.0_amd64.deb',
    size: '72 MB',
    sha256: '0af7781ea40de86bd709b1f14bf73bb581cb1118f971a3a179117a6f88007644',
    signature: {
      status: 'verified',
      signer: 'Scytale Release Authority <ratufatmasetyaningrum@gmail.com>'
    },
    url: 'https://github.com/ratufatma/scytale/releases/download/v0.3.0-testnet/scytale-desktop_0.3.0_amd64.deb',
    isConfigured: true,
    notes: 'Debian/Ubuntu installation package for Scytale Desktop Explorer with integrated RPC dashboard and block explorer.'
  },
  {
    id: 'desktop-appimage-v0.3.0-linux-x86_64',
    product: 'scytale-desktop',
    productName: 'Scytale Desktop Explorer (.AppImage)',
    version: '0.3.0',
    platform: 'linux',
    architecture: 'x86_64',
    filename: 'Scytale Block Explorer-0.3.0.AppImage',
    size: '104 MB',
    sha256: '56ab066f4b8182f8d288b345ecf444875da863911f68002a05274e9e4553d63a',
    signature: {
      status: 'verified',
      signer: 'Scytale Release Authority <ratufatmasetyaningrum@gmail.com>'
    },
    url: 'https://github.com/ratufatma/scytale/releases/download/v0.3.0-testnet/Scytale%20Block%20Explorer-0.3.0.AppImage',
    isConfigured: true,
    notes: 'Standalone portable Linux executable for Scytale Desktop Explorer. Make executable with chmod +x.'
  },

  // Android Mobile Companion (.apk)
  {
    id: 'mobile-v0.3.0-android',
    product: 'scytale-mobile',
    productName: 'Scytale Mobile Companion (.apk)',
    version: '0.3.0',
    platform: 'android',
    architecture: 'all',
    filename: 'scytale-mobile-v0.3.0-testnet.apk',
    size: '139 MB',
    sha256: '3446c9b66d8b0c4b2de5f544a03d8e671270eccaf76dc1487f2981af4eaedcf2',
    signature: {
      status: 'verified',
      signer: 'Scytale Release Authority <ratufatmasetyaningrum@gmail.com>',
      signatureUrl: 'https://github.com/ratufatma/scytale/releases/download/v0.3.0-testnet/scytale-mobile-v0.3.0-testnet.apk.sha256'
    },
    url: 'https://github.com/ratufatma/scytale/releases/download/v0.3.0-testnet/scytale-mobile-v0.3.0-testnet.apk',
    isConfigured: true,
    notes: 'Offline Hermes bundled standalone Android package for Scytale Mobile Companion with wallet management and network telemetry.'
  }
];
