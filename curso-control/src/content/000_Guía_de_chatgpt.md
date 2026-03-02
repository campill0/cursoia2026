# Guía completa de ChatGPT (interfaz y funcionalidades)

## Tabla de contenidos

1. Configuración y personalización  
   1.1. Instrucciones personalizadas (Custom Instructions)  
   1.2. “Hack” de comandos abreviados  
   1.3. Memoria (Memory)  
   1.4. Chat temporal (Temporary Chat)  

2. Selector de modelos  
   2.1. GPT-5.2 Auto  
   2.2. GPT-5.2 Instant (estándar)  
   2.3. GPT-5.2 Thinking (razonador)  
   2.4. GPT-5.2 Pro (y limitaciones de herramientas)  
   2.5. Ventana de contexto (por qué importa)  

3. Herramientas de entrada y trabajo con materiales  
   3.1. Adjuntar fotos y archivos  
   3.2. Crear imágenes  

4. Búsqueda en internet  

5. Investigación profunda (Investigación avanzada)  

6. Estudiar y aprender (Modo de estudio)  

7. Lienzo (Canvas)  

8. Modo agente  

9. GPTs personalizados  
   9.1. Qué son y qué incluyen  
   9.2. Cómo se crean  
   9.3. Publicación y visibilidad  

10. Proyectos  

11. Integración con aplicaciones  
   11.1. Qué es y cómo se usa  
   11.2. Conectores (si están disponibles en tu cuenta)  
   11.3. Ejemplos típicos (Figma, Lovable, Cuestionarios, etc.)  

12. Asistente de compras  

13. Higiene de contexto (herramientas de la interfaz para evitar deriva y ruido)  
   13.1. Chat temporal: no deja rastro ni contamina memoria  
   13.2. Editar un mensaje: podar el contexto desde el origen  
   13.3. Ramificar conversación (branch/fork): explorar alternativas sin tocar el hilo principal  
   13.4. Lienzo (Canvas) como “filtro” de contexto: acotar la parte sobre la que preguntas  
   13.5. Nuevo chat: reset total  
   13.6. Proyectos: aislamiento temático y contexto persistente por ámbito  

---

## 1. Configuración y personalización

### 1.1. Instrucciones personalizadas (Custom Instructions)

Las instrucciones personalizadas permiten definir, de forma persistente, cómo quieres que ChatGPT responda y qué información base debe considerar. Se aplican automáticamente a nuevas conversaciones (salvo comportamientos específicos de chats temporales, según cómo tengas configurado el sistema).

Qué puedes fijar aquí:
- Idioma preferente.
- Tono (formal, directo, técnico, etc.).
- Formato (listas, markdown, tablas, etc.).
- Nivel de detalle.
- Reglas generales (por ejemplo: “no uses emojis”, “no repitas la pregunta”, “cita fuentes cuando uses web”, etc.).

Gestión típica:
- Se pueden editar o eliminar en cualquier momento desde configuración.

---

### 1.2. “Hack” de comandos abreviados

Dentro de las instrucciones personalizadas puedes definir comandos o disparadores cortos para reutilizar patrones de respuesta sin reescribirlos cada vez.

Ejemplos:
- Si escribo `/resumen`, responde solo con un resumen breve.
- Si escribo `/lista`, responde solo en formato lista.
- Si escribo `/directo`, elimina introducciones y conclusiones.

Limitación:
- Estos comandos no crean funciones nuevas ni ejecutan acciones fuera del chat; solo modifican el comportamiento de respuesta.

---

### 1.3. Memoria (Memory)

La memoria permite que ChatGPT conserve información entre conversaciones para dar continuidad.

Qué implica:
- Puede recordar preferencias o datos útiles.
- Esa información puede influir en respuestas futuras.

Gestión:
- Puedes activar/desactivar memoria desde configuración.
- Puedes revisar, borrar o corregir recuerdos desde los controles de memoria disponibles en la interfaz.

