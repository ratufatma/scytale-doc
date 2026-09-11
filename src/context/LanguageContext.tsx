import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'en' | 'id';

export interface Translations {
  // Navigation & Common
  nav: {
    docs: string;
    downloads: string;
    releases: string;
    software: string;
    network: string;
    protocol: string;
    devs: string;
    github: string;
    searchPlaceholder: string;
    getStarted: string;
    downloadBtn: string;
    themeLight: string;
    themeDark: string;
    language: string;
  };
  common: {
    copy: string;
    copied: string;
    viewAll: string;
    back: string;
    next: string;
    previous: string;
    close: string;
    filter: string;
    all: string;
    status: string;
    version: string;
    published: string;
    category: string;
    platform: string;
    architecture: string;
    verified: string;
    checksum: string;
    signature: string;
    onThisPage: string;
    breadcrumbDocs: string;
    noResults: string;
    resetFilters: string;
    learnMore: string;
    readDocs: string;
    viewSource: string;
  };
  home: {
    badge: string;
    headline: string;
    subheadline: string;
    ctaQuickstart: string;
    ctaDownload: string;
    ctaProtocol: string;
    primitivesTitle: string;
    primitivesSubtitle: string;
    primitives: {
      utxoTitle: string;
      utxoDesc: string;
      blake3Title: string;
      blake3Desc: string;
      redbTitle: string;
      redbDesc: string;
      powTitle: string;
      powDesc: string;
      supplyTitle: string;
      supplyDesc: string;
      pureRustTitle: string;
      pureRustDesc: string;
    };
    latestReleaseTitle: string;
    latestReleaseSubtitle: string;
    quickstartTitle: string;
    quickstartSubtitle: string;
    softwareTitle: string;
    softwareSubtitle: string;
  };
  downloads: {
    badge: string;
    title: string;
    description: string;
    filterHeader: string;
    productLabel: string;
    osLabel: string;
    archLabel: string;
    showingCount: string;
    verifyTitle: string;
    verifySubtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
  };
  releases: {
    badge: string;
    title: string;
    description: string;
    highlights: string;
    securityNotes: string;
    breakingChanges: string;
    artifactsTitle: string;
    changelogTitle: string;
    features: string;
    improvements: string;
    fixes: string;
    knownIssues: string;
    prevRelease: string;
    nextRelease: string;
    backToHub: string;
  };
  software: {
    badge: string;
    title: string;
    description: string;
    overviewTitle: string;
    featuresTitle: string;
    requirementsTitle: string;
    quickstartTitle: string;
    artifactsTitle: string;
    backToCatalog: string;
  };
  network: {
    badge: string;
    title: string;
    description: string;
    cluster: string;
    noticeTitle: string;
    noticeText: string;
    rpcTitle: string;
    rpcBtn: string;
    rpcConnecting: string;
    rpcError: string;
    paramsTitle: string;
    paramsSubtitle: string;
    genesisTitle: string;
    genesisSubtitle: string;
  };
  protocol: {
    badge: string;
    title: string;
    description: string;
    tabs: {
      utxo: string;
      pow: string;
      hashing: string;
      storage: string;
      reorg: string;
      p2p: string;
    };
  };
  devs: {
    badge: string;
    title: string;
    description: string;
    crateStructure: string;
    compileTitle: string;
    compileDesc: string;
    simnetTitle: string;
    simnetDesc: string;
    contributingTitle: string;
    contributingDesc: string;
  };
  search: {
    title: string;
    subtitle: string;
    placeholder: string;
    resultsFound: string;
    filterBy: string;
    noResultsTitle: string;
    noResultsHint: string;
  };
  footer: {
    tagline: string;
    docsTitle: string;
    softwareTitle: string;
    protocolTitle: string;
    copyright: string;
  };
}

