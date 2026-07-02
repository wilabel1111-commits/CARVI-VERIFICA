/**
 * Feature: Pagina "Verifica Gratis"
 * Renderiza las categorias y enlaces desde free-directory-page.data.js
 * (evita repetir 24 bloques de HTML a mano) y controla el buscador
 * que filtra en tiempo real y expande automaticamente las categorias
 * con resultados.
 */
import { CATEGORIES } from './free-directory-page.data.js';
import { CATEGORY_ICONS, EXTERNAL_LINK_ICON, SEARCH_ICON } from './free-directory-page.icons.js';

function renderLinkItem(link){
  return `
    <li class="link-item">
      <a href="${link.url}" target="_blank" rel="noopener noreferrer">
        <span>${link.name}</span>
        ${EXTERNAL_LINK_ICON}
      </a>
    </li>
  `;
}

function renderCategory(category, isOpenByDefault){
  const linksMarkup = category.links.map(renderLinkItem).join('');
  return `
    <details class="link-category" data-category-id="${category.id}" ${isOpenByDefault ? 'open' : ''}>
      <summary>
        <span class="category-icon">${CATEGORY_ICONS[category.icon] || ''}</span>
        <span>${category.title}</span>
        <span class="category-count">${category.links.length}</span>
        <span class="summary-chevron" aria-hidden="true"></span>
      </summary>
      <ul class="link-list">${linksMarkup}</ul>
    </details>
  `;
}

function renderDirectory(){
  const mount = document.getElementById('linkDirectory');
  if(!mount) return;
  mount.innerHTML = CATEGORIES.map((category, index) => renderCategory(category, index === 0)).join('');
}

function renderSearchIcon(){
  const iconMount = document.getElementById('directorySearchIcon');
  if(iconMount) iconMount.innerHTML = SEARCH_ICON;
}

/** Filtra las tarjetas de enlace por texto y auto-expande coincidencias. */
function filterDirectory(query){
  const normalizedQuery = query.trim().toLowerCase();
  const categoryEls = document.querySelectorAll('.link-category');
  let totalVisible = 0;

  categoryEls.forEach((categoryEl) => {
    let visibleInCategory = 0;

    categoryEl.querySelectorAll('.link-item').forEach((item) => {
      const matches = normalizedQuery === '' || item.textContent.toLowerCase().includes(normalizedQuery);
      item.hidden = !matches;
      if(matches) visibleInCategory += 1;
    });

    categoryEl.hidden = visibleInCategory === 0;
    if(normalizedQuery !== ''){
      categoryEl.open = visibleInCategory > 0;
    }
    totalVisible += visibleInCategory;
  });

  const emptyStateEl = document.getElementById('directoryEmpty');
  if(emptyStateEl) emptyStateEl.hidden = totalVisible !== 0;
}

export function initFreeDirectoryPage(){
  renderSearchIcon();
  renderDirectory();

  const searchInput = document.getElementById('directorySearch');
  if(searchInput){
    searchInput.addEventListener('input', (event) => filterDirectory(event.target.value));
  }
}
