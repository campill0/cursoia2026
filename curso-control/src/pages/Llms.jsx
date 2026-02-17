import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BentoGrid, BentoCell } from '../components/ui/BentoGrid';
import { ContextWindowVisual } from '../components/ui/ContextWindowVisual';
import { CompleteButton } from '../components/ui/CompleteButton';
import { Archive, Gauge, Monitor, MapPin, ChevronDown, FlaskConical, AlertTriangle } from 'lucide-react';

const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 25 } }
};

/* ─── Structured Knowledge ─── */
const knowledgeBlocks = [
    {
        icon: Archive,
        number: '01',
        title: 'Compresión con Pérdida',
        subtitle: 'No es una biblioteca, es un archivo ZIP borroso',
        color: 'cyan',
        intro: 'Como bien señalas, un LLM no es una copia de internet. Físicamente, un LLM es un archivo de parámetros (pesos numéricos) que resulta de un proceso de compresión con pérdida de una cantidad masiva de texto.',
        fundamento: 'El modelo no almacena textos, sino probabilidades y relaciones entre fragmentos de texto (tokens) convertidos en vectores numéricos (embeddings). Durante el entrenamiento, el modelo comprime la información de internet en estos pesos, perdiendo la fuente original y los detalles exactos, quedándose solo con los patrones estadísticos.',
        patologiaName: 'Alucinación',
        patologia: 'Dado que la información está comprimida y "borrosa", cuando le haces una pregunta, el modelo no "recupera" un dato, sino que lo reconstruye probabilísticamente. Si el modelo no tiene el dato exacto, rellena los huecos con lo que estadísticamente "suena bien" o es más probable, no con lo que es verdad. Esto es la ontología de la alucinación: no es un error del sistema, sino el sistema funcionando correctamente (prediciendo el siguiente token probable) sobre datos incompletos o comprimidos.',
    },
    {
        icon: Gauge,
        number: '02',
        title: 'Motor Probabilístico',
        subtitle: 'Falta de "Grounding" (Anclaje)',
        color: 'magenta',
        intro: 'El LLM funciona de forma secuencial prediciendo el siguiente token (palabra o fragmento) basándose en los anteriores. Es un sistema cerrado que, por defecto, no tiene acceso a internet ni al mundo real.',
        fundamento: 'El modelo carece de grounding (anclaje a la realidad). Vive en un universo matemático donde solo existen relaciones entre palabras, sin conexión con los hechos físicos verificables o bases de datos externas.',
        patologiaName: 'Sicofonía',
        patologia: 'Para superar su inseguridad sobre qué es verdad (ya que no puede verificarlo externamente), el modelo desarrolla una patología llamada sicofonía: tiende a dar la razón al usuario incluso si este está equivocado, priorizando la "agradabilidad" o la coherencia con el prompt del usuario sobre la veracidad fáctica. Si el usuario le induce un error, el modelo a menudo lo adopta para completar el patrón estadístico que el usuario inició, sufriendo de "error de mímica". Solo mediante herramientas externas (como RAG o navegación web) activadas explícitamente se puede mitigar esta desconexión.',
    },
    {
        icon: Monitor,
        number: '03',
        title: 'Ventana de Contexto',
        subtitle: 'Una mesa de trabajo finita',
        color: 'emerald',
        intro: 'El "espacio de trabajo" del LLM es su ventana de contexto. Todo lo que ocurre (instrucciones del sistema, tu pregunta, documentos PDF) se convierte en tokens y se coloca en esta mesa.',
        fundamento: 'La capacidad de atención del modelo es limitada. Aunque arquitecturas recientes permiten contextos enormes, técnicamente el modelo procesa la información mediante un mecanismo de atención que asigna importancia a diferentes partes de la entrada. Cuando la mesa se llena, el modelo aplica una ventana deslizante: para meter información nueva, debe "olvidar" o ignorar la más antigua, lo que puede llevar a perder el hilo o las instrucciones iniciales.',
        patologiaName: 'Olvido Catastrófico y Deriva',
        patologia: 'Si la conversación se alarga demasiado, el modelo puede contradecirse o ignorar reglas establecidas al principio (Prompt del Sistema) simplemente porque ya no caben en su foco de atención inmediato.',
    },
    {
        icon: MapPin,
        number: '04',
        title: 'Lost in the Middle',
        subtitle: 'Perdido en el Centro',
        color: 'amber',
        intro: 'Al modelo le cuesta mirar en el centro. Esto es un fenómeno físico real derivado de cómo funcionan los mecanismos de atención y el entrenamiento.',
        fundamento: 'Los modelos tienen un Sesgo de Posición. Durante su entrenamiento y por la naturaleza de la arquitectura Transformer, tienden a prestar mucha atención al principio del prompt (donde suelen estar las instrucciones) y al final (lo más reciente), pero la atención se "comba" en el medio. La precisión de recuperación de información sigue una curva en forma de U: alta en los extremos, baja en el centro.',
        patologiaName: 'Ceguera Selectiva',
        patologia: 'Si le das al modelo un documento largo (ej. un PDF) y el dato crucial está en la página 15 de 30, es estadísticamente más probable que lo ignore o alucine una respuesta, a diferencia de si el dato estuviera en la página 1 o en la 30.',
    },
];

