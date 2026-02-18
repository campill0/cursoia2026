import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhaseCard, phaseData } from '../components/ui/PhaseCard';
import { CompleteButton } from '../components/ui/CompleteButton';
import { MarkdownRenderer } from '../components/ui/MarkdownRenderer';
import { getControlPhases } from '../lib/content';
import { Crosshair, BookOpen, ChevronDown, Search, X, ChevronUp, ChevronDown as ChevronDownIcon } from 'lucide-react';

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

// ─── Highlight helper ────────────────────────────────────────────────────────
/**
 * Splits `text` by `query` and returns an array of React nodes with
 * matching segments wrapped in a <mark> element.
 */
const HighlightText = ({ text, query }) => {
    if (!query || !text) return <>{text}</>;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
    return (
        <>
            {parts.map((part, i) =>
                part.toLowerCase() === query.toLowerCase()
                    ? <mark key={i} className="search-highlight">{part}</mark>
                    : part
            )}
        </>
    );
};

// ─── PhaseSection ────────────────────────────────────────────────────────────
const PhaseSection = ({ phase, index, isExpanded, onToggle, searchQuery }) => {
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
                        <HighlightText text={phase.title} query={searchQuery} />
                    </h2>
                    <p className={`text-xs font-mono ${cs.text} opacity-70 mt-0.5`}>
                        <HighlightText text={phase.subtitle} query={searchQuery} />
                    </p>
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
                                <MarkdownRenderer content={phase.content} searchQuery={searchQuery} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.section>
    );
};

