import React, { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { DOC_SECTIONS } from '../../data/docs';
import { RELEASES } from '../../data/releases';
import { SOFTWARE_CATALOG } from '../../data/software';

interface MetaManagerProps {
  currentPath: string;
}

interface PageMeta {
  title: string;
  description: string;
  ogType?: 'website' | 'article';
}

function resolvePageMeta(currentPath: string, isIndonesian: boolean): PageMeta {
  // Normalize path
  const path = currentPath.startsWith('/') ? currentPath : `/${currentPath}`;

  // 1. Homepage
  if (path === '/' || path === '') {
    return {
      title: isIndonesian
        ? 'Scytale — Jaringan Blockchain Ringan'
        : 'Scytale — Lightweight Blockchain Network',
      description: isIndonesian
        ? 'Portal resmi, dokumentasi teknis, pusat rilis, dan pusat unduhan untuk jaringan blockchain ringan Scytale.'
        : 'Official portal, technical documentation, release hub, and download center for the Scytale lightweight blockchain network.',
      ogType: 'website'
    };
  }

  // 2. Documentation
  if (path.startsWith('/docs')) {
    const parts = path.split('/').filter(Boolean);
    const sectionSlug = parts[1] || 'intro';
    const pageSlug = parts[2] || (sectionSlug === 'intro' ? 'what-is-scytale' : undefined);

    const section =
      DOC_SECTIONS.find(s => s.slug === sectionSlug || s.id === sectionSlug) || DOC_SECTIONS[0];
    const page =
      (pageSlug ? section?.pages.find(p => p.slug === pageSlug || p.id === pageSlug) : null) ||
      section?.pages[0];

    if (page) {
      return {
        title: isIndonesian
          ? `${page.title} — Dokumentasi | Scytale`
          : `${page.title} — Documentation | Scytale`,
        description:
          page.summary ||
          (isIndonesian
            ? `Dokumentasi teknis Scytale untuk ${page.title} di bagian ${page.sectionTitle}.`
            : `Technical documentation for ${page.title} under ${page.sectionTitle} in Scytale.`),
        ogType: 'article'
      };
    }

    return {
      title: isIndonesian ? 'Dokumentasi Teknis — Scytale' : 'Technical Documentation — Scytale',
      description: isIndonesian
        ? 'Spesifikasi arsitektur lengkap, panduan node, referensi protokol, dan panduan pengembang Scytale.'
        : 'Comprehensive architectural specs, node guides, protocol references, and developer documentation for Scytale.',
      ogType: 'website'
    };
  }

  // 3. Downloads
  if (path === '/downloads' || path.startsWith('/downloads/')) {
    return {
      title: isIndonesian
        ? 'Pusat Unduhan & Verifikasi Kriptografis — Scytale'
        : 'Downloads & Verification Center — Scytale',
      description: isIndonesian
        ? 'Unduh biner resmi terkompilasi untuk Linux, macOS, dan Windows. Verifikasi checksum SHA-256 dan tanda tangan PGP.'
        : 'Download official pre-compiled binaries for Linux, macOS, and Windows. Verify SHA-256 checksums and PGP signatures.',
      ogType: 'website'
    };
  }

  // 4. Releases
  if (path.startsWith('/releases/')) {
    const version = path.replace('/releases/', '').trim();
    const release = RELEASES.find(
      r => r.version === version || r.id === version || r.id === `v${version}`
    );

    if (release) {
      return {
        title: `Scytale v${release.version} Release Notes — Scytale`,
        description:
          release.summary ||
          `Release notes, checksums, and changelog for Scytale version v${release.version}.`,
        ogType: 'article'
      };
    }

    return {
      title: `Release v${version} — Scytale`,
      description: `Detailed release changelog and verification hashes for Scytale v${version}.`,
      ogType: 'article'
    };
  }

  if (path === '/releases') {
    return {
      title: isIndonesian
        ? 'Riwayat Rilis & Catatan Perubahan — Scytale'
        : 'Release History & Changelogs — Scytale',
      description: isIndonesian
        ? 'Arsip rilis bertag resmi, catatan perubahan protokol, dan riwayat pembaruan perangkat lunak Scytale.'
        : 'Official tagged releases, protocol changelogs, checksum digests, and upgrade notes for Scytale.',
      ogType: 'website'
    };
  }

  // 5. Software
  if (path.startsWith('/software/')) {
    const slug = path.replace('/software/', '').trim();
    const item = SOFTWARE_CATALOG.find(s => s.slug === slug || s.id === slug);

    if (item) {
      return {
        title: `${item.name} — Scytale Software`,
        description: item.tagline || item.description,
        ogType: 'article'
      };
    }

    return {
      title: 'Software Component — Scytale',
      description: 'Official modular software client for the Scytale blockchain ecosystem.',
      ogType: 'website'
    };
  }

  if (path === '/software') {
    return {
      title: isIndonesian
        ? 'Ekosistem Perangkat Lunak & Perkakas — Scytale'
        : 'Software Ecosystem & Tooling — Scytale',
      description: isIndonesian
        ? 'Rangkaian lengkap aplikasi klien Scytale: node daemon, dompet baris perintah (CLI), miner, dan SDK.'
        : 'Official suite of Scytale applications: reference node daemon, CLI wallet, Proof of Work miner, and developer SDKs.',
      ogType: 'website'
    };
  }

  // 6. Network
  if (path === '/network') {
    return {
      title: isIndonesian
        ? 'Arsitektur Jaringan & P2P Mesh — Scytale'
        : 'Network Architecture & P2P Mesh — Scytale',
      description: isIndonesian
        ? 'Spesifikasi protokol jaringan peer-to-peer Scytale, isolasi partisi, rotasi rekanan, dan proteksi anti-eclipse.'
        : 'Peer-to-peer mesh architecture, peer discovery, partition resistance, and wire protocol encryption for Scytale.',
      ogType: 'website'
    };
  }

  // 7. Protocol
  if (path === '/protocol') {
    return {
      title: isIndonesian
        ? 'Spesifikasi Protokol & Konsensus — Scytale'
        : 'Protocol Specifications & Consensus — Scytale',
      description: isIndonesian
        ? 'Aturan validasi konsensus Scytale: transaksi UTXO, hashing Blake3, penyesuaian kesulitan, dan parameter blok.'
        : 'Consensus validation rules, UTXO serialization format, Blake3 PoW targeting, and deterministic state transitions.',
      ogType: 'website'
    };
  }

  // 8. Developers
  if (path === '/developers') {
    return {
      title: isIndonesian
        ? 'Pusat Pengembang & Panduan Integrasi — Scytale'
        : 'Developer Center & Integration Hub — Scytale',
      description: isIndonesian
        ? 'Panduan mulai cepat pengembang, referensi API RPC, library klien Rust, dan panduan kontribusi untuk Scytale.'
        : 'Developer quickstart guides, JSON-RPC API references, Rust client crates, and node integration examples for Scytale.',
      ogType: 'website'
    };
  }

  // 9. Search
  if (path.startsWith('/search')) {
    return {
      title: isIndonesian ? 'Pencarian Indeks Portal — Scytale' : 'Portal Search Index — Scytale',
      description: isIndonesian
        ? 'Cari di seluruh dokumentasi teknis, rilis, komponen perangkat lunak, dan spesifikasi Scytale.'
        : 'Search across technical documentation, release history, software components, and protocol specifications.',
      ogType: 'website'
    };
  }

  // 404
  return {
    title: isIndonesian ? 'Halaman Tidak Ditemukan — Scytale' : 'Page Not Found — Scytale',
    description: isIndonesian
      ? 'Halaman yang diminta tidak ditemukan di dalam indeks portal Scytale.'
      : 'The requested resource was not found on the Scytale portal.',
    ogType: 'website'
  };
}

export const MetaManager: React.FC<MetaManagerProps> = ({ currentPath }) => {
  const { language } = useLanguage();

  useEffect(() => {
    const isIndonesian = language === 'id';
    const meta = resolvePageMeta(currentPath, isIndonesian);

    // 1. Document Title
    document.title = meta.title;

    // 2. HTML lang attribute
    document.documentElement.lang = isIndonesian ? 'id' : 'en';

    // 3. Helper to update or create meta tags
    const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let element = document.querySelector(`meta[${attr}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard meta tags
    setMeta('name', 'description', meta.description);

    // Open Graph meta tags
    setMeta('property', 'og:title', meta.title);
    setMeta('property', 'og:description', meta.description);
    setMeta('property', 'og:type', meta.ogType || 'website');

    // Canonical and og:url
    const fullUrl = window.location.origin + (currentPath.startsWith('/') ? `#${currentPath}` : `/#${currentPath}`);
    setMeta('property', 'og:url', fullUrl);

    // Twitter Card meta tags
    setMeta('name', 'twitter:title', meta.title);
    setMeta('name', 'twitter:description', meta.description);

    // Canonical link tag
    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullUrl);
  }, [currentPath, language]);

  return null;
};
