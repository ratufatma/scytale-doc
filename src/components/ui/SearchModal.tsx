import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Cpu, Terminal, Package, Tag, ArrowRight } from 'lucide-react';
import { getSearchIndex } from '../../data/searchIndex';
import { SearchItem } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const allItems = useRef<SearchItem[]>(getSearchIndex());

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setResults(allItems.current.slice(0, 6));
      return;
    }

    const filtered = allItems.current.filter(item => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchSection = item.section.toLowerCase().includes(q);
      const matchKeywords = item.keywords.some(k => k.includes(q));
      return matchTitle || matchDesc || matchSection || matchKeywords;
    });

    setResults(filtered.slice(0, 10));
  }, [query]);

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-zinc-900/60 dark:bg-black/80 backdrop-blur-xs">
      <div
        className="w-full max-w-2xl rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 gap-3">
          <Search className="w-5 h-5 text-zinc-400 dark:text-zinc-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search documentation, protocol, CLI commands, releases..."
            className="w-full bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-hidden font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">
            ESC
          </span>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-zinc-100 dark:divide-zinc-800/60">
          {results.length > 0 ? (
            results.map(item => (
              <div
                key={item.id}
                onClick={() => {
                  onNavigate(item.path);
                  onClose();
                }}
                className="group flex items-start justify-between gap-3 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/60 cursor-pointer transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800 group-hover:bg-white dark:group-hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 transition-colors">
                    {getCategoryIcon(item.category)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white">
                        {item.title}
                      </h4>
                      <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 px-1.5 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800">
                        {item.section}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-1 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-zinc-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-zinc-500 dark:text-zinc-400 text-sm">
              No results found for &quot;{query}&quot;. Try searching for &quot;UTXO&quot;, &quot;redb&quot;, &quot;Blake3&quot;, or &quot;mining&quot;.
            </div>
          )}
        </div>

        {/* Search Footer */}
        <div className="px-4 py-2 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
          <span>Search Scytale Documentation &amp; Protocols</span>
          <div className="flex items-center gap-2">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded">ESC</kbd>
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};
