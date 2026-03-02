# Fase T: Tutela del razonamiento

## Cómo controlar profundidad, estrategia y coherencia del pensamiento del modelo


La Fase T se centra en una sola función: **orientar el razonamiento del modelo** cuando la tarea lo requiere.

En modelos razonadores modernos, no suele hacer falta dirigir cada paso desde el inicio.  
Lo más eficaz es **usar el control de esfuerzo de pensamiento del chat** (cuando la tarea lo requiera) y, solo si hace falta, añadir una guía de razonamiento más estructurada.

## Principio operativo
En modelos razonadores, la regla general es:

- **Primero**: ajusta el esfuerzo de pensamiento desde la interfaz del chat según la dificultad.
- **Después**: deja que el modelo responda con su estrategia interna.
- **Solo si hace falta**: añade andamiaje de razonamiento en el prompt.

La Fase T interviene para ajustar:
1. **Grado de libertad** (libre vs guiado)
2. **Estrategia cognitiva** (descomponer, comparar rutas, revisar supuestos)
3. **Autochequeo lógico** (consistencia interna antes de concluir)

---

## 1) Configura el esfuerzo de pensamiento en la interfaz (antes del prompt)
Usa el control de esfuerzo del chat para regular la profundidad del razonamiento sin recargar el prompt.

**Regla práctica**
- **Tareas simples** → esfuerzo bajo/estándar
- **Tareas complejas** → esfuerzo alto
- **Tareas críticas** → esfuerzo alto + revisión posterior

Así evitas meter en el prompt instrucciones redundantes como “piensa más” o “piensa con extremo cuidado”.

---

## 2) Libertad de proceso por defecto (modo recomendado)
En modelos razonadores, evita empezar con secuencias rígidas.

En lugar de imponer pasos exactos, usa instrucciones de razonamiento de alto nivel:

- “Elige la mejor ruta lógica para resolver el problema.”
- “Si hay ambigüedad, evalúa más de una interpretación.”
- “Prioriza un análisis sólido antes de concluir.”

### Cuándo usar este modo (razonamiento libre por defecto)

Este modo es el punto de partida recomendado siempre que **no exista un único camino correcto** o cuando el valor esté en la calidad del razonamiento, no en seguir un protocolo rígido.

Úsalo especialmente cuando:

- **Análisis**  
  Necesitas comprender una situación, detectar patrones, identificar causas o evaluar implicaciones sin forzar conclusiones prematuras.

- **Diseño**  
  Buscas soluciones, estructuras o propuestas donde hay espacio para creatividad, trade-offs y decisiones justificadas, no recetas cerradas.

- **Resolución de problemas abiertos**  
  El problema no está completamente definido, los datos son incompletos o pueden interpretarse de varias formas razonables.

- **Tareas con varias rutas válidas**  
  Existen distintos enfoques posibles y lo importante es que el modelo **elija y justifique** la mejor opción, no que siga un camino impuesto.

En estos casos, **dar libertad controlada al modelo** suele producir mejores resultados que imponer pasos desde el inicio.  
La tutela empieza ligera y solo se refuerza si el razonamiento se queda corto, se dispersa o pierde rigor.

---

## 3) Andamiaje de razonamiento (solo cuando proceda)
Si el modelo responde de forma superficial, salta pasos o concluye demasiado pronto, entonces sí puedes guiar el razonamiento.

### 3.1. Descomposición (cuando el problema es complejo)
Pide que divida el problema en partes manejables.

**Patrón útil**
- “Descompón el problema en subproblemas y resuélvelos antes de concluir.”

### Útil para

Este enfoque es especialmente adecuado cuando el problema **exige rigor, orden y control de dependencias**, y una respuesta superficial o directa puede llevar a errores.

- **Lógica**  
  Cuando el razonamiento debe seguir una cadena coherente de inferencias, donde un fallo en un paso invalida el resultado final.

- **Cálculo**  
  En tareas donde los resultados dependen de operaciones intermedias correctas y no se puede “saltar” directamente a la conclusión.

- **Análisis técnico**  
  Para descomponer sistemas, procesos o arquitecturas complejas en partes comprensibles y verificables.

- **Decisiones con dependencias**  
  Cuando una elección condiciona las siguientes y es necesario resolver cada etapa antes de avanzar a la siguiente.

En estos casos, la descomposición explícita reduce errores, evita atajos injustificados y mejora la fiabilidad del resultado.

---

### 3.2. Exploración de alternativas (cuando hay varias rutas posibles)
Pide que compare rutas antes de elegir.

**Patrón útil**
- “Genera 2 o 3 enfoques posibles, compara sus ventajas y elige el más sólido.”

### Útil para

Este enfoque resulta especialmente eficaz cuando **no hay una única solución evidente** y el valor está en comparar opciones antes de decidir.

- **Estrategia**  
  Para evaluar distintos cursos de acción, analizar ventajas e inconvenientes y elegir la opción más sólida según el contexto.

- **Arquitectura**  
  Cuando existen varias formas válidas de estructurar un sistema y es necesario contrastar trade-offs, riesgos y escalabilidad.

- **Debugging**  
  Para generar hipótesis alternativas sobre el origen de un problema, contrastarlas y descartar las menos probables antes de intervenir.

- **Planificación**  
  En escenarios donde hay múltiples caminos posibles y conviene comparar enfoques antes de comprometer recursos o tiempo.

