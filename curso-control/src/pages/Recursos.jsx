import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Brain, ShieldCheck, Sparkles, AlertTriangle, Video, Bot, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 25 } }
};

const resourceCategories = [
    {
        title: "Fundamentos y ChatGPT",
        description: "Bases teóricas y guías de uso de las herramientas.",
        icon: Brain,
        color: "from-blue-500 to-indigo-500",
        items: [
            {
                title: "Introducción a ChatGPT",
                subtitle: "Conceptos básicos, entorno y primeros pasos.",
                filename: "Introducción a chatgpt.pdf",
                icon: Sparkles
            },
            {
                title: "Funcionalidades Avanzadas de ChatGPT",
                subtitle: "Uso del Lienzo (Canvas), Intérprete y más.",
                filename: "Introducción 2 a chatgpt.pdf",
                icon: WrenchIcon
            },
            {
                title: "Uso Responsable de la IA",
                subtitle: "Ética, privacidad, sesgos y seguridad en el uso empresarial.",
                filename: "Uso responsable de la IA.pdf",
                icon: ShieldCheck
            },
            {
                title: "01. La Mecánica del LLM",
                subtitle: "Tokens, Embeddings, Atención y Ventana de Contexto.",
                filename: "001_Anatomía_del_LLM.pdf",
                icon: Brain
            },
            {
                title: "02. Atlas de Patologías",
                subtitle: "Alucinaciones, Sicofancia, Amnesia y otros fallos estructurales.",
                filename: "002_Atlas_de_patologias_de_los_LLM.pdf",
                icon: AlertTriangle
            }
        ]
    },
    {
        title: "Framework C.O.N.T.R.O.L.",
        description: "Metodología avanzada para la ingeniería y control de modelos de lenguaje.",
        icon: ShieldCheck,
        color: "from-electric-cyan to-emerald-glow",
        items: [
            {
                title: "Fase C: Contexto Curado",
                subtitle: "Gestión de información, relación señal/ruido y mitigación de memorias borrosas.",
                filename: "01_Fase_C_Contexto_Curado.pdf"
            },
            {
                title: "Fase O: Objetivo y Omni-Rol",
                subtitle: "Ingeniería de Identidad, matriz VOCES y arquitecturas multipersona.",
                filename: "02_Fase_O_Objetivo_y_Omni_Rol.pdf"
            },
            {
                title: "Fase N: Normas y Negativas",
                subtitle: "Arquitectura de Contención, protocolos anti-sicofancia y filtros de higiene.",
                filename: "03_Fase_N_Normas_y_Negativas.pdf"
            },
            {
                title: "Fase T: Tutela del Razonamiento",
                subtitle: "Descomposición lógica, exploración de alternativas y secuencias explícitas.",
                filename: "04_Fase_T_Tutela_del_Razonamiento.pdf"
            },
            {
                title: "Fase R: Realidad y Resistencia",
                subtitle: "Seguridad Epistémica, auditoría cruzada, y anclaje a hechos y actualidad.",
                filename: "05_Fase_R_Realidad_y_Resistencia.pdf"
            },
            {
                title: "Fase O₂: Output y Organización",
                subtitle: "Protocolo F.O.R.M.A.S, visualización, técnica prefill y anti-yapping.",
                filename: "06_Fase_O2_Output_y_Organizacion.pdf"
            },
            {
                title: "Fase L: Loop de Mejora",
                subtitle: "Refinamiento directo, meta-prompting, poda correctiva y test A/B.",
                filename: "07_Fase_L_Loop_de_Mejora.pdf"
            }
        ]
    }
];

function WrenchIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
    )
}

