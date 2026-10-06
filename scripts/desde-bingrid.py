"""Arma sitio/js/productos.js a partir del catálogo de Bingrid (productos.json).

Uso:
  python3 scripts/desde-bingrid.py ruta/productos.json ruta/fotos/

Solo entran los productos con foto (en la carpeta de fotos indicada o ya en
sitio/img/productos/). Las fotos nuevas se copian a sitio/img/productos/.
La web no muestra precios: todos quedan con precio null ("Precio a consultar").
"""
import json
import re
import shutil
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
FOTOS_WEB = RAIZ / "sitio" / "img" / "productos"
SALIDA = RAIZ / "sitio" / "js" / "productos.js"

CATEGORIAS = [
    ("sushi", "Para sushi", "🍣", "Arroz, nori, panko, sésamo, salsas y todo para la barra."),
    ("quesos", "Quesos", "🧀", "Queso crema food service, mozzarella y quesos para cocina."),
    ("mar", "Pescados y mariscos", "🐟", "Salmón, camarón, pulpo, tilapia y kanikama congelados."),
    ("abarrotes", "Abarrotes y cocina", "🥫", "Aceites, conservas, pepperoni y básicos de cocina."),
    ("envases", "Envases", "📦", "Bandejas, pocillos, bowls, film y aluminio para delivery."),
]
# SKU de Bingrid que se marcan como "Más vendido" (mismos del catálogo PDF).
DESTACADOS = {50, 148, 39, 20, 157, 10, 146, 65}
# Orden dentro de cada categoría, por tipo de producto (igual que el PDF).
ORDEN = [r"^arroz", r"nori", r"panko|tempura", r"s[ée]samo", r"soya|teriyaki", r"wasabi|jengibre", r"palillos",
         r"queso crema", r"mozzarella", r"cheddar|azul", r"salm[oó]n", r"camar[oó]n", r"pulpo|tilapia", r"kanikama"]
# Formatos que Bingrid trae vacíos.
FORMATO = {47: "Bidón 5 litros"}

CABECERA = """/*
  CATÁLOGO DE COMERCIAL MACRI
  ---------------------------
  Generado con scripts/desde-bingrid.py desde el catálogo de Bingrid.
  Para agregar o cambiar un producto, edita esta lista (o vuelve a generarla).

  - id:        identificador único, sin espacios ni tildes
  - nombre:    nombre del producto
  - formato:   presentación (kg, litros, unidades)
  - categoria: "sushi" | "quesos" | "mar" | "abarrotes" | "envases"
  - foto:      nombre del archivo dentro de img/productos/ (ej: "arroz-tucapel.jpg").
               Si la foto no existe todavía, la web muestra una tarjeta de reemplazo.
  - precio:    número en pesos (ej: 1550) o null para mostrar "Consultar"
  - destacado: true para mostrarlo en "Lo más vendido"
*/
"""


def rango(nombre):
    for i, r in enumerate(ORDEN):
        if re.search(r, nombre, re.I):
            return i
    return 99


def main():
    productos = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    fotos = Path(sys.argv[2])
    cats = [c[0] for c in CATEGORIAS]
    lista, usados = [], set()
    for p in productos:
        f = p.get("foto")
        if not f:
            continue
        if (fotos / f).exists():
            shutil.copyfile(fotos / f, FOTOS_WEB / f)
        elif not (FOTOS_WEB / f).exists():
            continue
        pid = Path(f).stem
        if pid in usados:
            pid = f"{pid}-{p['sku']}"
        usados.add(pid)
        lista.append({
            "id": pid,
            "nombre": p["nombre"],
            "formato": p["formato"] or FORMATO.get(p["sku"], "Consultar formato"),
            "categoria": p["categoria"],
            "foto": f,
            "precio": None,
            "destacado": p["sku"] in DESTACADOS,
        })
    lista.sort(key=lambda p: (cats.index(p["categoria"]), rango(p["nombre"]), p["nombre"]))

    js = lambda v: json.dumps(v, ensure_ascii=False)
    out = [CABECERA, "window.CATEGORIAS = ["]
    out.append(",\n".join(f'  {{ id: {js(i)}, nombre: {js(n)}, icono: {js(e)}, texto: {js(t)} }}' for i, n, e, t in CATEGORIAS))
    out.append("];\n\nwindow.PRODUCTOS = [")
    filas, actual = [], None
    for p in lista:
        if p["categoria"] != actual:
            actual = p["categoria"]
            filas.append(f"  // {dict((c[0], c[1]) for c in CATEGORIAS)[actual]}")
        filas.append("  { " + ", ".join(f"{k}: {'null' if v is None else js(v)}" for k, v in p.items()) + " },")
    filas[-1] = filas[-1].rstrip(",")
    out += filas
    out.append("];\n")
    SALIDA.write_text("\n".join(out), encoding="utf-8")
    print(f"{len(lista)} productos escritos en {SALIDA.relative_to(RAIZ)}")


if __name__ == "__main__":
    main()
