// src/components/today/FormattedAIResponse.tsx
'use client';

import React from 'react';
import { Sparkles, Hash, ArrowRight } from 'lucide-react';

interface Props {
  content: string;
}

/**
 * Pre-processes and normalizes markdown to ensure collapsed or single-line
 * LLM outputs are expanded into clean block structures.
 */
function normalizeMarkdown(text: string): string {
  if (!text) return '';
  let s = text.trim();

  // 1. Separate dividers: '---'
  s = s.replace(/(\s*)(---|===|\*\*\*)(\s*)/g, '\n\n---\n\n');

  // 2. Separate headings: e.g. '### 1.' or '## ' or '# '
  s = s.replace(/([^\n])\s*(#{1,4}\s+)/g, '$1\n\n$2');

  // 3. Separate headings from trailing text or lists on the same line: e.g. '### Title * **Bullet**'
  s = s.replace(/(#{1,4}\s+[^\n*]+?)\s+([\*\-]\s+)/g, '$1\n$2');

  // 4. Separate bullets: e.g. '. * **Item**' or 'text * **Item**'
  s = s.replace(/([.!?\)\'\"]|\b)\s+([\*\-]\s+(?:\*\*)?)/g, '$1\n$2');

  // 5. Separate ordered lists: e.g. ': 1. **' or '. 2. **'
  s = s.replace(/([.!?:\)\'\"])\s+(\d+\.\s+)/g, '$1\n$2');

  // 6. Separate prominent bold titles starting a new thought
  s = s.replace(/([.!?])\s+(\*\*[A-Z][^*]+?\*\*:?)/g, '$1\n\n$2');

  return s;
}

/**
 * Parses and renders inline markdown: **bold**, *italic*, `code`, and [links](url)
 */
function renderInlineContent(text: string): React.ReactNode {
  // Regex to match **bold**, *italic*, `code`, and [label](url)
  const tokenRegex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const token = match[0];
    const key = `token-${match.index}`;

    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={key} className="font-semibold text-white tracking-wide">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      parts.push(
        <em key={key} className="italic text-emerald-200/90 font-medium">
          {token.slice(1, -1)}
        </em>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code
          key={key}
          className="px-1.5 py-0.5 mx-0.5 rounded-md bg-zinc-800/90 border border-zinc-700/60 text-emerald-300 font-mono text-[11px]"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('[') && token.includes('](')) {
      const linkMatch = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        parts.push(
          <a
            key={key}
            href={linkMatch[2]}
            className="text-sky-400 hover:text-sky-300 underline underline-offset-2 transition-colors font-medium"
          >
            {linkMatch[1]}
          </a>
        );
      } else {
        parts.push(token);
      }
    } else {
      parts.push(token);
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export function FormattedAIResponse({ content }: Props) {
  if (!content) return null;

  const normalized = normalizeMarkdown(content);
  const rawLines = normalized.split(/\r?\n/);

  const elements: React.ReactNode[] = [];
  let currentListItems: React.ReactNode[] = [];
  let listType: 'ul' | 'ol' | null = null;

  const flushList = () => {
    if (currentListItems.length > 0 && listType) {
      const key = `list-${elements.length}`;
      if (listType === 'ul') {
        elements.push(
          <ul key={key} className="space-y-2.5 my-3 pl-0.5">
            {currentListItems}
          </ul>
        );
      } else {
        elements.push(
          <ol key={key} className="space-y-2.5 my-3 pl-0.5">
            {currentListItems}
          </ol>
        );
      }
      currentListItems = [];
      listType = null;
    }
  };

  rawLines.forEach((rawLine, index) => {
    const trimmed = rawLine.trim();

    // 1. Empty lines
    if (!trimmed) {
      flushList();
      return;
    }

    // 2. Horizontal divider: --- or ***
    if (/^(\-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      flushList();
      elements.push(
        <div key={`hr-${index}`} className="my-6 border-t border-white/[0.08] relative">
          <div className="absolute left-1/2 -top-1.5 -translate-x-1/2 px-2.5 bg-[#0a0d14] text-[10px] font-mono text-zinc-600 tracking-widest">
            ✦ ✦ ✦
          </div>
        </div>
      );
      return;
    }

    // 3. Headings: #, ##, ###
    if (trimmed.startsWith('#')) {
      flushList();
      if (trimmed.startsWith('###')) {
        const headingText = trimmed.replace(/^###\s*/, '');
        elements.push(
          <div
            key={`h3-${index}`}
            className="mt-6 mb-3 flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-950/30 border border-emerald-500/25 text-emerald-300 font-bold text-xs sm:text-sm tracking-wide shadow-sm"
          >
            <Hash className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{renderInlineContent(headingText)}</span>
          </div>
        );
        return;
      } else if (trimmed.startsWith('##')) {
        const headingText = trimmed.replace(/^##\s*/, '');
        elements.push(
          <h3
            key={`h2-${index}`}
            className="text-sm sm:text-base font-bold text-white mt-6 mb-2.5 pb-1.5 border-b border-zinc-800 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{renderInlineContent(headingText)}</span>
          </h3>
        );
        return;
      } else {
        const headingText = trimmed.replace(/^#\s*/, '');
        elements.push(
          <h2
            key={`h1-${index}`}
            className="text-base sm:text-lg font-bold text-emerald-400 mt-6 mb-3 flex items-center gap-2"
          >
            <span>{renderInlineContent(headingText)}</span>
          </h2>
        );
        return;
      }
    }

    // 4. Blockquotes: > quote
    if (trimmed.startsWith('>')) {
      flushList();
      const quoteText = trimmed.replace(/^>\s*/, '');
      elements.push(
        <blockquote
          key={`quote-${index}`}
          className="border-l-2 border-emerald-400 pl-4 py-2.5 my-3.5 bg-emerald-950/20 text-emerald-200 text-xs sm:text-sm italic rounded-r-xl leading-relaxed"
        >
          {renderInlineContent(quoteText)}
        </blockquote>
      );
      return;
    }

    // 5. Unordered List Items: * or - or +
    const ulMatch = trimmed.match(/^[\*\-\+]\s+(.*)$/);
    if (ulMatch) {
      if (listType !== 'ul') {
        flushList();
        listType = 'ul';
      }
      currentListItems.push(
        <li key={`ul-item-${index}`} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed group">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.7)] group-hover:scale-125 transition-transform" />
          <div className="flex-1">{renderInlineContent(ulMatch[1])}</div>
        </li>
      );
      return;
    }

    // 6. Ordered List Items: 1. or 2. etc.
    const olMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (olMatch) {
      if (listType !== 'ol') {
        flushList();
        listType = 'ol';
      }
      const num = olMatch[1];
      const itemText = olMatch[2];
      currentListItems.push(
        <li key={`ol-item-${index}`} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shrink-0 mt-0.5">
            {num}
          </span>
          <div className="flex-1">{renderInlineContent(itemText)}</div>
        </li>
      );
      return;
    }

    // 7. Regular paragraph text
    flushList();
    elements.push(
      <p key={`p-${index}`} className="text-xs sm:text-sm text-zinc-300 leading-relaxed my-2.5 font-normal">
        {renderInlineContent(trimmed)}
      </p>
    );
  });

  flushList();

  return <div className="space-y-1 font-sans">{elements}</div>;
}
