export type CatalogCollection =
  | 'All Collections'
  | 'JSTOR'
  | 'IEEE Xplore'
  | 'PubMed Central'
  | 'University Archive';

export type CitationFormat = 'APA 7th' | 'MLA 9th' | 'Chicago 17th' | 'IEEE' | 'BibTeX';

export type WorkspaceScreen = 'research' | 'catalog' | 'bibliography';

export interface StackLocation {
  building: string;
  floor: string;
  wing: string;
  aisle: string;
  shelfCode: string;
  availability: 'Available on Shelf' | 'Digital Repository Only' | 'Special Collections Reading Room';
  wingIndex: number; // 0: North Stacks, 1: East Periodicals, 2: South Science, 3: Special Archives
}

export interface CatalogSource {
  id: string;
  title: string;
  authors: string[];
  year: number;
  journal: string;
  volumeIssue?: string;
  pages?: string;
  doi: string;
  callNumber: string;
  isbnOrIssn?: string;
  collection: Exclude<CatalogCollection, 'All Collections'>;
  discipline: string;
  peerReviewed: boolean;
  abstract: string;
  keyFindings: string[];
  stackLocation: StackLocation;
  citationCount: number;
}

export interface CitationRef {
  marker: number; // e.g., 1 for [1]
  source: CatalogSource;
  excerptNote: string;
}

export interface AttachedExcerpt {
  title: string;
  content: string;
  charCount: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  collectionScope?: CatalogCollection;
  attachedExcerpt?: AttachedExcerpt;
  citations?: CitationRef[];
  followUpQuestions?: string[];
  error?: string;
}

export interface ResearchThread {
  id: string;
  title: string;
  discipline: string;
  bucket: 'Today' | 'Previous 7 Days';
  updatedAt: string;
  collectionScope: CatalogCollection;
  peerReviewedOnly: boolean;
  messages: ChatMessage[];
}
