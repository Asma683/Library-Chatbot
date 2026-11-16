import React, { useState, useRef, useEffect } from 'react';
import { Bookmark, Check, Copy, ExternalLink, MapPin } from 'lucide-react';
import type { CatalogSource, CitationFormat, CitationRef } from '../types/academic';
import { formatCitation } from '../utils/citations';

interface CitationTextProps {
  content: string;
  citations?: CitationRef[];
  citationFormat: CitationFormat;
  pinnedIds: Set<string>;
  onTogglePin: (source: CatalogSource) => void;
  onLocateInStacks: (source: CatalogSource) => void;
}

export const CitationText: React.FC<CitationTextProps> = ({
  content,
  citations = [],
  citationFormat,
  pinnedIds,
  onTogglePin,
  onLocateInStacks,
}) => {
  const [activeMarker, setActiveMarker] = useState<{
    key: string;
    citation: CitationRef;
  } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveMarker(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const citationMap = new Map<number, CitationRef>();
  citations.forEach((c) => citationMap.set(c.marker, c));

  const paragraphs = content.split(/\n\s*\n/).filter((p) => p.trim().length > 0);

  const handleCopy = async (source: CatalogSource) => {
    const text = formatCitation(source, citationFormat);
    await navigator.clipboard.writeText(text);
    setCopiedId(source.id);
    setTimeout(() => setCopiedId(null), 1600);
  };

  return (
    <div ref={containerRef} className="space-y-4 text-[15px] leading-[25px] text-[#1E293B]">
      {paragraphs.map((paragraph, pIdx) => {
        const parts = paragraph.split(/(\[\d+\])/g);
        return (
          <p key={pIdx} className="text-pretty">
            {parts.map((part, partIdx) => {
              const match = part.match(/^\[(\d+)\]$/);
              if (!match) {
                return <React.Fragment key={partIdx}>{part}</React.Fragment>;
              }

              const markerNum = Number(match[1]);
              const refItem = citationMap.get(markerNum);
              if (!refItem) {
                return (
                  <span
                    key={partIdx}
                    className="inline-flex items-center px-1.5 py-0.5 mx-0.5 text-[11px] font-mono font-medium rounded-[6px] bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]"
                  >
                    [{markerNum}]
                  </span>
                );
              }

              const uniqueKey = `${pIdx}-${partIdx}-${markerNum}`;
              const isOpen = activeMarker?.key === uniqueKey;
              const isPinned = pinnedIds.has(refItem.source.id);

              return (
                <span
                  key={uniqueKey}
                  className="relative inline-block align-baseline mx-0.5"
                  onMouseEnter={() => setActiveMarker({ key: uniqueKey, citation: refItem })}
                  onMouseLeave={() => setActiveMarker(null)}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setActiveMarker(isOpen ? null : { key: uniqueKey, citation: refItem })
                    }
                    className={`inline-flex items-center px-1.5 py-0 text-[11px] font-mono font-medium leading-[18px] rounded-[6px] border transition-colors cursor-pointer focus-dual-ring ${
                      isOpen
                        ? 'bg-[#2563EB] text-white border-[#2563EB]'
                        : 'bg-[#EFF6FF] text-[#2563EB] border-[#DBEAFE] hover:bg-[#DBEAFE]'
                    }`}
                    aria-label={`Inspect citation ${markerNum}: ${refItem.source.title}`}
                  >
                    [{markerNum}]
                  </button>

                  {isOpen && (
                    <div
                      role="dialog"
                      aria-label={`Citation ${markerNum} preview`}
                      className="absolute left-0 bottom-full mb-2 z-40 w-[330px] sm:w-[360px] p-4 rounded-[12px] bg-white border border-[#E2E8F0] shadow-popover text-left"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[11px] font-medium text-[#0D9488]">
                          {refItem.source.collection} · {refItem.source.year}
                        </span>
                        <span className="font-mono text-[11px] text-[#64748B] truncate">
                          {refItem.source.callNumber}
                        </span>
                      </div>

                      <h4 className="font-display text-[13px] font-semibold text-[#0B1C30] leading-[18px] mb-1">
                        {refItem.source.title}
                      </h4>

                      <p className="text-[12px] text-[#64748B] mb-2">
                        {refItem.source.authors.join(', ')} · {refItem.source.journal}
                      </p>

                      {refItem.excerptNote && (
                        <p className="text-[12px] leading-[17px] text-[#1E293B] bg-[#F8FAFC] p-2.5 rounded-[8px] border border-[#E2E8F0] mb-3">
                          {refItem.excerptNote}
                        </p>
                      )}

                      <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#E2E8F0]">
                        <button
                          type="button"
                          onClick={() => onLocateInStacks(refItem.source)}
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-[#2563EB] hover:text-[#003EA8] cursor-pointer"
                        >
                          <MapPin className="w-3 h-3" />
                          <span>Stacks</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleCopy(refItem.source)}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-[6px] text-[11px] font-medium text-[#102342] hover:bg-[#F1F5F9] cursor-pointer"
                          >
                            {copiedId === refItem.source.id ? (
                              <>
                                <Check className="w-3 h-3 text-[#0D9488]" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Cite ({citationFormat})</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => onTogglePin(refItem.source)}
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-[6px] text-[11px] font-medium transition-colors cursor-pointer ${
                              isPinned
                                ? 'bg-[#102342] text-white'
                                : 'bg-[#EFF4FF] text-[#102342] hover:bg-[#DBEAFE]'
                            }`}
                          >
                            <Bookmark className="w-3 h-3" />
                            <span>{isPinned ? 'Pinned' : 'Pin'}</span>
                          </button>
                        </div>
                      </div>

                      <div className="mt-2 pt-1.5 border-t border-[#F1F5F9] flex items-center justify-between text-[11px] font-mono text-[#64748B]">
                        <span className="truncate">DOI: {refItem.source.doi}</span>
                        <ExternalLink className="w-3 h-3 shrink-0 ml-2 text-[#94A3B8]" />
                      </div>
                    </div>
                  )}
                </span>
              );
            })}
          </p>
        );
      })}
    </div>
  );
};
