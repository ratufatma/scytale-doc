import { SearchItem } from '../types';
import { DOC_SECTIONS } from './docs';
import { SOFTWARE_CATALOG } from './software';
import { RELEASES } from './releases';
import { NETWORK_PARAMETERS } from './network';

export function getSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  // Index Doc Pages
  for (const section of DOC_SECTIONS) {
    for (const page of section.pages) {
      const keywords = [
        page.title.toLowerCase(),
        section.title.toLowerCase(),
        ...page.content
          .filter(c => c.text || c.items)
          .flatMap(c => (c.text ? c.text.split(' ') : c.items || []))
          .map(w => w.toLowerCase().replace(/[^a-z0-9]/g, ''))
          .filter(w => w.length > 3)
      ];

      items.push({
        id: `doc-${page.id}`,
        title: page.title,
        section: section.title,
        description: page.summary,
        path: `/docs/${section.slug}/${page.slug}`,
        category: section.id === 'protocol-spec' ? 'Protocol' : 'Documentation',
        keywords: Array.from(new Set(keywords)).slice(0, 30)
      });
    }
  }

  // Index Software Catalog
  for (const sw of SOFTWARE_CATALOG) {
    items.push({
      id: `sw-${sw.id}`,
      title: sw.name,
      section: 'Software Ecosystem',
      description: sw.tagline,
      path: `/software/${sw.slug}`,
      category: 'Software',
      keywords: [sw.name.toLowerCase(), sw.slug, sw.category.toLowerCase(), ...sw.features.map(f => f.toLowerCase())]
    });
  }

  // Index Releases
  for (const rel of RELEASES) {
    items.push({
      id: `rel-${rel.id}`,
      title: `Scytale v${rel.version}`,
      section: 'Releases',
      description: rel.summary,
      path: `/releases/${rel.version}`,
      category: 'Release',
      keywords: ['release', rel.version, rel.status, ...rel.highlights.map(h => h.toLowerCase())]
    });
  }

  // Index CLI commands
  items.push(
    {
      id: 'cli-node-start',
      title: 'scytale-node start',
      section: 'CLI & Node',
      description: 'Start the Scytale consensus daemon, connect to peer-to-peer network, and sync blocks.',
      path: '/docs/getting-started/running-a-node',
      category: 'CLI',
      keywords: ['node', 'start', 'daemon', 'run', 'p2p']
    },
    {
      id: 'cli-wallet-init',
      title: 'scytale-wallet init',
      section: 'CLI & Wallet',
      description: 'Initialize a new encrypted passbook with a 24-word recovery phrase.',
      path: '/docs/getting-started/creating-a-wallet',
      category: 'CLI',
      keywords: ['wallet', 'init', 'passbook', 'seed', 'mnemonic']
    },
    {
      id: 'cli-mining',
      title: 'scytale-node --mine',
      section: 'Node & Consensus',
      description: 'Enable CPU mining with Blake3 proof-of-work algorithm to earn block rewards.',
      path: '/docs/node/mining',
      category: 'CLI',
      keywords: ['mining', 'mine', 'blake3', 'cpu', 'reward', 'coinbase']
    }
  );

  // Index Network Parameters
  for (const param of NETWORK_PARAMETERS) {
    items.push({
      id: `param-${param.name.toLowerCase().replace(/\s+/g, '-')}`,
      title: param.name,
      section: `Network Parameter (${param.category})`,
      description: `${param.value} ${param.unit || ''} — ${param.description}`,
      path: '/network',
      category: 'Protocol',
      keywords: ['parameter', param.name.toLowerCase(), param.category.toLowerCase(), 'spec']
    });
  }

  return items;
}
