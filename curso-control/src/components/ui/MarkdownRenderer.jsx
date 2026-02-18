import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '../../lib/utils';

// ─── Highlight helper ────────────────────────────────────────────────────────
/**
 * Recursively walks React children and wraps text nodes that contain
 * `query` with a <mark> element so the search highlight works inside
 * any markdown element (p, li, h1…).
 */
function highlightChildren(children, query) {
    if (!query) return children;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const splitRegex = new RegExp(`(${escaped})`, 'gi');
    const lowerQuery = query.toLowerCase();

    return React.Children.map(children, child => {
        if (typeof child === 'string') {
            const parts = child.split(splitRegex);
            if (parts.length === 1) return child;
            return parts.map((part, i) =>
                part.toLowerCase() === lowerQuery
                    ? <mark key={i} className="search-highlight">{part}</mark>
                    : part
            );
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
