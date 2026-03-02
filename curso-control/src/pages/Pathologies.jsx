import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CompleteButton } from '../components/ui/CompleteButton';
import { MarkdownRenderer } from '../components/ui/MarkdownRenderer';
import { getPathologiesContent } from '../lib/content';
import {
    Brain,
    ShieldAlert,
    Zap,
    Activity,
    Search,
    UserSearch,
    Database,
    RefreshCcw,
    AlertCircle,
    Info,
    Repeat
} from 'lucide-react';

const PathologyCard = ({ item, cs, isFlashGlobal }) => {
    const [localFlip, setLocalFlip] = React.useState(false);

    // Reset local flip when global state changes
    React.useEffect(() => {
        setLocalFlip(false);
    }, [isFlashGlobal]);

    const showingFlash = isFlashGlobal ? !localFlip : false;

    const getImageName = (name) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes("fluidez engañosa")) return "fluidez_enganosa";
        if (lowerName.includes("búnker temporal")) return "bunker_temporal";
        if (lowerName.includes("fabricación de citas")) return "fabricacion_citas";
        if (lowerName.includes("colapso epistémico")) return "colapso_epistemico";
        if (lowerName.includes("alucinación")) return "alucinacion";
        if (lowerName.includes("memoria borrosa")) return "memoria_borrosa";
        if (lowerName.includes("falsedades por imitación")) return "falsedades_imitacion";
        return null;
    };

    const imgName = getImageName(item.name);
    const imgSrc = imgName ? `/images/pathologies/${imgName}.png?v=2` : `https://picsum.photos/seed/${item.name.replace(/\s+/g, '')}/400/200`;

    return (
        <div
            className="relative h-full cursor-pointer group"
            style={{ perspective: '1000px' }}
            onClick={() => {
                if (isFlashGlobal) setLocalFlip(!localFlip);
            }}
        >
            <motion.div
                className="w-full h-full relative"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: showingFlash ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
            >
                <div
                    className="w-full h-full flex flex-col rounded-2xl border border-surface-3 bg-surface-1/40 group-hover:bg-surface-2 transition-colors overflow-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    {/* Image cover */}
                    <div className="w-full relative shrink-0 border-b border-surface-3/50 bg-surface-1/50 overflow-hidden aspect-video">
                        <img
                            src={imgSrc}
                            alt={item.name}
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                        />
                        <div className={`absolute inset-0 ${cs.accent} mix-blend-overlay opacity-50`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-1/80 via-transparent to-transparent" />

                        {isFlashGlobal && localFlip && (
                            <div className="absolute top-3 right-3 text-white bg-obsidian/60 p-1.5 rounded-lg border border-surface-3 backdrop-blur-md group-hover:border-surface-4 transition-colors z-10">
                                <Repeat className="w-3.5 h-3.5" />
                            </div>
                        )}
                    </div>

                    <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-start gap-3 mb-3">
                            <div className={`mt-1.5 w-1.5 h-1.5 rounded-full ${cs.accent} shrink-0 shadow-[0_0_8px_currentColor] group-hover:scale-125 transition-transform`} />
                            <h3 className="text-sm font-bold text-ghost-white group-hover:text-white transition-colors leading-tight">
                                {item.name}
                            </h3>
                        </div>
                        <div className="text-[1.05rem] text-muted leading-relaxed pl-4 [&>strong]:font-semibold [&>strong]:px-1.5 [&>strong]:py-0.5 [&>strong]:rounded flex-1">
                            <MarkdownRenderer content={item.desc} className="prose-sm p-0 prose-p:my-0 prose-p:leading-relaxed" />
                        </div>
                    </div>
                </div>

                {/* BACK: Flash */}
                <div
                    className={`absolute inset-0 w-full h-full p-5 rounded-2xl border border-${cs.accent.replace('bg-', '')}/30 bg-surface-1/20 flex flex-col justify-center items-center text-center shadow-[0_0_15px_rgba(0,0,0,0.2)]`}
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    <h3 className="text-[10px] font-mono text-muted uppercase tracking-wider mb-2 opacity-70">
                        {item.name.split(' (')[0]}
                    </h3>
                    <p className={`text-xl font-black ${cs.text} leading-tight`}>
                        {item.flashDesc}
                    </p>

                    {/* Hover hint */}
                    <div className="absolute bottom-4 text-[9px] font-mono text-muted/30 uppercase tracking-widest flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Repeat className="w-3 h-3" />
                        Click para ver detalle
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 25 } }
};

