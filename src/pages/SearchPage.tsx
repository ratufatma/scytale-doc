import React, { useState, useEffect } from 'react';
import { getSearchIndex } from '../data/searchIndex';
import { SearchItem } from '../types';
import { Search, ArrowRight, BookOpen, Cpu, Terminal, Package, Tag, Filter } from 'lucide-react';

interface SearchPageProps {
  initialQuery?: string;
  onNavigate: (path: string) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ initialQuery = '', onNavigate }) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [results, setResults] = useState<SearchItem[]>([]);
  const allItems = getSearchIndex();

  useEffect(() => {
    const q = query.trim().toLowerCase();
    let filtered = allItems;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (q) {
      filtered = filtered.filter(item => {
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchSection = item.section.toLowerCase().includes(q);
        const matchKeywords = item.keywords.some(k => k.includes(q));
        return matchTitle || matchDesc || matchSection || matchKeywords;
      });
    }

    setResults(filtered);
  }, [query, selectedCategory]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Documentation':
        return <BookOpen className="w-4 h-4 text-zinc-500" />;
      case 'Protocol':
        return <Cpu className="w-4 h-4 text-emerald-600" />;
      case 'CLI':
        return <Terminal className="w-4 h-4 text-amber-600" />;
      case 'Software':
        return <Package className="w-4 h-4 text-blue-600" />;
      case 'Release':
        return <Tag className="w-4 h-4 text-purple-600" />;
      default:
        return <BookOpen className="w-4 h-4 text-zinc-500" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <header className="border-b border-zinc-200 pb-6 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-950 font-mono">
          Search Scytale Portal
        </h1>
        <p className="text-zinc-600 text-sm">
          Index of all technical documentation, protocol specifications, CLI commands, software packages, and release notes.
        </p>
      </header>

      {/* Search Input and Categories */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-zinc-400" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search keywords, commands, parameters (e.g. Blake3, UTXO, scytale-node, redb, mining)..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-zinc-300 bg-white text-zinc-950 placeholder:text-zinc-400 text-sm focus:outline-hidden focus:border-zinc-500 shadow-2xs font-medium"
            autoFocus
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
          <span className="text-zinc-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </span>
          {['all', 'Documentation', 'Protocol', 'CLI', 'Software', 'Release'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-md transition-colors ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-zinc-900 text-white font-semibold'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              {cat === 'all' ? 'All Categories' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
          <span>{results.length} results found</span>
          {query && <span>Filter: &quot;{query}&quot;</span>}
        </div>

        {results.length > 0 ? (
          <div className="space-y-3">
            {results.map(item => (
              <div
                key={item.id}
                onClick={() => onNavigate(item.path)}
                className="group p-4 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-xs transition-all cursor-pointer flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-zinc-50 border border-zinc-200 group-hover:bg-zinc-100 transition-colors">
                    {getCategoryIcon(item.category)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-zinc-950 group-hover:text-black">
                        {item.title}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200">
                        {item.section}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      {item.description}
                    </p>
                    <span className="text-[11px] font-mono text-zinc-400 group-hover:text-zinc-600">
                      {item.path}
                    </span>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 group-hover:translate-x-1 transition-all shrink-0 mt-2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-zinc-200 bg-white p-12 text-center text-zinc-500 space-y-2">
            <p className="text-sm font-semibold text-zinc-800">No matching search results</p>
            <p className="text-xs">Try searching for terms like &quot;UTXO&quot;, &quot;mining&quot;, &quot;redb&quot;, &quot;Blake3&quot;, or &quot;cli&quot;.</p>
          </div>
        )}
      </div>
    </div>
  );
};
