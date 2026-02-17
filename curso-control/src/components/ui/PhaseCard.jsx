import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const phaseColors = {
    C: { border: 'border-electric-cyan/40', bg: 'bg-electric-cyan/10', text: 'text-electric-cyan', glow: 'shadow-[0_0_40px_rgba(0,229,255,0.15)]' },
    O: { border: 'border-neon-magenta/40', bg: 'bg-neon-magenta/10', text: 'text-neon-magenta', glow: 'shadow-[0_0_40px_rgba(224,64,251,0.15)]' },
    N: { border: 'border-red-glow/40', bg: 'bg-red-glow/10', text: 'text-red-glow', glow: 'shadow-[0_0_40px_rgba(248,113,113,0.15)]' },
    T: { border: 'border-amber-glow/40', bg: 'bg-amber-glow/10', text: 'text-amber-glow', glow: 'shadow-[0_0_40px_rgba(251,191,36,0.15)]' },
    R: { border: 'border-emerald-glow/40', bg: 'bg-emerald-glow/10', text: 'text-emerald-glow', glow: 'shadow-[0_0_40px_rgba(52,211,153,0.15)]' },
    O2: { border: 'border-blue-400/40', bg: 'bg-blue-400/10', text: 'text-blue-400', glow: 'shadow-[0_0_40px_rgba(96,165,250,0.15)]' },
    L: { border: 'border-violet-400/40', bg: 'bg-violet-400/10', text: 'text-violet-400', glow: 'shadow-[0_0_40px_rgba(167,139,250,0.15)]' },
};

const phaseData = [
    { letter: 'C', key: 'C', title: 'Contexto Curado', subtitle: 'Signal-to-Noise Ratio', desc: 'Maximiza la señal. Elimina el ruido del contexto para prevenir alucinaciones.' },
    { letter: 'O', key: 'O', title: 'Omni-Rol', subtitle: 'Ingeniería de Identidad', desc: 'Ancla al modelo a clústeres de conocimiento experto mediante roles precisos.' },
    { letter: 'N', key: 'N', title: 'Normas y Negativas', subtitle: 'Muro de Contención', desc: 'Neutraliza la sicofancia y la pereza con prohibiciones explícitas.' },
    { letter: 'T', key: 'T', title: 'Traza de Pensamiento', subtitle: 'Motor Cognitivo', desc: 'Obliga al modelo a procesar antes de responder con cadenas de razonamiento.' },
    { letter: 'R', key: 'R', title: 'Realidad y Resistencia', subtitle: 'Protocolos de Verdad', desc: 'Detecta alucinaciones y valida hechos con auditoría adversarial.' },
    { letter: 'O', key: 'O2', title: 'Output y Organización', subtitle: 'Vibe Coding', desc: 'Entregables finales, no borradores. El formato determina la utilidad.' },
    { letter: 'L', key: 'L', title: 'Loop de Mejora', subtitle: 'Meta-Prompting', desc: 'Optimización recursiva. La excelencia no está en el primer intento.' },
];

export const PhaseCard = ({ phase, index, isExpanded, onToggle }) => {
    const colors = phaseColors[phase.key];

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, type: 'spring', stiffness: 300, damping: 30 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={onToggle}
            className={cn(
                "relative bg-deep-slate border rounded-2xl overflow-hidden cursor-pointer transition-shadow duration-300",
                colors.border,
                isExpanded && colors.glow
            )}
        >
            {/* Gradient top bar */}
            <div className={cn("h-1 w-full", colors.bg)} style={{ opacity: 0.6 }} />

            <div className="p-6">
                <div className="flex items-start gap-4">
                    {/* Letter badge */}
                    <div className={cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-black shrink-0 transition-transform duration-300",
                        colors.bg, colors.text,
                        isExpanded && "scale-110"
                    )}>
                        {phase.letter}
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className={cn("text-lg font-bold", colors.text)}>{phase.title}</h3>
                        <p className="text-xs font-mono text-muted mt-0.5 tracking-wider uppercase">{phase.subtitle}</p>
                        <p className="text-sm text-ghost-white/70 mt-2 leading-relaxed">{phase.desc}</p>
                    </div>
                </div>

                {/* Phase number indicator */}
                <div className="absolute top-4 right-4 text-xs font-mono text-muted/40 tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                </div>
            </div>
        </motion.div>
    );
};

export { phaseData, phaseColors };
