import React from 'react';
import { motion } from 'framer-motion';
import { ContextWindowVisual } from '../components/ui/ContextWindowVisual';
import { CompleteButton } from '../components/ui/CompleteButton';
import { MarkdownRenderer } from '../components/ui/MarkdownRenderer';
import { getLLMContent } from '../lib/content';

const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 25 } }
};

/* ─── Page ─── */
const Llms = () => {
    const content = getLLMContent();
    const splitIndex = content.indexOf('## 5. El núcleo: el Transformer');

    let part1 = content;
    let part2 = '';

    if (splitIndex !== -1) {
        part1 = content.slice(0, splitIndex);
        part2 = content.slice(splitIndex);
    }

    return (
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-12 pb-20">

            {/* Header with bloom effect */}
            <motion.div variants={fadeUp} className="relative rounded-3xl overflow-hidden border border-surface-3 shadow-2xl">
                <img
                    src="/images/header-llm-architecture.jpeg"
                    alt="LLM Physics"
                    className="w-full h-56 md:h-72 object-cover opacity-30 header-image scale-105"
                />
                <div className="header-bloom" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent z-[2]" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 z-[3]">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-electric-cyan/20 text-electric-cyan border border-electric-cyan/30 tracking-wider">MÓDULO 1</span>
                        <span className="text-[10px] font-mono text-muted/80 tracking-widest uppercase">FUNDAMENTO</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black header-text-shadow mb-4 leading-tight">
                        <span className="text-ghost-white">La "</span><span className="text-electric-cyan">Física</span><span className="text-ghost-white">" del LLM</span>
                    </h1>
                    <p className="text-lg text-muted max-w-2xl header-text-shadow leading-relaxed">
                        Entendiendo la maquinaria para predecir sus fallos.
                    </p>
                </div>
            </motion.div>

            {/* Markdown Wrapper */}
            <motion.div variants={fadeUp} className="prose-cyber prose prose-invert max-w-none
                prose-headings:text-ghost-white prose-headings:font-bold prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-surface-3 prose-h2:pb-3
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                prose-h4:text-base prose-h4:mt-6 prose-h4:mb-3
                prose-p:text-ghost-white/95 prose-p:leading-[1.8] prose-p:text-[1.05rem] prose-p:my-5
                prose-li:text-ghost-white/95 prose-li:text-[1.05rem] prose-li:leading-[1.8]
                prose-em:text-ghost-white/80
                prose-table:rounded-xl prose-table:overflow-hidden prose-table:border prose-table:border-surface-3
                prose-thead:bg-surface-2
                prose-th:text-sm prose-th:font-mono prose-th:text-ghost-white/90 prose-th:uppercase prose-th:tracking-wider prose-th:px-4 prose-th:py-3
                prose-td:text-sm prose-td:text-ghost-white/85 prose-td:px-4 prose-td:py-3 prose-td:border-t prose-td:border-surface-3
                prose-blockquote:border-l-2 prose-blockquote:border-electric-cyan/40 prose-blockquote:bg-surface-1/50 prose-blockquote:rounded-r-xl prose-blockquote:py-2 prose-blockquote:px-5 prose-blockquote:text-[1.05rem]
                prose-code:text-electric-cyan prose-code:bg-electric-cyan/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[0.9rem] prose-code:font-mono
                prose-hr:border-surface-3 prose-hr:my-8
            ">

                <MarkdownRenderer content={part1} />

                {splitIndex !== -1 && (
                    <div className="my-16" id="mesa-de-trabajo">
                        <ContextWindowVisual />
                    </div>
                )}

                {part2 && <MarkdownRenderer content={part2} />}

            </motion.div>

            {/* Closing Bridge */}
            <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-neon-magenta/20 bg-neon-magenta/5 mt-10">
                <p className="text-sm text-ghost-white/85 leading-relaxed">
                    <strong className="text-neon-magenta">¿Qué sucede cuando estas "grietas" físicas se manifiestan?</strong>{' '}
                    En la siguiente sección, exploraremos el <strong className="text-ghost-white">Atlas de Patologías</strong>, donde aprenderás a diagnosticar exactamente qué parte de esta maquinaria está fallando cuando el modelo se comporta de forma errática.
                </p>
            </motion.div>

            <CompleteButton moduleId="llms" />
        </motion.div>
    );
};

export default Llms;
