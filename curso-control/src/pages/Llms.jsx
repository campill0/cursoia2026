import React from 'react';
import { MarkdownRenderer } from '../components/ui/MarkdownRenderer';
import { getLLMContent } from '../lib/content';
import { CompleteButton } from '../components/ui/CompleteButton';

export const Llms = () => {
    const content = getLLMContent();

    if (!content) {
        return <div className="text-slate-500 p-8">Cargando contenido...</div>;
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="sr-only">Fundamentos de LLMs</h1>
            <MarkdownRenderer content={content} />
            <CompleteButton moduleId="llms" />
        </div>
    );
};
