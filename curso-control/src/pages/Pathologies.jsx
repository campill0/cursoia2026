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
        description: <>Afectan la relación del modelo con la <strong>realidad, la facticidad y la lógica</strong>. Surgen porque el modelo prioriza la <strong>probabilidad estadística</strong> y la completitud del patrón sobre la verdad fáctica.</>,
        items: [
            {
                name: 'Fluidez Engañosa (Deceptive Fluency)',
                desc: <>Es el <strong>riesgo más crítico</strong>. El modelo genera respuestas gramaticalmente perfectas, con tono profesional y total confianza, pero <strong>factualmente falsas</strong>. Ocurre porque optimiza la <strong>verosimilitud</strong> (que suene bien) sobre la <strong>veracidad</strong> (que sea cierto), bajando la guardia del usuario.</>
            },
            {
                name: 'Ilusión de Fluidez',
                desc: <>Fenómeno complementario, referido específicamente a la <strong>incapacidad del usuario</strong> para detectar el error o auditar una respuesta crítica (salud, legal, código) debido a la <strong>alta calidad de la redacción</strong> y la seguridad aparente del modelo.</>
            },
            {
                name: 'Colapso Epistémico',
                desc: <>Es la ruptura de la <strong>lógica interna</strong> del modelo. Si el usuario afirma algo falso con seguridad, el modelo abandona sus datos correctos para <strong>validar la premisa falsa</strong>, perdiendo su "agarre" a la verdad para complacer al interlocutor.</>
            },
            {
                name: 'Alucinación (Inducida por ruido)',
                desc: <>Invención de información presentada como cierta. Cuando hay un <strong>exceso de datos irrelevantes</strong> que debilita la señal, o cuando faltan datos, el modelo <strong>inventa patrones</strong> para llenar los vacíos lógicos.</>
            },
            {
                name: 'Búnker Temporal (Knowledge Cutoff)',
                desc: <>El modelo vive en un <strong>pasado congelado</strong>. Al no tener noción del tiempo presente ni acceso a red, si se le pregunta por hechos recientes, <strong>inventará datos</strong> basándose en probabilidades históricas.</>
            },
            {
                name: 'Memoria Borrosa (Compresión)',
                desc: <>El modelo no almacena textos exactos, sino <strong>representaciones estadísticas comprimidas</strong>. Esto le obliga a <strong>"reconstruir"</strong> la información, lo que a menudo lleva a inventar detalles finos.</>
            },
            {
                name: 'Fabricación de citas (Citation Fabrication)',
                desc: <>Variante técnica donde genera textos con "aspecto" de <strong>referencias bibliográficas válidas</strong> (año, DOI). Estadísticamente es verosímil pero <strong>fácticamente inútil</strong> sin verificación externa.</>
            },
            {
                name: 'Falsedades por imitación (Imitative Falsehoods)',
                desc: <>Produce afirmaciones falsas porque son <strong>muy frecuentes en textos humanos</strong>. Al predecir continuaciones, absorbe y refleja <strong>mitos, rumores o concepciones erróneas sistémicas</strong>.</>
            }
        ]
    },
    {
        id: 'psychological',
        title: 'Patologías del Comportamiento y Alineación',
        subtitle: 'Fallo Psicológico',
        icon: UserSearch,
        color: 'magenta',
        description: <>Defectos en la <strong>"personalidad" o actitud</strong> del modelo, derivados principalmente de su entrenamiento con retroalimentación humana (<strong>RLHF</strong>).</>,
        items: [
            {
                name: 'Sicofancia (El "Síndrome del Adulador")',
                desc: <>La tendencia del modelo a <strong>confirmar los sesgos</strong> del usuario, validar errores o darle la razón para <strong>maximizar la satisfacción</strong>. Actúa como un espejo complaciente.</>
            },
            {
                name: 'Sicofancia Social',
                desc: <>Variante donde el modelo utiliza excesivo lenguaje indirecto o <strong>validación emocional</strong> para proteger la imagen del usuario, <strong>diluyendo la calidad técnica</strong>.</>
            },
            {
                name: 'Ruido Teatral (Theatrical Noise)',
                desc: <>Ocurre cuando se fuerza un <strong>"Rol" innecesario</strong>. El modelo gasta recursos en <strong>mantener el personaje</strong> en detrimento de la capacidad de cálculo, provocando errores en lógica pura.</>
            },
            {
                name: 'Verbosidad (Yapping)',
                desc: <>Tendencia a ser <strong>excesivamente "educado" y hablador</strong>, añadiendo introducciones, conclusiones morales y <strong>rellenos innecesarios</strong> que ensucian el resultado final.</>
            },
            {
                name: 'Pereza (Laziness)',
                desc: <>Tendencia a tomar <strong>atajos cognitivos</strong> o dar respuestas incompletas (ej. "escribe el resto tú") para <strong>ahorrar recursos</strong> si el prompt no le exige un estándar alto.</>
            },
            {
                name: 'Sobre-rechazo (Overrefusal)',
                desc: <>El modelo asume una postura conservadora con <strong>falsos positivos</strong>. Puede <strong>negarse a responder</strong> preguntas benignas inocuas debido a ambigüedad semántica con áreas "prohibidas".</>
            }
        ]
    },
    {
        id: 'structural',
        title: 'Patologías de Memoria y Contexto',
        subtitle: 'Fallo Estructural',
        icon: Database,
        color: 'emerald',
        description: <>Problemas físicos relacionados con la <strong>"Ventana de Contexto"</strong> (espacio de trabajo) y cómo se <strong>procesa o almacena</strong> la información.</>,
        items: [
            {
                name: 'Podredumbre del Contexto (Context Rot)',
                desc: <>La <strong>degradación progresiva</strong> de la respuesta a medida que se acumula información irrelevante, firmas antiguas o <strong>datos obsoletos</strong> en el historial de chat.</>
            },
            {
                name: 'Efecto "Lost-in-the-Middle"',
                desc: <>Incapacidad para recuperar información situada <strong>en el centro</strong> de un prompt extenso. El modelo tiene un sesgo de atención: <strong>recuerda bien el inicio y el final</strong>.</>
            },
            {
                name: 'Distracción de Contexto',
                desc: <>Cuando la instrucción es débil, el modelo prioriza <strong>patrones irrelevantes del texto adjunto ("paja")</strong> sobre su propio razonamiento lógico real.</>
            },
            {
                name: 'Choque de Contexto (Context Clash)',
                desc: <>Confusión generada al mezclar <strong>temas incompatibles</strong> en un mismo chat. El <strong>"residuo" latente</strong> de la tarea anterior sesga la interpretación de la nueva.</>
            },
            {
                name: 'Truncamiento Silencioso',
                desc: <>Cuando se supera el límite de tokens, la interfaz <strong>elimina mensajes antiguos sin avisar</strong>. Esto borra datos clave del cerebro, provocando <strong>amnesia inmediata</strong>.</>
            },
            {
                name: 'Envenenamiento de Memoria',
                desc: <>Afecta a Memorias de Largo Plazo. Ocurre cuando el modelo guarda como "hechos" reales tus <strong>preferencias falsas o datos puramente de prueba</strong>, contaminando el futuro.</>
            },
            {
                name: 'Hinchazón del Prompt (Prompt Bloating)',
                desc: <>Uso de prompts excesivamente largos <strong>sin curar</strong>. Esto satura el contexto y, paradójicamente, <strong>reduce la "inteligencia"</strong> efectiva de la inferencia del modelo.</>
            }
        ]
    },
    {
        id: 'evolutionary',
        title: 'Patologías Operativas y de Evolución',
        subtitle: 'Fallo Sistémico',
        icon: RefreshCcw,
        color: 'amber',
        description: <>Fallos relacionados con el uso continuado, la seguridad sistémica y la naturaleza <strong>invisiblemente cambiante</strong> de la infraestructura tecnológica detrás.</>,
        items: [
            {
                name: 'Regresiones por Actualización (Prompt Drift)',
                desc: <>Pérdida de capacidad resolutiva o rotura de un prompt debido a <strong>modificaciones técnicas invisibles</strong> que los proveedores realizan sobre la arquitectura misma.</>
            },
            {
                name: 'Inyección de Prompt (Prompt Injection)',
                desc: <>Problema de seguridad donde se introducen <strong>instrucciones agresivas camufladas</strong> dentro del input original para alterar por completo el <strong>flujo lógico predefinido</strong>.</>
            },
            {
                name: 'Bypass y Jailbreak',
                desc: <>A través de entradas adversariales rebuscadas, se rompen las <strong>barreras éticas de seguridad</strong>, permitiendo forzar el volcado de datos prohibidos o "system prompts".</>
            },
            {
                name: 'Alucinación de Herramientas (Tool-Use Hallucinations)',
                desc: <>El modelo predice falsamente requerir llamar a una herramienta y <strong>se inventa llamadas o parámetros técnicos JSON</strong> que jamás existieron ni fueron solicitados estáticamente.</>
            }
        ]
    }
];

