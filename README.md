# Comercial Macri · Sitio web

Sitio de **Comercial Macri Food Service**, distribuidora de insumos para restaurantes de sushi, pizzerías y cocinas en Santiago.

Es un sitio estático (HTML, CSS y JavaScript, sin frameworks). Los clientes arman su pedido en el catálogo y lo envían por WhatsApp al +56 9 6646 0064.

## Estructura

```
sitio/                     ← lo que se publica
  index.html               página principal
  css/styles.css           estilos
  js/productos.js          ★ catálogo: aquí se agregan y editan productos
  js/app.js                catálogo, filtros, buscador y pedido por WhatsApp
  img/productos/           fotos de productos (800x800 JPG)
  favicon.svg, robots.txt
scripts/
  verificar.mjs            revisa que el catálogo esté bien escrito
  catalogo-pdf.mjs         genera el catálogo PDF para WhatsApp
  preparar-foto.py         deja una foto cuadrada y liviana
.github/workflows/
  publicar.yml             publica en GitHub Pages al subir cambios
```

## Ver el sitio en tu computador

Necesitas [Node.js](https://nodejs.org) 18 o superior.

```bash
npm run dev
```

Abre http://localhost:3000. También puedes abrir `sitio/index.html` directamente con doble clic.

## Agregar o cambiar un producto

1. Prepara la foto (cuadrada, fondo limpio):
   ```bash
   python3 scripts/preparar-foto.py ~/Descargas/foto.jpg queso-crema-nuevo.jpg
   ```
   Si la foto viene de un afiche, recorta solo el producto con `--recorte x1,y1,x2,y2`.
2. Agrega una línea en `sitio/js/productos.js`:
   ```js
   { id: "queso-crema-nuevo", nombre: "Queso crema Nuevo", formato: "Barra 1,36 kg", categoria: "quesos", foto: "queso-crema-nuevo.jpg", precio: null, destacado: false },
   ```
   - `categoria`: `sushi`, `quesos`, `congelados` (Pescados y mariscos) o `abarrotes`.
   - `precio`: siempre `null` (el sitio muestra "Precio a consultar").
   - `destacado: true` le pone la etiqueta "Más vendido".
3. Revisa que todo esté bien:
   ```bash
   npm run verificar
   ```

Si falta una foto, el sitio muestra una tarjeta "Foto pendiente" en su lugar.

Los productos de la portada se eligen en `sitio/js/app.js`, en la constante `PORTADA`.

## Catálogo PDF para WhatsApp

```bash
npm install        # solo la primera vez (instala Playwright)
npx playwright install chromium
npm run catalogo
```

El PDF queda en `salida/catalogo-comercial-macri.pdf`. Se genera desde el mismo `productos.js`, así que la web y el PDF siempre muestran los mismos productos.

## Publicar

El sitio no necesita servidor. Tres opciones:

- **GitHub Pages** (gratis, recomendado): sube el repositorio a GitHub y en *Settings > Pages* elige *Source: GitHub Actions*. Cada cambio en `main` se publica solo, después de pasar `verificar`.
- **Vercel** (gratis, funciona con repo privado): en vercel.com/new importa el repositorio y toca *Deploy*. `vercel.json` ya indica que se publica la carpeta `sitio` después de pasar `verificar`.
- **Netlify o Cloudflare Pages** (gratis): conecta el repositorio y usa `sitio` como carpeta de publicación, sin comando de build.
- **Hosting tradicional**: sube el contenido de `sitio/` por FTP.

Para usar un dominio propio (por ejemplo `comercialmacri.cl`), configúralo en el servicio que elijas.

## Pendientes

- Datos por confirmar marcados con `[corchetes]` en `index.html`: horario, pedido mínimo, formas de pago y factura.
- Faltan las fotos del queso crema Green Bay y del Rafulco.
- Quitar el aviso amarillo "Borrador para revisión" (primer `<div class="draft">` de `index.html`) antes de publicar.
