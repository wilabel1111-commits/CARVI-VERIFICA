/**
 * Datos del componente: Selector de asesor de WhatsApp.
 * Unica fuente de verdad para numeros de asesores y mensaje por
 * defecto. Si mañana se agrega/quita un asesor, solo se edita aqui.
 */
export const DEFAULT_MESSAGE = 'Hola, deseo realizar una consulta sobre un vehículo.';

export const ADVISORS = [
  {
    id: 'asesor-1',
    name: 'Asesor Comercial 1',
    phone: '51958585881',
    linkLabel: 'Contactar con Asesor Comercial 1',
  },
  {
    id: 'asesor-2',
    name: 'Asesor Comercial 2',
    phone: '51984781784',
    linkLabel: 'Contactar con Asesor Comercial 2',
  },
];

/**
 * Construye una URL valida de la API de WhatsApp (wa.me) con el
 * mensaje pre-cargado y correctamente codificado.
 */
export function buildWhatsappUrl(phone, message = DEFAULT_MESSAGE){
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