// UI Metadata used to map non-markdown specific layout info to the parsed markdown (e.g., icons)
const uiMetadata = {
    '1': { icon: Search, color: 'cyan' },
    '2': { icon: UserSearch, color: 'magenta' },
    '3': { icon: Database, color: 'emerald' },
    '4': { icon: RefreshCcw, color: 'amber' }
};

const parsePathologiesMarkdown = (md) => {
    // Basic splitting
    const parts = md.split('#### **');
    if (parts.length < 1) return { intro: '', categories: [], clinicalSession: '' };

    // Extract Intro and Clinical Session 
    // The intro is everything before the first `#### **`
    let rawIntro = parts[0].trim();
    // Remove the main H3 title from intro if it exists (usually "### **Patologías...")
    rawIntro = rawIntro.replace(/^### \*\*.*?\*\*\n+/, '');

    // The clinical session is at the bottom. We look for the last block and split by `***` 
    // since we added a separator before the Clinical Session in the markdown
    let lastBlock = parts[parts.length - 1];
    let clinicalSessionText = '';

    const clinicalSplit = lastBlock.split('***');
    if (clinicalSplit.length > 1) {
        lastBlock = clinicalSplit[0]; // The category content
        clinicalSessionText = clinicalSplit[1].trim();
        parts[parts.length - 1] = lastBlock; // Update parts so category parsing works normally

        // Remove the "### Sesión Clínica" header from the content to style it manually later if needed
        clinicalSessionText = clinicalSessionText.replace(/^### Sesión Clínica\n+/, '');
    }

    let categories = [];

    // Process each category block (ignoring the intro text before first #### **)
    for (let i = 1; i < parts.length; i++) {
        const block = parts[i];

        // Match `1\. Category Name (Subtitle)**\n\nDescription`
        const titleMatch = block.match(/(.)\\?\.\s+(.*?)(?:\s+\((.*?)\))?\*\*\s*\n+([\s\S]*?)(?=\n\* |\* \*\*|$)/);

        if (!titleMatch) continue;

        const categoryId = titleMatch[1]; // '1', '2', etc.
        const categoryTitle = titleMatch[2].trim();
        const categorySubtitle = titleMatch[3] ? titleMatch[3].trim() : 'Fallo Sistémico';
        const categoryDesc = titleMatch[4] ? titleMatch[4].trim() : '';

        // Determine metadata
        const meta = uiMetadata[categoryId] || { icon: Search, color: 'cyan' };

        // Parse list items
        const itemMatches = block.split(/\n\*\s+\*\*/);
        let items = [];

        for (let j = 1; j < itemMatches.length; j++) {
            const itemBlock = itemMatches[j];
            // Format is exactly `Item Name:**\n> flash: Flash description\nDescription`
            const splitPoint = itemBlock.indexOf(':**');

            if (splitPoint !== -1) {
                let name = itemBlock.substring(0, splitPoint).trim();
                name = name.replaceAll('*', ''); // Remove any lingering internal bold/italics in names for consistency

                let remainingContent = itemBlock.substring(splitPoint + 3).trim();

                // Extract flash text
                let flashDescStr = name.split(' (')[0]; // Default fallback
                const flashMatch = remainingContent.match(/^>\s*flash:\s*(.*?)(?:\n|$)/i);
                if (flashMatch) {
                    flashDescStr = flashMatch[1].trim();
                    // Remove the flash line from the remaining description
                    remainingContent = remainingContent.replace(flashMatch[0], '').trim();
                }

                items.push({
                    name: name,
                    flashDesc: flashDescStr,
                    desc: remainingContent
                });
            }
        }

        categories.push({
            id: `cat-${categoryId}`,
            title: categoryTitle,
            subtitle: categorySubtitle,
            description: categoryDesc,
            icon: meta.icon,
            color: meta.color,
            items: items
        });
    }

    return {
        intro: rawIntro,
        categories: categories,
        clinicalSession: clinicalSessionText
    };
};

const colorMap = {
    cyan: { text: 'text-electric-cyan', bg: 'bg-electric-cyan/10', border: 'border-electric-cyan/30', accent: 'bg-electric-cyan', strongModifier: '[&>strong]:text-electric-cyan [&>strong]:bg-electric-cyan/10' },
    magenta: { text: 'text-neon-magenta', bg: 'bg-neon-magenta/10', border: 'border-neon-magenta/30', accent: 'bg-neon-magenta', strongModifier: '[&>strong]:text-neon-magenta [&>strong]:bg-neon-magenta/10' },
    emerald: { text: 'text-emerald-glow', bg: 'bg-emerald-glow/10', border: 'border-emerald-glow/30', accent: 'bg-emerald-glow', strongModifier: '[&>strong]:text-emerald-glow [&>strong]:bg-emerald-glow/10' },
    amber: { text: 'text-amber-glow', bg: 'bg-amber-glow/10', border: 'border-amber-glow/30', accent: 'bg-amber-glow', strongModifier: '[&>strong]:text-amber-glow [&>strong]:bg-amber-glow/10' },
};

const Pathologies = () => {
    const [isFlashGlobal, setIsFlashGlobal] = useState(false);

    const pathologyData = useMemo(() => {
        const md = getPathologiesContent();
        return parsePathologiesMarkdown(md);
    }, []);

    return (
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-12 pb-20">

            {/* Header */}
            <motion.div variants={fadeUp} className="relative rounded-3xl overflow-hidden border border-surface-3 shadow-2xl">
                <img
                    src="/images/header-pathology-atlas.jpeg"
                    alt="Pathology atlas"
                    className="w-full h-56 md:h-72 object-cover opacity-30 header-image scale-105"
                />
                <div className="header-bloom" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent z-[2]" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 z-[3]">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neon-magenta/20 text-neon-magenta border border-neon-magenta/30 tracking-wider">MÓDULO 2</span>
                        <span className="text-[10px] font-mono text-muted/80 tracking-widest uppercase">ATLAS DE FALLOS</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black header-text-shadow mb-4 leading-tight">
                        <span className="text-ghost-white">Atlas de </span><span className="text-neon-magenta">Patologías</span><span className="text-ghost-white"> del LLM</span>
                    </h1>
                    <p className="text-lg text-muted max-w-2xl header-text-shadow leading-relaxed">
                        Mapa diagnóstico de comportamientos emergentes y fallos estructurales.
                    </p>
                </div>
            </motion.div>

            {/* Intro Section Wrapper for TOC */}
            <motion.section id="intro-diagnostica" variants={fadeUp} className="space-y-12">

                {/* Intro: Connection to Module 1 */}
                <motion.div variants={fadeUp} className="space-y-5">
                    <div className="relative">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-magenta/50 to-transparent rounded-full" />
                        <div className="pl-8 space-y-4">
                            <div className="text-[1.05rem] text-ghost-white/90 leading-[1.8] [&>p]:mb-4 last:[&>p]:mb-0 [&>p>strong]:text-electric-cyan [&>p>strong]:font-semibold [&>p>strong]:bg-[rgba(0,229,255,0.15)] [&>p>strong]:px-1.5 [&>p>strong]:py-0.5 [&>p>strong]:rounded">
                                <MarkdownRenderer content={pathologyData.intro} className="prose-p:my-0" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Classification Intro */}
                <motion.div variants={fadeUp} className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl border border-neon-magenta/20 bg-neon-magenta/5">
                    <div className="shrink-0 pt-1">
                        <div className="w-10 h-10 rounded-full bg-neon-magenta/20 flex items-center justify-center text-neon-magenta">
                            <Brain className="w-5 h-5" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-neon-magenta uppercase tracking-wider mb-2">Enfoque Diagnóstico</h3>
                        <p className="text-ghost-white/90 leading-relaxed text-sm">
                            Para dominar el <em>Prompt Engineering</em> avanzado, debemos dejar de ver los fallos como "magia negra" y empezar a verlos como <strong className="text-ghost-white">diagnósticos clínicos</strong>. Hemos clasificado estas patologías en cuatro grandes áreas de impacto:
                        </p>
                    </div>
                </motion.div>

                {/* 4 Category Previews */}
                <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-6">
                    {/* 1. Epistémico */}
                    <div className="p-5 rounded-2xl border border-electric-cyan/20 bg-surface-1/40 space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-electric-cyan/10 flex items-center justify-center border border-electric-cyan/20">
                                <Search className="w-4 h-4 text-electric-cyan" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-ghost-white">1. Patologías de la Verdad y el Conocimiento</h4>
                                <span className="text-[10px] font-mono text-electric-cyan tracking-wider uppercase">Fallo Epistémico</span>
                            </div>
                        </div>
                        <p className="text-xs text-muted/90 italic leading-relaxed">Surgen cuando la probabilidad estadística choca con la realidad fáctica.</p>
                        <p className="text-xs text-ghost-white/80 leading-relaxed">
                            Aquí es donde la <strong className="text-ghost-white">Compresión con pérdida</strong> y el <strong className="text-ghost-white">Sistema Cerrado</strong> que vimos anteriormente pasan factura. El modelo, al ser un "autocompletador" entrenado para ser fluido, prefiere inventar un dato (<strong className="text-electric-cyan">Alucinación</strong>) o fabricar una fuente (<strong className="text-electric-cyan">Fabricación de Citas</strong>) antes que romper la secuencia lógica de su discurso. Es el precio de transformar la biblioteca del mundo en una libreta de notas matemática.
                        </p>
                    </div>

                    {/* 2. Psicológico */}
                    <div className="p-5 rounded-2xl border border-neon-magenta/20 bg-surface-1/40 space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-neon-magenta/10 flex items-center justify-center border border-neon-magenta/20">
                                <UserSearch className="w-4 h-4 text-neon-magenta" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-ghost-white">2. Patologías del Comportamiento y Alineación</h4>
                                <span className="text-[10px] font-mono text-neon-magenta tracking-wider uppercase">Fallo Socio-Adulante</span>
                            </div>
                        </div>
                        <p className="text-xs text-muted/90 italic leading-relaxed">Efectos secundarios del entrenamiento para "gustar" al humano.</p>
                        <p className="text-xs text-ghost-white/80 leading-relaxed">
                            Como aprendimos en el apartado de <strong className="text-ghost-white">RLHF</strong>, el modelo ha sido premiado por ser servicial. Esto genera una "personalidad" que puede derivar en la <strong className="text-neon-magenta">Sicofancia</strong> (darte la razón aunque no la tengas) o en la <strong className="text-neon-magenta">Verbosidad</strong> (relleno innecesario para parecer más útil). El modelo no intenta ser honesto; intenta ser el asistente que tú quieres que sea.
                        </p>
                    </div>

                    {/* 3. Estructural */}
                    <div className="p-5 rounded-2xl border border-emerald-glow/20 bg-surface-1/40 space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-emerald-glow/10 flex items-center justify-center border border-emerald-glow/20">
                                <Database className="w-4 h-4 text-emerald-glow" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-ghost-white">3. Patologías de Memoria y Contexto</h4>
                                <span className="text-[10px] font-mono text-emerald-glow tracking-wider uppercase">Fallo Estructural</span>
                            </div>
                        </div>
                        <p className="text-xs text-muted/90 italic leading-relaxed">Limitaciones físicas de la "Mesa de Trabajo" o Ventana de Contexto.</p>
                        <p className="text-xs text-ghost-white/80 leading-relaxed">
                            Aquí se manifiestan las grietas del <strong className="text-ghost-white">Mecanismo de Atención</strong>. Cuando la ventana se llena o la instrucción es ambigua, aparecen fenómenos como el <strong className="text-emerald-glow">Efecto "Lost-in-the-Middle"</strong> o el <strong className="text-emerald-glow">Envenenamiento de Memoria</strong>.
                        </p>
                    </div>

                    {/* 4. Sistémico */}
                    <div className="p-5 rounded-2xl border border-amber-glow/20 bg-surface-1/40 space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-amber-glow/10 flex items-center justify-center border border-amber-glow/20">
                                <RefreshCcw className="w-4 h-4 text-amber-glow" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-ghost-white">4. Patologías Operativas y de Evolución</h4>
                                <span className="text-[10px] font-mono text-amber-glow tracking-wider uppercase">Fallo Sistémico</span>
                            </div>
                        </div>
                        <p className="text-xs text-muted/90 italic leading-relaxed">Fallos derivados del uso continuo y la naturaleza de la infraestructura.</p>
                        <p className="text-xs text-ghost-white/80 leading-relaxed">
                            Desde la <strong className="text-amber-glow">Regresión por Actualización</strong> hasta la vulnerabilidad ante <strong className="text-amber-glow">Inyecciones de Prompt</strong>, estas patologías responden a cómo el modelo interactúa con el mundo exterior y con sus propios filtros de seguridad.
                        </p>
                    </div>
                </motion.div>

                {/* Clinical Quote */}
                <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-surface-3 bg-deep-slate/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <ShieldAlert className="w-20 h-20 text-neon-magenta -rotate-12" />
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-1 shrink-0 bg-neon-magenta/50 rounded-full self-stretch" />
                        <div className="space-y-3">
                            <div className="text-[1.05rem] text-ghost-white/80 leading-relaxed [&>p>strong]:text-neon-magenta [&>p>strong]:font-bold">
                                <MarkdownRenderer content={pathologyData.clinicalSession} className="prose-p:my-0" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.section>

            {/* Separator before detailed categories with GLOBAL FLASH TOGGLE */}
            <motion.div variants={fadeUp} className="flex flex-col md:flex-row items-center gap-4 py-8">
                <div className="h-px flex-1 bg-surface-3 hidden md:block" />
                <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-muted uppercase tracking-[0.2em]">Exploración Detallada</span>

                    {/* GLOBAL FLASH TOGGLE */}
                    <button
                        onClick={() => setIsFlashGlobal(!isFlashGlobal)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${isFlashGlobal ? 'bg-neon-magenta/10 text-neon-magenta border-neon-magenta shadow-[0_0_15px_rgba(255,0,255,0.15)]' : 'bg-surface-2 text-muted border-surface-3 hover:text-ghost-white hover:border-surface-4'}`}
                    >
                        <Zap className={`w-4 h-4 ${isFlashGlobal ? 'animate-pulse' : ''}`} />
                        Modo Resumen Flash {isFlashGlobal ? 'ON' : 'OFF'}
                    </button>
                </div>
                <div className="h-px flex-1 bg-surface-3" />
            </motion.div>

            {/* Content Sections */}
            <div className="space-y-16">
                {
                    pathologyData.categories.map((category) => {
                        const cs = colorMap[category.color];
                        return (
                            <motion.section key={category.id} id={category.id} variants={fadeUp} className="space-y-6">
                                {/* Category Header */}
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className={`w-12 h-12 rounded-2xl ${cs.bg} flex items-center justify-center border ${cs.border} shrink-0`}>
                                            <category.icon className={`w-6 h-6 ${cs.text}`} />
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-xl font-black text-ghost-white tracking-tight leading-none mb-1 uppercase">
                                                {category.title}
                                            </h2>
                                            <div className="flex items-center gap-2">
                                                <span className={`text-[10px] font-mono ${cs.text} tracking-[0.2em] uppercase font-bold whitespace-nowrap`}>{category.subtitle}</span>
                                                <span className={`flex-1 h-px ${cs.accent} opacity-20 hidden md:block`} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Removed individual category flash toggle as per instructions */}
                                </div>

                                <div className={`text-[1.05rem] text-ghost-white/80 leading-[1.7] max-w-3xl pl-16 [&>strong]:font-semibold [&>strong]:px-1.5 [&>strong]:py-0.5 [&>strong]:rounded ${cs.strongModifier}`}>
                                    <MarkdownRenderer content={category.description} className="prose-p:my-0" />
                                </div>

                                {/* Items Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {category.items.map((item, idx) => (
                                        <div key={idx} className="h-full">
                                            <PathologyCard item={item} cs={cs} isFlashGlobal={isFlashGlobal} />
                                        </div>
                                    ))}
                                </div>
                            </motion.section>
                        );
                    })}
            </div>

            {/* Quick Summary / Cheat Sheet Footer */}
            <motion.div id="resumen-patologias" variants={fadeUp} className="p-8 rounded-3xl bg-gradient-to-br from-surface-2 to-deep-slate border border-surface-3">
                <div className="flex items-center gap-3 mb-6">
                    <Activity className="w-5 h-5 text-electric-cyan" />
                    <h2 className="text-lg font-bold text-ghost-white">Resumen de Diagnóstico</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'EPISTÉMICO', icon: Search, color: 'text-electric-cyan', desc: 'Fallo de Conocimiento' },
                        { label: 'SOCIO-ADULANTE', icon: UserSearch, color: 'text-neon-magenta', desc: 'Fallo de Alineación' },
                        { label: 'ESTRUCTURAL', icon: Database, color: 'text-emerald-glow', desc: 'Fallo de Contexto' },
                        { label: 'SISTÉMICO', icon: RefreshCcw, color: 'text-amber-glow', desc: 'Fallo Operativo' },
                    ].map((badge, i) => (
                        <div key={i} className="flex flex-col items-center text-center p-4 rounded-xl bg-obsidian/40 border border-surface-3/30">
                            <badge.icon className={`w-6 h-6 ${badge.color} mb-2`} />
                            <span className="text-[9px] font-mono text-muted tracking-widest uppercase mb-1">{badge.label}</span>
                            <span className="text-xs text-ghost-white font-medium">{badge.desc}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            <CompleteButton moduleId="pathologies" />
        </motion.div>
    );
};

export default Pathologies;
