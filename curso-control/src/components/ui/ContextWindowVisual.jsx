import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

/* ─── Token Stream Data ─── */
const TOKENS = [
    { text: 'Actúa como un', type: 'system', role: 'System Prompt' },
    { text: 'experto en IA', type: 'system', role: 'System Prompt' },
    { text: 'con 20 años', type: 'system', role: 'System Prompt' },
    { text: 'de experiencia.', type: 'system', role: 'System Prompt' },
    { text: '[PDF p.1-5]', type: 'context', role: 'Contexto' },
    { text: '[PDF p.6-12]', type: 'context', role: 'Contexto' },
    { text: '[PDF p.13-20]', type: 'context', role: 'Contexto' },
    { text: '[Historial]', type: 'context', role: 'Contexto' },
    { text: '...datos...', type: 'lost', role: 'Zona Ciega' },
    { text: '...perdidos...', type: 'lost', role: 'Zona Ciega' },
    { text: '...aquí...', type: 'lost', role: 'Zona Ciega' },
    { text: '¿Cuáles son', type: 'user', role: 'Tu Prompt' },
    { text: 'las mejores', type: 'user', role: 'Tu Prompt' },
    { text: 'prácticas?', type: 'user', role: 'Tu Prompt' },
    { text: '→ Respuesta', type: 'output', role: 'Output' },
    { text: '→ del modelo', type: 'output', role: 'Output' },
];

const typeStyles = {
    system: {
        bg: 'bg-electric-cyan/15',
        border: 'border-electric-cyan/30',
        text: 'text-electric-cyan',
        dot: 'bg-electric-cyan',
        hoverBorder: 'hover:border-electric-cyan/60',
    },
    context: {
        bg: 'bg-neon-magenta/12',
        border: 'border-neon-magenta/25',
        text: 'text-neon-magenta',
        dot: 'bg-neon-magenta',
        hoverBorder: 'hover:border-neon-magenta/50',
    },
    lost: {
        bg: 'bg-muted/8',
        border: 'border-muted/15',
        text: 'text-muted/40',
        dot: 'bg-muted/40',
        hoverBorder: 'hover:border-muted/30',
    },
    user: {
        bg: 'bg-emerald-glow/15',
        border: 'border-emerald-glow/30',
        text: 'text-emerald-glow',
        dot: 'bg-emerald-glow',
        hoverBorder: 'hover:border-emerald-glow/60',
    },
    output: {
        bg: 'bg-amber-glow/12',
        border: 'border-amber-glow/25',
        text: 'text-amber-glow',
        dot: 'bg-amber-glow',
        hoverBorder: 'hover:border-amber-glow/50',
    },
};

export const ContextWindowVisual = () => {
    const [activeToken, setActiveToken] = useState(null);
    const [attentionCurve, setAttentionCurve] = useState([]);

    useEffect(() => {
        const curve = TOKENS.map((_, i) => {
            const mid = TOKENS.length / 2;
            const dist = Math.abs(i - mid) / mid;
            return 0.15 + dist * 0.85;
        });
        setAttentionCurve(curve);
    }, []);

    const activeType = activeToken !== null ? TOKENS[activeToken] : null;

    return (
        <div className="relative bg-deep-slate border border-surface-3 rounded-2xl p-6 lg:p-8 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-electric-cyan flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-electric-cyan animate-pulse" />
                        Mesa de Trabajo
                    </h3>
                    <p className="text-xs font-mono text-muted mt-1">TOKEN STREAM · ~128K tokens</p>
                </div>
                {activeType && (
                    <motion.div
                        key={activeType.role}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={cn("text-xs font-mono px-3 py-1 rounded-full border", typeStyles[activeType.type].bg, typeStyles[activeType.type].border, typeStyles[activeType.type].text)}
                    >
                        {activeType.role}
                    </motion.div>
                )}
                {!activeType && (
                    <div className="text-xs font-mono text-muted/40 hidden md:block">
                        Hover para explorar
                    </div>
                )}
            </div>

            {/* Attention curve */}
            <div className="mb-5 flex items-end gap-[2px] h-10">
                {attentionCurve.map((val, i) => (
                    <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${val * 100}%` }}
                        transition={{ delay: i * 0.04, type: 'spring', stiffness: 200 }}
                        className={cn(
                            "flex-1 rounded-t transition-all duration-200",
                            TOKENS[i].type === 'lost' ? 'bg-muted/15' :
                                TOKENS[i].type === 'system' ? 'bg-electric-cyan/35' :
                                    TOKENS[i].type === 'user' ? 'bg-emerald-glow/35' :
                                        TOKENS[i].type === 'output' ? 'bg-amber-glow/30' : 'bg-neon-magenta/25',
                            activeToken === i && 'brightness-150 scale-x-110'
                        )}
                    />
                ))}
            </div>

            {/* Token Stream — capsules in a flowing layout */}
            <div className="flex flex-wrap gap-1.5">
                {TOKENS.map((token, i) => {
                    const s = typeStyles[token.type];
                    const isActive = activeToken === i;
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.03, type: 'spring', stiffness: 250, damping: 20 }}
                            whileHover={{ scale: 1.08, y: -2 }}
                            onHoverStart={() => setActiveToken(i)}
                            onHoverEnd={() => setActiveToken(null)}
                            className={cn(
                                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono cursor-default transition-all duration-200",
                                s.bg, s.border, s.text, s.hoverBorder,
                                token.type === 'lost' && 'opacity-40 italic',
                                isActive && 'ring-1 ring-white/10 shadow-lg'
                            )}
                        >
                            <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", s.dot)} />
                            {token.text}
                        </motion.div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-surface-3 flex flex-wrap gap-x-5 gap-y-2 text-[11px]">
                {[
                    { label: 'System Prompt', type: 'system' },
                    { label: 'Contexto Adjunto', type: 'context' },
                    { label: 'Lost in the Middle', type: 'lost' },
                    { label: 'Tu Input', type: 'user' },
                    { label: 'Output', type: 'output' },
                ].map(item => (
                    <div key={item.label} className="flex items-center gap-1.5">
                        <div className={cn("w-2 h-2 rounded-full", typeStyles[item.type].dot)} />
                        <span className="text-muted">{item.label}</span>
                    </div>
                ))}
            </div>

            {/* Decorative bloom */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-electric-cyan/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-neon-magenta/4 rounded-full blur-3xl pointer-events-none" />
        </div>
    );
};
