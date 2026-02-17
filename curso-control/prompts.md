# Prompts para Generación de Imágenes — Nano Banana

**Estilo visual unificado**: Futuristic Cyber-Noir  
**Paleta**: Obsidian Black (#080b12), Electric Cyan (#00e5ff), Neon Magenta (#e040fb), Deep Slate (#0f1520)  
**Mood**: Oscuro, tecnológico, atmosférico. Redes neuronales abstractas, gradientes sutiles. Sin personas. Minimalista pero profundo.

## Carpeta destino

Coloca todas las imágenes generadas en:

```
curso-control/public/images/
```

Crea la carpeta `images` dentro de `public` si no existe. Desde el código, las imágenes se referencian como `/images/nombre.webp`.

---

## 1. Hero — Landing Page

| Campo | Valor |
|---|---|
| **Archivo** | `hero-neural-network.webp` |
| **Carpeta** | `public/images/` |
| **Aspect Ratio** | `16:9` (1200×675px) |
| **Código a modificar** | `src/pages/Home.jsx` — línea del `<img>` dentro de la sección `{/* Hero */}` |

**Cambiar:**
```jsx
src="https://placehold.co/1200x500/080b12/00e5ff?text=HERO+..."
```
**Por:**
```jsx
src="/images/hero-neural-network.webp"
```

**Prompt:**
```
A dark, atmospheric visualization of an abstract neural network. Glowing electric cyan (#00e5ff) nodes connected by thin luminescent lines form a complex web against a deep obsidian black (#080b12) background. Subtle neon magenta (#e040fb) highlights pulse through key connection points. The perspective is slightly angled, creating depth. Minimalist, no text, no people. Futuristic cyber-noir aesthetic with very subtle film grain texture. The network flows from left to right suggesting information processing.
```

---

## 2. LLM Architecture Header

| Campo | Valor |
|---|---|
| **Archivo** | `header-llm-architecture.webp` |
| **Carpeta** | `public/images/` |
| **Aspect Ratio** | `21:9` (1200×514px) |
| **Código a modificar** | `src/pages/Llms.jsx` — `<img>` dentro de `{/* Header with placeholder image */}` |

**Cambiar:**
```jsx
src="https://placehold.co/1200x300/080b12/00e5ff?text=The+Bunker+..."
```
**Por:**
```jsx
src="/images/header-llm-architecture.webp"
```

**Prompt:**
```
A futuristic visualization of data compression. Abstract representation of text being transformed into glowing numerical vectors and weight matrices. On the left, faint text fragments dissolve into streams of cyan data points. On the right, these data points compress into a dense, pulsating geometric core emitting a soft cyan glow. Dark obsidian background with subtle grid lines. Cyber-noir aesthetic, minimalist, no text, no people. The image conveys "lossy compression" — information flowing in but becoming blurry and abstract.
```

---

## 3. Pathology Atlas Header

| Campo | Valor |
|---|---|
| **Archivo** | `header-pathology-atlas.webp` |
| **Carpeta** | `public/images/` |
| **Aspect Ratio** | `21:9` (1200×514px) |
| **Código a modificar** | `src/pages/Pathologies.jsx` — `<img>` dentro de `{/* Header */}` |

**Cambiar:**
```jsx
src="https://placehold.co/1200x300/080b12/e040fb?text=Pathology+Atlas+..."
```
**Por:**
```jsx
src="/images/header-pathology-atlas.webp"
```

**Prompt:**
```
An abstract dark medical-diagnostic visualization. A central holographic brain cross-section rendered in glowing wireframe, with different zones highlighted in distinct colors: red for damaged areas, magenta for behavioral zones, amber for memory sectors, cyan for operational areas. Thin diagnostic scan lines sweep across the brain. Dark obsidian background with subtle depth-of-field blur. Futuristic cyber-noir medical aesthetic. No text, no people. Clinical but atmospheric.
```

---

## 4. Framework C.O.N.T.R.O.L. Header

| Campo | Valor |
|---|---|
| **Archivo** | `header-framework-control.webp` |
| **Carpeta** | `public/images/` |
| **Aspect Ratio** | `21:9` (1200×514px) |
| **Código a modificar** | `src/pages/Control.jsx` — `<img>` dentro de `{/* Header */}` |

**Cambiar:**
```jsx
src="https://placehold.co/1200x300/080b12/00e5ff?text=C.O.N.T.R.O.L.+Framework+..."
```
**Por:**
```jsx
src="/images/header-framework-control.webp"
```

**Prompt:**
```
An abstract architectural blueprint of a 7-step control system. Seven glowing geometric nodes arranged in a flowing sequence, each node a different subtle color variation (cyan, magenta, red, amber, emerald, blue, violet) connected by clean luminous lines with directional arrows. The layout suggests a systematic workflow pipeline viewed from a slight isometric angle. Dark obsidian background with faint architectural grid. Futuristic cyber-noir aesthetic, minimalist and precise. No text, no people.
```

---

## 5. Card LLM Internals (Landing)

| Campo | Valor |
|---|---|
| **Archivo** | `card-llm-internals.webp` |
| **Carpeta** | `public/images/` |
| **Aspect Ratio** | `16:9` (600×338px) |
| **Código a modificar** | `src/pages/Home.jsx` — primer `<img>` dentro del BentoGrid (card "Fundamentos LLM") |

**Cambiar:**
```jsx
src="https://placehold.co/600x250/0f1520/00e5ff?text=LLM+Internals..."
```
**Por:**
```jsx
src="/images/card-llm-internals.webp"
```

**Prompt:**
```
Close-up of an abstract transformer attention mechanism visualization. Layered translucent planes containing arrays of glowing cyan dots, with attention beams (thin bright lines) connecting dots across layers. Some beams are bright (high attention), others dim (low attention). Dark background with subtle depth layers. Minimalist, futuristic, no text, no people. Electric cyan color dominant.
```

---

## 6. Card Pathology Corruption (Landing)

| Campo | Valor |
|---|---|
| **Archivo** | `card-pathology-corruption.webp` |
| **Carpeta** | `public/images/` |
| **Aspect Ratio** | `16:9` (600×338px) |
| **Código a modificar** | `src/pages/Home.jsx` — segundo `<img>` dentro del BentoGrid (card "Patologías") |

**Cambiar:**
```jsx
src="https://placehold.co/600x250/0f1520/e040fb?text=Pathology+Map..."
```
**Por:**
```jsx
src="/images/card-pathology-corruption.webp"
```

**Prompt:**
```
Abstract visualization of data corruption and model failure. A stream of clean glowing data particles (cyan) entering from the left gradually distorts, fragments, and turns magenta/red as it moves right, representing information degradation. Scattered broken geometric shapes and pixel-like artifacts in the corrupted zone. Dark obsidian background. Futuristic cyber-noir, minimalist, atmospheric. No text, no people.
```

---

## 7. Card Framework Shield (Landing)

| Campo | Valor |
|---|---|
| **Archivo** | `card-framework-shield.webp` |
| **Carpeta** | `public/images/` |
| **Aspect Ratio** | `4:3` (400×300px) |
| **Código a modificar** | `src/pages/Home.jsx` — `<img>` dentro del BentoCell `span={2}` (card "Framework C.O.N.T.R.O.L.") |

**Cambiar:**
```jsx
src="https://placehold.co/400x300/0f1520/00e5ff?text=Framework+Diagram..."
```
**Por:**
```jsx
src="/images/card-framework-shield.webp"
```

**Prompt:**
```
Minimalist isometric diagram of a shield or control panel with seven distinct illuminated sections arranged vertically. Each section glows in a slightly different color (from cyan at top to violet at bottom), suggesting a systematic defense methodology. Clean geometric lines, subtle circuit-board patterns in the background. Dark obsidian background. Futuristic cyber-noir aesthetic. No text, no people.
```

---

## 8. Context Window Concept (Página LLMs)

| Campo | Valor |
|---|---|
| **Archivo** | `concept-context-window.webp` |
| **Carpeta** | `public/images/` |
| **Aspect Ratio** | `3:2` (900×600px) |
| **Código a modificar** | *(Actualmente no tiene placeholder. Puedes añadir un `<img>` encima del componente `<ContextWindowVisual />` en `src/pages/Llms.jsx`)* |

**Si decides añadirla, inserta antes de `<ContextWindowVisual />`:**
```jsx
<img src="/images/concept-context-window.png" alt="Context Window" className="w-full rounded-xl mb-4 opacity-60" />
```

**Prompt:**
```
A futuristic visualization of a "workspace desk" metaphor for an AI context window. A sleek holographic desk surface viewed from above at an angle, with organized zones: a bright cyan zone at the top (system prompt), a magenta zone in the middle becoming dim and blurry (lost-in-the-middle), and a bright green zone at the bottom (recent input). Token-like data blocks float above each zone. Dark background. Cyber-noir aesthetic, clean and atmospheric. No text, no people.
```

---

## Resumen Rápido

| # | Archivo | Aspect | Modificar en |
|---|---|---|---|
| 1 | `hero-neural-network.webp` | 16:9 | `Home.jsx` — Hero `<img>` |
| 2 | `header-llm-architecture.webp` | 21:9 | `Llms.jsx` — Header `<img>` |
| 3 | `header-pathology-atlas.webp` | 21:9 | `Pathologies.jsx` — Header `<img>` |
| 4 | `header-framework-control.webp` | 21:9 | `Control.jsx` — Header `<img>` |
| 5 | `card-llm-internals.webp` | 16:9 | `Home.jsx` — 1ª card BentoGrid |
| 6 | `card-pathology-corruption.webp` | 16:9 | `Home.jsx` — 2ª card BentoGrid |
| 7 | `card-framework-shield.webp` | 4:3 | `Home.jsx` — card span-2 |
| 8 | `concept-context-window.webp` | 3:2 | `Llms.jsx` — (añadir nuevo) |
