import React from 'react';
import { motion } from 'framer-motion';
import { ContextWindowVisual } from '../components/ui/ContextWindowVisual';
import { CompleteButton } from '../components/ui/CompleteButton';
import {
    Binary,
    ScanEye,
    Database,
    UserCheck,
    Play,
    FlaskConical,
    AlertTriangle,
    Sprout,
    MessageSquareQuote,
    ArrowRight
} from 'lucide-react';

const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 25 } }
};

/* ─── Content Sections ─── */
const sections = [
    {
        number: '01',
        title: 'El Mapa del Lenguaje: Tokens y Embeddings',
        icon: Binary,
        color: 'cyan',
        intro: 'El primer paso es transformar el lenguaje humano en algo que una máquina pueda procesar: números.',
        bullets: [
            { label: 'Tokenización', text: 'El modelo no lee palabras, sino "tokens" (trozos de texto). Si una palabra es poco común, la rompe en pedazos.' },
            { label: 'Embeddings (Vectores)', text: 'Cada token se convierte en una coordenada en un espacio de miles de dimensiones.' },
        ],
        seed: 'El modelo no entiende el "significado" real de una manzana, solo sabe que la palabra "manzana" suele estar geométricamente cerca de "fruta" o "comer" en su mapa matemático.',
        note: 'Si el mapa es borroso o el token es ambiguo, el modelo "se pierde" en sus coordenadas.',
    },
    {
        number: '02',
        title: 'El Motor: Arquitectura Transformer y Atención',
        subtitle: 'El "Hiper-Lector"',
        icon: ScanEye,
        color: 'magenta',
        intro: 'El Transformer es el diseño que permite al modelo entender el contexto de una frase completa en lugar de leer palabra por palabra.',
        analogy: 'Si el LLM fuera un coche, el Transformer sería el motor. Antes de este invento, las IAs leían como un niño pequeño: palabra por palabra, siguiendo el texto con el dedo. Si la frase era muy larga, para cuando llegaban al final, ya habían olvidado cómo empezaba.',
        bullets: [
            { label: 'Mecanismo de Atención (Lectura Global)', text: 'El Transformer puede mirar todo el texto a la vez en lugar de ir paso a paso. Permite que el modelo "ponga el foco" en las palabras relevantes.' },
        ],
        seed: 'La atención es un recurso computacional finito. En textos muy largos, el modelo no puede "mirar" todo con la misma intensidad.',
    },
    {
        number: '03',
        title: 'El Aprendizaje: Pre-entrenamiento',
        subtitle: 'Compresión con pérdida',
        icon: Database,
        color: 'emerald',
        intro: 'Aquí es donde el modelo lee internet para aprender a predecir el siguiente token.',
        bullets: [
            { label: 'Sistema Cerrado', text: 'El modelo solo sabe lo que leyó durante su entrenamiento. Una vez terminado, su conocimiento queda congelado en el tiempo.' },
            { label: 'Compresión', text: 'El LLM no memoriza internet; crea una "representación comprimida". Es como intentar resumir una biblioteca entera en una libreta de notas.' },
        ],
        seed: 'Como es una compresión "con pérdida", cuando no recuerda un detalle exacto, usará la estadística para inventar uno que "suene bien". Es un sistema diseñado para la fluidez, no para la veracidad.',
    },
    {
        number: '04',
        title: 'El Refinamiento: Post-entrenamiento',
        icon: UserCheck,
        color: 'amber',
        intro: 'Un modelo pre-entrenado es un "autocompletador" salvaje. Para convertirlo en un asistente útil, aplicamos dos procesos de pulido:',
        bullets: [
            { label: 'SFT (Supervised Fine-Tuning)', text: 'Ajuste Fino Supervisado. El modelo aprende por imitación estudiando miles de ejemplos de "respuestas de oro" escritas por humanos para entender cómo debe responder un asistente.' },
            { label: 'RLHF (Reinforcement Learning from Human Feedback)', text: 'Aprendizaje por Refuerzo a partir de Retroalimentación Humana. El modelo aprende por preferencia; genera varias respuestas y es premiado o penalizado según un ranking de calidad realizado por humanos.' },
        ],
        seed: 'Al premiar al modelo por ser "servicial y convincente" ante el ojo humano, este aprende que darnos la razón suele darle más puntos que llevarnos la contraria. Esto planta la semilla de la Sicofancia (ser un "bienqueda") y de la Fluidez Engañosa, donde prefiere sonar seguro antes que admitir ignorancia.',
    },
    {
        number: '05',
        title: 'El Momento de la Verdad: Inferencia y Ventana de Contexto',
        icon: Play,
        color: 'cyan',
        intro: 'Cuando escribes un prompt, el modelo entra en fase de Inferencia.',
        bullets: [
            { label: 'Generación Auto-regresiva', text: 'El modelo genera la respuesta token a token, hacia adelante. Cada token generado se convierte en parte de la "verdad" para el siguiente cálculo.' },
            { label: 'Ventana de Contexto', text: 'Es la "mesa de trabajo" donde cabe tu prompt y la respuesta del modelo. Tiene un límite físico de espacio.' },
        ],
        seed: 'Si el modelo empieza una frase con un error, la naturaleza secuencial le obliga a seguir construyendo sobre ese error para mantener la coherencia gramatical. Además, si la "mesa de trabajo" se llena, empezará a olvidar los folios que quedaron debajo.',
        visual: <ContextWindowVisual />,
    },
];

