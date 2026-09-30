// Genera el catálogo en PDF para enviar por WhatsApp, a partir de sitio/js/productos.js.
// Uso: npm install (una vez) y luego npm run catalogo  ->  salida/catalogo-comercial-macri.pdf
import { chromium } from "playwright";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { cargarCatalogo } from "./verificar.mjs";

const SITE = fileURLToPath(new URL("../sitio/", import.meta.url));
const SALIDA = fileURLToPath(new URL("../salida/", import.meta.url));
const { categorias: CATEGORIAS, productos: PRODUCTOS } = cargarCatalogo();
const img=f=>{const p=SITE+'img/productos/'+f;return fs.existsSync(p)?'data:image/jpeg;base64,'+fs.readFileSync(p).toString('base64'):null};
const WA='+56 9 6646 0064';
const logo=`<div class="badge"><span>COMERCIAL</span><b>MACRI</b><span>FOOD SERVICE</span></div>`;
const foot=(n)=>`<div class="pfoot"><span>Comercial Macri Ltda. · Julio César 10776, Santiago · Delivery a toda la RM</span><span class="wa">Pedidos WhatsApp ${WA}</span></div>`;
let pages=[];
pages.push(`<section class="page cover">
  <div class="cv-top">${logo}</div>
  <div class="cv-mid"><p class="kick">Catálogo de productos · ${new Date().toLocaleDateString('es-CL',{month:'long',year:'numeric'})}</p>
  <h1>Todo para tu cocina,<br><em>en un solo pedido.</em></h1>
  <p class="sub">Insumos para restaurantes de sushi, pizzerías y cocinas profesionales.</p>
  <ul class="cats">${CATEGORIAS.map(c=>`<li><span>${c.icono}</span>${c.nombre}</li>`).join('')}</ul></div>
  <div class="cv-bot"><div><b>Pide por WhatsApp</b><span>${WA}</span></div><div><b>Delivery</b><span>A toda la Región Metropolitana</span></div><div><b>Retiro en local</b><span>Julio César 10776, Santiago</span></div><div><b>Instagram</b><span>@insumosmacri</span></div></div>
</section>`);
const withPhoto=PRODUCTOS.filter(p=>img(p.foto));
for(const c of CATEGORIAS){
  const list=withPhoto.filter(p=>p.categoria===c.id);
  for(let i=0;i<list.length;i+=9){
    pages.push(`<section class="page"><header class="phead">${logo}<h2>${c.icono} ${c.nombre}${i?' <small>(continuación)</small>':''}</h2></header>
    <div class="grid">${list.slice(i,i+9).map(p=>`<article><img src="${img(p.foto)}"><h3>${p.nombre}</h3><p>${p.formato}</p><span class="ask">Precio a consultar</span></article>`).join('')}</div>${foot()}</section>`);
  }
}
pages.push(`<section class="page how"><header class="phead">${logo}<h2>Cómo hacer tu pedido</h2></header>
<ol><li><b>Escríbenos por WhatsApp</b> al ${WA} con los productos y cantidades.</li><li><b>Te confirmamos</b> precio del día, stock y horario de entrega.</li><li><b>Recibe en tu local</b> (delivery a toda la RM) o <b>retira</b> en Julio César 10776, Santiago.</li></ol>
<div class="note">Precios sujetos a cambios según mercado. Tenemos más productos de los que aparecen en este catálogo: pregúntanos.</div>
<div class="big">${WA}</div>${foot()}</section>`);
const css=`@page{size:A4;margin:0}*{box-sizing:border-box}body{margin:0;font-family:Arial,Helvetica,sans-serif;color:#111}
.page{width:210mm;height:297mm;padding:14mm 14mm 20mm;position:relative;page-break-after:always;overflow:hidden;background:#fff}
.badge{width:22mm;height:22mm;border-radius:50%;background:#000;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1;box-shadow:inset 0 0 0 1mm #000,inset 0 0 0 1.5mm #fff;flex:none}
.badge span{font-size:5.5pt;letter-spacing:.08em}.badge b{font-size:13pt;font-weight:900;margin:1mm 0}
.cover{background:#0e0e0e;color:#fff;display:flex;flex-direction:column;justify-content:space-between;padding:20mm}
.cover .badge{width:34mm;height:34mm;box-shadow:inset 0 0 0 1mm #000,inset 0 0 0 1.8mm #fff}.cover .badge b{font-size:20pt}.cover .badge span{font-size:8pt}
.kick{color:#d7262c;font-weight:700;letter-spacing:.14em;text-transform:uppercase;font-size:10pt}
h1{font-size:40pt;line-height:1.05;margin:4mm 0 6mm;font-weight:900}h1 em{font-style:normal;color:#d7262c}
.sub{font-size:14pt;color:#c9c9c9;margin:0 0 10mm}
.cats{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:1fr 1fr;gap:4mm}
.cats li{border:1px solid #333;border-radius:4mm;padding:5mm;font-size:14pt;font-weight:700;display:flex;gap:3mm;align-items:center}
.cv-bot{display:grid;grid-template-columns:1fr 1fr;gap:5mm;border-top:1px solid #333;padding-top:8mm}
.cv-bot b{display:block;color:#d7262c;font-size:10pt;text-transform:uppercase;letter-spacing:.08em}.cv-bot span{font-size:13pt}
.phead{display:flex;align-items:center;gap:6mm;border-bottom:3px solid #d7262c;padding-bottom:5mm;margin-bottom:7mm}
.phead h2{font-size:24pt;margin:0;font-weight:900}.phead small{font-size:12pt;color:#777;font-weight:400}
.grid{display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:73mm;gap:4mm}
article{border:1px solid #e3e1da;border-radius:3mm;overflow:hidden;display:flex;flex-direction:column}
article img{width:100%;height:50mm;object-fit:cover;display:block}
article h3{font-size:10.5pt;margin:2.5mm 3mm 1mm;line-height:1.2}article p{font-size:8.5pt;color:#555;margin:0 3mm 2mm}
.ask{margin:auto 3mm 3mm;font-size:8pt;font-weight:700;color:#d7262c}
.pfoot{position:absolute;left:14mm;right:14mm;bottom:8mm;display:flex;justify-content:space-between;font-size:8pt;color:#666;border-top:1px solid #ddd;padding-top:3mm}
.pfoot .wa{color:#0a7a32;font-weight:700}
.how ol{font-size:16pt;line-height:1.5;padding-left:8mm}.how li{margin-bottom:6mm}
.note{background:#f6f5f1;border-left:4px solid #d7262c;padding:5mm;font-size:12pt;margin-top:10mm}
.big{margin-top:20mm;text-align:center;font-size:34pt;font-weight:900;color:#fff;background:#25d366;border-radius:10mm;padding:10mm}`;
const html=`<!doctype html><meta charset="utf-8"><style>${css}</style>${pages.join('')}`;
fs.mkdirSync(SALIDA,{recursive:true});
const b=await chromium.launch();const p=await b.newPage();
await p.setContent(html,{waitUntil:'load'});
await p.pdf({path:SALIDA+'catalogo-comercial-macri.pdf',format:'A4',printBackground:true});
await b.close();
console.log(`✓ salida/catalogo-comercial-macri.pdf (${pages.length} páginas)`);
