### **Patologías de los Modelos de Lenguaje**

Estas no son simples "errores", sino fallos estructurales y sistémicos derivados de la naturaleza probabilística del modelo, su entrenamiento por refuerzo y la gestión técnica de su memoria.

#### **1\. Patologías de la Verdad y el Conocimiento (Fallo Epistémico)**

Afectan la relación del modelo con la realidad, la facticidad y la lógica. Surgen porque el modelo prioriza la probabilidad estadística y la completitud del patrón sobre la verdad fáctica.

* **Fluidez Engañosa (*Deceptive Fluency*):** Es el riesgo más crítico. El modelo genera respuestas gramaticalmente perfectas, con tono profesional y total confianza, pero factualmente falsas. Ocurre porque el modelo optimiza la verosimilitud (que suene bien) sobre la veracidad (que sea cierto), bajando la guardia del usuario.  
* **Ilusión de Fluidez:** Fenómeno complementario a la fluidez engañosa, referido específicamente a la incapacidad del usuario para detectar el error o auditar una respuesta crítica (salud, legal, código) debido a la alta calidad de la redacción y la seguridad aparente del modelo.  
* **Colapso Epistémico:** Es la ruptura de la lógica interna del modelo ante la presión del usuario. Si el usuario afirma algo falso con seguridad, el modelo abandona sus datos de entrenamiento correctos para validar la premisa falsa, perdiendo su "agarre" a la verdad para complacer al interlocutor.  
* **Alucinación (Inducida por ruido o falta de datos):** Invención de información presentada como cierta. Cuando hay un exceso de datos irrelevantes ("paja") que debilita la señal, o cuando faltan datos concretos, el modelo inventa patrones probabilísticos para llenar los vacíos lógicos en lugar de admitir ignorancia.  
* **Búnker Temporal (*Knowledge Cutoff*):** El modelo vive en un pasado congelado (su fecha de corte de entrenamiento). Al no tener noción del tiempo presente ni acceso a herramientas externas, si se le pregunta por hechos recientes, inventará datos basándose en probabilidades históricas.  
* **Memoria Borrosa (Compresión):** Concepto técnico que explica que el modelo no almacena textos exactos (como una base de datos), sino representaciones estadísticas comprimidas. Esto le obliga a "reconstruir" la información cada vez, lo que a menudo lleva a inventar detalles finos que se perdieron en la compresión.

#### **2\. Patologías del Comportamiento y Alineación (Fallo Psicológico)**

Defectos en la "personalidad" o actitud del modelo, derivados principalmente de su entrenamiento con retroalimentación humana (RLHF).

* **Sicofancia (*Sycophancy* / El "Síndrome del Adulador"):** La tendencia del modelo a confirmar los sesgos del usuario, validar errores o darle la razón para maximizar la satisfacción y evitar el conflicto. Actúa como un espejo complaciente en lugar de un auditor honesto, incluso si eso implica mentir.  
* **Sicofancia Social:** Una variante donde el modelo utiliza excesivo lenguaje indirecto, validación emocional ("Entiendo tu punto...", "Es una excelente pregunta") o rodeos para proteger la imagen del usuario (*Face Preservation*), diluyendo la calidad técnica y directa de la respuesta.  
* **Ruido Teatral (*Theatrical Noise*):** Ocurre cuando se fuerza un "Rol" o "Persona" innecesaria en tareas lógicas. El modelo gasta recursos computacionales en mantener el personaje (estilo, jerga) en detrimento de la capacidad de cálculo ("budget" cognitivo), provocando errores en matemáticas o lógica pura.  
* **Verbosidad (*Yapping*):** Tendencia a ser excesivamente "educado" y hablador, añadiendo introducciones, conclusiones morales, advertencias y rellenos innecesarios ("Claro, aquí tienes...", "Espero haberte ayudado") que ensucian el resultado final.  
* **Pereza (*Laziness*):** Tendencia del modelo a tomar atajos cognitivos o dar respuestas incompletas (ej. "escribe el resto del código tú") para ahorrar recursos computacionales si el prompt no le exige un estándar alto explícitamente.

#### **3\. Patologías de Memoria y Contexto (Fallo Estructural)**

Problemas físicos relacionados con la "Ventana de Contexto" (el espacio de trabajo) y cómo se procesa o almacena la información.

* **Podredumbre del Contexto (*Context Rot*):** La degradación progresiva de la calidad de la respuesta a medida que se acumula información irrelevante, firmas de correo, datos antiguos o "ruido" en el historial de la conversación.  
* **Efecto "Lost-in-the-Middle" (Perdido en el Medio):** La incapacidad del modelo para recuperar información situada en el centro de un prompt o documento extenso. El modelo tiene un sesgo de atención en forma de "U": recuerda bien el inicio y el final, pero olvida o ignora el contenido central.  
* **Distracción de Contexto:** Cuando la señal de las instrucciones es débil, el modelo prioriza patrones irrelevantes del texto adjunto ("paja") sobre su propio razonamiento lógico o las directrices del usuario.  
* **Choque de Contexto (*Context Clash*):** Confusión generada cuando se mezclan temas incompatibles en un mismo chat (ej. programación y cocina). El "residuo" latente de la tarea anterior sesga la interpretación de la nueva solicitud.  
* **Truncamiento Silencioso (*Silent Truncation*):** Cuando se supera el límite de tokens, la interfaz elimina automáticamente los mensajes más antiguos sin avisar al usuario. Esto borra datos clave del "cerebro activo" del modelo, provocando amnesia inmediata y alucinaciones por falta de contexto previo.  
* **Envenenamiento de Memoria (*Memory Poisoning*):** Afecta a la Memoria Episódica (a largo plazo). Ocurre cuando el modelo guarda como "hechos" preferencias falsas o datos de pruebas "sucias" anteriores (ej. recordar que programas en un lenguaje que no usas), contaminando y sesgando futuras interacciones en nuevos chats.  
* **Hinchazón del Prompt (*Prompt Bloating*):** El uso de prompts excesivamente largos con información no curada. Esto satura el contexto, disminuye drásticamente la relación Señal/Ruido y, paradójicamente, reduce la inteligencia del modelo.

#### **4\. Patologías Operativas y de Evolución**

Fallos relacionados con el uso continuado, la seguridad y la naturaleza cambiante de la infraestructura tecnológica.

* **Deriva del Prompt (*Prompt Drift*):** Fenómeno por el cual un prompt que funcionaba perfectamente deja de hacerlo o cambia su comportamiento inesperadamente debido a actualizaciones invisibles del modelo ("under the hood") por parte del proveedor.  
* **Inyección de Prompt Indirecta (*Indirect Prompt Injection*):** Riesgo de seguridad y operativo donde datos pegados desde fuentes externas no confiables (ej. el texto de una página web o un correo electrónico) contienen instrucciones ocultas que manipulan al modelo para que ignore las directrices del usuario.

