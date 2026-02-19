# MANUAL OPERATIVO: FRAMEWORK C.O.N.T.R.O.L.

**Un marco de trabajo para superar las limitaciones de los modelos de lenguaje y entregar resultados verificables**

## FUNDAMENTOS (La Física del Modelo)

*Antes de escribir, entiende la máquina.*

El modelo no es un cerebro, es un motor de predicción probabilística. Funciona bajo la metáfora de **"El sabelotodo en el Búnker"**: una persona que todo lo sabe encerrado, sin internet (por defecto), con conocimiento congelado en el pasado y una tendencia a inventar para complacer ("Fluidez Engañosa").

- **La Ventana de Contexto:** Es tu "mesa de trabajo". Es limitada. Si la llenas de basura, el modelo tira datos antiguos o ignora el centro (*Lost-in-the-Middle*).
- **Tipos de Memoria:**
  - *Procedimental (Instrucciones personalizadas de ChatGpt):* El Sistema Operativo. Fijo y constante (Quién eres tú, normas globales).
  - *Episódica (Memoria de ChatGpt):* Dinámica. Recuerdos que la IA decide guardar sobre ti.
- **La Regla de Oro:** No valides una respuesta por lo bien que suena, sino por la evidencia que aporta.

---

## FASE C: CONTEXTO CURADO (Signal-to-Noise Ratio)

*El contexto no es un almacén, es una transmisión de radio. Maximiza la señal.*

**Objetivo:** Evitar el *Context Rot* (podredumbre) y las alucinaciones por ruido.

- **Poda (Pruning):** Elimina firmas de correo, disclaimers y saludos. Sube solo lo esencial (Capítulo 4, no el manual entero).
- **Aislamiento (Sandwich Defense):** Usa delimitadores para separar tus datos de tus instrucciones. Evita que la IA confunda órdenes con texto a analizar. Ejemplos: `"""`  `###` 
- **Higiene de Sesión:**
  - *Context Quarantine:* Un tema = Un chat. No mezcles código con cocina.
  - *Chat Temporal:* Úsalo para pruebas "sucias" o temas que contradigan tus preferencias habituales para evitar el "Envenenamiento de Memoria".
- **Gestión de Capacidad:**
  - Para documentos >50 páginas, usa modelos **Thinking** como GPT-5.2 thinking que multiplican la memoria efectiva.
  - Cuidado con el **Truncamiento Silencioso**: la interfaz borra lo antiguo sin avisar si te pasas de tokens.

---

## FASE O (1): OMNI-ROL (Ingeniería de Identidad)

*No es actuación, es anclaje a clústeres de conocimiento.*

**Objetivo:** Restringir el espacio de búsqueda del modelo a un sector experto específico.

- **Marco V.O.C.E.S.:** Define Visión, Ocupación, Conocimientos, Expresión y Sintonía para crear roles tridimensionales.
- **Persona Pattern Language (PPL):**
  - *Expert Persona:* Para precisión técnica ("Físico Cuántico").
  - *Audience-Oriented:* Define a quién hablas ("Explícalo a un niño de 12 años").
  - *Constraint-Driven:* Añade límites ("Presupuesto cero") para forzar realismo.
- **La Regla del "No-Persona":** Para Lógica Pura, Matemáticas o Validación de Datos, **ELIMINA EL ROL**. Usa *Domain Priming* ("Esto es una tarea de cálculo") para evitar el "Ruido Teatral".

---

## FASE N: NORMAS Y NEGATIVAS (El Muro de Contención)

*La seguridad no es decir qué hacer, sino prohibir lo que podría salir mal.*

**Objetivo:** Neutralizar la sicofancia (adulación) y la pereza.

