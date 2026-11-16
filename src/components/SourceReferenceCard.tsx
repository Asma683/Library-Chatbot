import React from 'react';
import { Bookmark, FileText, MapPin, ShieldCheck } from 'lucide-react';
import type { CatalogSource } from '../types/academic';

interface SourceReferenceCardProps {
  marker?: number;
  source: CatalogSource;
  isPinned: boolean;
  onTogglePin: (source: CatalogSource) => void;
  onLocateInStacks: (source: CatalogSource) => void;
  onInspectAbstract: (source: CatalogSource) => void;
}

export const SourceReferenceCard: React.FC<SourceReferenceCardProps> = ({
  marker,
  source,
  isPinned,
  onTogglePin,
  onLocateInStacks,
  onInspectAbstract,
}) => {
  return (
    <article className="flex flex-col justify-between p-4 rounded-[12px] bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#C5C6CF] transition-colors">
      <div>
        {/* Quiet typographic metadata line (no pill sandwich) */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-1.5 text-[12px] text-[#64748B] min-w-0 truncate">
            {marker !== undefined && (
              <span className="font-mono font-semibold text-[#2563EB] shrink-0">
                [{marker}]
              </span>
            )}
            <span className="truncate">{source.collection}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums shrink-0">{source.year}</span>
          </div>

          {source.peerReviewed && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#0D9488] shrink-0 whitespace-nowrap">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Peer-Reviewed</span>
            </span>
          )}
        </div>

        {/* Title */}
        <h4 className="font-display text-[14px] font-semibold text-[#0B1C30] leading-[20px] mb-1 line-clamp-2">
          {source.title}
        </h4>

        {/* Authors & Journal */}
        <p className="text-[12px] text-[#64748B] leading-[17px] truncate mb-2">
          {source.authors.join(', ')} · {source.journal}
        </p>

        {/* Call Number & DOI */}
        <div className="text-[11px] font-mono text-[#44474E] truncate mb-3">
          Call No. {source.callNumber}
        </div>
      </div>

      {/* Action Links */}
      <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onLocateInStacks(source)}
            className="inline-flex items-center gap-1 text-[12px] font-medium text-[#2563EB] hover:text-[#003EA8] transition-colors cursor-pointer whitespace-nowrap"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Locate in Stacks</span>
          </button>

          <button
            type="button"
            onClick={() => onInspectAbstract(source)}
            className="inline-flex items-center gap-1 text-[12px] font-medium text-[#102342] hover:text-[#2563EB] transition-colors cursor-pointer whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Abstract</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => onTogglePin(source)}
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-[8px] text-[12px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
            isPinned
              ? 'bg-[#102342] text-white'
              : 'border border-[#E2E8F0] bg-white text-[#102342] hover:bg-[#F1F5F9]'
          }`}
        >
          <Bookmark className="w-3 h-3" />
          <span>{isPinned ? 'Pinned' : 'Pin'}</span>
        </button>
      </div>
    </article>
  );
};