const summaryTable = [
    { stage: 'Representación', characteristic: 'Los tokens son solo vectores numéricos.', crack: 'Falta de lógica real o "sentido común".' },
    { stage: 'Entrenamiento', characteristic: 'Compresión estadística de datos pasados.', crack: 'Alucinaciones y falta de anclaje actual.' },
    { stage: 'Alineamiento', characteristic: 'Optimizado para gustar al evaluador humano.', crack: 'Exceso de confianza o servilismo.' },
    { stage: 'Generación', characteristic: 'Predicción secuencial hacia adelante.', crack: 'Incapacidad de corregirse sobre la marcha.' },
    { stage: 'Contexto', characteristic: 'Memoria de trabajo limitada y finita.', crack: 'Olvido de instrucciones o pérdida de atención.' },
];

const colorMap = {
    cyan: { accent: 'bg-electric-cyan', iconBg: 'bg-electric-cyan/10', iconText: 'text-electric-cyan', border: 'border-electric-cyan/20' },
    magenta: { accent: 'bg-neon-magenta', iconBg: 'bg-neon-magenta/10', iconText: 'text-neon-magenta', border: 'border-neon-magenta/20' },
    emerald: { accent: 'bg-emerald-glow', iconBg: 'bg-emerald-glow/10', iconText: 'text-emerald-glow', border: 'border-emerald-glow/20' },
    amber: { accent: 'bg-amber-glow', iconBg: 'bg-amber-glow/10', iconText: 'text-amber-glow', border: 'border-amber-glow/20' },
};

