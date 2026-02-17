import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhaseCard, phaseData } from '../components/ui/PhaseCard';
import { CompleteButton } from '../components/ui/CompleteButton';
import { MarkdownRenderer } from '../components/ui/MarkdownRenderer';
import { getControlContent } from '../lib/content';
import { ChevronDown } from 'lucide-react';

const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 25 } }
};

const Control = () => {
    const [expandedPhase, setExpandedPhase] = useState(null);
    const [showFullContent, setShowFullContent] = useState(false);
    const content = getControlContent();

    return (
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-10">

            {/* Header with bloom */}
            <motion.div variants={fadeUp} className="relative rounded-2xl overflow-hidden border border-surface-3">
                <img
                    src="/images/header-framework-control.jpeg"
                    alt="Framework C.O.N.T.R.O.L."
                    className="w-full h-48 md:h-56 object-cover opacity-40 header-image"
                />
                <div className="header-bloom" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-transparent z-[2]" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-[3]">
                    <p className="text-xs font-mono text-electric-cyan/60 tracking-wider mb-2 header-text-shadow">MANUAL OPERATIVO · 7 FASES</p>
                    <h1 className="text-3xl md:text-4xl font-black header-text-shadow">
                        <span className="gradient-text-cyan">Framework </span>
                        <span className="text-ghost-white">C.O.N.T.R.O.L.</span>
                    </h1>
                    <p className="text-muted mt-2 max-w-2xl header-text-shadow">Ingeniería de Prompts Estratégica y Gestión de Modelos de Razonamiento.</p>
                </div>
            </motion.div>

            {/* Phase cards */}
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
                                isExpanded={expandedPhase === phase.key}
                                onToggle={() => setExpandedPhase(prev => prev === phase.key ? null : phase.key)}
                            />
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Progressive disclosure for full content */}
            <motion.div variants={fadeUp}>
                <button
                    onClick={() => setShowFullContent(!showFullContent)}
                    className="w-full flex items-center justify-between p-4 bg-deep-slate border border-surface-3 rounded-2xl hover:bg-surface-2 transition-colors group"
                >
                    <div className="flex items-center gap-3">
                        <span className="w-1.5 h-6 bg-amber-glow rounded-full" />
                        <h2 className="text-lg font-bold text-ghost-white">Manual Operativo Completo</h2>
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

            <CompleteButton moduleId="control" />
        </motion.div>
    );
};

export default Control;
