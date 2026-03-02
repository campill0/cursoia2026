# Cómo funciona realmente un modelo de lenguaje (LLM)

*(y por qué tiene límites desde su propio diseño)*

## Idea clave antes de empezar

Un modelo de lenguaje **no piensa**, **no sabe** y **no entiende** como una persona.

Lo único que hace es esto:

> Dado un texto previo, **calcula qué fragmento de texto es más probable que venga después**.

Todo lo demás —respuestas coherentes, tono profesional, explicaciones largas, incluso errores convincentes— **emerge de ese mecanismo**.

Entender esto es esencial para aprender a escribir mejores prompts **y para no frustrarse con sus límites**.

---

## 1. Todo empieza con texto… solo texto

Cuando escribes una pregunta y pulsas Enter, para el modelo **no hay una pregunta**.

Solo hay:

- letras
- espacios
- signos

No existe aún:

- intención
- significado
- verdad
- contexto humano

Eso vendrá después, si viene.

---

## 2. El texto se rompe en piezas (tokens)

El modelo no trabaja con palabras completas.

Primero, el texto se divide en **tokens**: fragmentos frecuentes del lenguaje aprendidos por estadística.

Un token puede ser:

- una palabra entera
- parte de una palabra
- un prefijo
- un signo
- incluso un espacio

Ejemplo simplificado:

> “¿Cuál es la capital de España?”

Se convierte en algo parecido a:

```
¿ | Cu | ál |  es |  la |  cap | ital |  de |  Esp | aña | ?
```

A partir de aquí ocurre algo importante:

👉 **El modelo deja de ver texto. Solo ve números.**

Cada token se convierte en un número interno.

---

## 3. Los números se convierten en vectores (embeddings)

Cada token-numero se transforma en un **vector matemático**.

Un embedding:

- no es una definición
- no es una ficha de Wikipedia
- no guarda hechos

Es simplemente una **posición en un espacio matemático** donde:

- tokens que suelen aparecer en contextos similares están “cerca”
- tokens que no, están “lejos”

Aquí aparece una limitación clave:

> El modelo **no almacena información exacta**, sino **patrones comprimidos**

---

## 4. El modelo necesita orden (posición)

“Perro muerde hombre”\
“Hombre muerde perro”

Mismas palabras. Significado opuesto.

Para evitar confusiones, el modelo añade información de **posición** a cada token.

Así sabe qué va antes y qué va después.

---

## 4.1 La ventana de contexto: el espacio de trabajo del modelo

Hasta ahora hemos hablado de *qué* se procesa. Falta una pieza clave: **cuánto puede procesar a la vez**.

Un LLM no ve toda la conversación completa ni “recuerda todo lo anterior”. Trabaja dentro de una **ventana de contexto**: un espacio limitado donde caben

- tu pregunta actual
- partes de instrucciones persistentes
- fragmentos recuperados de memoria o herramientas
- y, finalmente, la respuesta que se está generando

Todo lo que entra en esa ventana se convierte en **tokens dentro de una única secuencia**

### Qué implica esto

- No todo pesa igual: el inicio y el final suelen tener más influencia que el centro.
- Si entra demasiada información irrelevante, la señal importante se diluye.
- Cuando algo queda fuera de la ventana, **para el modelo deja de existir**.

El modelo no decide esto de forma consciente. Es una **limitación física del sistema**.

Este concepto será clave más adelante para entender por qué:

- a veces ignora instrucciones
- a veces “olvida” cosas ya dichas
- y a veces responde bien… hasta que deja de hacerlo

---

---

## 5. El núcleo: el Transformer

Ahora entra en juego el corazón del sistema.

El modelo procesa **todo el texto a la vez**, capa tras capa, usando siempre dos pasos combinados.

---

### 5.1 Atención: decidir qué importa

La **auto-atención** permite que cada fragmento del texto:

- mire al resto
- decida qué partes son relevantes
- ignore lo que no lo es

No razona
No entiende

Solo **pondera influencias**.

Ejemplo intuitivo:

- si aparece “capital de España”
- el token “España” hará que “Madrid” gane peso frente a otras ciudades

La atención:

- **no crea conocimiento**
- solo selecciona información del contexto

---

### 5.2 Transformación (MLP): qué hacer con la información

Después, cada token pasa por una red neuronal (MLP) que:

- toma la información que la atención ha seleccionado  
- la transforma para reforzar o debilitar patrones  
- empuja el resultado hacia lo que suele “funcionar” en el lenguaje  

Aquí el modelo:

- no comprueba hechos  
- no valida con la realidad  
- no detecta contradicciones como un humano  

Solo ajusta números para que el patrón **“suene bien”** según lo aprendido.


La atención decide de dónde viene la información; el MLP decide qué hacer con ella.

---

### Clave importante

En cada capa ocurre siempre lo mismo:

- **Atención** → qué partes del contexto importan
- **Transformación** → cómo combinar eso

Esto se repite muchas veces.

---

## 6. El modelo llega a una conclusión interna

Tras todas las capas, el modelo no tiene una respuesta.

Tiene algo así como:

> “Dado todo lo anterior… ¿qué token debería venir ahora?”

Es un **estado matemático**, no una idea.

---

## 7. De números a opciones posibles

Ese estado se compara con **todo el vocabulario** del modelo.

El resultado es una lista enorme de números:

- uno por cada token posible.

Esto no son probabilidades todavía. Son **puntuaciones brutas**.

---

## 8. Se convierten en probabilidades

Una función matemática convierte esas puntuaciones en algo como:

- “Madrid” → 72%
- “Barcelona” → 8%
- otros → porcentajes pequeños

Aquí aparece una limitación fundamental:

👉 **El modelo elige lo más probable, no lo más verdadero.**

Probabilidad ≠ verdad.

---

## 9. Elegir el siguiente token

Según la configuración:

- puede elegir siempre el más probable
- o introducir variación controlada

Pero siempre ocurre esto:

> **se elige un token, no una idea completa**

---

## 10. El token se añade… y todo vuelve a empezar

El token elegido:

- se añade al texto
- pasa a formar parte del contexto
- condiciona el siguiente paso

El modelo repite el proceso:

token a token

Esto se llama **generación autoregresiva**.

---



---

## 11. El proceso se repite hasta parar

El ciclo continúa hasta que:

- se alcanza un final
- se llega a un límite
- o el sistema lo detiene

---

## 12. Los tokens vuelven a ser texto

Al final:

- los fragmentos se recomponen
- aparecen palabras, frases y párrafos
- el usuario ve una respuesta fluida

Si se muestran poco a poco, parece que “está pensando”.

No lo está.

---

## Idea clave para el siguiente módulo

Un LLM **no falla porque sea torpe**.\
Falla porque:

- trabaja con **probabilidades**
- reconstruye información **comprimida**
- prioriza **fluidez y coherencia** sobre verdad
- depende totalmente del **contexto que le das**
- y no puede distinguir por sí mismo entre:
  - una buena señal
  - y ruido bien escrito

Las *patologías* que veremos después **no son bugs accidentales**\
Son **consecuencias directas** de este funcionamiento

Entender esto es el primer paso para:

- escribir mejores prompts
- detectar errores
- y usar un LLM con criterio, no con fe

