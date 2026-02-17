import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PathologyCard } from '../components/ui/PathologyCard';
import { CompleteButton } from '../components/ui/CompleteButton';
import { MarkdownRenderer } from '../components/ui/MarkdownRenderer';
import { getPathologiesContent } from '../lib/content';

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
    const content = getPathologiesContent();

    const toggleCategory = (key) => {
        setExpandedCategory(prev => prev === key ? null : key);
    };

    return (
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-10">

            {/* Header */}
            <motion.div variants={fadeUp} className="relative rounded-2xl overflow-hidden border border-surface-3">
                <img
                    src="/images/header-pathology-atlas.jpeg"
                    alt="Pathology atlas placeholder"
                    className="w-full h-48 md:h-56 object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <p className="text-xs font-mono text-neon-magenta/60 tracking-wider mb-2">DIAGNÓSTICO · 4 CATEGORÍAS</p>
                    <h1 className="text-3xl md:text-4xl font-black text-ghost-white">Patologías del Modelo</h1>
                    <p className="text-muted mt-2 max-w-2xl">Fallos estructurales y sistémicos. No son errores aleatorios, sino síntomas predecibles.</p>
                </div>
            </motion.div>

            {/* Pathology Bento Grid */}
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

            {/* Full content */}
            <motion.div variants={fadeUp} className="prose-cyber prose prose-invert max-w-none">
                <h2 className="text-lg font-bold text-ghost-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-red-glow rounded-full" />
                    Guía Completa
                </h2>
                <MarkdownRenderer content={content} />
            </motion.div>

            <CompleteButton moduleId="pathologies" />
        </motion.div>
    );
};

export default Pathologies;
