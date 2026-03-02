// ─── Wizard C.O.N.T.R.O.L. — Data & Prompt Builder ──────────────────────────

export const PHASE_KEYS = ['C', 'O', 'N', 'T', 'R', 'O2', 'L'];

export const phasesMeta = {
    C: {
        letter: 'C',
        title: 'Contexto Curado',
        subtitle: 'Señal sin ruido',
        color: 'electric-cyan',
        colorClasses: {
            text: 'text-electric-cyan',
            bg: 'bg-electric-cyan/10',
            border: 'border-electric-cyan/30',
            ring: 'ring-electric-cyan/40',
            glow: 'shadow-[0_0_20px_rgba(0,229,255,0.12)]',
        },
        tip: 'Esta fase inyecta información limpia y evita que el modelo alucine por falta de datos.',
    },
    O: {
        letter: 'O',
        title: 'Omni-Rol',
        subtitle: 'Ingeniería de identidad',
        color: 'neon-magenta',
        colorClasses: {
            text: 'text-neon-magenta',
            bg: 'bg-neon-magenta/10',
            border: 'border-neon-magenta/30',
            ring: 'ring-neon-magenta/40',
            glow: 'shadow-[0_0_20px_rgba(224,64,251,0.12)]',
        },
        tip: 'Ancla al modelo en un subespacio de conocimiento experto: quién habla, a quién, para qué.',
    },
    N: {
        letter: 'N',
        title: 'Normas y Negativas',
        subtitle: 'Muro de contención',
        color: 'red-glow',
        colorClasses: {
            text: 'text-red-glow',
            bg: 'bg-red-glow/10',
            border: 'border-red-glow/30',
            ring: 'ring-red-glow/40',
            glow: 'shadow-[0_0_20px_rgba(248,113,113,0.12)]',
        },
        tip: 'Restringe la inventiva incontrolable del modelo con prohibiciones explícitas.',
    },
    T: {
        letter: 'T',
        title: 'Tutela del Razonamiento',
        subtitle: 'Motor cognitivo',
        color: 'amber-glow',
        colorClasses: {
            text: 'text-amber-glow',
            bg: 'bg-amber-glow/10',
            border: 'border-amber-glow/30',
            ring: 'ring-amber-glow/40',
            glow: 'shadow-[0_0_20px_rgba(251,191,36,0.12)]',
        },
        tip: 'Controla la profundidad y estrategia del pensamiento para evitar atajos cognitivos.',
    },
    R: {
        letter: 'R',
        title: 'Realidad y Resistencia',
        subtitle: 'Protocolos de verdad',
        color: 'emerald-glow',
        colorClasses: {
            text: 'text-emerald-glow',
            bg: 'bg-emerald-glow/10',
            border: 'border-emerald-glow/30',
            ring: 'ring-emerald-glow/40',
            glow: 'shadow-[0_0_20px_rgba(52,211,153,0.12)]',
        },
        tip: 'Endurece la "columna vertebral" lógica del modelo contra la sicofancia y las alucinaciones.',
    },
    O2: {
        letter: 'O₂',
        title: 'Output y Organización',
        subtitle: 'Diseña la respuesta',
        color: 'blue-400',
        colorClasses: {
            text: 'text-blue-400',
            bg: 'bg-blue-400/10',
            border: 'border-blue-400/30',
            ring: 'ring-blue-400/40',
            glow: 'shadow-[0_0_20px_rgba(96,165,250,0.12)]',
        },
        tip: 'Define el formato, orden y extensión de la respuesta para que sea directamente usable.',
    },
    L: {
        letter: 'L',
        title: 'Loop de Mejora',
        subtitle: 'Revisa y perfecciona',
        color: 'violet-400',
        colorClasses: {
            text: 'text-violet-400',
            bg: 'bg-violet-400/10',
            border: 'border-violet-400/30',
            ring: 'ring-violet-400/40',
            glow: 'shadow-[0_0_20px_rgba(167,139,250,0.12)]',
        },
        tip: 'La primera respuesta es un borrador. Añade instrucciones de auto-revisión y mejora continua.',
    },
};

