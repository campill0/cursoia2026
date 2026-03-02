## FASE O — OBJETIVO Y OMNI-ROL

**De la invocación de personajes a la ingeniería de identidad**

> **NIVEL 1: FUNDAMENTO CONCEPTUAL**

La Fase O no consiste en "pedirle a la IA que actúe como alguien". Es una **operación de ingeniería semántica** cuyo objetivo es restringir el espacio de búsqueda del modelo hacia clústeres latentes de conocimiento, vocabulario, heurísticas y sesgos útiles para la tarea.

Bien ejecutada, esta fase **comprime decenas de instrucciones en una sola línea**. Mal ejecutada, introduce ruido teatral y puede degradar el razonamiento.

El principio clave es este:
**Los LLM no tienen identidad; simulan identidades.** Al definir un Omni-Rol, no disfrazas al modelo: **anclas su generación a un subespacio concreto de su entrenamiento**.

### El Omni-Rol Tridimensional: Quién, a Quién, Para Qué
Un rol incompleto define solo al emisor. Uno completo tiene **tres dimensiones**:

1. **Identidad (Speaker)** – quién habla
2. **Audiencia (Listener)** – a quién se dirige
3. **Intención (Goal)** – qué pretende lograr

Definir la audiencia ajusta la complejidad semántica **más que cualquier otra variable**. Por ejemplo, no es lo mismo explicar algo a un Comité Ejecutivo, que a un junior, que a un niño de 12 años. La intención también importa (informar, persuadir, vender o advertir). 

*(Nota: Definir la Intención y la Audiencia moldeará profundamente la respuesta. Cómo organizar físicamente esa salida —tablas, JSON, markdown— es trabajo de la FASE O2: Output y Organización).*

---

> **NIVEL 2: EJECUCIÓN PRÁCTICA (Configuración del Rol)**

### Camino A — Anclaje Arquetípico (Character Prompting)
Cuando existe un personaje cultural ampliamente representado en los datasets, usarlo es la forma más eficiente de compresión. Funciona como un **archivo .zip cognitivo**: una sola referencia activa patrones complejos de razonamiento, tono y comportamiento.

**Ejemplos de activación de clústeres:**
- *Creatividad / venta*: "Steve Jobs presentando el iPhone en 2007" → minimalismo, foco en usuario, carisma, narrativa aspiracional.
- *Auditoría / crítica*: "Gordon Ramsay probando un plato terrible" → exigencia extrema, detección de fallos, lenguaje directo.
- *Lógica / rigor*: "Sherlock Holmes" → deducción abductiva, atención microscópica al detalle, frialdad emocional.

**Cuándo usarlo:** Ideación, persuasión, análisis crítico, o cuando el "estilo de pensar" importa tanto como el contenido.
**Limitación:** No siempre existe un personaje adecuado, o en un contexto técnico corporativo puede resultar poco profesional.

### Camino B — Construcción Manual del Rol y V.O.C.E.S.
Cuando no hay equivalente famoso, debes **construir la identidad explícitamente**. Aquí no vale "Eres un experto en X". Hay que diseñar la arquitectura del agente.

**Marco V.O.C.E.S. (definición de identidad)**
Este marco evita respuestas genéricas descomponiendo el rol en cinco dimensiones:
- **V – Visión**: filosofía o enfoque ("La simplicidad es la base de la seguridad").
- **O – Ocupación**: cargo exacto + seniority ("Ingeniero de Sistemas Senior, 20 años de exp.").
- **C – Conocimientos**: base técnica o teórica (Zero Trust, ISO 27001).
- **E – Expresión**: patrones lingüísticos y tono (Jerga precisa, metáforas militares).
- **S – Sintonía**: valores y prioridades (Estabilidad > innovación).

**Profundidad Contextual (Hacer el rol realista)**
Un rol plano sigue siendo débil. Añade al rol **Motivaciones** (qué quiere lograr) y **Restricciones** (qué le limita). El modelo simula mejor la toma de decisiones cuando existe tensión o trade-offs entre objetivos.