---

### 1.4. Chat temporal (Temporary Chat)

El chat temporal es una conversación efímera pensada para que:
- No se guarde en el historial (o quede claramente marcada como temporal).
- No utilice ni actualice memoria (evita contaminar recuerdos).
- Sirva para pruebas, temas sensibles o consultas puntuales.

---

## 2. Selector de modelos

El selector de modelos permite elegir distintos comportamientos del modelo (rapidez, razonamiento, etc.). En la interfaz suelen aparecer variantes como:

### 2.1. GPT-5.2 Auto

Modo automático:
- El sistema elige entre comportamiento rápido o razonador en función de la tarea.

---

### 2.2. GPT-5.2 Instant (estándar)

Características:
- Respuesta más rápida.
- Adecuado para preguntas directas, redacción breve y tareas simples.
- Ventana de contexto más limitada que en modos razonadores (según plan).

---

### 2.3. GPT-5.2 Thinking (razonador)

Características:
- Mejor para análisis, tareas largas y coherencia en conversaciones extensas.
- Ventana de contexto mayor.
- Aunque no necesites “razonamiento”, la ventana de contexto grande es útil para:
  - Documentos largos.
  - Conversaciones largas.
  - Mantener coherencia y referencias a secciones previas.

---

### 2.4. GPT-5.2 Pro (y limitaciones de herramientas)

Características:
- Orientado a uso intensivo o “research-grade” (según lo que expone la interfaz).
- Puede tener limitaciones en herramientas de interfaz respecto a otros modos (por ejemplo, algunas funciones como apps, canvas, memoria o generación de imágenes pueden no estar disponibles en ese modo, según la configuración/versión).

---

### 2.5. Ventana de contexto (por qué importa)

La ventana de contexto es “cuánto cabe” en la conversación activa:
- Mensajes previos.
- Fragmentos de archivos.
- Instrucciones.
- Texto que estás manipulando.

Cuando la conversación crece, una ventana mayor suele ayudar a:
- Mantener coherencia.
- Evitar contradicciones por olvidar partes anteriores.
- Trabajar con textos largos sin recortar constantemente.

---

## 3. Herramientas de entrada y trabajo con materiales

### 3.1. Adjuntar fotos y archivos

La interfaz permite adjuntar:
- Imágenes (fotos, capturas).
- Documentos (PDF, Word).
- Hojas de cálculo (Excel, CSV).
- Otros archivos compatibles.

Para qué sirve:
- Que ChatGPT analice contenido real que tú aportas.
- Trabajar sobre datos concretos (tablas, informes, normativa, etc.).
- Reducir dependencia de “conocimiento general” cuando necesitas precisión sobre un documento.

---

### 3.2. Crear imágenes

La interfaz permite generar imágenes a partir de texto:
- Puedes pedir una imagen describiendo la escena.
- En algunos casos puedes editar una imagen que subas (según disponibilidad de la herramienta en tu cuenta).

---

## 4. Búsqueda en internet

La búsqueda en internet permite a ChatGPT:
- Consultar información online.
- Devolver resultados con enlaces/fuentes (si está habilitado).

Cuándo se usa:
- Datos recientes.
- Información que cambia (precios, normativa, noticias, horarios, etc.).
- Verificación de hechos.

---

## 5. Investigación profunda (Investigación avanzada)

Investigación profunda es una modalidad orientada a tareas de investigación extensas.

Qué hace:
- Divide la pregunta en subtemas.
- Busca información de varias fuentes.
- Contrasta y sintetiza.
- Entrega un informe estructurado (normalmente con fuentes cuando está activada la navegación).

Qué la diferencia de “búsqueda”:
- No es una consulta puntual: es un proceso multi-paso para construir un resultado largo y organizado.

---

## 6. Estudiar y aprender (Modo de estudio)

Modo pensado para aprendizaje guiado en lugar de “respuesta directa”.