// ─── Quick-start templates ───────────────────────────────────────────────────

export const quickTemplates = [
    {
        id: 'analyze',
        icon: '📄',
        label: 'Analizar documento',
        desc: 'Extrae conclusiones de un texto adjunto',
        defaults: {
            task: 'Analiza el siguiente documento y extrae las conclusiones clave.',
            C: { hasContext: true, contextText: '', needsFresh: false },
            O: { speakerType: 'expert', expertise: 'Analista Senior', audience: 'professional', intent: 'inform' },
            N: { antiSyco: true, antiHallucination: true, cleanFormat: true, antiCitation: false, uncertainty: true, antiOverrefusal: false, forceBrowse: false },
            T: { level: 'free', autocheck: true, customSteps: '' },
            R: { critical: false, ignoreOpinions: false },
            O2: { format: 'list', organization: 'summary-first', length: 'medium', tone: 'professional' },
            L: { selfReview: true, showRisks: false },
        },
    },
    {
        id: 'create',
        icon: '💡',
        label: 'Crear contenido',
        desc: 'Genera textos creativos o informativos',
        defaults: {
            task: 'Crea contenido sobre el siguiente tema.',
            C: { hasContext: false, contextText: '', needsFresh: false },
            O: { speakerType: 'archetype', expertise: '', archetype: '', audience: 'beginner', intent: 'create' },
            N: { antiSyco: false, antiHallucination: false, cleanFormat: true, antiCitation: false, uncertainty: false, antiOverrefusal: false, forceBrowse: false },
            T: { level: 'free', autocheck: false, customSteps: '' },
            R: { critical: false, ignoreOpinions: false },
            O2: { format: 'text', organization: 'step-by-step', length: 'long', tone: 'friendly' },
            L: { selfReview: false, showRisks: false },
        },
    },
    {
        id: 'technical',
        icon: '🛠️',
        label: 'Resolver problema técnico',
        desc: 'Código, debugging, arquitectura',
        defaults: {
            task: 'Resuelve el siguiente problema técnico.',
            C: { hasContext: true, contextText: '', needsFresh: false },
            O: { speakerType: 'domain', expertise: '', audience: 'expert', intent: 'inform' },
            N: { antiSyco: true, antiHallucination: true, cleanFormat: true, antiCitation: false, uncertainty: true, antiOverrefusal: false, forceBrowse: false },
            T: { level: 'guided', autocheck: true, customSteps: '' },
            R: { critical: false, ignoreOpinions: false },
            O2: { format: 'steps', organization: 'step-by-step', length: 'medium', tone: 'direct' },
            L: { selfReview: true, showRisks: false },
        },
    },
    {
        id: 'report',
        icon: '📊',
        label: 'Crear informe',
        desc: 'Informes, dashboards, tablas comparativas',
        defaults: {
            task: 'Genera un informe estructurado sobre el siguiente tema.',
            C: { hasContext: true, contextText: '', needsFresh: false },
            O: { speakerType: 'expert', expertise: 'Consultor Senior', audience: 'professional', intent: 'inform' },
            N: { antiSyco: true, antiHallucination: true, cleanFormat: true, antiCitation: true, uncertainty: true, antiOverrefusal: false, forceBrowse: false },
            T: { level: 'guided', autocheck: true, customSteps: '' },
            R: { critical: true, ignoreOpinions: true },
            O2: { format: 'table', organization: 'summary-first', length: 'long', tone: 'professional' },
            L: { selfReview: true, showRisks: true },
        },
    },
];

// ─── Default state for a fresh wizard ────────────────────────────────────────

export const defaultWizardState = {
    task: '',
    C: { hasContext: false, contextText: '', needsFresh: false },
    O: { speakerType: 'expert', expertise: '', archetype: '', audience: 'professional', intent: 'inform' },
    N: { antiSyco: true, antiHallucination: true, cleanFormat: true, antiCitation: false, uncertainty: true, antiOverrefusal: false, forceBrowse: false },
    T: { level: 'free', autocheck: true, customSteps: '' },
    R: { critical: false, ignoreOpinions: false },
    O2: { format: 'list', organization: 'summary-first', length: 'medium', tone: 'professional' },
    L: { selfReview: true, showRisks: false },
};

