import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import {
    Settings2,
    SlidersHorizontal,
    Brain,
    Database,
    History,
    FileText,
    Wrench,
    User,
    Zap
} from 'lucide-react';

/* ─── Source Layers ─── */
const PERSISTENT_SOURCES = [
    { label: 'System Prompt', icon: Settings2 },
    { label: 'Custom Instructions', icon: SlidersHorizontal },
    { label: 'Memoria guardada', icon: Brain },
];

const DYNAMIC_SOURCES = [
    { label: 'Detalle recordado', icon: Database },
    { label: 'Recuperado de chats anteriores', icon: History },
    { label: 'Adjuntos (chunks)', icon: FileText },
    { label: 'Herramientas (tools)', icon: Wrench },
];

/* ─── Token Stream Data ─── */
const TOKENS = [
    // Persistent prefix
    { text: 'Actúa como un…', type: 'system', role: 'System Prompt' },
    { text: 'Instrucciones personalizadas', type: 'system', role: 'Custom Instructions' },
    { text: 'Memoria guardada', type: 'system', role: 'Memoria Persistente' },
    // Dynamic / retrieved context
    { text: 'Detalle recordado', type: 'context', role: 'Detalle Recordado' },
    { text: '[Chunk PDF p.1-5]', type: 'context', role: 'Fragmento Adjunto' },
    { text: '[Chunk PDF p.6-12]', type: 'context', role: 'Fragmento Adjunto' },
    { text: '[Tool: Web]', type: 'context', role: 'Resultado de Herramienta' },
    { text: '[Tool: Código]', type: 'context', role: 'Resultado de Herramienta' },
    { text: '[Historial reciente (esta sesión)]', type: 'context', role: 'Historial de esta Sesión' },
    // Degradation zone (Lost in the Middle)
    { text: '···atenuado···', type: 'lost', role: 'Zona de Degradación', degradeLevel: 0.55 },
    { text: '···menor peso···', type: 'lost', role: 'Zona de Degradación', degradeLevel: 0.35 },
    { text: '···baja atención···', type: 'lost', role: 'Zona de Degradación', degradeLevel: 0.25 },
    // User input
    { text: '¿Cuáles son las mejores', type: 'user', role: 'Tu Input' },
    { text: 'prácticas?', type: 'user', role: 'Tu Input' },
    // Output — generated token by token
    { text: '→ Respuesta generada', type: 'output', role: 'Respuesta Generada' },
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
        bg: 'bg-slate-500/8',
        border: 'border-slate-500/15',
        text: 'text-slate-400',
        dot: 'bg-slate-500/40',
        hoverBorder: 'hover:border-slate-400/30',
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

/* ─── Legend Items ─── */
const LEGEND = [
    { label: 'Persistente', type: 'system' },
    { label: 'Dinámico / Recuperado', type: 'context' },
    { label: 'Degradación de atención', type: 'lost' },
    { label: 'Input actual', type: 'user' },
    { label: 'Respuesta generada', type: 'output' },
];

/* ─── Component ─── */
export const ContextWindowVisual = () => {
    const [activeToken, setActiveToken] = useState(null);
    const [attentionCurve, setAttentionCurve] = useState([]);

    useEffect(() => {
        // U-shaped attention curve: high at start & end, low in the middle
        const curve = TOKENS.map((_, i) => {
            const mid = TOKENS.length / 2;
            const dist = Math.abs(i - mid) / mid;
            // Smoother U: cubic easing
            return 0.18 + Math.pow(dist, 1.6) * 0.82;
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

            {/* ─── A) Sources Panel ─── */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Persistent Sources */}
                <div className="p-3 rounded-xl border border-electric-cyan/15 bg-electric-cyan/5">
                    <p className="text-[9px] font-mono text-electric-cyan/70 tracking-widest uppercase mb-2.5 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-electric-cyan" />
                        Capas Persistentes
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                        {PERSISTENT_SOURCES.map((src) => (
                            <div key={src.label} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-electric-cyan/20 bg-electric-cyan/10 text-electric-cyan text-[10px] font-mono">
                                <src.icon className="w-3 h-3" />
                                {src.label}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dynamic Sources */}
                <div className="p-3 rounded-xl border border-neon-magenta/15 bg-neon-magenta/5">
                    <p className="text-[9px] font-mono text-neon-magenta/70 tracking-widest uppercase mb-2.5 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-neon-magenta" />
                        Capas Dinámicas / Recuperadas
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                        {DYNAMIC_SOURCES.map((src) => (
                            <div key={src.label} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-neon-magenta/20 bg-neon-magenta/8 text-neon-magenta text-[10px] font-mono">
                                <src.icon className="w-3 h-3" />
                                {src.label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ─── Divider: Stream begins ─── */}
            <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-surface-3" />
                <span className="text-[9px] font-mono text-muted/50 tracking-widest uppercase">Ventana Activa de esta Respuesta</span>
                <div className="h-px flex-1 bg-surface-3" />
            </div>

            {/* ─── B) Attention Curve ─── */}
            <div className="mb-4 flex items-end gap-[2px] h-8">
                {attentionCurve.map((val, i) => (
                    <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${val * 100}%` }}
                        transition={{ delay: i * 0.04, type: 'spring', stiffness: 200 }}
                        className={cn(
                            "flex-1 rounded-t transition-all duration-200",
                            TOKENS[i].type === 'lost' ? 'bg-slate-500/20' :
                                TOKENS[i].type === 'system' ? 'bg-electric-cyan/35' :
                                    TOKENS[i].type === 'user' ? 'bg-emerald-glow/35' :
                                        TOKENS[i].type === 'output' ? 'bg-amber-glow/30' : 'bg-neon-magenta/25',
                            activeToken === i && 'brightness-150 scale-x-110'
                        )}
                    />
                ))}
            </div>
            <p className="text-[9px] font-mono text-muted/35 text-center mb-5 tracking-wider">↑ CURVA DE ATENCIÓN (FORMA EN U)</p>

            {/* ─── B) Token Stream ─── */}
            <div className="flex flex-wrap gap-1.5 items-center">
                {TOKENS.map((token, i) => {
                    const s = typeStyles[token.type];
                    const isActive = activeToken === i;
                    const degradeOpacity = token.degradeLevel || 1;

                    return (
                        <React.Fragment key={i}>
                            {/* Degradation zone label */}
                            {token.type === 'lost' && i === TOKENS.findIndex(t => t.type === 'lost') && (
                                <div className="w-full flex items-center gap-2 mt-2 mb-1">
                                    <div className="h-px flex-1 bg-slate-500/20" />
                                    <span className="text-[9px] font-mono text-slate-400/60 tracking-wider uppercase whitespace-nowrap">Zona de degradación (Lost in the Middle)</span>
                                    <div className="h-px flex-1 bg-slate-500/20" />
                                </div>
                            )}

                            {/* Output label */}
                            {token.type === 'output' && i === TOKENS.findIndex(t => t.type === 'output') && (
                                <div className="w-full flex items-center gap-2 mt-2 mb-1">
                                    <div className="h-px flex-1 bg-amber-glow/20" />
                                    <span className="text-[9px] font-mono text-amber-glow/60 tracking-wider uppercase whitespace-nowrap flex items-center gap-1.5">
                                        <Zap className="w-3 h-3" />
                                        Generación secuencial
                                    </span>
                                    <div className="h-px flex-1 bg-amber-glow/20" />
                                </div>
                            )}

                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: token.type === 'lost' ? degradeOpacity : 1, scale: 1 }}
                                transition={{ delay: i * 0.03, type: 'spring', stiffness: 250, damping: 20 }}
                                whileHover={{ scale: 1.08, y: -2 }}
                                onHoverStart={() => setActiveToken(i)}
                                onHoverEnd={() => setActiveToken(null)}
                                className={cn(
                                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono cursor-default transition-all duration-200",
                                    s.bg, s.border, s.text, s.hoverBorder,
                                    token.type === 'lost' && 'italic blur-[0.4px]',
                                    isActive && 'ring-1 ring-white/10 shadow-lg !opacity-100 !blur-none'
                                )}
                                style={token.type === 'lost' ? { opacity: degradeOpacity } : undefined}
                            >
                                <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", s.dot)} />
                                {token.text}
                                {token.type === 'output' && (
                                    <span className="inline-block w-[2px] h-3.5 bg-amber-glow animate-pulse ml-0.5" />
                                )}
                            </motion.div>
                        </React.Fragment>
                    );
                })}
                {/* Token by token subtitle */}
                <span className="text-[9px] font-mono text-amber-glow/40 ml-1 self-center">token a token</span>
            </div>

            {/* ─── Didactic Note ─── */}
            <div className="mt-5 p-3 rounded-lg border border-surface-3 bg-surface-1/30">
                <p className="text-[10px] text-muted/70 leading-relaxed">
                    <strong className="text-ghost-white/70">Todo se convierte en tokens</strong> dentro de una secuencia. Las capas persistentes siempre entran; las dinámicas se recuperan según la pregunta. No todo pesa igual: la zona central sufre degradación de atención. La respuesta se construye secuencialmente, token a token. <strong className="text-ghost-white/70">El historial reciente pertenece a esta sesión; de chats anteriores solo se recuperan detalles seleccionados.</strong>
                </p>
            </div>

            {/* ─── Legend ─── */}
            <div className="mt-5 pt-4 border-t border-surface-3 flex flex-wrap gap-x-5 gap-y-2 text-[11px]">
                {LEGEND.map(item => (
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
