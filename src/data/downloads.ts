import { DownloadArtifact } from '../types';

export const DOWNLOAD_ARTIFACTS: DownloadArtifact[] = [
  // --- Scytale Passbook Suite (v0.1.0) ---
  {
    id: 'passbook-v0.1.0-windows-exe',
    product: 'scytale-passbook',
    productName: 'Scytale Passbook (Windows Setup .exe)',
    version: '0.1.0',
    platform: 'windows',
    architecture: 'x86_64',
    filename: 'Scytale Passbook_0.1.0_x64-setup.exe',
    size: '1.83 MB',
    sha256: 'c647f2427a2234f4f03e23c6858cad647586c0d80e729e54e7ac924be615eda9',
    signature: {
      status: 'verified',
      signer: 'Scytale Release Authority <ratufatmasetyaningrum@gmail.com>'
    },
    url: 'https://github.com/ratufatma/scytale-passbook/releases/download/v0.1.0/Scytale.Passbook_0.1.0_x64-setup.exe',
    isConfigured: true,
    notes: 'Windows 64-bit NSIS standalone setup installer with desktop and start menu shortcuts.'
  },
  {
    id: 'passbook-v0.1.0-windows-msi',
    product: 'scytale-passbook',
    productName: 'Scytale Passbook (Windows MSI Package)',
    version: '0.1.0',
    platform: 'windows',
    architecture: 'x86_64',
    filename: 'Scytale Passbook_0.1.0_x64_en-US.msi',
    size: '2.74 MB',
    sha256: 'eda8ce20fdf252f4f2df9006a6020c05a3a0fa464dc5fc6a8353513f489e6582',
    signature: {
      status: 'verified',
      signer: 'Scytale Release Authority <ratufatmasetyaningrum@gmail.com>'
    },
    url: 'https://github.com/ratufatma/scytale-passbook/releases/download/v0.1.0/Scytale.Passbook_0.1.0_x64_en-US.msi',
    isConfigured: true,
    notes: 'Windows 64-bit WiX MSI enterprise installer supporting silent and per-user deployment.'
  },
  {
    id: 'passbook-v0.1.0-linux-deb',
    product: 'scytale-passbook',
    productName: 'Scytale Passbook (Linux DEB)',
    version: '0.1.0',
    platform: 'linux',
    architecture: 'x86_64',
    filename: 'scytale-passbook_0.1.0_amd64.deb',
    size: '2.8 MB',
    sha256: '757cc4931fde15a90369fb1eecdce19f89052c8772de61eb62fa9211480b4b24',
    signature: {
      status: 'verified',
      signer: 'Scytale Release Authority <ratufatmasetyaningrum@gmail.com>'
    },
    url: 'https://github.com/ratufatma/scytale-passbook/releases/download/v0.1.0/scytale-passbook_0.1.0_amd64.deb',
    isConfigured: true,
    notes: 'Debian/Ubuntu installation package for Scytale Passbook wallet.'
  },
  {
    id: 'passbook-v0.1.0-linux-appimage',
    product: 'scytale-passbook',
    productName: 'Scytale Passbook (Linux AppImage)',
    version: '0.1.0',
    platform: 'linux',
    architecture: 'x86_64',
    filename: 'scytale-passbook_0.1.0_amd64.AppImage',
    size: '70 MB',
    sha256: 'c9baa1e42a16eafdfbd841a4b89bd508040faf0e7f93a40354e39a367540360c',
    signature: {
      status: 'verified',
      signer: 'Scytale Release Authority <ratufatmasetyaningrum@gmail.com>'
    },
    url: 'https://github.com/ratufatma/scytale-passbook/releases/download/v0.1.0/scytale-passbook_0.1.0_amd64.AppImage',
    isConfigured: true,
    notes: 'Standalone portable Linux executable for Scytale Passbook. Run with chmod +x.'
  },
  {
    id: 'passbook-v0.1.0-android-apk',
    product: 'scytale-passbook',
    productName: 'Scytale Passbook (Android APK)',
    version: '0.1.0',
    platform: 'android',
    architecture: 'all',
    filename: 'scytale-passbook_0.1.0.apk',
    size: '98 MB',
    sha256: '57aa96ad55da42911bab3848d059669804bcb59d88c695d3530523647288f44e',
    signature: {
      status: 'verified',
      signer: 'Scytale Release Authority <ratufatmasetyaningrum@gmail.com>'
    },
    url: 'https://github.com/ratufatma/scytale-passbook/releases/download/v0.1.0/scytale-passbook_0.1.0.apk',
    isConfigured: true,
    notes: 'Android APK package for Scytale Passbook mobile companion.'
  },

  // --- Scytale Studio IDE (v0.1.0) ---
  {
    id: 'studio-v0.1.0-windows-exe',
    product: 'scytale-studio',
    productName: 'Scytale Studio IDE (Windows Setup .exe)',
    version: '0.1.0',
    platform: 'windows',
    architecture: 'x86_64',
    filename: 'Scytale Studio_0.1.0_x64-setup.exe',
    size: '3.43 MB',
    sha256: '990a7e810e3e348e1d850a6bd5f2406e7d82620e421468ca05d1f52cfebe3ac8',
    signature: {
      status: 'verified',
      signer: 'Scytale Release Authority <ratufatmasetyaningrum@gmail.com>'
    },
    url: 'https://github.com/ratufatma/scytale/releases/download/v0.1.0/Scytale.Studio_0.1.0_x64-setup.exe',
    isConfigured: true,
    notes: 'Windows 64-bit NSIS setup installer for Scytale Studio IDE with integrated PowerShell PTY terminal.'
  },
  {
    id: 'studio-v0.1.0-windows-msi',
    product: 'scytale-studio',
    productName: 'Scytale Studio IDE (Windows MSI Package)',
    version: '0.1.0',
    platform: 'windows',
    architecture: 'x86_64',
    filename: 'Scytale Studio_0.1.0_x64_en-US.msi',
    size: '4.86 MB',
    sha256: '11ad1c3f4526ace2a7c1113180dd37752f4148c699c9112de786a3c7c06d65c3',
    signature: {
      status: 'verified',
      signer: 'Scytale Release Authority <ratufatmasetyaningrum@gmail.com>'
    },
    url: 'https://github.com/ratufatma/scytale/releases/download/v0.1.0/Scytale.Studio_0.1.0_x64_en-US.msi',
    isConfigured: true,
    notes: 'Windows 64-bit WiX MSI enterprise installer for Scytale Studio IDE.'
  },
  {
    id: 'studio-v0.1.0-linux-deb',
    product: 'scytale-studio',
    productName: 'Scytale Studio IDE (Linux DEB)',
    version: '0.1.0',
    platform: 'linux',
    architecture: 'x86_64',
    filename: 'scytale-studio_0.1.0_amd64.deb',
    size: '5.4 MB',
    sha256: '7c58440d55d287c138bf15ef38cc17c24087b227e9366611f4a25f82bb734e46',
    signature: {
      status: 'verified',
      signer: 'Scytale Release Authority <ratufatmasetyaningrum@gmail.com>'
    },
    url: 'https://github.com/ratufatma/scytale/releases/download/v0.1.0/scytale-studio_0.1.0_amd64.deb',
    isConfigured: true,
    notes: 'Debian/Ubuntu installation package for Scytale Studio IDE.'
  },
  {
    id: 'studio-v0.1.0-linux-appimage',
    product: 'scytale-studio',
    productName: 'Scytale Studio IDE (Linux AppImage)',
    version: '0.1.0',
    platform: 'linux',
    architecture: 'x86_64',
    filename: 'scytale-studio_0.1.0_amd64.AppImage',
    size: '73 MB',
    sha256: '0b799676f647d1f4ad8d117757ad00787c157fcf0268d7c2acbe6cf3f6a80467',
    signature: {
      status: 'verified',
      signer: 'Scytale Release Authority <ratufatmasetyaningrum@gmail.com>'
    },
    url: 'https://github.com/ratufatma/scytale/releases/download/v0.1.0/scytale-studio_0.1.0_amd64.AppImage',
    isConfigured: true,
    notes: 'Standalone portable Linux executable for Scytale Studio IDE. Run with chmod +x.'
  },
  // Scytale Release Bundle v0.4.0-testnet (Node with Stratum Pool & CLI)
  {
    id: 'bundle-v0.4.0-linux-x86_64',
    product: 'scytale-node',
    productName: 'Scytale Release Bundle v0.4.0 (Stratum Pool + CLI)',
    version: '0.4.0',
    platform: 'linux',
    architecture: 'x86_64',
    filename: 'scytale-v0.4.0-testnet-linux-x86_64.tar.gz',
    size: '10.9 MB',
    sha256: '5ce6474665e6d0ab4081a9de02f42d5702dfad6d97f7839c571c8a0e0fba9fe5',
    signature: {
      status: 'verified',
      signer: 'Scytale Release Authority <ratufatmasetyaningrum@gmail.com>',
      fingerprint: '4A8B 9C1D 2E3F 0A7B 8C9D 1E2F 3A4B 5C6D 7E8F 9A0B',
      signatureUrl: 'https://github.com/ratufatma/scytale/releases/download/v0.4.0-testnet/scytale-v0.4.0-testnet-linux-x86_64.tar.gz.sha256'
    },
    url: 'https://github.com/ratufatma/scytale/releases/download/v0.4.0-testnet/scytale-v0.4.0-testnet-linux-x86_64.tar.gz',
    isConfigured: true,
    notes: 'Official distribution tarball containing scytale-node (with embedded Stratum SSP-1 mining pool server on port 3333) and scytale-cli compiled for Linux x86_64. Stratum pool: stratum+tcp://seed.myratu.com:3333'
  },
  {
    id: 'cli-v0.4.0-linux-x86_64',
    product: 'scytale-cli',
    productName: 'Scytale CLI (Included in Release Tarball v0.4.0)',
    version: '0.4.0',
    platform: 'linux',
    architecture: 'x86_64',
    filename: 'scytale-v0.4.0-testnet-linux-x86_64.tar.gz',
    size: '10.9 MB',
    sha256: '5ce6474665e6d0ab4081a9de02f42d5702dfad6d97f7839c571c8a0e0fba9fe5',
    signature: {
      status: 'verified',
      signer: 'Scytale Release Authority <ratufatmasetyaningrum@gmail.com>',
      fingerprint: '4A8B 9C1D 2E3F 0A7B 8C9D 1E2F 3A4B 5C6D 7E8F 9A0B',
      signatureUrl: 'https://github.com/ratufatma/scytale/releases/download/v0.4.0-testnet/scytale-v0.4.0-testnet-linux-x86_64.tar.gz.sha256'
    },
    url: 'https://github.com/ratufatma/scytale/releases/download/v0.4.0-testnet/scytale-v0.4.0-testnet-linux-x86_64.tar.gz',
    isConfigured: true,
    notes: 'Interactive wallet management, BIP-39 mnemonic creation, and miner operator CLI tool.'
  },
  {
    id: 'sha256-v0.4.0-linux-x86_64',
    product: 'scytale-node',
    productName: 'SHA256 Checksum Verification File v0.4.0',
    version: '0.4.0',
    platform: 'linux',
    architecture: 'all',
    filename: 'scytale-v0.4.0-testnet-linux-x86_64.tar.gz.sha256',
    size: '109 B',
    sha256: '5ce6474665e6d0ab4081a9de02f42d5702dfad6d97f7839c571c8a0e0fba9fe5',
    signature: {
      status: 'verified',
      signer: 'Scytale Release Authority'
    },
    url: 'https://github.com/ratufatma/scytale/releases/download/v0.4.0-testnet/scytale-v0.4.0-testnet-linux-x86_64.tar.gz.sha256',
    isConfigured: true,
    notes: 'Direct sha256 checksum digest for cryptographic package verification.'
  },
  {
    id: 'source-v0.4.0',
    product: 'source',
    productName: 'Scytale Source Code Archive v0.4.0',
    version: '0.4.0',
    platform: 'source',
    architecture: 'all',
    filename: 'v0.4.0-testnet.tar.gz',
    size: 'Git Archive',
    sha256: 'Commit tagged v0.4.0-testnet on GitHub',
    signature: {
      status: 'verified',
      signer: 'Scytale Git Authority'
    },
    url: 'https://github.com/ratufatma/scytale/archive/refs/tags/v0.4.0-testnet.tar.gz',
    isConfigured: true,
    notes: 'Official tagged source code archive from the primary git repository.'
  },

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
