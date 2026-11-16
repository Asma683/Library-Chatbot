import React, { useState } from 'react';
import {
  BookOpen,
  Bookmark,
  ChevronUp,
  Library,
  MessageSquareText,
  Plus,
  ShieldCheck,
  Trash2,
  X,
} from 'lucide-react';
import type {
  CatalogCollection,
  CitationFormat,
  ResearchThread,
  WorkspaceScreen,
} from '../types/academic';
import { CrestMark } from './CrestMark';

interface SidebarProps {
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  activeScreen: WorkspaceScreen;
  onNavigateScreen: (screen: WorkspaceScreen) => void;
  threads: ResearchThread[];
  activeThreadId: string | null;
  onSelectThread: (threadId: string) => void;
  onNewInquiry: () => void;
  onDeleteThread: (threadId: string) => void;
  pinnedCount: number;
  activeCatalogFilter: CatalogCollection;
  onSelectBookmarkedCatalog: (catalog: Exclude<CatalogCollection, 'All Collections'>) => void;
  citationFormat: CitationFormat;
  onChangeCitationFormat: (fmt: CitationFormat) => void;
  peerReviewedDefault: boolean;
  onTogglePeerReviewedDefault: () => void;
}

const BOOKMARKED_CATALOGS: {
  name: Exclude<CatalogCollection, 'All Collections'>;
  subtitle: string;
}[] = [
  { name: 'JSTOR', subtitle: 'Humanities & Archives' },
  { name: 'IEEE Xplore', subtitle: 'Computing & Engineering' },
  { name: 'PubMed Central', subtitle: 'Life & Cognitive Sciences' },
  { name: 'University Archive', subtitle: 'Special Collections & Folios' },
];

