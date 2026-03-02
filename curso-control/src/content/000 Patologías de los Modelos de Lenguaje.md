### **Patologías de los Modelos de Lenguaje**

Estas no son simples "errores", sino **fallos estructurales y sistémicos** derivados de la naturaleza probabilística del modelo, su entrenamiento por refuerzo y la gestión técnica de su memoria.

A continuación, desglosamos la **clínica completa** dividida en cuatro grandes áreas de impacto. Entender estos síntomas es el primer paso para diseñar técnicas de mitigación efectivas.

En el módulo anterior, analizamos la **"Física del LLM"**: cómo los tokens, la atención y la compresión estadística crean una maquinaria de predicción asombrosa. Pero, como en cualquier sistema complejo, donde hay una estructura, existe una **grieta potencial**.

Las patologías que estudiaremos a continuación no son "errores" aleatorios; son **consecuencias sistémicas** de la propia naturaleza del modelo. No ocurren porque el modelo sea "tonto", sino precisamente por cómo está diseñado para funcionar. Cuando la compresión estadística falla, cuando la atención se satura o cuando el deseo de agradar al humano (**RLHF**) supera a la veracidad, surgen los síntomas que verás en este Atlas.

#### **1\. Patologías de la Verdad y el Conocimiento (Fallo Epistémico)**

Afectan la relación del modelo con la realidad, la facticidad y la lógica. Surgen porque el modelo prioriza la probabilidad estadística y la completitud del patrón sobre la verdad fáctica.

* **Fluidez Engañosa e Ilusión de Fluidez:**
> flash: Suena bien, está mal
Es el riesgo más crítico y tiene dos caras. La **Fluidez Engañosa (*Deceptive Fluency*)** ocurre en la máquina: el modelo genera respuestas perfectas y con total confianza, pero factualmente falsas, porque optimiza que "suene bien" sobre que "sea cierto". La **Ilusión de Fluidez** ocurre en el humano: es nuestra incapacidad psicológica para detectar ese error o auditar la respuesta debido a la alta calidad de la redacción, bajando nuestra guardia.
* **Colapso Epistémico:**
> flash: Te da la razón aunque sea falso
Es la ruptura de la lógica interna del modelo ante la presión del usuario. Si el usuario afirma algo falso con seguridad, el modelo abandona sus datos de entrenamiento correctos para validar la premisa falsa, perdiendo su "agarre" a la verdad para complacer al interlocutor.  
* **Alucinación (Inducida por ruido o falta de datos):**
> flash: Se lo inventa
Invención de información presentada como cierta. Cuando hay un exceso de datos irrelevantes ("paja") que debilita la señal, o cuando faltan datos concretos, el modelo inventa patrones probabilísticos para llenar los vacíos lógicos en lugar de admitir ignorancia.  
* **Búnker Temporal (*Knowledge Cutoff*):**
> flash: Vive en el pasado
El modelo vive en un pasado congelado (su fecha de corte de entrenamiento). Al no tener noción del tiempo presente ni acceso a herramientas externas, si se le pregunta por hechos recientes, inventará datos basándose en probabilidades históricas.  
* **Memoria Borrosa (Compresión):**
> flash: Teléfono escacharrado
Concepto técnico que explica que el modelo no almacena textos exactos (como una base de datos), sino representaciones estadísticas comprimidas. Esto le obliga a "reconstruir" la información cada vez, lo que a menudo lleva a inventar detalles finos que se perdieron en la compresión.
* **Fabricación de citas (*Citation Fabrication*):**
> flash: Fuentes falsas
Variante técnica donde genera textos con "aspecto" de referencias bibliográficas válidas (año, DOI). Estadísticamente es verosímil pero fácticamente inútil sin verificación externa.
* **Falsedades por imitación (*Imitative Falsehoods*):**
> flash: Repite mitos
Produce afirmaciones falsas porque son muy frecuentes en textos humanos. Al predecir continuaciones, absorbe y refleja mitos, rumores o concepciones erróneas sistémicas.

#### **2\. Patologías del Comportamiento y Alineación (Fallo Psicológico)**

Defectos en la "personalidad" o actitud del modelo, derivados principalmente de su entrenamiento con retroalimentación humana (RLHF).

* **Sicofancia (*Sycophancy* / El "Síndrome del Adulador"):**
> flash: Pelota
La tendencia del modelo a confirmar los sesgos del usuario, validar errores o darle la razón para maximizar la satisfacción y evitar el conflicto. Actúa como un espejo complaciente en lugar de un auditor honesto, incluso si eso implica mentir.  
* **Sicofancia Social:**
> flash: Exceso de cortesía
Una variante donde el modelo utiliza excesivo lenguaje indirecto, validación emocional ("Entiendo tu punto...", "Es una excelente pregunta") o rodeos para proteger la imagen del usuario (*Face Preservation*), diluyendo la calidad técnica y directa de la respuesta.  
* **Ruido Teatral (*Theatrical Noise*):**
> flash: Pierde el foco actuando
Ocurre cuando se fuerza un "Rol" o "Persona" innecesaria en tareas lógicas. El modelo gasta recursos computacionales en mantener el personaje (estilo, jerga) en detrimento de la capacidad de cálculo ("budget" cognitivo), provocando errores en matemáticas o lógica pura.  
* **Verbosidad (*Yapping*):**
> flash: No se calla
Tendencia a ser excesivamente "educado" y hablador, añadiendo introducciones, conclusiones morales, advertencias y rellenos innecesarios ("Claro, aquí tienes...", "Espero haberte ayudado") que ensucian el resultado final.  
* **Pereza (*Laziness*):**
> flash: Vago
Tendencia del modelo a tomar atajos cognitivos o dar respuestas incompletas (ej. "escribe el resto del código tú") para ahorrar recursos computacionales si el prompt no le exige un estándar alto explícitamente.
* **Sobre-rechazo (*Overrefusal*):**
> flash: Miedica
El modelo asume una postura conservadora con falsos positivos. Puede negarse a responder preguntas benignas o inocuas debido a ambigüedad semántica que lo acerca a áreas "prohibidas".

