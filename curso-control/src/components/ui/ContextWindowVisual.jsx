import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

const TOKEN_LABELS = [
    { text: 'System Prompt', type: 'system' },
    { text: 'Instrucciones', type: 'system' },
    { text: 'Rol definido', type: 'system' },
    { text: 'Documento PDF', type: 'context' },
    { text: 'Datos empresa', type: 'context' },
    { text: 'Historial chat', type: 'context' },
    { text: '...zona media...', type: 'lost' },
    { text: '...se comba...', type: 'lost' },
    { text: '...la atención...', type: 'lost' },
    { text: 'Pregunta reciente', type: 'recent' },
    { text: 'Tu último mensaje', type: 'recent' },
    { text: 'Output del modelo', type: 'recent' },
];

const typeColors = {
    system: { bg: 'bg-electric-cyan/20', border: 'border-electric-cyan/40', text: 'text-electric-cyan' },
    context: { bg: 'bg-neon-magenta/15', border: 'border-neon-magenta/30', text: 'text-neon-magenta' },
    lost: { bg: 'bg-muted/10', border: 'border-muted/20', text: 'text-muted/50' },
    recent: { bg: 'bg-emerald-glow/20', border: 'border-emerald-glow/40', text: 'text-emerald-glow' },
};

export const ContextWindowVisual = () => {
    const [activeToken, setActiveToken] = useState(null);
    const [attentionCurve, setAttentionCurve] = useState([]);

    useEffect(() => {
        // Generate U-shaped attention curve
        const curve = TOKEN_LABELS.map((_, i) => {
            const mid = TOKEN_LABELS.length / 2;
            const dist = Math.abs(i - mid) / mid;
            return 0.2 + dist * 0.8; // U-shape: high at edges, low in middle
        });
        setAttentionCurve(curve);
    }, []);

    return (
        <div className="relative bg-deep-slate border border-surface-3 rounded-2xl p-6 lg:p-8 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-electric-cyan flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-electric-cyan animate-pulse" />
                        Mesa de Trabajo
                    </h3>
                    <p className="text-xs font-mono text-muted mt-1">CONTEXT WINDOW · ~128K tokens</p>
                </div>
                <div className="text-xs font-mono text-muted/60 hidden md:block">
                    Atención en forma de U
                </div>
            </div>

            {/* Attention curve visualization */}
            <div className="mb-4 flex items-end gap-0.5 h-8">
                {attentionCurve.map((val, i) => (
                    <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${val * 100}%` }}
                        transition={{ delay: i * 0.05, type: 'spring', stiffness: 200 }}
                        className={cn(
                            "flex-1 rounded-t-sm transition-colors duration-200",
                            TOKEN_LABELS[i].type === 'lost' ? 'bg-muted/20' :
                                TOKEN_LABELS[i].type === 'system' ? 'bg-electric-cyan/40' :
                                    TOKEN_LABELS[i].type === 'recent' ? 'bg-emerald-glow/40' : 'bg-neon-magenta/30',
                            activeToken === i && 'opacity-100 brightness-150'
                        )}
                    />
                ))}
            </div>

            {/* Token grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {TOKEN_LABELS.map((token, i) => {
                    const colors = typeColors[token.type];
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.04 }}
                            whileHover={{ scale: 1.05 }}
                            onHoverStart={() => setActiveToken(i)}
                            onHoverEnd={() => setActiveToken(null)}
                            className={cn(
                                "px-3 py-2 rounded-lg border text-xs font-mono cursor-default transition-all",
                                colors.bg, colors.border, colors.text,
                                token.type === 'lost' && 'opacity-50 italic'
                            )}
                        >
                            {token.text}
                        </motion.div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-surface-3 flex flex-wrap gap-4 text-xs">
                {[
                    { label: 'System / Inicio', color: 'bg-electric-cyan' },
                    { label: 'Contexto adjunto', color: 'bg-neon-magenta' },
                    { label: 'Lost in the Middle', color: 'bg-muted' },
                    { label: 'Input reciente', color: 'bg-emerald-glow' },
                ].map(item => (
                    <div key={item.label} className="flex items-center gap-2">
                        <div className={cn("w-2 h-2 rounded-full", item.color)} />
                        <span className="text-muted">{item.label}</span>
                    </div>
                ))}
            </div>

            {/* Decorative gradient */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-electric-cyan/5 rounded-full blur-3xl pointer-events-none" />
        </div>
    );
};