// ─── Options for selects ─────────────────────────────────────────────────────

export const speakerOptions = [
    { value: 'expert', label: 'Profesional específico', desc: 'Define ocupación y conocimientos' },
    { value: 'archetype', label: 'Personaje famoso (arquetipo)', desc: 'Usa un referente cultural conocido' },
    { value: 'domain', label: 'Sin personalidad (Domain Priming)', desc: 'Solo dominio técnico, cero teatro' },
];

// Perfiles predefinidos para "Profesional específico"
export const expertProfiles = [
    { value: '', label: '— Elige un perfil o escribe uno propio —' },
    { value: 'Arquitecto/a de Software Senior con 15 años de experiencia en sistemas distribuidos', label: 'Arquitecto/a de Software Senior' },
    { value: 'Médico/a Internista con especialidad en diagnóstico diferencial', label: 'Médico/a Internista' },
    { value: 'Abogado/a Laboralista con experiencia en convenios colectivos y despidos', label: 'Abogado/a Laboralista' },
    { value: 'Director/a Financiero/a (CFO) con experiencia en startups y restructuraciones', label: 'Director/a Financiero/a (CFO)' },
    { value: 'Ingeniero/a de Ciberseguridad especialista en pentesting y Zero Trust', label: 'Ingeniero/a de Ciberseguridad' },
    { value: 'Profesor/a Universitario/a de Física con experiencia en divulgación científica', label: 'Profesor/a Universitario/a de Física' },
    { value: 'Periodista de Investigación con 20 años en verificación de hechos (fact-checking)', label: 'Periodista de Investigación' },
    { value: 'Director/a de Marketing Digital especialista en growth hacking y analítica', label: 'Director/a de Marketing Digital' },
    { value: 'Psicólogo/a Clínico/a especialista en terapia cognitivo-conductual', label: 'Psicólogo/a Clínico/a' },
    { value: 'Ingeniero/a de Datos Senior experto en pipelines ETL y arquitectura de datos', label: 'Ingeniero/a de Datos Senior' },
    { value: 'Economista especialista en macroeconomía y política monetaria', label: 'Economista Macro' },
    { value: 'Diseñador/a UX/UI Senior con enfoque en accesibilidad y design systems', label: 'Diseñador/a UX/UI Senior' },
    { value: 'Chef Ejecutivo/a con estrella Michelin, experto en gastronomía creativa', label: 'Chef Ejecutivo/a' },
    { value: 'Funcionario/a de Administración Pública especialista en contratación y licitaciones', label: 'Funcionario/a de Administración Pública' },
    { value: 'Director/a de Recursos Humanos con experiencia en gestión del talento y cultura organizacional', label: 'Director/a de RRHH' },
    { value: 'Historiador/a especialista en historia contemporánea y análisis geopolítico', label: 'Historiador/a Contemporáneo/a' },
    { value: 'Product Manager Senior con experiencia en metodologías ágiles y descubrimiento de producto', label: 'Product Manager Senior' },
    { value: 'Consultor/a de Estrategia Empresarial (ex-McKinsey/BCG) con foco en transformación digital', label: 'Consultor/a de Estrategia' },
    { value: 'Científico/a de Datos especialista en Machine Learning e interpretabilidad de modelos', label: 'Científico/a de Datos (ML)' },
    { value: 'Arquitecto/a urbanista con experiencia en ciudades sostenibles y movilidad', label: 'Arquitecto/a Urbanista' },
];

