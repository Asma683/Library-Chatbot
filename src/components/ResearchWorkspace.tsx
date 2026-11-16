import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowRight,
  ArrowUp,
  ChevronDown,
  FileText,
  Filter,
  Paperclip,
  RotateCcw,
  ShieldCheck,
  X,
} from 'lucide-react';
import type {
  AttachedExcerpt,
  CatalogCollection,
  CatalogSource,
  CitationFormat,
  ResearchThread,
} from '../types/academic';
import { CrestMark } from './CrestMark';
import { CitationText } from './CitationText';
import { SourceReferenceCard } from './SourceReferenceCard';

interface ResearchWorkspaceProps {
  activeThread: ResearchThread | null;
  collectionScope: CatalogCollection;
  onChangeCollectionScope: (scope: CatalogCollection) => void;
  peerReviewedOnly: boolean;
  onTogglePeerReviewedOnly: () => void;
  citationFormat: CitationFormat;
  pinnedIds: Set<string>;
  onTogglePin: (source: CatalogSource) => void;
  onLocateInStacks: (source: CatalogSource) => void;
  onInspectAbstract: (source: CatalogSource) => void;
  onSubmitQuery: (query: string, attachedExcerpt: AttachedExcerpt | null) => Promise<void>;
  isSynthesizing: boolean;
}

const STARTER_INQUIRIES = [
  {
    discipline: 'Biophysics & Quantum Biology',
    title: 'Spin coherence vs. thermal noise in avian magnetoreception',
    prompt:
      'Compare how avian cryptochrome-4a radical pairs and FMO photosynthetic complexes preserve functional coherence at physiological temperatures.',
  },
  {
    discipline: 'Machine Learning & Interpretability',
    title: 'Causal faithfulness in sparse autoencoder feature decomposition',
    prompt:
      'What are the primary limitations of sparse autoencoders and linear attribution patching when verifying multi-step reasoning circuits?',
  },
  {
    discipline: 'Book History & Archives',
    title: 'Aldine octavo typography and scholarly marginalia',
    prompt:
      'How did sixteenth-century Venetian octavo standardization reshape humanist note-taking and cross-referencing practices?',
  },
  {
    discipline: 'Urban Climate & Hydrology',
    title: 'Permeable cobblestone attenuation in historic city centers',
    prompt:
      'Summarize empirical peak runoff attenuation rates and clogging stabilization timelines for permeable pavement retrofits in European historic districts.',
  },
];

const COLLECTIONS: CatalogCollection[] = [
  'All Collections',
  'JSTOR',
  'IEEE Xplore',
  'PubMed Central',
  'University Archive',
];

