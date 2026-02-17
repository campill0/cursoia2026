import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Sparkles, Zap, Lock } from 'lucide-react';

const Tools = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center min-h-[60vh]"
    >
        <div className="text-center max-w-md">
            <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-amber-glow/10 border border-amber-glow/20 flex items-center justify-center"
            >
                <Wrench className="w-10 h-10 text-amber-glow" />
            </motion.div>

            <h1 className="text-2xl font-black text-ghost-white mb-3">Herramienta Interactiva</h1>
            <p className="text-muted text-sm leading-relaxed mb-8">
                Un asistente integrado para construir prompts con el Framework C.O.N.T.R.O.L. paso a paso. Próximamente en la Fase 2 del proyecto.
            </p>

            <div className="grid grid-cols-3 gap-3">
                {[
                    { icon: Sparkles, label: 'Builder Visual', color: 'text-neon-magenta', bg: 'bg-neon-magenta/10' },
                    { icon: Zap, label: 'Validación Live', color: 'text-electric-cyan', bg: 'bg-electric-cyan/10' },
                    { icon: Lock, label: 'Datos Locales', color: 'text-emerald-glow', bg: 'bg-emerald-glow/10' },
                ].map((f, i) => (
                    <div key={i} className="bg-deep-slate border border-surface-3 rounded-xl p-4 text-center">
                        <div className={`w-8 h-8 mx-auto rounded-lg ${f.bg} flex items-center justify-center mb-2`}>
                            <f.icon className={`w-4 h-4 ${f.color}`} />
                        </div>
                        <span className="text-[10px] font-mono text-muted">{f.label}</span>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-[10px] font-mono text-muted/40">
                ESTADO: EN DESARROLLO · ETA: FASE 2
            </div>
        </div>
    </motion.div>
);

export default Tools;
