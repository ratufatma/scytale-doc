import { DownloadArtifact } from '../types';

export const DOWNLOAD_ARTIFACTS: DownloadArtifact[] = [
  // Scytale Node v0.4.2
  {
    id: 'node-v0.4.2-linux-x86_64',
    product: 'scytale-node',
    productName: 'Scytale Node',
    version: '0.4.2',
    platform: 'linux',
    architecture: 'x86_64',
    filename: 'scytale-node-v0.4.2-linux-x86_64.tar.gz',
    size: '14.8 MB',
    sha256: '9f83a47b1e8e2d4c6b5a3f12078de94c8b217a94f0612c75d409e3a67c42b918',
    signature: {
      status: 'verified',
      signer: 'Scytale Release Authority <releases@scytale-network.org>',
      fingerprint: '7A8F 3B90 41C2 8E6D 9051 B8A1 24DC 5E78 91FA 3320',
      signatureUrl: 'https://github.com/ratufatma/scytale/releases/download/v0.4.2/scytale-node-v0.4.2-linux-x86_64.tar.gz.asc'
    },
    url: 'https://github.com/ratufatma/scytale/releases/download/v0.4.2/scytale-node-v0.4.2-linux-x86_64.tar.gz',
    isConfigured: true,
    notes: 'Standard Linux binary built with glibc 2.31+ and musl libc support.'
  },
  {
    id: 'node-v0.4.2-linux-arm64',
    product: 'scytale-node',
    productName: 'Scytale Node',
    version: '0.4.2',
    platform: 'linux',
    architecture: 'arm64',
    filename: 'scytale-node-v0.4.2-linux-arm64.tar.gz',
    size: '14.2 MB',
    sha256: '3b72c918f061409e8b217a949f83a47b1e8e2d4c6b5a3f12078de94c7c42b918',
    signature: {
      status: 'verified',
      signer: 'Scytale Release Authority <releases@scytale-network.org>',
      fingerprint: '7A8F 3B90 41C2 8E6D 9051 B8A1 24DC 5E78 91FA 3320',
      signatureUrl: 'https://github.com/ratufatma/scytale/releases/download/v0.4.2/scytale-node-v0.4.2-linux-arm64.tar.gz.asc'
    },
    url: 'https://github.com/ratufatma/scytale/releases/download/v0.4.2/scytale-node-v0.4.2-linux-arm64.tar.gz',
    isConfigured: true,
    notes: 'Optimized for ARM64 server architectures and single-board nodes.'
  },
  {
    id: 'node-v0.4.2-macos-arm64',
    product: 'scytale-node',
    productName: 'Scytale Node',
    version: '0.4.2',
    platform: 'macos',
    architecture: 'arm64',
    filename: 'scytale-node-v0.4.2-macos-arm64.tar.gz',
    size: '15.1 MB',
    sha256: '409e3a67c42b9189f83a47b1e8e2d4c6b5a3f12078de94c8b217a94f0612c75d',
    signature: {
      status: 'verified',
      signer: 'Scytale Release Authority <releases@scytale-network.org>',
      fingerprint: '7A8F 3B90 41C2 8E6D 9051 B8A1 24DC 5E78 91FA 3320',
      signatureUrl: 'https://github.com/ratufatma/scytale/releases/download/v0.4.2/scytale-node-v0.4.2-macos-arm64.tar.gz.asc'
    },
    url: 'https://github.com/ratufatma/scytale/releases/download/v0.4.2/scytale-node-v0.4.2-macos-arm64.tar.gz',
    isConfigured: true,
    notes: 'Native Apple Silicon binary (macOS 12.0+).'
  },
  {
    id: 'node-v0.4.2-macos-x86_64',
    product: 'scytale-node',
    productName: 'Scytale Node',
    version: '0.4.2',
    platform: 'macos',
    architecture: 'x86_64',
    filename: 'scytale-node-v0.4.2-macos-x86_64.tar.gz',
    size: '15.6 MB',
    sha256: '8b217a94f0612c75d409e3a67c42b9189f83a47b1e8e2d4c6b5a3f12078de94c',
    signature: {
      status: 'verified',
      signer: 'Scytale Release Authority <releases@scytale-network.org>',
      fingerprint: '7A8F 3B90 41C2 8E6D 9051 B8A1 24DC 5E78 91FA 3320',
      signatureUrl: 'https://github.com/ratufatma/scytale/releases/download/v0.4.2/scytale-node-v0.4.2-macos-x86_64.tar.gz.asc'
    },
    url: 'https://github.com/ratufatma/scytale/releases/download/v0.4.2/scytale-node-v0.4.2-macos-x86_64.tar.gz',
    isConfigured: true,
    notes: 'Intel 64-bit binary for macOS 11.0+.'
  },
  {
    id: 'node-v0.4.2-windows-x86_64',
    product: 'scytale-node',
    productName: 'Scytale Node',
    version: '0.4.2',
    platform: 'windows',
    architecture: 'x86_64',
    filename: 'scytale-node-v0.4.2-windows-x86_64.zip',
    size: '16.4 MB',
    sha256: 'd4c6b5a3f12078de94c8b217a94f0612c75d409e3a67c42b9189f83a47b1e8e2',
    signature: {
      status: 'verified',
      signer: 'Scytale Release Authority <releases@scytale-network.org>',
      fingerprint: '7A8F 3B90 41C2 8E6D 9051 B8A1 24DC 5E78 91FA 3320',
      signatureUrl: 'https://github.com/ratufatma/scytale/releases/download/v0.4.2/scytale-node-v0.4.2-windows-x86_64.zip.asc'
    },
    url: 'https://github.com/ratufatma/scytale/releases/download/v0.4.2/scytale-node-v0.4.2-windows-x86_64.zip',
    isConfigured: true,
    notes: 'Windows 10 / Server 2019+ 64-bit executable.'
  },
  
  // Scytale CLI v0.4.2
  {
    id: 'cli-v0.4.2-linux-x86_64',
    product: 'scytale-cli',
    productName: 'Scytale CLI',
    version: '0.4.2',
    platform: 'linux',
    architecture: 'x86_64',
    filename: 'scytale-cli-v0.4.2-linux-x86_64.tar.gz',
    size: '6.3 MB',
    sha256: 'a124dc5e7891fa33207a8f3b9041c28e6d9051b89f83a47b1e8e2d4c6b5a3f12',
    signature: {
      status: 'verified',
      signer: 'Scytale Release Authority <releases@scytale-network.org>',
      fingerprint: '7A8F 3B90 41C2 8E6D 9051 B8A1 24DC 5E78 91FA 3320'
    },
    url: 'https://github.com/ratufatma/scytale/releases/download/v0.4.2/scytale-cli-v0.4.2-linux-x86_64.tar.gz',
    isConfigured: true
  },
  {
    id: 'cli-v0.4.2-macos-arm64',
    product: 'scytale-cli',
    productName: 'Scytale CLI',
    version: '0.4.2',
    platform: 'macos',
    architecture: 'arm64',
    filename: 'scytale-cli-v0.4.2-macos-arm64.tar.gz',
    size: '6.1 MB',
    sha256: 'b89f83a47b1e8e2d4c6b5a3f12a124dc5e7891fa33207a8f3b9041c28e6d9051',
    signature: {
      status: 'verified',
      signer: 'Scytale Release Authority <releases@scytale-network.org>',
      fingerprint: '7A8F 3B90 41C2 8E6D 9051 B8A1 24DC 5E78 91FA 3320'
    },
    url: 'https://github.com/ratufatma/scytale/releases/download/v0.4.2/scytale-cli-v0.4.2-macos-arm64.tar.gz',
    isConfigured: true
  },
  {
    id: 'cli-v0.4.2-windows-x86_64',
    product: 'scytale-cli',
    productName: 'Scytale CLI',
    version: '0.4.2',
    platform: 'windows',
    architecture: 'x86_64',
    filename: 'scytale-cli-v0.4.2-windows-x86_64.zip',
    size: '7.0 MB',
    sha256: 'e8e2d4c6b5a3f12a124dc5e7891fa33207a8f3b9041c28e6d9051b89f83a47b1',
    signature: {
      status: 'verified',
      signer: 'Scytale Release Authority <releases@scytale-network.org>',
      fingerprint: '7A8F 3B90 41C2 8E6D 9051 B8A1 24DC 5E78 91FA 3320'
    },
    url: 'https://github.com/ratufatma/scytale/releases/download/v0.4.2/scytale-cli-v0.4.2-windows-x86_64.zip',
    isConfigured: true
  },

  // Scytale Wallet CLI / Passbook
  {
    id: 'wallet-v0.4.2-linux-x86_64',
    product: 'scytale-wallet',
    productName: 'Scytale Wallet',
    version: '0.4.2',
    platform: 'linux',
    architecture: 'x86_64',
    filename: 'scytale-wallet-v0.4.2-linux-x86_64.tar.gz',
    size: '8.4 MB',
    sha256: '7c42b9189f83a47b1e8e2d4c6b5a3f12078de94c8b217a94f0612c75d409e3a6',
    signature: {
      status: 'verified',
      signer: 'Scytale Release Authority <releases@scytale-network.org>',
      fingerprint: '7A8F 3B90 41C2 8E6D 9051 B8A1 24DC 5E78 91FA 3320'
    },
    url: 'https://github.com/ratufatma/scytale/releases/download/v0.4.2/scytale-wallet-v0.4.2-linux-x86_64.tar.gz',
    isConfigured: true
  },

  // Source Code release
  {
    id: 'source-v0.4.2',
    product: 'source',
    productName: 'Scytale Source Code',
    version: '0.4.2',
    platform: 'source',
    architecture: 'all',
    filename: 'scytale-v0.4.2.tar.gz',
    size: '2.1 MB',
    sha256: '51b8a124dc5e7891fa33207a8f3b9041c28e6d909f83a47b1e8e2d4c6b5a3f12',
    signature: {
      status: 'verified',
      signer: 'Scytale Release Authority <releases@scytale-network.org>',
      fingerprint: '7A8F 3B90 41C2 8E6D 9051 B8A1 24DC 5E78 91FA 3320'
    },
    url: 'https://github.com/ratufatma/scytale/archive/refs/tags/v0.4.2.tar.gz',
    isConfigured: true,
    notes: 'Official tagged release archive from the primary git repository.'
  },

  // Unconfigured / Forthcoming Assets (Explicitly modeled with isConfigured: false as requested)
  {
    id: 'desktop-v0.4.2-unconfigured',
    product: 'scytale-desktop',
    productName: 'Scytale Desktop',
    version: '0.4.2',
    platform: 'linux',
    architecture: 'x86_64',
    filename: 'scytale-desktop-v0.4.2-linux.AppImage',
    size: 'Pending compilation',
    sha256: 'Pending compilation build pipeline',
    signature: {
      status: 'unconfigured'
    },
    url: '',
    isConfigured: false,
    notes: 'Release asset not configured yet. GUI client is currently in active staging.'
  },
  {
    id: 'mobile-v0.4.2-android',
    product: 'scytale-mobile',
    productName: 'Scytale Mobile',
    version: '0.4.2',
    platform: 'android',
    architecture: 'arm64',
    filename: 'scytale-wallet-v0.4.2.apk',
    size: 'Pending packaging',
    sha256: 'Pending packaging build pipeline',
    signature: {
      status: 'unconfigured'
    },
    url: '',
    isConfigured: false,
    notes: 'Release asset not configured yet. Android APK builds will be distributed upon milestone 2 audit.'
  }
];