// ─── SearchBar ───────────────────────────────────────────────────────────────
const SearchBar = ({ value, onChange, onClear, resultCount, currentResult, onPrev, onNext }) => {
    const inputRef = useRef(null);

    useEffect(() => {
        const handleKey = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
                e.preventDefault();
                inputRef.current?.focus();
            }
            if (e.key === 'Escape') onClear();
            if (e.key === 'Enter' && value) {
                e.shiftKey ? onPrev() : onNext();
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [value, onClear, onPrev, onNext]);

    return (
        <div className="relative flex items-center gap-2 bg-surface-1 border border-surface-3 rounded-xl px-4 py-3 focus-within:border-electric-cyan/50 transition-colors group">
            <Search className="w-4 h-4 text-electric-cyan/60 shrink-0" />
            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder="Buscar en las fases… (Ctrl+F)"
                className="flex-1 bg-transparent text-sm text-ghost-white placeholder:text-muted/40 outline-none font-mono"
            />

            {/* Result counter */}
            {value && (
                <div className="flex items-center gap-1 shrink-0">
                    <span className="text-xs font-mono text-muted/60 tabular-nums min-w-[4rem] text-right">
                        {resultCount === 0
                            ? 'Sin resultados'
                            : `${currentResult + 1} / ${resultCount}`}
                    </span>
                    <div className="flex items-center gap-0.5 ml-1">
                        <button
                            onClick={onPrev}
                            disabled={resultCount === 0}
                            title="Resultado anterior (Shift+Enter)"
                            className="w-6 h-6 rounded flex items-center justify-center text-muted/60 hover:text-electric-cyan hover:bg-electric-cyan/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                            onClick={onNext}
                            disabled={resultCount === 0}
                            title="Resultado siguiente (Enter)"
                            className="w-6 h-6 rounded flex items-center justify-center text-muted/60 hover:text-electric-cyan hover:bg-electric-cyan/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronDownIcon className="w-3.5 h-3.5" />
                        </button>
                    </div>
                    <button
                        onClick={onClear}
                        title="Limpiar búsqueda (Esc)"
                        className="w-6 h-6 rounded flex items-center justify-center text-muted/60 hover:text-red-glow hover:bg-red-glow/10 transition-colors ml-0.5"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>
            )}
        </div>
    );
};

// ─── Control (main page) ─────────────────────────────────────────────────────
const Control = () => {
    const phases = getControlPhases();
    const [expandedPhaseId, setExpandedPhaseId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentResultIdx, setCurrentResultIdx] = useState(0);
    const highlightRefs = useRef([]);

    // ── Filtering ──────────────────────────────────────────────────────────
    const filteredPhases = useMemo(() => {
        if (!searchQuery.trim()) return phases;
        const q = searchQuery.toLowerCase();
        return phases.filter(phase =>
            phase.title?.toLowerCase().includes(q) ||
            phase.subtitle?.toLowerCase().includes(q) ||
            phase.content?.toLowerCase().includes(q)
        );
    }, [phases, searchQuery]);

    // ── Auto-expand filtered phases ────────────────────────────────────────
    const [manualExpanded, setManualExpanded] = useState(null);

    const expandedSet = useMemo(() => {
        if (!searchQuery.trim()) {
            // No search: only the manually toggled phase is open
            return manualExpanded ? new Set([manualExpanded]) : new Set();
        }
        // Search active: expand all matching phases
        return new Set(filteredPhases.map(p => p.key));
    }, [searchQuery, filteredPhases, manualExpanded]);

    // ── Count & navigate highlights ────────────────────────────────────────
    const countHighlights = useCallback(() => {
        return document.querySelectorAll('mark.search-highlight').length;
    }, []);

    const scrollToHighlight = useCallback((idx) => {
        const marks = document.querySelectorAll('mark.search-highlight');
        if (!marks.length) return;
        const safeIdx = ((idx % marks.length) + marks.length) % marks.length;
        marks.forEach((m, i) => {
            m.classList.toggle('search-highlight--active', i === safeIdx);
        });
        marks[safeIdx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, []);

    // Reset result index when query changes
    useEffect(() => {
        setCurrentResultIdx(0);
    }, [searchQuery]);

    // After DOM updates, scroll to current result
    useEffect(() => {
        if (!searchQuery.trim()) return;
        // Small delay to let AnimatePresence finish expanding
        const timer = setTimeout(() => {
            const total = countHighlights();
            if (total > 0) scrollToHighlight(currentResultIdx);
        }, 350);
        return () => clearTimeout(timer);
    }, [searchQuery, expandedSet, currentResultIdx, countHighlights, scrollToHighlight]);

    const totalResults = useMemo(() => {
        // We can't easily count DOM nodes in useMemo, so we expose a live count
        // via a state updated after render. We use a ref-based approach instead.
        return 0; // placeholder; real count is DOM-based, see below
    }, []);

    // Live DOM-based result count (updated after paint)
    const [liveCount, setLiveCount] = useState(0);
    useEffect(() => {
        if (!searchQuery.trim()) { setLiveCount(0); return; }
        const timer = setTimeout(() => {
            setLiveCount(document.querySelectorAll('mark.search-highlight').length);
        }, 400);
        return () => clearTimeout(timer);
    }, [searchQuery, expandedSet]);

    const handleNext = useCallback(() => {
        const total = countHighlights();
        if (!total) return;
        const next = (currentResultIdx + 1) % total;
        setCurrentResultIdx(next);
        scrollToHighlight(next);
    }, [currentResultIdx, countHighlights, scrollToHighlight]);

    const handlePrev = useCallback(() => {
        const total = countHighlights();
        if (!total) return;
        const prev = (currentResultIdx - 1 + total) % total;
        setCurrentResultIdx(prev);
        scrollToHighlight(prev);
    }, [currentResultIdx, countHighlights, scrollToHighlight]);

    const handleClear = useCallback(() => {
        setSearchQuery('');
        setCurrentResultIdx(0);
        setLiveCount(0);
    }, []);

    // ── Toggle (manual, no search) ─────────────────────────────────────────
    const handleToggle = (key) => {
        if (searchQuery.trim()) {
            // In search mode, clicking collapses/expands individual phases
            // We don't override search expansion; just scroll
            const el = document.getElementById(`phase-${key}`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }
        setManualExpanded(prev => prev === key ? null : key);
    };

    const handleCardClick = (key) => {
        setManualExpanded(key);
        setTimeout(() => {
            const el = document.getElementById(`phase-${key}`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    // Phases to render (filtered or all)
    const phasesToRender = searchQuery.trim() ? filteredPhases : phases;

    return (
        <div className="pb-20">

            <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-12">

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
                                    isExpanded={expandedSet.has(phase.key)}
                                    onToggle={() => handleCardClick(phase.key)}
                                />
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Intro */}
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

            </motion.div>

            {/* Search Bar — sticky. Hijo directo del div raíz (sin transform) para que sticky funcione. */}
            <div className="sticky top-14 lg:top-0 z-20 mt-12 -mx-4 md:-mx-8 px-4 md:px-8 py-3 bg-obsidian/80 backdrop-blur-xl border-b border-surface-3/60">
                <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    onClear={handleClear}
                    resultCount={liveCount}
                    currentResult={currentResultIdx}
                    onPrev={handlePrev}
                    onNext={handleNext}
                />
                <AnimatePresence>
                    {searchQuery.trim() && filteredPhases.length === 0 && (
                        <motion.p
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            className="text-xs font-mono text-muted/50 mt-2 pl-1"
                        >
                            Ninguna fase contiene «{searchQuery}».
                        </motion.p>
                    )}
                    {searchQuery.trim() && filteredPhases.length > 0 && (
                        <motion.p
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            className="text-xs font-mono text-electric-cyan/50 mt-2 pl-1"
                        >
                            {filteredPhases.length} fase{filteredPhases.length !== 1 ? 's' : ''} encontrada{filteredPhases.length !== 1 ? 's' : ''} · {liveCount} coincidencia{liveCount !== 1 ? 's' : ''}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            {/* All phases — Accordion Style */}
            <div className="space-y-4 mt-12">
                {phasesToRender.map((phase, i) => (
                    <PhaseSection
                        key={phase.key}
                        phase={phase}
                        index={phases.indexOf(phase)}
                        isExpanded={expandedSet.has(phase.key)}
                        onToggle={() => handleToggle(phase.key)}
                        searchQuery={searchQuery.trim()}
                    />
                ))}
            </div>

            <div className="mt-12">
                <CompleteButton moduleId="control" />
            </div>

        </div>
    );
};

export default Control;
