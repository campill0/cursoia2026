import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import {
    PHASE_KEYS, phasesMeta, quickTemplates, defaultWizardState,
    speakerOptions, expertProfiles, archetypeProfiles,
    audienceOptions, intentOptions,
    formatOptions, organizationOptions, lengthOptions, toneOptions,
    reasoningLevels, normsCheckboxes,
    buildPrompt, buildPromptBlocks,
} from '../../lib/wizardData';
import {
    Copy, Check, RotateCcw, ChevronLeft, ChevronRight,
    Sparkles, Info, Zap, ClipboardCheck, ArrowRight, SkipForward,
} from 'lucide-react';

// ─── Small helpers ───────────────────────────────────────────────────────────

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 28 } },
    exit: { opacity: 0, y: -12, transition: { duration: 0.15 } },
};

// AnimatePresence children need explicit initial/animate/exit props (not variant names)
const fadeInOut = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 28 } },
    exit: { opacity: 0, y: -12, transition: { duration: 0.15 } },
};

const Label = ({ children, className }) => (
    <label className={cn("block text-sm font-semibold text-ghost-white/90 mb-1.5", className)}>{children}</label>
);

const HelpText = ({ children }) => (
    <p className="text-xs text-muted mt-1 leading-relaxed">{children}</p>
);

const Select = ({ value, onChange, options, className }) => (
    <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className={cn(
            "w-full bg-surface-1 border border-surface-3 rounded-xl px-3 py-2.5 text-sm text-ghost-white",
            "focus:outline-none focus:ring-2 focus:ring-electric-cyan/40 focus:border-electric-cyan/40 transition-all",
            "appearance-none cursor-pointer",
            className
        )}
    >
        {options.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
        ))}
    </select>
);

const Toggle = ({ checked, onChange, label, desc }) => (
    <label className="flex items-start gap-3 cursor-pointer group py-1">
        <div className="pt-0.5">
            <div
                onClick={e => { e.preventDefault(); onChange(!checked); }}
                className={cn(
                    "w-10 h-5.5 rounded-full relative transition-colors duration-200 flex-shrink-0",
                    checked ? "bg-electric-cyan" : "bg-surface-3"
                )}
                style={{ width: 40, height: 22 }}
            >
                <div
                    className={cn(
                        "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200",
                        checked ? "translate-x-5" : "translate-x-0.5"
                    )}
                    style={{ width: 18, height: 18 }}
                />
            </div>
        </div>
        <div className="flex-1 min-w-0">
            <span className="text-sm font-medium text-ghost-white/90 group-hover:text-ghost-white transition-colors">{label}</span>
            {desc && <p className="text-xs text-muted mt-0.5 leading-relaxed">{desc}</p>}
        </div>
    </label>
);

const Textarea = ({ value, onChange, placeholder, rows = 3 }) => (
    <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={cn(
            "w-full bg-surface-1 border border-surface-3 rounded-xl px-3 py-2.5 text-sm text-ghost-white placeholder:text-muted/50",
            "focus:outline-none focus:ring-2 focus:ring-electric-cyan/40 focus:border-electric-cyan/40 transition-all resize-none leading-relaxed"
        )}
    />
);

const Input = ({ value, onChange, placeholder }) => (
    <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
            "w-full bg-surface-1 border border-surface-3 rounded-xl px-3 py-2.5 text-sm text-ghost-white placeholder:text-muted/50",
            "focus:outline-none focus:ring-2 focus:ring-electric-cyan/40 focus:border-electric-cyan/40 transition-all"
        )}
    />
);

// ─── Phase Step Forms ────────────────────────────────────────────────────────

