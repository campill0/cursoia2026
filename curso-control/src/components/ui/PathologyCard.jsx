import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, AlertTriangle, Brain, Database, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';

const categoryMeta = {
    truth: {
        icon: AlertTriangle,
        title: 'Fallo Epistémico',
        subtitle: 'Verdad y Conocimiento',
        color: 'text-red-glow',
        bg: 'bg-red-glow/10',
        border: 'border-red-glow/30',
        glow: 'hover:shadow-[0_0_30px_rgba(248,113,113,0.1)]',
        items: ['Fluidez Engañosa', 'Ilusión de Fluidez', 'Colapso Epistémico', 'Alucinación', 'Búnker Temporal', 'Memoria Borrosa']
    },
    behavior: {
        icon: Brain,
        title: 'Fallo Psicológico',
        subtitle: 'Comportamiento y Alineación',
        color: 'text-neon-magenta',
        bg: 'bg-neon-magenta/10',
        border: 'border-neon-magenta/30',
        glow: 'hover:shadow-[0_0_30px_rgba(224,64,251,0.1)]',
        items: ['Sicofancia', 'Sicofancia Social', 'Ruido Teatral', 'Verbosidad', 'Pereza']
    },
    memory: {
        icon: Database,
        title: 'Fallo Estructural',
        subtitle: 'Memoria y Contexto',
        color: 'text-amber-glow',
        bg: 'bg-amber-glow/10',
        border: 'border-amber-glow/30',
        glow: 'hover:shadow-[0_0_30px_rgba(251,191,36,0.1)]',
        items: ['Podredumbre del Contexto', 'Lost-in-the-Middle', 'Distracción de Contexto', 'Choque de Contexto', 'Truncamiento Silencioso', 'Envenenamiento de Memoria', 'Hinchazón del Prompt']
    },
    operational: {
        icon: Zap,
        title: 'Fallo Operativo',
        subtitle: 'Evolución y Seguridad',
        color: 'text-electric-cyan',
        bg: 'bg-electric-cyan/10',
        border: 'border-electric-cyan/30',
        glow: 'hover:shadow-[0_0_30px_rgba(0,229,255,0.1)]',
        items: ['Deriva del Prompt', 'Inyección Indirecta']
    },
};

export const PathologyCard = ({ categoryKey, isExpanded, onToggle }) => {
    const cat = categoryMeta[categoryKey];
    const Icon = cat.icon;

    return (
        <motion.div
            layout
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.99 }}
            className={cn(
                "bg-deep-slate border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300",
                cat.border, cat.glow
            )}
            onClick={onToggle}
        >
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", cat.bg)}>
                            <Icon className={cn("w-6 h-6", cat.color)} />
                        </div>
                        <div>
                            <h3 className={cn("text-base font-bold", cat.color)}>{cat.title}</h3>
                            <p className="text-xs text-muted font-mono tracking-wider uppercase">{cat.subtitle}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className={cn("text-xs font-mono px-2 py-1 rounded-full", cat.bg, cat.color)}>
                            {cat.items.length}
                        </span>
                        <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronDown className="w-4 h-4 text-muted" />
                        </motion.div>
                    </div>
                </div>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="mt-4 pt-4 border-t border-surface-3 space-y-2">
                                {cat.items.map((item, i) => (
                                    <motion.div
                                        key={item}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-surface-2 transition-colors"
                                    >
                                        <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", cat.bg.replace('/10', ''))} />
                                        <span className="text-sm text-ghost-white/80">{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export { categoryMeta };
