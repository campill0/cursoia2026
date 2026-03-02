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
    return getContent('001_');
};

export const getPathologiesContent = () => {
    return getContent('002_');
};

export const getControlContent = () => {
    const files = Object.keys(contentMap).filter(name => {
        const num = parseInt(name.split('_')[0], 10);
        return num >= 3 && num <= 10;
    }).sort();
    return files.map(name => contentMap[name]).join('\n\n<hr class="my-12 border-slate-800" />\n\n');
};

const phasesMeta = [
    { prefix: '003_', letter: 'B', key: 'F0', title: 'Fundamentos', subtitle: 'La Física del Modelo', color: 'slate' },
    { prefix: '004_', letter: 'C', key: 'C', title: 'Contexto Curado', subtitle: 'Signal-to-Noise Ratio', color: 'cyan' },
    { prefix: '005_', letter: 'O', key: 'O', title: 'Omni-Rol', subtitle: 'Ingeniería de Identidad', color: 'magenta' },
    { prefix: '006_', letter: 'N', key: 'N', title: 'Normas y Negativas', subtitle: 'Muro de Contención', color: 'red' },
    { prefix: '007_', letter: 'T', key: 'T', title: 'Tutela del Razonamiento', subtitle: 'Motor Cognitivo 2026', color: 'amber' },
    { prefix: '008_', letter: 'R', key: 'R', title: 'Realidad y Resistencia', subtitle: 'Protocolos de Verdad', color: 'emerald' },
    { prefix: '009_', letter: 'O₂', key: 'O2', title: 'Output y Organización', subtitle: 'Diseña la Respuesta', color: 'blue' },
    { prefix: '010_', letter: 'L', key: 'L', title: 'Loop de Mejora', subtitle: 'Revisa y Mejora', color: 'violet' },
];

export const getControlPhases = () => {
    return phasesMeta.map(meta => {
        const file = Object.keys(contentMap).find(name => name.startsWith(meta.prefix));
        return {
            ...meta,
            content: file ? contentMap[file] : '',
        };
    }).filter(p => p.content);
};

export const getChatGptGuideContent = () => {
    return getContent('011_');
};
