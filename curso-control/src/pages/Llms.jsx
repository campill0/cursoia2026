import React from 'react';
import { motion } from 'framer-motion';
import { ContextWindowVisual } from '../components/ui/ContextWindowVisual';
import { CompleteButton } from '../components/ui/CompleteButton';
import { Archive, Gauge, Monitor, MapPin, FlaskConical, AlertTriangle } from 'lucide-react';

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
        icon: Archive,
        number: '01',
        color: 'cyan',
        title: 'La "Física" de la Compresión: No es una Biblioteca, es un Archivo ZIP Borroso',
        intro: 'Un LLM no es una copia de internet. Físicamente, un LLM es un archivo de parámetros (pesos numéricos) que resulta de un proceso de compresión con pérdida de una cantidad masiva de texto.',
        fundamento: 'El modelo no almacena textos, sino probabilidades y relaciones entre fragmentos de texto (tokens) convertidos en vectores numéricos (embeddings). Durante el entrenamiento, el modelo comprime la información de internet en estos pesos, perdiendo la fuente original y los detalles exactos, quedándose solo con los patrones estadísticos.',
        patologiaTitle: 'Patología Asociada (Alucinaciones)',
        patologia: 'Dado que la información está comprimida y "borrosa", cuando le haces una pregunta, el modelo no "recupera" un dato, sino que lo reconstruye probabilísticamente. Si el modelo no tiene el dato exacto, rellena los huecos con lo que estadísticamente "suena bien" o es más probable, no con lo que es verdad. Esto es la ontología de la alucinación: no es un error del sistema, sino el sistema funcionando correctamente (prediciendo el siguiente token probable) sobre datos incompletos o comprimidos.',
    },
    {
        icon: Gauge,
        number: '02',
        color: 'magenta',
        title: 'El Motor Probabilístico y la Falta de "Grounding" (Anclaje)',
        intro: 'El LLM funciona de forma secuencial prediciendo el siguiente token (palabra o fragmento) basándose en los anteriores. Es un sistema cerrado que, por defecto, no tiene acceso a internet ni al mundo real.',
        fundamento: 'El modelo carece de grounding (anclaje a la realidad). Vive en un universo matemático donde solo existen relaciones entre palabras, sin conexión con los hechos físicos verificables o bases de datos externas.',
        patologiaTitle: 'Patología Asociada (Sicofonía y Falta de Veracidad)',
        patologia: 'Para superar su inseguridad sobre qué es verdad (ya que no puede verificarlo externamente), el modelo desarrolla una patología llamada sicofonía: tiende a dar la razón al usuario incluso si este está equivocado, priorizando la "agradabilidad" o la coherencia con el prompt del usuario sobre la veracidad fáctica. Si el usuario le induce un error, el modelo a menudo lo adopta para completar el patrón estadístico que el usuario inició, sufriendo de "error de mímica". Solo mediante herramientas externas (como RAG o navegación web) activadas explícitamente se puede mitigar esta desconexión.',
    },
    {
        icon: Monitor,
        number: '03',
        color: 'emerald',
        title: 'La Ventana de Contexto: Una Mesa de Trabajo Finita',
        intro: 'El "espacio de trabajo" del LLM es su ventana de contexto. Todo lo que ocurre (instrucciones del sistema, tu pregunta, documentos PDF) se convierte en tokens y se coloca en esta mesa.',
        fundamento: 'La capacidad de atención del modelo es limitada. Aunque arquitecturas recientes permiten contextos enormes, técnicamente el modelo procesa la información mediante un mecanismo de atención que asigna importancia a diferentes partes de la entrada. Cuando la mesa se llena, el modelo aplica una ventana deslizante: para meter información nueva, debe "olvidar" o ignorar la más antigua, lo que puede llevar a perder el hilo o las instrucciones iniciales.',
        patologiaTitle: 'Patología Asociada (Olvido Catastrófico y Deriva)',
        patologia: 'Si la conversación se alarga demasiado, el modelo puede contradecirse o ignorar reglas establecidas al principio (Prompt del Sistema) simplemente porque ya no caben en su foco de atención inmediato.',
    },
    {
        icon: MapPin,
        number: '04',
        color: 'amber',
        title: 'El Problema del "Lost in the Middle" (Perdido en el Centro)',
        intro: 'Al modelo le cuesta mirar en el centro. Esto es un fenómeno físico real derivado de cómo funcionan los mecanismos de atención y el entrenamiento.',
        fundamento: 'Los modelos tienen un Sesgo de Posición. Durante su entrenamiento y por la naturaleza de la arquitectura Transformer, tienden a prestar mucha atención al principio del prompt (donde suelen estar las instrucciones) y al final (lo más reciente), pero la atención se "comba" en el medio. La precisión de recuperación de información sigue una curva en forma de U: alta en los extremos, baja en el centro.',
        patologiaTitle: 'Patología Asociada (Ceguera Selectiva)',
        patologia: 'Si le das al modelo un documento largo (ej. un PDF) y el dato crucial está en la página 15 de 30, es estadísticamente más probable que lo ignore o alucine una respuesta, a diferencia de si el dato estuviera en la página 1 o en la 30.',
    },
];

