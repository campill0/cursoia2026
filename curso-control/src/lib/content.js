// Utility to verify content loading

// Mapping of route paths to file patterns or specific files
// We will use import.meta.glob to load all content files and then filter appropriately.

const modules = import.meta.glob('../content/*.md', { query: '?raw', import: 'default', eager: true });

export const contentMap = Object.keys(modules).reduce((acc, path) => {
    // Extract filename
    const fileName = path.split('/').pop();
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
    // 00, 01, 02... 07
    // exclude "000" ones which are general
    // We want specifically the phases and the main Guide

    // Filter for 'Fase' or 'Guía Técnica'
    // But be careful not to include other stuff.
    // The files are numbered: 00 Guía..., 01 Fase C..., etc.

    const files = Object.keys(contentMap).filter(name => {
        return (name.startsWith('00 ') || name.startsWith('01 ') || name.includes('Fase')) && !name.includes('000');
    }).sort();

    return files.map(name => contentMap[name]).join('\n\n<hr class="my-12 border-slate-800" />\n\n');
};
