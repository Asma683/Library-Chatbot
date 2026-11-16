import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

interface CatalogContextItem {
  id: string;
  title: string;
  authors: string[];
  year: number;
  journal: string;
  doi: string;
  callNumber: string;
  collection: string;
  peerReviewed: boolean;
  abstract: string;
  keyFindings: string[];
}

interface HistoryTurn {
  role: 'user' | 'assistant';
  content: string;
}

interface InquiryBody {
  query: string;
  collectionScope?: string;
  peerReviewedOnly?: boolean;
  attachedExcerpt?: {
    title: string;
    content: string;
  } | null;
  history?: HistoryTurn[];
  catalogContext?: CatalogContextItem[];
}

const app = express();
app.use(express.json({ limit: '1mb' }));

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'academic-intelligence' });
});

app.post('/api/research/inquire', async (req, res) => {
  try {
    const body = req.body as InquiryBody;
    const query = (body?.query || '').trim();
    if (!query) {
      res.status(400).json({ error: 'Research inquiry query cannot be empty.' });
      return;
    }

    const ai = getGeminiClient();
    if (!ai) {
      res.status(503).json({
        error:
          'GEMINI_API_KEY is not configured in the server environment. Set it in Settings > Secrets to enable live scholarly synthesis.',
      });
      return;
    }

    const catalogContext = Array.isArray(body.catalogContext) ? body.catalogContext : [];
    const collectionScope = body.collectionScope || 'All Collections';
    const peerReviewedOnly = Boolean(body.peerReviewedOnly);

    const catalogText = catalogContext
      .map(
        (item, idx) =>
          `[SourceID: ${item.id}] (#${idx + 1})\nTitle: ${item.title}\nAuthors: ${item.authors.join(', ')} (${item.year})\nJournal: ${item.journal} | Collection: ${item.collection} | Peer-Reviewed: ${item.peerReviewed}\nDOI: ${item.doi} | Call Number: ${item.callNumber}\nAbstract: ${item.abstract}\nKey Findings: ${item.keyFindings.join(' ; ')}`
      )
      .join('\n\n');

    const historyText = (body.history || [])
      .slice(-6)
      .map((turn) => `${turn.role === 'user' ? 'Scholar' : 'Assistant'}: ${turn.content}`)
      .join('\n\n');

    const excerptText = body.attachedExcerpt
      ? `\nAttached Manuscript / Excerpt ("${body.attachedExcerpt.title}"):\n"""\n${body.attachedExcerpt.content.slice(0, 4000)}\n"""\n`
      : '';

    const systemInstruction = `You are Academic Intelligence, an authoritative university library research assistant and scholarly synthesis engine.
Your role is to provide rigorous, measured, transparent academic answers grounded in verified scholarly literature.

Rules:
1. Write in clear, high-precision academic prose separated into well-structured paragraphs (2-4 paragraphs). Never use markdown bullet clutter or hype.
2. When referencing sources from the provided University Library Catalog below, embed inline numeric citation markers like [1], [2], [3] directly inside the sentences where the claim is supported.
3. Every inline marker [N] you embed MUST correspond to the 1-based index of the array returned in "citedSources" (so [1] corresponds to citedSources[0], [2] to citedSources[1], etc.).
4. Prefer citing relevant works from the provided catalog context using their exact sourceId. If the user asks about a topic outside the catalog excerpt, you may synthesize general peer-reviewed scholarly knowledge clearly and also generate accurate external scholarly reference metadata only if genuinely needed, OR match the closest catalog works. Whenever matching a catalog item, set "isFromCatalog": true and provide its exact "sourceId".
5. Respect the active search filter: Collection="${collectionScope}", PeerReviewedOnly=${peerReviewedOnly}.
6. Provide 2-3 thoughtful, concise follow-up research questions a doctoral researcher would naturally ask next.`;

    const prompt = `Active Collection Filter: ${collectionScope} (Peer-Reviewed Only: ${peerReviewedOnly})

${historyText ? `Prior Conversation Context:\n${historyText}\n\n` : ''}${excerptText}University Library Catalog Corpus:
${catalogText}

Current Scholarly Inquiry:
${query}`;

    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            answer: {
              type: Type.STRING,
              description:
                'Rigorous multi-paragraph academic synthesis with inline citation markers [1], [2], etc. matching citedSources order.',
            },
            threadTitle: {
              type: Type.STRING,
              description: 'Concise 4-7 word scholarly thread title summarizing this inquiry.',
            },
            discipline: {
              type: Type.STRING,
              description: 'Academic discipline label (e.g., Computational Epistemology, Biophysics).',
            },
            citedSources: {
              type: Type.ARRAY,
              description: 'Ordered list of sources referenced by [1], [2], ... in the answer.',
              items: {
                type: Type.OBJECT,
                properties: {
                  sourceId: {
                    type: Type.STRING,
                    description: 'Exact SourceID from the catalog if matched, or a generated slug if external.',
                  },
                  isFromCatalog: {
                    type: Type.BOOLEAN,
                    description: 'True if this source exists in the provided University Library Catalog.',
                  },
                  excerptNote: {
                    type: Type.STRING,
                    description: 'One-sentence synthesis note explaining what specific evidence this source supports.',
                  },
                  fallbackTitle: {
                    type: Type.STRING,
                    description: 'Paper or monograph title if not from catalog.',
                  },
                  fallbackAuthors: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: 'Author list in Last, F. format if not from catalog.',
                  },
                  fallbackYear: {
                    type: Type.INTEGER,
                    description: 'Publication year if not from catalog.',
                  },
                  fallbackJournal: {
                    type: Type.STRING,
                    description: 'Journal or publisher name if not from catalog.',
                  },
                  fallbackDoi: {
                    type: Type.STRING,
                    description: 'DOI string or archival reference ID if not from catalog.',
                  },
                },
                required: ['sourceId', 'isFromCatalog', 'excerptNote'],
              },
            },
            followUpQuestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '2 to 3 concise scholarly follow-up questions.',
            },
          },
          required: ['answer', 'threadTitle', 'discipline', 'citedSources', 'followUpQuestions'],
        },
      },
    });

    const rawText = (response.text ?? '{}').trim();
    const parsed = JSON.parse(rawText);
    res.json(parsed);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unexpected server error while synthesizing research inquiry.';
    console.error('Research inquiry error:', err);
    res.status(500).json({ error: message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Academic Intelligence server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