*Ejemplo:* "Eres un Arquitecto de Software (O) bajo presión. Tu motivación es lanzar el producto hoy. Tu restricción es que el presupuesto en servidores es cero. Dame la solución más pragmática posible."

---

> **NIVEL 3: EJECUCIÓN AVANZADA (Persona Pattern Language - PPL)**

Más allá de definir rasgos con V.O.C.E.S., la ingeniería de prompts avanzada utiliza el *Persona Pattern Language* para seleccionar la **arquitectura cognitiva** del rol. No se trata de "actuar", sino de activar clústeres específicos de procesamiento.

Existen tres patrones fundamentales que debes dominar:

> **El secreto de las etiquetas en inglés:** Las IA han sido entrenadas leyendo miles de artículos científicos sobre programación de prompts. Si usas etiquetas literales (como 'Expert Persona' o 'Constraint-Driven'), el modelo reconoce el comando técnico y no lo trata como un simple juego. Funciona como una "contraseña" para acceder a su comportamiento más avanzado.

**A. Expert Persona Pattern (Patrón de Experto de Dominio)**

Es la arquitectura estándar para maximizar la precisión técnica.

- **Función:** Activa terminología específica, heurísticas profesionales y marcos mentales de un sector.

- **Cuándo usarlo:** Cuando la precisión y la profundidad técnica superan a la empatía o la pedagogía.

- **Sintaxis Táctica:** *"Adopta la 'Expert Persona' de un Físico Cuántico especializado en termodinámica. Usa rigor académico y asume que hablas con pares revisores."*

    > **¿Qué hace esta sintaxis?** Al ordenarle literalmente usar el marco de 'Experto' (**'Expert Persona'**), estás apagando su estilo amistoso o básico por defecto. Le fuerzas a emplear exclusivamente terminología precisa y lógicas avanzadas propias de ese sector. Es la clave para exigir máxima exactitud desde la primera palabra.

**B. Audience-Oriented Persona (Patrón Orientado a la Audiencia)**

Aquí el rol se define no por quién *es*, sino por a quién *habla*. Es la variable que más afecta a la complejidad semántica del output.

- **Función:** Calibra automáticamente el nivel de abstracción, el tono y la estructura de la explicación.

- **Cuándo usarlo:** Para comunicación, ventas o enseñanza.

- **Sintaxis Táctica:** *"Actúa como un profesor (Expert), pero tu arquitectura es 'Audience-Oriented': explícale la computación cuántica a un niño de 12 años (Listener). Ajusta todas las analogías a su nivel cognitivo."*

    > **¿Qué hace esta sintaxis?** Al usar explícitamente el comando **'Audience-Oriented'**, aislas el "quién sabe" (**'Expert'**) del "a quién se lo cuenta" (**'Listener'**). El choque entre el conocimiento inmenso del experto y la poca capacidad inicial del público obliga a la IA a esforzarse, produciendo traducciones de esquemas complejos de forma brillantemente sencilla.

**C. Constraint-Driven Persona (Patrón Basado en Restricciones)**

El patrón más realista. Un experto sin límites es un teórico; un experto con límites es un profesional.

- **Función:** Introduce "fricción" en el razonamiento para forzar *trade-offs* (decisiones de compromiso) realistas.

- **Cuándo usarlo:** Planificación de proyectos, estrategia empresarial o código eficiente.

- **Sintaxis Táctica:** *"Eres un Arquitecto de Software (Expert). Estás bajo un patrón 'Constraint-Driven': tienes presupuesto cero para servidores y el lanzamiento es en 2 días. Dame la solución más sucia y rápida, no la más elegante."*

    > **¿Qué hace esta sintaxis?** Impide que el modelo te escupa la típica teoría brillante pero inútil de manual. Al declarar que es un **'Expert'** pero inyectarle el patrón de limitación estricta **'Constraint-Driven'**, le obligas a razonar de forma realista y sucia. Te entregará soluciones prácticas de compromiso asumiendo sacrificios, tal y como lo haría un ingeniero de verdad.

