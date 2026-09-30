// Revisa que el catálogo (sitio/js/productos.js) esté bien escrito antes de publicar.
// Uso: npm run verificar
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const SITIO = fileURLToPath(new URL("../sitio/", import.meta.url));
const FOTOS = SITIO + "img/productos/";

export function cargarCatalogo() {
  const ctx = { window: {} };
  vm.runInNewContext(readFileSync(SITIO + "js/productos.js", "utf8"), ctx, { filename: "productos.js" });
  return { categorias: ctx.window.CATEGORIAS, productos: ctx.window.PRODUCTOS };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const errores = [], avisos = [];
  let catalogo;
  try {
    catalogo = cargarCatalogo();
  } catch (e) {
    console.error("✗ productos.js tiene un error de escritura:\n  " + e.message);
    process.exit(1);
  }
  const { categorias, productos } = catalogo;
  const catIds = new Set(categorias.map(c => c.id));
  const ids = new Set();
  const campos = ["id", "nombre", "formato", "categoria", "foto"];

  for (const p of productos) {
    const q = p.id || p.nombre || "(sin id)";
    for (const c of campos) if (!p[c]) errores.push(`${q}: falta el campo "${c}"`);
    if (ids.has(p.id)) errores.push(`${q}: el id está repetido`);
    ids.add(p.id);
    if (p.id && !/^[a-z0-9-]+$/.test(p.id)) errores.push(`${q}: el id solo puede tener minúsculas, números y guiones`);
    if (!catIds.has(p.categoria)) errores.push(`${q}: la categoría "${p.categoria}" no existe`);
    if (p.precio !== null && typeof p.precio !== "number") errores.push(`${q}: precio debe ser un número o null`);
    if (p.precio !== null) avisos.push(`${q}: tiene precio (${p.precio}); la política actual es "precio a consultar"`);
    if (p.foto && !existsSync(FOTOS + p.foto)) avisos.push(`${q}: falta la foto img/productos/${p.foto}`);
  }

  const usadas = new Set(productos.map(p => p.foto));
  for (const f of readdirSync(FOTOS)) if (/\.(jpe?g|png|webp)$/i.test(f) && !usadas.has(f)) avisos.push(`foto sin usar: img/productos/${f}`);

  for (const a of avisos) console.log("! " + a);
  for (const e of errores) console.log("✗ " + e);
  console.log(`\n${productos.length} productos en ${categorias.length} categorías · ${errores.length} errores · ${avisos.length} avisos`);
  process.exit(errores.length ? 1 : 0);
}