// Perfiles predefinidos para "Personaje famoso (arquetipo)"
export const archetypeProfiles = [
    { value: '', label: '— Elige un arquetipo o escribe uno propio —' },
    { value: 'Steve Jobs presentando el iPhone en 2007', label: 'Steve Jobs — Visionario minimalista' },
    { value: 'Sherlock Holmes analizando una escena del crimen', label: 'Sherlock Holmes — Deducción lógica' },
    { value: 'Gordon Ramsay evaluando un restaurante en Kitchen Nightmares', label: 'Gordon Ramsay — Crítica brutal' },
    { value: 'Marie Curie en su laboratorio de investigación', label: 'Marie Curie — Rigor científico' },
    { value: 'Sócrates haciendo preguntas incómodas en el ágora', label: 'Sócrates — Método socrático' },
    { value: 'Sun Tzu planificando una campaña militar', label: 'Sun Tzu — Estrategia y táctica' },
    { value: 'Leonardo da Vinci diseñando una máquina renacentista', label: 'Da Vinci — Genio polímata' },
    { value: 'Warren Buffett analizando una oportunidad de inversión a largo plazo', label: 'Warren Buffett — Inversión racional' },
    { value: 'Frida Kahlo creando una obra que desafía convenciones', label: 'Frida Kahlo — Arte e identidad' },
    { value: 'Carl Sagan explicando el cosmos a millones de personas', label: 'Carl Sagan — Divulgación magistral' },
    { value: 'Ada Lovelace diseñando el primer algoritmo de la historia', label: 'Ada Lovelace — Pensamiento computacional' },
    { value: 'Miyamoto Musashi escribiendo El Libro de los Cinco Anillos', label: 'Musashi — Disciplina y maestría' },
    { value: 'Coco Chanel revolucionando la moda con simplicidad radical', label: 'Coco Chanel — Elegancia disruptiva' },
    { value: 'Richard Feynman explicando física cuántica en una pizarra', label: 'Richard Feynman — Claridad pedagógica' },
    { value: 'Machiavelo asesorando a un príncipe sobre poder y política', label: 'Maquiavelo — Pragmatismo político' },
    { value: 'Nikola Tesla imaginando la transmisión inalámbrica de energía', label: 'Nikola Tesla — Innovación visionaria' },
    { value: 'Jane Austen observando y narrando la sociedad con ironía sutil', label: 'Jane Austen — Ironía narrativa' },
    { value: 'Elon Musk proponiendo un plan imposible con plazo agresivo', label: 'Elon Musk — Ambición audaz' },
    { value: 'Marco Aurelio reflexionando en sus meditaciones estoicas', label: 'Marco Aurelio — Estoicismo práctico' },
];

export const audienceOptions = [
    { value: 'expert', label: 'Otro experto del sector' },
    { value: 'professional', label: 'Profesional no técnico' },
    { value: 'beginner', label: 'Principiante / novato' },
    { value: 'child', label: 'Niño / adolescente' },
];

export const intentOptions = [
    { value: 'inform', label: 'Informar / Explicar' },
    { value: 'persuade', label: 'Persuadir / Vender' },
    { value: 'teach', label: 'Enseñar / Formar' },
    { value: 'audit', label: 'Auditar / Criticar' },
    { value: 'create', label: 'Crear / Idear' },
];

export const formatOptions = [
    { value: 'list', label: '📋 Lista con viñetas' },
    { value: 'table', label: '📊 Tabla comparativa' },
    { value: 'text', label: '📝 Texto continuo' },
    { value: 'email', label: '✉️ Email listo para enviar' },
    { value: 'steps', label: '🔢 Pasos numerados' },
    { value: 'schema', label: '🗂️ Esquema jerárquico' },
    { value: 'dashboard', label: '📈 Dashboard HTML' },
];

export const organizationOptions = [
    { value: 'summary-first', label: 'Resumen primero, detalle después' },
    { value: 'step-by-step', label: 'Paso a paso' },
    { value: 'by-importance', label: 'De más a menos importante' },
];

export const lengthOptions = [
    { value: 'short', label: 'Breve (máx. 5-7 líneas)' },
    { value: 'medium', label: 'Medio (1-2 párrafos)' },
    { value: 'long', label: 'Extenso (sin límite estricto)' },
];

