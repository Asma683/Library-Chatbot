import React from 'react';
import { Download, Menu } from 'lucide-react';
import type { CitationFormat, WorkspaceScreen } from '../types/academic';

interface TopBarProps {
  onOpenMobileSidebar: () => void;
  activeScreen: WorkspaceScreen;
  activeThreadTitle?: string;
  citationFormat: CitationFormat;
  onChangeCitationFormat: (fmt: CitationFormat) => void;
  onExportBibliography: () => void;
  pinnedCount: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  onOpenMobileSidebar,
  activeScreen,
  activeThreadTitle,
  citationFormat,
  onChangeCitationFormat,
  onExportBibliography,
  pinnedCount,
}) => {
  const screenLabel =
    activeScreen === 'research'
      ? activeThreadTitle || 'New Scholarly Inquiry'
      : activeScreen === 'catalog'
      ? 'University Library Catalog'
      : 'Saved Bibliography Studio';

  const sectionPrefix =
    activeScreen === 'research'
      ? 'Research Workspace'
      : activeScreen === 'catalog'
      ? 'Catalog Explorer'
      : 'Bibliography';

  return (
    <header className="sticky top-0 z-30 h-14 flex items-center justify-between gap-4 px-4 sm:px-6 bg-[#F8FAFC]/85 backdrop-blur-md border-b border-[#E2E8F0]">
      {/* Zone 1: Breadcrumb & Mobile Menu */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 -ml-1 rounded-[8px] text-[#102342] hover:bg-[#E2E8F0]/60 transition-colors cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 min-w-0 text-[13px]">
          <span className="font-medium text-[#64748B] whitespace-nowrap shrink-0">
            {sectionPrefix}
          </span>
          <span className="text-[#94A3B8]" aria-hidden="true">
            /
          </span>
          <h1 className="font-display font-semibold text-[#0B1C30] truncate">
            {screenLabel}
          </h1>
        </div>
      </div>

      {/* Zone 2 & 3: Citation Format & Export Action */}
      <div className="flex items-center gap-2.5 shrink-0">
        <label htmlFor="topbar-citation-select" className="sr-only">
          Citation Format
        </label>
        <select
          id="topbar-citation-select"
          value={citationFormat}
          onChange={(e) => onChangeCitationFormat(e.target.value as CitationFormat)}
          className="hidden sm:block px-3 py-1.5 text-[12px] font-medium text-[#102342] bg-white border border-[#E2E8F0] rounded-[8px] hover:bg-[#F1F5F9] transition-colors focus-dual-ring cursor-pointer"
        >
          <option value="APA 7th">APA 7th</option>
          <option value="MLA 9th">MLA 9th</option>
          <option value="Chicago 17th">Chicago 17th</option>
          <option value="IEEE">IEEE</option>
          <option value="BibTeX">BibTeX</option>
        </select>

        <button
          type="button"
          onClick={onExportBibliography}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[8px] border border-[#E2E8F0] bg-white hover:bg-[#F1F5F9] text-[#102342] text-[12px] font-medium transition-colors focus-dual-ring cursor-pointer whitespace-nowrap shrink-0"
        >
          <Download className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>Export .bib</span>
          {pinnedCount > 0 && (
            <span className="font-mono text-[11px] text-[#64748B] tabular-nums">
              ({pinnedCount})
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