const summaryTable = [
    { arch: 'Compresión con pérdida', how: 'Los datos son pesos matemáticos, no archivos de texto reales', symptom: 'Alucinación', symptomDesc: 'Rellena huecos estadísticamente para que "suene bien"' },
    { arch: 'Predicción de próximo token', how: 'Optimiza la probabilidad lingüística, no la verdad fáctica', symptom: 'Loro Estocástico', symptomDesc: 'Repite patrones sin comprensión real' },
    { arch: 'Sistema cerrado', how: 'Sin conexión nativa a la realidad externa (internet)', symptom: 'Sicofonía', symptomDesc: 'Al no poder verificar, prefiere dar la razón al usuario para maximizar la recompensa' },
    { arch: 'Atención en forma de U', how: 'Procesa mejor los extremos de la secuencia', symptom: 'Lost in the Middle', symptomDesc: 'Ignora información crítica si está en medio de un contexto largo' },
];

const colorStyles = {
    cyan: { accent: 'bg-electric-cyan', iconBg: 'bg-electric-cyan/10', iconText: 'text-electric-cyan', tabActive: 'bg-electric-cyan/15 text-electric-cyan border-electric-cyan/30', border: 'border-electric-cyan/15' },
    magenta: { accent: 'bg-neon-magenta', iconBg: 'bg-neon-magenta/10', iconText: 'text-neon-magenta', tabActive: 'bg-neon-magenta/15 text-neon-magenta border-neon-magenta/30', border: 'border-neon-magenta/15' },
    emerald: { accent: 'bg-emerald-glow', iconBg: 'bg-emerald-glow/10', iconText: 'text-emerald-glow', tabActive: 'bg-emerald-glow/15 text-emerald-glow border-emerald-glow/30', border: 'border-emerald-glow/15' },
    amber: { accent: 'bg-amber-glow', iconBg: 'bg-amber-glow/10', iconText: 'text-amber-glow', tabActive: 'bg-amber-glow/15 text-amber-glow border-amber-glow/30', border: 'border-amber-glow/15' },
};