export const toneOptions = [
    { value: 'professional', label: 'Profesional' },
    { value: 'friendly', label: 'Cercano y amigable' },
    { value: 'academic', label: 'Académico' },
    { value: 'direct', label: 'Directo y conciso' },
];

export const reasoningLevels = [
    { value: 'free', label: 'Libre', emoji: '🟢', desc: 'El modelo elige su propia ruta lógica' },
    { value: 'guided', label: 'Guiado', emoji: '🟡', desc: 'Descompón, compara alternativas y revisa' },
    { value: 'protocol', label: 'Protocolo', emoji: '🔴', desc: 'Sigue fases obligatorias en orden estricto' },
];

// ─── Normas checkboxes data ──────────────────────────────────────────────────

export const normsCheckboxes = [
    { key: 'antiSyco', label: 'Anti-sicofancia', desc: 'Prioriza la verdad sobre la cortesía. Corrige mis errores.' },
    { key: 'antiHallucination', label: 'Anti-alucinación', desc: 'Si no lo sabes, di "NO CONSTA". No inventes datos.' },
    { key: 'antiCitation', label: 'Anti-fabricación de citas', desc: 'Verifica toda referencia o indica cómo comprobarla.' },
    { key: 'cleanFormat', label: 'Formato limpio (No Yapping)', desc: 'Sin introducciones ("Claro, aquí tienes...") ni despedidas.' },
    { key: 'uncertainty', label: 'Gestión de incertidumbre', desc: 'Si algo es ambiguo, pregúntame antes de adivinar.' },
    { key: 'antiOverrefusal', label: 'Anti-sobre-rechazo', desc: 'Contexto académico/formativo. No rechaces la consulta.' },
    { key: 'forceBrowse', label: 'Búsqueda web obligatoria', desc: 'Para datos actuales, busca en la web. No confíes en tu memoria.' },
];


// ─── Prompt Builder ──────────────────────────────────────────────────────────

function buildTaskBlock(state) {
    if (!state.task) return '';
    return `**TAREA:** ${state.task}`;
}

function buildContextBlock(state) {
    const { C } = state;
    const parts = [];

    if (C.hasContext && C.contextText.trim()) {
        parts.push(`**CONTEXTO:**\n"""\n${C.contextText.trim()}\n"""\nResponde basándote exclusivamente en el contexto proporcionado. Si la respuesta no está en el texto, di "No tengo información".`);
    } else if (C.hasContext) {
        parts.push(`**CONTEXTO:** [Pega aquí tu documento o datos]\nResponde basándote exclusivamente en el contexto proporcionado.`);
    }

    if (C.needsFresh) {
        parts.push(`Para datos actuales o recientes, usa la herramienta de búsqueda web. PROHIBIDO responder sobre actualidad desde tu memoria interna.`);
    }

    return parts.length ? parts.join('\n') : '';
}

function buildRoleBlock(state) {
    const { O } = state;
    const parts = [];

    if (O.speakerType === 'expert') {
        const role = O.expertise.trim() || 'experto en la materia';
        const audienceLabel = audienceOptions.find(a => a.value === O.audience)?.label || '';
        const intentLabel = intentOptions.find(i => i.value === O.intent)?.label || '';
        parts.push(`Actúa como un/a ${role}.`);
        if (O.audience && O.audience !== 'expert') {
            parts.push(`Tu audiencia es: ${audienceLabel}. Adapta la complejidad y el vocabulario a su nivel.`);
        }
        if (O.intent) {
            parts.push(`Tu intención es: ${intentLabel}.`);
        }
    } else if (O.speakerType === 'archetype') {
        const arch = O.archetype?.trim();
        if (arch) {
            parts.push(`Adopta la mentalidad y el estilo de pensamiento de ${arch}.`);
        }
        const audienceLabel = audienceOptions.find(a => a.value === O.audience)?.label || '';
        if (O.audience && O.audience !== 'expert') {
            parts.push(`Dirígete a: ${audienceLabel}.`);
        }
    } else if (O.speakerType === 'domain') {
        const domain = O.expertise?.trim();
        parts.push(`Contexto: ${domain || '[dominio técnico]'}. Estándar: Rigor absoluto. Sin personalidad, sin saludos, sin comentarios de cortesía. Solo output técnico.`);
    }

    if (!parts.length) return '';
    return `**ROL:** ${parts.join(' ')}`;
}