/* ─── Section Component ─── */
const ContentSection = ({ section }) => {
    const cs = colorMap[section.color];

    return (
        <motion.div variants={fadeUp} className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-surface-2 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />

            <div className="relative space-y-5 p-6 rounded-2xl border border-surface-2 bg-deep-slate/50 hover:bg-deep-slate/80 transition-colors">
                {/* Section Header */}
                <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${cs.iconBg} flex items-center justify-center shrink-0 border border-white/5 shadow-inner`}>
                        <section.icon className={`w-6 h-6 ${cs.iconText}`} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className={`text-xs font-mono ${cs.iconText} tracking-widest`}>{section.number}</span>
                            <span className={`w-12 h-px ${cs.accent}`} />
                        </div>
                        <h3 className="text-xl font-bold text-ghost-white leading-tight">{section.title}</h3>
                        {section.subtitle && (
                            <span className="text-sm text-muted/70 italic mt-0.5 block">{section.subtitle}</span>
                        )}
                    </div>
                </div>

                <div className="space-y-4 pl-0 md:pl-16">
                    {/* Intro */}
                    <p className="text-sm text-ghost-white/90 leading-relaxed">{section.intro}</p>

                    {/* Analogy callout (optional) */}
                    {section.analogy && (
                        <div className="p-4 rounded-xl border border-surface-3 bg-surface-1/30 italic">
                            <div className="flex items-start gap-3">
                                <MessageSquareQuote className="w-4 h-4 text-muted/60 mt-0.5 shrink-0" />
                                <p className="text-sm text-ghost-white/75 leading-relaxed">{section.analogy}</p>
                            </div>
                        </div>
                    )}

                    {/* Concept Bullets */}
                    <div className={`p-4 rounded-xl border ${cs.border} bg-surface-1/40`}>
                        <div className="flex items-center gap-2 mb-3">
                            <FlaskConical className={`w-3.5 h-3.5 ${cs.iconText}`} />
                            <span className={`text-[10px] font-mono ${cs.iconText} tracking-wider uppercase`}>Conceptos Clave</span>
                        </div>
                        <ul className="space-y-3">
                            {section.bullets.map((b, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-ghost-white/90 leading-relaxed">
                                    <ArrowRight className={`w-3.5 h-3.5 ${cs.iconText} mt-1 shrink-0`} />
                                    <span><strong className="text-ghost-white">{b.label}:</strong> {b.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Semilla del Fallo */}
                    <div className="p-4 rounded-xl border border-red-glow/20 bg-red-glow/5">
                        <div className="flex items-center gap-2 mb-2">
                            <Sprout className="w-3.5 h-3.5 text-red-glow" />
                            <span className="text-[10px] font-mono text-red-glow tracking-wider uppercase">La semilla del fallo</span>
                        </div>
                        <p className="text-sm text-ghost-white/85 leading-relaxed">{section.seed}</p>
                    </div>

                    {/* Note (optional) */}
                    {section.note && (
                        <div className="p-4 rounded-xl border border-amber-glow/20 bg-amber-glow/5">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertTriangle className="w-3.5 h-3.5 text-amber-glow" />
                                <span className="text-[10px] font-mono text-amber-glow tracking-wider uppercase">Nota para el futuro</span>
                            </div>
                            <p className="text-sm text-ghost-white/85 leading-relaxed">{section.note}</p>
                        </div>
                    )}

                    {/* Visual Injection (e.g. Context Window) */}
                    {section.visual && (
                        <div className="mt-6 pt-6 border-t border-white/5">
                            {section.visual}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

/* ─── Page ─── */
const Llms = () => {
    return (
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-12 pb-20">

            {/* Header with bloom effect */}
            <motion.div variants={fadeUp} className="relative rounded-3xl overflow-hidden border border-surface-3 shadow-2xl">
                <img
                    src="/images/header-llm-architecture.jpeg"
                    alt="LLM Physics"
                    className="w-full h-56 md:h-72 object-cover opacity-30 header-image scale-105"
                />
                <div className="header-bloom" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent z-[2]" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 z-[3]">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-electric-cyan/20 text-electric-cyan border border-electric-cyan/30 tracking-wider">MÓDULO 1</span>
                        <span className="text-[10px] font-mono text-muted/80 tracking-widest uppercase">FUNDAMENTO</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black header-text-shadow mb-4 leading-tight">
                        <span className="text-ghost-white">La "</span><span className="text-electric-cyan">Física</span><span className="text-ghost-white">" del LLM</span>
                    </h1>
                    <p className="text-lg text-muted max-w-2xl header-text-shadow leading-relaxed">
                        Entendiendo la maquinaria para predecir sus fallos.
                    </p>
                </div>
            </motion.div>

            {/* Objective Intro */}
            <motion.div variants={fadeUp} className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl border border-electric-cyan/20 bg-electric-cyan/5">
                <div className="shrink-0 pt-1">
                    <div className="w-10 h-10 rounded-full bg-electric-cyan/20 flex items-center justify-center text-electric-cyan">
                        <ScanEye className="w-5 h-5" />
                    </div>
                </div>
                <div>
                    <h3 className="text-sm font-bold text-electric-cyan uppercase tracking-wider mb-2">Objetivo Técnico</h3>
                    <p className="text-ghost-white/90 leading-relaxed">
                        Para dominar el Prompt Engineering, primero debemos entender qué es realmente un Modelo de Lenguaje Grande (LLM). No es una base de datos, ni una enciclopedia, ni una inteligencia con conciencia. Es una <strong className="text-ghost-white">máquina estadística de predicción secuencial</strong>.
                    </p>
                </div>
            </motion.div>

            {/* Linea de montaje Header */}
            <motion.div variants={fadeUp} className="flex items-center gap-4 py-4">
                <div className="h-px flex-1 bg-surface-3" />
                <span className="text-xs font-mono text-muted uppercase tracking-[0.2em]">Línea de Montaje (De dentro hacia fuera)</span>
                <div className="h-px flex-1 bg-surface-3" />
            </motion.div>

            {/* Sections */}
            <div className="space-y-8">
                {sections.map((section) => (
                    <ContentSection key={section.number} section={section} />
                ))}
            </div>

            {/* Summary Table */}
            <motion.div variants={fadeUp} className="mt-16 pt-10 border-t border-surface-3">
                <h2 className="text-xl font-bold text-ghost-white mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-neon-magenta rounded-full" />
                    Resumen de Diseño: Flujo → Consecuencia
                </h2>
                <div className="overflow-hidden rounded-xl border border-surface-3 bg-surface-1/30">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="bg-surface-2/50 border-b border-surface-3">
                                <th className="text-left py-4 px-6 text-[10px] font-mono text-electric-cyan tracking-wider uppercase">Fase del Proceso</th>
                                <th className="text-left py-4 px-6 text-[10px] font-mono text-muted tracking-wider uppercase">Característica Física</th>
                                <th className="text-left py-4 px-6 text-[10px] font-mono text-red-glow tracking-wider uppercase">Posible "Grieta"</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-3/50">
                            {summaryTable.map((row, i) => (
                                <tr key={i} className="hover:bg-surface-2/30 transition-colors">
                                    <td className="py-4 px-6 text-ghost-white font-medium">{row.stage}</td>
                                    <td className="py-4 px-6 text-muted/90">{row.characteristic}</td>
                                    <td className="py-4 px-6 text-red-glow/80">{row.crack}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Closing Bridge */}
            <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-neon-magenta/20 bg-neon-magenta/5">
                <p className="text-sm text-ghost-white/85 leading-relaxed">
                    <strong className="text-neon-magenta">¿Qué sucede cuando estas "grietas" físicas se manifiestan?</strong>{' '}
                    En la siguiente sección, exploraremos el <strong className="text-ghost-white">Atlas de Patologías</strong>, donde aprenderás a diagnosticar exactamente qué parte de esta maquinaria está fallando cuando el modelo se comporta de forma errática.
                </p>
            </motion.div>

            <CompleteButton moduleId="llms" />
        </motion.div>
    );
};

export default Llms;