Qué ofrece:
- Explicaciones paso a paso.
- Preguntas para comprobar comprensión.
- Ritmo adaptado (según lo que respondas).
- Mini-evaluaciones o ejercicios.
- Trabajo con material propio (si subes apuntes, imágenes o PDFs).

Uso típico:
- Preparar exámenes.
- Entender conceptos complejos progresivamente.
- Practicar con ejercicios y feedback.

---

## 7. Lienzo (Canvas)

Canvas es un espacio lateral de edición (texto/código) con enfoque de “documento”.

Qué permite:
- Editar directamente un texto o código.
- Pedir cambios puntuales sin regenerar todo el documento.
- Seleccionar un fragmento concreto y pedir modificación solo de ese tramo.
- Iterar con control y menos caos que en el chat lineal.

Casos típicos:
- Documentos largos.
- Manuales.
- Código.
- Revisión y refactor.

---

## 8. Modo agente

Modo agente permite que ChatGPT actúe como ejecutor de tareas multi-paso, usando herramientas.

Capacidades típicas del modo agente (cuando están disponibles):
- Navegar por webs y seguir flujos (clicks, formularios, pantallas).
- Recopilar información y organizarla.
- Trabajar con archivos (analizar, transformar, generar entregables).
- Combinar acciones y decisiones intermedias.
- Pedir confirmación cuando una acción es sensible o crítica.

10 cosas especialmente útiles que el modo agente permite y que el chat normal no puede hacer del mismo modo:
1. Navegar y completar procesos reales en webs (formularios, flujos, pantallas).  
2. Investigar de forma autónoma en varios pasos sin guiar cada micro-acción.  
3. Planificar viajes o itinerarios explorando webs reales y consolidando opciones.  
4. Trabajar con archivos complejos de principio a fin y producir un entregable final.  
5. Ejecutar tareas largas con mínima intervención, siguiendo un objetivo.  
6. Combinar navegación web + análisis de datos en un mismo flujo.  
7. Automatizar recopilaciones repetitivas (visitar varias páginas y estructurar lo encontrado).  
8. Interactuar con interfaces visuales web (scroll, menús, botones).  
9. Entregar outputs listos (documentos, tablas, resúmenes) tras ejecutar el proceso completo.  
10. Tomar decisiones intermedias durante la tarea y ajustar el camino según resultados.

---

## 9. GPTs personalizados

### 9.1. Qué son y qué incluyen

Un GPT personalizado es una versión configurada de ChatGPT con:
- Instrucciones propias (rol, tono, reglas).
- Archivos de referencia (si lo habilitas).
- Herramientas activadas (según disponibilidad): búsqueda, imágenes, etc.

Resultado:
- Un asistente especializado para un propósito concreto.

---

### 9.2. Cómo se crean

Creación desde la interfaz (sin programación):
- Entras al apartado de GPTs.
- Opción “Crear”.
- Defines propósito, instrucciones, capacidades y recursos (archivos).

---

### 9.3. Publicación y visibilidad

Opciones típicas de visibilidad:
- Privado.
- Compartir por enlace.
- Público (en una tienda/directorio, si tu cuenta lo permite).

En publicación pública puede haber:
- Perfil de creador.
- Validación/revisión previa (según política vigente y plan).

---

## 10. Proyectos

Proyectos son espacios para organizar trabajo de largo recorrido.

Qué agrupan:
- Conversaciones relacionadas.
- Archivos del proyecto.
- Instrucciones propias del proyecto (según configuración).

Ventajas:
- Separación por temas.
- Menos dispersión de chats.
- Contexto más estable para un ámbito concreto.
- Posible colaboración en entornos de equipo (según plan).

---

## 11. Integración con aplicaciones

### 11.1. Qué es y cómo se usa

