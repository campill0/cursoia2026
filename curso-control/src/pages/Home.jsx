import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BentoGrid, BentoCell } from '../components/ui/BentoGrid';
import { Brain, AlertTriangle, ShieldCheck, Wrench, ArrowRight, Zap, Target, Sparkles, Server, BookOpen, Layers } from 'lucide-react';

const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 25 } }
};

const scaleUp = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 25 } }
};

const Home = () => (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-16 pb-12">

        {/* Hero Section */}
        <motion.section variants={fadeUp} className="relative overflow-hidden rounded-[2.5rem] border border-surface-3 shadow-2xl shadow-electric-cyan/5">
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1920&auto=format&fit=crop"
                    alt="Neural Network Abstract"
                    className="w-full h-full object-cover opacity-25 mix-blend-screen"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-obsidian/90 via-obsidian/50 to-transparent" />
                <div className="header-bloom opacity-50" />
            </div>

            <div className="relative z-10 p-10 md:p-20 lg:p-24">
                <div className="max-w-3xl">
                    <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-cyan/10 border border-electric-cyan/20 text-electric-cyan text-xs md:text-sm font-mono mb-8 backdrop-blur-sm shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                        <Sparkles className="w-4 h-4" /> INGENIERÍA DE PROMPTS AVANZADA
                    </motion.div>

                    <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] mb-6">
                        <span className="text-ghost-white">Curso de</span>
                        <br />
                        <span className="gradient-text-cyan drop-shadow-[0_0_25px_rgba(0,229,255,0.4)]">Introducción a</span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-ghost-white to-surface-active">la IA</span>
                    </motion.h1>

                    <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted max-w-xl leading-relaxed font-light">
                        De la simple conversación a la <span className="text-electric-cyan font-medium">arquitectura cognitiva</span>. Domina los modelos de lenguaje con el framework sistemático <strong className="text-ghost-white font-black tracking-widest">C.O.N.T.R.O.L.</strong>
                    </motion.p>

                    <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-5">
                        <Link
                            to="/llms"
                            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-electric-cyan text-obsidian font-black text-sm hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:shadow-[0_0_40px_rgba(0,229,255,0.5)] active:scale-95"
                        >
                            Empezar ahora <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            to="/control"
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border border-surface-3 bg-surface-1/50 backdrop-blur-md text-ghost-white font-bold text-sm hover:bg-surface-2 transition-all duration-300 active:scale-95"
                        >
                            Ver Framework C.O.N.T.R.O.L.
                        </Link>
                    </motion.div>
                </div>
            </div>
        </motion.section>

        {/* Stats strip */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 px-2">
            {[
                { value: '11', label: 'Módulos', sub: 'Y LECCIONES CLAVE', icon: <BookOpen className="w-4 h-4 text-electric-cyan/50" /> },
                { value: '7', label: 'Fases', sub: 'FRAMEWORK CONTROL', icon: <Layers className="w-4 h-4 text-emerald-glow/50" /> },
                { value: '25+', label: 'Patologías', sub: 'CASOS DIAGNOSTICADOS', icon: <AlertTriangle className="w-4 h-4 text-neon-magenta/50" /> },
                { value: '1', label: 'Guía', sub: 'PRACTICA CHATGPT', icon: <Wrench className="w-4 h-4 text-amber-glow/50" /> },
            ].map((stat, i) => (
                <div key={i} className="group relative bg-surface-1 border border-surface-3 rounded-2xl p-6 text-center overflow-hidden hover:border-surface-active transition-colors duration-300">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-electric-cyan/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex justify-center mb-3">{stat.icon}</div>
                    <div className="text-4xl font-black text-ghost-white tracking-tight">{stat.value}</div>
                    <div className="text-sm font-bold text-ghost-white mt-1">{stat.label}</div>
                    <div className="text-[10px] font-mono text-muted tracking-widest mt-2">{stat.sub}</div>
                </div>
            ))}
        </motion.div>

        {/* Course Modules Visuals */}
        <div className="space-y-6">
            <motion.div variants={fadeUp} className="flex items-end justify-between px-2 mb-8">
                <div>
                    <h2 className="text-3xl font-black text-ghost-white mb-2">Contenido <span className="text-electric-cyan">del Curso</span></h2>
                    <p className="text-muted font-mono text-xs">EL CAMINO HACIA LA MAESTRÍA EN IA</p>
                </div>
            </motion.div>

            <BentoGrid className="grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

                {/* Módulo 1: Fundamentos */}
                <BentoCell span={2} glowColor="cyan" className="bg-surface-1 hover:bg-surface-1/80 transition-colors">
                    <Link to="/llms" className="block h-full group">
                        <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-[1.3rem]">
                            <img
                                src={`${import.meta.env.BASE_URL}images/fundamentos_llms_1772420207578.png`}
                                alt="Fundamentos"
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-surface-1 via-surface-1/50 to-transparent" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="px-4 py-2 bg-obsidian/80 backdrop-blur-md rounded-full text-xs font-bold text-electric-cyan flex items-center gap-2">
                                    Explorar módulo <ArrowRight className="w-3 h-3" />
                                </span>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 shrink-0 rounded-2xl bg-electric-cyan/10 flex items-center justify-center border border-electric-cyan/20 group-hover:scale-110 transition-transform">
                                <Server className="w-6 h-6 text-electric-cyan" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-ghost-white mb-1">Módulo 1: Fundamentos</h3>
                                <p className="text-[10px] font-mono text-electric-cyan tracking-wider mb-2">LA FÍSICA DEL MODELO</p>
                                <p className="text-sm text-muted leading-relaxed">
                                    Adéntrate en las tripas de los grandes modelos de lenguaje (LLMs). Comprende conceptos clave como la compresión probabilística, los embeddings, la atención y los límites de la ventana de contexto.
                                </p>
                            </div>
                        </div>
                    </Link>
                </BentoCell>

                {/* Módulo 2: Patologías */}
                <BentoCell span={2} glowColor="magenta" className="bg-surface-1 hover:bg-surface-1/80 transition-colors">
                    <Link to="/pathologies" className="block h-full group">
                        <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-[1.3rem]">
                            <div className="absolute inset-0 bg-[#2d0519] mix-blend-color z-10" />
                            <img
                                src={`${import.meta.env.BASE_URL}images/patologias_llms_1772420230272.png`}
                                alt="Patologías"
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 contrast-125"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-surface-1 via-surface-1/50 to-transparent z-20" />
                            <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="px-4 py-2 bg-obsidian/80 backdrop-blur-md rounded-full text-xs font-bold text-neon-magenta flex items-center gap-2">
                                    Ver patologías <ArrowRight className="w-3 h-3" />
                                </span>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 shrink-0 rounded-2xl bg-neon-magenta/10 flex items-center justify-center border border-neon-magenta/20 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(224,64,251,0.2)]">
                                <AlertTriangle className="w-6 h-6 text-neon-magenta" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-ghost-white mb-1">Módulo 2: Patologías de la IA</h3>
                                <p className="text-[10px] font-mono text-neon-magenta tracking-wider mb-2">CONOCE A TU ENEMIGO</p>
                                <p className="text-sm text-muted leading-relaxed">
                                    La IA no siempre dice la verdad. Descubre el origen de las alucinaciones, la sicofancia (el peligro de que te dé la razón), la degradación del contexto y los sesgos estructurales inherentes a su concepción.
                                </p>
                            </div>
                        </div>
                    </Link>
                </BentoCell>

                {/* Módulo 3: Framework C.O.N.T.R.O.L (Full Width) */}
                <BentoCell span={2} glowColor="cyan" className="lg:col-span-4 md:col-span-3 sm:col-span-1 bg-obsidian border-surface-active p-8 relative overflow-hidden group">
                    <div className="absolute z-0 inset-0 bg-cover bg-center opacity-15 group-hover:opacity-25 transition-opacity mix-blend-screen" style={{ backgroundImage: `url('${import.meta.env.BASE_URL}images/framework_control_1772420252617.png')` }}></div>
                    <div className="absolute z-0 right-0 top-0 w-1/2 h-full bg-gradient-to-l from-electric-cyan/5 to-transparent pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex flex-col lg:flex-row gap-10 items-center">

                            <Link to="/control" className="lg:w-1/3 block group">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-cyan/20 text-electric-cyan text-xs font-bold mb-4 border border-electric-cyan/20">
                                    <Layers className="w-3 h-3" /> MÓDULO 3 · NÚCLEO
                                </div>
                                <h3 className="text-3xl lg:text-4xl font-black text-ghost-white mb-4">Framework <span className="gradient-text-cyan">C.O.N.T.R.O.L.</span></h3>
                                <p className="text-muted leading-relaxed mb-6">
                                    Siete fases tácticas diseñadas para contener las patologías, dirigir el razonamiento y asegurar la fiabilidad de tus implementaciones de IA. Deja de escribir simples prompts y comienza a hacer <strong>ingeniería de sistemas cognitivos</strong>.
                                </p>
                                <div className="inline-flex items-center gap-2 text-electric-cyan text-sm font-bold group-hover:underline pr-4 py-2 rounded-lg transition-all">
                                    Ir al Framework completo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>

                            {/* Fases Grid */}
                            <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
                                {[
                                    { letter: 'C', key: 'C', title: 'Contexto Curado', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
                                    { letter: 'O', key: 'O', title: 'Omni-Rol', color: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20' },
                                    { letter: 'N', key: 'N', title: 'Normas', color: 'bg-red-500/10 text-red-400 border-red-500/20' },
                                    { letter: 'T', key: 'T', title: 'Tutela Razón', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
                                    { letter: 'R', key: 'R', title: 'Realidad', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
                                    { letter: 'O₂', key: 'O2', title: 'Output', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
                                    { letter: 'L', key: 'L', title: 'Loop Mejora', color: 'bg-violet-500/10 text-violet-400 border-violet-500/20' },
                                ].map((phase, idx) => (
                                    <Link key={idx} to="/control" state={{ targetPhase: phase.key }} className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center gap-2 transition-all duration-300 hover:scale-105 hover:brightness-125 hover:shadow-lg ${phase.color}`}>
                                        <div className="text-2xl lg:text-3xl font-black">{phase.letter}</div>
                                        <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">{phase.title}</div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </BentoCell>

                {/* Módulo 4: Aplicación y Práctica */}
                <BentoCell span={2} glowColor="amber" className="lg:col-span-4 md:col-span-3 sm:col-span-1 bg-gradient-to-br from-surface-1 to-obsidian group p-0 aspect-auto min-h-[400px]">
                    <Link to="/chatgpt-guide" className="block relative h-full w-full">
                        <div className="flex flex-col md:flex-row h-full">
                            <div className="w-full md:w-2/5 md:order-2 h-48 md:h-auto relative overflow-hidden shrink-0">
                                <img
                                    src={`${import.meta.env.BASE_URL}images/chatgpt_avanzado_1772420283630.png`}
                                    alt="ChatGPT Tools"
                                    className="w-full h-full object-cover opacity-50 sepia-[.3] hue-rotate-[-30deg] group-hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-surface-1 to-transparent hidden md:block" />
                                <div className="absolute inset-0 bg-gradient-to-t from-surface-1 to-transparent md:hidden" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-amber-glow/20 backdrop-blur-md border border-amber-glow/50 flex items-center justify-center text-amber-glow group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(255,176,0,0.3)]">
                                        <Wrench className="w-8 h-8" />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-3/5 md:order-1 flex flex-col justify-center p-8 md:p-12 lg:p-16">
                                <div className="inline-flex items-center gap-2 w-max px-3 py-1 rounded-full bg-amber-glow/10 text-amber-glow border border-amber-glow/20 text-xs font-mono tracking-wider mb-4">
                                    EL ENTORNO PROFESIONAL
                                </div>
                                <h3 className="text-3xl font-black text-ghost-white mb-2 group-hover:text-amber-glow transition-colors">Módulo 4: Guía de ChatGPT Avanzada</h3>
                                <p className="text-[12px] font-mono text-amber-glow/80 tracking-widest mb-4">LLEVANDO LA TEORÍA A LA PRÁCTICA</p>
                                <p className="text-base text-muted leading-relaxed mb-8">
                                    Aplica el framework C.O.N.T.R.O.L. de forma profesional configurando tu entorno de trabajo. Domina el <strong>Lienzo Canvas</strong> interactivo, programa <strong>Instrucciones Personalizadas</strong> que condicionen al modelo globalmente y exprime el <strong>Análisis de Datos</strong> local.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    {[
                                        { label: 'Memoria a largo plazo', icon: <Brain className="w-3 h-3" /> },
                                        { label: 'Custom Instructions', icon: <Target className="w-3 h-3" /> },
                                        { label: 'Canvas y Workspace', icon: <Layers className="w-3 h-3" /> },
                                    ].map((tag, i) => (
                                        <span key={i} className="px-4 py-2 bg-amber-glow/5 border border-amber-glow/10 text-amber-glow/90 text-xs font-bold flex items-center gap-2 rounded-lg">
                                            {tag.icon} {tag.label}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Link>
                </BentoCell>
            </BentoGrid>
        </div>

        {/* Footer */}
        <div className="text-center pt-24 pb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-surface-2 border border-surface-3 mb-6 relative group overflow-hidden cursor-crosshair">
                <div className="absolute inset-0 bg-electric-cyan/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <Brain className="w-6 h-6 text-muted group-hover:text-electric-cyan transition-colors relative z-10" />
            </div>
            <p className="text-xs font-mono text-muted/40 tracking-[0.2em] uppercase">
                Curso Avanzado de Inteligencia Artificial<br />
                <span className="mt-2 block opacity-50">Ingeniería de Prompts y Patologías de Lenguaje 2026</span>
            </p>
        </div>
    </motion.div>
);

export default Home;
