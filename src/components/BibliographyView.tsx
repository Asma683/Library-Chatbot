import React, { useState } from 'react';
import {
  BookmarkMinus,
  Check,
  Copy,
  Download,
  Library,
  MapPin,
} from 'lucide-react';
import type { CatalogSource, CitationFormat } from '../types/academic';
import { formatCitation } from '../utils/citations';

interface BibliographyViewProps {
  pinnedSources: CatalogSource[];
  citationFormat: CitationFormat;
  onChangeCitationFormat: (fmt: CitationFormat) => void;
  onRemovePin: (source: CatalogSource) => void;
  onLocateInStacks: (source: CatalogSource) => void;
  onExportBibTeX: () => void;
  onBrowseCatalog: () => void;
}

const FORMATS: CitationFormat[] = ['APA 7th', 'MLA 9th', 'Chicago 17th', 'IEEE', 'BibTeX'];

export const BibliographyView: React.FC<BibliographyViewProps> = ({
  pinnedSources,
  citationFormat,
  onChangeCitationFormat,
  onRemovePin,
  onLocateInStacks,
  onExportBibTeX,
  onBrowseCatalog,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const handleCopySingle = async (source: CatalogSource) => {
    await navigator.clipboard.writeText(formatCitation(source, citationFormat));
    setCopiedId(source.id);
    setTimeout(() => setCopiedId(null), 1600);
  };

  const handleCopyAll = async () => {
    const allText = pinnedSources.map((s) => formatCitation(s, citationFormat)).join('\n\n');
    await navigator.clipboard.writeText(allText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1800);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
      <div className="max-w-[960px] mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-[24px] font-semibold text-[#0B1C30] tracking-[-0.015em]">
              Saved Bibliography Studio
            </h2>
            <p className="text-[14px] text-[#64748B] mt-1">
              Manage pinned citations across active research threads and export formatted
              bibliographies.
            </p>
          </div>

          {pinnedSources.length > 0 && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleCopyAll}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] border border-[#E2E8F0] bg-white hover:bg-[#F1F5F9] text-[#102342] text-[12px] font-medium transition-colors cursor-pointer whitespace-nowrap"
              >
                {copiedAll ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#0D9488]" />
                    <span>Copied All</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Copy All ({citationFormat})</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onExportBibTeX}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] bg-[#102342] hover:bg-[#1E3A5F] text-white text-[12px] font-medium transition-colors cursor-pointer whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .bib</span>
              </button>
            </div>
          )}
        </div>

        {/* Format Switcher Tabs */}
        <div className="inline-flex flex-wrap items-center gap-1 p-1 rounded-[10px] bg-[#F1F5F9] border border-[#E2E8F0]">
          {FORMATS.map((fmt) => (
            <button
              key={fmt}
              type="button"
              onClick={() => onChangeCitationFormat(fmt)}
              className={`px-3 py-1.5 rounded-[7px] text-[12px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                citationFormat === fmt
                  ? 'bg-white text-[#102342] shadow-resting'
                  : 'text-[#64748B] hover:text-[#102342]'
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>

        {pinnedSources.length === 0 ? (
          <div className="p-12 rounded-[16px] bg-white border border-[#E2E8F0] text-center shadow-resting">
            <h3 className="font-display text-[17px] font-semibold text-[#0B1C30] mb-1.5">
              Your bibliography is currently empty
            </h3>
            <p className="text-[13px] text-[#64748B] max-w-[420px] mx-auto mb-5">
              Pin sources directly from assistant citation cards or browse the University Library
              Catalog to assemble your reading list.
            </p>
            <button
              type="button"
              onClick={onBrowseCatalog}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[8px] bg-[#102342] hover:bg-[#1E3A5F] text-white text-[13px] font-medium transition-colors cursor-pointer"
            >
              <Library className="w-4 h-4" />
              <span>Browse Library Catalog</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {pinnedSources.map((source) => {
              const formatted = formatCitation(source, citationFormat);
              return (
                <article
                  key={source.id}
                  className="p-5 rounded-[14px] bg-white border border-[#E2E8F0] shadow-resting space-y-3"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="text-[12px] text-[#64748B] mb-1">
                        {source.collection} · {source.discipline} ·{' '}
                        <span className="font-mono text-[#102342]">{source.callNumber}</span>
                      </div>
                      <h3 className="font-display text-[15px] font-semibold text-[#0B1C30]">
                        {source.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => onLocateInStacks(source)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-[8px] border border-[#E2E8F0] hover:bg-[#F1F5F9] text-[12px] font-medium text-[#102342] cursor-pointer"
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                        <span>Stacks</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCopySingle(source)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-[8px] border border-[#E2E8F0] hover:bg-[#F1F5F9] text-[12px] font-medium text-[#102342] cursor-pointer"
                      >
                        {copiedId === source.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#0D9488]" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[#2563EB]" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => onRemovePin(source)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-[8px] border border-[#E2E8F0] hover:bg-[#FFDAD6]/40 hover:border-[#BA1A1A]/30 text-[12px] font-medium text-[#64748B] hover:text-[#93000A] cursor-pointer"
                        aria-label={`Remove ${source.title} from bibliography`}
                      >
                        <BookmarkMinus className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-[10px] bg-[#F8FAFC] border border-[#E2E8F0] font-mono text-[12px] leading-[19px] text-[#1E293B] whitespace-pre-wrap break-words">
                    {formatted}
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