const StepTask = ({ state, update }) => (
    <div className="space-y-4">
        <div>
            <Label>¿Qué quieres conseguir con la IA?</Label>
            <Textarea
                value={state.task}
                onChange={v => update({ task: v })}
                placeholder="Describe tu tarea en 1-2 frases... Ej: Analiza este contrato de alquiler y encuentra cláusulas abusivas"
                rows={3}
            />
            <HelpText>Sé específico. Cuanto más claro el objetivo, mejor será el prompt generado.</HelpText>
        </div>

        <div>
            <p className="text-xs font-mono text-muted uppercase tracking-wider mb-3">O usa una plantilla rápida</p>
            <div className="grid grid-cols-2 gap-2">
                {quickTemplates.map(t => (
                    <motion.button
                        key={t.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => update({ task: t.defaults.task, ...t.defaults })}
                        className="bg-surface-1 border border-surface-3 rounded-xl p-3 text-left hover:border-electric-cyan/30 transition-all group"
                    >
                        <span className="text-lg">{t.icon}</span>
                        <p className="text-sm font-semibold text-ghost-white/90 mt-1 group-hover:text-electric-cyan transition-colors">{t.label}</p>
                        <p className="text-[11px] text-muted mt-0.5">{t.desc}</p>
                    </motion.button>
                ))}
            </div>
        </div>
    </div>
);

const StepC = ({ state, update }) => {
    const C = state.C;
    const set = (patch) => update({ C: { ...C, ...patch } });
    return (
        <div className="space-y-4">
            <Toggle
                checked={C.hasContext}
                onChange={v => set({ hasContext: v })}
                label="¿Tienes documentos o datos que quieres que la IA use?"
                desc="Activa esto si vas a aportar texto, datos o fragmentos de un documento."
            />
            <AnimatePresence>
                {C.hasContext && (
                    <motion.div {...fadeUp} className="space-y-2">
                        <Label>Pega aquí la información relevante</Label>
                        <Textarea
                            value={C.contextText}
                            onChange={v => set({ contextText: v })}
                            placeholder="Pega el texto del documento, tabla de datos, fragmento relevante..."
                            rows={5}
                        />
                        <HelpText>Poda antes de pegar: elimina firmas, saludos e información irrelevante. Solo la señal útil.</HelpText>
                    </motion.div>
                )}
            </AnimatePresence>
            <Toggle
                checked={C.needsFresh}
                onChange={v => set({ needsFresh: v })}
                label="¿El tema requiere información actualizada?"
                desc="Si preguntas sobre noticias, precios o legislación reciente, activa la búsqueda web obligatoria."
            />
        </div>
    );
};

