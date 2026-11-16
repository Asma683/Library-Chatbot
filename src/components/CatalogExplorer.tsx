import React, { useState, useMemo } from 'react';
import {
  Bookmark,
  FileText,
  MapPin,
  MessageSquarePlus,
  Search,
  ShieldCheck,
} from 'lucide-react';
import type { CatalogCollection, CatalogSource } from '../types/academic';

interface CatalogExplorerProps {
  sources: CatalogSource[];
  activeCollection: CatalogCollection;
  onChangeCollection: (col: CatalogCollection) => void;
  pinnedIds: Set<string>;
  onTogglePin: (source: CatalogSource) => void;
  onLocateInStacks: (source: CatalogSource) => void;
  onInspectAbstract: (source: CatalogSource) => void;
  onInquireAboutSource: (source: CatalogSource) => void;
}

const COLLECTIONS: CatalogCollection[] = [
  'All Collections',
  'JSTOR',
  'IEEE Xplore',
  'PubMed Central',
  'University Archive',
];

export const CatalogExplorer: React.FC<CatalogExplorerProps> = ({
  sources,
  activeCollection,
  onChangeCollection,
  pinnedIds,
  onTogglePin,
  onLocateInStacks,
  onInspectAbstract,
  onInquireAboutSource,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'year' | 'citations'>('year');

  const filteredSources = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return sources
      .filter((item) => {
        if (activeCollection !== 'All Collections' && item.collection !== activeCollection) {
          return false;
        }
        if (!q) return true;
        return (
          item.title.toLowerCase().includes(q) ||
          item.authors.some((a) => a.toLowerCase().includes(q)) ||
          item.discipline.toLowerCase().includes(q) ||
          item.callNumber.toLowerCase().includes(q) ||
          item.doi.toLowerCase().includes(q) ||
          item.journal.toLowerCase().includes(q)
        );
      })
      .sort((a, b) =>
        sortBy === 'year' ? b.year - a.year : b.citationCount - a.citationCount
      );
  }, [sources, activeCollection, searchQuery, sortBy]);

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
      <div className="max-w-[1060px] mx-auto space-y-6">
        {/* Header & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-[24px] font-semibold text-[#0B1C30] tracking-[-0.015em]">
              University Library Catalog &amp; Archives
            </h2>
            <p className="text-[14px] text-[#64748B] mt-1">
              Search indexed peer-reviewed monographs, journal serials, and physical stack holdings.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="catalog-sort" className="text-[12px] font-medium text-[#64748B]">
              Sort:
            </label>
            <select
              id="catalog-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'year' | 'citations')}
              className="px-3 py-1.5 rounded-[8px] border border-[#E2E8F0] bg-white text-[12px] font-medium text-[#102342] focus-dual-ring cursor-pointer"
            >
              <option value="year">Publication Year</option>
              <option value="citations">Citation Count</option>
            </select>
          </div>
        </div>

        {/* Search Input & Collection Filter Tabs */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by title, author, DOI, discipline, or Library of Congress Call Number..."
              className="w-full pl-10 pr-4 py-2.5 rounded-[10px] bg-white border border-[#E2E8F0] text-[14px] text-[#0B1C30] placeholder:text-[#64748B] focus-dual-ring shadow-resting"
            />
          </div>

          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="inline-flex flex-wrap items-center gap-1 p-1 rounded-[10px] bg-[#F1F5F9] border border-[#E2E8F0]">
              {COLLECTIONS.map((col) => (
                <button
                  key={col}
                  type="button"
                  onClick={() => onChangeCollection(col)}
                  className={`px-3 py-1.5 rounded-[7px] text-[12px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    activeCollection === col
                      ? 'bg-white text-[#102342] shadow-resting'
                      : 'text-[#64748B] hover:text-[#102342]'
                  }`}
                >
                  {col}
                </button>
              ))}
            </div>

            <span className="text-[12px] font-mono text-[#64748B] tabular-nums">
              {filteredSources.length} {filteredSources.length === 1 ? 'record' : 'records'}
            </span>
          </div>
        </div>

        {/* Results List */}
        {filteredSources.length === 0 ? (
          <div className="p-10 rounded-[16px] bg-white border border-[#E2E8F0] text-center">
            <p className="font-display text-[16px] font-semibold text-[#0B1C30] mb-1">
              No matching catalog holdings
            </p>
            <p className="text-[13px] text-[#64748B] mb-4">
              Try broadening your search terms or switching back to All Collections.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                onChangeCollection('All Collections');
              }}
              className="px-4 py-2 rounded-[8px] bg-[#102342] text-white text-[13px] font-medium hover:bg-[#1E3A5F] cursor-pointer"
            >
              Reset Catalog Filters
            </button>
          </div>
        ) : (
          <div className="rounded-[16px] bg-white border border-[#E2E8F0] shadow-resting divide-y divide-[#E2E8F0]">
            {filteredSources.map((source) => {
              const isPinned = pinnedIds.has(source.id);
              return (
                <article
                  key={source.id}
                  className="p-5 hover:bg-[#F8FAFC]/80 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-[12px] text-[#64748B] mb-1">
                      <span className="font-medium text-[#2563EB]">{source.collection}</span>
                      <span aria-hidden="true">·</span>
                      <span>{source.discipline}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{source.year}</span>
                      {source.peerReviewed && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="inline-flex items-center gap-1 text-[#0D9488] font-medium">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Peer-Reviewed</span>
                          </span>
                        </>
                      )}
                    </div>

                    <h3 className="font-display text-[16px] font-semibold text-[#0B1C30] leading-[23px] mb-1">
                      {source.title}
                    </h3>

                    <p className="text-[13px] text-[#44474E] mb-2">
                      {source.authors.join(', ')} —{' '}
                      <span className="text-[#64748B]">{source.journal}</span>
                    </p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] font-mono text-[#64748B]">
                      <span>Call: {source.callNumber}</span>
                      <span>DOI: {source.doi}</span>
                      <span className="tabular-nums">Cited by {source.citationCount}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => onLocateInStacks(source)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] border border-[#E2E8F0] bg-white hover:bg-[#F1F5F9] text-[#102342] text-[12px] font-medium transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>Stacks</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onInspectAbstract(source)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] border border-[#E2E8F0] bg-white hover:bg-[#F1F5F9] text-[#102342] text-[12px] font-medium transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#64748B]" />
                      <span>Abstract</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onTogglePin(source)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[12px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                        isPinned
                          ? 'bg-[#0D9488] text-white'
                          : 'border border-[#E2E8F0] bg-white hover:bg-[#F1F5F9] text-[#102342]'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>{isPinned ? 'Pinned' : 'Pin'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onInquireAboutSource(source)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[8px] bg-[#102342] hover:bg-[#1E3A5F] text-white text-[12px] font-medium transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <MessageSquarePlus className="w-3.5 h-3.5" />
                      <span>Ask Assistant</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
