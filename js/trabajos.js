/* =========================================================================
   CARGA DEL CATÁLOGO
   -------------------------------------------------------------------------
   La ÚNICA fuente de datos es trabajos.json, pedido por GET.

   Este archivo NO contiene datos ni respaldos: hace el request y deja el
   resultado validado en window.CATALOGO.

   Cómo publicar un trabajo nuevo:
     1. Editá trabajos.json (en el servidor).
     2. Recargá la página. No hay que tocar HTML, CSS ni JS.

   IMPORTANTE: el catálogo se obtiene por HTTP, así que la galería tiene que
   servirse por HTTP (o HTTPS). Abrir index.html con doble clic (file://) NO
   funciona: el navegador bloquea el request por política de origen y la
   página muestra un aviso en pantalla.
   ========================================================================= */

(function () {
  'use strict';

  /* Ruta del catálogo, relativa a index.html. */
  const RUTA_CATALOGO = 'trabajos.json';

  /* Valida que el catálogo tenga la forma esperada y normaliza campos. */
  function normalizar(datos) {
    if (!datos || typeof datos !== 'object') {
      console.error('[catálogo] la respuesta no es un objeto JSON.');
      return null;
    }

    const trabajos = Array.isArray(datos.trabajos) ? datos.trabajos : null;
    if (!trabajos) {
      console.error('[catálogo] falta el array "trabajos".');
      return null;
    }

    const categorias = Array.isArray(datos.categorias) ? datos.categorias : [];

    return {
      // "Todos" es implícito: no hace falta declararlo en el JSON.
      categorias: [{ id: 'todos', nombre: 'Todos' }, ...categorias],
      trabajos: trabajos
        .filter((t) => t && typeof t === 'object' && t.titulo)
        .map((t) => ({
          titulo: t.titulo,
          alumno: t.alumno || '',
          descripcion: t.descripcion || '',
          tecnos: Array.isArray(t.tecnos) ? t.tecnos : [],
          categoria: t.categoria || 'otros',
          repo: t.repo || '',
          demo: t.demo || null
        }))
    };
  }

  /* GET del catálogo. Devuelve el catálogo normalizado o null. */
  async function cargar() {
    // file:// bloquea el request: se corta acá con un motivo claro.
    if (location.protocol === 'file:') {
      console.error(
        '[catálogo] el catálogo se pide por HTTP y file:// lo bloquea.\n' +
        'Serví la carpeta por HTTP, por ejemplo:\n' +
        '    python3 -m http.server 8000\n' +
        'y abrí http://localhost:8000/trabajosAlumnos/'
      );
      return null;
    }

    try {
      const resp = await fetch(RUTA_CATALOGO, {
        method: 'GET',
        cache: 'no-cache',
        headers: { Accept: 'application/json' }
      });

      if (!resp.ok) throw new Error('HTTP ' + resp.status);

      const crudo = await resp.json();
      const datos = normalizar(crudo);
      if (!datos) throw new Error('estructura inválida');

      return datos;
    } catch (err) {
      console.error('[catálogo] falló el GET de ' + RUTA_CATALOGO + ':', err);
      return null;
    }
  }

  // app.js espera esta promesa.
  window.CATALOGO = cargar();
})();
