# trabajosAlumnos

Galería de los trabajos publicados por los alumnos. **HTML + CSS + JavaScript vanilla**, sin frameworks, sin build y sin dependencias: se abre directamente con doble clic en `index.html` o se sirve como sitio estático (GitHub Pages).

## Estructura

```
index.html          Página de la galería
css/styles.css      Estilos (variables CSS, grid responsive, tema claro/oscuro)
js/trabajos.js      DATOS: el listado de trabajos
js/app.js           Lógica: buscador, filtros, tarjetas y visor embebido
```

## Publicar un trabajo nuevo

Se toca **un solo archivo**: `js/trabajos.js`. Agregá un objeto al array `TRABAJOS`:

```js
{
  titulo: 'Mi Juego',
  alumno: 'Nombre del alumno',
  descripcion: 'Qué hace el trabajo, en una o dos líneas.',
  tecnos: ['html', 'css', 'js'],   // etiquetas para el buscador
  categoria: 'juegos',             // ver CATEGORIAS en el mismo archivo
  repo: 'https://github.com/ispi4038/2026-alumnos-miJuego',
  demo: 'https://usuario.github.io/MiJuego/'   // o null si no hay demo
}
```

Guardar, recargar y listo. No hay que tocar HTML, CSS ni `app.js`.

Un trabajo **sin `demo`** se muestra igual, con el botón "Jugar" deshabilitado y sólo el enlace al código.

## Funcionalidad

- **Buscador** por título, alumno, descripción y tecnologías. Ignora mayúsculas y tildes.
- **Filtros** por categoría (chips).
- **Visor embebido**: el botón "Jugar" abre la demo en un iframe dentro de la misma página, con enlace a "abrir en pestaña nueva".
- **Tema claro/oscuro**, con preferencia guardada en `localStorage` y detección inicial del tema del sistema.
- Responsive (grid de 1 a N columnas), navegación por teclado y `Esc` para cerrar el visor.
- Estado vacío cuando la búsqueda no devuelve resultados.

## Notas sobre los trabajos cargados

- **Blackjack** — `ispi4038/2026-alumnos-juegoBlackjack`, demo en `luci1274.github.io/Juego_Blackjack`. El repositorio de la organización contiene el juego completo (`index.html`, `script.js`, `style.css`).
- **Batalla Naval** — el fork de la organización `ispi4038/2026-alumnos-batallaNaval` quedó **vacío** (sólo `README.md`, sin código), así que la tarjeta apunta al repositorio real del alumno, que es el que sirve la demo en `kucich.github.io/BatallaNaval`.

## Probar en local

```bash
python3 -m http.server 8080
# http://localhost:8080
```

> Abrir `index.html` con `file://` también funciona. Conviene servirlo por HTTP para que los iframes de las demos carguen sin restricciones del navegador.