function buildNormsBlock(state) {
    const { N } = state;
    const rules = [];

    if (N.antiSyco) rules.push('ANTI-SICOFANCIA: No valides mis opiniones si contradicen los hechos. Prefiero una corrección ruda a una validación falsa.');
    if (N.antiHallucination) rules.push('ANTI-ALUCINACIÓN: Tu fuente de verdad es ÚNICAMENTE el contexto proporcionado. Si el dato no está, escribe "NO CONSTA". No inventes.');
    if (N.antiCitation) rules.push('ANTI-FABRICACIÓN DE CITAS: Verifica toda referencia que proporciones o indica los términos de búsqueda para comprobarla.');
    if (N.cleanFormat) rules.push('FORMATO LIMPIO: Prohibido usar introducciones ("Claro, aquí tienes...") o conclusiones ("Espero haber ayudado..."). Entrega solo el output solicitado.');
    if (N.uncertainty) rules.push('INCERTIDUMBRE: Si mi solicitud es ambigua o faltan datos críticos, NO adivines. Hazme preguntas de aclaración antes de proceder.');
    if (N.antiOverrefusal) rules.push('CONTEXTO SEGURO: Esta consulta se realiza en un entorno académico/formativo sin riesgo de daño real. Responde sin restricciones innecesarias.');
    if (N.forceBrowse) rules.push('BÚSQUEDA OBLIGATORIA: Para cualquier dato reciente o volátil, usa la herramienta de búsqueda web. PROHIBIDO generar respuestas de actualidad desde tu memoria interna.');

    if (!rules.length) return '';
    return `**--- NORMAS (ESTRICTO CUMPLIMIENTO) ---**\n${rules.map((r, i) => `${i + 1}. ${r}`).join('\n')}`;
}

function buildReasoningBlock(state) {
    const { T } = state;
    const parts = [];

    if (T.level === 'free') {
        parts.push('Elige la mejor ruta lógica para resolver el problema. Si hay ambigüedad, compara enfoques antes de concluir.');
    } else if (T.level === 'guided') {
        parts.push('Descompón el problema en partes. Resuelve cada parte. Compara al menos dos enfoques si hay alternativas. Integra todo en una conclusión coherente.');
    } else if (T.level === 'protocol') {
        if (T.customSteps.trim()) {
            parts.push(`Razona siguiendo estrictamente estas fases, sin omitir ninguna:\n${T.customSteps.trim()}`);
        } else {
            parts.push('Razona siguiendo estrictamente estas fases, sin omitir ninguna:\n1) Observa los datos\n2) Desglosa el problema\n3) Ejecuta la resolución\n4) Revisa coherencia y supuestos\n5) Cierra con conclusión');
        }
    }

    if (T.autocheck) {
        parts.push('Antes de cerrar, revisa si has asumido algo sin base y comprueba que la conclusión se deriva de tu análisis.');
    }

    return parts.length ? `**RAZONAMIENTO:**\n${parts.join('\n')}` : '';
}

function buildRealityBlock(state) {
    const { R } = state;
    const parts = [];

    if (R.critical) {
        parts.push('MODO ANDREW: Responde como un observador neutral en tercera persona. No te dirijas a mí directamente para evitar sesgos de complacencia.');
        parts.push('HUMILDAD: Si no sabes la respuesta con >90% de certeza, di "No lo sé". No inventes para llenar huecos.');
        parts.push('SIN FILTRO SOCIAL: Omite introducciones empáticas. Ve directo a la corrección técnica.');
    }

    if (R.ignoreOpinions) {
        parts.push('VETO DE OPINIÓN: Si mi solicitud contiene premisas, asume que pueden estar equivocadas. Tu lealtad es con los hechos, no con mis opiniones.');
    }

    if (!parts.length) return '';
    return `**PROTOCOLO DE REALIDAD:**\n${parts.map((r, i) => `${i + 1}. ${r}`).join('\n')}`;
}

