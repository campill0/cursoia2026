import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Sparkles, Zap, Lock, MessageSquare, Layers, Settings2 } from 'lucide-react';

const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 25 } }
};

const Tools = () => (
    <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="space-y-10"
    >
        {/* Hero section */}
        <motion.div variants={fadeUp} className="text-center pt-8 pb-4">
            <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-amber-glow/10 border border-amber-glow/20 flex items-center justify-center"
            >
                <Wrench className="w-10 h-10 text-amber-glow" />
            </motion.div>

            <h1 className="text-2xl font-black text-ghost-white mb-3">Herramienta Interactiva</h1>
            <p className="text-muted text-sm leading-relaxed max-w-lg mx-auto">
                Un asistente integrado para construir prompts con el Framework C.O.N.T.R.O.L. paso a paso.
            </p>
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-glow/10 border border-amber-glow/20 text-amber-glow text-xs font-mono">
                <Zap className="w-3 h-3" /> EN DESARROLLO · FASE 2
            </div>
        </motion.div>

        {/* Skeleton UI — ghost of what's coming */}
        <motion.div variants={fadeUp} className="space-y-4 max-w-2xl mx-auto">
            {/* Ghost prompt builder */}
            <div className="bg-deep-slate border border-surface-3 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-electric-cyan/10 flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-electric-cyan/40" />
                    </div>
                    <div className="flex-1">
                        <div className="skeleton h-4 w-32 rounded" />
                    </div>
                </div>
                {/* Ghost text area */}
                <div className="bg-surface-1 border border-surface-3 rounded-xl p-4 space-y-2.5">
                    <div className="skeleton h-3 w-full rounded" />
                    <div className="skeleton h-3 w-4/5 rounded" />
                    <div className="skeleton h-3 w-3/5 rounded" />
                </div>
                {/* Ghost action buttons */}
                <div className="flex gap-3">
                    <div className="skeleton h-10 w-32 rounded-xl" />
                    <div className="skeleton h-10 w-28 rounded-xl" />
                </div>
            </div>

            {/* Ghost phase selector */}
            <div className="bg-deep-slate border border-surface-3 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-neon-magenta/10 flex items-center justify-center">
                        <Layers className="w-4 h-4 text-neon-magenta/40" />
                    </div>
                    <div className="skeleton h-4 w-40 rounded" />
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {['C', 'O', 'N', 'T', 'R', 'O', 'L'].map((letter, i) => (
                        <div key={i} className="h-12 rounded-xl bg-surface-2 border border-surface-3 flex items-center justify-center text-sm font-black text-muted/20">
                            {letter}
                        </div>
                    ))}
                </div>
            </div>

            {/* Ghost output preview */}
            <div className="bg-deep-slate border border-surface-3 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-emerald-glow/10 flex items-center justify-center">
                        <Settings2 className="w-4 h-4 text-emerald-glow/40" />
                    </div>
                    <div className="skeleton h-4 w-36 rounded" />
                </div>
                <div className="bg-surface-1 border border-surface-3 rounded-xl p-4 space-y-2">
                    <div className="skeleton h-3 w-full rounded" />
                    <div className="skeleton h-3 w-5/6 rounded" />
                    <div className="skeleton h-3 w-2/3 rounded" />
                    <div className="skeleton h-3 w-4/5 rounded" />
                </div>
            </div>
        </motion.div>

        {/* Feature previews */}
        <motion.div variants={fadeUp} className="grid grid-cols-3 gap-3 max-w-md mx-auto">
            {[
                { icon: Sparkles, label: 'Builder Visual', color: 'text-neon-magenta', bg: 'bg-neon-magenta/10' },
                { icon: Zap, label: 'Validación Live', color: 'text-electric-cyan', bg: 'bg-electric-cyan/10' },
                { icon: Lock, label: 'Datos Locales', color: 'text-emerald-glow', bg: 'bg-emerald-glow/10' },
            ].map((f, i) => (
                <motion.div
                    key={i}
                    whileHover={{ y: -2, scale: 1.02 }}
                    className="bg-deep-slate border border-surface-3 rounded-xl p-4 text-center cursor-default"
                >
                    <div className={`w-8 h-8 mx-auto rounded-lg ${f.bg} flex items-center justify-center mb-2`}>
                        <f.icon className={`w-4 h-4 ${f.color}`} />
                    </div>
                    <span className="text-[10px] font-mono text-muted">{f.label}</span>
                </motion.div>
            ))}
        </motion.div>
    </motion.div>
);

export default Tools;
