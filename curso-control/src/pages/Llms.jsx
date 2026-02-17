import React from 'react';
import { motion } from 'framer-motion';
import { BentoGrid, BentoCell } from '../components/ui/BentoGrid';
import { ContextWindowVisual } from '../components/ui/ContextWindowVisual';
import { CompleteButton } from '../components/ui/CompleteButton';
import { MarkdownRenderer } from '../components/ui/MarkdownRenderer';
import { getLLMContent } from '../lib/content';
import { Archive, Gauge, Monitor, MapPin } from 'lucide-react';

const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 25 } }
};

const concepts = [
    { icon: Archive, title: 'Compresión con Pérdida', desc: 'No es una biblioteca, es un ZIP borroso. Los datos se comprimen en pesos numéricos.', color: 'cyan', key: 'compression' },
    { icon: Gauge, title: 'Motor Probabilístico', desc: 'Predice el siguiente token por probabilidad, no por verdad. Sin anclaje a la realidad.', color: 'magenta', key: 'probabilistic' },
    { icon: Monitor, title: 'Ventana de Contexto', desc: 'Una mesa de trabajo finita. Si se llena, el modelo olvida o ignora datos antiguos.', color: 'emerald', key: 'context' },
    { icon: MapPin, title: 'Lost in the Middle', desc: 'Sesgo de posición en U: alta atención en extremos, baja en el centro del contexto.', color: 'amber', key: 'lost' },
];

const Llms = () => {
    const content = getLLMContent();

    return (
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-10">

            {/* Header with placeholder image */}
            <motion.div variants={fadeUp} className="relative rounded-2xl overflow-hidden border border-surface-3">
                <img
                    src="/images/header-llm-architecture.jpeg"
                    alt="LLM Architecture placeholder"
                    className="w-full h-48 md:h-64 object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <p className="text-xs font-mono text-electric-cyan/60 tracking-wider mb-2">FASE 0 · PREREQUISITO</p>
                    <h1 className="text-3xl md:text-4xl font-black text-ghost-white">La "Física" del LLM</h1>
                    <p className="text-muted mt-2 max-w-2xl">Entiende la máquina antes de escribir. Fundamentos técnicos que explican cada patología.</p>
                </div>
            </motion.div>

            {/* Concept Bento Grid */}
            <motion.div variants={fadeUp}>
                <h2 className="text-lg font-bold text-ghost-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-electric-cyan rounded-full" />
                    4 Pilares Fundamentales
                </h2>
                <BentoGrid className="lg:grid-cols-2">
                    {concepts.map((c, i) => (
                        <BentoCell key={c.key} glowColor={c.color}>
                            <div className="flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-xl bg-${c.color === 'cyan' ? 'electric-cyan' : c.color === 'magenta' ? 'neon-magenta' : c.color === 'emerald' ? 'emerald-glow' : 'amber-glow'}/10 flex items-center justify-center shrink-0`}>
                                    <c.icon className={`w-5 h-5 text-${c.color === 'cyan' ? 'electric-cyan' : c.color === 'magenta' ? 'neon-magenta' : c.color === 'emerald' ? 'emerald-glow' : 'amber-glow'}`} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-ghost-white">{c.title}</h3>
                                    <p className="text-xs text-muted mt-1.5 leading-relaxed">{c.desc}</p>
                                </div>
                            </div>
                            <div className="absolute top-3 right-4 text-[10px] font-mono text-muted/30">{String(i + 1).padStart(2, '0')}</div>
                        </BentoCell>
                    ))}
                </BentoGrid>
            </motion.div>

            {/* Context Window Visual */}
            <motion.div variants={fadeUp}>
                <h2 className="text-lg font-bold text-ghost-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-emerald-glow rounded-full" />
                    Componente Visual: La Mesa de Trabajo
                </h2>
                <img src="/images/concept-context-window.png" alt="Context Window" className="w-full rounded-xl mb-4 opacity-60" />
                <ContextWindowVisual />
            </motion.div>

            {/* Full content */}
            <motion.div variants={fadeUp} className="prose-cyber prose prose-invert max-w-none">
                <h2 className="text-lg font-bold text-ghost-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-neon-magenta rounded-full" />
                    Contenido Completo
                </h2>
                <MarkdownRenderer content={content} />
            </motion.div>

            <CompleteButton moduleId="llms" />
        </motion.div>
    );
};

export default Llms;
