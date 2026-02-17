import React, { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/db';
import {
    Home, Brain, AlertTriangle, ShieldCheck, Download, Upload,
    Check, ChevronLeft, ChevronRight, X, Wrench
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { exportBackup, downloadBackup, importBackupReplace } from '../../services/storage';
import { Modal } from '../ui/Modal';

const navItems = [
    { path: '/', label: 'Inicio', icon: Home, moduleId: null },
    { path: '/llms', label: 'Fundamentos LLM', icon: Brain, moduleId: 'llms' },
    { path: '/pathologies', label: 'Patologías', icon: AlertTriangle, moduleId: 'pathologies' },
    { path: '/control', label: 'Framework', icon: ShieldCheck, moduleId: 'control' },
    { path: '/tools', label: 'Herramienta', icon: Wrench, moduleId: null },
];

export const Sidebar = ({ collapsed, onToggleCollapse, onClose, isMobile }) => {
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [importFile, setImportFile] = useState(null);
    const [importStatus, setImportStatus] = useState('idle');
    const fileInputRef = useRef(null);

    const userProgress = useLiveQuery(() => db.userProgress.get('current-user'));
    const completedIds = userProgress?.completedModuleIds || [];
    const totalModules = navItems.filter(i => i.moduleId).length;
    const completedCount = completedIds.length;
    const progressPct = totalModules > 0 ? (completedCount / totalModules) * 100 : 0;

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
                                    <h1 className="text-sm font-bold gradient-text-cyan leading-tight">C.O.N.T.R.O.L.</h1>
                                    <p className="text-[10px] text-muted font-mono">PROMPT ENGINEERING</p>
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
                        {isMobile && (
                            <button onClick={onClose} className="text-muted hover:text-ghost-white tap-target flex items-center justify-center">
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Progress bar */}
                {!collapsed && (
                    <div className="px-4 py-3 border-b border-surface-3">
                        <div className="flex items-center justify-between text-[10px] font-mono text-muted mb-1.5">
                            <span>PROGRESO</span>
                            <span>{completedCount}/{totalModules}</span>
                        </div>
                        <div className="h-1 bg-surface-3 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-electric-cyan to-emerald-glow rounded-full transition-all duration-500"
                                style={{ width: `${progressPct}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Nav */}
                <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
                    {navItems.map((item) => {
                        const isCompleted = item.moduleId && completedIds.includes(item.moduleId);
                        return (
                            <NavLink
                                key={item.path}
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
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className={cn("border-t border-surface-3", collapsed ? "p-2" : "p-3")}>
                    {!collapsed && (
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
