/**
 * Componente: Pie de pagina
 * Responsabilidad unica: mantener el anio de copyright actualizado.
 */
export function initFooterYear(){
  const yearEl = document.getElementById('year');
  if(!yearEl) return;
  yearEl.textContent = new Date().getFullYear();
}
