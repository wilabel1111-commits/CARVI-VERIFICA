/**
 * Feature: Verificacion de placa
 * Logica de negocio: validar que el usuario ingreso una placa y
 * abrir el selector de asesor de WhatsApp con un mensaje que ya
 * incluye la placa capturada, para que el asesor la reciba lista.
 */
import { openWhatsappAdvisorModal } from '../../shared/components/whatsapp-advisor-modal/whatsapp-advisor-modal.js';

function shakeInvalidInput(input){
  input.classList.add('shake');
  input.focus();
  setTimeout(() => input.classList.remove('shake'), 400);
}

export function initPlateVerification(){
  const input = document.getElementById('placaInput');
  const verifyBtn = document.getElementById('verificarBtn');
  if(!input || !verifyBtn) return;

  const openAdvisorSelection = () => {
    const placa = input.value.trim();
    if(!placa){
      shakeInvalidInput(input);
      return;
    }
    const message = `Hola, deseo realizar una consulta sobre un vehículo. Placa: ${placa}`;
    openWhatsappAdvisorModal(message);
  };

  verifyBtn.addEventListener('click', openAdvisorSelection);
  input.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') openAdvisorSelection();
  });
}
