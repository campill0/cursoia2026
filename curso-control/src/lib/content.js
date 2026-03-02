// Utility to verify content loading

// Mapping of route paths to file patterns or specific files
// We will use import.meta.glob to load all content files and then filter appropriately.

const modules = import.meta.glob('../content/*.md', { query: '?raw', import: 'default', eager: true });

export const contentMap = Object.keys(modules).reduce((acc, path) => {
    // Extract filename and decode URI components (like %20, %C3%AD)
    const fileName = decodeURIComponent(path.split('/').pop());
    acc[fileName] = modules[path];
    return acc;
}, {});

export const getContent = (keyword) => {
    // Simple search for matching files based on keyword in filename
    return Object.keys(contentMap)
        .filter(fileName => fileName.toLowerCase().includes(keyword.toLowerCase()))
        .sort() // Sort alphabetically to maintain order (00, 01, etc.)
        .map(fileName => contentMap[fileName])
        .join('\n\n---\n\n'); // Join multiple files if strictly needed, or return array
};

// Start export specific grouped content
export const getLLMContent = () => {
    // 000 cómo funciona...
    // 000 Herramientas...
    // Maybe combine them? Or just the main one.
    return getContent('cómo funciona');
};

export const getPathologiesContent = () => {
    // 000 Patologías...
    return getContent('Patologías');
};

export const getControlContent = () => {
    const files = Object.keys(contentMap).filter(name => {
        return (name.startsWith('00 ') || name.startsWith('01 ') || name.includes('Fase')) && !name.includes('000');
    }).sort();
    return files.map(name => contentMap[name]).join('\n\n<hr class="my-12 border-slate-800" />\n\n');
};

const phasesMeta = [
    { prefix: '00 ', letter: 'B', key: 'F0', title: 'Fundamentos', subtitle: 'La Física del Modelo', color: 'slate' },
    { prefix: '01 ', letter: 'C', key: 'C', title: 'Contexto Curado', subtitle: 'Signal-to-Noise Ratio', color: 'cyan' },
    { prefix: '02 ', letter: 'O', key: 'O', title: 'Omni-Rol', subtitle: 'Ingeniería de Identidad', color: 'magenta' },
    { prefix: '03 ', letter: 'N', key: 'N', title: 'Normas y Negativas', subtitle: 'Muro de Contención', color: 'red' },
    { prefix: '04 ', letter: 'T', key: 'T', title: 'Traza de Pensamiento', subtitle: 'Motor Cognitivo 2026', color: 'amber' },
    { prefix: '05 ', letter: 'R', key: 'R', title: 'Realidad y Resistencia', subtitle: 'Protocolos de Verdad', color: 'emerald' },
    { prefix: '06 ', letter: 'O₂', key: 'O2', title: 'Output y Organización', subtitle: 'Diseña la Respuesta', color: 'blue' },
    { prefix: '07 ', letter: 'L', key: 'L', title: 'Loop de Mejora', subtitle: 'Revisa y Mejora', color: 'violet' },
];

export const getControlPhases = () => {
    return phasesMeta.map(meta => {
        const file = Object.keys(contentMap).find(name => name.startsWith(meta.prefix) && !name.includes('000'));
        return {
            ...meta,
            content: file ? contentMap[file] : '',
        };
    }).filter(p => p.content);
};

export const getChatGptGuideContent = () => {
    return getContent('Guía_de_chatgpt');
};
