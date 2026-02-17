import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '../../lib/utils';

export const MarkdownRenderer = ({ content, className }) => {
    return (
        <article className={cn("prose prose-invert prose-lg max-w-none text-slate-300", className)}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ node, ...props }) => <h1 className="text-3xl font-bold bg-gradient-to-r from-control-primary to-control-secondary bg-clip-text text-transparent mt-8 mb-4" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold text-slate-100 mt-6 mb-3 border-b border-slate-800 pb-2" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-xl font-medium text-control-primary mt-4 mb-2" {...props} />,
                    p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                    a: ({ node, ...props }) => <a className="text-control-accent hover:text-pink-400 underline transition-colors" {...props} />,
                    ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4 space-y-1" {...props} />,
                    ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4 space-y-1" {...props} />,
                    li: ({ node, ...props }) => <li className="pl-1" {...props} />,
                    blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-control-secondary/50 bg-slate-900/50 p-4 rounded-r-lg italic my-4" {...props} />,
                    code: ({ node, inline, className, children, ...props }) => {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline ? (
                            <pre className="bg-slate-900 border border-slate-800 rounded-lg p-4 overflow-x-auto my-4 text-sm font-mono text-slate-300">
                                <code className={className} {...props}>
                                    {children}
                                </code>
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
