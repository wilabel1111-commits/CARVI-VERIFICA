/**
 * Feature: Directorio gratuito
 * Muestra la hora actual de Peru para reforzar el contexto de
 * horario de atencion mostrado en la tarjeta informativa.
 */
export function initLiveClock(){
  const clockEl = document.getElementById('liveClock');
  if(!clockEl) return;

  const formatter = new Intl.DateTimeFormat('es-PE', {
    timeZone: 'America/Lima',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const tick = () => {
    try{
      clockEl.textContent = formatter.format(new Date());
    }catch(error){
      clockEl.textContent = '--:--';
    }
  };

  tick();
  setInterval(tick, 1000);
}
