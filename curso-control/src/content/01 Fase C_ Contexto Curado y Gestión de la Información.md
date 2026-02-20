## C — CONTEXTO CURADO: Especificación Técnica y Táctica

El objetivo de esta fase es aislar al modelo en un entorno de alta fidelidad para neutralizar dos frentes patológicos simultáneos:

**1. La cura directa contra 2 Patologías Epistémicas:**
- **Búnker Temporal (Knowledge Cutoff):** Obligamos al modelo a "vivir en el presente" inyectando la verdad actualizada (Grounding) a través de documentos.
- **Alucinaciones por Ruido:** Extirpamos la "paja" que obliga al modelo a adivinar, proporcionando solo señales limpias (Pruning).

**2. La mitigación total de las 8 Patologías Estructurales de Memoria:**A lo largo de esta fase, aprenderemos a neutralizar todos los fallos físicos de la Ventana de Contexto que vimos en el diagnóstico:
- **Sobrecargas:** Evitando la Podredumbre (Context Rot) y la Hinchazón del Prompt.
- **Sesgos de Atención:** Venciendo la Distracción y el Efecto Lost-in-the-Middle.
- **Amnesias de Sistema:** Esquivando el Truncamiento Silencioso (límite de tokens) y la gravísima Truncación por Recuperación Silenciosa (RAG Efímero).
- **Contaminación Cruzada:** Evitando el Choque de Contextos (Clash) y el Envenenamiento irreversible de la Memoria Episódica.

### El imperativo de la Relación Señal/Ruido

Entender estas patologías requiere un cambio de mentalidad: debemos dejar de ver el contexto como un almacén y verlo como una transmisión de radio.

- **Distracción de Contexto:** Cuando la señal es débil, el modelo prioriza patrones irrelevantes del texto adjunto sobre su propio entrenamiento lógico.
- **La Métrica de Eficiencia:** Un prompt limpio con 500 palabras relevantes funciona mejor y es más inteligente que uno de 10.000 palabras donde el 95% es "paja" o ruido. El objetivo es maximizar la tasa de señal útil por token procesado.

A continuación, las técnicas específicas para ejecutar esta fase:

### 1. Técnicas de Selección y Poda (Pruning Strategy)

No subas todo el documento. Aplica un triaje previo.

**Comparativa de Evolución: Del Volcado al Curado**

| Enfoque | Método de Aplicación | Consecuencias Técnicas |
| :---- | :---- | :---- |
| **Antes: Volcado Bruto (Context Dump)** | "Aquí tienes todo: manual de 300 págs + historial de 3 años. Léelo y resuelve." | **Alto riesgo:** Elevado coste computacional, lentitud y degradación de la respuesta al "perderse" en el ruido. |
| **Ahora: Contexto Curado (Fase C)** | "He aplicado poda. Aquí tienes exclusivamente el Capítulo 4 y la tabla de precios. Responde basándote solo en esto." | **Alta precisión:** Maximiza la densidad de información y enfoca la atención del modelo en la solución exacta. |

- **Poda de Contexto (Context Pruning):** Antes de enviar el prompt, elimina activamente la información superflua. Si estás analizando un hilo de correos, borra firmas, disclaimers legales repetitivos y saludos. Si usas transcripciones de reuniones, elimina las charlas triviales iniciales. Esto aumenta la densidad de información útil por token.
- **Segmentación Modular (RAG Manual):** Si tienes un manual de 300 páginas, no lo subas entero a menos que sea estrictamente necesario (incluso con ventanas de 1M tokens). Localiza el capítulo o sección relevante y pega solo eso. Esto reduce el coste computacional y enfoca la atención del modelo.
- **Distinción entre "Must-Have" y "Nice-to-Have":**
  - *Must-Have (Obligatorio):* Instrucciones "core", datos crudos específicos para la tarea y restricciones.
  - *Nice-to-Have (Opcional):* Historial de chat antiguo o ejemplos periféricos. Si el contexto se llena, sacrifica esto último primero.