- **Anti-Sicofancia:** Prohíbe que te dé la razón. "Prefiero una corrección brutal a una validación falsa".
- **Cláusula de Navegación:** Para hechos recientes (post-fecha de corte), prohíbe usar la memoria interna. **Obliga al Web Search**.
- **Derecho al Silencio:** "Si no está en el contexto, di INFORMACIÓN NO DISPONIBLE. No inventes".
- **Anti-Yapping:** "Sin introducciones, sin conclusiones, sin 'espero haberte ayudado'. Dame solo el dato".
- **Posicionamiento:** Las normas van al final del prompt (*Recency Bias*) o en el System Prompt.

---

## FASE T: TRAZA DE PENSAMIENTO (Motor Cognitivo 2026)

*De simular el pensamiento a calibrar motores de razonamiento.*

**Objetivo:** Obligar al modelo a procesar antes de responder.

- **El Nuevo Paradigma (Modelos Razonadores):** Con GPT-5.2 Thinking o Gemini 3, no micro-gestiones el proceso ("paso a paso"). Controla el **Objetivo** y los **Criterios de Calidad**, y deja que el modelo decida la ruta lógica.
- **Estrategias por Nivel:**
  - *Baja complejidad:* Zero-Shot ("Piensa paso a paso").
  - *Alta complejidad:* **Few-Shot CoT** (Dale ejemplos de *Problema → Razonamiento → Solución*).
  - *Estratégica:* **Tree of Thoughts** (Genera 3 opciones, critícalas y elige la mejor).
- **Secuenciación (ROSAS/ORDENA):** Para modelos estándar, dicta el algoritmo: Observa → Desglosa → Ejecuta → Critica.

---

## FASE R: REALIDAD Y RESISTENCIA (Protocolos de Verdad)

*La IA no es tu espejo, es tu auditor.*

**Objetivo:** Detectar alucinaciones y validar hechos críticos.

- **Andrew Prompt:** Pide la respuesta en tercera persona ("Qué diría un auditor escéptico") para eliminar la presión social de complacerte.
- **Triangulación (Adversarial Audit):**
  - Copia la respuesta de un modelo (ej. GPT-5.2).
  - Pégala en un rival (ej. Claude 4.6 Opus o Gemini 3 Deep Think).
  - Prompt: "Audita esto despiadadamente. Busca errores lógicos".
- **Actualidad Forzada:** Si preguntas por precios o noticias, y no navega, la respuesta es alucinación. Recházala.

---

## FASE O(2): OUTPUT Y ORGANIZACIÓN (Vibe Coding/ Vibe creating)

*El formato determina la utilidad.*

**Objetivo:** Entregables finales, no borradores. Aplicaciones funcionales.

- **Marco F.O.R.M.A.S.:** Define Formato, Organización, Representación, Margen, Alineación y Selección de términos.
- **Vibe Coding / Artifacts:** Pide aplicaciones completas ("Genera una app web en un solo archivo HTML") y usa la previsualización para iterar visualmente ("Haz los botones más agresivos").
- **Prefill (Relleno):** Escribe tú el inicio de la respuesta para forzar la estructura. Por ejemplo: `...Responde en JSON: {` 
- **Canvas:** Usa la edición quirúrgica (sombrear texto y corregir) en lugar de regenerar todo el chat.

---

## FASE L : LOOP DE MEJORA (Recursividad)

*La excelencia no está en el primer intento.*

**Objetivo:** Optimización determinista y cierre de calidad.

- **Meta-Prompting:** Pide a la IA que actúe como Ingeniero de Prompts y mejore tu solicitud antes de ejecutarla.
- **Branching (Ramificación):** Si falla, **edita tu mensaje anterior** (icono lápiz). No discutas en nuevos mensajes para no ensuciar el contexto.
- **Checklist de Fiabilidad (Semáforo de Cierre):**
  1. ¿Es reciente? → **Web Search** obligatorio.
  2. ¿Es dato exacto? → **Citas** obligatorias.
  3. ¿Es crítico? → **Triangulación** (Doble modelo) obligatoria.
