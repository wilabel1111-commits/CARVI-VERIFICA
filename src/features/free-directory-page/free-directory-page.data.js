/**
 * Datos de la pagina "Verifica Gratis".
 * Unica fuente de verdad para las 4 categorias y sus enlaces
 * oficiales. Agregar/editar un enlace es solo tocar este archivo;
 * la vista (free-directory-page.js) se re-renderiza sola.
 */
export const CATEGORIES = [
  {
    id: 'consultas-generales',
    title: 'Consultas Generales',
    icon: 'general',
    links: [
      { name: 'SUNARP Consulta Vehicular', url: 'https://consultavehicular.sunarp.gob.pe/consulta-vehicular/inicio' },
      { name: 'SOAT', url: 'https://www.apeseg.org.pe/consultas-soat/' },
      { name: 'Revisión Técnica (CITV)', url: 'https://rec.mtc.gob.pe/Citv/ArConsultaCitv' },
      { name: 'SUTRAN — Papeletas', url: 'https://www.sutran.gob.pe/consultas/record-de-infracciones/record-de-infracciones/' },
    ],
  },
  {
    id: 'papeletas-lima',
    title: 'Papeletas — Departamento de Lima',
    icon: 'lima',
    links: [
      { name: 'SAT Lima', url: 'https://www.sat.gob.pe/VirtualSAT/principal.aspx' },
      { name: 'SAT Callao', url: 'https://pagopapeletascallao.pe/' },
      { name: 'ATU', url: 'https://sistemas.atu.gob.pe/consultavehiculo' },
      { name: 'Fotopit (Velocidad)', url: 'http://www.pit.gob.pe/pit2007/EstadoCuentaVelocidad.aspx' },     
    ],
  },
  {
    id: 'papeletas-provincias',
    title: 'Papeletas en Provincias',
    icon: 'provincias',
    links: [
      { name: 'Trujillo', url: 'https://satt.gob.pe/servicios/record-de-infracciones' },
      { name: 'Chiclayo', url: 'https://virtualsatch.satch.gob.pe/virtualsatch/record_infracciones/buscar_placa_' },
      { name: 'Piura', url: 'http://www.munipiura.gob.pe/consulta-de-multas-de-transito#buscar-por-placa' },
      { name: 'Huancayo', url: 'http://sathuancayo.fortiddns.com:888/VentanillaVirtual/ConsultaPIT.aspx' },
      { name: 'Huánuco', url: 'https://www.munihuanuco.gob.pe/wp-content/servicios/transportes/gt_papeletas.php' },
      { name: 'Cajamarca', url: 'https://www.satcajamarca.gob.pe/#/' },
      { name: 'Chachapoyas', url: 'https://app.munichachapoyas.gob.pe/servicios/consulta_papeletas/app/papeletas.php' },
      { name: 'Tarapoto', url: 'https://www.sat-t.gob.pe/' },
      { name: 'Andahuaylas', url: 'https://muniandahuaylas.gob.pe/consultar-papeleta/' },
      { name: 'Cusco', url: 'https://cusco.gob.pe/informatica/index.php/' },
      { name: 'Arequipa', url: 'https://www.muniarequipa.gob.pe/oficina-virtual/c0nInfrPermisos/faltas/papeletas.php' },
      { name: 'Ica', url: 'https://m.satica.gob.pe/consultapapeletas.php' },
      { name: 'Tacna', url: 'https://www.munitacna.gob.pe/pagina/sf/servicios/papeletas' },
    ],
  },
  {
    id: 'otras-consultas',
    title: 'Otras Consultas',
    icon: 'otros',
    links: [
      { name: 'GNV — Deuda Fise', url: 'https://fise.minem.gob.pe:23308/consulta-taller/pages/consultaTaller/inicio' },
      { name: 'Consulta de Lunas Polarizadas', url: 'https://sistemas.policia.gob.pe/consultalunas/' },
      { name: 'Tarjeta de Mercancía (MTC)', url: 'https://www.mtc.gob.pe/tramitesenlinea/tweb_tLinea/tw_consultadgtt/Frm_rep_intra_mercancia.aspx' },
      { name: 'Tarjeta de Circulación de Pasajeros (MTC)', url: 'https://www.mtc.gob.pe/tramitesenlinea/tweb_tLinea/tw_consultadgtt/ntransporte_pasajeros.aspx' },
      { name: 'Requisitoria PNP', url: 'https://sistemas1.policia.gob.pe/ConsultaPVR/ConsultarServicio' },
      { name: 'Estado de Placa', url: 'https://www.placas.pe/#/home/verificarEstadoPlaca' },
    ],
  },
];
