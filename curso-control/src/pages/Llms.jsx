import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BentoGrid, BentoCell } from '../components/ui/BentoGrid';
import { ContextWindowVisual } from '../components/ui/ContextWindowVisual';
import { CompleteButton } from '../components/ui/CompleteButton';
import { MarkdownRenderer } from '../components/ui/MarkdownRenderer';
import { getLLMContent } from '../lib/content';
import { Archive, Gauge, Monitor, MapPin, ChevronDown } from 'lucide-react';

const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 25 } }
};

const concepts = [
    { icon: Archive, title: 'Compresión con Pérdida', desc: 'No es una biblioteca, es un ZIP borroso. Los datos se comprimen en pesos numéricos.', detail: 'Un LLM reduce terabytes de texto a parámetros numéricos. Este proceso es destructivo: la información original no se puede recuperar exactamente. Es compresión con pérdida, como JPEG para texto.', color: 'cyan', key: 'compression' },
    { icon: Gauge, title: 'Motor Probabilístico', desc: 'Predice el siguiente token por probabilidad, no por verdad. Sin anclaje a la realidad.', detail: 'Cada token generado es el resultado de una distribución de probabilidad. El modelo no "sabe" si algo es verdadero — solo calcula qué token es más probable dado el contexto anterior.', color: 'magenta', key: 'probabilistic' },
    { icon: Monitor, title: 'Ventana de Contexto', desc: 'Una mesa de trabajo finita. Si se llena, el modelo olvida o ignora datos antiguos.', detail: 'Todo lo que el modelo "ve" cabe en la ventana de contexto (~128K tokens). Es como un escritorio: si apilas demasiados documentos, los de abajo se vuelven invisibles.', color: 'emerald', key: 'context' },
    { icon: MapPin, title: 'Lost in the Middle', desc: 'Sesgo de posición en U: alta atención en extremos, baja en el centro del contexto.', detail: 'Los modelos prestan más atención al inicio (system prompt) y al final (input reciente). La información en el centro del contexto recibe menos atención — la curva en U.', color: 'amber', key: 'lost' },
];

const colorMap = {
    cyan: { icon: 'bg-electric-cyan/10', iconText: 'text-electric-cyan', border: 'border-electric-cyan/20' },
    magenta: { icon: 'bg-neon-magenta/10', iconText: 'text-neon-magenta', border: 'border-neon-magenta/20' },
    emerald: { icon: 'bg-emerald-glow/10', iconText: 'text-emerald-glow', border: 'border-emerald-glow/20' },
    amber: { icon: 'bg-amber-glow/10', iconText: 'text-amber-glow', border: 'border-amber-glow/20' },
};

const Llms = () => {
    const content = getLLMContent();
    const [expandedPillar, setExpandedPillar] = useState(null);
    const [showFullContent, setShowFullContent] = useState(false);

    return (
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-10">

            {/* Header with bloom effect */}
            <motion.div variants={fadeUp} className="relative rounded-2xl overflow-hidden border border-surface-3">
                <img
                    src="/images/header-llm-architecture.jpeg"
                    alt="LLM Architecture"
                    className="w-full h-48 md:h-64 object-cover opacity-40 header-image"
                />
                <div className="header-bloom" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-transparent z-[2]" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-[3]">
                    <p className="text-xs font-mono text-electric-cyan/60 tracking-wider mb-2 header-text-shadow">FASE 0 · PREREQUISITO</p>
                    <h1 className="text-3xl md:text-4xl font-black text-ghost-white header-text-shadow">La "Física" del LLM</h1>
                    <p className="text-muted mt-2 max-w-2xl header-text-shadow">Entiende la máquina antes de escribir. Fundamentos técnicos que explican cada patología.</p>
                </div>
            </motion.div>

            {/* 4 Pillars — interactive with expand */}
            <motion.div variants={fadeUp}>
                <h2 className="text-lg font-bold text-ghost-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-electric-cyan rounded-full" />
                    4 Pilares Fundamentales
                </h2>
                <BentoGrid className="lg:grid-cols-2">
                    {concepts.map((c, i) => {
                        const cm = colorMap[c.color];
                        const isExpanded = expandedPillar === c.key;
                        return (
                            <BentoCell
                                key={c.key}
                                glowColor={c.color}
                                onClick={() => setExpandedPillar(isExpanded ? null : c.key)}
                                className={isExpanded ? 'animate-border-glow' : ''}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`w-10 h-10 rounded-xl ${cm.icon} flex items-center justify-center shrink-0`}>
                                        <c.icon className={`w-5 h-5 ${cm.iconText}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-bold text-ghost-white">{c.title}</h3>
                                        <p className="text-xs text-muted mt-1.5 leading-relaxed">{c.desc}</p>
                                    </div>
                                    <ChevronDown className={`w-4 h-4 text-muted shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-electric-cyan' : ''}`} />
                                </div>

                                {/* Expanded detail */}
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            <div className={`mt-4 pt-4 border-t ${cm.border}`}>
                                                <p className="text-xs text-ghost-white/80 leading-relaxed font-mono">{c.detail}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="absolute top-3 right-10 text-[10px] font-mono text-muted/30">{String(i + 1).padStart(2, '0')}</div>
                            </BentoCell>
                        );
                    })}
                </BentoGrid>
            </motion.div>

            {/* Context Window Visual */}
            <motion.div variants={fadeUp}>
                <h2 className="text-lg font-bold text-ghost-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-emerald-glow rounded-full" />
                    Componente Visual: La Mesa de Trabajo
                </h2>
                <img src="/images/concept-context-window.png" alt="Context Window" className="w-full rounded-xl mb-4 opacity-60 header-image" />
                <ContextWindowVisual />
            </motion.div>

            {/* Progressive disclosure for full content */}
            <motion.div variants={fadeUp}>
                <button
                    onClick={() => setShowFullContent(!showFullContent)}
                    className="w-full flex items-center justify-between p-4 bg-deep-slate border border-surface-3 rounded-2xl hover:bg-surface-2 transition-colors group"
                >
                    <div className="flex items-center gap-3">
                        <span className="w-1.5 h-6 bg-neon-magenta rounded-full" />
                        <h2 className="text-lg font-bold text-ghost-white">Contenido Completo</h2>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-muted group-hover:text-electric-cyan transition-all duration-200 ${showFullContent ? 'rotate-180 text-electric-cyan' : ''}`} />
                </button>

                <AnimatePresence>
                    {showFullContent && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="prose-cyber prose prose-invert max-w-none mt-4 pt-4">
                                <MarkdownRenderer content={content} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <CompleteButton moduleId="llms" />
        </motion.div>
    );
};

export default Llms;
