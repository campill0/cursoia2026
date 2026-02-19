import React from 'react';
import { motion } from 'framer-motion';
import { CompleteButton } from '../components/ui/CompleteButton';
import {
    Brain,
    ShieldAlert,
    Zap,
    Activity,
    Search,
    UserSearch,
    Database,
    RefreshCcw,
    AlertCircle,
    Info
} from 'lucide-react';

const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 25 } }
};

const pathologyData = [
    {
        id: 'epistemic',
        title: 'Patologías de la Verdad y el Conocimiento',
        subtitle: 'Fallo Epistémico',
        icon: Search,
        color: 'cyan',
        description: 'Afectan la relación del modelo con la realidad, la facticidad y la lógica. Surgen porque el modelo prioriza la probabilidad estadística y la completitud del patrón sobre la verdad fáctica.',
        items: [
            {
                name: 'Fluidez Engañosa (Deceptive Fluency)',
                desc: 'Es el riesgo más crítico. El modelo genera respuestas gramaticalmente perfectas, con tono profesional y total confianza, pero factualmente falsas. Ocurre porque el modelo optimiza la verosimilitud (que suene bien) sobre la veracidad (que sea cierto), bajando la guardia del usuario.'
            },
            {
                name: 'Ilusión de Fluidez',
                desc: 'Fenómeno complementario a la fluidez engañosa, referido específicamente a la incapacidad del usuario para detectar el error o auditar una respuesta crítica (salud, legal, código) debido a la alta calidad de la redacción y la seguridad aparente del modelo.'
            },
            {
                name: 'Colapso Epistémico',
                desc: 'Es la ruptura de la lógica interna del modelo ante la presión del usuario. Si el usuario afirma algo falso con seguridad, el modelo abandona sus datos de entrenamiento correctos para validar la premisa falsa, perdiendo su "agarre" a la verdad para complacer al interlocutor.'
            },
            {
                name: 'Alucinación (Inducida por ruido)',
                desc: 'Invención de información presentada como cierta. Cuando hay un exceso de datos irrelevantes ("paja") que debilita la señal, o cuando faltan datos concretos, el modelo inventa patrones probabilísticos para llenar los vacíos lógicos.'
            },
            {
                name: 'Búnker Temporal (Knowledge Cutoff)',
                desc: 'El modelo vive en un pasado congelado. Al no tener noción del tiempo presente ni acceso a herramientas externas, si se le pregunta por hechos recientes, inventará datos basándose en probabilidades históricas.'
            },
            {
                name: 'Memoria Borrosa (Compresión)',
                desc: 'Concepto técnico que explica que el modelo no almacena textos exactos, sino representaciones estadísticas comprimidas. Esto le obliga a "reconstruir" la información, lo que a menudo lleva a inventar detalles finos.'
            },
            {
                name: 'Fabricación de citas (Citation Fabrication)',
                desc: 'Una variante técnica de la alucinación donde el modelo genera textos con "aspecto" de referencias bibliográficas válidas (año, DOI, etc). Sin un mecanismo de verificación, estadísticamente es verosímil pero fácticamente inútil.'
            },
            {
                name: 'Falsedades por imitación (Imitative Falsehoods)',
                desc: 'El modelo produce afirmaciones falsas no porque "invente", sino porque son muy frecuentes en el texto humano. Al predecir continuaciones probables, absorbe y refleja mitos, rumores o concepciones erróneas sistémicas.'
            }
        ]
    },
    {
        id: 'psychological',
        title: 'Patologías del Comportamiento y Alineación',
        subtitle: 'Fallo Psicológico',
        icon: UserSearch,
        color: 'magenta',
        description: 'Defectos en la "personalidad" o actitud del modelo, derivados principalmente de su entrenamiento con retroalimentación humana (RLHF).',
        items: [
            {
                name: 'Sicofancia (El "Síndrome del Adulador")',
                desc: 'La tendencia del modelo a confirmar los sesgos del usuario, validar errores o darle la razón para maximizar la satisfacción. Actúa como un espejo complaciente en lugar de un auditor honesto.'
            },
            {
                name: 'Sicofancia Social',
                desc: 'Variante donde el modelo utiliza excesivo lenguaje indirecto o validación emocional ("Entiendo tu punto...", "Excelente pregunta") para proteger la imagen del usuario, diluyendo la calidad técnica.'
            },
            {
                name: 'Ruido Teatral (Theatrical Noise)',
                desc: 'Ocurre cuando se fuerza un "Rol" innecesaria en tareas lógicas. El modelo gasta recursos en mantener el personaje en detrimento de la capacidad de cálculo, provocando errores en lógica pura.'
            },
            {
                name: 'Verbosidad (Yapping)',
                desc: 'Tendencia a ser excesivamente "educado" y hablador, añadiendo introducciones, conclusiones morales y rellenos innecesarios que ensucian el resultado final.'
            },
            {
                name: 'Pereza (Laziness)',
                desc: 'Tendencia a tomar atajos cognitivos o dar respuestas incompletas (ej. "escribe el resto del código tú") para ahorrar recursos si el prompt no le exige un estándar alto.'
            },
            {
                name: 'Sobre-rechazo (Overrefusal)',
                desc: 'Como producto del entrenamiento en seguridad (harmlessness), el modelo asume una postura conservadora con falsos positivos. Puede negarse a responder preguntas benignas o inocuas debido a ambigüedad semántica que lo acerca a áreas "prohibidas".'
            }
        ]
    },
    {
        id: 'structural',
        title: 'Patologías de Memoria y Contexto',
        subtitle: 'Fallo Estructural',
        icon: Database,
        color: 'emerald',
        description: 'Problemas físicos relacionados con la "Ventana de Contexto" (el espacio de trabajo) y cómo se procesa o almacena la información.',
        items: [
            {
                name: 'Podredumbre del Contexto (Context Rot)',
                desc: 'La degradación progresiva de la calidad de la respuesta a medida que se acumula información irrelevante, firmas de correo o datos antiguos en el historial.'
            },
            {
                name: 'Efecto "Lost-in-the-Middle"',
                desc: 'Incapacidad del modelo para recuperar información situada en el centro de un prompt extenso. El modelo tiene un sesgo de atención en forma de "U": recuerda bien el inicio y el final.'
            },
            {
                name: 'Distracción de Contexto',
                desc: 'Cuando la señal de las instrucciones es débil, el modelo prioriza patrones irrelevantes del texto adjunto ("paja") sobre su propio razonamiento lógico.'
            },
            {
                name: 'Choque de Contexto (Context Clash)',
                desc: 'Confusión generada cuando se mezclan temas incompatibles en un mismo chat. El "residuo" latente de la tarea anterior sesga la interpretación de la nueva.'
            },
            {
                name: 'Truncamiento Silencioso',
                desc: 'Cuando se supera el límite de tokens, la interfaz elimina mensajes antiguos sin avisar. Esto borra datos clave del cerebro activo, provocando amnesia inmediata.'
            },
            {
                name: 'Envenenamiento de Memoria',
                desc: 'Afecta a la Memoria Episódica. Ocurre cuando el modelo guarda como "hechos" preferencias falsas o datos de pruebas sucias, contaminando futuros chats.'
            },
            {
                name: 'Hinchazón del Prompt (Prompt Bloating)',
                desc: 'Uso de prompts excesivamente largos con información no curada. Satura el contexto y, paradójicamente, reduce la "inteligencia" efectiva del modelo.'
            }
        ]
    },
    {
        id: 'evolutionary',
        title: 'Patologías Operativas y de Evolución',
        subtitle: 'Fallo Sistémico',
        icon: RefreshCcw,
        color: 'amber',
        description: 'Fallos relacionados con el uso continuado, la seguridad y la naturaleza cambiante de la infraestructura tecnológica.',
        items: [
            {
                name: 'Regresiones por Actualización (Update Regressions/Prompt Drift)',
                desc: 'Pérdida de capacidad resolutiva o rotura de un prompt que antes funcionaba, debido a modificaciones no visibles que los proveedores realizan sobre los pesos, políticas o parámetros internos.'
            },
            {
                name: 'Inyección de Prompt (Prompt Injection)',
                desc: 'Problema crítico de seguridad donde el sistema no tiene separación estricta entre "instrucción" y "dato". Un atacante introduce instrucciones camufladas dentro del input para alterar drásticamente el flujo lógico.'
            },
            {
                name: 'Bypass y Jailbreak',
                desc: 'El modelo obedece instrucciones que no debería. A través de entradas adversariales, se rompen las barreras probabilísticas de "harmlessness", permitiendo la extracción de información sensible (como los system prompts).'
            },
            {
                name: 'Alucinación de Herramientas (Tool-Use Hallucinations)',
                desc: 'Debilidad de arquitecturas agénticas. El modelo predice tokens para hacer una llamada a una herramienta pero se inventa los nombres o los propios parámetros porque rellena "lo que estadísticamente parece JSON válido".'
            }
        ]
    }
];

