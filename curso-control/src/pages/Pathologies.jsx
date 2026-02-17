import React from 'react';
import { MarkdownRenderer } from '../components/ui/MarkdownRenderer';
import { getPathologiesContent } from '../lib/content';
import { CompleteButton } from '../components/ui/CompleteButton';

export const Pathologies = () => {
    const content = getPathologiesContent();

    if (!content) {
        return <div className="text-slate-500 p-8">Cargando contenido...</div>;
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="sr-only">Patologías de los Modelos</h1>
            <MarkdownRenderer content={content} />
            <CompleteButton moduleId="pathologies" />
        </div>
    );
};
