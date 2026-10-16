/* =========================================================================
   GALERÍA DE TRABAJOS — lógica de la interfaz
   JavaScript vanilla, sin dependencias.

   Lee los datos desde TRABAJOS / CATEGORIAS (js/trabajos.js) y arma:
     - las tarjetas del grid,
     - el buscador (título, alumno, descripción y tecnologías),
     - los filtros por categoría,
     - el visor embebido (iframe) con la demo en vivo,
     - el tema claro/oscuro.
   ========================================================================= */

(function () {
  'use strict';

  /* ---------- Referencias del DOM ---------- */
  const $grid       = document.getElementById('grid');
  const $vacio      = document.getElementById('vacio');
  const $resultados = document.getElementById('resultados');
  const $filtros    = document.getElementById('filtros');
  const $q          = document.getElementById('q');
  const $clearQ     = document.getElementById('clear-q');
  const $reset      = document.getElementById('reset-filtros');
  const $themeBtn   = document.getElementById('theme-toggle');

  const $modal     = document.getElementById('modal');
  const $frame     = document.getElementById('modal-frame');
  const $loading   = document.getElementById('modal-loading');
  const $mTitle    = document.getElementById('modal-title');
  const $mSub      = document.getElementById('modal-sub');
  const $mOpen     = document.getElementById('modal-open');
  const $mClose    = document.getElementById('modal-close');

  /* ---------- Estado ---------- */
  const estado = { texto: '', categoria: 'todos' };
  let ultimoFoco = null;
  let cargandoTimer = null;

  /* ---------- Utilidades ---------- */
  const normalizar = (s) =>
    String(s ?? '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, ''); // saca acentos para buscar sin tildes

  const escapar = (s) =>
    String(s ?? '').replace(/[&<>"']/g, (c) => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));

  const iniciales = (texto) =>
    normalizar(texto)
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0].toUpperCase())
      .join('');

  const nombreCategoria = (id) =>
    (CATEGORIAS.find((c) => c.id === id) || {}).nombre || id;

  /* ---------- Filtrado ---------- */
  function filtrar() {
    const q = normalizar(estado.texto).trim();

    return TRABAJOS.filter((t) => {
      if (estado.categoria !== 'todos' && t.categoria !== estado.categoria) return false;
      if (!q) return true;

      const heno = normalizar([
        t.titulo,
        t.alumno,
        t.descripcion,
        (t.tecnos || []).join(' '),
        nombreCategoria(t.categoria)
      ].join(' '));

      return heno.includes(q);
    });
  }

  /* ---------- Render ---------- */
  function tarjeta(t) {
    const tecnos = (t.tecnos || [])
      .map((tag) => `<span class="tag">${escapar(tag)}</span>`)
      .join('');

    const tieneDemo = Boolean(t.demo);

    const botonDemo = tieneDemo
      ? `<button class="btn btn-primary" type="button" data-demo="${escapar(t.demo)}"
                 data-titulo="${escapar(t.titulo)}" data-alumno="${escapar(t.alumno || '')}">
           <svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="6,4 20,12 6,20"></polygon></svg>
           Jugar
         </button>`
      : `<span class="btn btn-primary" aria-disabled="true">Sin demo</span>`;

    const botonRepo = t.repo
      ? `<a class="btn btn-ghost" href="${escapar(t.repo)}" target="_blank" rel="noopener noreferrer">
           <svg viewBox="0 0 24 24" aria-hidden="true">
             <path d="M9 18c-4 1.2-4-2.2-5.5-2.8M15 21v-3.4c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1.1-.3-3.6 1.3a11.6 11.6 0 0 0-6 0C6.5 2.9 5.4 3.2 5.4 3.2a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.6c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"></path>
           </svg>
           Código
         </a>`
      : '';

    return `
      <article class="card">
        <div class="card-media" aria-hidden="true">
          <span class="card-badge">${escapar(nombreCategoria(t.categoria))}</span>
          <span class="card-initials">${escapar(iniciales(t.titulo))}</span>
        </div>
        <div class="card-body">
          <h3 class="card-title">${escapar(t.titulo)}</h3>
          ${t.alumno ? `<p class="card-author">${escapar(t.alumno)}</p>` : ''}
          ${t.descripcion ? `<p class="card-desc">${escapar(t.descripcion)}</p>` : ''}
          ${tecnos ? `<div class="tags">${tecnos}</div>` : ''}
          <div class="card-actions">${botonDemo}${botonRepo}</div>
        </div>
      </article>`;
  }

  function render() {
    const lista = filtrar();

    $grid.innerHTML = lista.map(tarjeta).join('');
    $vacio.hidden = lista.length > 0;

    const total = TRABAJOS.length;
    $resultados.textContent = lista.length === total
      ? `${total} ${total === 1 ? 'trabajo publicado' : 'trabajos publicados'}`
      : `${lista.length} de ${total} trabajos`;

    $clearQ.hidden = estado.texto === '';
  }

  /* ---------- Filtros por categoría ---------- */
  function renderFiltros() {
    $filtros.innerHTML = CATEGORIAS.map((c) => `
      <button class="chip" type="button" role="tab"
              data-cat="${escapar(c.id)}"
              aria-selected="${c.id === estado.categoria}">
        ${escapar(c.nombre)}
      </button>`).join('');
  }

  $filtros.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    estado.categoria = chip.dataset.cat;
    renderFiltros();
    render();
  });

  /* ---------- Buscador ---------- */
  $q.addEventListener('input', () => {
    estado.texto = $q.value;
    render();
  });

  $clearQ.addEventListener('click', () => {
    $q.value = '';
    estado.texto = '';
    $q.focus();
    render();
  });

  /* ---------- Reset ---------- */
  function resetear() {
    estado.texto = '';
    estado.categoria = 'todos';
    $q.value = '';
    renderFiltros();
    render();
    $q.focus();
  }
  $reset.addEventListener('click', resetear);

  /* ---------- Visor embebido ---------- */
  function abrirVisor(url, titulo, alumno) {
    ultimoFoco = document.activeElement;

    $loading.hidden = false;
    $frame.src = 'about:blank';        // limpiamos la carga anterior
    $mTitle.textContent = titulo || 'Trabajo';
    $mSub.textContent = alumno ? `por ${alumno}` : '';
    $mOpen.href = url;

    $modal.hidden = false;
    document.body.classList.add('modal-open');

    // Damos un instante para que se pinte el spinner antes de pedir el iframe.
    clearTimeout(cargandoTimer);
    cargandoTimer = setTimeout(() => { $frame.src = url; }, 40);

    $mClose.focus();
  }

  function cerrarVisor() {
    if ($modal.hidden) return;

    clearTimeout(cargandoTimer);
    $modal.hidden = true;
    document.body.classList.remove('modal-open');
    $frame.src = 'about:blank';        // corta el audio/animaciones del juego
    $loading.hidden = false;

    if (ultimoFoco && typeof ultimoFoco.focus === 'function') ultimoFoco.focus();
    ultimoFoco = null;
  }

  $frame.addEventListener('load', () => {
    // about:blank también dispara load; sólo ocultamos el spinner con contenido real.
    if ($frame.src && $frame.src !== 'about:blank') $loading.hidden = true;
  });

  // Delegación: sirve para tarjetas presentes y futuras.
  $grid.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-demo]');
    if (!btn) return;
    abrirVisor(btn.dataset.demo, btn.dataset.titulo, btn.dataset.alumno);
  });

  $modal.addEventListener('click', (e) => {
    if (e.target.closest('[data-close]') || e.target.closest('#modal-close')) cerrarVisor();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !$modal.hidden) cerrarVisor();
  });

  // Foco atrapado dentro del diálogo mientras está abierto.
  document.addEventListener('focusin', (e) => {
    if ($modal.hidden) return;
    if (!$modal.contains(e.target)) $mClose.focus();
  });

  /* ---------- Tema ---------- */
  const CLAVE_TEMA = 'trabajosAlumnos:tema';

  function aplicarTema(tema) {
    if (tema === 'light') document.documentElement.setAttribute('data-theme', 'light');
    else document.documentElement.removeAttribute('data-theme');
  }

  function temaGuardado() {
    try { return localStorage.getItem(CLAVE_TEMA); } catch (_) { return null; }
  }

  // Tema inicial: preferencia guardada o, si no hay, la del sistema.
  aplicarTema(temaGuardado() || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));

  $themeBtn.addEventListener('click', () => {
    const esClaro = document.documentElement.getAttribute('data-theme') === 'light';
    const nuevo = esClaro ? 'dark' : 'light';
    aplicarTema(nuevo);
    try { localStorage.setItem(CLAVE_TEMA, nuevo); } catch (_) { /* modo privado */ }
  });

  /* ---------- Arranque ---------- */
  renderFiltros();
  render();
})();