### Arquitecturas Avanzadas: Multi-Persona (Consejo de Expertos)
Para problemas complejos, un solo rol es insuficiente. Forma una "mesa redonda" donde múltiples personajes debaten, se critican internamente y uno sintetiza. Por ejemplo: 
- Arquitecto conservador (seguridad).
- Product Manager ambicioso (velocidad).
- Abogado corporativo (cumplimiento normativo).

Esto fuerza al modelo a observar el problema desde varias ópticas a la vez, reduciendo drásticamente las alucinaciones y descubriendo puntos ciegos.

---

> **NIVEL 4: CONTROL DE RIESGOS Y ALTERNATIVAS**

> **Advertencia Crítica: El Ruido Teatral**
> Aunque los roles mejoran el matiz y la calidad del texto, introducen un riesgo técnico severo. El modelo puede gastar valiosos recursos de cálculo en "mantener el personaje" (estilo, jerga, actitud) en detrimento de la capacidad real de procesamiento lógico puro.

### La Anti-Persona y el "Domain Priming"
Debes eliminar *cualquier* rastro de identidad o rol simulado en tres escenarios específicos:
1. **Lógica Pura y Matemáticas:** Resolver ecuaciones, física o lógica formal.
2. **Validación de Datos Estricta:** Comprobar esquemas JSON o verificar listas de correos.
3. **Código de Bajo Nivel:** Cuando necesitas eficiencia algorítmica bruta y cero charlas.

Para estas tareas, usar un rol es veneno. La alternativa de ingeniería es el **Domain Priming** (Primado de Dominio): asigna un *Dominio* (Dónde estamos) en lugar de una *Persona* (Quién eres). Activa el conocimiento del sector sin activar los sesgos de comportamiento teatral.

| Enfoque | Prompt (Ejemplo) | Resultado |
| ----- | ----- | ----- |
| **❌ Role Prompting** | "Eres un matemático top del s.XIX. Calcula la ruta..." | **Alto Riesgo:** El modelo prioriza hablar antiguo y falla en decimales. |
| **✅ Domain Priming** | "Contexto: Cálculo Diferencial. Estándar: Rigor absoluto. Sin personalidad. Procesa." | **Alta Precisión:** Cero teatro. Todos los recursos van al cálculo matemático bruto. |

> **Protocolo Jekyll & Hyde (Validación de alto riesgo)**
> Para tareas críticas empresariales, ejecuta la consulta dos veces: una pidiendo al modelo que use un rol experto, y otra enviando un prompt aséptico neutral. Posteriormente, en un prompt final, pide al modelo que compare ambos resultados y elija la opción técnica más robusta.

---

> **NIVEL 5: GUÍA OPERATIVA Y EJEMPLOS**

### Árbol de Decisión: ¿Cómo elegir tu estrategia de Omni-Rol?
Sigue esta guía rápida antes de lanzar un prompt complejo:

- **¿Necesitas estilo humano, creatividad y persuasión rápida?**
  👉 Usa anclaje de **Arquetipo Famoso**. Es el atajo semántico más eficaz.
- **¿Es un entorno técnico empresarial donde un arquetipo no encaja?**
  👉 Usa **Construcción Manual (V.O.C.E.S.)** y presiona al rol con motivaciones y restricciones.
- **¿El output va dirigido a un público muy específico (novatos, clientes, inversores)?**
  👉 Declara el **Audience-Oriented Pattern**; separando explícitamente "quién sabe" de "a quién se lo explica".
- **¿Es un problema que requiere balancear riesgos enormes y velocidad de ejecución?**
  👉 Llama a un **Consejo de Expertos (Multi-Persona)** para que evalúen pros y contras.
- **¿Es un cálculo matemático, comprobación de estructura JSON o lógica formal pura?**
  👉 **¡Huye del Rol!** Usa el **No-Persona Pattern / Domain Priming** y apaga su personalidad.
