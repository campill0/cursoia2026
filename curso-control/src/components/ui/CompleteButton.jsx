import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/db';
import { CheckCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

export const CompleteButton = ({ moduleId }) => {
    const userProgress = useLiveQuery(() => db.userProgress.get('current-user'));

    if (!userProgress) return null;

    const isCompleted = userProgress.completedModuleIds.includes(moduleId);

    const toggleComplete = async () => {
        let newCompleted = [...userProgress.completedModuleIds];

        if (isCompleted) {
            newCompleted = newCompleted.filter(id => id !== moduleId);
        } else {
            if (!newCompleted.includes(moduleId)) {
                newCompleted.push(moduleId);
            }
        }

        await db.userProgress.update('current-user', {
            completedModuleIds: newCompleted,
            lastUpdated: Date.now()
        });
    };

    return (
        <div className="mt-12 flex justify-center">
            <button
                onClick={toggleComplete}
                className={cn(
                    "group flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl active:scale-95",
                    isCompleted
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/20 shadow-emerald-500/5"
                        : "bg-control-primary text-white hover:bg-sky-600 shadow-sky-500/20 hover:shadow-sky-500/40"
                )}
            >
                <CheckCircle className={cn("w-6 h-6 transition-transform group-hover:scale-110", isCompleted && "fill-current")} />
                {isCompleted ? "Módulo Completado" : "Marcar como Completado"}
            </button>
        </div>
    );
};
