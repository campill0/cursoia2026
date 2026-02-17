import React from 'react';
import { MarkdownRenderer } from '../components/ui/MarkdownRenderer';
import { getControlContent } from '../lib/content';
import { CompleteButton } from '../components/ui/CompleteButton';

export const Control = () => {
    const content = getControlContent();

    if (!content) {
        return <div className="text-slate-500 p-8">Cargando contenido...</div>;
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="sr-only">Framework C.O.N.T.R.O.L.</h1>

            <div className="mb-8 p-6 bg-slate-900 border border-control-primary/30 rounded-xl relative overflow-hidden shadow-lg shadow-control-primary/5">
                <div className="absolute -top-6 -right-6 p-4 opacity-5 font-black text-9xl text-control-primary select-none pointer-events-none rotate-12">
                    C
                </div>
                <h2 className="text-2xl font-bold text-control-primary mb-2 relative z-10 flex items-center gap-3">
                    <span className="w-8 h-8 rounded bg-control-primary text-slate-950 flex items-center justify-center text-lg font-black shadow-lg shadow-control-primary/20">C</span>
                    Método C.O.N.T.R.O.L.
                </h2>
                <p className="text-slate-300 relative z-10 max-w-2xl leading-relaxed">
                    Un sistema estructurado en 7 fases para garantizar la calidad, coherencia y seguridad de tus interacciones con LLMs.
                </p>
            </div>

            <MarkdownRenderer content={content} />

            <div className="mt-16 mb-8 p-8 bg-slate-900/30 border border-dashed border-slate-700/50 rounded-xl text-center">
                <h3 className="text-lg font-semibold text-slate-400 mb-2">Herramienta Interactiva</h3>
                <p className="text-slate-500 text-sm">
                    Próximamente disponible en la Fase 2 del proyecto.
                </p>
            </div>

            <CompleteButton moduleId="control" />
        </div>
    );
};