const colorMap = {
    cyan: { text: 'text-electric-cyan', bg: 'bg-electric-cyan/10', border: 'border-electric-cyan/30', accent: 'bg-electric-cyan' },
    magenta: { text: 'text-neon-magenta', bg: 'bg-neon-magenta/10', border: 'border-neon-magenta/30', accent: 'bg-neon-magenta' },
    emerald: { text: 'text-emerald-glow', bg: 'bg-emerald-glow/10', border: 'border-emerald-glow/30', accent: 'bg-emerald-glow' },
    amber: { text: 'text-amber-glow', bg: 'bg-amber-glow/10', border: 'border-amber-glow/30', accent: 'bg-amber-glow' },
};

const Pathologies = () => {
    return (
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-12 pb-20">

            {/* Header */}
            <motion.div variants={fadeUp} className="relative rounded-2xl overflow-hidden border border-surface-3">
                <img
                    src="/images/header-pathology-atlas.jpeg"
                    alt="Pathology atlas"
                    className="w-full h-48 md:h-64 object-cover opacity-40 header-image"
                />
                <div className="header-bloom" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-transparent z-[2]" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-[3]">
                    <p className="text-xs font-mono text-neon-magenta/60 tracking-wider mb-2 header-text-shadow">MÓDULO 1 · ATLAS DE FALLOS</p>
                    <h1 className="text-3xl md:text-4xl font-black header-text-shadow">
                        <span className="text-neon-magenta">Patologías</span><span className="text-ghost-white"> del LLM</span>
                    </h1>
                    <p className="text-muted mt-2 max-w-2xl header-text-shadow">Mapa diagnóstico de comportamientos emergentes y fallos estructurales derivados de la arquitectura Transformer.</p>
                </div>
            </motion.div>

            {/* Intro Grid */}
            <motion.div variants={fadeUp} className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-magenta/50 to-transparent rounded-full" />
                    <div className="pl-8 space-y-4">
                        <p className="text-sm text-muted leading-relaxed">
                            Estas no son simples "errores", sino <span className="text-ghost-white font-medium">fallos estructurales y sistémicos</span> derivados de la naturaleza probabilística del modelo, su entrenamiento por refuerzo y la gestión técnica de su memoria.
                        </p>
                        <p className="text-sm text-muted leading-relaxed">
                            A continuación, desglosamos el <span className="text-ghost-white font-medium">clínica completa</span> dividida en cuatro grandes áreas de impacto. Entender estos síntomas es el primer paso para diseñar técnicas de mitigación efectivas.
                        </p>
                    </div>
                </div>

                <div className="hidden lg:block">
                    <div className="p-6 rounded-2xl border border-surface-3 bg-deep-slate/50 backdrop-blur-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <ShieldAlert className="w-24 h-24 text-neon-magenta -rotate-12" />
                        </div>
                        <h4 className="text-[10px] font-mono text-neon-magenta tracking-[0.2em] mb-3 uppercase">Visión Clínica</h4>
                        <p className="text-xs text-ghost-white/90 leading-relaxed font-medium">
                            No busques culpables, busca causas físicas. Cada patología tiene una solución de ingeniería asociada.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Content Sections */}
            <div className="space-y-16">
                {pathologyData.map((category) => {
                    const cs = colorMap[category.color];
                    return (
                        <motion.section key={category.id} variants={fadeUp} className="space-y-6">
                            {/* Category Header */}
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl ${cs.bg} flex items-center justify-center border ${cs.border} shrink-0`}>
                                    <category.icon className={`w-6 h-6 ${cs.text}`} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-ghost-white tracking-tight leading-none mb-1 uppercase">
                                        {category.title}
                                    </h2>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[10px] font-mono ${cs.text} tracking-[0.2em] uppercase font-bold`}>{category.subtitle}</span>
                                        <span className={`flex-1 h-px ${cs.accent} opacity-20`} />
                                    </div>
                                </div>
                            </div>

                            <p className="text-sm text-muted max-w-3xl pl-16">
                                {category.description}
                            </p>

                            {/* Items Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pl-16">
                                {category.items.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="p-5 rounded-2xl border border-surface-3 bg-surface-1/40 hover:bg-surface-2 transition-all hover:border-surface-4 group"
                                    >
                                        <div className="flex items-start gap-3 mb-2">
                                            <div className={`mt-1.5 w-1.5 h-1.5 rounded-full ${cs.accent} shrink-0 group-hover:scale-125 transition-transform`} />
                                            <h3 className="text-sm font-bold text-ghost-white group-hover:text-white transition-colors">
                                                {item.name}
                                            </h3>
                                        </div>
                                        <p className="text-xs text-muted leading-relaxed pl-4 line-clamp-4 group-hover:line-clamp-none transition-all">
                                            {item.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.section>
                    );
                })}
            </div>

            {/* Quick Summary / Cheat Sheet Footer */}
            <motion.div variants={fadeUp} className="p-8 rounded-3xl bg-gradient-to-br from-surface-2 to-deep-slate border border-surface-3">
                <div className="flex items-center gap-3 mb-6">
                    <Activity className="w-5 h-5 text-electric-cyan" />
                    <h2 className="text-lg font-bold text-ghost-white">Resumen de Diagnóstico</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'EPISTÉMICO', icon: Search, color: 'text-electric-cyan', desc: 'Fallo de Verdad' },
                        { label: 'PSICOLÓGICO', icon: UserSearch, color: 'text-neon-magenta', desc: 'Fallo de Actitud' },
                        { label: 'ESTRUCTURAL', icon: Database, color: 'text-emerald-glow', desc: 'Fallo de Memoria' },
                        { label: 'SISTÉMICO', icon: RefreshCcw, color: 'text-amber-glow', desc: 'Fallo Operativo' },
                    ].map((badge, i) => (
                        <div key={i} className="flex flex-col items-center text-center p-4 rounded-xl bg-obsidian/40 border border-surface-3/30">
                            <badge.icon className={`w-6 h-6 ${badge.color} mb-2`} />
                            <span className="text-[9px] font-mono text-muted tracking-widest uppercase mb-1">{badge.label}</span>
                            <span className="text-xs text-ghost-white font-medium">{badge.desc}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            <CompleteButton moduleId="pathologies" />
        </motion.div>
    );
};

export default Pathologies;
