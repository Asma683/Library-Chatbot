import { useState, useMemo, useEffect } from 'react';
import { INITIAL_RESEARCH_THREADS, LIBRARY_CATALOG } from './data/libraryCatalog';
import type {
  AttachedExcerpt,
  CatalogCollection,
  CatalogSource,
  ChatMessage,
  CitationFormat,
  CitationRef,
  ResearchThread,
  WorkspaceScreen,
} from './types/academic';
import { downloadBibTeXFile } from './utils/citations';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { ResearchWorkspace } from './components/ResearchWorkspace';
import { CatalogExplorer } from './components/CatalogExplorer';
import { BibliographyView } from './components/BibliographyView';
import { StacksLocationModal } from './components/StacksLocationModal';
import { AbstractDrawer } from './components/AbstractDrawer';

interface ServerCitedSource {
  sourceId: string;
  isFromCatalog: boolean;
  excerptNote: string;
  fallbackTitle?: string;
  fallbackAuthors?: string[];
  fallbackYear?: number;
  fallbackJournal?: string;
  fallbackDoi?: string;
}

interface ServerInquiryResponse {
  answer: string;
  threadTitle: string;
  discipline: string;
  citedSources: ServerCitedSource[];
  followUpQuestions: string[];
  error?: string;
}

function getCurrentTimeLabel(): string {
  return new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export default function App() {
  const [threads, setThreads] = useState<ResearchThread[]>(() => {
    try {
      const saved = localStorage.getItem('ai_scholar_threads_v1');
      if (saved) {
        const parsed = JSON.parse(saved) as ResearchThread[];
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback to initial seeded threads
    }
    return INITIAL_RESEARCH_THREADS;
  });

  const [activeThreadId, setActiveThreadId] = useState<string | null>(
    () => INITIAL_RESEARCH_THREADS[0]?.id ?? null
  );
  const [activeScreen, setActiveScreen] = useState<WorkspaceScreen>('research');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [collectionScope, setCollectionScope] = useState<CatalogCollection>('All Collections');
  const [peerReviewedOnly, setPeerReviewedOnly] = useState(true);
  const [citationFormat, setCitationFormat] = useState<CitationFormat>('APA 7th');

  const [pinnedSources, setPinnedSources] = useState<CatalogSource[]>(() => {
    try {
      const saved = localStorage.getItem('ai_scholar_pinned_v1');
      if (saved) {
        const parsed = JSON.parse(saved) as CatalogSource[];
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Fallback to initial pinned items
    }
    return [LIBRARY_CATALOG[0], LIBRARY_CATALOG[1], LIBRARY_CATALOG[2]];
  });

  const [stacksModalSource, setStacksModalSource] = useState<CatalogSource | null>(null);
  const [abstractDrawerSource, setAbstractDrawerSource] = useState<CatalogSource | null>(null);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('ai_scholar_threads_v1', JSON.stringify(threads));
    } catch {
      // Ignore storage quota issues
    }
  }, [threads]);

  useEffect(() => {
    try {
      localStorage.setItem('ai_scholar_pinned_v1', JSON.stringify(pinnedSources));
    } catch {
      // Ignore storage quota issues
    }
  }, [pinnedSources]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2600);
  };

  const pinnedIds = useMemo(
    () => new Set(pinnedSources.map((s) => s.id)),
    [pinnedSources]
  );

  const activeThread = useMemo(
    () => threads.find((t) => t.id === activeThreadId) ?? null,
    [threads, activeThreadId]
  );

  const handleTogglePin = (source: CatalogSource) => {
    setPinnedSources((prev) => {
      const exists = prev.some((item) => item.id === source.id);
      if (exists) {
        showToast('Removed source from Saved Bibliography');
        return prev.filter((item) => item.id !== source.id);
      }
      showToast('Pinned source to Saved Bibliography');
      return [source, ...prev];
    });
  };

  const handleNewInquiry = () => {
    setActiveThreadId(null);
    setActiveScreen('research');
  };

  const handleSelectThread = (threadId: string) => {
    setActiveThreadId(threadId);
    setActiveScreen('research');
    const found = threads.find((t) => t.id === threadId);
    if (found) {
      setCollectionScope(found.collectionScope);
    }
  };

  const handleDeleteThread = (threadId: string) => {
    setThreads((prev) => prev.filter((t) => t.id !== threadId));
    if (activeThreadId === threadId) {
      setActiveThreadId(null);
    }
  };

  const handleSelectBookmarkedCatalog = (
    catalog: Exclude<CatalogCollection, 'All Collections'>
  ) => {
    setCollectionScope(catalog);
    setActiveScreen('catalog');
  };

  const handleExportBibliography = () => {
    if (pinnedSources.length > 0) {
      downloadBibTeXFile(pinnedSources);
      showToast(`Exported ${pinnedSources.length} pinned references to .bib`);
      return;
    }

    const threadSources: CatalogSource[] = [];
    activeThread?.messages.forEach((m) => {
      m.citations?.forEach((c) => {
        if (!threadSources.some((s) => s.id === c.source.id)) {
          threadSources.push(c.source);
        }
      });
    });

    if (threadSources.length > 0) {
      downloadBibTeXFile(threadSources);
      showToast(`Exported ${threadSources.length} thread citations to .bib`);
    } else {
      setActiveScreen('bibliography');
      showToast('Pin sources from any answer or catalog record to export .bib');
    }
  };

  const handleSubmitQuery = async (query: string, attachedExcerpt: AttachedExcerpt | null) => {
    const timestamp = getCurrentTimeLabel();
    const userMsg: ChatMessage = {
      id: `msg-u-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp,
      collectionScope,
      attachedExcerpt: attachedExcerpt ?? undefined,
    };

    let targetThreadId = activeThreadId;

    if (!targetThreadId) {
      const newThreadId = `thread-${Date.now()}`;
      const provisionalTitle =
        query.length > 48 ? `${query.slice(0, 48).trim()}...` : query;
      const newThread: ResearchThread = {
        id: newThreadId,
        title: provisionalTitle,
        discipline: collectionScope === 'All Collections' ? 'Interdisciplinary' : collectionScope,
        bucket: 'Today',
        updatedAt: timestamp,
        collectionScope,
        peerReviewedOnly,
        messages: [userMsg],
      };
      setThreads((prev) => [newThread, ...prev]);
      setActiveThreadId(newThreadId);
      targetThreadId = newThreadId;
    } else {
      setThreads((prev) =>
        prev.map((t) =>
          t.id === targetThreadId
            ? { ...t, updatedAt: timestamp, messages: [...t.messages, userMsg] }
            : t
        )
      );
    }

    setIsSynthesizing(true);

    try {
      const priorHistory =
        threads
          .find((t) => t.id === targetThreadId)
          ?.messages.map((m) => ({ role: m.role, content: m.content })) ?? [];

      const relevantCatalog = LIBRARY_CATALOG.filter((item) => {
        if (peerReviewedOnly && !item.peerReviewed) return false;
        if (collectionScope !== 'All Collections' && item.collection !== collectionScope) {
          return false;
        }
        return true;
      });

      const response = await fetch('/api/research/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          collectionScope,
          peerReviewedOnly,
          attachedExcerpt: attachedExcerpt
            ? { title: attachedExcerpt.title, content: attachedExcerpt.content }
            : null,
          history: priorHistory,
          catalogContext: relevantCatalog.length > 0 ? relevantCatalog : LIBRARY_CATALOG,
        }),
      });

      const data = (await response.json()) as ServerInquiryResponse;

      if (!response.ok || data.error) {
        throw new Error(data.error || `Request failed with status ${response.status}`);
      }

      const mappedCitations: CitationRef[] = (data.citedSources || []).map((cited, idx) => {
        const matched = LIBRARY_CATALOG.find((item) => item.id === cited.sourceId);
        const resolvedSource: CatalogSource = matched ?? {
          id: cited.sourceId || `ext-${Date.now()}-${idx}`,
          title: cited.fallbackTitle || 'Referenced Scholarly Monograph',
          authors:
            cited.fallbackAuthors && cited.fallbackAuthors.length > 0
              ? cited.fallbackAuthors
              : ['Research Consortium'],
          year: cited.fallbackYear || 2024,
          journal: cited.fallbackJournal || 'University Research Repository',
          doi: cited.fallbackDoi || '10.1000/scholarly.archive',
          callNumber: 'ARC.DIG.2024',
          collection:
            collectionScope === 'All Collections' ? 'University Archive' : collectionScope,
          discipline: data.discipline || 'Scholarly Inquiry',
          peerReviewed: true,
          citationCount: 24,
          abstract: cited.excerptNote,
          keyFindings: [cited.excerptNote],
          stackLocation: {
            building: 'Digital Repository & Interlibrary Loan',
            floor: 'Digital Archive',
            wing: 'East Periodicals',
            aisle: 'Repository Index',
            shelfCode: 'ILL-REQ',
            availability: 'Digital Repository Only',
            wingIndex: 1,
          },
        };

        return {
          marker: idx + 1,
          source: resolvedSource,
          excerptNote: cited.excerptNote,
        };
      });

      const assistantMsg: ChatMessage = {
        id: `msg-a-${Date.now()}`,
        role: 'assistant',
        content: data.answer,
        timestamp: getCurrentTimeLabel(),
        collectionScope,
        citations: mappedCitations,
        followUpQuestions: data.followUpQuestions || [],
      };

      setThreads((prev) =>
        prev.map((t) =>
          t.id === targetThreadId
            ? {
                ...t,
                title: t.messages.length <= 1 && data.threadTitle ? data.threadTitle : t.title,
                discipline: data.discipline || t.discipline,
                updatedAt: assistantMsg.timestamp,
                messages: [...t.messages, assistantMsg],
              }
            : t
        )
      );
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Unable to reach synthesis service.';
      const errorMsg: ChatMessage = {
        id: `msg-err-${Date.now()}`,
        role: 'assistant',
        content: '',
        timestamp: getCurrentTimeLabel(),
        collectionScope,
        error: message,
      };
      setThreads((prev) =>
        prev.map((t) =>
          t.id === targetThreadId ? { ...t, messages: [...t.messages, errorMsg] } : t
        )
      );
    } finally {
      setIsSynthesizing(false);
    }
  };

  const handleInquireAboutSource = (source: CatalogSource) => {
    setActiveScreen('research');
    setActiveThreadId(null);
    setCollectionScope(source.collection);
    void handleSubmitQuery(
      `Synthesize the methodology, key empirical findings, and scholarly significance of "${source.title}" (${source.authors[0]}, ${source.year}).`,
      null
    );
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-[#F8FAFC] text-[#1E293B]">
      <Sidebar
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        activeScreen={activeScreen}
        onNavigateScreen={setActiveScreen}
        threads={threads}
        activeThreadId={activeThreadId}
        onSelectThread={handleSelectThread}
        onNewInquiry={handleNewInquiry}
        onDeleteThread={handleDeleteThread}
        pinnedCount={pinnedSources.length}
        activeCatalogFilter={collectionScope}
        onSelectBookmarkedCatalog={handleSelectBookmarkedCatalog}
        citationFormat={citationFormat}
        onChangeCitationFormat={setCitationFormat}
        peerReviewedDefault={peerReviewedOnly}
        onTogglePeerReviewedDefault={() => setPeerReviewedOnly((prev) => !prev)}
      />

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <TopBar
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          activeScreen={activeScreen}
          activeThreadTitle={activeThread?.title}
          citationFormat={citationFormat}
          onChangeCitationFormat={setCitationFormat}
          onExportBibliography={handleExportBibliography}
          pinnedCount={pinnedSources.length}
        />

        {activeScreen === 'research' && (
          <ResearchWorkspace
            activeThread={activeThread}
            collectionScope={collectionScope}
            onChangeCollectionScope={setCollectionScope}
            peerReviewedOnly={peerReviewedOnly}
            onTogglePeerReviewedOnly={() => setPeerReviewedOnly((prev) => !prev)}
            citationFormat={citationFormat}
            pinnedIds={pinnedIds}
            onTogglePin={handleTogglePin}
            onLocateInStacks={setStacksModalSource}
            onInspectAbstract={setAbstractDrawerSource}
            onSubmitQuery={handleSubmitQuery}
            isSynthesizing={isSynthesizing}
          />
        )}

        {activeScreen === 'catalog' && (
          <CatalogExplorer
            sources={LIBRARY_CATALOG}
            activeCollection={collectionScope}
            onChangeCollection={setCollectionScope}
            pinnedIds={pinnedIds}
            onTogglePin={handleTogglePin}
            onLocateInStacks={setStacksModalSource}
            onInspectAbstract={setAbstractDrawerSource}
            onInquireAboutSource={handleInquireAboutSource}
          />
        )}

        {activeScreen === 'bibliography' && (
          <BibliographyView
            pinnedSources={pinnedSources}
            citationFormat={citationFormat}
            onChangeCitationFormat={setCitationFormat}
            onRemovePin={handleTogglePin}
            onLocateInStacks={setStacksModalSource}
            onExportBibTeX={handleExportBibliography}
            onBrowseCatalog={() => setActiveScreen('catalog')}
          />
        )}
      </div>

      {/* Physical Library Stacks Locator Modal */}
      <StacksLocationModal
        source={stacksModalSource}
        onClose={() => setStacksModalSource(null)}
      />

      {/* Full Paper Abstract & Metadata Drawer */}
      <AbstractDrawer
        source={abstractDrawerSource}
        citationFormat={citationFormat}
        isPinned={abstractDrawerSource ? pinnedIds.has(abstractDrawerSource.id) : false}
        onClose={() => setAbstractDrawerSource(null)}
        onTogglePin={handleTogglePin}
        onLocateInStacks={setStacksModalSource}
        onInquireAboutSource={handleInquireAboutSource}
      />

      {/* Subtle Toast Confirmation */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-[10px] bg-[#102342] text-white text-[13px] font-medium shadow-popover"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
