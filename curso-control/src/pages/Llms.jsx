import React from 'react';
import { motion } from 'framer-motion';
import { ContextWindowVisual } from '../components/ui/ContextWindowVisual';
import { CompleteButton } from '../components/ui/CompleteButton';
import {
    Binary,
    ScanEye,
    Database,
    Lock,
    UserCheck,
    Play,
    PanelTop,
    Minimize,
    Factory,
    FlaskConical,
    AlertTriangle
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
        number: '0.1',
        title: 'Texto → Tokens → Embeddings',
        icon: Binary,
        color: 'cyan',
        causa: 'El modelo no procesa "palabras" como tú. Convierte el texto en fragmentos (tokens) y los representa como vectores numéricos (embeddings). Todo lo que hagas después (comprensión, recuperación, generación) ocurre sobre esas representaciones.',
        sintomas: 'Sensibilidad extrema a la redacción · Ambigüedad no resuelta · Pérdida de fidelidad literal (paráfrasis que cambia matices)',
    },
    {
        number: '0.2',
        title: 'Arquitectura Transformer: Atención',
        icon: ScanEye,
        color: 'magenta',
        causa: 'El núcleo es un mecanismo de atención que asigna "importancia" a partes distintas de la secuencia. No "lee" visualmente: calcula relevancia token a token dentro de una secuencia, repartiendo su foco de manera no uniforme.',
        sintomas: 'Sesgo de posición · Recuperación irregular en prompts largos · Ceguera selectiva ante datos "enterrados"',
    },
    {
        number: '0.3',
        title: 'Preentrenamiento: predicción del siguiente token (compresión con pérdida)',
        icon: Database,
        color: 'emerald',
        causa: 'Un LLM no es una biblioteca ni una copia de internet. Es un archivo de parámetros (pesos numéricos) obtenido por un proceso de compresión con pérdida sobre cantidades masivas de texto. No almacena textos: almacena relaciones estadísticas entre tokens comprimidas en pesos.',
        sintomas: 'Alucinación / confabulación · Falsa precisión (detalle inventado pero convincente) · Fabricación de referencias o citas',
    },
    {
        number: '0.4',
        title: 'Sistema cerrado: falta de grounding (anclaje a realidad)',
        icon: Lock,
        color: 'amber',
        causa: 'Por defecto, el modelo vive en un universo de relaciones entre palabras: no tiene conexión nativa a hechos verificables ni bases de datos externas. Sin herramientas, no "comprueba": busca coherencia con el contexto disponible.',
        sintomas: 'Errores factuales con alta confianza · Aceptación de premisas falsas · Error de mímica · Sicofancia',
    },
    {
        number: '0.5',
        title: 'Post-entrenamiento: alineamiento (RLHF) y optimización social',
        icon: UserCheck,
        color: 'cyan',
        causa: 'Tras el preentrenamiento, el modelo se refina para comportarse de forma "útil" y aceptable para humanos. Esto tiende a premiar respuestas fluidas, cooperativas y satisfactorias, incluso cuando el sistema no dispone de evidencia suficiente.',
        sintomas: 'Sicofancia social · Verbosidad ("relleno útil") · Sobreconfianza en el tono aunque falte evidencia · Rechazo excesivo (prudencia rígida)',
    },
    {
        number: '0.6',
        title: 'Inferencia: generación token a token (salida secuencial)',
        icon: Play,
        color: 'magenta',
        causa: 'En ejecución, el modelo genera la respuesta secuencialmente: token a token. No "recupera" un dato como una base de datos; construye una continuación probable del contexto actual, y el camino que toma condiciona el resto de la respuesta.',
        sintomas: 'Inconsistencias entre respuestas a la misma pregunta · Respuestas plausibles en vez de correctas · Bucles o repetición en texto largo',
    },
    {
        number: '0.7',
        title: 'Ventana de contexto: mesa de trabajo finita',
        icon: PanelTop,
        color: 'emerald',
        causa: 'Todo lo que ocurre (instrucciones del sistema, tu input, documentos pegados) entra como tokens en una ventana finita. Cuando la mesa se llena, se aplica una poda/ventana deslizante: para meter texto nuevo se pierde (o se ignora) parte de lo anterior.',
        sintomas: 'Olvido de requisitos previos · Contradicciones a mitad de conversación · Truncamiento silencioso (amnesia súbita)',
        visual: <ContextWindowVisual />
    },
    {
        number: '0.8',
        title: 'Recuperación en prompts largos: "Lost in the Middle"',
        icon: Minimize,
        color: 'amber',
        causa: 'Existe un sesgo de posición: el modelo atiende mejor al principio y al final del prompt, pero la atención cae en el centro. La recuperación de información suele seguir una curva en U.',
        sintomas: 'Lost-in-the-Middle · Ignorar datos críticos en el centro · Responder como si el dato no existiera',
    },
    {
        number: '0.9',
        title: 'Contexto en producción: señal/ruido, seguridad y evolución',
        icon: Factory,
        color: 'cyan',
        causa: 'La IA procesa secuencias: si el contexto llega sucio o mezclado, baja la relación señal/ruido. Además, texto externo no confiable puede introducir instrucciones ocultas. Y el comportamiento puede variar por cambios del proveedor o actualizaciones del modelo.',
        sintomas: 'Context rot · Alucinación inducida por ruido · Inyección de prompt indirecta · Prompt drift (deja de funcionar lo que antes funcionaba)',
    }
];

