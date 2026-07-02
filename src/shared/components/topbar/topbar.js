/**
 * Topbar: controla el menu movil (hamburguesa) y el cierre
 * automatico al seleccionar un enlace.
 * Responsabilidad unica: interaccion del componente Topbar.
 */
export function initTopbar(){
  const burger = document.getElementById('burgerBtn');
  const menu = document.getElementById('mobileMenu');
  if(!burger || !menu) return;

  burger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}
