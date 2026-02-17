import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BentoGrid, BentoCell } from '../components/ui/BentoGrid';
import { Brain, AlertTriangle, ShieldCheck, Wrench, ArrowRight, Zap, Lock, Eye } from 'lucide-react';

const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 25 } }
};

const Home = () => (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-12">

        {/* Hero with bloom */}
        <motion.section variants={fadeUp} className="relative overflow-hidden rounded-3xl border border-surface-3">
            <div className="absolute inset-0">
                <img
                    src="/images/hero-neural-network.png"
                    alt="Hero"
                    className="w-full h-full object-cover opacity-30 header-image"
                />
                <div className="header-bloom" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent z-[2]" />
                <div className="absolute inset-0 bg-gradient-to-r from-obsidian/60 to-transparent z-[2]" />
            </div>

            <div className="relative z-10 p-8 md:p-16 lg:p-20">
                <div className="max-w-2xl">
                    <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-electric-cyan/10 border border-electric-cyan/20 text-electric-cyan text-xs font-mono mb-6">
                        <Zap className="w-3 h-3" /> PROMPT ENGINEERING 2026
                    </motion.div>

                    <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] header-text-shadow">
                        <span className="gradient-text-cyan">Método</span>
                        <br />
                        <span className="text-ghost-white">C.O.N.T.R.O.L.</span>
                    </motion.h1>

                    <motion.p variants={fadeUp} className="mt-6 text-lg text-muted max-w-lg leading-relaxed header-text-shadow">
                        Domina los modelos de lenguaje con un framework sistemático de 7 fases. De la teoría a la ingeniería profesional de prompts.
                    </motion.p>

                    <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
                        <Link
                            to="/llms"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-electric-cyan text-obsidian font-bold text-sm hover:bg-electric-cyan/90 transition-colors shadow-lg shadow-electric-cyan/20 active:scale-95"
                        >
                            Comenzar Curso <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            to="/control"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-surface-3 text-ghost-white font-medium text-sm hover:bg-surface-2 transition-colors active:scale-95"
                        >
                            Ver Framework
                        </Link>
                    </motion.div>
                </div>
            </div>
        </motion.section>

        {/* Stats strip */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
                { value: '7', label: 'Fases', sub: 'C.O.N.T.R.O.L.' },
                { value: '20+', label: 'Patologías', sub: 'Documentadas' },
                { value: '4', label: 'Módulos', sub: 'Interactivos' },
                { value: '∞', label: 'Offline', sub: 'Sin conexión' },
            ].map((stat, i) => (
                <div key={i} className="bg-deep-slate border border-surface-3 rounded-xl p-4 text-center">
                    <div className="text-2xl font-black gradient-text-cyan">{stat.value}</div>
                    <div className="text-xs font-bold text-ghost-white mt-1">{stat.label}</div>
                    <div className="text-[10px] font-mono text-muted">{stat.sub}</div>
                </div>
            ))}
        </motion.div>

        {/* Module Bento Grid */}
        <motion.section variants={fadeUp}>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-ghost-white">Módulos del Curso</h2>
                <span className="text-xs font-mono text-muted">4 SECCIONES</span>
            </div>

            <BentoGrid className="lg:grid-cols-2">
                <BentoCell span={1} glowColor="cyan">
                    <Link to="/llms" className="block h-full">
                        <div className="relative h-32 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-2xl">
                            <img
                                src="https://placehold.co/600x250/0f1520/00e5ff?text=LLM+Internals&font=mono"
                                alt="LLM internals"
                                className="w-full h-full object-cover opacity-60 header-image"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-deep-slate to-transparent" />
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-electric-cyan/10 flex items-center justify-center">
                                <Brain className="w-5 h-5 text-electric-cyan" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-ghost-white group-hover:text-electric-cyan transition-colors">Fundamentos LLM</h3>
                                <p className="text-[10px] font-mono text-muted tracking-wider">FASE 0 · PREREQUISITO</p>
                            </div>
                        </div>
                        <p className="text-sm text-muted leading-relaxed">La "física" interna: compresión, predicción probabilística, ventana de contexto y sesgo de atención.</p>
                    </Link>
                </BentoCell>

                <BentoCell span={1} glowColor="magenta">
                    <Link to="/pathologies" className="block h-full">
                        <div className="relative h-32 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-2xl">
                            <img
                                src="https://placehold.co/600x250/0f1520/e040fb?text=Pathology+Map&font=mono"
                                alt="Pathology map"
                                className="w-full h-full object-cover opacity-60 header-image"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-deep-slate to-transparent" />
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-neon-magenta/10 flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-neon-magenta" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-ghost-white group-hover:text-neon-magenta transition-colors">Patologías</h3>
                                <p className="text-[10px] font-mono text-muted tracking-wider">20+ FALLOS DOCUMENTADOS</p>
                            </div>
                        </div>
                        <p className="text-sm text-muted leading-relaxed">Fallos epistémicos, psicológicos, estructurales y operativos. Conoce al enemigo.</p>
                    </Link>
                </BentoCell>

                <BentoCell span={2} glowColor="cyan">
                    <Link to="/control" className="block h-full">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-electric-cyan/10 flex items-center justify-center">
                                        <ShieldCheck className="w-5 h-5 text-electric-cyan" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-ghost-white">Framework C.O.N.T.R.O.L.</h3>
                                        <p className="text-[10px] font-mono text-muted tracking-wider">7 FASES · NÚCLEO DEL CURSO</p>
                                    </div>
                                </div>
                                <p className="text-sm text-muted leading-relaxed">El sistema completo de ingeniería de prompts: Contexto, Omni-Rol, Normas, Traza, Realidad, Output, y Loop.</p>
                                <div className="mt-4 flex gap-2 flex-wrap">
                                    {['C', 'O', 'N', 'T', 'R', 'O', 'L'].map((letter, i) => (
                                        <span key={i} className="w-8 h-8 rounded-lg bg-surface-2 border border-surface-3 flex items-center justify-center text-xs font-black text-electric-cyan">
                                            {letter}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="relative w-full md:w-48 h-32 md:h-auto rounded-xl overflow-hidden shrink-0">
                                <img
                                    src="/images/card-framework-shield.png"
                                    alt="Framework diagram"
                                    className="w-full h-full object-cover opacity-50 header-image"
                                />
                            </div>
                        </div>
                    </Link>
                </BentoCell>
            </BentoGrid>
        </motion.section>

        {/* Tool placeholder */}
        <motion.section variants={fadeUp}>
            <Link to="/tools" className="block">
                <BentoCell glowColor="amber" className="bg-surface-1">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-glow/10 flex items-center justify-center">
                            <Wrench className="w-6 h-6 text-amber-glow" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-ghost-white">Herramienta Interactiva</h3>
                            <p className="text-xs font-mono text-amber-glow/60 tracking-wider">PRÓXIMAMENTE · FASE 2</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted ml-auto" />
                    </div>
                </BentoCell>
            </Link>
        </motion.section>

        {/* Footer */}
        <div className="text-center text-xs font-mono text-muted/40 pt-8 pb-4 border-t border-surface-3">
            DATOS PERSISTIDOS LOCALMENTE · EXPORTA TU BACKUP
        </div>
    </motion.div>
);

export default Home;
