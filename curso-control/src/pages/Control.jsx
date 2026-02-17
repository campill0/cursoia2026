import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PhaseCard, phaseData } from '../components/ui/PhaseCard';
import { CompleteButton } from '../components/ui/CompleteButton';
import { MarkdownRenderer } from '../components/ui/MarkdownRenderer';
import { getControlContent } from '../lib/content';

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
    const content = getControlContent();

    return (
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-10">

            {/* Header */}
            <motion.div variants={fadeUp} className="relative rounded-2xl overflow-hidden border border-surface-3">
                <img
                    src="https://placehold.co/1200x300/080b12/00e5ff?text=C.O.N.T.R.O.L.+Framework+%E2%80%94+7+Phases&font=mono"
                    alt="Framework placeholder"
                    className="w-full h-48 md:h-56 object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <p className="text-xs font-mono text-electric-cyan/60 tracking-wider mb-2">MANUAL OPERATIVO · 7 FASES</p>
                    <h1 className="text-3xl md:text-4xl font-black">
                        <span className="gradient-text-cyan">Framework </span>
                        <span className="text-ghost-white">C.O.N.T.R.O.L.</span>
                    </h1>
                    <p className="text-muted mt-2 max-w-2xl">Ingeniería de Prompts Estratégica y Gestión de Modelos de Razonamiento.</p>
                </div>
            </motion.div>

            {/* Phase cards */}
            <motion.div variants={fadeUp}>
                <h2 className="text-lg font-bold text-ghost-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-electric-cyan rounded-full" />
                    Las 7 Fases
                </h2>

                {/* Horizontal scroll on mobile, grid on desktop */}
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

            {/* Full content */}
            <motion.div variants={fadeUp} className="prose-cyber prose prose-invert max-w-none">
                <h2 className="text-lg font-bold text-ghost-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-amber-glow rounded-full" />
                    Manual Operativo Completo
                </h2>
                <MarkdownRenderer content={content} />
            </motion.div>

            <CompleteButton moduleId="control" />
        </motion.div>
    );
};

export default Control;