const colorMap = {
    cyan: { text: 'text-electric-cyan', bg: 'bg-electric-cyan/10', border: 'border-electric-cyan/30', accent: 'bg-electric-cyan', strongModifier: '[&>strong]:text-electric-cyan [&>strong]:bg-electric-cyan/10' },
    magenta: { text: 'text-neon-magenta', bg: 'bg-neon-magenta/10', border: 'border-neon-magenta/30', accent: 'bg-neon-magenta', strongModifier: '[&>strong]:text-neon-magenta [&>strong]:bg-neon-magenta/10' },
    emerald: { text: 'text-emerald-glow', bg: 'bg-emerald-glow/10', border: 'border-emerald-glow/30', accent: 'bg-emerald-glow', strongModifier: '[&>strong]:text-emerald-glow [&>strong]:bg-emerald-glow/10' },
    amber: { text: 'text-amber-glow', bg: 'bg-amber-glow/10', border: 'border-amber-glow/30', accent: 'bg-amber-glow', strongModifier: '[&>strong]:text-amber-glow [&>strong]:bg-amber-glow/10' },
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
                    <div className="pl-8 space-y-5">
                        <p className="text-[1.05rem] text-ghost-white/90 leading-[1.8]">
                            Estas no son simples "errores", sino <span className="text-electric-cyan font-semibold bg-[rgba(0,229,255,0.15)] px-1.5 py-0.5 rounded">fallos estructurales y sistémicos</span> derivados de la naturaleza probabilística del modelo, su entrenamiento por refuerzo y la gestión técnica de su memoria.
                        </p>
                        <p className="text-[1.05rem] text-ghost-white/90 leading-[1.8]">
                            A continuación, desglosamos la <span className="text-electric-cyan font-semibold bg-[rgba(0,229,255,0.15)] px-1.5 py-0.5 rounded">clínica completa</span> dividida en cuatro grandes áreas de impacto. Entender estos síntomas es el primer paso para diseñar técnicas de mitigación efectivas.
                        </p>
                    </div>
                </div>

                <div className="hidden lg:block">
                    <div className="p-6 rounded-2xl border border-surface-3 bg-deep-slate/50 backdrop-blur-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <ShieldAlert className="w-24 h-24 text-neon-magenta -rotate-12" />
                        </div>
                        <h4 className="text-[10px] font-mono text-neon-magenta tracking-[0.2em] mb-3 uppercase">Visión Clínica</h4>
                        <p className="text-sm text-ghost-white/90 leading-[1.7] font-medium">
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

                            <p className={`text-[1.05rem] text-ghost-white/80 leading-[1.7] max-w-3xl pl-16 [&>strong]:font-semibold [&>strong]:px-1.5 [&>strong]:py-0.5 [&>strong]:rounded ${cs.strongModifier}`}>
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
                                            <h3 className="text-base font-bold text-ghost-white group-hover:text-white transition-colors">
                                                {item.name}
                                            </h3>
                                        </div>
                                        <p className={`text-[0.95rem] text-ghost-white/80 leading-[1.7] pl-4 line-clamp-4 group-hover:line-clamp-none transition-all mt-1 [&>strong]:font-semibold [&>strong]:px-1 [&>strong]:py-0.5 [&>strong]:rounded ${cs.strongModifier}`}>
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
