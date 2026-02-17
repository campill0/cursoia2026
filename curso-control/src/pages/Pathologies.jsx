import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PathologyCard } from '../components/ui/PathologyCard';
import { CompleteButton } from '../components/ui/CompleteButton';
import { MarkdownRenderer } from '../components/ui/MarkdownRenderer';
import { getPathologiesContent } from '../lib/content';
import { ChevronDown } from 'lucide-react';

const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 25 } }
};

const categories = ['truth', 'behavior', 'memory', 'operational'];

const Pathologies = () => {
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [showFullContent, setShowFullContent] = useState(false);
    const content = getPathologiesContent();

    const toggleCategory = (key) => {
        setExpandedCategory(prev => prev === key ? null : key);
    };

    return (
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-10">

            {/* Header with bloom */}
            <motion.div variants={fadeUp} className="relative rounded-2xl overflow-hidden border border-surface-3">
                <img
                    src="/images/header-pathology-atlas.jpeg"
                    alt="Pathology atlas"
                    className="w-full h-48 md:h-56 object-cover opacity-40 header-image"
                />
                <div className="header-bloom" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-transparent z-[2]" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-[3]">
                    <p className="text-xs font-mono text-neon-magenta/60 tracking-wider mb-2 header-text-shadow">DIAGNÓSTICO · 4 CATEGORÍAS</p>
                    <h1 className="text-3xl md:text-4xl font-black text-ghost-white header-text-shadow">Patologías del Modelo</h1>
                    <p className="text-muted mt-2 max-w-2xl header-text-shadow">Fallos estructurales y sistémicos. No son errores aleatorios, sino síntomas predecibles.</p>
                </div>
            </motion.div>

            {/* Pathology cards — already progressive by design */}
            <motion.div variants={fadeUp}>
                <h2 className="text-lg font-bold text-ghost-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-neon-magenta rounded-full" />
                    Categorías de Fallos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categories.map((cat) => (
                        <PathologyCard
                            key={cat}
                            categoryKey={cat}
                            isExpanded={expandedCategory === cat}
                            onToggle={() => toggleCategory(cat)}
                        />
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
                        <span className="w-1.5 h-6 bg-red-glow rounded-full" />
                        <h2 className="text-lg font-bold text-ghost-white">Guía Completa</h2>
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

            <CompleteButton moduleId="pathologies" />
        </motion.div>
    );
};

export default Pathologies;