- **Economía de Tokens frente a la Hinchazón del Prompt (Prompt Bloating):** Sustituye siempre largos párrafos explicativos por listas (bullet points) o estructuras YAML. Si puedes usar un *Few-Shot Prompt* (un ejemplo de entrada/salida), elimina las instrucciones de formato. Es un "Cuchillo de Ockham": la menor cantidad de directivas para el resultado deseado.

### 2. Técnicas de Estructuración y Delimitación

La IA no "lee" visualmente; procesa secuencias. Ayúdale a separar los datos de las instrucciones.

- **Uso de Delimitadores (Sandwich Defense/Isolation):** Encierra los datos de contexto entre caracteres especiales para separarlos de tus órdenes. Esto evita que la IA confunda el texto que debe analizar con las instrucciones que debe seguir (y protege contra *Prompt Injection* indirecto).
  - *Sintaxis recomendada:*  
  Triples comillas 
  `"""`
  Guiones 
  `---`
  Etiquetas XML
  `<contexto> ... </contexto>`
  - *Ejemplo:* `Analiza el texto delimitado por triples comillas: """ [TEXTO] """`
- **Etiquetado Semántico (Metadata Injection):** Si aportas varios documentos, etiquétalos claramente dentro del prompt. No pegues texto plano; añade cabeceras.
   
   *Ejemplo:* 
  ```
  [Documento A: Política de Ventas 2024]

  Política de Ventas 2024

  Informe anual de la política de ventas de la empresa Scubastore
  Vigente desde el 1 de enero de 2024

  Capítulo 1: Introducción
  Capítulo 2: Política de Ventas
  Capítulo 3: Política de Devoluciones
  Capítulo 4: Política de Envíos
  Capítulo 5: Política de Pagos
  Capítulo 6: Política de Garantías
  Capítulo 7: Política de Devoluciones
  Capítulo 8: Política de Envíos
  Capítulo 9: Política de Pagos
  Capítulo 10: Política de Garantías
  ...  
  ``` 

  ```
  [Documento B: Queja del Cliente]
  Queja del cliente Anselmo Pérez López
  Estimado administrador de la tienda de accesorios de submarinismo scubastore:
  Le escribo con motivo de la compra que realicé el pasado 15 de enero de 2026 de un traje de neopreno marca Cressi modelo Tracina de 5mm de grosor.
  Después de usarlo en dos inmersiones, he notado que el traje se ha desgastado prematuramente, presentando grietas en las costuras y pérdida de elasticidad.
  Adjunto fotografías de los desperfectos y una copia del ticket de compra.
  Me gustaría devolverlo y que se me devolviera el dinero.
  Un saludo. 
  ```
  ```
  Elabora una respuesta al cliente. 
  Indicandole que según el documento A, no se puede devolver el producto. 
  Pero que se le puede ofrecer un descuento en su próxima compra.
  ```
- **Anclaje de la Fuente de Verdad (Grounding):** Instruye explícitamente al modelo para que use *solo* el contexto proporcionado como fuente de verdad, ignorando su entrenamiento previo si hay conflicto.
  - *Instrucción:* "Responde basándote **exclusivamente** en el contexto proporcionado. Si la respuesta no está en el texto, di 'No tengo información', no inventes".

### 3. Gestión de la Ventana de Contexto (Memory Management)

Cómo manejar conversaciones largas o documentos extensos sin que el modelo "pierda el hilo".

#### 3.1 Cuarentena de Contexto (Context Quarantine)

Para tareas complejas o diferentes, inicia un **nuevo chat** o un nuevo hilo. No mezcles temas (ej. no pidas código Python en el mismo chat donde analizaste recetas de cocina). El "residuo" de la tarea anterior puede sesgar la nueva (Context Clash).

#### 3.2 Herramientas de Higiene: El Chat Temporal como "Cuarentena Total"

Más allá de iniciar un "Nuevo Chat", la interfaz actual ofrece una herramienta superior para la higiene estricta del contexto: el Temporary Chat (Chat Temporal).

Mientras que un "Nuevo Chat" estándar limpia la ventana de contexto actual, este sigue alimentando el historial y la memoria a largo plazo del modelo. Si realizas una prueba rápida y confusa en un chat estándar, el modelo podría aprender erróneamente ese patrón o preferencia y guardarlo en su Memory. Para evitar esta contaminación, se aplica el protocolo de Chat Temporal.

