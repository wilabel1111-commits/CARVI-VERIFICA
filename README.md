# Carvi — Verificación vehicular (Perú)

Landing page para el servicio de verificación de vehículos (papeletas, SOAT,
gravámenes, SUNARP, etc.) y su directorio gratuito de fuentes oficiales.

## Cómo ejecutarlo en VS Code

El `index.html` carga cada sección con `fetch()` (ver `src/core/include-loader.js`),
por lo que **no funciona abriendo el archivo directamente con doble clic**
(protocolo `file://` bloquea `fetch` por CORS). Necesitas un servidor local:

* **Opción A (recomendada):** instala la extensión **Live Server** en VS Code
y haz clic derecho sobre `index.html` → "Open with Live Server".
* **Opción B:** desde la terminal, con Node.js instalado:

```bash
  npm run dev
  # o directamente:
  npx serve . -l 5500
  ```

  Luego abre `http://localhost:5500`.

  ## Estructura del proyecto (Screaming Architecture)

  La carpeta `src/` está organizada por **dominio de negocio**, no por tipo de
archivo. Cada carpeta bajo `features/` representa una capacidad real del
producto (verificar placa, ver precios, ver cobertura gratuita, etc.), y
contiene su propio HTML, CSS y JS. `shared/` contiene piezas de UI que se
repiten en varias features (topbar, footer, botón de WhatsApp).

  ```
autocheck/
├── index.html                  # Shell: solo enlaza estilos y monta las secciones
├── package.json
├── README.md
└── src/
    ├── main.js                 # Orquestador: carga partials + inicializa JS
    ├── core/
    │   └── include-loader.js   # Infraestructura: carga HTML por fetch()
    ├── styles/
    │   ├── tokens.css          # Variables de diseño (colores, tipografía…)
    │   ├── base.css            # Reset y reglas globales
    │   └── layout.css          # Layout/botones reutilizados entre features
    ├── shared/
    │   └── components/
    │       ├── topbar/         # topbar.html · topbar.css · topbar.js
    │       ├── footer/         # footer.html · footer.css · footer.js
    │       └── whatsapp-fab/   # whatsapp-fab.html · whatsapp-fab.css
    └── features/
        ├── plate-verification/     # Hero + input de placa → WhatsApp
        │   ├── plate-verification.html
        │   ├── plate-verification.css
        │   └── plate-verification.js
        ├── verification-coverage/  # Grid "¿Qué verificamos?"
        │   ├── verification-coverage.html
        │   └── verification-coverage.css
        ├── how-it-works/            # Pasos "¿Cómo funciona?"
        │   ├── how-it-works.html
        │   └── how-it-works.css
        ├── pricing/                 # Planes y precios
        │   ├── pricing.html
        │   └── pricing.css
        ├── free-directory/          # Alternativa gratuita + reloj en vivo
        │   ├── free-directory.html
        │   ├── free-directory.css
        │   └── free-directory.js
        ├── testimonials/            # Testimonios de clientes
        │   ├── testimonials.html
        │   └── testimonials.css
        └── final-cta/                # Llamado a la acción final
            ├── final-cta.html
            └── final-cta.css
```

  > Nota: `directorio.html` es referenciado por varios enlaces del sitio
> (ej. "Verifica gratis") pero no formaba parte del código original que
> me compartiste, así que no se incluyó aquí. Si me pasas ese archivo,
> lo puedo refactorizar con la misma arquitectura (por ejemplo, como
> `src/features/free-directory-page/`).

  ## Nuevas features (v2)

  ### 1\. Selector de asesor de WhatsApp (multi-asesor)

  Ningún botón de "Contactar por WhatsApp" abre ya un chat directo. Todos
(FAB flotante, footer, botones de precios y el botón "Verificar" de placa)
disparan un modal (`src/shared/components/whatsapp-advisor-modal/`) donde el
usuario elige entre **Asesor Comercial 1** (`51958585881`) y **Asesor
Comercial 2** (`51984781784`). Solo al elegir se abre `wa.me` en pestaña
nueva con el mensaje pre-cargado.

  Cualquier botón nuevo puede activar el modal sin escribir JS adicional:

  ```html
<button type="button" data-whatsapp-trigger data-message="Mensaje opcional">
  Contactar
</button>
```

  Números y mensaje por defecto están centralizados en
`whatsapp-advisor-modal.data.js` — es el único lugar que hay que tocar si
cambian los asesores.

  ### 2\. Página "Verifica Gratis" (`directorio.html`)

  Nueva página independiente con las 26 fuentes oficiales organizadas en 4
categorías como acordeones (`<details>/<summary>`, accesibles por teclado
de forma nativa), con buscador en vivo que filtra y auto-expande
coincidencias. Todos los enlaces externos usan
`target="\_blank" rel="noopener noreferrer"`. Los datos de los enlaces viven
en `free-directory-page.data.js` (separados de la vista) para que agregar o
corregir una URL sea un cambio de una sola línea.

  ## Principios aplicados

* **Screaming Architecture:** la carpeta `features/` grita "verificación de
placa", "precios", "testimonios" — no "components" o "utils" genéricos.
* **Mobile-first:** todo el CSS parte de layout de una columna y usa
`@media (min-width: …)` para progresivamente añadir columnas/filas
(`grid-template-columns`, `flex-direction: row`, etc.), evitando
sobreescrituras innecesarias.
* **Separación de responsabilidades:** cada archivo `.js` exporta una
única función `initX()` con una sola responsabilidad (SRP). `main.js`
solo compone; no contiene lógica propia.
* **Sin duplicación de tokens:** todos los colores, radios y sombras viven
en `tokens.css` y se consumen por variable en el resto del código.