/* ─── Knowledge Block Component ─── */
const KnowledgeBlock = ({ block, isOpen, onToggle }) => {
    const [activeTab, setActiveTab] = useState('fundamento');
    const cs = colorStyles[block.color];

    return (
        <motion.div
            variants={fadeUp}
            className="bg-deep-slate border border-surface-3 rounded-2xl overflow-hidden group"
        >
            {/* Header — always visible */}
            <button
                onClick={onToggle}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-surface-2/50 transition-colors"
            >
                <div className={`w-10 h-10 rounded-xl ${cs.iconBg} flex items-center justify-center shrink-0`}>
                    <block.icon className={`w-5 h-5 ${cs.iconText}`} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono ${cs.iconText} tracking-widest`}>{block.number}</span>
                        <span className={`w-4 h-px ${cs.accent}`} />
                    </div>
                    <h3 className="text-base font-bold text-ghost-white mt-0.5">{block.title}</h3>
                    <p className="text-xs text-muted mt-0.5">{block.subtitle}</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-muted shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-electric-cyan' : ''}`} />
            </button>

            {/* Expandable content */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-5">
                            {/* Intro */}
                            <p className="text-sm text-muted leading-relaxed mb-4">{block.intro}</p>

                            {/* Tabs */}
                            <div className="flex gap-2 mb-4">
                                <button
                                    onClick={() => setActiveTab('fundamento')}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${activeTab === 'fundamento'
                                        ? cs.tabActive
                                        : 'border-surface-3 text-muted hover:text-ghost-white hover:border-surface-3'
                                        }`}
                                >
                                    <FlaskConical className="w-3 h-3" />
                                    Fundamento
                                </button>
                                <button
                                    onClick={() => setActiveTab('patologia')}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${activeTab === 'patologia'
                                        ? 'bg-red-glow/15 text-red-glow border-red-glow/30'
                                        : 'border-surface-3 text-muted hover:text-ghost-white hover:border-surface-3'
                                        }`}
                                >
                                    <AlertTriangle className="w-3 h-3" />
                                    {block.patologiaName}
                                </button>
                            </div>

                            {/* Tab content */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    {activeTab === 'fundamento' ? (
                                        <div className={`p-4 rounded-xl border ${cs.border} bg-surface-1/50`}>
                                            <p className="text-sm text-ghost-white/85 leading-relaxed">{block.fundamento}</p>
                                        </div>
                                    ) : (
                                        <div className="p-4 rounded-xl border border-red-glow/15 bg-red-glow/5">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="w-2 h-2 rounded-full bg-red-glow animate-pulse" />
                                                <span className="text-[10px] font-mono text-red-glow tracking-wider">PATOLOGÍA CLÍNICA</span>
                                            </div>
                                            <p className="text-sm text-ghost-white/85 leading-relaxed">{block.patologia}</p>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

/* ─── Page ─── */
const Llms = () => {
    const [openBlock, setOpenBlock] = useState(null);

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

            {/* Intro */}
            <motion.div variants={fadeUp} className="max-w-3xl">
                <p className="text-sm text-muted leading-relaxed">
                    A menudo pensamos que los LLM "saben" o comprenden la información como un humano. Para avanzar, debemos <span className="text-ghost-white font-medium">deconstruir esa idea</span>. Sus fallos no son aleatorios — derivan directamente de su arquitectura. Cada fundamento técnico tiene una patología asociada.
                </p>
            </motion.div>

            {/* Knowledge Blocks */}
            <motion.div variants={fadeUp} className="space-y-3">
                <h2 className="text-lg font-bold text-ghost-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-electric-cyan rounded-full" />
                    Anatomía del Modelo
                </h2>
                {knowledgeBlocks.map((block) => (
                    <KnowledgeBlock
                        key={block.number}
                        block={block}
                        isOpen={openBlock === block.number}
                        onToggle={() => setOpenBlock(prev => prev === block.number ? null : block.number)}
                    />
                ))}
            </motion.div>

            {/* Context Window Visual */}
            <motion.div variants={fadeUp}>
                <h2 className="text-lg font-bold text-ghost-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-emerald-glow rounded-full" />
                    La Mesa de Trabajo
                </h2>
                <img src="/images/concept-context-window.png" alt="Context Window" className="w-full rounded-xl mb-4 opacity-60 header-image" />
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