La integración con aplicaciones permite usar apps externas dentro de ChatGPT para:
- Traer datos desde otras herramientas.
- Ejecutar acciones (crear assets, prototipos, etc.).
- Trabajar con interfaces integradas sin salir del chat.

Uso típico:
- Seleccionar la app desde herramientas.
- Conectar permisos (si aplica).
- Invocar la app en el chat (menú o mención, según interfaz).

---

### 11.2. Conectores (si están disponibles en tu cuenta)

Los conectores amplían la integración permitiendo:
- Acceso a fuentes de datos (docs, repos, correo, etc.).
- En algunos casos, citar/abrir directamente contenido en la app origen.
- Gestión de permisos y administración en cuentas de empresa (si aplica).

---

### 11.3. Ejemplos típicos (Figma, Lovable, Cuestionarios, etc.)

Ejemplos que pueden aparecer en tu interfaz:
- Figma: diseño, diagramas, assets, slides.
- Lovable: prototipado y creación de apps web a partir de descripción.
- Cuestionarios: quizzes/flashcards para aprendizaje interactivo.
- Otras apps según catálogo disponible (productividad, datos, etc.).

---

## 12. Asistente de compras

El asistente de compras (shopping) ayuda a buscar y decidir compras online.

Qué hace:
- Búsqueda conversacional (en vez de queries tipo buscador).
- Refinamiento por preguntas (presupuesto, uso, preferencias).
- Comparación de productos (pros/contras, características).
- Guías de compra personalizadas.
- En algunos casos, integración con compra directa (si está disponible en tu cuenta y comercios compatibles).

Limitaciones:
- Precios y disponibilidad pueden variar; conviene verificar en la tienda final.

---

## 13. Higiene de contexto (herramientas de la interfaz)

Esta sección recoge funciones de interfaz para mantener el contexto limpio: evitar deriva, evitar ruido y evitar “ensuciar” la ventana de contexto con versiones repetidas.

### 13.1. Chat temporal: no deja rastro ni contamina memoria

- Úsalo cuando no quieres historial ni memoria.
- Evita contaminar la memoria dinámica con pruebas o temas que no deberían persistir.

---

### 13.2. Editar un mensaje: podar el contexto desde el origen

Editar una instrucción ya enviada sirve para:
- Cortar la deriva del chat desde donde empezó.
- Eliminar del contexto activo la respuesta no deseada (porque se recalcula el hilo).
- Evitar “discutir” sobre un error acumulando más mensajes.

---

### 13.3. Ramificar conversación (branch/fork): explorar alternativas sin tocar el hilo principal

La interfaz permite ramificar un hilo:
- Creas un chat nuevo a partir de un punto.
- El chat original queda intacto.
- El nuevo chat explora otro camino.

Esto es un fork práctico:
- Alternativas.
- Hipótesis paralelas.
- Enfoques distintos sin modificar el hilo principal.

---

### 13.4. Lienzo (Canvas) como “filtro” de contexto: acotar la parte sobre la que preguntas

El lienzo es una herramienta directa de higiene de contexto porque:
- Puedes seleccionar el fragmento exacto sobre el que quieres trabajar.
- No necesitas regenerar el documento entero una y otra vez.
- Evitas duplicar texto y arrastrar versiones anteriores.
- Mantienes el contexto pequeño y relevante.

En la práctica:
- En vez de “reescribe todo”, haces cambios locales y controlados.

---

### 13.5. Nuevo chat: reset total

Nuevo chat:
- Ventana de contexto limpia.
- Sin arrastre de ruido.
- Recomendable cuando:
  - Cambia el tema.
  - El chat se degradó.
  - Hay demasiadas correcciones y capas acumuladas.

---

### 13.6. Proyectos: aislamiento temático y contexto persistente por ámbito

Los proyectos ayudan a higiene de contexto porque:
- Separan temas en compartimentos.
- Agrupan chats y archivos por ámbito.
- Evitan mezclar dominios distintos en un mismo hilo..