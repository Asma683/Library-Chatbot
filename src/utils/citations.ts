import type { CatalogSource, CitationFormat } from '../types/academic';

function formatAuthorsAPA(authors: string[]): string {
  if (authors.length === 0) return 'Anonymous';
  if (authors.length === 1) return authors[0];
  if (authors.length === 2) return `${authors[0]}, & ${authors[1]}`;
  return `${authors.slice(0, -1).join(', ')}, & ${authors[authors.length - 1]}`;
}

function formatAuthorsMLA(authors: string[]): string {
  if (authors.length === 0) return 'Anonymous';
  if (authors.length === 1) return authors[0];
  if (authors.length === 2) return `${authors[0]}, and ${authors[1]}`;
  return `${authors[0]}, et al.`;
}

function formatAuthorsIEEE(authors: string[]): string {
  if (authors.length === 0) return 'Anonymous';
  if (authors.length <= 3) return authors.join(', ');
  return `${authors[0]} et al.`;
}

export function formatCitation(source: CatalogSource, format: CitationFormat): string {
  const vol = source.volumeIssue ? `, ${source.volumeIssue}` : '';
  const pages = source.pages ? `, pp. ${source.pages}` : '';
  const doiUrl = source.doi.startsWith('http') ? source.doi : `https://doi.org/${source.doi}`;

  switch (format) {
    case 'APA 7th':
      return `${formatAuthorsAPA(source.authors)} (${source.year}). ${source.title}. ${source.journal}${vol}${pages}. ${doiUrl}`;

    case 'MLA 9th':
      return `${formatAuthorsMLA(source.authors)}. "${source.title}." ${source.journal}${vol ? `, ${source.volumeIssue}` : ''} (${source.year})${source.pages ? `: ${source.pages}` : ''}. ${doiUrl}.`;

    case 'Chicago 17th':
      return `${formatAuthorsMLA(source.authors)}. "${source.title}." ${source.journal}${vol ? ` ${source.volumeIssue}` : ''} (${source.year})${source.pages ? `: ${source.pages}` : ''}. ${doiUrl}.`;

    case 'IEEE':
      return `${formatAuthorsIEEE(source.authors)}, "${source.title}," ${source.journal}${vol}${pages}, ${source.year}, doi: ${source.doi}.`;

    case 'BibTeX': {
      const firstLast = (source.authors[0] || 'author')
        .split(',')[0]
        .toLowerCase()
        .replace(/[^a-z]/g, '');
      const firstWord = source.title
        .toLowerCase()
        .replace(/[^a-z\s]/g, '')
        .split(/\s+/)[0] || 'work';
      const citeKey = `${firstLast}${source.year}${firstWord}`;
      return `@article{${citeKey},\n  author  = {${source.authors.join(' and ')}},\n  title   = {${source.title}},\n  journal = {${source.journal}},\n  year    = {${source.year}}${source.volumeIssue ? `,\n  volume  = {${source.volumeIssue}}` : ''}${source.pages ? `,\n  pages   = {${source.pages}}` : ''},\n  doi     = {${source.doi}}\n}`;
    }
  }
}

export function downloadBibTeXFile(sources: CatalogSource[], filename = 'academic-intelligence-bibliography.bib'): void {
  const content = sources.map((s) => formatCitation(s, 'BibTeX')).join('\n\n');
  const blob = new Blob([content], { type: 'application/x-bibtex;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
