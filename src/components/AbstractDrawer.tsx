import React, { useState } from 'react';
import {
  Bookmark,
  Check,
  Copy,
  MapPin,
  MessageSquarePlus,
  ShieldCheck,
  X,
} from 'lucide-react';
import type { CatalogSource, CitationFormat } from '../types/academic';
import { formatCitation } from '../utils/citations';

interface AbstractDrawerProps {
  source: CatalogSource | null;
  citationFormat: CitationFormat;
  isPinned: boolean;
  onClose: () => void;
  onTogglePin: (source: CatalogSource) => void;
  onLocateInStacks: (source: CatalogSource) => void;
  onInquireAboutSource: (source: CatalogSource) => void;
}

export const AbstractDrawer: React.FC<AbstractDrawerProps> = ({
  source,
  citationFormat,
  isPinned,
  onClose,
  onTogglePin,
  onLocateInStacks,
  onInquireAboutSource,
}) => {
  const [copied, setCopied] = useState(false);

  if (!source) return null;

  const formatted = formatCitation(source, citationFormat);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#0B1C30]/30 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-source-title"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      <aside className="relative z-10 w-full max-w-[500px] h-full bg-white border-l border-[#E2E8F0] shadow-popover flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2 text-[12px] text-[#64748B]">
            <span className="font-medium text-[#102342]">{source.collection}</span>
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
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-[8px] text-[#64748B] hover:text-[#0B1C30] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
            aria-label="Close source details"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          <div>
            <p className="text-[12px] font-medium text-[#2563EB] mb-1.5">{source.discipline}</p>
            <h2
              id="drawer-source-title"
              className="font-display text-[20px] font-semibold text-[#0B1C30] leading-[28px] tracking-[-0.01em] mb-2"
            >
              {source.title}
            </h2>
            <p className="text-[13px] text-[#44474E] leading-[20px]">
              {source.authors.join(', ')}
            </p>
            <p className="text-[13px] text-[#64748B] mt-1">
              {source.journal}
              {source.volumeIssue ? `, ${source.volumeIssue}` : ''}
              {source.pages ? `, pp. ${source.pages}` : ''}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-[10px] bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="text-[11px] font-medium text-[#64748B]">Call Number</div>
              <div className="font-mono text-[12px] text-[#0B1C30] mt-0.5 truncate">
                {source.callNumber}
              </div>
            </div>
            <div className="p-3 rounded-[10px] bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="text-[11px] font-medium text-[#64748B]">DOI Identifier</div>
              <div className="font-mono text-[12px] text-[#2563EB] mt-0.5 truncate">
                {source.doi}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-display text-[14px] font-semibold text-[#0B1C30] mb-2">
              Abstract
            </h3>
            <p className="text-[14px] leading-[23px] text-[#1E293B]">{source.abstract}</p>
          </div>

          {source.keyFindings.length > 0 && (
            <div>
              <h3 className="font-display text-[14px] font-semibold text-[#0B1C30] mb-2">
                Verified Key Findings
              </h3>
              <ul className="space-y-2">
                {source.keyFindings.map((finding, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-[13px] leading-[20px] text-[#1E293B]"
                  >
                    <span className="font-mono text-[11px] font-semibold text-[#2563EB] mt-0.5">
                      0{idx + 1}.
                    </span>
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display text-[14px] font-semibold text-[#0B1C30]">
                Formatted Citation ({citationFormat})
              </h3>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-[12px] font-medium text-[#2563EB] hover:text-[#003EA8] cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#0D9488]" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="p-3.5 rounded-[10px] bg-[#F8FAFC] border border-[#E2E8F0] font-mono text-[12px] leading-[19px] text-[#1E293B] whitespace-pre-wrap break-words">
              {formatted}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-[#E2E8F0] bg-[#F8FAFC] flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onLocateInStacks(source)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[8px] border border-[#E2E8F0] bg-white hover:bg-[#F1F5F9] text-[#102342] text-[12px] font-medium transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Locate in Stacks</span>
            </button>

            <button
              type="button"
              onClick={() => onTogglePin(source)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-[8px] text-[12px] font-medium transition-colors cursor-pointer ${
                isPinned
                  ? 'bg-[#0D9488] text-white'
                  : 'border border-[#E2E8F0] bg-white hover:bg-[#F1F5F9] text-[#102342]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{isPinned ? 'Pinned' : 'Pin Source'}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              onInquireAboutSource(source);
              onClose();
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[8px] bg-[#102342] hover:bg-[#1E3A5F] text-white text-[12px] font-medium transition-colors cursor-pointer"
          >
            <MessageSquarePlus className="w-3.5 h-3.5" />
            <span>Inquire with Assistant</span>
          </button>
        </div>
      </aside>
    </div>
  );
};
