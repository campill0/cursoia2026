A continuación, encontrarás una exploración detallada de las herramientas nativas que integra la interfaz de **ChatGPT**.

Más allá de simples funciones visuales, estos elementos actúan como **palancas estratégicas** diseñadas para optimizar vuestra interacción con el modelo. Su uso correcto permite **neutralizar limitaciones comunes**, como la pérdida de contexto o la generación de datos inexactos, elevando significativamente la calidad de las respuestas obtenidas.

Para facilitar vuestro aprendizaje, hemos organizado este **arsenal técnico** según su función específica dentro del flujo de trabajo:

### **1\. Herramientas de "Configuración del Cerebro" (Antes del Chat)**

Estas herramientas definen el sistema operativo de la IA antes de que escribas una sola palabra.

* **Custom Instructions (Instrucciones Personalizadas):**

  * *Qué es:* Es la "Memoria Procedimental" o el sistema operativo del chat. Son instrucciones fijas que se inyectan en *cada* conversación automáticamente,.  
  * *Para qué sirve:* Para no tener que repetir siempre "no seas verboso" o "actúa como un experto". Define **quién es la IA** y **cómo debe responder** (formato, tono).  
  * *Uso Avanzado:* Puedes programar "hacks" o comandos cortos (ej. "Si escribo $p, ejecuta el framework C.O.N.T.R.O.L.").  
* **Memory (Memoria Episódica):**

  * *Qué es:* Un sistema dinámico donde la IA decide guardar hechos sobre ti (ej. "tienes una hija", "usas Python"),.  
  * *Para qué sirve:* Para dar continuidad a largo plazo sin saturar el contexto actual.  
  * *Gestión:* Puedes forzar recuerdos ("Recuerda que...") o borrar recuerdos falsos en *Configuración \> Personalización \> Memoria* para evitar el "Envenenamiento de Memoria",.

### **2\. Herramientas de "Motor y Razonamiento" (El Selector)**

Elegir el modelo correcto es la primera decisión táctica para evitar la pereza cognitiva.

* **Selector de Modelo (Thinking vs. Standard):**  
  * *Standard (GPT-4o):* Ideal para tareas rápidas. Tiene una ventana de contexto estándar (32k tokens en Plus).  
  * *Reasoning (o1 / GPT-5.2 Thinking):* Modelos que "piensan" antes de responder. Son obligatorios para documentos extensos (\>50 páginas) o lógica compleja, ya que multiplican la memoria efectiva y reducen alucinaciones,.  
  * *Advanced Data Analysis (Clip / Subida de Archivos):* Permite subir Excel, PDF o CSV. Transforma al modelo en un procesador de datos (Grounding), obligándolo a usar *tus* datos y no su entrenamiento, eliminando alucinaciones externas,.

### **3\. Herramientas de "Intervención y Edición" (Durante el Chat)**

Aquí es donde cambias la dinámica de "chat lineal" a "edición profesional".

* **Canvas (Lienzo de Trabajo):**  
  * *Qué es:* Una interfaz lateral que se abre para escritura o codificación.  
  * *Para qué sirve:* Permite la **"Edición Quirúrgica"**. En lugar de pedir "reescribe todo el informe", puedes sombrear un párrafo y decirle "haz esto más formal". Evita regenerar el documento entero y gastar tokens innecesariamente,,.  
* **Botón de Edición (Branching/Ramificación):**  
  * *Qué es:* El icono de lápiz en *tu propio mensaje*.  
  * *Para qué sirve:* Si la IA falla, **no discutas** en un nuevo mensaje (eso ensucia el contexto). Edita tu instrucción anterior y "Guarda y envía". Esto crea una nueva línea temporal limpia, borrando el error del historial activo,.  
* **Web Search (Búsqueda Web):**  
  * *Qué es:* La capacidad de navegar por internet.  
  * *Uso Crítico:* Debes forzarla para romper el "Búnker Temporal". Si preguntas por hechos recientes, obliga a usarla para evitar que la IA invente datos basándose en probabilidades antiguas,.

### **4\. Herramientas de "Visualización y Output" (Vibe Coding)**

Para cuando necesitas más que texto plano.

* **Artifacts / Previsualización:**  
  * *Qué es:* Ventanas donde la IA renderiza código HTML/JS/React en tiempo real.  
  * *Para qué sirve:* Para **Vibe Coding**. Puedes pedir "crea una app de tareas con botones verdes" y verla funcionar al instante, iterando sobre el diseño visualmente sin tocar código,.

### **5\. Herramientas de "Higiene y Seguridad" (Mantenimiento)**

Vitales para evitar la "Podredumbre del Contexto".

* **Chat Temporal (Temporary Chat):**  
  * *Qué es:* Un modo efímero donde nada se guarda en el historial ni en la memoria.  
  * *Para qué sirve:* Para pruebas "sucias", temas sensibles o consultas que contradicen tus gustos habituales (ej. pedir código en un lenguaje que odias). Evita que la IA "aprenda" preferencias falsas,.  
* **Nuevo Chat:**  
  * *Función:* Es la herramienta definitiva de **Poda (Pruning)**. Cuando la conversación se degrada o cambia de tema, iniciar un chat nuevo restablece la atención del modelo y elimina el ruido acumulado,.

**Resumen Táctico:** Para tener mejores resultados, deja de usar el chat como una línea infinita. Configura tu **Sistema Operativo** (Custom Instructions), usa **Canvas** para refinar, **Branching** (lápiz) para corregir rumbos, y **Chats Temporales** para no contaminar tu perfil.

