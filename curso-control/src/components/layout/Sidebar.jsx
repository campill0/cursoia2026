import React, { useRef, useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/db';
import {
    Home, Brain, AlertTriangle, ShieldCheck, Download, Upload,
    Check, ChevronLeft, ChevronRight, X, Wrench, Settings, BookMarked, Target
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { exportBackup, downloadBackup, importBackupReplace } from '../../services/storage';
import { Modal } from '../ui/Modal';

const navItems = [
    { path: '/', label: 'Inicio', icon: Home, moduleId: null },
    {
        path: '/llms',
        label: 'Fundamentos LLM',
        icon: Brain,
        moduleId: 'llms',
        subItems: [
            { id: 'section-01', label: '01 El Mapa del Lenguaje: Tokens y Embeddings' },
            { id: 'section-02', label: '02 El Motor: Arquitectura Transformer y Atención' },
            { id: 'section-03', label: '03 El Aprendizaje: Pre-entrenamiento' },
            { id: 'section-04', label: '04 El Refinamiento: Post-entrenamiento' },
            { id: 'section-05', label: '05 El Momento de la Verdad: Inferencia y Ventana de Contexto' },
            { id: 'mesa-de-trabajo', label: 'Mesa de Trabajo', isChild: true },
            { id: 'resumen-diseno', label: 'Resumen de Diseño: Flujo → Consecuencia' }
        ]
    },
    {
        path: '/pathologies',
        label: 'Patologías',
        icon: AlertTriangle,
        moduleId: 'pathologies',
        subItems: [
            { id: 'intro-diagnostica', label: '0. Introducción Diagnóstica' },
            { id: 'epistemic', label: '1. Verdad y Conocimiento' },
            { id: 'psychological', label: '2. Comportamiento y Alineación' },
            { id: 'structural', label: '3. Memoria y Contexto' },
            { id: 'evolutionary', label: '4. Operativas y Evolución' },
            { id: 'resumen-patologias', label: 'Resumen de Diagnóstico' }
        ]
    },
    {
        path: '/control',
        label: 'Framework',
        icon: ShieldCheck,
        moduleId: 'control',
        subItems: [
            { id: 'intro-framework', label: '0. Introducción' },
            { id: 'phase-F0', label: 'Bases: Fundamentos' },
            { id: 'phase-C', label: 'Fase C: Contexto Curado' },
            { id: 'phase-O', label: 'Fase O: Omni-Rol' },
            { id: 'phase-N', label: 'Fase N: Normas y Negativas' },
            { id: 'phase-T', label: 'Fase T: Tutela del Razonamiento' },
            { id: 'phase-R', label: 'Fase R: Realidad y Resistencia' },
            { id: 'phase-O2', label: 'Fase O₂: Output y Organización' },
            { id: 'phase-L', label: 'Fase L: Loop de Mejora' }
        ]
    },
    { path: '/chatgpt-guide', label: 'Guía ChatGPT', icon: BookMarked, moduleId: 'chatgpt-guide' },
    { path: '/ejercicios', label: 'Ejercicios', icon: Target, moduleId: 'ejercicios' },
    { path: '/recursos', label: 'Recursos', icon: Download, moduleId: null },
    { path: '/tools', label: 'Herramienta', icon: Wrench, moduleId: null },
];

export const Sidebar = ({ collapsed, onToggleCollapse, onClose, isMobile }) => {
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [importFile, setImportFile] = useState(null);
    const [importStatus, setImportStatus] = useState('idle');
    const fileInputRef = useRef(null);

    const userProgress = useLiveQuery(() => db.userProgress.get('current-user'));
    const completedIds = userProgress?.completedModuleIds || [];
    const totalModules = navItems.filter(i => i.moduleId).length;
    const completedCount = completedIds.length;
    const progressPct = totalModules > 0 ? (completedCount / totalModules) * 100 : 0;

    const location = useLocation();
    const [activeSection, setActiveSection] = useState(null);

    // Scroll spy logic for TOC
    useEffect(() => {
        const handleScroll = () => {
            const currentPath = location.pathname;
            const currentItem = navItems.find(i => i.path === currentPath);
            if (!currentItem || !currentItem.subItems) return;

            // Find the active section based on scroll position
            let currentActive = null;
            // Add a small offset so it triggers slightly before hitting the exact top
            const offset = 150;

            for (const sub of currentItem.subItems) {
                const element = document.getElementById(sub.id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= offset) {
                        currentActive = sub.id;
                    }
                }
            }

            if (currentActive !== activeSection) {
                setActiveSection(currentActive);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial check
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname, activeSection]);

    const scrollToSection = (id) => {
        // Dispatch global event for components that need to react (e.g. accordion expansion in Control.jsx)
        window.dispatchEvent(new CustomEvent('toc-navigate', { detail: { id } }));

        const element = document.getElementById(id);
        if (element) {
            // Wait slightly for potential layout changes (e.g. accordion expansions in Control)
            setTimeout(() => {
                const y = element.getBoundingClientRect().top + window.pageYOffset - 100;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }, 150);
        }
        if (isMobile) {
            onClose?.();
        }
    };

    const handleExport = async () => {
        try {
            const backup = await exportBackup();
            downloadBackup(backup);
        } catch (error) {
            console.error(error);
        }
    };

    const confirmImport = async () => {
        if (!importFile) return;
        setImportStatus('processing');
        try {
            await importBackupReplace(importFile);
            setImportStatus('success');
            window.location.reload();
        } catch (error) {
            console.error(error);
            setImportStatus('idle');
        }
    };

    return (
        <>
            <div className={cn(
                "h-full flex flex-col bg-obsidian/95 backdrop-blur-2xl border-r border-surface-3",
                "transition-all duration-300"
            )}>
                {/* Header */}
                <div className="p-4 border-b border-surface-3">
                    <div className="flex items-center justify-between">
                        {!collapsed && (
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-electric-cyan/10 flex items-center justify-center">
                                    <ShieldCheck className="w-4 h-4 text-electric-cyan" />
                                </div>
                                <div>
                                    <h1 className="text-sm font-bold gradient-text-cyan leading-tight">Curso de IA</h1>
                                    <p className="text-[10px] text-muted font-mono">INTRODUCCIÓN A LA IA</p>
                                </div>
                            </div>
                        )}
                        {collapsed && (
                            <div className="w-full flex justify-center">
                                <div className="w-8 h-8 rounded-lg bg-electric-cyan/10 flex items-center justify-center">
                                    <ShieldCheck className="w-4 h-4 text-electric-cyan" />
                                </div>
                            </div>
                        )}
                        {/* Settings gear (top-right, always visible when expanded) */}
                        {!collapsed && !isMobile && (
                            <button
                                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                                className={cn(
                                    "tap-target flex items-center justify-center rounded-lg p-1.5 transition-colors",
                                    isSettingsOpen ? "text-electric-cyan bg-electric-cyan/10" : "text-muted hover:text-ghost-white hover:bg-surface-2"
                                )}
                                aria-label="Configuración"
                            >
                                <Settings className="w-3.5 h-3.5" />
                            </button>
                        )}
                        {isMobile && (
                            <button onClick={onClose} className="text-muted hover:text-ghost-white tap-target flex items-center justify-center">
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>



                {/* Settings dropdown (hidden in nav, shown by gear) */}
                {isSettingsOpen && !collapsed && (
                    <div className="px-2 py-2 border-b border-surface-3 bg-surface-1/50 space-y-0.5">
                        <p className="text-[10px] font-mono text-muted/60 px-2 py-1 tracking-wider">DATOS</p>
                        <button
                            onClick={handleExport}
                            className="w-full tap-target flex items-center gap-2 px-3 py-2 text-xs font-mono text-muted hover:text-ghost-white hover:bg-surface-2 rounded-lg transition-colors"
                        >
                            <Download className="w-3.5 h-3.5" /> Exportar Backup
                        </button>
                        <button
                            onClick={() => setIsImportModalOpen(true)}
                            className="w-full tap-target flex items-center gap-2 px-3 py-2 text-xs font-mono text-muted hover:text-ghost-white hover:bg-surface-2 rounded-lg transition-colors"
                        >
                            <Upload className="w-3.5 h-3.5" /> Importar Backup
                        </button>
                    </div>
                )}

                {/* Nav — clean, no technical functions */}
                <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
                    {navItems.map((item) => {
                        const isCompleted = item.moduleId && completedIds.includes(item.moduleId);
                        return (
                            <div key={item.path} className="flex flex-col">
                                <NavLink
                                    to={item.path}
                                    onClick={() => isMobile && onClose?.()}
                                    className={({ isActive }) => cn(
                                        "tap-target group flex items-center rounded-xl text-sm font-medium transition-all duration-200 relative",
                                        collapsed ? "justify-center p-3" : "gap-3 px-3 py-2.5",
                                        isActive
                                            ? "bg-electric-cyan/10 text-electric-cyan"
                                            : "text-muted hover:text-ghost-white hover:bg-surface-2"
                                    )}
                                >
                                    <item.icon className={cn("w-4 h-4 shrink-0", isCompleted && "text-emerald-glow")} />
                                    {!collapsed && (
                                        <>
                                            <span className="flex-1 truncate">{item.label}</span>
                                            {isCompleted && (
                                                <div className="w-4 h-4 rounded-full bg-emerald-glow/20 text-emerald-glow flex items-center justify-center">
                                                    <Check className="w-2.5 h-2.5" strokeWidth={3} />
                                                </div>
                                            )}
                                        </>
                                    )}
                                </NavLink>

                                {/* Table of Contents (SubItems) */}
                                {!collapsed && item.subItems && location.pathname === item.path && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-1 mb-2 ml-[19px] border-l-2 border-surface-3 pl-3 space-y-1 overflow-hidden"
                                    >
                                        {item.subItems.map((sub) => {
                                            const isSubActive = activeSection === sub.id;
                                            return (
                                                <button
                                                    key={sub.id}
                                                    onClick={() => scrollToSection(sub.id)}
                                                    className={cn(
                                                        "w-full text-left text-xs py-1.5 transition-colors duration-200 line-clamp-2",
                                                        sub.isChild ? "pl-4" : "",
                                                        isSubActive
                                                            ? "text-electric-cyan font-semibold"
                                                            : "text-muted/70 hover:text-ghost-white"
                                                    )}
                                                >
                                                    {sub.label}
                                                </button>
                                            );
                                        })}
                                    </motion.div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* Footer — only collapse toggle */}
                <div className={cn("border-t border-surface-3", collapsed ? "p-2" : "p-3")}>
                    {/* Mobile: settings buttons inline */}
                    {isMobile && (
                        <div className="space-y-1 mb-3">
                            <button
                                onClick={handleExport}
                                className="w-full tap-target flex items-center gap-2 px-3 py-2 text-xs font-mono text-muted hover:text-ghost-white hover:bg-surface-2 rounded-lg transition-colors"
                            >
                                <Download className="w-3.5 h-3.5" /> Export
                            </button>
                            <button
                                onClick={() => setIsImportModalOpen(true)}
                                className="w-full tap-target flex items-center gap-2 px-3 py-2 text-xs font-mono text-muted hover:text-ghost-white hover:bg-surface-2 rounded-lg transition-colors"
                            >
                                <Upload className="w-3.5 h-3.5" /> Import
                            </button>
                        </div>
                    )}

                    {/* Collapse toggle (desktop only) */}
                    {!isMobile && (
                        <button
                            onClick={onToggleCollapse}
                            className="w-full tap-target flex items-center justify-center p-2 text-muted hover:text-electric-cyan rounded-lg hover:bg-surface-2 transition-colors"
                            aria-label={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
                        >
                            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                        </button>
                    )}
                </div>
            </div>

            <Modal
                isOpen={isImportModalOpen}
                onClose={() => setIsImportModalOpen(false)}
                title="Importar y Reemplazar Datos"
            >
                <div className="space-y-4">
                    <div className="p-3 bg-red-glow/10 border border-red-glow/20 rounded-xl text-sm flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 shrink-0 text-red-glow mt-0.5" />
                        <div>
                            <p className="font-bold text-red-glow">Acción Destructiva</p>
                            <p className="mt-1 text-ghost-white/70">Esta acción <strong className="text-ghost-white">BORRARÁ</strong> todos los datos actuales y los reemplazará.</p>
                        </div>
                    </div>
                    <input
                        type="file"
                        accept=".json"
                        ref={fileInputRef}
                        onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                        className="block w-full text-sm text-muted file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-mono file:bg-surface-2 file:text-electric-cyan cursor-pointer border border-surface-3 rounded-xl bg-surface-1"
                    />
                    <div className="flex justify-end gap-3 pt-2">
                        <button onClick={() => setIsImportModalOpen(false)} className="px-4 py-2 text-sm text-muted hover:text-ghost-white">Cancelar</button>
                        <button
                            onClick={confirmImport}
                            disabled={!importFile || importStatus === 'processing'}
                            className="px-4 py-2 text-sm font-bold bg-red-glow/80 hover:bg-red-glow text-white rounded-lg disabled:opacity-50"
                        >
                            {importStatus === 'processing' ? 'Procesando...' : 'Reemplazar'}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};