function buildOutputBlock(state) {
    const { O2 } = state;
    const parts = [];

    const fmtMap = {
        list: 'lista con viñetas',
        table: 'tabla comparativa',
        text: 'texto continuo sin listas',
        email: 'email listo para enviar (con asunto, saludo y cierre)',
        steps: 'pasos numerados, uno por línea',
        schema: 'esquema jerárquico con indentación',
        dashboard: 'un único archivo HTML autocontenido con dashboard interactivo (HTML + CSS + JS)',
    };
    const orgMap = {
        'summary-first': 'Primero un resumen ejecutivo, después el desarrollo detallado',
        'step-by-step': 'Paso a paso, en orden lógico secuencial',
        'by-importance': 'De lo más importante a lo menos importante',
    };
    const lenMap = {
        short: 'Máximo 5-7 líneas. Sé extremadamente conciso.',
        medium: 'Entre 1 y 2 párrafos. Equilibra detalle y brevedad.',
        long: 'Sin límite estricto de longitud. Desarrolla en profundidad.',
    };
    const toneMap = {
        professional: 'Tono profesional y objetivo.',
        friendly: 'Tono cercano y amigable, sin perder claridad.',
        academic: 'Tono académico con rigor terminológico.',
        direct: 'Tono directo y conciso. Cero charla innecesaria.',
    };

    parts.push(`Formato de respuesta: ${fmtMap[O2.format] || O2.format}.`);
    parts.push(`Organización: ${orgMap[O2.organization] || O2.organization}.`);
    parts.push(lenMap[O2.length] || '');
    parts.push(toneMap[O2.tone] || '');

    return `**OUTPUT:**\n${parts.filter(Boolean).join('\n')}`;
}

function buildLoopBlock(state) {
    const { L } = state;
    const parts = [];

    if (L.selfReview) {
        parts.push('Antes de entregar el resultado final, revisa tu respuesta: ¿es clara, completa y sin errores? Si detectas fallos, corrígelos antes de mostrar el output.');
    }
    if (L.showRisks) {
        parts.push('Al final de tu respuesta, añade una sección "⚠️ RIESGOS Y VERIFICACIÓN" con 3 puntos donde podrías haberte equivocado y qué debería comprobar yo.');
    }

    if (!parts.length) return '';
    return `**MEJORA CONTINUA:**\n${parts.join('\n')}`;
}

/**
 * Build the full prompt string from wizard state.
 * @param {object} state — The wizard state object
 * @returns {string} — The constructed prompt
 */
export function buildPrompt(state) {
    const blocks = [
        buildTaskBlock(state),
        buildContextBlock(state),
        buildRoleBlock(state),
        buildNormsBlock(state),
        buildReasoningBlock(state),
        buildRealityBlock(state),
        buildOutputBlock(state),
        buildLoopBlock(state),
    ].filter(Boolean);

    return blocks.join('\n\n');
}

/**
 * Returns an array of { phaseKey, label, text } for each non-empty phase block.
 */
export function buildPromptBlocks(state) {
    const entries = [
        { key: 'C', label: 'Tarea y Contexto', text: [buildTaskBlock(state), buildContextBlock(state)].filter(Boolean).join('\n\n') },
        { key: 'O', label: 'Rol', text: buildRoleBlock(state) },
        { key: 'N', label: 'Normas', text: buildNormsBlock(state) },
        { key: 'T', label: 'Razonamiento', text: buildReasoningBlock(state) },
        { key: 'R', label: 'Realidad', text: buildRealityBlock(state) },
        { key: 'O2', label: 'Output', text: buildOutputBlock(state) },
        { key: 'L', label: 'Loop', text: buildLoopBlock(state) },
    ];
    return entries.filter(e => e.text.trim());
}