export const ResearchWorkspace: React.FC<ResearchWorkspaceProps> = ({
  activeThread,
  collectionScope,
  onChangeCollectionScope,
  peerReviewedOnly,
  onTogglePeerReviewedOnly,
  citationFormat,
  pinnedIds,
  onTogglePin,
  onLocateInStacks,
  onInspectAbstract,
  onSubmitQuery,
  isSynthesizing,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [scopeMenuOpen, setScopeMenuOpen] = useState(false);
  const [attachModalOpen, setAttachModalOpen] = useState(false);
  const [attachedExcerpt, setAttachedExcerpt] = useState<AttachedExcerpt | null>(null);
  const [draftExcerptTitle, setDraftExcerptTitle] = useState('');
  const [draftExcerptBody, setDraftExcerptBody] = useState('');

  const bottomRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeThread?.messages.length, isSynthesizing]);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (scopeRef.current && !scopeRef.current.contains(e.target as Node)) {
        setScopeMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const handleSend = async (textOverride?: string) => {
    const text = (textOverride ?? inputValue).trim();
    if (!text || isSynthesizing) return;
    if (!textOverride) {
      setInputValue('');
    }
    const excerptToSend = attachedExcerpt;
    setAttachedExcerpt(null);
    await onSubmitQuery(text, excerptToSend);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const content = typeof reader.result === 'string' ? reader.result : '';
      setDraftExcerptTitle(file.name);
      setDraftExcerptBody(content.slice(0, 4000));
    };
    reader.readAsText(file);
  };

  const handleSaveExcerpt = () => {
    if (!draftExcerptBody.trim()) return;
    setAttachedExcerpt({
      title: draftExcerptTitle.trim() || 'Manuscript Excerpt',
      content: draftExcerptBody.trim(),
      charCount: draftExcerptBody.trim().length,
    });
    setDraftExcerptTitle('');
    setDraftExcerptBody('');
    setAttachModalOpen(false);
  };

  const messages = activeThread?.messages ?? [];

  return (
    <div className="flex-1 flex flex-col min-h-0 relative">
      {/* Scrollable Thread Stream */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 pt-6 pb-40">
        {messages.length === 0 ? (
          <div className="max-w-[860px] mx-auto pt-6 sm:pt-12">
            <div className="flex flex-col items-center text-center mb-10">
              <CrestMark size={44} className="mb-4 shadow-resting" />
              <h2 className="font-display text-[28px] sm:text-[34px] font-bold text-[#0B1C30] leading-[38px] tracking-[-0.02em] text-balance mb-3">
                What are we investigating today?
              </h2>
              <p className="text-[15px] text-[#44474E] max-w-[560px] leading-[24px]">
                Synthesize peer-reviewed literature across university library holdings with inline
                verified citations, DOI provenance, and physical stack locations.
              </p>
            </div>

            {/* Active Search Scope Bar */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              <div className="inline-flex items-center gap-1 p-1 rounded-[10px] bg-[#F1F5F9] border border-[#E2E8F0]">
                {COLLECTIONS.map((col) => (
                  <button
                    key={col}
                    type="button"
                    onClick={() => onChangeCollectionScope(col)}
                    className={`px-3 py-1.5 rounded-[7px] text-[12px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      collectionScope === col
                        ? 'bg-white text-[#102342] shadow-resting'
                        : 'text-[#64748B] hover:text-[#102342]'
                    }`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>

            {/* Curated Interdisciplinary Starters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {STARTER_INQUIRIES.map((starter) => (
                <button
                  key={starter.title}
                  type="button"
                  onClick={() => handleSend(starter.prompt)}
                  className="group text-left p-4 rounded-[12px] bg-white border border-[#E2E8F0] hover:border-[#2563EB] shadow-resting transition-colors cursor-pointer focus-dual-ring"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-semibold text-[#2563EB]">
                      {starter.discipline}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#2563EB] transition-colors" />
                  </div>
                  <div className="font-display text-[15px] font-semibold text-[#0B1C30] leading-[21px] mb-1">
                    {starter.title}
                  </div>
                  <p className="text-[13px] text-[#64748B] leading-[19px] line-clamp-2">
                    {starter.prompt}
                  </p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-[860px] mx-auto space-y-6">
            {messages.map((msg) => {
              if (msg.role === 'user') {
                return (
                  <div key={msg.id} className="flex flex-col items-end">
                    <div className="max-w-[85%] sm:max-w-[74%] px-4 py-3.5 bg-[#102342] text-white rounded-tl-[16px] rounded-tr-[16px] rounded-bl-[16px] rounded-br-[4px] shadow-resting">
                      {msg.attachedExcerpt && (
                        <div className="mb-2.5 px-3 py-2 rounded-[8px] bg-white/10 border border-white/15 text-[12px] flex items-center gap-2">
                          <FileText className="w-3.5 h-3.5 text-[#B5C7EE] shrink-0" />
                          <span className="truncate font-medium">
                            {msg.attachedExcerpt.title}
                          </span>
                          <span className="font-mono text-[11px] text-[#B5C7EE] shrink-0">
                            ({msg.attachedExcerpt.charCount} chars)
                          </span>
                        </div>
                      )}
                      <p className="text-[15px] leading-[24px] whitespace-pre-wrap">
                        {msg.content}
                      </p>
                    </div>
                    <span className="mt-1.5 text-[11px] text-[#64748B] tabular-nums">
                      {msg.collectionScope ? `${msg.collectionScope} · ` : ''}
                      {msg.timestamp}
                    </span>
                  </div>
                );
              }

              return (
                <div key={msg.id} className="flex flex-col items-start">
                  <div className="w-full p-5 sm:p-6 rounded-[16px] bg-white border border-[#E2E8F0] shadow-resting">
                    {/* Assistant Crest Header */}
                    <div className="flex items-center justify-between gap-3 pb-3.5 mb-4 border-b border-[#F1F5F9]">
                      <div className="flex items-center gap-2.5">
                        <CrestMark size={24} />
                        <span className="font-display text-[13px] font-semibold text-[#0B1C30]">
                          Academic Intelligence
                        </span>
                        <span className="text-[#CBD5E1]" aria-hidden="true">
                          ·
                        </span>
                        <span className="text-[12px] text-[#64748B]">
                          {msg.collectionScope || 'University Catalog Synthesis'}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#64748B] tabular-nums">
                        {msg.timestamp}
                      </span>
                    </div>

                    {msg.error ? (
                      <div className="p-4 rounded-[10px] bg-[#FFDAD6]/45 border border-[#BA1A1A]/30 text-[#93000A] text-[13px] leading-[20px] flex items-start justify-between gap-4">
                        <div>
                          <div className="font-semibold mb-1">Synthesis Interrupted</div>
                          <p>{msg.error}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const lastUser = [...messages]
                              .reverse()
                              .find((m) => m.role === 'user');
                            if (lastUser) handleSend(lastUser.content);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-white border border-[#E2E8F0] text-[#102342] text-[12px] font-medium hover:bg-[#F1F5F9] shrink-0 cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Retry</span>
                        </button>
                      </div>
                    ) : (
                      <>
                        {/* Prose with Interactive Inline Citations */}
                        <CitationText
                          content={msg.content}
                          citations={msg.citations}
                          citationFormat={citationFormat}
                          pinnedIds={pinnedIds}
                          onTogglePin={onTogglePin}
                          onLocateInStacks={onLocateInStacks}
                        />

                        {/* Referenced Sources Section */}
                        {msg.citations && msg.citations.length > 0 && (
                          <div className="mt-6 pt-5 border-t border-[#E2E8F0]">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-display text-[13px] font-semibold text-[#0B1C30]">
                                Cited Library Sources ({msg.citations.length})
                              </h3>
                              <span className="text-[11px] text-[#64748B]">
                                Hover or click inline markers to inspect provenance
                              </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {msg.citations.map((refItem) => (
                                <SourceReferenceCard
                                  key={`${msg.id}-${refItem.marker}-${refItem.source.id}`}
                                  marker={refItem.marker}
                                  source={refItem.source}
                                  isPinned={pinnedIds.has(refItem.source.id)}
                                  onTogglePin={onTogglePin}
                                  onLocateInStacks={onLocateInStacks}
                                  onInspectAbstract={onInspectAbstract}
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Follow-up Inquiries */}
                        {msg.followUpQuestions && msg.followUpQuestions.length > 0 && (
                          <div className="mt-5 pt-4 border-t border-[#F1F5F9]">
                            <div className="text-[11px] font-semibold text-[#64748B] mb-2">
                              Further Lines of Inquiry
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {msg.followUpQuestions.map((fq, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => handleSend(fq)}
                                  disabled={isSynthesizing}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#EFF4FF] hover:border-[#2563EB]/40 text-[12px] text-[#102342] text-left transition-colors cursor-pointer disabled:opacity-50"
                                >
                                  <ArrowRight className="w-3 h-3 text-[#2563EB] shrink-0" />
                                  <span>{fq}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}

            {isSynthesizing && (
              <div className="w-full p-5 sm:p-6 rounded-[16px] bg-white border border-[#E2E8F0] shadow-resting">
                <div className="flex items-center gap-2.5 pb-3.5 mb-4 border-b border-[#F1F5F9]">
                  <CrestMark size={24} />
                  <span className="font-display text-[13px] font-semibold text-[#0B1C30]">
                    Synthesizing Scholarly Literature...
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="h-3.5 w-11/12 rounded bg-[#E2E8F0]/70" />
                  <div className="h-3.5 w-full rounded bg-[#E2E8F0]/60" />
                  <div className="h-3.5 w-4/5 rounded bg-[#E2E8F0]/50" />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Floating Bottom Input Composer */}
      <div className="pointer-events-none sticky bottom-0 left-0 right-0 z-20 px-4 sm:px-6 pb-4 pt-6 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/90 to-transparent">
        <div className="pointer-events-auto max-w-[860px] mx-auto">
          {attachedExcerpt && (
            <div className="mb-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-[10px] bg-white border border-[#E2E8F0] shadow-resting text-[12px] text-[#102342]">
              <FileText className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="font-medium truncate max-w-[240px]">
                {attachedExcerpt.title}
              </span>
              <span className="font-mono text-[11px] text-[#64748B]">
                ({attachedExcerpt.charCount} chars)
              </span>
              <button
                type="button"
                onClick={() => setAttachedExcerpt(null)}
                className="p-0.5 rounded hover:bg-[#F1F5F9] text-[#64748B] cursor-pointer"
                aria-label="Remove attached excerpt"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <div className="rounded-[24px] bg-white/95 backdrop-blur-md border border-[#E2E8F0] shadow-composer focus-dual-ring p-3 sm:p-3.5">
            <textarea
              rows={2}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a research question, request a comparative synthesis, or query catalog holdings..."
              className="w-full resize-none bg-transparent px-2 py-1 text-[14px] leading-[22px] text-[#0B1C30] placeholder:text-[#64748B] focus:outline-none"
            />

            <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#F1F5F9]">
              <div className="flex items-center gap-1.5 flex-wrap">
                {/* Attach Excerpt Button */}
                <button
                  type="button"
                  onClick={() => setAttachModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[8px] text-[12px] font-medium text-[#44474E] hover:text-[#102342] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
                >
                  <Paperclip className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Attach Excerpt</span>
                </button>

                {/* Catalog Scope Selector */}
                <div ref={scopeRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setScopeMenuOpen((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[8px] text-[12px] font-medium text-[#44474E] hover:text-[#102342] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
                  >
                    <Filter className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>{collectionScope}</span>
                    <ChevronDown className="w-3 h-3 text-[#64748B]" />
                  </button>

                  {scopeMenuOpen && (
                    <div className="absolute bottom-full left-0 mb-2 w-56 p-1.5 rounded-[12px] bg-white border border-[#E2E8F0] shadow-popover z-30">
                      <div className="px-2.5 py-1 text-[11px] font-semibold text-[#64748B]">
                        Search Scope
                      </div>
                      {COLLECTIONS.map((col) => (
                        <button
                          key={col}
                          type="button"
                          onClick={() => {
                            onChangeCollectionScope(col);
                            setScopeMenuOpen(false);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-[8px] text-[12px] font-medium transition-colors cursor-pointer ${
                            collectionScope === col
                              ? 'bg-[#EFF4FF] text-[#2563EB]'
                              : 'text-[#1E293B] hover:bg-[#F1F5F9]'
                          }`}
                        >
                          {col}
                        </button>
                      ))}
                      <div className="mt-1 pt-1 border-t border-[#F1F5F9]">
                        <button
                          type="button"
                          onClick={onTogglePeerReviewedOnly}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-[8px] text-[12px] text-[#1E293B] hover:bg-[#F1F5F9] cursor-pointer"
                        >
                          <span className="flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#0D9488]" />
                            <span>Peer-Reviewed Only</span>
                          </span>
                          <span className="text-[11px] font-semibold text-[#0D9488]">
                            {peerReviewedOnly ? 'On' : 'Off'}
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {peerReviewedOnly && (
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-[#0D9488]">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Peer-Reviewed Filter</span>
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || isSynthesizing}
                aria-label="Submit scholarly inquiry"
                className="w-9 h-9 rounded-full bg-[#102342] hover:bg-[#2563EB] disabled:bg-[#CBD5E1] text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer disabled:cursor-not-allowed"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Manuscript Excerpt Attachment Modal */}
      {attachModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1C30]/35 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="attach-excerpt-title"
        >
          <div className="w-full max-w-[520px] rounded-[16px] bg-white border border-[#E2E8F0] shadow-popover overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
              <h2
                id="attach-excerpt-title"
                className="font-display text-[16px] font-semibold text-[#0B1C30]"
              >
                Attach Manuscript or Source Excerpt
              </h2>
              <button
                type="button"
                onClick={() => setAttachModalOpen(false)}
                className="p-1.5 rounded-[8px] text-[#64748B] hover:text-[#0B1C30] hover:bg-[#F1F5F9] cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label
                  htmlFor="excerpt-file-input"
                  className="block text-[12px] font-medium text-[#44474E] mb-1.5"
                >
                  Load Plaintext / Markdown File (.txt, .md)
                </label>
                <input
                  id="excerpt-file-input"
                  type="file"
                  accept=".txt,.md,.csv,.bib"
                  onChange={handleFileUpload}
                  className="block w-full text-[12px] text-[#64748B] file:mr-3 file:py-1.5 file:px-3 file:rounded-[8px] file:border file:border-[#E2E8F0] file:text-[12px] file:font-medium file:bg-[#F8FAFC] file:text-[#102342] hover:file:bg-[#F1F5F9]"
                />
              </div>

              <div>
                <label
                  htmlFor="excerpt-title-input"
                  className="block text-[12px] font-medium text-[#44474E] mb-1"
                >
                  Document Title
                </label>
                <input
                  id="excerpt-title-input"
                  type="text"
                  value={draftExcerptTitle}
                  onChange={(e) => setDraftExcerptTitle(e.target.value)}
                  placeholder="e.g., Chapter 3 Draft — Methods Section"
                  className="w-full px-3 py-2 rounded-[8px] border border-[#E2E8F0] text-[13px] text-[#0B1C30] focus-dual-ring"
                />
              </div>

              <div>
                <label
                  htmlFor="excerpt-body-input"
                  className="block text-[12px] font-medium text-[#44474E] mb-1"
                >
                  Excerpt Text
                </label>
                <textarea
                  id="excerpt-body-input"
                  rows={5}
                  value={draftExcerptBody}
                  onChange={(e) => setDraftExcerptBody(e.target.value)}
                  placeholder="Paste an abstract, archival transcription, or draft paragraph for contextual synthesis..."
                  className="w-full px-3 py-2 rounded-[8px] border border-[#E2E8F0] text-[13px] leading-[20px] text-[#0B1C30] focus-dual-ring"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAttachModalOpen(false)}
                  className="px-4 py-2 rounded-[8px] border border-[#E2E8F0] text-[13px] font-medium text-[#102342] hover:bg-[#F1F5F9] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveExcerpt}
                  disabled={!draftExcerptBody.trim()}
                  className="px-4 py-2 rounded-[8px] bg-[#102342] hover:bg-[#1E3A5F] disabled:bg-[#CBD5E1] text-white text-[13px] font-medium cursor-pointer"
                >
                  Attach to Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
