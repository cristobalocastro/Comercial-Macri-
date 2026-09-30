"""Deja una foto de producto lista para la web: cuadrada, 800x800 px, JPG liviano.

Uso:
  python3 scripts/preparar-foto.py foto-original.jpg nombre-producto.jpg
  python3 scripts/preparar-foto.py afiche.jpg nombre.jpg --recorte 60,310,770,1330

--recorte  x1,y1,x2,y2 en píxeles para quedarse solo con el producto (por ejemplo, sacarlo de un afiche).
Requiere Pillow:  python3 -m pip install pillow
"""
import argparse
from pathlib import Path

from PIL import Image, ImageStat

DESTINO = Path(__file__).resolve().parent.parent / "sitio" / "img" / "productos"


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("origen")
    ap.add_argument("nombre", help="nombre del archivo final, el mismo del campo foto en productos.js")
    ap.add_argument("--recorte", help="x1,y1,x2,y2")
    ap.add_argument("--tamano", type=int, default=800)
    a = ap.parse_args()

    im = Image.open(a.origen).convert("RGB")
    if a.recorte:
        im = im.crop(tuple(int(v) for v in a.recorte.split(",")))
    w, h = im.size
    # Rellena hasta un cuadrado con el color del borde superior, para que no se note el relleno.
    fondo = tuple(int(v) for v in ImageStat.Stat(im.crop((0, 0, w, 4))).median)
    lado = int(max(w, h) * 1.08)
    lienzo = Image.new("RGB", (lado, lado), fondo)
    lienzo.paste(im, ((lado - w) // 2, (lado - h) // 2))
    lienzo = lienzo.resize((a.tamano, a.tamano), Image.LANCZOS)

    salida = DESTINO / Path(a.nombre).with_suffix(".jpg").name
    lienzo.save(salida, quality=82, optimize=True)
    print(f"✓ {salida.relative_to(DESTINO.parent.parent.parent)} ({salida.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
