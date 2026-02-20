import React, { useState } from 'react';
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
    Info,
    Repeat
} from 'lucide-react';

const PathologyCard = ({ item, cs, isFlashGlobal }) => {
    const [localFlip, setLocalFlip] = React.useState(false);

    // Reset local flip when global state changes
    React.useEffect(() => {
        setLocalFlip(false);
    }, [isFlashGlobal]);

    const showingFlash = isFlashGlobal ? !localFlip : false;

    return (
        <div
            className="relative h-full cursor-pointer group"
            style={{ perspective: '1000px' }}
            onClick={() => {
                if (isFlashGlobal) setLocalFlip(!localFlip);
            }}
        >
            <motion.div
                className="w-full h-full relative"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: showingFlash ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
            >
                {/* FRONT: Detailed */}
                <div
                    className="w-full h-full p-5 rounded-2xl border border-surface-3 bg-surface-1/40 group-hover:bg-surface-2 transition-colors"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <div className="flex items-start gap-3 mb-2">
                        <div className={`mt-1.5 w-1.5 h-1.5 rounded-full ${cs.accent} shrink-0 group-hover:scale-125 transition-transform`} />
                        <h3 className="text-sm font-bold text-ghost-white group-hover:text-white transition-colors">
                            {item.name}
                        </h3>
                    </div>
                    <p className="text-xs text-muted leading-relaxed pl-4">
                        {item.desc}
                    </p>
                    {isFlashGlobal && localFlip && (
                        <div className="absolute top-4 right-4 text-muted/40 group-hover:text-muted/80 transition-colors">
                            <Repeat className="w-4 h-4" />
                        </div>
                    )}
                </div>

                {/* BACK: Flash */}
                <div
                    className={`absolute inset-0 w-full h-full p-5 rounded-2xl border border-${cs.accent.replace('bg-', '')}/30 bg-surface-1/20 flex flex-col justify-center items-center text-center shadow-[0_0_15px_rgba(0,0,0,0.2)]`}
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    <h3 className="text-[10px] font-mono text-muted uppercase tracking-wider mb-2 opacity-70">
                        {item.name.split(' (')[0]}
                    </h3>
                    <p className={`text-xl font-black ${cs.text} leading-tight`}>
                        {item.flashDesc}
                    </p>

                    {/* Hover hint */}
                    <div className="absolute bottom-4 text-[9px] font-mono text-muted/30 uppercase tracking-widest flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Repeat className="w-3 h-3" />
                        Click para ver detalle
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

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
                flashDesc: 'Suena bien, está mal',
                desc: 'Es el riesgo más crítico. El modelo genera respuestas gramaticalmente perfectas, con tono profesional y total confianza, pero factualmente falsas. Ocurre porque el modelo optimiza la verosimilitud (que suene bien) sobre la veracidad (que sea cierto), bajando la guardia del usuario.'
            },
            {
                name: 'Ilusión de Fluidez',
                flashDesc: 'Ceguera del usuario',
                desc: 'Fenómeno complementario a la fluidez engañosa, referido específicamente a la incapacidad del usuario para detectar el error o auditar una respuesta crítica (salud, legal, código) debido a la alta calidad de la redacción y la seguridad aparente del modelo.'
            },
            {
                name: 'Colapso Epistémico',
                flashDesc: 'Te da la razón aunque sea falso',
                desc: 'Es la ruptura de la lógica interna del modelo ante la presión del usuario. Si el usuario afirma algo falso con seguridad, el modelo abandona sus datos de entrenamiento correctos para validar la premisa falsa, perdiendo su "agarre" a la verdad para complacer al interlocutor.'
            },
            {
                name: 'Alucinación (Inducida por ruido)',
                flashDesc: 'Se lo inventa',
                desc: 'Invención de información presentada como cierta. Cuando hay un exceso de datos irrelevantes ("paja") que debilita la señal, o cuando faltan datos concretos, el modelo inventa patrones probabilísticos para llenar los vacíos lógicos.'
            },
            {
                name: 'Búnker Temporal (Knowledge Cutoff)',
                flashDesc: 'Vive en el pasado',
                desc: 'El modelo vive en un pasado congelado. Al no tener noción del tiempo presente ni acceso a herramientas externas, si se le pregunta por hechos recientes, inventará datos basándose en probabilidades históricas.'
            },
            {
                name: 'Memoria Borrosa (Compresión)',
                flashDesc: 'Teléfono escacharrado',
                desc: 'Concepto técnico que explica que el modelo no almacena textos exactos, sino representaciones estadísticas comprimidas. Esto le obliga a "reconstruir" la información, lo que a menudo lleva a inventar detalles finos.'
            },
            {
                name: 'Fabricación de citas (Citation Fabrication)',
                flashDesc: 'Fuentes falsas',
                desc: 'Una variante técnica de la alucinación donde el modelo genera textos con "aspecto" de referencias bibliográficas válidas (año, DOI, etc). Sin un mecanismo de verificación, estadísticamente es verosímil pero fácticamente inútil.'
            },
            {
                name: 'Falsedades por imitación (Imitative Falsehoods)',
                flashDesc: 'Repite mitos',
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
                flashDesc: 'Pelota',
                desc: 'La tendencia del modelo a confirmar los sesgos del usuario, validar errores o darle la razón para maximizar la satisfacción. Actúa como un espejo complaciente en lugar de un auditor honesto.'
            },
            {
                name: 'Sicofancia Social',
                flashDesc: 'Exceso de cortesía',
                desc: 'Variante donde el modelo utiliza excesivo lenguaje indirecto o validación emocional ("Entiendo tu punto...", "Excelente pregunta") para proteger la imagen del usuario, diluyendo la calidad técnica.'
            },
            {
                name: 'Ruido Teatral (Theatrical Noise)',
                flashDesc: 'Pierde el foco actuando',
                desc: 'Ocurre cuando se fuerza un "Rol" innecesaria en tareas lógicas. El modelo gasta recursos en mantener el personaje en detrimento de la capacidad de cálculo, provocando errores en lógica pura.'
            },
            {
                name: 'Verbosidad (Yapping)',
                flashDesc: 'No se calla',
                desc: 'Tendencia a ser excesivamente "educado" y hablador, añadiendo introducciones, conclusiones morales y rellenos innecesarios que ensucian el resultado final.'
            },
            {
                name: 'Pereza (Laziness)',
                flashDesc: 'Vago',
                desc: 'Tendencia a tomar atajos cognitivos o dar respuestas incompletas (ej. "escribe el resto del código tú") para ahorrar recursos si el prompt no le exige un estándar alto.'
            },
            {
                name: 'Sobre-rechazo (Overrefusal)',
                flashDesc: 'Miedica',
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
                flashDesc: 'Basura acumulada',
                desc: 'La degradación progresiva de la calidad de la respuesta a medida que se acumula información irrelevante, firmas de correo o datos antiguos en el historial.'
            },
            {
                name: 'Efecto "Lost-in-the-Middle"',
                flashDesc: 'Olvida el centro',
                desc: 'Incapacidad del modelo para recuperar información situada en el centro de un prompt extenso. El modelo tiene un sesgo de atención en forma de "U": recuerda bien el inicio y el final.'
            },
            {
                name: 'Distracción de Contexto',
                flashDesc: 'Se come la paja',
                desc: 'Cuando la señal de las instrucciones es débil, el modelo prioriza patrones irrelevantes del texto adjunto ("paja") sobre su propio razonamiento lógico.'
            },
            {
                name: 'Choque de Contexto (Context Clash)',
                flashDesc: 'Cruza cables',
                desc: 'Confusión generada cuando se mezclan temas incompatibles en un mismo chat. El "residuo" latente de la tarea anterior sesga la interpretación de la nueva.'
            },
            {
                name: 'Truncamiento Silencioso',
                flashDesc: 'Amnesia repentina',
                desc: 'Cuando se supera el límite de tokens, la interfaz elimina mensajes antiguos sin avisar. Esto borra datos clave del cerebro activo, provocando amnesia inmediata.'
            },
            {
                name: 'Envenenamiento de Memoria',
                flashDesc: 'Recuerdos falsos',
                desc: 'Afecta a la Memoria Episódica. Ocurre cuando el modelo guarda como "hechos" preferencias falsas o datos de pruebas sucias, contaminando futuros chats.'
            },
            {
                name: 'Hinchazón del Prompt (Prompt Bloating)',
                flashDesc: 'Infoxicación',
                desc: 'Uso de prompts excesivamente largos con información no curada. Satura el contexto y, paradójicamente, reduce la "inteligencia" efectiva del modelo.'
            },
            {
                name: 'Truncación por Recuperación Silenciosa (Silent Retrieval Truncation)',
                flashDesc: 'Lee a trozos',
                desc: 'Pérdida de completitud causada por el RAG efímero que opera al adjuntar archivos. El sistema fragmenta el documento en chunks, indexa semánticamente y solo inserta los fragmentos que considera relevantes. Las secciones que no activan la recuperación simplemente no existen para el modelo. La respuesta parece completa, pero se basa en una versión silenciosamente amputada del documento. Se agrava con preguntas amplias y documentos con información distribuida entre secciones temáticamente distintas. Solución: si el documento cabe en la ventana de contexto (<60%), pegarlo como texto plano para eliminar el RAG intermediario por completo.'
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
                flashDesc: 'Se rompe solo',
                desc: 'Pérdida de capacidad resolutiva o rotura de un prompt que antes funcionaba, debido a modificaciones no visibles que los proveedores realizan sobre los pesos, políticas o parámetros internos.'
            },
            {
                name: 'Inyección de Prompt (Prompt Injection)',
                flashDesc: 'Secuestro mental',
                desc: 'Problema crítico de seguridad donde el sistema no tiene separación estricta entre "instrucción" y "dato". Un atacante introduce instrucciones camufladas dentro del input para alterar drásticamente el flujo lógico.'
            },
            {
                name: 'Bypass y Jailbreak',
                flashDesc: 'Se salta las reglas',
                desc: 'El modelo obedece instrucciones que no debería. A través de entradas adversariales, se rompen las barreras probabilísticas de "harmlessness", permitiendo la extracción de información sensible (como los system prompts).'
            },
            {
                name: 'Alucinación de Herramientas (Tool-Use Hallucinations)',
                flashDesc: 'Tool inventada',
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
    const [isFlashGlobal, setIsFlashGlobal] = useState(false);

    return (
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-12 pb-20">

            {/* Header */}
            <motion.div variants={fadeUp} className="relative rounded-3xl overflow-hidden border border-surface-3 shadow-2xl">
                <img
                    src="/images/header-pathology-atlas.jpeg"
                    alt="Pathology atlas"
                    className="w-full h-56 md:h-72 object-cover opacity-30 header-image scale-105"
                />
                <div className="header-bloom" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent z-[2]" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 z-[3]">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neon-magenta/20 text-neon-magenta border border-neon-magenta/30 tracking-wider">MÓDULO 2</span>
                        <span className="text-[10px] font-mono text-muted/80 tracking-widest uppercase">ATLAS DE FALLOS</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black header-text-shadow mb-4 leading-tight">
                        <span className="text-ghost-white">Atlas de </span><span className="text-neon-magenta">Patologías</span><span className="text-ghost-white"> del LLM</span>
                    </h1>
                    <p className="text-lg text-muted max-w-2xl header-text-shadow leading-relaxed">
                        Mapa diagnóstico de comportamientos emergentes y fallos estructurales.
                    </p>
                </div>
            </motion.div>

            {/* Intro: Connection to Module 1 */}
            <motion.div variants={fadeUp} className="space-y-5">
                <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-magenta/50 to-transparent rounded-full" />
                    <div className="pl-8 space-y-4">
                        <p className="text-sm text-ghost-white/90 leading-relaxed">
                            En el módulo anterior, analizamos la <strong className="text-electric-cyan">"Física del LLM"</strong>: cómo los tokens, la atención y la compresión estadística crean una maquinaria de predicción asombrosa. Pero, como en cualquier sistema complejo, donde hay una estructura, existe una <strong className="text-ghost-white">grieta potencial</strong>.
                        </p>
                        <p className="text-sm text-ghost-white/90 leading-relaxed">
                            Las patologías que estudiaremos a continuación no son "errores" aleatorios; son <strong className="text-ghost-white">consecuencias sistémicas</strong> de la propia naturaleza del modelo. No ocurren porque el modelo sea "tonto", sino precisamente por cómo está diseñado para funcionar. Cuando la compresión estadística falla, cuando la atención se satura o cuando el deseo de agradar al humano (<strong className="text-neon-magenta">RLHF</strong>) supera a la veracidad, surgen los síntomas que verás en este Atlas.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Classification Intro */}
            <motion.div variants={fadeUp} className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl border border-neon-magenta/20 bg-neon-magenta/5">
                <div className="shrink-0 pt-1">
                    <div className="w-10 h-10 rounded-full bg-neon-magenta/20 flex items-center justify-center text-neon-magenta">
                        <Brain className="w-5 h-5" />
                    </div>
                </div>
                <div>
                    <h3 className="text-sm font-bold text-neon-magenta uppercase tracking-wider mb-2">Enfoque Diagnóstico</h3>
                    <p className="text-ghost-white/90 leading-relaxed text-sm">
                        Para dominar el <em>Prompt Engineering</em> avanzado, debemos dejar de ver los fallos como "magia negra" y empezar a verlos como <strong className="text-ghost-white">diagnósticos clínicos</strong>. Hemos clasificado estas patologías en cuatro grandes áreas de impacto:
                    </p>
                </div>
            </motion.div>

            {/* 4 Category Previews */}
            <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-6">
                {/* 1. Epistémico */}
                <div className="p-5 rounded-2xl border border-electric-cyan/20 bg-surface-1/40 space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-electric-cyan/10 flex items-center justify-center border border-electric-cyan/20">
                            <Search className="w-4 h-4 text-electric-cyan" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-ghost-white">1. Patologías de la Verdad y el Conocimiento</h4>
                            <span className="text-[10px] font-mono text-electric-cyan tracking-wider uppercase">Fallo Epistémico</span>
                        </div>
                    </div>
                    <p className="text-xs text-muted/90 italic leading-relaxed">Surgen cuando la probabilidad estadística choca con la realidad fáctica.</p>
                    <p className="text-xs text-ghost-white/80 leading-relaxed">
                        Aquí es donde la <strong className="text-ghost-white">Compresión con pérdida</strong> y el <strong className="text-ghost-white">Sistema Cerrado</strong> que vimos anteriormente pasan factura. El modelo, al ser un "autocompletador" entrenado para ser fluido, prefiere inventar un dato (<strong className="text-electric-cyan">Alucinación</strong>) o fabricar una fuente (<strong className="text-electric-cyan">Fabricación de Citas</strong>) antes que romper la secuencia lógica de su discurso. Es el precio de transformar la biblioteca del mundo en una libreta de notas matemática.
                    </p>
                </div>

                {/* 2. Psicológico */}
                <div className="p-5 rounded-2xl border border-neon-magenta/20 bg-surface-1/40 space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-neon-magenta/10 flex items-center justify-center border border-neon-magenta/20">
                            <UserSearch className="w-4 h-4 text-neon-magenta" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-ghost-white">2. Patologías del Comportamiento y Alineación</h4>
                            <span className="text-[10px] font-mono text-neon-magenta tracking-wider uppercase">Fallo Socio-Adulante</span>
                        </div>
                    </div>
                    <p className="text-xs text-muted/90 italic leading-relaxed">Efectos secundarios del entrenamiento para "gustar" al humano.</p>
                    <p className="text-xs text-ghost-white/80 leading-relaxed">
                        Como aprendimos en el apartado de <strong className="text-ghost-white">RLHF</strong>, el modelo ha sido premiado por ser servicial. Esto genera una "personalidad" que puede derivar en la <strong className="text-neon-magenta">Sicofancia</strong> (darte la razón aunque no la tengas) o en la <strong className="text-neon-magenta">Verbosidad</strong> (relleno innecesario para parecer más útil). El modelo no intenta ser honesto; intenta ser el asistente que tú quieres que sea.
                    </p>
                </div>

                {/* 3. Estructural */}
                <div className="p-5 rounded-2xl border border-emerald-glow/20 bg-surface-1/40 space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-glow/10 flex items-center justify-center border border-emerald-glow/20">
                            <Database className="w-4 h-4 text-emerald-glow" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-ghost-white">3. Patologías de Memoria y Contexto</h4>
                            <span className="text-[10px] font-mono text-emerald-glow tracking-wider uppercase">Fallo Estructural</span>
                        </div>
                    </div>
                    <p className="text-xs text-muted/90 italic leading-relaxed">Limitaciones físicas de la "Mesa de Trabajo" o Ventana de Contexto.</p>
                    <p className="text-xs text-ghost-white/80 leading-relaxed">
                        Aquí se manifiestan las grietas del <strong className="text-ghost-white">Mecanismo de Atención</strong>. Cuando la ventana se llena o la instrucción es ambigua, aparecen fenómenos como el <strong className="text-emerald-glow">Efecto "Lost-in-the-Middle"</strong> o el <strong className="text-emerald-glow">Envenenamiento de Memoria</strong>. Es el resultado directo de tener un "foco" de atención que, aunque potente, es finito y puede "olvidar" lo que tiene debajo en la pila.
                    </p>
                </div>

                {/* 4. Sistémico */}
                <div className="p-5 rounded-2xl border border-amber-glow/20 bg-surface-1/40 space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-glow/10 flex items-center justify-center border border-amber-glow/20">
                            <RefreshCcw className="w-4 h-4 text-amber-glow" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-ghost-white">4. Patologías Operativas y de Evolución</h4>
                            <span className="text-[10px] font-mono text-amber-glow tracking-wider uppercase">Fallo Sistémico</span>
                        </div>
                    </div>
                    <p className="text-xs text-muted/90 italic leading-relaxed">Fallos derivados del uso continuo y la naturaleza de la infraestructura.</p>
                    <p className="text-xs text-ghost-white/80 leading-relaxed">
                        Desde la <strong className="text-amber-glow">Regresión por Actualización</strong> hasta la vulnerabilidad ante <strong className="text-amber-glow">Inyecciones de Prompt</strong>, estas patologías responden a cómo el modelo interactúa con el mundo exterior y con sus propios filtros de seguridad en un entorno cambiante.
                    </p>
                </div>
            </motion.div>

            {/* Clinical Quote */}
            <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-surface-3 bg-deep-slate/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <ShieldAlert className="w-20 h-20 text-neon-magenta -rotate-12" />
                </div>
                <div className="flex items-start gap-4">
                    <div className="w-1 shrink-0 bg-neon-magenta/50 rounded-full self-stretch" />
                    <div className="space-y-3">
                        <p className="text-[10px] font-mono text-neon-magenta tracking-[0.2em] uppercase font-bold">Sesión Clínica</p>
                        <p className="text-sm text-ghost-white/90 leading-relaxed">
                            No busques culpables, busca causas físicas. Cada patología tiene una raíz en la arquitectura que acabas de estudiar y, por tanto, tiene una <strong className="text-ghost-white">solución de ingeniería</strong> asociada.
                        </p>
                        <p className="text-sm text-muted leading-relaxed italic">
                            ¿Estás listo para empezar el diagnóstico? Exploremos en detalle cada una de estas categorías para aprender a mitigarlas.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Separator before detailed categories with GLOBAL FLASH TOGGLE */}
            <motion.div variants={fadeUp} className="flex flex-col md:flex-row items-center gap-4 py-8">
                <div className="h-px flex-1 bg-surface-3 hidden md:block" />
                <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-muted uppercase tracking-[0.2em]">Exploración Detallada</span>

                    {/* GLOBAL FLASH TOGGLE */}
                    <button
                        onClick={() => setIsFlashGlobal(!isFlashGlobal)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${isFlashGlobal ? 'bg-neon-magenta/10 text-neon-magenta border-neon-magenta shadow-[0_0_15px_rgba(255,0,255,0.15)]' : 'bg-surface-2 text-muted border-surface-3 hover:text-ghost-white hover:border-surface-4'}`}
                    >
                        <Zap className={`w-4 h-4 ${isFlashGlobal ? 'animate-pulse' : ''}`} />
                        Modo Resumen Flash {isFlashGlobal ? 'ON' : 'OFF'}
                    </button>
                </div>
                <div className="h-px flex-1 bg-surface-3" />
            </motion.div>

            {/* Content Sections */}
            <div className="space-y-16">
                {pathologyData.map((category) => {
                    const cs = colorMap[category.color];
                    return (
                        <motion.section key={category.id} variants={fadeUp} className="space-y-6">
                            {/* Category Header */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center gap-4 flex-1">
                                    <div className={`w-12 h-12 rounded-2xl ${cs.bg} flex items-center justify-center border ${cs.border} shrink-0`}>
                                        <category.icon className={`w-6 h-6 ${cs.text}`} />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-xl font-black text-ghost-white tracking-tight leading-none mb-1 uppercase">
                                            {category.title}
                                        </h2>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[10px] font-mono ${cs.text} tracking-[0.2em] uppercase font-bold whitespace-nowrap`}>{category.subtitle}</span>
                                            <span className={`flex-1 h-px ${cs.accent} opacity-20 hidden md:block`} />
                                        </div>
                                    </div>
                                </div>

                                {/* Removed individual category flash toggle as per instructions */}
                            </div>

                            <p className="text-sm text-muted max-w-3xl pl-16">
                                {category.description}
                            </p>

                            {/* Items Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pl-16">
                                {category.items.map((item, idx) => (
                                    <PathologyCard key={idx} item={item} cs={cs} isFlashGlobal={isFlashGlobal} />
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
                        { label: 'EPISTÉMICO', icon: Search, color: 'text-electric-cyan', desc: 'Fallo de Conocimiento' },
                        { label: 'SOCIO-ADULANTE', icon: UserSearch, color: 'text-neon-magenta', desc: 'Fallo de Alineación' },
                        { label: 'ESTRUCTURAL', icon: Database, color: 'text-emerald-glow', desc: 'Fallo de Contexto' },
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