const DICTIONARY: Record<Language, Translations> = {
  en: {
    nav: {
      docs: 'Documentation',
      downloads: 'Downloads',
      releases: 'Releases',
      software: 'Software',
      network: 'Network',
      protocol: 'Protocol',
      devs: 'Developers',
      github: 'GitHub',
      searchPlaceholder: 'Search docs...',
      getStarted: 'Get Started',
      downloadBtn: 'Download',
      themeLight: 'Switch to light mode',
      themeDark: 'Switch to dark mode',
      language: 'Language',
    },
    common: {
      copy: 'Copy',
      copied: 'Copied',
      viewAll: 'View All',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      close: 'Close',
      filter: 'Filter',
      all: 'All',
      status: 'Status',
      version: 'Version',
      published: 'Published',
      category: 'Category',
      platform: 'Platform',
      architecture: 'Architecture',
      verified: 'Verified',
      checksum: 'Checksum (SHA-256)',
      signature: 'PGP Signature',
      onThisPage: 'On this page',
      breadcrumbDocs: 'Docs',
      noResults: 'No results found',
      resetFilters: 'Reset Filters',
      learnMore: 'Learn More',
      readDocs: 'Read Documentation',
      viewSource: 'View Source Code',
    },
    home: {
      badge: 'Transparent & Deterministic Distributed Ledger',
      headline: 'A Lightweight Blockchain Network Built on Verifiable Primitives',
      subheadline: 'Scytale eliminates unnecessary virtual machine overhead, balance races, and complex dependencies. Built from scratch in pure Rust with UTXO accounting, Blake3 hashing, and redb storage.',
      ctaQuickstart: 'Get Started with Node',
      ctaDownload: 'Download Binaries',
      ctaProtocol: 'Read Protocol Spec',
      primitivesTitle: 'Core Verifiable Primitives',
      primitivesSubtitle: 'Engineered for predictability, auditability, and radical simplicity.',
      primitives: {
        utxoTitle: 'UTXO Accounting Model',
        utxoDesc: 'Discrete unspent outputs ensure deterministic validation, parallel verification, and zero shared-state race hazards.',
        blake3Title: 'Blake3 Cryptographic Hashing',
        blake3Desc: 'Modern tree hashing providing verified 128-bit security, high SIMD parallelism, and uniform digest construction.',
        redbTitle: 'Embedded redb Storage Engine',
        redbDesc: '100% safe Rust ACID transactional key-value store. Zero native C/C++ runtime linkers, dynamic libraries, or memory leaks.',
        powTitle: 'Proof of Work Consensus',
        powDesc: 'Objective, unforgeable block ordering via Blake3 difficulty retargeting without trusted setups or stake pooling cartels.',
        supplyTitle: 'Strict Fixed Supply (66M SCY)',
        supplyDesc: 'Predictable programmatic issuance strictly capped at 66,000,000 SCY with automated halving intervals every 420,000 blocks.',
        pureRustTitle: 'Pure Rust Implementation',
        pureRustDesc: 'Strict memory safety, fearless concurrency, and reproducible binary compilation across modern operating systems.',
      },
      latestReleaseTitle: 'Latest Production Release',
      latestReleaseSubtitle: 'Cryptographically signed binaries and audit logs ready for deployment.',
      quickstartTitle: 'Quick Installation & Startup',
      quickstartSubtitle: 'Spin up a validating testnet node on your local machine in seconds.',
      softwareTitle: 'Official Software Suite',
      softwareSubtitle: 'Explore the full catalog of modular tools designed for Scytale.',
    },
    downloads: {
      badge: 'Official Distribution Center',
      title: 'Download Scytale',
      description: 'Official, cryptographically verified binary releases and source code archives for Scytale Node, CLI, and ecosystem tools. All binaries include publish-time SHA-256 checksums and PGP signatures.',
      filterHeader: 'FILTER BY PLATFORM & SOFTWARE',
      productLabel: 'Product',
      osLabel: 'Operating System',
      archLabel: 'CPU Architecture',
      showingCount: 'Showing release artifacts',
      verifyTitle: 'How to verify your downloads',
      verifySubtitle: 'Before executing binaries, verify that your download matches the published SHA-256 digest and PGP signature to ensure tamper-free authenticity.',
      step1Title: '1. Compute SHA-256 Checksum',
      step1Desc: 'Run the hashing utility in your terminal and verify character-for-character with the digest listed.',
      step2Title: '2. Verify Cryptographic PGP Signature',
      step2Desc: 'Download the detached .asc signature file and verify against the official Scytale Release Authority key.',
    },
    releases: {
      badge: 'Release Ledger & Version History',
      title: 'Scytale Releases',
      description: 'Comprehensive release history, protocol upgrades, changelogs, breaking changes, and cryptographic audit records for the Scytale blockchain network.',
      highlights: 'Release Highlights',
      securityNotes: 'Security Advisories & Cryptographic Notes',
      breakingChanges: 'Breaking Protocol or Schema Changes',
      artifactsTitle: 'Compiled Release Artifacts',
      changelogTitle: 'Detailed Changelog',
      features: 'New Features & Capabilities',
      improvements: 'Performance & Architectural Improvements',
      fixes: 'Bug Fixes & Stability',
      knownIssues: 'Known Issues & Errata',
      prevRelease: 'Previous Release',
      nextRelease: 'Next Release',
      backToHub: 'Back to Releases Hub',
    },
    software: {
      badge: 'Software Catalog',
      title: 'Scytale Software Suite',
      description: 'Official, open-source software tools maintained by the Scytale engineering group. Designed to be modular, auditable, and built with minimal runtime dependencies.',
      overviewTitle: 'Architectural Overview',
      featuresTitle: 'Key Engineering Features',
      requirementsTitle: 'System Requirements',
      quickstartTitle: 'Installation & Execution',
      artifactsTitle: 'Official Download Artifacts',
      backToCatalog: 'Back to Software Catalog',
    },
    network: {
      badge: 'Protocol Specifications & Parameters',
      title: 'Scytale Network',
      description: 'Operational specifications, consensus constants, monetary ceilings, and telemetry integration settings for the active Scytale testnet cluster.',
      cluster: 'Network Cluster',
      noticeTitle: 'Truthful Telemetry Notice:',
      noticeText: 'Scytale strictly refrains from rendering simulated or fake real-time counters. To query live block heights, difficulty, or active peer topologies, interact with your trusted local node using the CLI or configure a trusted RPC endpoint below.',
      rpcTitle: 'Configure Live RPC Endpoint',
      rpcBtn: 'Test Node RPC',
      rpcConnecting: 'Connecting...',
      rpcError: 'Unable to reach RPC. Ensure scytale-node is running locally with --rpc.enabled.',
      paramsTitle: 'Consensus & Monetary Parameters',
      paramsSubtitle: 'Immutable protocol constants enforced by consensus validation rules.',
      genesisTitle: 'Genesis Block Anchor',
      genesisSubtitle: 'The genesis block is hardcoded into all conforming implementations. Its hash forms the root anchor for the canonical testnet chain tree.',
    },
    protocol: {
      badge: 'Core Engineering Specification',
      title: 'Scytale Protocol Specification',
      description: 'Formal protocol mechanics, invariant rules, binary serialization layouts, and consensus state machines governing the Scytale distributed ledger.',
      tabs: {
        utxo: '1. UTXO & Transaction Model',
        pow: '2. PoW & Difficulty Target',
        hashing: '3. Blake3 Hashing',
        storage: '4. redb Persistence',
        reorg: '5. Chain Selection & Reorg',
        p2p: '6. P2P Wire Protocol',
      },
    },
    devs: {
      badge: 'Engineering Hub',
      title: 'Developer Guide & Tooling',
      description: 'Instructions for contributing to the Scytale protocol, compiling from source, executing the test suite, and orchestrating local multi-node simulation networks.',
      crateStructure: 'Workspace Crate Structure',
      compileTitle: 'Compiling from Source',
      compileDesc: 'Compile the entire project using standard Rust tooling (Rust 1.75+ required):',
      simnetTitle: 'Simnet: Local Multi-Node Cluster',
      simnetDesc: 'For integration testing and consensus fuzzing, Scytale includes an automated multi-node local harness that spins up multiple communicating daemons on loopback interfaces:',
      contributingTitle: 'Contribution Invariants',
      contributingDesc: 'Every contribution must uphold the project’s commitment to radical simplicity and safety:',
    },
    search: {
      title: 'Search Scytale Portal',
      subtitle: 'Index of all technical documentation, protocol specifications, CLI commands, software packages, and release notes.',
      placeholder: 'Search keywords, commands, parameters (e.g. Blake3, UTXO, scytale-node, redb, mining)...',
      resultsFound: 'results found',
      filterBy: 'Filter by category:',
      noResultsTitle: 'No matching search results',
      noResultsHint: 'Try searching for terms like "UTXO", "mining", "redb", "Blake3", or "cli".',
    },
    footer: {
      tagline: 'A lightweight blockchain network built around simple, verifiable primitives: UTXO model, Proof of Work, Blake3 cryptographic hashing, and pure Rust redb storage.',
      docsTitle: 'Documentation',
      softwareTitle: 'Software & Hub',
      protocolTitle: 'Protocol & Legal',
      copyright: 'Scytale Network Contributors. Released under Apache-2.0 and MIT.',
    },
  },
  id: {
    nav: {
      docs: 'Dokumentasi',
      downloads: 'Unduhan',
      releases: 'Rilis',
      software: 'Perangkat Lunak',
      network: 'Jaringan',
      protocol: 'Protokol',
      devs: 'Pengembang',
      github: 'GitHub',
      searchPlaceholder: 'Cari dokumentasi...',
      getStarted: 'Mulai Cepat',
      downloadBtn: 'Unduh',
      themeLight: 'Ganti ke mode terang',
      themeDark: 'Ganti ke mode gelap',
      language: 'Bahasa',
    },
    common: {
      copy: 'Salin',
      copied: 'Tersalin',
      viewAll: 'Lihat Semua',
      back: 'Kembali',
      next: 'Berikutnya',
      previous: 'Sebelumnya',
      close: 'Tutup',
      filter: 'Filter',
      all: 'Semua',
      status: 'Status',
      version: 'Versi',
      published: 'Dirilis',
      category: 'Kategori',
      platform: 'Platform',
      architecture: 'Arsitektur',
      verified: 'Terverifikasi',
      checksum: 'Checksum (SHA-256)',
      signature: 'Tanda Tangan PGP',
      onThisPage: 'Di halaman ini',
      breadcrumbDocs: 'Dokumentasi',
      noResults: 'Hasil tidak ditemukan',
      resetFilters: 'Reset Filter',
      learnMore: 'Pelajari Selengkapnya',
      readDocs: 'Baca Dokumentasi',
      viewSource: 'Lihat Kode Sumber',
    },
    home: {
      badge: 'Buku Besar Terdistribusi Transparan & Deterministik',
      headline: 'Jaringan Blockchain Ringan Dibangun di Atas Primitives Terverifikasi',
      subheadline: 'Scytale meniadakan overhead mesin virtual yang tidak perlu, race condition saldo akun, dan dependensi rumit. Dibangun murni dari awal dalam bahasa Rust dengan model akuntansi UTXO, hashing Blake3, dan penyimpanan redb.',
      ctaQuickstart: 'Mulai dengan Node',
      ctaDownload: 'Unduh Biner',
      ctaProtocol: 'Baca Spesifikasi Protokol',
      primitivesTitle: 'Primitives Inti Terverifikasi',
      primitivesSubtitle: 'Dirancang untuk prediktabilitas, auditabilitas, dan kesederhanaan radikal.',
      primitives: {
        utxoTitle: 'Model Akuntansi UTXO',
        utxoDesc: 'Output unspent diskrit memastikan validasi deterministik, verifikasi paralel, dan bebas dari bahaya race condition status bersama.',
        blake3Title: 'Hashing Kriptografis Blake3',
        blake3Desc: 'Tree hashing modern dengan keamanan 128-bit terverifikasi, paralelisasi SIMD tinggi, dan konstruksi digest yang seragam.',
        redbTitle: 'Mesin Penyimpanan redb Embedded',
        redbDesc: 'Penyimpanan kunci-nilai transaksional ACID 100% Rust aman. Tanpa tautan runtime C/C++, pustaka dinamis, atau kebocoran memori.',
        powTitle: 'Konsensus Proof of Work',
        powDesc: 'Pengurutan blok objektif dan tak dapat dipalsukan melalui penyesuaian kesulitan Blake3 tanpa setup tepercaya atau kartel staking.',
        supplyTitle: 'Batas Pasokan Ketat (66 Juta SCY)',
        supplyDesc: 'Penerbitan programatik terprediksi dengan batas keras 66.000.000 SCY dan interval halving otomatis setiap 420.000 blok.',
        pureRustTitle: 'Implementasi Murni Rust',
        pureRustDesc: 'Keamanan memori ketat, konkurensi tanpa rasa takut, dan kompilasi biner yang dapat direproduksi di berbagai sistem operasi modern.',
      },
      latestReleaseTitle: 'Rilis Produksi Terbaru',
      latestReleaseSubtitle: 'Biner bertanda tangan kriptografis dan log audit siap digunakan.',
      quickstartTitle: 'Instalasi & Menjalankan Cepat',
      quickstartSubtitle: 'Jalankan node validator testnet di mesin lokal Anda dalam hitungan detik.',
      softwareTitle: 'Rangkaian Perangkat Lunak Resmi',
      softwareSubtitle: 'Jelajahi katalog lengkap perkakas modular yang dirancang untuk Scytale.',
    },
    downloads: {
      badge: 'Pusat Distribusi Resmi',
      title: 'Unduh Scytale',
      description: 'Rilis biner dan arsip kode sumber resmi yang diverifikasi secara kriptografis untuk Scytale Node, CLI, dan perkakas ekosistem. Semua biner dilengkapi checksum SHA-256 dan tanda tangan PGP.',
      filterHeader: 'FILTER BERDASARKAN PLATFORM & PERANGKAT LUNAK',
      productLabel: 'Produk',
      osLabel: 'Sistem Operasi',
      archLabel: 'Arsitektur CPU',
      showingCount: 'Menampilkan artefak rilis',
      verifyTitle: 'Cara memverifikasi unduhan Anda',
      verifySubtitle: 'Sebelum menjalankan biner yang diunduh, pastikan biner Anda cocok dengan digest SHA-256 dan tanda tangan PGP resmi untuk menjamin integritas berkas.',
      step1Title: '1. Hitung Checksum SHA-256',
      step1Desc: 'Jalankan perintah hashing di terminal Anda dan cocokkan karakter demi karakter dengan digest resmi yang tertera.',
      step2Title: '2. Verifikasi Tanda Tangan PGP Kriptografis',
      step2Desc: 'Unduh berkas tanda tangan .asc terpisah dan verifikasi terhadap kunci Otoritas Rilis Scytale resmi.',
    },
    releases: {
      badge: 'Buku Catatan Rilis & Riwayat Versi',
      title: 'Rilis Scytale',
      description: 'Riwayat rilis lengkap, pembaruan protokol, changelog, perubahan mendasar (breaking changes), dan catatan audit kriptografis untuk jaringan blockchain Scytale.',
      highlights: 'Sorotan Utama Rilis',
      securityNotes: 'Pemberitahuan Keamanan & Catatan Kriptografis',
      breakingChanges: 'Perubahan Protokol atau Skema yang Berdampak (Breaking)',
      artifactsTitle: 'Artefak Rilis Terkompilasi',
      changelogTitle: 'Changelog Rinci',
      features: 'Fitur & Kemampuan Baru',
      improvements: 'Peningkatan Kinerja & Arsitektur',
      fixes: 'Perbaikan Bug & Stabilitas',
      knownIssues: 'Masalah yang Diketahui & Catatan Penting',
      prevRelease: 'Rilis Sebelumnya',
      nextRelease: 'Rilis Berikutnya',
      backToHub: 'Kembali ke Pusat Rilis',
    },
    software: {
      badge: 'Katalog Perangkat Lunak',
      title: 'Paket Perangkat Lunak Scytale',
      description: 'Perangkat lunak open-source resmi yang dikelola oleh tim rekayasa Scytale. Dirancang modular, mudah diaudit, dan dibangun dengan dependensi runtime minimal.',
      overviewTitle: 'Tinjauan Arsitektur',
      featuresTitle: 'Fitur Rekayasa Unggulan',
      requirementsTitle: 'Kebutuhan Sistem',
      quickstartTitle: 'Instalasi & Menjalankan',
      artifactsTitle: 'Artefak Unduhan Resmi',
      backToCatalog: 'Kembali ke Katalog Perangkat Lunak',
    },
    network: {
      badge: 'Spesifikasi & Parameter Protokol',
      title: 'Jaringan Scytale',
      description: 'Spesifikasi operasional, konstanta konsensus, batas moneter, dan pengaturan integrasi telemetri untuk kluster testnet aktif Scytale.',
      cluster: 'Kluster Jaringan',
      noticeTitle: 'Pemberitahuan Telemetri Jujur:',
      noticeText: 'Scytale secara ketat menolak menampilkan metrik waktu-nyata palsu atau simulasi. Untuk mengetahui tinggi blok terkini, tingkat kesulitan, atau topologi peer aktif, hubungkan dengan node lokal Anda via CLI atau atur endpoint RPC tepercaya di bawah ini.',
      rpcTitle: 'Konfigurasi Endpoint RPC Langsung',
      rpcBtn: 'Uji RPC Node',
      rpcConnecting: 'Menghubungkan...',
      rpcError: 'Gagal menghubungi RPC. Pastikan scytale-node berjalan lokal dengan opsi --rpc.enabled.',
      paramsTitle: 'Parameter Konsensus & Moneter',
      paramsSubtitle: 'Konstanta protokol mutlak yang ditegakkan oleh aturan validasi konsensus.',
      genesisTitle: 'Jangkar Blok Genesis',
      genesisSubtitle: 'Blok genesis di-hardcode ke dalam seluruh implementasi yang sesuai. Hash-nya menjadi akar jangkar untuk pohon rantai testnet kanonikal.',
    },
    protocol: {
      badge: 'Spesifikasi Rekayasa Inti',
      title: 'Spesifikasi Protokol Scytale',
      description: 'Mekanika protokol formal, aturan invarian, format serialisasi biner, dan state machine konsensus yang mengatur buku besar terdistribusi Scytale.',
      tabs: {
        utxo: '1. Model UTXO & Transaksi',
        pow: '2. PoW & Target Kesulitan',
        hashing: '3. Hashing Blake3',
        storage: '4. Persistensi redb',
        reorg: '5. Seleksi Rantai & Reorg',
        p2p: '6. Protokol Kawat P2P',
      },
    },
    devs: {
      badge: 'Pusat Rekayasa',
      title: 'Panduan Pengembang & Perkakas',
      description: 'Instruksi untuk berkontribusi pada protokol Scytale, kompilasi dari sumber, menjalankan test suite, dan mengorkestrasi jaringan simulasi multi-node lokal.',
      crateStructure: 'Struktur Crate Workspace',
      compileTitle: 'Kompilasi dari Kode Sumber',
      compileDesc: 'Kompilasi seluruh proyek menggunakan perkakas standar Rust (diperlukan Rust 1.75+):',
      simnetTitle: 'Simnet: Kluster Multi-Node Lokal',
      simnetDesc: 'Untuk pengujian integrasi dan fuzzing konsensus, Scytale menyertakan harness lokal otomatis yang menjalankan beberapa daemon berkomunikasi pada antarmuka loopback:',
      contributingTitle: 'Invarian Kontribusi',
      contributingDesc: 'Setiap kontribusi wajib menjunjung tinggi komitmen proyek terhadap kesederhanaan radikal dan keselamatan:',
    },
    search: {
      title: 'Cari di Portal Scytale',
      subtitle: 'Indeks seluruh dokumentasi teknis, spesifikasi protokol, perintah CLI, paket perangkat lunak, dan catatan rilis.',
      placeholder: 'Cari kata kunci, perintah, parameter (contoh: Blake3, UTXO, scytale-node, redb, mining)...',
      resultsFound: 'hasil ditemukan',
      filterBy: 'Filter berdasarkan kategori:',
      noResultsTitle: 'Tidak ada hasil pencarian yang cocok',
      noResultsHint: 'Coba gunakan istilah seperti "UTXO", "mining", "redb", "Blake3", atau "cli".',
    },
    footer: {
      tagline: 'Jaringan blockchain ringan yang dibangun di atas primitives sederhana dan terverifikasi: model UTXO, Proof of Work, hashing kriptografis Blake3, dan penyimpanan redb murni Rust.',
      docsTitle: 'Dokumentasi',
      softwareTitle: 'Perangkat Lunak & Hub',
      protocolTitle: 'Protokol & Hukum',
      copyright: 'Kontributor Jaringan Scytale. Dirilis di bawah lisensi Apache-2.0 dan MIT.',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en';
    const stored = localStorage.getItem('scytale-lang');
    if (stored === 'en' || stored === 'id') {
      return stored;
    }
    // Auto-detect browser locale if Indonesian
    if (navigator.language && navigator.language.startsWith('id')) {
      return 'id';
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('scytale-lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState(prev => (prev === 'en' ? 'id' : 'en'));
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t: DICTIONARY[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