- **¿Sufres síndrome del impostor y no sabes cuál es el experto ideal para tu tarea?**
  👉 Usa **ExpertPrompting**: Pídele a la IA que deduzca ella misma el rol experto óptimo, lo asuma automáticamente y luego redacte la respuesta final.

### Disección de Prompts (Esqueletos Prácticos)

A continuación, la estructura mental que debes aplicar en cuatro escenarios típicos del día a día:

**1. El Consultor Pragmático (Para Planificación y Estrategia)**
- **Estructura:** `[Expert Persona] + [Restricción de tiempo/dinero] + [V.O.C.E.S. pragmático].`
- **Ejemplo de Prompt:** *"Actúa como un Director de Operaciones (COO) experto. Tienes que diseñar el plan de lanzamiento de nuestro nuevo producto. Restricción crítica: nuestro presupuesto es cero euros y el equipo son 3 personas. Dame únicamente la estrategia de ejecución más cruda y realista posible."*
- **Por qué funciona:** Fuerza el patrón *Constraint-Driven*. Evita que el LLM te dicte teorías utópicas tipo "paso 1: contrata 10 personas" y le obliga a entregar soluciones de compromiso que de verdad puedas aplicar en el mundo real.

**2. El Traductor Técnico (Para Documentación y Docencia)**
- **Estructura:** `[Identidad muy técnica (Speaker)] + [Audiencia no técnica (Listener)] + [Intención clara: dar confianza al lector].`
- **Ejemplo de Prompt:** *"Adopta el rol de un Ingeniero Senior de Ciberseguridad orientado a la audiencia. Vas a explicar cómo funciona el cifrado asimétrico RSA. Tu audiencia es el equipo de Recursos Humanos, que no tiene ninguna base técnica. Utiliza analogías del mundo real para que se sientan seguros comprendiendo el concepto sin abrumarse con matemáticas."*
- **Por qué funciona:** Al obligar a un experto a explicarse ante un novato usando *Audience-Oriented*, el LLM recurre a generar analogías perfectas y recortes masivos de jerga innecesaria sin que tú se lo tengas que pedir palabra por palabra.

**3. El Quirófano Lógico (Análisis de Código o Matemáticas puras)**
- **Estructura:** `[Instrucción neutral: "Eres un intérprete lógico puro"] + [Domain Priming: "Entorno Python/TensorFlow avanzado"] + [Cero personalidad y cero comentarios de texto].`
- **Ejemplo de Prompt:** *"Eres un motor de cómputo lógico. Contexto: Optimización de bases de datos PostgreSQL. Tarea: Analiza la siguiente consulta SQL y devuelve exclusivamente el código optimizado. Estándar: Máxima eficiencia algorítmica. Sin personalidad, sin saludos, sin explicaciones adicionales."*
- **Por qué funciona:** Apaga el ruido teatral. Dedica el 100% de los tokens a conseguir cálculos precisos y validables en lugar de sonar "educado y servicial".

**4. El Funcionario Auditor (Análisis B2G de Licitaciones de Software)**
- **Estructura:** `[Identidad Institucional Estricta] + [Rol Acotado Analítico] + [Restricción de Cumplimiento Legal].`
- **Ejemplo de Prompt:** *"Actúa como un Funcionario Interventor y Analista Técnico Administrativo del Ayuntamiento de Cartagena. Tu tarea es analizar rigurosamente los pliegos técnicos que han presentado 3 empresas licitadoras para conseguir el nuevo contrato de un software de gestión de impuestos municipales. Evalúa comparativamente el cumplimiento de las bases publicadas buscando lagunas técnicas, posibles costes ocultos o incumplimientos formales. Usa un tono institucional, extremadamente objetivo y puramente burocrático."*
- **Por qué funciona:** En sectores legales (B2G), el modelo necesita desactivar su sesgo comercial de "vender innovación". Definir explícitamente la institución (Ayuntamiento de Cartagena) y el dominio (gestión tributaria) carga en su "memoria a corto plazo" los *clústeres latentes* de la burocracia, la estricta Ley de Contratos del Sector Público, y el vocabulario penalizador que necesita para encontrar fallos en la oferta.
