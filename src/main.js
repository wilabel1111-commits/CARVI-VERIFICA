/**
 * Punto de entrada de la pagina de inicio (index.html).
 * Orquesta: 1) cargar los partials HTML de cada feature/componente,
 * 2) una vez que el DOM real existe, inicializar el JS de cada uno.
 * No contiene logica de negocio propia: solo composicion.
 */
import { loadAllIncludes } from './core/include-loader.js';
import { initTopbar } from './shared/components/topbar/topbar.js';
import { initFooterYear } from './shared/components/footer/footer.js';
import { initWhatsappAdvisorModal } from './shared/components/whatsapp-advisor-modal/whatsapp-advisor-modal.js';
import { initPlateVerification } from './features/plate-verification/plate-verification.js';
import { initLiveClock } from './features/free-directory/free-directory.js';

async function bootstrap(){
  await loadAllIncludes();

  initTopbar();
  initFooterYear();
  initWhatsappAdvisorModal();
  initPlateVerification();
  initLiveClock();
}

document.addEventListener('DOMContentLoaded', bootstrap);