const ResourceCard = ({ item, colorGradient }) => {
    const Icon = item.icon || FileText;

    return (
        <motion.a
            variants={fadeUp}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={`${import.meta.env.BASE_URL}presentaciones/${item.filename}`}
            download
            className="group block relative bg-surface-1/40 backdrop-blur-md rounded-2xl border border-surface-3 hover:border-surface-3/80 overflow-hidden transition-all shadow-lg hover:shadow-xl"
        >
            <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${colorGradient} opacity-70 group-hover:opacity-100 transition-opacity`} />
            <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-ghost-white mb-2 leading-tight group-hover:text-electric-cyan transition-colors">
                            {item.title}
                        </h3>
                        <p className="text-sm text-muted/90 leading-relaxed mb-4">
                            {item.subtitle}
                        </p>
                    </div>
                    <div className="shrink-0 w-10 h-10 rounded-full bg-surface-2/50 flex items-center justify-center group-hover:bg-electric-cyan/10 transition-colors">
                        <Icon className="w-5 h-5 text-ghost-white/70 group-hover:text-electric-cyan transition-colors" />
                    </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono font-bold text-electric-cyan opacity-80 group-hover:opacity-100 transition-opacity">
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargar PDF</span>
                </div>
            </div>
        </motion.a>
    );
};

const Recursos = () => {
    return (
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-12 pb-20 max-w-6xl mx-auto">

            {/* Header */}
            <motion.div variants={fadeUp} className="relative rounded-3xl overflow-hidden border border-surface-3 shadow-2xl bg-surface-1/50">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent z-0" />
                <div className="relative z-10 p-8 md:p-12">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-electric-cyan/20 text-electric-cyan border border-electric-cyan/30 tracking-wider"><Download className="w-3 h-3 inline-block mr-1 -mt-0.5" />MATERIALES</span>
                        <span className="text-[10px] font-mono text-muted/80 tracking-widest uppercase">RECURSOS</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight text-ghost-white">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-blue-400">Recursos</span> y Apuntes
                    </h1>
                    <p className="text-lg text-muted max-w-2xl leading-relaxed">
                        Accede a las presentaciones, guías y materiales del curso en formato PDF listos para descargar y consultar sin conexión.
                    </p>
                </div>
            </motion.div>

            {/* Categories */}
            <div className="space-y-16">
                {resourceCategories.map((category, idx) => {
                    const CategoryIcon = category.icon;
                    return (
                        <div key={idx} className="space-y-6">
                            <div className="flex items-center gap-4 mb-8">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg shadow-black/20`}>
                                    <CategoryIcon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-ghost-white">{category.title}</h2>
                                    <p className="text-sm text-muted mt-1">{category.description}</p>
                                </div>
                            </div>

                            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {category.items.map((item, itemIdx) => (
                                    <ResourceCard key={itemIdx} item={item} colorGradient={category.color} />
                                ))}
                            </motion.div>
                        </div>
                    );
                })}
            </div>

            {/* Grabaciones de Sesiones */}
            <motion.div variants={fadeUp} className="space-y-6 pt-12 border-t border-surface-3">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-black/20">
                        <Video className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-ghost-white">Grabaciones de Sesiones</h2>
                        <p className="text-sm text-muted mt-1">Vuelve a ver las sesiones del curso.</p>
                    </div>
                </div>

                <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={fadeUp} className="group block relative bg-surface-1/40 backdrop-blur-md rounded-2xl border border-surface-3 overflow-hidden shadow-lg p-4 transition-all hover:border-surface-3/80 hover:shadow-xl">
                        <div className="aspect-video w-full rounded-xl overflow-hidden bg-surface-2/50 relative border border-surface-3">
                            <iframe
                                src="https://aytocartagenaes-my.sharepoint.com/personal/froilan_ros_ayto-cartagena_es/_layouts/15/embed.aspx?UniqueId=d787778b-82b1-40a2-8ccf-db075eb6a055&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                scrolling="no"
                                allowFullScreen
                                title="II Curso Iniciación a la IA-20260303_085417UTC-Meeting Recording.mp4"
                                className="absolute top-0 left-0 w-full h-full"
                            ></iframe>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-lg font-bold text-ghost-white mb-1 group-hover:text-electric-cyan transition-colors">Sesión 1</h3>
                            <p className="text-sm text-muted/90 leading-relaxed">Grabación de la primera sesión presencial del curso.</p>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Asistentes GPT Personalizados */}
            <motion.div variants={fadeUp} className="space-y-6 pt-12 border-t border-surface-3">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-black/20">
                        <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-ghost-white">Asistentes GPT Personalizados</h2>
                        <p className="text-sm text-muted mt-1">Herramientas impulsadas por IA diseñadas específicamente para este curso y tu día a día.</p>
                    </div>
                </div>

                <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        {
                            title: "¿A qué hora salgo?",
                            description: "Sirve para decirte a qué hora te tienes que ir del trabajo teniendo en cuenta la normativa del Ayuntamiento de Cartagena analizando las entradas y salidas que has realizado durante el día.",
                            url: "https://chatgpt.com/g/g-67c5d2e7d7cc819197e911c420446739-a-que-hora-salgo",
                            color: "from-blue-500 to-cyan-500"
                        },
                        {
                            title: "C.O.N.T.R.O.L. Prompt Builder",
                            description: "Le pasas un prompt y te lo mejora siguiendo los conceptos enseñados en este curso.",
                            url: "https://chatgpt.com/g/g-69a76fa4cae88191b027aeca4bf3e358-c-o-n-t-r-o-l-prompt-builder",
                            color: "from-purple-500 to-pink-500"
                        },
                        {
                            title: "Tutor Control de IA",
                            description: "Es una especie de tutor personalizado que contiene toda la documentación del curso y ayuda a los estudiantes en una forma conversacional propia de un asistente.",
                            url: "https://chatgpt.com/g/g-69a779efd29881919a246d40764404ae-tutor-control-de-ia",
                            color: "from-emerald-500 to-teal-500"
                        }
                    ].map((gpt, idx) => (
                        <motion.a
                            key={idx}
                            variants={fadeUp}
                            whileHover={{ y: -5, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            href={gpt.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col relative bg-surface-1/40 backdrop-blur-md rounded-2xl border border-surface-3 hover:border-surface-3/80 overflow-hidden transition-all shadow-lg hover:shadow-xl"
                        >
                            <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${gpt.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <h3 className="text-lg font-bold text-ghost-white leading-tight group-hover:text-electric-cyan transition-colors flex-1">
                                        {gpt.title}
                                    </h3>
                                    <div className="shrink-0 w-10 h-10 rounded-full bg-surface-2/50 flex items-center justify-center group-hover:bg-electric-cyan/10 transition-colors">
                                        <Bot className="w-5 h-5 text-ghost-white/70 group-hover:text-electric-cyan transition-colors" />
                                    </div>
                                </div>
                                <p className="text-sm text-muted/90 leading-relaxed mb-6 flex-1">
                                    {gpt.description}
                                </p>
                                <div className="flex items-center gap-2 text-xs font-mono font-bold text-electric-cyan opacity-80 group-hover:opacity-100 transition-opacity mt-auto">
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    <span>Abrir en ChatGPT</span>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </motion.div>
            </motion.div>

        </motion.div>
    );
};

export default Recursos;
