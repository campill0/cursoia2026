import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhaseCard, phaseData } from '../components/ui/PhaseCard';
import { CompleteButton } from '../components/ui/CompleteButton';
import { MarkdownRenderer } from '../components/ui/MarkdownRenderer';
import { getControlPhases } from '../lib/content';
import { Crosshair, BookOpen, ChevronDown } from 'lucide-react';

const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 25 } }
};

const phaseColorMap = {
    slate: { text: 'text-ghost-white/80', bg: 'bg-ghost-white/10', border: 'border-ghost-white/20', accent: 'bg-ghost-white/60', letterBg: 'bg-surface-2', letterText: 'text-ghost-white' },
    cyan: { text: 'text-electric-cyan', bg: 'bg-electric-cyan/10', border: 'border-electric-cyan/30', accent: 'bg-electric-cyan', letterBg: 'bg-electric-cyan/10', letterText: 'text-electric-cyan' },
    magenta: { text: 'text-neon-magenta', bg: 'bg-neon-magenta/10', border: 'border-neon-magenta/30', accent: 'bg-neon-magenta', letterBg: 'bg-neon-magenta/10', letterText: 'text-neon-magenta' },
    red: { text: 'text-red-glow', bg: 'bg-red-glow/10', border: 'border-red-glow/30', accent: 'bg-red-glow', letterBg: 'bg-red-glow/10', letterText: 'text-red-glow' },
    amber: { text: 'text-amber-glow', bg: 'bg-amber-glow/10', border: 'border-amber-glow/30', accent: 'bg-amber-glow', letterBg: 'bg-amber-glow/10', letterText: 'text-amber-glow' },
    emerald: { text: 'text-emerald-glow', bg: 'bg-emerald-glow/10', border: 'border-emerald-glow/30', accent: 'bg-emerald-glow', letterBg: 'bg-emerald-glow/10', letterText: 'text-emerald-glow' },
    blue: { text: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/30', accent: 'bg-blue-400', letterBg: 'bg-blue-400/10', letterText: 'text-blue-400' },
    violet: { text: 'text-violet-400', bg: 'bg-violet-400/10', border: 'border-violet-400/30', accent: 'bg-violet-400', letterBg: 'bg-violet-400/10', letterText: 'text-violet-400' },
};

const PhaseSection = ({ phase, index, isExpanded, onToggle }) => {
    const cs = phaseColorMap[phase.color] || phaseColorMap.cyan;

    return (
        <motion.section variants={fadeUp} className="scroll-mt-32" id={`phase-${phase.key}`}>
            {/* Phase Header Bar - Clickable */}
            <div
                onClick={onToggle}
                className={`flex items-center gap-5 mb-0 py-4 border-b ${cs.border} cursor-pointer group hover:bg-surface-2/30 transition-colors rounded-t-xl px-2 select-none`}
            >
                <div className={`w-14 h-14 rounded-2xl ${cs.letterBg} ${cs.letterText} flex items-center justify-center text-2xl font-black shrink-0 border ${cs.border} transition-transform group-hover:scale-105`}>
                    {phase.letter}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                        <span className={`text-[10px] font-mono ${cs.text} tracking-[0.2em] uppercase font-bold`}>
                            FASE {phase.letter}
                        </span>
                        <span className={`flex-1 h-px ${cs.accent} opacity-20`} />
                        <span className="text-[10px] font-mono text-muted/40 tabular-nums">
                            {String(index + 1).padStart(2, '0')}/08
                        </span>
                    </div>
                    <h2 className="text-xl font-black text-ghost-white uppercase tracking-tight group-hover:text-electric-cyan transition-colors">
                        {phase.title}
                    </h2>
                    <p className={`text-xs font-mono ${cs.text} opacity-70 mt-0.5`}>{phase.subtitle}</p>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${cs.border} bg-obsidian transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                    <ChevronDown className={`w-4 h-4 ${cs.text}`} />
                </div>
            </div>

            {/* Collapsible Content */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className={`pl-4 lg:pl-8 border-l-2 ${cs.border} ml-9 pt-8 pb-12`}>
                            <div className="prose-cyber prose prose-invert max-w-none prose-sm
                                prose-headings:text-ghost-white prose-headings:font-bold prose-headings:tracking-tight
                                prose-h2:text-lg prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-surface-3 prose-h2:pb-2
                                prose-h3:text-base prose-h3:mt-8 prose-h3:mb-3
                                prose-h4:text-sm prose-h4:mt-6 prose-h4:mb-2
                                prose-p:text-ghost-white/80 prose-p:leading-relaxed prose-p:text-sm prose-p:my-3
                                prose-li:text-ghost-white/80 prose-li:text-sm prose-li:leading-relaxed
                                prose-strong:text-ghost-white prose-strong:font-semibold
                                prose-em:text-ghost-white/70
                                prose-table:rounded-xl prose-table:overflow-hidden prose-table:border prose-table:border-surface-3
                                prose-thead:bg-surface-2
                                prose-th:text-xs prose-th:font-mono prose-th:text-ghost-white/90 prose-th:uppercase prose-th:tracking-wider prose-th:px-4 prose-th:py-3
                                prose-td:text-xs prose-td:text-ghost-white/75 prose-td:px-4 prose-td:py-3 prose-td:border-t prose-td:border-surface-3
                                prose-blockquote:border-l-2 prose-blockquote:border-electric-cyan/40 prose-blockquote:bg-surface-1/50 prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-blockquote:px-4
                                prose-code:text-electric-cyan prose-code:bg-electric-cyan/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:font-mono
                                prose-hr:border-surface-3 prose-hr:my-8
                            ">
                                <MarkdownRenderer content={phase.content} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.section>
    );
};

const Control = () => {
    const phases = getControlPhases();
    const [expandedPhaseId, setExpandedPhaseId] = useState(null);

    const handleToggle = (key) => {
        setExpandedPhaseId(prev => prev === key ? null : key);
    };

    const handleCardClick = (key) => {
        setExpandedPhaseId(key);
        setTimeout(() => {
            const el = document.getElementById(`phase-${key}`);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    };

    return (
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-12 pb-20">

            {/* Header with bloom */}
            <motion.div variants={fadeUp} className="relative rounded-2xl overflow-hidden border border-surface-3">
                <img
                    src="/images/header-framework-control.jpeg"
                    alt="Framework C.O.N.T.R.O.L."
                    className="w-full h-48 md:h-64 object-cover opacity-40 header-image"
                />
                <div className="header-bloom" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-transparent z-[2]" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-[3]">
                    <p className="text-xs font-mono text-electric-cyan/60 tracking-wider mb-2 header-text-shadow">MANUAL OPERATIVO · 7 FASES + FUNDAMENTOS</p>
                    <h1 className="text-3xl md:text-4xl font-black header-text-shadow">
                        <span className="gradient-text-cyan">Framework </span>
                        <span className="text-ghost-white">C.O.N.T.R.O.L.</span>
                    </h1>
                    <p className="text-muted mt-2 max-w-2xl header-text-shadow">Ingeniería de Prompts Estratégica y Gestión de Modelos de Razonamiento.</p>
                </div>
            </motion.div>

            {/* Phase cards — quick nav */}
            <motion.div variants={fadeUp}>
                <h2 className="text-lg font-bold text-ghost-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-electric-cyan rounded-full" />
                    Las 7 Fases
                </h2>
                <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible snap-x snap-mandatory">
                    {phaseData.map((phase, i) => (
                        <div key={phase.key} className="min-w-[280px] md:min-w-0 snap-start">
                            <PhaseCard
                                phase={phase}
                                index={i}
                                isExpanded={expandedPhaseId === phase.key}
                                onToggle={() => handleCardClick(phase.key)}
                            />
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Intro — what this manual is */}
            {/* Intro — what this manual is */}
            <motion.div variants={fadeUp} className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-electric-cyan/50 to-transparent rounded-full" />
                <div className="pl-8 space-y-4">
                    <p className="text-sm text-muted leading-relaxed max-w-5xl">
                        Este manual despliega el framework <span className="text-ghost-white font-medium">C.O.N.T.R.O.L.</span> fase por fase. Cada sección contiene la especificación técnica completa: fundamento teórico, técnicas tácticas, tablas de decisión y listas de verificación para cerrar cada fase antes de pasar a la siguiente.
                    </p>
                    <p className="text-sm text-muted leading-relaxed max-w-5xl">
                        El contenido es denso y técnico. Haz clic en cada fase para desplegar su manual operativo correspondiente. Solo una fase puede estar activa a la vez para focalizar la atención.
                    </p>
                </div>
            </motion.div>

            {/* All phases — Accordion Style */}
            <div className="space-y-4">
                {phases.map((phase, i) => (
                    <PhaseSection
                        key={phase.key}
                        phase={phase}
                        index={i}
                        isExpanded={expandedPhaseId === phase.key}
                        onToggle={() => handleToggle(phase.key)}
                    />
                ))}
            </div>

            <CompleteButton moduleId="control" />
        </motion.div>
    );
};

export default Control;
