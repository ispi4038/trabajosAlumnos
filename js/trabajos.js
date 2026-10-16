/* =========================================================================
   DATOS DE LA GALERÍA
   -------------------------------------------------------------------------
   Para publicar un trabajo nuevo, agregá un objeto a este array.
   No hace falta tocar ningún otro archivo.

   Campos:
     titulo      (obligatorio) Nombre del trabajo.
     alumno      Quién o quiénes lo hicieron.
     descripcion Texto corto que se muestra en la tarjeta.
     tecnos      Etiquetas libres, en minúscula (html, css, js, canvas, poo…).
                 Se usan para el buscador y los filtros.
     categoria   Categoría principal. Ver CATEGORIAS abajo.
     repo        URL del repositorio en GitHub. Todos apuntan a los forks de
                 la organización ispi4038 (2026-alumnos-*).
     demo        URL del juego funcionando. Si existe, la tarjeta lo puede
                 abrir en el visor embebido. Si es null, sólo se muestra el repo.

   Ojo con la demo de Batalla Naval: el fork 2026-alumnos-batallaNaval todavía
   tiene sólo el README (una rama, sin gh-pages), así que su GitHub Pages sirve
   la plantilla del README y no el juego. El juego corre en la rama gh-pages del
   repo original del alumno. Cuando se suba el código al fork, cambiar la demo a
   https://ispi4038.github.io/2026-alumnos-batallaNaval/
   ========================================================================= */

const CATEGORIAS = [
  { id: 'todos',    nombre: 'Todos' },
  { id: 'juegos',   nombre: 'Juegos' },
  { id: 'canvas',   nombre: 'Canvas' },
  { id: 'logica',   nombre: 'Lógica' }
];

const TRABAJOS = [
  {
    titulo: 'Blackjack',
    alumno: 'Luciana',
    descripcion: 'Juego de cartas completo: reparto, puntajes, apuestas y ranking. Incluye modales propios y estado de partida.',
    tecnos: ['html', 'css', 'js', 'poo', 'dom'],
    categoria: 'juegos',
    repo: 'https://github.com/ispi4038/2026-alumnos-juegoBlackjack',
    demo: 'https://ispi4038.github.io/2026-alumnos-juegoBlackjack/'
  },
  {
    titulo: 'Batalla Naval',
    alumno: 'Kucich',
    descripcion: 'Clásico hundir la flota sobre grilla: colocación de barcos, disparos y detección de impactos.',
    tecnos: ['html', 'css', 'js', 'canvas', 'dom'],
    categoria: 'canvas',
    repo: 'https://github.com/ispi4038/2026-alumnos-batallaNaval',
    demo: 'https://kucich.github.io/BatallaNaval/'
  }
];
