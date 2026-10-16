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

- **Blackjack** — fork `ispi4038/2026-alumnos-juegoBlackjack`, con el juego completo (`index.html`, `script.js`, `style.css`). La demo sale de su propio GitHub Pages: `ispi4038.github.io/2026-alumnos-juegoBlackjack`.
- **Batalla Naval** — el enlace al repo es el fork `ispi4038/2026-alumnos-batallaNaval`, pero ese fork todavía tiene **sólo el README** (una rama, sin `gh-pages`): su Pages sirve la plantilla del README, no el juego. Por eso la demo apunta a `kucich.github.io/BatallaNaval`, que corre desde la rama `gh-pages` del repo original del alumno. Cuando el código se suba al fork, cambiar `demo` en `js/trabajos.js` a `https://ispi4038.github.io/2026-alumnos-batallaNaval/`.

## Probar en local

```bash
python3 -m http.server 8080
# http://localhost:8080
```

> Abrir `index.html` con `file://` también funciona. Conviene servirlo por HTTP para que los iframes de las demos carguen sin restricciones del navegador.
