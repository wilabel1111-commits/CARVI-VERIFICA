/**
 * Punto de entrada de la pagina "Verifica Gratis" (directorio.html).
 * Misma logica de composicion que main.js, pero solo carga lo que
 * esta pagina realmente necesita.
 */
import { loadAllIncludes } from './core/include-loader.js';
import { initTopbar } from './shared/components/topbar/topbar.js';
import { initFooterYear } from './shared/components/footer/footer.js';
import { initWhatsappAdvisorModal } from './shared/components/whatsapp-advisor-modal/whatsapp-advisor-modal.js';
import { initFreeDirectoryPage } from './features/free-directory-page/free-directory-page.js';

async function bootstrap(){
  await loadAllIncludes();

  initTopbar();
  initFooterYear();
  initWhatsappAdvisorModal();
  initFreeDirectoryPage();
}

document.addEventListener('DOMContentLoaded', bootstrap);