const StepO = ({ state, update }) => {
    const O = state.O;
    const set = (patch) => update({ O: { ...O, ...patch } });

    // Check if the current value matches a predefined profile
    const expertIsCustom = O.speakerType === 'expert' && O.expertise && !expertProfiles.some(p => p.value === O.expertise);
    const archetypeIsCustom = O.speakerType === 'archetype' && O.archetype && !archetypeProfiles.some(p => p.value === O.archetype);

    return (
        <div className="space-y-4">
            <div>
                <Label>¿Quién habla?</Label>
                <div className="space-y-2">
                    {speakerOptions.map(o => (
                        <label
                            key={o.value}
                            className={cn(
                                "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all",
                                O.speakerType === o.value
                                    ? "border-neon-magenta/40 bg-neon-magenta/5"
                                    : "border-surface-3 bg-surface-1 hover:border-surface-3/80"
                            )}
                        >
                            <input
                                type="radio"
                                name="speaker"
                                value={o.value}
                                checked={O.speakerType === o.value}
                                onChange={() => set({ speakerType: o.value, expertise: '', archetype: '' })}
                                className="sr-only"
                            />
                            <div className={cn(
                                "w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center",
                                O.speakerType === o.value ? "border-neon-magenta" : "border-surface-3"
                            )}>
                                {O.speakerType === o.value && <div className="w-2 h-2 rounded-full bg-neon-magenta" />}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-ghost-white/90">{o.label}</p>
                                <p className="text-xs text-muted">{o.desc}</p>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {O.speakerType === 'expert' && (
                    <motion.div key="expert" {...fadeInOut} className="space-y-3">
                        <div>
                            <Label>Elige un perfil profesional</Label>
                            <Select
                                value={expertIsCustom ? '' : O.expertise}
                                onChange={v => set({ expertise: v })}
                                options={expertProfiles}
                            />
                            <HelpText>Selecciona un perfil predefinido o déjalo en blanco para escribir uno propio.</HelpText>
                        </div>
                        {(O.expertise === '' || expertIsCustom) && (
                            <motion.div {...fadeInOut}>
                                <Label className="text-xs">O describe tu propio perfil</Label>
                                <Input
                                    value={expertIsCustom ? O.expertise : ''}
                                    onChange={v => set({ expertise: v })}
                                    placeholder="Ej: Abogado laboralista con 15 años de experiencia"
                                />
                            </motion.div>
                        )}
                    </motion.div>
                )}
                {O.speakerType === 'archetype' && (
                    <motion.div key="archetype" {...fadeInOut} className="space-y-3">
                        <div>
                            <Label>Elige un arquetipo famoso</Label>
                            <Select
                                value={archetypeIsCustom ? '' : (O.archetype || '')}
                                onChange={v => set({ archetype: v })}
                                options={archetypeProfiles}
                            />
                            <HelpText>Cada arquetipo activa un "clúster cognitivo" diferente en el modelo.</HelpText>
                        </div>
                        {((O.archetype || '') === '' || archetypeIsCustom) && (
                            <motion.div {...fadeInOut}>
                                <Label className="text-xs">O escribe tu propio referente</Label>
                                <Input
                                    value={archetypeIsCustom ? O.archetype : ''}
                                    onChange={v => set({ archetype: v })}
                                    placeholder="Ej: Steve Jobs, Sherlock Holmes, Gordon Ramsay..."
                                />
                            </motion.div>
                        )}
                    </motion.div>
                )}
                {O.speakerType === 'domain' && (
                    <motion.div key="domain" {...fadeInOut}>
                        <Label>Dominio técnico</Label>
                        <Input value={O.expertise} onChange={v => set({ expertise: v })} placeholder="Ej: Optimización de bases de datos PostgreSQL" />
                    </motion.div>
                )}
            </AnimatePresence>

            <div>
                <Label>¿A quién se dirige?</Label>
                <Select value={O.audience} onChange={v => set({ audience: v })} options={audienceOptions} />
            </div>
            <div>
                <Label>¿Cuál es la intención?</Label>
                <Select value={O.intent} onChange={v => set({ intent: v })} options={intentOptions} />
            </div>
        </div>
    );
};

const StepN = ({ state, update }) => {
    const N = state.N;
    const set = (patch) => update({ N: { ...N, ...patch } });
    return (
        <div className="space-y-2">
            <p className="text-xs text-muted mb-3">Selecciona las restricciones que quieres aplicar al modelo:</p>
            {normsCheckboxes.map(n => (
                <label
                    key={n.key}
                    className={cn(
                        "flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all",
                        N[n.key]
                            ? "border-red-glow/30 bg-red-glow/5"
                            : "border-surface-3 bg-surface-1 hover:border-surface-3/80"
                    )}
                >
                    <input
                        type="checkbox"
                        checked={N[n.key]}
                        onChange={e => set({ [n.key]: e.target.checked })}
                        className="sr-only"
                    />
                    <div className={cn(
                        "w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-colors",
                        N[n.key] ? "border-red-glow bg-red-glow" : "border-surface-3"
                    )}>
                        {N[n.key] && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-ghost-white/90">{n.label}</p>
                        <p className="text-xs text-muted mt-0.5">{n.desc}</p>
                    </div>
                </label>
            ))}
        </div>
    );
};

const StepT = ({ state, update }) => {
    const T = state.T;
    const set = (patch) => update({ T: { ...T, ...patch } });
    return (
        <div className="space-y-4">
            <div>
                <Label>Nivel de razonamiento</Label>
                <div className="space-y-2">
                    {reasoningLevels.map(l => (
                        <label
                            key={l.value}
                            className={cn(
                                "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all",
                                T.level === l.value
                                    ? "border-amber-glow/40 bg-amber-glow/5"
                                    : "border-surface-3 bg-surface-1 hover:border-surface-3/80"
                            )}
                        >
                            <input
                                type="radio"
                                name="reasoning"
                                value={l.value}
                                checked={T.level === l.value}
                                onChange={() => set({ level: l.value })}
                                className="sr-only"
                            />
                            <span className="text-lg">{l.emoji}</span>
                            <div>
                                <p className="text-sm font-medium text-ghost-white/90">{l.label}</p>
                                <p className="text-xs text-muted">{l.desc}</p>
                            </div>
                        </label>
                    ))}
                </div>
            </div>
            <AnimatePresence>
                {T.level === 'protocol' && (
                    <motion.div {...fadeUp}>
                        <Label>Define las fases obligatorias</Label>
                        <Textarea
                            value={T.customSteps}
                            onChange={v => set({ customSteps: v })}
                            placeholder={"1) Observa los datos\n2) Desglosa el problema\n3) Ejecuta la resolución\n4) Revisa coherencia\n5) Conclusión"}
                            rows={5}
                        />
                        <HelpText>Un paso por línea. El modelo seguirá estas fases en orden estricto.</HelpText>
                    </motion.div>
                )}
            </AnimatePresence>
            <Toggle
                checked={T.autocheck}
                onChange={v => set({ autocheck: v })}
                label="Autochequeo lógico"
                desc="El modelo revisa sus supuestos y coherencia antes de concluir."
            />
        </div>
    );
};

const StepR = ({ state, update }) => {
    const R = state.R;
    const set = (patch) => update({ R: { ...R, ...patch } });
    return (
        <div className="space-y-4">
            <Toggle
                checked={R.critical}
                onChange={v => set({ critical: v })}
                label="¿El resultado es crítico? (legal, médico, financiero)"
                desc="Activa protocolos anti-sicofancia, humildad epistémica y el Modo Andrew (perspectiva de tercera persona)."
            />
            <Toggle
                checked={R.ignoreOpinions}
                onChange={v => set({ ignoreOpinions: v })}
                label="¿Quieres que ignore tus opiniones previas?"
                desc="La IA priorizará los hechos sobre cualquier sesgo u opinión que incluyas en tu pregunta."
            />
            {R.critical && (
                <motion.div {...fadeUp} className="bg-emerald-glow/5 border border-emerald-glow/20 rounded-xl p-3">
                    <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-emerald-glow flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-emerald-glow/80 leading-relaxed">
                            <strong>Recomendación:</strong> Para resultados críticos, considera usar la <em>Auditoría Cruzada</em>: pega la respuesta en un modelo rival (Claude, Gemini) y pídele que busque fallos.
                        </p>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

const StepO2 = ({ state, update }) => {
    const O2 = state.O2;
    const set = (patch) => update({ O2: { ...O2, ...patch } });
    return (
        <div className="space-y-4">
            <div>
                <Label>Formato de la respuesta</Label>
                <div className="grid grid-cols-2 gap-2">
                    {formatOptions.map(o => (
                        <label
                            key={o.value}
                            className={cn(
                                "flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all text-sm",
                                O2.format === o.value
                                    ? "border-blue-400/40 bg-blue-400/5 text-blue-400"
                                    : "border-surface-3 bg-surface-1 text-ghost-white/70 hover:border-surface-3/80"
                            )}
                        >
                            <input type="radio" name="format" value={o.value} checked={O2.format === o.value} onChange={() => set({ format: o.value })} className="sr-only" />
                            {o.label}
                        </label>
                    ))}
                </div>
            </div>
            <div>
                <Label>Organización</Label>
                <Select value={O2.organization} onChange={v => set({ organization: v })} options={organizationOptions} />
            </div>
            <div>
                <Label>Extensión</Label>
                <div className="flex gap-2">
                    {lengthOptions.map(o => (
                        <button
                            key={o.value}
                            onClick={() => set({ length: o.value })}
                            className={cn(
                                "flex-1 py-2 px-3 rounded-xl text-xs font-medium border transition-all",
                                O2.length === o.value
                                    ? "border-blue-400/40 bg-blue-400/10 text-blue-400"
                                    : "border-surface-3 bg-surface-1 text-muted hover:border-surface-3/80"
                            )}
                        >
                            {o.label}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <Label>Tono</Label>
                <Select value={O2.tone} onChange={v => set({ tone: v })} options={toneOptions} />
            </div>
        </div>
    );
};

const StepL = ({ state, update }) => {
    const L = state.L;
    const set = (patch) => update({ L: { ...L, ...patch } });
    return (
        <div className="space-y-4">
            <Toggle
                checked={L.selfReview}
                onChange={v => set({ selfReview: v })}
                label="Auto-revisión antes de entregar"
                desc="El modelo revisa su propia respuesta buscando errores antes de mostrártela."
            />
            <Toggle
                checked={L.showRisks}
                onChange={v => set({ showRisks: v })}
                label="Mostrar riesgos y puntos de verificación"
                desc="Al final, la IA indica 3 puntos donde podría haberse equivocado y qué deberías comprobar."
            />
        </div>
    );
};

const STEP_COMPONENTS = [StepTask, StepC, StepO, StepN, StepT, StepR, StepO2, StepL];
const STEP_LABELS = ['Tarea', 'C', 'O', 'N', 'T', 'R', 'O₂', 'L'];
const STEP_TITLES = [
    'Define tu tarea',
    'Contexto Curado',
    'Omni-Rol',
    'Normas y Negativas',
    'Tutela del Razonamiento',
    'Realidad y Resistencia',
    'Output y Organización',
    'Loop de Mejora',
];

// ─── Stepper ─────────────────────────────────────────────────────────────────

const Stepper = ({ step, setStep, totalSteps, skipped }) => (
    <div className="flex items-center justify-center gap-1 mb-6">
        {STEP_LABELS.map((label, i) => {
            const isActive = i === step;
            const isPast = i < step;
            const isSkippable = i > 0 && skipped.has(PHASE_KEYS[i - 1]);
            const phaseKey = i > 0 ? PHASE_KEYS[i - 1] : null;
            const colors = phaseKey ? phasesMeta[phaseKey]?.colorClasses : null;

            return (
                <button
                    key={i}
                    onClick={() => setStep(i)}
                    className={cn(
                        "relative flex items-center justify-center rounded-lg text-xs font-bold transition-all duration-200",
                        i === 0 ? "w-12 h-9" : "w-9 h-9",
                        isActive
                            ? cn("scale-110", colors?.bg || "bg-electric-cyan/10", colors?.text || "text-electric-cyan", "ring-2", colors?.ring || "ring-electric-cyan/40")
                            : isPast
                                ? "bg-surface-2 text-ghost-white/60"
                                : "bg-surface-1 text-muted/40",
                        isSkippable && "opacity-40",
                        "hover:scale-105 cursor-pointer"
                    )}
                >
                    {isPast && !isActive ? <Check className="w-3.5 h-3.5" /> : label}
                </button>
            );
        })}
    </div>
);

// ─── Preview Panel ───────────────────────────────────────────────────────────

const PreviewPanel = ({ state }) => {
    const [copied, setCopied] = useState(false);
    const [showRaw, setShowRaw] = useState(false);

    const blocks = useMemo(() => buildPromptBlocks(state), [state]);
    const fullPrompt = useMemo(() => buildPrompt(state), [state]);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(fullPrompt).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }, [fullPrompt]);

    const completedCount = blocks.length;

    return (
        <div className="bg-deep-slate border border-surface-3 rounded-2xl overflow-hidden flex flex-col h-full">
            {/* Header */}
            <div className="px-4 py-3 border-b border-surface-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <ClipboardCheck className="w-4 h-4 text-electric-cyan" />
                    <span className="text-sm font-bold text-ghost-white">Prompt Generado</span>
                    <span className="text-[10px] font-mono text-muted bg-surface-2 px-1.5 py-0.5 rounded-md">{completedCount} bloques</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowRaw(!showRaw)}
                        className="text-[10px] font-mono text-muted hover:text-ghost-white transition-colors px-2 py-1 rounded-md bg-surface-1 border border-surface-3"
                    >
                        {showRaw ? 'Vista Bloques' : 'Texto Limpio'}
                    </button>
                    <motion.button
                        whileTap={{ scale: 0.92 }}
                        onClick={handleCopy}
                        className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                            copied
                                ? "bg-emerald-glow/20 text-emerald-glow border border-emerald-glow/30"
                                : "bg-electric-cyan/10 text-electric-cyan border border-electric-cyan/30 hover:bg-electric-cyan/20"
                        )}
                    >
                        {copied ? <><Check className="w-3 h-3" /> Copiado</> : <><Copy className="w-3 h-3" /> Copiar</>}
                    </motion.button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
                {!fullPrompt.trim() ? (
                    <div className="flex flex-col items-center justify-center h-40 text-center">
                        <Sparkles className="w-8 h-8 text-muted/20 mb-3" />
                        <p className="text-sm text-muted">Tu prompt aparecerá aquí mientras completes cada fase</p>
                    </div>
                ) : showRaw ? (
                    <pre className="text-xs text-ghost-white/80 whitespace-pre-wrap font-mono leading-relaxed bg-surface-1 rounded-xl p-4 border border-surface-3">
                        {fullPrompt}
                    </pre>
                ) : (
                    blocks.map((block, i) => {
                        const meta = phasesMeta[block.key];
                        const colors = meta?.colorClasses || {};
                        return (
                            <motion.div
                                key={block.key}
                                initial={{ opacity: 0, x: 8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className={cn("rounded-xl border p-3", colors.border || "border-surface-3", colors.bg || "bg-surface-1")}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={cn("text-xs font-black", colors.text || "text-muted")}>{meta?.letter || block.key}</span>
                                    <span className="text-[10px] font-mono text-muted uppercase tracking-wider">{block.label}</span>
                                </div>
                                <pre className="text-xs text-ghost-white/80 whitespace-pre-wrap font-mono leading-relaxed">{block.text}</pre>
                            </motion.div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

// ─── Main Wizard ─────────────────────────────────────────────────────────────

const ControlWizard = () => {
    const [step, setStep] = useState(0);
    const [state, setState] = useState({ ...defaultWizardState });
    const [skipped, setSkipped] = useState(new Set());

    const totalSteps = STEP_COMPONENTS.length;

    const update = useCallback((patch) => {
        setState(prev => ({ ...prev, ...patch }));
    }, []);

    const handleNext = () => setStep(s => Math.min(s + 1, totalSteps - 1));
    const handlePrev = () => setStep(s => Math.max(s - 1, 0));
    const handleSkip = () => {
        if (step > 0) {
            const phaseKey = PHASE_KEYS[step - 1];
            setSkipped(prev => new Set([...prev, phaseKey]));
        }
        handleNext();
    };
    const handleReset = () => {
        setState({ ...defaultWizardState });
        setSkipped(new Set());
        setStep(0);
    };

    const CurrentForm = STEP_COMPONENTS[step];
    const currentPhaseKey = step > 0 ? PHASE_KEYS[step - 1] : null;
    const currentMeta = currentPhaseKey ? phasesMeta[currentPhaseKey] : null;
    const currentColors = currentMeta?.colorClasses || {};

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-electric-cyan/10 border border-electric-cyan/20 text-electric-cyan text-xs font-mono mb-4">
                    <Zap className="w-3 h-3" />
                    CONSTRUCTOR DE PROMPTS
                </div>
                <h1 className="text-2xl font-black text-ghost-white">
                    Wizard <span className="bg-gradient-to-r from-electric-cyan via-neon-magenta to-violet-400 bg-clip-text text-transparent">C.O.N.T.R.O.L.</span>
                </h1>
                <p className="text-muted text-sm mt-1 max-w-md mx-auto">Construye prompts potentes paso a paso sin necesidad de experiencia.</p>
            </motion.div>

            {/* Stepper */}
            <Stepper step={step} setStep={setStep} totalSteps={totalSteps} skipped={skipped} />

            {/* Main layout: form + preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Form panel */}
                <div className="bg-deep-slate border border-surface-3 rounded-2xl overflow-hidden">
                    {/* Step header */}
                    <div className={cn("px-5 py-3 border-b flex items-center gap-3", currentColors.border || "border-surface-3")}>
                        {currentMeta ? (
                            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black", currentColors.bg, currentColors.text)}>
                                {currentMeta.letter}
                            </div>
                        ) : (
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-electric-cyan/10">
                                <Sparkles className="w-4 h-4 text-electric-cyan" />
                            </div>
                        )}
                        <div>
                            <h2 className={cn("text-sm font-bold", currentColors.text || "text-ghost-white")}>{STEP_TITLES[step]}</h2>
                            {currentMeta && (
                                <p className="text-[10px] font-mono text-muted uppercase tracking-wider">{currentMeta.subtitle}</p>
                            )}
                        </div>
                        <span className="ml-auto text-[10px] font-mono text-muted tabular-nums">{step + 1}/{totalSteps}</span>
                    </div>

                    {/* Tooltip / tip */}
                    {currentMeta && (
                        <div className={cn("mx-5 mt-4 p-3 rounded-xl border flex items-start gap-2", currentColors.bg, currentColors.border)}>
                            <Info className={cn("w-4 h-4 flex-shrink-0 mt-0.5", currentColors.text)} />
                            <p className="text-xs text-ghost-white/70 leading-relaxed">{currentMeta.tip}</p>
                        </div>
                    )}

                    {/* Form content */}
                    <div className="p-5">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                <CurrentForm state={state} update={update} />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation */}
                    <div className="px-5 py-4 border-t border-surface-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handlePrev}
                                disabled={step === 0}
                                className={cn(
                                    "flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all",
                                    step === 0 ? "text-muted/30 cursor-not-allowed" : "text-muted hover:text-ghost-white bg-surface-1 border border-surface-3 hover:border-surface-3/80"
                                )}
                            >
                                <ChevronLeft className="w-3.5 h-3.5" /> Anterior
                            </button>
                            <button
                                onClick={handleReset}
                                className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-muted hover:text-red-glow bg-surface-1 border border-surface-3 transition-all"
                            >
                                <RotateCcw className="w-3 h-3" /> Reiniciar
                            </button>
                        </div>

                        <div className="flex items-center gap-2">
                            {step > 0 && step < totalSteps - 1 && (
                                <button
                                    onClick={handleSkip}
                                    className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-muted hover:text-ghost-white bg-surface-1 border border-surface-3 transition-all"
                                >
                                    <SkipForward className="w-3 h-3" /> Omitir
                                </button>
                            )}
                            {step < totalSteps - 1 ? (
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleNext}
                                    className={cn(
                                        "flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all",
                                        currentColors.bg || "bg-electric-cyan/10",
                                        currentColors.text || "text-electric-cyan",
                                        "border", currentColors.border || "border-electric-cyan/30",
                                        "hover:scale-105"
                                    )}
                                >
                                    Siguiente <ChevronRight className="w-3.5 h-3.5" />
                                </motion.button>
                            ) : (
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        const prompt = buildPrompt(state);
                                        navigator.clipboard.writeText(prompt);
                                    }}
                                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-glow/10 text-emerald-glow border border-emerald-glow/30 hover:scale-105 transition-all"
                                >
                                    <Copy className="w-3.5 h-3.5" /> Copiar Prompt Final
                                </motion.button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Preview panel */}
                <div className="lg:sticky lg:top-24 lg:self-start">
                    <PreviewPanel state={state} />
                </div>
            </div>
        </div>
    );
};

export default ControlWizard;
