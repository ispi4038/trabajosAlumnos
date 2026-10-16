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
     repo        URL del repositorio en GitHub.
     demo        URL del juego funcionando. Si existe, la tarjeta lo puede
                 abrir en el visor embebido. Si es null, sólo se muestra el repo.

   Nota sobre el repositorio de batalla naval: el fork de la organización
   (2026-alumnos-batallaNaval) quedó vacío —sólo tiene un README—, así que
   apuntamos al repositorio real del alumno, que es el que sirve la demo.
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
    demo: 'https://luci1274.github.io/Juego_Blackjack/'
  },
  {
    titulo: 'Batalla Naval',
    alumno: 'Kucich',
    descripcion: 'Clásico hundir la flota sobre grilla: colocación de barcos, disparos y detección de impactos.',
    tecnos: ['html', 'css', 'js', 'canvas', 'dom'],
    categoria: 'canvas',
    repo: 'https://github.com/kucich/BatallaNaval',
    demo: 'https://kucich.github.io/BatallaNaval/'
  }
];
