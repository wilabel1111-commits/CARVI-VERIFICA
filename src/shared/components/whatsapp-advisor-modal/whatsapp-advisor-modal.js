/**
 * Componente: Selector de asesor de WhatsApp.
 *
 * Responsabilidad: en vez de que cualquier boton "Contactar por
 * WhatsApp" del sitio abra un chat directo, este componente
 * intercepta esos clics y muestra un modal para que el usuario
 * elija con que asesor comercial comunicarse. Solo al elegir se
 * abre wa.me en una pestaña nueva.
 *
 * Uso desde HTML (sin escribir JS adicional):
 *   <button data-whatsapp-trigger data-message="Mensaje opcional">...</button>
 *
 * Uso programatico (ej. luego de validar un formulario):
 *   import { openWhatsappAdvisorModal } from '.../whatsapp-advisor-modal.js';
 *   openWhatsappAdvisorModal('Mensaje personalizado');
 */
import { ADVISORS, DEFAULT_MESSAGE, buildWhatsappUrl } from './whatsapp-advisor-modal.data.js';

let overlayEl = null;
let optionsEl = null;
let closeBtnEl = null;
let lastFocusedEl = null;
let pendingMessage = DEFAULT_MESSAGE;

function renderAdvisorOptions(){
  optionsEl.innerHTML = ADVISORS.map((advisor) => {
    const shortLabel = advisor.id.split('-').pop();
    return `
      <button type="button" class="wa-advisor-option" data-phone="${advisor.phone}" aria-label="${advisor.linkLabel}">
        <span class="wa-advisor-avatar" aria-hidden="true">${shortLabel}</span>
        <span class="wa-advisor-info">
          <span class="wa-advisor-name">${advisor.name}</span>
          <span class="wa-advisor-sub">${advisor.linkLabel}</span>
        </span>
        <svg class="icon icon-svg wa-advisor-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
      </button>
    `;
  }).join('');
}

function handleKeydown(event){
  if(event.key === 'Escape') closeWhatsappAdvisorModal();
}

function handleOverlayClick(event){
  if(event.target === overlayEl) closeWhatsappAdvisorModal();
}

function handleOptionClick(event){
  const button = event.target.closest('.wa-advisor-option');
  if(!button) return;
  const phone = button.getAttribute('data-phone');
  const url = buildWhatsappUrl(phone, pendingMessage);
  window.open(url, '_blank', 'noopener');
  closeWhatsappAdvisorModal();
}

/** Delega el clic de cualquier disparador [data-whatsapp-trigger] del sitio. */
function handleGlobalTriggerClick(event){
  const trigger = event.target.closest('[data-whatsapp-trigger]');
  if(!trigger) return;
  event.preventDefault();
  const customMessage = trigger.getAttribute('data-message');
  openWhatsappAdvisorModal(customMessage || DEFAULT_MESSAGE);
}

export function openWhatsappAdvisorModal(message = DEFAULT_MESSAGE){
  if(!overlayEl) return;
  pendingMessage = message || DEFAULT_MESSAGE;
  lastFocusedEl = document.activeElement;

  overlayEl.hidden = false;
  document.body.style.overflow = 'hidden';

  requestAnimationFrame(() => {
    overlayEl.classList.add('is-open');
    closeBtnEl.focus();
  });

  document.addEventListener('keydown', handleKeydown);
}

export function closeWhatsappAdvisorModal(){
  if(!overlayEl) return;
  overlayEl.classList.remove('is-open');
  document.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = '';

  setTimeout(() => { overlayEl.hidden = true; }, 300);

  if(lastFocusedEl && typeof lastFocusedEl.focus === 'function'){
    lastFocusedEl.focus();
  }
}

export function initWhatsappAdvisorModal(){
  overlayEl = document.getElementById('waModalOverlay');
  optionsEl = document.getElementById('waModalOptions');
  closeBtnEl = document.getElementById('waModalClose');
  if(!overlayEl || !optionsEl || !closeBtnEl) return;

  renderAdvisorOptions();

  closeBtnEl.addEventListener('click', closeWhatsappAdvisorModal);
  overlayEl.addEventListener('click', handleOverlayClick);
  optionsEl.addEventListener('click', handleOptionClick);
  document.addEventListener('click', handleGlobalTriggerClick);
}