const summaryTable = [
    { stage: 'Tokens/Embeddings', symptom: 'Sensibilidad a redacción, pérdida de matiz' },
    { stage: 'Atención (Transformer)', symptom: 'Sesgo de posición, ceguera selectiva' },
    { stage: 'Preentrenamiento', symptom: 'Alucinación, falsa precisión' },
    { stage: 'Sistema cerrado', symptom: 'Errores factuales, sicofancia, mímica' },
    { stage: 'Alineamiento (RLHF)', symptom: 'Sicofancia social, verbosidad, sobreconfianza' },
    { stage: 'Ventana de contexto', symptom: 'Olvido, contradicciones, truncamiento' },
    { stage: 'Prompts largos', symptom: 'Lost-in-the-Middle' },
    { stage: 'Producción', symptom: 'Context rot, prompt injection, prompt drift' },
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
                    </div>
                </div>

                <div className="space-y-4 pl-0 md:pl-16">
                    {/* Causa (Cómo funciona) */}
                    <div className={`p-4 rounded-xl border ${cs.border} bg-surface-1/40`}>
                        <div className="flex items-center gap-2 mb-2">
                            <FlaskConical className={`w-3.5 h-3.5 ${cs.iconText}`} />
                            <span className={`text-[10px] font-mono ${cs.iconText} tracking-wider uppercase`}>Cómo funciona (Causa)</span>
                        </div>
                        <p className="text-sm text-ghost-white/90 leading-relaxed">{section.causa}</p>
                    </div>

                    {/* Síntomas (Patología) */}
                    <div className="p-4 rounded-xl border border-red-glow/20 bg-red-glow/5">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-3.5 h-3.5 text-red-glow" />
                            <span className="text-[10px] font-mono text-red-glow tracking-wider uppercase">Síntomas (Fallo)</span>
                        </div>
                        <div className="text-sm text-ghost-white/85 leading-relaxed">{section.sintomas}</div>
                    </div>

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
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-electric-cyan/20 text-electric-cyan border border-electric-cyan/30 tracking-wider">FASE 0</span>
                        <span className="text-[10px] font-mono text-muted/80 tracking-widest uppercase">PREREQUISITO</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black header-text-shadow mb-4 leading-tight">
                        <span className="text-ghost-white">La "</span><span className="text-electric-cyan">Física</span><span className="text-ghost-white">" del LLM</span>
                    </h1>
                    <p className="text-lg text-muted max-w-2xl header-text-shadow leading-relaxed">
                        Entiende la máquina antes de escribir. Fundamentos técnicos que explican por qué aparecen sus patologías.
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
                        Entender la arquitectura no como una caja negra, sino como un sistema de límites que determina la calidad del output. Sus fallos no son "caprichos"; son efectos directos de cómo está construido y optimizado.
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
                    Resumen: Etapa → Síntomas
                </h2>
                <div className="overflow-hidden rounded-xl border border-surface-3 bg-surface-1/30">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="bg-surface-2/50 border-b border-surface-3">
                                <th className="text-left py-4 px-6 text-[10px] font-mono text-electric-cyan tracking-wider uppercase">Etapa</th>
                                <th className="text-left py-4 px-6 text-[10px] font-mono text-red-glow tracking-wider uppercase">Síntomas</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-3/50">
                            {summaryTable.map((row, i) => (
                                <tr key={i} className="hover:bg-surface-2/30 transition-colors">
                                    <td className="py-4 px-6 text-ghost-white font-medium">{row.stage}</td>
                                    <td className="py-4 px-6 text-muted/90">{row.symptom}</td>
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
