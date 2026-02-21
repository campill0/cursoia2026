import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '../../lib/utils';
import { ConceptTooltip } from './ConceptTooltip';

// ─── Highlight & Glossary helper ─────────────────────────────────────────────
/**
 * Recursively walks React children and wraps:
 * 1. Search queries with <mark>
 * 2. Glossary terms with <ConceptTooltip>
 */
const glossaryTerms = [
    "omni-rol",
    "clústeres específicos de procesamiento",
    "trade-offs",
    "síndrome del impostor",
    "espacio de búsqueda del modelo",
    "clústeres latentes",
    "heurísticas",
    "deducción abductiva",
    "arquitectura cognitiva",
    "domain priming",
    "sicofancia",
    "sycophancy",
    "rlhf",
    "ilusión de fluidez",
    "fluidez engañosa",
    "deceptive fluency",
    "alucinación por complacencia",
    "rag",
    "knowledge cutoff",
    "prompt injection",
    "overrefusal",
    "sobre-rechazo",
    "factual",
    "scratchpad"
]; // Add more lowercased terms here as needed

function processTextNode(text, query) {
    let result = [text];

    // 1. First split by glossary terms
    glossaryTerms.forEach(term => {
        const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        let regexStr = `(?<=\\b|\\s)(${escapedTerm})(?=\\b|\\s|s\\b)`;

        // Excepción: no vincular "sicofancia" o "sycophancy" cuando va seguido de " social"
        if (term === "sicofancia" || term === "sycophancy") {
            regexStr = `(?<=\\b|\\s)(${escapedTerm})(?!\\s+social\\b)(?=\\b|\\s|s\\b)`;
        }

        const termRegex = new RegExp(regexStr, 'gi'); // matches term including plurals/spaces

        const newResult = [];
        result.forEach(part => {
            if (typeof part !== 'string') {
                newResult.push(part);
                return;
            }
            const parts = part.split(termRegex);
            parts.forEach(p => {
                if (p === undefined) return;
                if (p.toLowerCase().startsWith(term.toLowerCase())) {
                    // It's a glossary term. Wrap it.
                    newResult.push(
                        <ConceptTooltip key={Math.random()} term={term}>{p}</ConceptTooltip>
                    );
                } else if (p) {
                    newResult.push(p);
                }
            });
        });
        result = newResult;
    });

    // 2. Then split by search query if exists
    if (query) {
        const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const queryRegex = new RegExp(`(${escapedQuery})`, 'gi');
        const lowerQuery = query.toLowerCase();

        const finalResult = [];
        result.forEach(part => {
            if (typeof part !== 'string') {
                finalResult.push(part);
                return;
            }
            const parts = part.split(queryRegex);
            parts.forEach(p => {
                if (p.toLowerCase() === lowerQuery) {
                    finalResult.push(<mark key={Math.random()} className="search-highlight">{p}</mark>);
                } else if (p) {
                    finalResult.push(p);
                }
            });
        });
        result = finalResult;
    }

    return result;
}

function highlightChildren(children, query) {
    return React.Children.map(children, child => {
        if (typeof child === 'string') {
            return processTextNode(child, query);
        }
        if (React.isValidElement(child) && child.props.children) {
            return React.cloneElement(child, {
                children: highlightChildren(child.props.children, query),
            });
        }
        return child;
    });
}

// ─── Component ───────────────────────────────────────────────────────────────
export const MarkdownRenderer = ({ content, className, searchQuery }) => {

    // Factory: wraps a base component so its children get highlighted
    const hl = (Tag, extraClass) => ({ node, children, ...props }) => (
        <Tag className={extraClass} {...props}>
            {highlightChildren(children, searchQuery)}
        </Tag>
    );

    return (
        <article className={cn("prose prose-invert prose-lg max-w-none text-slate-300", className)}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: hl('h1', 'text-3xl font-bold bg-gradient-to-r from-control-primary to-control-secondary bg-clip-text text-transparent mt-8 mb-4'),
                    h2: hl('h2', 'text-2xl font-semibold text-slate-100 mt-6 mb-3 border-b border-slate-800 pb-2'),
                    h3: hl('h3', 'text-xl font-medium text-control-primary mt-4 mb-2'),
                    p: hl('p', 'mb-4 leading-relaxed'),
                    li: hl('li', 'pl-1'),
                    // Table cells
                    td: hl('td', ''),
                    th: hl('th', ''),
                    // Blockquote
                    blockquote: hl('blockquote', 'border-l-4 border-control-secondary/50 bg-slate-900/50 p-4 rounded-r-lg italic my-4'),
                    // Pass-through (no highlight needed inside code)
                    a: ({ node, ...props }) => <a className="text-control-accent hover:text-pink-400 underline transition-colors" {...props} />,
                    ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4 space-y-1" {...props} />,
                    ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4 space-y-1" {...props} />,
                    code: ({ node, inline, className: cls, children, ...props }) => {
                        return !inline ? (
                            <pre className="bg-slate-900 border border-slate-800 rounded-lg p-4 overflow-x-auto my-4 text-sm font-mono text-slate-300">
                                <code className={cls} {...props}>{children}</code>
                            </pre>
                        ) : (
                            <code className="bg-slate-800 text-control-primary px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                                {children}
                            </code>
                        );
                    },
                    img: ({ node, ...props }) => <img className="rounded-xl border border-slate-800 shadow-lg my-6 mx-auto" {...props} />,
                }}
            >
                {content}
            </ReactMarkdown>
        </article>
    );
};
