# Prompts para Generación de Imágenes — Nano Banana

**Estilo visual unificado**: Futuristic Cyber-Noir  
**Paleta de colores**: Obsidian Black (#080b12), Electric Cyan (#00e5ff), Neon Magenta (#e040fb), Deep Slate (#0f1520)  
**Mood**: Oscuro, tecnológico, atmosférico. Líneas de circuito, redes neuronales abstractas, gradientes sutiles. Sin personas. Minimalista pero profundo.

---

## 1. Hero — Landing Page

**Ubicación**: Hero section principal en la página de inicio  
**Aspect Ratio**: `16:9`  
**Dimensiones sugeridas**: 1200×675px

```
Prompt: A dark, atmospheric visualization of an abstract neural network. Glowing electric cyan (#00e5ff) nodes connected by thin luminescent lines form a complex web against a deep obsidian black (#080b12) background. Subtle neon magenta (#e040fb) highlights pulse through key connection points. The perspective is slightly angled, creating depth. Minimalist, no text, no people. Futuristic cyber-noir aesthetic with very subtle film grain texture. The network flows from left to right suggesting information processing.
```

---

## 2. LLM Architecture — Fundamentos Header

**Ubicación**: Cabecera de la sección "Fundamentos LLM"  
**Aspect Ratio**: `21:9`  
**Dimensiones sugeridas**: 1200×514px

```
Prompt: A futuristic visualization of data compression. Abstract representation of text being transformed into glowing numerical vectors and weight matrices. On the left, faint text fragments dissolve into streams of cyan data points. On the right, these data points compress into a dense, pulsating geometric core emitting a soft cyan glow. Dark obsidian background with subtle grid lines. Cyber-noir aesthetic, minimalist, no text, no people. The image conveys "lossy compression" — information flowing in but becoming blurry and abstract.
```

---

## 3. Pathology Atlas Header

**Ubicación**: Cabecera de la sección "Patologías"  
**Aspect Ratio**: `21:9`  
**Dimensiones sugeridas**: 1200×514px

```
Prompt: An abstract dark medical-diagnostic visualization. A central holographic brain cross-section rendered in glowing wireframe, with different zones highlighted in distinct colors: red for damaged areas, magenta for behavioral zones, amber for memory sectors, cyan for operational areas. Thin diagnostic scan lines sweep across the brain. Dark obsidian background with subtle depth-of-field blur. Futuristic cyber-noir medical aesthetic. No text, no people. Clinical but atmospheric.
```

---

## 4. Framework C.O.N.T.R.O.L. Header

**Ubicación**: Cabecera de la sección "Framework"  
**Aspect Ratio**: `21:9`  
**Dimensiones sugeridas**: 1200×514px

```
Prompt: An abstract architectural blueprint of a 7-step control system. Seven glowing geometric nodes arranged in a flowing sequence, each node a different subtle color variation (cyan, magenta, red, amber, emerald, blue, violet) connected by clean luminous lines with directional arrows. The layout suggests a systematic workflow pipeline viewed from a slight isometric angle. Dark obsidian background with faint architectural grid. Futuristic cyber-noir aesthetic, minimalist and precise. No text, no people.
```

---

## 5. Fundamentos — Módulo Card (Landing)

**Ubicación**: Card "Fundamentos LLM" en Bento Grid del landing  
**Aspect Ratio**: `16:9`  
**Dimensiones sugeridas**: 600×338px

```
Prompt: Close-up of an abstract transformer attention mechanism visualization. Layered translucent planes containing arrays of glowing cyan dots, with attention beams (thin bright lines) connecting dots across layers. Some beams are bright (high attention), others dim (low attention). Dark background with subtle depth layers. Minimalist, futuristic, no text, no people. Electric cyan color dominant.
```

---

## 6. Patologías — Módulo Card (Landing)

**Ubicación**: Card "Patologías" en Bento Grid del landing  
**Aspect Ratio**: `16:9`  
**Dimensiones sugeridas**: 600×338px

```
Prompt: Abstract visualization of data corruption and model failure. A stream of clean glowing data particles (cyan) entering from the left gradually distorts, fragments, and turns magenta/red as it moves right, representing information degradation. Scattered broken geometric shapes and pixel-like artifacts in the corrupted zone. Dark obsidian background. Futuristic cyber-noir, minimalist, atmospheric. No text, no people.
```

---

## 7. Framework — Módulo Card (Landing)

**Ubicación**: Card "Framework C.O.N.T.R.O.L." en Bento Grid del landing  
**Aspect Ratio**: `4:3`  
**Dimensiones sugeridas**: 400×300px

```
Prompt: Minimalist isometric diagram of a shield or control panel with seven distinct illuminated sections arranged vertically. Each section glows in a slightly different color (from cyan at top to violet at bottom), suggesting a systematic defense methodology. Clean geometric lines, subtle circuit-board patterns in the background. Dark obsidian background. Futuristic cyber-noir aesthetic. No text, no people.
```

---

## 8. Context Window Diagram (LLMs Page — concepto)

**Ubicación**: Conceptual illustration near the "Mesa de Trabajo" component  
**Aspect Ratio**: `3:2`  
**Dimensiones sugeridas**: 900×600px

```
Prompt: A futuristic visualization of a "workspace desk" metaphor for an AI context window. A sleek holographic desk surface viewed from above at an angle, with organized zones: a bright cyan zone at the top (system prompt), a magenta zone in the middle becoming dim and blurry (lost-in-the-middle), and a bright green zone at the bottom (recent input). Token-like data blocks float above each zone. Dark background. Cyber-noir aesthetic, clean and atmospheric. No text, no people.
```

---

## Instrucciones de Uso

1. Genera cada imagen con el modelo **Nano Banana** usando el prompt correspondiente.
2. Exporta cada imagen en la resolución y aspect ratio indicados.
3. Coloca las imágenes en `curso-control/public/images/` con nombres descriptivos:
   - `hero-neural-network.webp`
   - `header-llm-architecture.webp`
   - `header-pathology-atlas.webp`
   - `header-framework-control.webp`
   - `card-llm-internals.webp`
   - `card-pathology-corruption.webp`
   - `card-framework-shield.webp`
   - `concept-context-window.webp`
4. Sustituye las URLs `https://placehold.co/...` en los componentes por las rutas locales `/images/filename.webp`.