const summaryTable = [
    { arch: 'Compresión con pérdida', how: 'Los datos son pesos matemáticos, no archivos de texto reales', symptom: 'Alucinación', symptomDesc: 'Rellena huecos estadísticamente para que "suene bien"' },
    { arch: 'Predicción de próximo token', how: 'Optimiza la probabilidad lingüística, no la verdad fáctica', symptom: 'Loro Estocástico', symptomDesc: 'Repite patrones sin comprensión real' },
    { arch: 'Sistema Cerrado', how: 'Sin conexión nativa a la realidad externa (internet)', symptom: 'Sicofonía', symptomDesc: 'Al no poder verificar, prefiere dar la razón al usuario para maximizar la recompensa' },
    { arch: 'Atención en forma de U', how: 'Procesa mejor los extremos de la secuencia', symptom: 'Lost in the Middle', symptomDesc: 'Ignora información crítica si está en medio de un contexto largo' },
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
        <motion.div variants={fadeUp} className="space-y-4">
            {/* Section Header */}
            <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl ${cs.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                    <section.icon className={`w-5 h-5 ${cs.iconText}`} />
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-mono ${cs.iconText} tracking-widest`}>{section.number}</span>
                        <span className={`w-6 h-px ${cs.accent}`} />
                    </div>
                    <h3 className="text-lg font-bold text-ghost-white leading-snug">{section.title}</h3>
                </div>
            </div>

            {/* Intro paragraph */}
            <p className="text-sm text-ghost-white/80 leading-relaxed pl-14">
                {section.intro}
            </p>

            {/* Fundamento */}
            <div className={`ml-14 p-4 rounded-xl border ${cs.border} bg-surface-1/40`}>
                <div className="flex items-center gap-2 mb-2">
                    <FlaskConical className={`w-3.5 h-3.5 ${cs.iconText}`} />
                    <span className={`text-[10px] font-mono ${cs.iconText} tracking-wider`}>FUNDAMENTO</span>
                </div>
                <p className="text-sm text-ghost-white/85 leading-relaxed">{section.fundamento}</p>
            </div>

            {/* Patología */}
            <div className="ml-14 p-4 rounded-xl border border-red-glow/20 bg-red-glow/5">
                <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-glow" />
                    <span className="text-[10px] font-mono text-red-glow tracking-wider">{section.patologiaTitle.toUpperCase()}</span>
                </div>
                <p className="text-sm text-ghost-white/85 leading-relaxed">{section.patologia}</p>
            </div>
        </motion.div>
    );
};

/* ─── Page ─── */
const Llms = () => {
    return (
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-10">

            {/* Header with bloom effect */}
            <motion.div variants={fadeUp} className="relative rounded-2xl overflow-hidden border border-surface-3">
                <img
                    src="/images/header-llm-architecture.jpeg"
                    alt="LLM Architecture"
                    className="w-full h-48 md:h-64 object-cover opacity-40 header-image"
                />
                <div className="header-bloom" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-transparent z-[2]" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-[3]">
                    <p className="text-xs font-mono text-electric-cyan/60 tracking-wider mb-2 header-text-shadow">FASE 0 · PREREQUISITO</p>
                    <h1 className="text-3xl md:text-4xl font-black text-ghost-white header-text-shadow">La "Física" del LLM</h1>
                    <p className="text-muted mt-2 max-w-2xl header-text-shadow">Entiende la máquina antes de escribir. Fundamentos técnicos que explican cada patología.</p>
                </div>
            </motion.div>

            {/* Intro — 2-column layout to fill vertical/horizontal space */}
            <motion.div variants={fadeUp} className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-electric-cyan/50 to-transparent rounded-full" />
                    <div className="pl-8 space-y-4">
                        <p className="text-sm text-muted leading-relaxed">
                            Para comprender cómo funciona un <span className="text-ghost-white font-medium">Modelo de Lenguaje Grande (LLM)</span>, es fundamental analizar su "física" interna y los pilares de su arquitectura. A menudo tendemos a pensar que estas máquinas "saben" o comprenden la información de la misma manera que lo hace un ser humano; sin embargo, para avanzar en esta materia, debemos <span className="text-ghost-white font-medium">deconstruir esa idea</span>.
                        </p>
                        <p className="text-sm text-muted leading-relaxed">
                            En realidad, el comportamiento de estas herramientas y sus posibles <span className="text-ghost-white font-medium">fallos estructurales</span> o errores no son aleatorios, sino que derivan directamente de sus fundamentos técnicos.
                        </p>
                        <p className="text-sm text-muted leading-relaxed">
                            A lo largo de este material, exploraremos cómo su diseño original define la forma en que procesan los datos y por qué, debido a su propia naturaleza, surgen ciertas <span className="text-ghost-white font-medium">limitaciones o patologías</span> en sus respuestas.
                        </p>
                    </div>
                </div>

                <div className="hidden lg:block">
                    <div className="p-6 rounded-2xl border border-surface-3 bg-deep-slate/50 backdrop-blur-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <FlaskConical className="w-24 h-24 text-electric-cyan -rotate-12" />
                        </div>
                        <h4 className="text-[10px] font-mono text-electric-cyan tracking-[0.2em] mb-3 uppercase">Objetivo Técnico</h4>
                        <p className="text-xs text-ghost-white/90 leading-relaxed font-medium">
                            Comprender la arquitectura no como una caja negra, sino como un sistema de límites físicos que determina la calidad del output.
                        </p>
                        <div className="mt-4 flex items-center gap-2">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-6 h-6 rounded-full border-2 border-obsidian bg-surface-2 flex items-center justify-center text-[8px] font-bold text-muted">
                                        {i}
                                    </div>
                                ))}
                            </div>
                            <span className="text-[9px] font-mono text-muted/60 uppercase tracking-tighter">Niveles de Análisis</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* All 4 content sections — always visible */}
            <div className="space-y-10">
                {sections.map((section) => (
                    <ContentSection key={section.number} section={section} />
                ))}
            </div>

            {/* Context Window Visual */}
            <motion.div variants={fadeUp}>
                <h2 className="text-lg font-bold text-ghost-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-emerald-glow rounded-full" />
                    La Mesa de Trabajo
                </h2>
                <img src="/images/concept-context-window.jpeg" alt="Context Window" className="w-full rounded-xl mb-4 opacity-60 header-image" />
                <ContextWindowVisual />
            </motion.div>

            {/* Summary Table */}
            <motion.div variants={fadeUp}>
                <h2 className="text-lg font-bold text-ghost-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-neon-magenta rounded-full" />
                    Resumen: Física → Patología
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-surface-3">
                                <th className="text-left py-3 px-4 text-[10px] font-mono text-electric-cyan tracking-wider">ARQUITECTURA</th>
                                <th className="text-left py-3 px-4 text-[10px] font-mono text-muted tracking-wider">CÓMO FUNCIONA</th>
                                <th className="text-left py-3 px-4 text-[10px] font-mono text-red-glow tracking-wider">PATOLOGÍA</th>
                            </tr>
                        </thead>
                        <tbody>
                            {summaryTable.map((row, i) => (
                                <tr key={i} className="border-b border-surface-3/50 hover:bg-surface-2/30 transition-colors">
                                    <td className="py-3 px-4 text-ghost-white font-medium">{row.arch}</td>
                                    <td className="py-3 px-4 text-muted">{row.how}</td>
                                    <td className="py-3 px-4">
                                        <span className="inline-flex items-center gap-1.5 text-red-glow">
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-glow" />
                                            {row.symptom}
                                        </span>
                                        <p className="text-xs text-muted mt-0.5">{row.symptomDesc}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            <CompleteButton moduleId="llms" />
        </motion.div>
    );
};

export default Llms;
