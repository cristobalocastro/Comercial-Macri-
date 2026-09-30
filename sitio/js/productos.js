/*
  CATÁLOGO DE COMERCIAL MACRI
  ---------------------------
  Para agregar o cambiar un producto, edita esta lista.

  - id:        identificador único, sin espacios ni tildes
  - nombre:    nombre del producto
  - formato:   presentación (kg, litros, unidades)
  - categoria: "sushi" | "quesos" | "congelados" | "abarrotes"
  - foto:      nombre del archivo dentro de img/productos/ (ej: "arroz-tucapel.jpg").
               Si la foto no existe todavía, la web muestra una tarjeta de reemplazo.
  - precio:    número en pesos (ej: 1550) o null para mostrar "Consultar"
  - destacado: true para mostrarlo en "Lo más vendido"
*/
window.CATEGORIAS = [
  { id: "sushi",      nombre: "Para sushi",  icono: "🍣", texto: "Arroz, nori, panko, soya y todo lo de la barra." },
  { id: "quesos",     nombre: "Quesos",      icono: "🧀", texto: "Queso crema food service y quesos para pizzería." },
  { id: "congelados", nombre: "Pescados y mariscos", icono: "🐟", texto: "Salmón, camarón y productos del mar." },
  { id: "abarrotes",  nombre: "Abarrotes",   icono: "🥫", texto: "Aceites, vinagres, conservas y básicos de cocina." }
];

window.PRODUCTOS = [
  // Para sushi
  { id: "arroz-tucapel-g2",    nombre: "Arroz grado 2 Tucapel Food Service", formato: "1 kg · largo ancho nacional",      categoria: "sushi",      foto: "arroz-tucapel.jpg",          precio: null, destacado: true },
  { id: "arroz-valle-de-oro",  nombre: "Arroz grado 2 Valle de Oro",       formato: "1 kg · largo ancho nacional",      categoria: "sushi",      foto: "arroz-valle-de-oro.jpg",     precio: null, destacado: false },
  { id: "arroz-parral",        nombre: "Arroz grado 2 Parral",             formato: "1 kg · largo ancho, 80% granos enteros", categoria: "sushi", foto: "arroz-parral.jpg",          precio: null, destacado: false },
  { id: "nori-gold-yaki",      nombre: "Alga nori Gold Yaki",              formato: "100 hojas",                        categoria: "sushi",      foto: "nori-gold-yaki.jpg",         precio: null, destacado: true },
  { id: "panko-japofood",      nombre: "Panko blanco Japofood",            formato: "1 kg",                             categoria: "sushi",      foto: "panko-japofood.jpg",         precio: null, destacado: false },
  { id: "harina-tempura-japofood", nombre: "Harina tempura Japofood", formato: "1 kg · también caja de 10 x 1 kg", categoria: "sushi", foto: "harina-tempura-japofood.jpg", precio: null, destacado: false },
  { id: "sesamo-blanco-mayamoto", nombre: "Sésamo blanco tostado Mayamoto", formato: "1 kg", categoria: "sushi", foto: "sesamo-blanco-mayamoto.jpg", precio: null, destacado: false },
  { id: "sesamo-negro-mayamoto", nombre: "Sésamo negro Mayamoto", formato: "1 kg", categoria: "sushi", foto: "sesamo-negro-mayamoto.jpg", precio: null, destacado: false },
  { id: "sachet-soya",         nombre: "Salsa de soya Eat One en sachet",  formato: "30 ml · caja de 250 unidades",     categoria: "sushi",      foto: "sachet-soya.jpg",            precio: null, destacado: true },
  { id: "sachet-teriyaki",     nombre: "Salsa teriyaki Eat One en sachet", formato: "30 g · caja de 250 unidades",      categoria: "sushi",      foto: "sachet-teriyaki.jpg",        precio: null, destacado: false },
  { id: "soya-kikkoman", nombre: "Salsa de soya Kikkoman", formato: "Balde 18,9 litros (5 galones)", categoria: "sushi", foto: "soya-kikkoman.jpg", precio: null, destacado: true },
  { id: "soya-juwaii", nombre: "Salsa de soya Juwaii", formato: "Botellas y bidón de 5 litros", categoria: "sushi", foto: "soya-juwaii.jpg", precio: null, destacado: false },
  // Quesos
  { id: "qc-schreiber",        nombre: "Queso crema Schreiber",            formato: "Barra 1,36 kg",                    categoria: "quesos",     foto: "queso-crema-schreiber.jpg",  precio: null, destacado: true },
  { id: "qc-reny-picot",       nombre: "Queso crema Reny Picot",           formato: "Barra 1,36 kg",                    categoria: "quesos",     foto: "queso-crema-reny-picot.jpg", precio: null, destacado: false },
  { id: "qc-gran-d",           nombre: "Queso crema Gran D",               formato: "Barra 1,36 kg",                    categoria: "quesos",     foto: "queso-crema-gran-d.jpg",     precio: null, destacado: false },
  { id: "qc-krol",             nombre: "Queso crema Krol",                 formato: "Barra 1,36 kg · sucedáneo",        categoria: "quesos",     foto: "queso-crema-krol.jpg",       precio: null, destacado: false },
  { id: "qc-green-bay",        nombre: "Queso crema Green Bay",            formato: "Barra 1,36 kg",                    categoria: "quesos",     foto: "queso-crema-green-bay.jpg",  precio: null, destacado: false },
  { id: "qc-rafulco",          nombre: "Queso crema Rafulco",              formato: "Barra 1,36 kg",                    categoria: "quesos",     foto: "queso-crema-rafulco.jpg",    precio: null, destacado: false },
  // Congelados
  { id: "camaron-36-40",       nombre: "Camarón 36/40 GAG",                formato: "Pelado desvenado asiático · 1 kg", categoria: "congelados", foto: "camaron-36-40.jpg",          precio: null, destacado: true },
  { id: "salmon-filete", nombre: "Filete de salmón", formato: "Con piel · consultar calibre y formato", categoria: "congelados", foto: "salmon-filete.jpg", precio: null, destacado: true },
  // Abarrotes
  { id: "aceite-maxifrits",    nombre: "Aceite maravilla Maxifrits",       formato: "Bidón 5 o 10 litros",              categoria: "abarrotes",  foto: "aceite-maxifrits.jpg",       precio: null, destacado: true },
  { id: "vinagre-manzana-juwaii", nombre: "Vinagre de manzana Juwaii", formato: "Bidón 5 litros", categoria: "abarrotes", foto: "vinagre-manzana-juwaii.jpg", precio: null, destacado: false },
  { id: "palmitos-dona-alicia", nombre: "Palmitos enteros Doña Alicia", formato: "Tarro 400 g y 800 g", categoria: "abarrotes", foto: "palmitos-dona-alicia.jpg", precio: null, destacado: false },
  { id: "palmito-el-buho", nombre: "Palmito entero El Búho", formato: "Lata 400 g", categoria: "abarrotes", foto: "palmito-el-buho.jpg", precio: null, destacado: false },
  { id: "champinones-el-buho", nombre: "Champiñones enteros El Búho", formato: "Lata 400 g", categoria: "abarrotes", foto: "champinones-el-buho.jpg", precio: null, destacado: false }
];
