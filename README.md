# trabajosAlumnos

Galeria de los trabajos publicados por los alumnos. **HTML + CSS + JavaScript vanilla**, sin frameworks, sin build y sin dependencias. Se sirve como sitio estatico (GitHub Pages o cualquier hosting).

## Estructura

```
index.html             Página de la galería
trabajos.json          DATOS: el catálogo de trabajos (fuente de verdad)
css/styles.css         Estilos (variables CSS, grid responsive, tema claro/oscuro)
js/trabajos.js         Hace el GET de trabajos.json y lo valida
js/app.js              Lógica: buscador, filtros, tarjetas y visor embebido
```

## Publicar un trabajo nuevo

Se toca **un solo archivo**: `trabajos.json`. Agregá un objeto al array `trabajos`:

```json
{
  "titulo": "Mi Juego",
  "alumno": "Nombre del alumno",
  "descripcion": "Qué hace el trabajo, en una o dos líneas.",
  "tecnos": ["html", "css", "js"],
  "categoria": "juegos",
  "repo": "https://github.com/ispi4038/2026-alumnos-miJuego",
  "demo": "https://usuario.github.io/MiJuego/"
}
```

Guardar, recargar y listo. No hay que tocar HTML, CSS, `app.js` ni `trabajos.js`.

- `demo` puede ser `null` (o omitirse) si el trabajo no tiene demo en vivo: la tarjeta se muestra igual, con el botón "Jugar" deshabilitado y el enlace al código.
- Las categorías se declaran en `categorias`, dentro del mismo JSON. El chip "Todos" se agrega solo, no hace falta declararlo.
- Los campos `alumno`, `descripcion` y `tecnos` son opcionales. `titulo` es obligatorio: los objetos sin título se ignoran con un aviso en consola.

### Tiene que servirse por HTTP

El catálogo se obtiene con un **GET a `trabajos.json`**, y el navegador sólo permite ese request cuando la página viene de un servidor. Por eso:

- **Funciona**: GitHub Pages, `python3 -m http.server`, cualquier hosting estático.
- **No funciona**: abrir `index.html` con doble clic (`file://`). El navegador bloquea el request por política de origen y la galería muestra un aviso en pantalla. No es un bug: es cómo funcionan los navegadores.


## Funcionalidad

- **Buscador** por título, alumno, descripción y tecnologías. Ignora mayúsculas y tildes.
- **Filtros** por categoría (chips).
- **Visor embebido**: el botón "Jugar" abre la demo en un iframe dentro de la misma página, con enlace a "abrir en pestaña nueva".
- **Tema claro/oscuro**, con preferencia guardada en `localStorage` y detección inicial del tema del sistema.
- Responsive (grid de 1 a N columnas), navegación por teclado y `Esc` para cerrar el visor.
- Estado vacío cuando la búsqueda no devuelve resultados.

## Notas sobre los trabajos cargados

- **Blackjack** — fork `ispi4038/2026-alumnos-juegoBlackjack`, con el juego completo (`index.html`, `script.js`, `style.css`). La demo sale de su propio GitHub Pages: `ispi4038.github.io/2026-alumnos-juegoBlackjack`.
- **Batalla Naval** — el enlace al repo es el fork `ispi4038/2026-alumnos-batallaNaval`, pero ese fork todavía tiene **sólo el README** (una rama, sin `gh-pages`): su Pages sirve la plantilla del README, no el juego. Por eso la demo apunta a `kucich.github.io/BatallaNaval`, que corre desde la rama `gh-pages` del repo original del alumno. Cuando el código se suba al fork, cambiar `demo` en `trabajos.json` a `https://ispi4038.github.io/2026-alumnos-batallaNaval/`.

## Probar en local

```bash
python3 -m http.server 8080
# abrir http://localhost:8080/trabajosAlumnos/
```