**Definición Técnica:** Es un modo de operación efímero donde la interacción no se guarda en el historial, no se utiliza para entrenar al modelo y, lo más importante, no tiene permisos de lectura ni escritura sobre la Memoria Episódica (Memory) del usuario.

**Cuándo activar la Cuarentena por Chat Temporal:**

1. **Evitar el "Envenenamiento de Memoria" (Memory Poisoning):** Si vas a pedir algo que contradice tus instrucciones habituales (ej. un programador de Python pidiendo código en C# solo por curiosidad, o un usuario vegano buscando una receta de carne para un invitado), usa el Chat Temporal. Así evitas que la IA guarde un "falso recuerdo" de que has cambiado de lenguaje o dieta.
2. **Pruebas de Concepto "Sucias" (Quick & Dirty):** Para probar un prompt, depurar una expresión regular (Regex) o hacer una traducción rápida sin valor futuro. Esto mantiene tu barra lateral de historial limpia y enfocada solo en trabajo de valor.
3. **Consultas Sensibles:** Si necesitas tratar datos confidenciales o temas privados que no quieres que formen parte de tu huella digital persistente en la herramienta.

**Regla Táctica:** "Lo que pasa en el Chat Temporal, se queda en el Chat Temporal". Úsalo como un laboratorio de pruebas desechable para proteger la integridad de tus chats de trabajo principales y la coherencia de tu perfil de usuario.

#### 3.3 Datos Reales de Ventana: La Matriz de Capacidad y el Truncamiento Silencioso

Es vital distinguir entre la capacidad teórica del modelo y el límite real que impone la interfaz ("tu mesa de trabajo"). La memoria disponible varía drásticamente según tu plan y si activas los modos de razonamiento.

**Matriz de Capacidad Real (Tokens de Contexto):**

| Plan de Usuario | Modo Instant (GPT-5.2 Instant / Estándar) | Modo Thinking ( GPT-5.2 Thinking) |
| ----- | ----- | ----- |
| Free | 16,000 (~12k palabras) | No disponible |
| Go | 32,000 (~24k palabras) | 196,000 (~147k palabras) |
| Plus / Team | 32,000 (~24k palabras) | 196,000 (~147k palabras) |
| Pro / Enterprise | 128,000 (~96k palabras) | 196,000 (~147k palabras) |

**El Riesgo Crítico: Truncamiento Silencioso (Silent Truncation)**

Cuando tu conversación supera estos límites, la interfaz ejecuta una "poda automática" sin avisarte: elimina los mensajes más antiguos para hacer sitio a los nuevos.

- **La Consecuencia:** Si confías en datos que subiste al inicio de un chat largo (ej. en modo Instant con límite de 32k), al superarlo, esos datos desaparecen del "cerebro" activo del modelo. Esto provoca alucinaciones inmediatas, ya que la IA intentará adivinar información que técnicamente ya no puede ver.
- **La Solución:** Para trabajar con documentos extensos (>50 páginas), es obligatorio cambiar al modo Thinking (que multiplica x6 la memoria) o aplicar técnicas de resumen y reinicio de chat.
- **Resumen Jerárquico (Hierarchical Summarization):** Si la conversación se alarga, pide a la IA que genere un resumen de los puntos clave acordados hasta ahora. Luego, abre un nuevo chat y pega ese resumen como contexto inicial (Priming). Esto "reinicia" la atención del modelo con un contexto limpio.
- **Posicionamiento Estratégico (Primacy & Recency):** Debido al efecto *Lost-in-the-Middle*, coloca la información más crítica (instrucciones de formato, reglas de seguridad) al **principio** (System Prompt) o al **final** del prompt (justo antes de pedir la respuesta). Evita dejar lo importante en el medio de un bloque de texto masivo.
- **Truncamiento Estratégico de Historial:** No basta con resumir. Si estás en un chat largo (por ejemplo, depurando código), **elimina o edita** los mensajes antiguos del usuario y del asistente que contenían errores o rutas fallidas antes de pedir la conclusión final.
  - *Por qué:* Aunque resumas, si los tokens de los "errores anteriores" siguen en la ventana, actúan como un ancla negativa que puede volver a confundir al modelo.

#### 3.4 Truncación por Recuperación Silenciosa (Silent Retrieval Truncation)

Existe un **segundo tipo de amputación silenciosa** que no tiene que ver con el historial, sino con **cómo entran los documentos adjuntos** en la ventana de contexto.

Cuando adjuntas un archivo (PDF, DOCX, imagen…) a un chat, el sistema **no le da el documento completo al modelo**. En su lugar, ejecuta un proceso de RAG (Retrieval-Augmented Generation) efímero:

1. Convierte el archivo a texto plano (con posibles pérdidas de OCR).
2. Lo trocea en fragmentos (chunks).
3. Indexa esos chunks semánticamente.
4. Ante cada consulta, recupera **solo** los chunks más cercanos semánticamente a tu pregunta.
5. Solo esos fragmentos se insertan en el contexto real del modelo.
6. El modelo responde **sin saber —ni indicar— qué partes del documento quedaron fuera**.

**El peligro no está en la pérdida, sino en la opacidad:** la respuesta parece completa y bien fundamentada, pero el modelo ha respondido sobre una versión silenciosamente amputada del documento. No miente; simplemente no sabe lo que no le han dejado ver.

**Síntomas típicos:**

- Respuestas que cubren bien los conceptos más obvios pero omiten secciones relevantes menos centrales.
- Resultados inconsistentes ante el mismo documento según cómo formules la pregunta (cada formulación activa chunks distintos).
- Preguntas genéricas ("explícame todo sobre X") más vulnerables que las específicas, porque la señal semántica de recuperación es más débil.

**Solución de Ingeniería — La Regla del Umbral de Contexto:**

Calcula el tamaño del documento en tokens **antes** de decidir el canal de entrada. Si cabe directamente en el contexto disponible, pégalo como texto plano. Al hacerlo, eliminas el RAG efímero por completo: el modelo ve el documento íntegro.

| Situación | Recomendación |
| ----- | ----- |
| Documento < 60% del contexto disponible | **Pegar como texto plano siempre** |
| Documento > 70% del contexto disponible | Adjuntar como archivo o fragmentar manualmente |
| Tarea transversal que requiere visión completa | Texto plano si cabe, o fragmentar con preguntas dirigidas |
| Documento legal / técnico / de precisión crítica | **Texto plano obligatorio si cabe** |
| Tarea puntual sobre sección conocida del documento | Adjuntar como archivo es aceptable |

> **Principio de fondo:** Cuando adjuntas un archivo, no le das el documento al modelo. Le das al **sistema** la decisión de qué partes del documento merece ver el modelo. Esa delegación es silenciosa, opaca y puede costarte exactamente las secciones que más necesitabas.

#### 3.5 Distinción Técnica de Memoria: Procedimental vs. Episódica

Para gestionar el contexto de forma profesional, es crítico no confundir la "memoria de la sesión" (Ventana de Contexto) con los mecanismos de persistencia a largo plazo. En la interfaz de ChatGPT, existen dos sistemas distintos que funcionan como el cerebro del modelo:

**A. Custom Instructions (Memoria Procedimental / Fija)**

Es el equivalente a la configuración base o el sistema operativo del chat.

- **Definición Técnica:** Son instrucciones directrices persistentes que el sistema "inyecta" automáticamente al inicio de cada nueva conversación, antes incluso de que tú escribas tu prompt. Actúan como un System Prompt de alta prioridad.
- **Función (El "CÓMO"):** Define el comportamiento y el estilo. Responde a preguntas como: ¿Quién eres tú? ¿Cómo quieres que te responda siempre? (Ej: "Sé directo", "No uses moralinas", "Actúa siempre como un consultor senior").
- **Uso Estratégico:**
  - Úsala para establecer las Normas (Fase N) que quieres que apliquen siempre, sin tener que repetirlas.
  - Hack $p: Puedes programar comandos cortos aquí (ej: "Si escribo $p, ejecuta el framework de prompt C.O.N.T.R.O.L.") para automatizar tareas complejas.

**B. Memory (Memoria Episódica / Dinámica)**

Es el equivalente a los recuerdos biográficos del asistente sobre ti.

- **Definición Técnica:** Es un sistema dinámico donde la IA decide autónomamente guardar datos, hechos o preferencias detectadas durante la charla para usarlas en el futuro. A diferencia de las instrucciones fijas, esta memoria se activa y desactiva según la relevancia del contexto actual.
- **Función (El "QUÉ"):** Retiene hechos. (Ej: "Tengo una hija de 9 años", "Mi código preferido es Python", "Vivo en Madrid").
- **Gestión:** Puedes forzar un recuerdo explícitamente diciendo "Recuerda que..." o borrar recuerdos falsos en Configuración > Personalización > Memoria.

**Tabla de Diferenciación Táctica:**

| Característica | Custom Instructions (Procedimental) | Memory (Episódica) |
| ----- | ----- | ----- |
| Naturaleza | Estática y Fija (siempre presente). | Dinámica (se activa por contexto). |
| Objetivo | Define el Comportamiento y el Rol. | Retiene Datos y Hechos. |
| Control | Total (tú escribes el texto exacto). | Parcial (la IA decide o tú sugieres). |
| Ejemplo | "Responde siempre en formato tabla". | "El usuario prefiere las tablas". |

**Regla de Oro de la Fase C:** No satures la Memoria Episódica con instrucciones de comportamiento, ni uses las Custom Instructions para guardar listas interminables de datos. Mantén la higiene: instrucciones al sistema (Custom) y datos sobre ti (Memory).

### 4. Resolución de Conflictos (Conflict Handling)

Qué hacer cuando la información proporcionada es contradictoria (ej. dos políticas de empresa distintas).

- **Versionado Explícito:** Si subes documentos que podrían contradecirse (ej. "Presupuesto v1" y "Presupuesto v2"), indica explícitamente cuál tiene precedencia temporal o jerárquica.
  - *Táctica:* "El Documento B actualiza y anula al Documento A en caso de conflicto".
- **Detección de Conflictos (Conflict Discovery):** Pide al modelo que identifique discrepancias antes de responder.
  - *Prompt:* "Revisa los documentos proporcionados. Lista cualquier contradicción entre ellos antes de generar la respuesta final".

### 5. Optimización para Modelos Específicos

Adapta el contexto según la herramienta (ChatGPT, Claude, Gemini, etc.).

- **Para Modelos de Gran Ventana (Gemini / Claude):** Aunque soportan millones de tokens, el "ruido" sigue bajando el rendimiento. Usa la técnica de "Many-Shot" (dar muchos ejemplos) para anclar el comportamiento, ya que tienen espacio de sobra para ello.
- **Uso de "Projects" o "GPTs" (OpenAI):** En lugar de pegar el contexto cada vez, crea un "Project" o un "Custom GPT" y sube los archivos de conocimiento (Knowledge Files). Esto actúa como una memoria a largo plazo persistente para tareas recurrentes.
- **Carga de Archivos (Vibe Coding):** Si trabajas con código, sube los archivos completos (.py, .js) en lugar de pegar fragmentos. Los modelos actuales entienden mejor la estructura de un proyecto completo si se les da el archivo fuente.

### Resumen de la Lista de Verificación para la Fase C

Antes de pasar a la siguiente fase, verifica:

1. [ ] ¿He eliminado saludos, firmas y texto basura? (**Poda / Anti-Rot**)
2. [ ] ¿He usado delimitadores (""") para separar datos de instrucciones? (**Aislamiento**)
3. [ ] ¿He pegado el documento como texto plano en lugar de adjuntarlo si cabía en el contexto? (**Anti-RAG Silencioso**)
4. [ ] ¿Estoy en un chat limpio o arrastro basura de temas anteriores? (**Cuarentena / Anti-Clash**)
5. [ ] ¿He colocado la instrucción crítica al final del prompt? (**Anti-Lost-in-the-Middle**)