export const Sidebar: React.FC<SidebarProps> = ({
  isOpenMobile,
  onCloseMobile,
  activeScreen,
  onNavigateScreen,
  threads,
  activeThreadId,
  onSelectThread,
  onNewInquiry,
  onDeleteThread,
  pinnedCount,
  activeCatalogFilter,
  onSelectBookmarkedCatalog,
  citationFormat,
  onChangeCitationFormat,
  peerReviewedDefault,
  onTogglePeerReviewedDefault,
}) => {
  const [profileExpanded, setProfileExpanded] = useState(false);

  const todayThreads = threads.filter((t) => t.bucket === 'Today');
  const olderThreads = threads.filter((t) => t.bucket === 'Previous 7 Days');

  const sidebarContent = (
    <aside className="flex h-full w-[280px] flex-col bg-[#F1F5F9] border-r border-[#E2E8F0] select-none">
      {/* Institutional Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <button
          type="button"
          onClick={() => {
            onNavigateScreen('research');
            onCloseMobile();
          }}
          className="flex items-center gap-2.5 text-left focus-dual-ring rounded-lg p-1 -ml-1"
        >
          <CrestMark size={28} />
          <span className="font-display text-[15px] font-semibold tracking-tight text-[#0B1C30] whitespace-nowrap">
            Academic Intelligence
          </span>
        </button>
        <button
          type="button"
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-lg text-[#64748B] hover:text-[#0B1C30] hover:bg-[#E2E8F0]/60 transition-colors"
          aria-label="Close navigation sidebar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Primary New Inquiry CTA */}
      <div className="px-4 pb-4">
        <button
          type="button"
          onClick={() => {
            onNewInquiry();
            onCloseMobile();
          }}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-[8px] bg-[#102342] hover:bg-[#1E3A5F] text-white text-[13px] font-medium transition-colors shadow-resting focus-dual-ring cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>New Research Inquiry</span>
        </button>
      </div>

      {/* Workspace Screens */}
      <nav aria-label="Workspace views" className="px-3 pb-4 border-b border-[#E2E8F0]">
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => {
              onNavigateScreen('research');
              onCloseMobile();
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer ${
              activeScreen === 'research'
                ? 'bg-white text-[#102342] shadow-resting border border-[#E2E8F0]'
                : 'text-[#44474E] hover:bg-white/60 hover:text-[#102342]'
            }`}
          >
            <span className="flex items-center gap-2.5 whitespace-nowrap">
              <MessageSquareText className="w-4 h-4 text-[#2563EB]" />
              <span>Research Workspace</span>
            </span>
            <span className="text-[11px] font-mono text-[#64748B] tabular-nums">
              {threads.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              onNavigateScreen('catalog');
              onCloseMobile();
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer ${
              activeScreen === 'catalog'
                ? 'bg-white text-[#102342] shadow-resting border border-[#E2E8F0]'
                : 'text-[#44474E] hover:bg-white/60 hover:text-[#102342]'
            }`}
          >
            <span className="flex items-center gap-2.5 whitespace-nowrap">
              <Library className="w-4 h-4 text-[#2563EB]" />
              <span>Catalog Explorer</span>
            </span>
            <span className="text-[11px] font-mono text-[#64748B] tabular-nums">12</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onNavigateScreen('bibliography');
              onCloseMobile();
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer ${
              activeScreen === 'bibliography'
                ? 'bg-white text-[#102342] shadow-resting border border-[#E2E8F0]'
                : 'text-[#44474E] hover:bg-white/60 hover:text-[#102342]'
            }`}
          >
            <span className="flex items-center gap-2.5 whitespace-nowrap">
              <Bookmark className="w-4 h-4 text-[#0D9488]" />
              <span>Saved Bibliography</span>
            </span>
            <span className="text-[11px] font-mono text-[#64748B] tabular-nums">
              {pinnedCount}
            </span>
          </button>
        </div>
      </nav>

      {/* Scrollable Threads + Bookmarked Catalogs */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {/* Today Threads */}
        {todayThreads.length > 0 && (
          <div>
            <h2 className="px-2.5 mb-1.5 text-[12px] font-semibold text-[#64748B] tracking-[0.02em]">
              Today
            </h2>
            <ul className="space-y-0.5">
              {todayThreads.map((thread) => {
                const isActive = activeScreen === 'research' && activeThreadId === thread.id;
                return (
                  <li key={thread.id} className="group relative">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectThread(thread.id);
                        onCloseMobile();
                      }}
                      className={`w-full text-left pl-2.5 pr-8 py-2 rounded-[8px] transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#E5EEFF] text-[#102342] font-medium'
                          : 'text-[#1E293B] hover:bg-[#E2E8F0]/55'
                      }`}
                    >
                      <div className="text-[13px] leading-[18px] truncate">{thread.title}</div>
                      <div className="mt-0.5 text-[11px] text-[#64748B] truncate">
                        {thread.discipline} · {thread.updatedAt}
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteThread(thread.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 focus:opacity-100 absolute right-1.5 top-2.5 p-1 rounded text-[#64748B] hover:text-[#BA1A1A] hover:bg-white/80 transition-opacity cursor-pointer"
                      aria-label={`Delete thread ${thread.title}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Previous 7 Days */}
        {olderThreads.length > 0 && (
          <div>
            <h2 className="px-2.5 mb-1.5 text-[12px] font-semibold text-[#64748B] tracking-[0.02em]">
              Previous 7 Days
            </h2>
            <ul className="space-y-0.5">
              {olderThreads.map((thread) => {
                const isActive = activeScreen === 'research' && activeThreadId === thread.id;
                return (
                  <li key={thread.id} className="group relative">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectThread(thread.id);
                        onCloseMobile();
                      }}
                      className={`w-full text-left pl-2.5 pr-8 py-2 rounded-[8px] transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#E5EEFF] text-[#102342] font-medium'
                          : 'text-[#1E293B] hover:bg-[#E2E8F0]/55'
                      }`}
                    >
                      <div className="text-[13px] leading-[18px] truncate">{thread.title}</div>
                      <div className="mt-0.5 text-[11px] text-[#64748B] truncate">
                        {thread.discipline} · {thread.updatedAt}
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteThread(thread.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 focus:opacity-100 absolute right-1.5 top-2.5 p-1 rounded text-[#64748B] hover:text-[#BA1A1A] hover:bg-white/80 transition-opacity cursor-pointer"
                      aria-label={`Delete thread ${thread.title}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Bookmarked Library Catalogs */}
        <div>
          <h2 className="px-2.5 mb-1.5 text-[12px] font-semibold text-[#64748B] tracking-[0.02em]">
            Bookmarked Catalogs
          </h2>
          <ul className="space-y-1">
            {BOOKMARKED_CATALOGS.map((cat) => {
              const isSelected = activeScreen === 'catalog' && activeCatalogFilter === cat.name;
              return (
                <li key={cat.name}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectBookmarkedCatalog(cat.name);
                      onCloseMobile();
                    }}
                    className={`w-full flex items-start gap-2.5 px-2.5 py-2 rounded-[8px] text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-white text-[#102342] border border-[#E2E8F0] shadow-resting'
                        : 'text-[#1E293B] hover:bg-[#E2E8F0]/55'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#2563EB]" />
                    <div className="min-w-0">
                      <div className="text-[13px] font-medium leading-tight truncate">
                        {cat.name}
                      </div>
                      <div className="text-[11px] text-[#64748B] truncate">{cat.subtitle}</div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Expandable Scholar Profile Widget */}
      <div className="border-t border-[#E2E8F0] p-3 bg-[#F1F5F9]">
        {profileExpanded && (
          <div className="mb-2.5 p-3 rounded-[12px] bg-white border border-[#E2E8F0] shadow-popover space-y-3">
            <div>
              <label
                htmlFor="sidebar-citation-style"
                className="block text-[11px] font-semibold text-[#64748B] mb-1"
              >
                Default Citation Standard
              </label>
              <select
                id="sidebar-citation-style"
                value={citationFormat}
                onChange={(e) => onChangeCitationFormat(e.target.value as CitationFormat)}
                className="w-full px-2.5 py-1.5 text-[12px] font-medium text-[#102342] bg-[#F8FAFC] border border-[#E2E8F0] rounded-[8px] focus-dual-ring"
              >
                <option value="APA 7th">APA 7th Edition</option>
                <option value="MLA 9th">MLA 9th Edition</option>
                <option value="Chicago 17th">Chicago 17th Notes</option>
                <option value="IEEE">IEEE Reference</option>
                <option value="BibTeX">BibTeX Key Export</option>
              </select>
            </div>

            <button
              type="button"
              onClick={onTogglePeerReviewedDefault}
              className="w-full flex items-center justify-between px-2.5 py-2 rounded-[8px] bg-[#F8FAFC] border border-[#E2E8F0] text-[12px] text-[#1E293B] hover:bg-[#EFF4FF] transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0D9488]" />
                <span>Peer-Reviewed Only</span>
              </span>
              <span
                className={`text-[11px] font-semibold ${
                  peerReviewedDefault ? 'text-[#0D9488]' : 'text-[#64748B]'
                }`}
              >
                {peerReviewedDefault ? 'Enabled' : 'Off'}
              </span>
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => setProfileExpanded((prev) => !prev)}
          aria-expanded={profileExpanded}
          className="w-full flex items-center justify-between p-2 rounded-[10px] hover:bg-white/80 transition-colors focus-dual-ring cursor-pointer"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-[8px] bg-[#102342] text-white flex items-center justify-center font-display text-[12px] font-semibold shrink-0">
              EV
            </div>
            <div className="text-left min-w-0">
              <div className="text-[13px] font-semibold text-[#0B1C30] truncate">
                Dr. Elena Vance
              </div>
              <div className="text-[11px] text-[#64748B] truncate">
                Computational Epistemology
              </div>
            </div>
          </div>
          <ChevronUp
            className={`w-4 h-4 text-[#64748B] transition-transform duration-150 ${
              profileExpanded ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Fixed Collateral Sidebar */}
      <div className="hidden lg:block h-full shrink-0">{sidebarContent}</div>

      {/* Tablet/Mobile Overlay Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-[#0B1C30]/30 backdrop-blur-[2px]"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <div className="relative z-10 h-full shadow-popover">{sidebarContent}</div>
        </div>
      )}
    </>
  );
};
