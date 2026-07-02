/**
 * Core: cargador de partials HTML
 * Unica responsabilidad: buscar todo elemento con [data-include],
 * traer su HTML y reemplazarlo en el DOM, preservando el orden
 * de la pagina. Esto permite que cada feature/componente viva en
 * su propio archivo .html sin necesidad de un bundler.
 *
 * Requiere servir el sitio con un servidor local (Live Server,
 * `npx serve`, etc.) porque fetch() de archivos locales no
 * funciona bajo el protocolo file://.
 */
async function loadInclude(el){
  const path = el.getAttribute('data-include');
  try{
    const response = await fetch(path);
    if(!response.ok) throw new Error(`No se pudo cargar ${path}`);
    const html = await response.text();
    el.outerHTML = html;
  }catch(error){
    console.error('[include-loader]', error);
    el.innerHTML = `<!-- Error cargando ${path} -->`;
  }
}

export async function loadAllIncludes(root = document){
  const nodes = Array.from(root.querySelectorAll('[data-include]'));
  await Promise.all(nodes.map(loadInclude));
}
