import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/db';
import { BookOpen, AlertTriangle, ShieldCheck, Database, Upload, Download, Settings, Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { exportBackup, downloadBackup, importBackupReplace } from '../../services/storage';
import { Modal } from '../ui/Modal';

const navItems = [
    { path: '/', label: 'Inicio', icon: BookOpen, moduleId: null },
    { path: '/llms', label: 'Fundamentos LLM', icon: Database, moduleId: 'llms' },
    { path: '/pathologies', label: 'Patologías', icon: AlertTriangle, moduleId: 'pathologies' },
    { path: '/control', label: 'Framework C.O.N.T.R.O.L.', icon: ShieldCheck, moduleId: 'control' },
];

export const Sidebar = () => {
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [importFile, setImportFile] = useState(null);
    const fileInputRef = useRef(null);
    const [importStatus, setImportStatus] = useState('idle'); // idle, processing, success, error

    const userProgress = useLiveQuery(() => db.userProgress.get('current-user'));
    const completedIds = userProgress?.completedModuleIds || [];

    const handleExport = async () => {
        try {
            const backup = await exportBackup();
            downloadBackup(backup);
        } catch (error) {
            console.error(error);
            alert('Error al exportar datos.');
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImportFile(e.target.files[0]);
        }
    };

    const confirmImport = async () => {
        if (!importFile) return;
        setImportStatus('processing');
        try {
            await importBackupReplace(importFile);
            setImportStatus('success');
            // Reload to reflect changes
            window.location.reload();
        } catch (error) {
            console.error(error);
            setImportStatus('error');
            alert('Error en la importación: ' + error.message);
            setImportStatus('idle');
        }
    };

    return (
        <>
            <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen fixed left-0 top-0 z-40">
                <div className="p-6 border-b border-slate-800">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-control-primary to-control-secondary bg-clip-text text-transparent">
                        Curso C.O.N.T.R.O.L.
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">Prompt Engineering Profesional</p>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                    {navItems.map((item) => {
                        const isCompleted = item.moduleId && completedIds.includes(item.moduleId);
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => cn(
                                    "group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative",
                                    isActive
                                        ? "bg-control-primary/10 text-control-primary shadow-sm ring-1 ring-control-primary/20"
                                        : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                                )}
                            >
                                <item.icon className={cn("w-4 h-4 transition-colors", isCompleted && "text-emerald-500")} />
                                <span className="flex-1 truncate">{item.label}</span>
                                {isCompleted && (
                                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
                                        <Check className="w-2.5 h-2.5" strokeWidth={3} />
                                    </div>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">
                        Datos y Persistencia
                    </div>
                    <div className="space-y-2">
                        <button
                            onClick={handleExport}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors border border-slate-800"
                        >
                            <Download className="w-3.5 h-3.5" />
                            Exportar Backup
                        </button>
                        <button
                            onClick={() => setIsImportModalOpen(true)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors border border-slate-800"
                        >
                            <Upload className="w-3.5 h-3.5" />
                            Importar Datos
                        </button>
                    </div>
                    <div className="text-[10px] text-slate-600 px-2 mt-3 text-center">
                        v1.0.0 • Local Storage Only
                    </div>
                </div>
            </aside>

            <Modal
                isOpen={isImportModalOpen}
                onClose={() => setIsImportModalOpen(false)}
                title="Importar y Reemplazar Datos"
            >
                <div className="space-y-4">
                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-200 text-sm flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 shrink-0 text-amber-500" />
                        <div>
                            <p className="font-bold text-amber-400">¡Atención: Acción Destructiva!</p>
                            <p className="mt-1 text-amber-100/80 leading-relaxed">Esta acción <strong className="text-amber-100">BORRARÁ</strong> todos los datos actuales y los reemplazará con el contenido del archivo importado.</p>
                            <div className="mt-2 text-xs bg-amber-950/30 p-2 rounded border border-amber-500/10">
                                <p className="opacity-70">Medida de seguridad:</p>
                                <p className="font-mono text-amber-300">Backup automático previo activado</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-300">Selecciona el archivo de backup (.json)</label>
                        <div className="relative group">
                            <input
                                type="file"
                                accept=".json"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="block w-full text-sm text-slate-400
                    file:mr-4 file:py-2.5 file:px-4
                    file:rounded-lg file:border-0
                    file:text-xs file:font-semibold
                    file:bg-slate-800 file:text-control-primary
                    file:transition-colors
                    group-hover:file:bg-slate-700
                    cursor-pointer border border-slate-700 rounded-lg bg-slate-900/50"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-800/50 mt-4">
                        <button
                            onClick={() => setIsImportModalOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={confirmImport}
                            disabled={!importFile || importStatus === 'processing'}
                            className="px-4 py-2 text-sm font-medium bg-red-600/80 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-900/20"
                        >
                            {importStatus === 'processing' ? 'Procesando...' : 'Reemplazar Datos'}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};
