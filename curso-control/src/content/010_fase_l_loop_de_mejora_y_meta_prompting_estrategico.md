## L — LOOP DE MEJORA

**Idea clave:** la primera respuesta casi nunca es la definitiva.

Usar bien la inteligencia artificial no consiste en acertar a la primera, sino en **mejorar el resultado poco a poco**. Esta fase te enseña a convertir una respuesta inicial en una versión final clara, útil y fiable.

---

## 1. Pide una segunda versión con cambios concretos

Cuando una respuesta no te convence del todo, no la descartes. Pide una nueva versión indicando qué debe cambiar.

Ejemplos:

- “Reescribe la respuesta de forma más corta (máx. 7 líneas).”
- “Mantén el contenido, pero hazlo más claro y directo.”
- “Cambia el tono a profesional y usa viñetas.”
- “Añade 2 ejemplos prácticos.”

---

## 2. Haz que la IA se revise a sí misma

Puedes pedirle a la IA que revise y mejore su propia respuesta antes de usarla.

Prompt modelo:

> Revisa tu respuesta anterior con estas reglas: claridad, formato correcto y ausencia de errores. Señala brevemente qué mejorarías y luego dame la versión final corregida.

---

## 3. Compara dos versiones y elige la mejor (A/B)

Pedir dos versiones distintas te ayuda a elegir la que mejor encaja con tu objetivo.

Ejemplo:

> Dame dos versiones del mismo contenido:
>
> - Versión A: muy sencilla, para principiantes.
> - Versión B: más profesional, lista para enviar.
>   No añadas explicaciones.

---

## 4. Si el resultado es malo, reescribe la pregunta

A veces el problema no es la respuesta, sino la forma en la que hiciste la pregunta.

Regla práctica:

- Si la respuesta sale mal, **no discutas** durante muchos mensajes.
- Reescribe el prompt con más detalle (edita el prompt anterior en vez de volver a escribirlo en  y nuevo mensaje) vuelve a lanzarlo.

---

## 5. Higiene de Sesión y Mitigación de la Deriva del Prompt (Prompt Drift)

A medida que una conversación se alarga, el modelo sufre de **Deriva del Prompt**: empieza a olvidar las instrucciones iniciales de rigor y formato, y su comportamiento se degrada o se vuelve caótico. 

Cuando la conversación "se nos va de madre", aplicar más parches no sirve. Sigue este protocolo de poda y reinicio:

1. **Poda Correctiva (Retrasar el reloj):** No le digas al modelo "Te has equivocado, vuelve a intentar". Sube por el historial de chat, localiza tu *última petición correcta* (justo antes de que el modelo diera la primera respuesta errónea), edita ese mensaje, ajusta la instrucción y vuelve a lanzarlo. Esto borra la "rama mala" del historial temporal del modelo.
2. **Resumen de Seguridad:** Si la conversación ya ha avanzado mucho y hay datos críticos diseminados en múltiples mensajes, pide un resumen concentrado:  
   *Prompt:* "Quiero cerrar esta sesión. Genera un resumen ejecutivo de un párrafo con los acuerdos finales, datos clave y código final que hemos logrado hasta ahora, sin introducciones ni explicaciones".
3. **Reinicio Clínico (Reset de Contexto):** Lee el resumen generado. Si todo cuadra, abre una **nueva sesión de chat** y pega ese resumen como punto de partida ("fuente de verdad"). Así inicias con el contexto completamente limpio, libre del ruido y la deriva probabilística de los intentos fallidos de la sesión anterior.

---

## 6. Mini‑checklist antes de copiar y pegar

Antes de usar una respuesta, comprueba:

- **¿Es información actual?** → Pide que busque y cite fuentes fiables.
- **¿Sale de un documento?** → Adjunta el archivo y pide que cite el fragmento exacto.
- **¿Es importante o sensible?** → Aquí hablamos de casos donde un error te puede costar dinero, meterte en un lío o causar un daño (por ejemplo: temas de salud, legales, decisiones económicas o instrucciones técnicas que vayas a aplicar tal cual).

  En estos casos, **no basta con que la IA cite una fuente o un documento**. La verificación final es responsabilidad del usuario. La IA puede ayudarte, pero no sustituye tu comprobación.

  Pídele a la IA que:
  1) **Te diga los riesgos y supuestos** (qué partes podrían estar mal o depender de tu caso concreto).
  2) **Te indique exactamente qué debes verificar tú** (qué fuente abrir, qué parte leer, qué dato confirmar).
  3) **Te haga preguntas si falta información**, en lugar de asumir o inventar.

  Prompts ejemplo (copiables):
  - “Antes de dar la respuesta final, dime 3 riesgos o puntos donde puedes equivocarte y qué debería comprobar yo.”
  - “Indica exactamente qué partes debo verificar en la fuente o documento y por qué.”
  - “Si esto implica salud/legal/dinero, dime cómo contrastarlo con una fuente oficial o con un profesional.””

---

## Resumen rápido

- La primera respuesta es un borrador.
- Pide revisiones concretas.
- Compara versiones si dudas.
- Si algo falla, mejora la pregunta.
- Revisa antes de copiar y pegar.

Con este bucle sencillo, la IA deja de ser un generador de texto y pasa a ser **una herramienta de mejora continua**.