En estos casos, forzar la comparación explícita de alternativas mejora la calidad de la decisión y reduce soluciones frágiles o precipitadas.

---

### 3.3. Secuencia explícita (orden y cobertura del razonamiento)

Los modelos razonadores siguen pasos internos, pero no garantizan cubrir todas las fases relevantes para un problema concreto.  
Algunas etapas clave pueden omitirse si no se solicitan de forma explícita.

La secuencia explícita sirve para forzar tanto el orden como la presencia de pasos críticos.

**Cuándo aplicarla**
- Existe una fase imprescindible que no puede asumirse (revisión, contraste, evaluación de riesgos, verificación)
- El modelo resuelve el problema, pero se salta etapas intermedias
- El dominio exige comprobar algo antes de decidir o concluir

**Qué es una secuencia explícita**

Una lista cerrada de fases obligatorias que el razonamiento debe recorrer.

No solo se fija el orden:  
se declaran pasos que deben existir, aunque el modelo no los generaría espontáneamente.

**Ejemplo:**

Observa datos → Revisa contexto → Genera opciones → Evalúa riesgos → Ejecuta → Verifica → Argumenta

Si una fase no está en la secuencia, puede no aparecer.

**Cómo se indica en el prompt**

Debe quedar claro que todas las fases son obligatorias.

**Patrón recomendado:**

Razona siguiendo estrictamente estas fases, sin omitir ninguna…

**O en versión compacta:**

Aplica tu razonamiento recorriendo obligatoriamente esta secuencia: …

**Efecto esperado**
- Se introducen pasos que el modelo tiende a omitir
- Se evita razonamiento incompleto
- Se garantiza cobertura mínima del proceso

**Advertencia**

Añadir fases innecesarias introduce ruido y rigidez.  
Incluye solo pasos realmente imprescindibles para el problema.

---

## 4) Autochequeo lógico (dentro de la Fase T)
La Fase T puede incluir una revisión breve del razonamiento en el plano lógico interno.

Esto sirve para que el modelo:
- detecte saltos no justificados
- revise supuestos implícitos
- compruebe coherencia entre análisis y conclusión

**Patrones útiles**
- “Antes de cerrar, revisa si has asumido algo sin base.”
- “Comprueba que la conclusión se deriva de tu análisis.”
- “Si hay una inferencia débil, señálala.”

> Este autochequeo es de **consistencia lógica**.

---

## 5) Escalera de intervención de la Fase T
Usa esta escalera para no sobrecargar el prompt:

1. **Ajusta el esfuerzo de pensamiento en la interfaz**
2. **Razonamiento libre** (alto nivel)
3. **Descomposición** (si la tarea lo pide)
4. **Exploración de alternativas** (si hay varias rutas)
5. **Secuencia explícita** (solo rescate o protocolo)
6. **Autochequeo lógico** (antes de concluir)

---

## 6) Mini plantillas de Fase T (listas para usar)

### Plantilla T — Modo libre (por defecto)
```text
FASE T (Razonamiento):
Elige la mejor ruta lógica para resolver el problema.
Si hay ambigüedad, compara enfoques antes de concluir.
Prioriza un análisis sólido antes de cerrar.
Antes de responder, revisa si tu conclusión encaja con tu análisis.
```

### Plantilla T — Modo guiado (si el intento libre falla)
```text
FASE T (Razonamiento):
Descompón el problema en partes.
Resuelve cada parte.
Compara al menos dos enfoques si hay alternativas.
Luego integra todo en una conclusión coherente.
Antes de cerrar, revisa supuestos y posibles saltos lógicos.
```

### Plantilla T — Modo protocolo (orden obligatorio)
```text
FASE T (Razonamiento):
Razona siguiendo estrictamente estas fases, sin omitir ninguna:
1) Observa los datos
2) Desglosa el problema
3) Ejecuta la resolución
4) Revisa coherencia y supuestos
5) Cierra con conclusión
```

---

## Resumen de uso de la Fase T (qué hacer primero y qué añadir después)

La Fase T se aplica por capas.  
No se empieza por lo más complejo: se empieza por lo mínimo necesario y se añade rigor solo si hace falta.

**Nivel básico (primera intervención)**
1. Ajustar el esfuerzo de pensamiento en la interfaz del chat según la dificultad.
2. Dejar libertad de proceso al modelo con una instrucción de alto nivel.
3. Añadir un autochequeo lógico breve antes de concluir.

**Nivel avanzado (si el resultado no alcanza el nivel esperado)**
1. Añadir descomposición del problema.
2. Añadir exploración de alternativas.
3. Añadir secuencia explícita de fases obligatorias (solo cuando haga falta cobertura u orden).

**Orden recomendado**
- Primero: control de esfuerzo (interfaz)
- Después: razonamiento libre
- Luego: capas de guía (descomposición, alternativas, secuencia)
- Al final: autochequeo lógico

**Regla de iteración**
Si la respuesta sale incompleta, superficial o se salta pasos, no rehagas todo el prompt:  
**añade una sola capa de razonamiento** y vuelve a probar.  
Si sigue fallando, añade la siguiente capa.

## 7) Regla final para la Fase T
Primero usa el **control de esfuerzo de pensamiento del chat**.  
Después, solo si hace falta, añade una guía de razonamiento en el prompt.

La Fase T no consiste en “dar más instrucciones”, sino en **dar la guía justa** para que el modelo razone con rigor.