#### **3\. Patologías de Memoria y Contexto (Fallo Estructural)**

Problemas físicos relacionados con la "Ventana de Contexto" (el espacio de trabajo) y cómo se procesa o almacena la información.

* **Podredumbre del Contexto (*Context Rot*):**
> flash: Basura acumulada
La degradación progresiva de la calidad de la respuesta a medida que se acumula información irrelevante, firmas de correo, datos antiguos o "ruido" en el historial de la conversación.  
* **Efecto "Lost-in-the-Middle" (Perdido en el Medio):**
> flash: Olvida el centro
La incapacidad del modelo para recuperar información situada en el centro de un prompt o documento extenso. El modelo tiene un sesgo de atención en forma de "U": recuerda bien el inicio y el final, pero olvida o ignora el contenido central.  
* **Distracción de Contexto:**
> flash: Se come la paja
Cuando la señal de las instrucciones es débil, el modelo prioriza patrones irrelevantes del texto adjunto ("paja") sobre su propio razonamiento lógico o las directrices del usuario.  
* **Choque de Contexto (*Context Clash*):**
> flash: Cruza cables
Confusión generada cuando se mezclan temas incompatibles en un mismo chat (ej. programación y cocina). El "residuo" latente de la tarea anterior sesga la interpretación de la nueva solicitud.  
* **Truncamiento Silencioso (*Silent Truncation*):**
> flash: Amnesia repentina
Cuando se supera el límite de tokens, la interfaz elimina automáticamente los mensajes más antiguos sin avisar al usuario. Esto borra datos clave del "cerebro activo" del modelo, provocando amnesia inmediata y alucinaciones por falta de contexto previo.  
* **Envenenamiento de Memoria (*Memory Poisoning*):**
> flash: Recuerdos falsos
Afecta a la Memoria Episódica (a largo plazo). Ocurre cuando el modelo guarda como "hechos" preferencias falsas o datos de pruebas "sucias" anteriores (ej. recordar que programas en un lenguaje que no usas), contaminando y sesgando futuras interacciones en nuevos chats.  
* **Hinchazón del Prompt (*Prompt Bloating*):**
> flash: Infoxicación
El uso de prompts excesivamente largos con información no curada. Esto satura el contexto, disminuye drásticamente la relación Señal/Ruido y, paradójicamente, reduce la inteligencia del modelo.
* **Truncación por Recuperación Silenciosa:**
> flash: Lee a trozos
Pérdida de completitud causada por el RAG efímero al adjuntar archivos. El sistema fragmenta el documento y solo inserta los fragmentos que considera relevantes. La respuesta parece completa, pero se basa en una versión amputada.

#### **4\. Patologías Operativas y de Evolución**

Fallos relacionados con el uso continuado, la seguridad y la naturaleza cambiante de la infraestructura tecnológica.

* **Deriva del Prompt (*Prompt Drift*):**
> flash: Se rompe solo
Fenómeno por el cual un prompt que funcionaba perfectamente deja de hacerlo o cambia su comportamiento inesperadamente debido a actualizaciones invisibles del modelo ("under the hood") por parte del proveedor.  
* **Inyección de Prompt Indirecta (*Indirect Prompt Injection*):**
> flash: Secuestro mental
Riesgo de seguridad y operativo donde datos pegados desde fuentes externas no confiables (ej. el texto de una página web o un correo electrónico) contienen instrucciones ocultas que manipulan al modelo para que ignore las directrices del usuario.
* **Bypass y Jailbreak:**
> flash: Se salta las reglas
A través de entradas adversariales rebuscadas, se rompen las barreras éticas de seguridad, permitiendo forzar el volcado de datos prohibidos o "system prompts".
* **Alucinación de Herramientas (*Tool-Use Hallucinations*):**
> flash: Tool inventada
El modelo predice falsamente requerir llamar a una herramienta y se inventa llamadas o parámetros técnicos JSON que jamás existieron ni fueron solicitados estáticamente.

***

### Sesión Clínica

**Recuerda:** Reconocer estas patologías es la mitad de la batalla en el Prompt Engineering. Cada instrucción que escribas, debe hacerlo anticipando estos síntomas para esquivarlos estructuralmente. No se trata de obligar al modelo a no equivocarse mágicamente, sino de cerrar los caminos probabilísticos que le llevan hacia estos síntomas.

