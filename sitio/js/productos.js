/*
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

window.CATEGORIAS = [
  { id: "sushi", nombre: "Para sushi", icono: "🍣", texto: "Arroz, nori, panko, sésamo, salsas y todo para la barra." },
  { id: "quesos", nombre: "Quesos", icono: "🧀", texto: "Queso crema food service, mozzarella y quesos para cocina." },
  { id: "mar", nombre: "Pescados y mariscos", icono: "🐟", texto: "Salmón, camarón, pulpo, tilapia y kanikama congelados." },
  { id: "abarrotes", nombre: "Abarrotes y cocina", icono: "🥫", texto: "Aceites, conservas, pepperoni y básicos de cocina." },
  { id: "envases", nombre: "Envases", icono: "📦", texto: "Bandejas, pocillos, bowls, film y aluminio para delivery." }
];

window.PRODUCTOS = [
  // Para sushi
  { id: "arroz-parral", nombre: "Arroz Parral", formato: "1 kg", categoria: "sushi", foto: "arroz-parral.jpg", precio: null, destacado: false },
  { id: "arroz-tucapel", nombre: "Arroz grado 2 Tucapel Food Service", formato: "2 kg", categoria: "sushi", foto: "arroz-tucapel.jpg", precio: null, destacado: true },
  { id: "arroz-valle-de-oro", nombre: "Arroz grado 2 Valle de Oro", formato: "1 kg", categoria: "sushi", foto: "arroz-valle-de-oro.jpg", precio: null, destacado: false },
  { id: "nori-blue-mayamoto", nombre: "Alga nori Blue Mayamoto", formato: "Consultar formato", categoria: "sushi", foto: "nori-blue-mayamoto.jpg", precio: null, destacado: false },
  { id: "nori-gold-kadoshi", nombre: "Alga nori Gold Kadoshi", formato: "Consultar formato", categoria: "sushi", foto: "nori-gold-kadoshi.jpg", precio: null, destacado: false },
  { id: "nori-gold-yaki", nombre: "Alga nori Gold Yaki", formato: "100 hojas", categoria: "sushi", foto: "nori-gold-yaki.jpg", precio: null, destacado: true },
  { id: "panko-amarillo-kadoshi-10kg", nombre: "Panko amarillo Kadoshi", formato: "Saco 10 kg", categoria: "sushi", foto: "panko-amarillo-kadoshi-10kg.jpg", precio: null, destacado: false },
  { id: "panko-japofood", nombre: "Panko blanco Japofood", formato: "1 kg", categoria: "sushi", foto: "panko-japofood.jpg", precio: null, destacado: true },
  { id: "panko-blanco-kadoshi-10kg", nombre: "Panko blanco Kadoshi", formato: "Saco 10 kg", categoria: "sushi", foto: "panko-blanco-kadoshi-10kg.jpg", precio: null, destacado: false },
  { id: "sesamo-blanco-mayamoto", nombre: "Sésamo blanco Japofood", formato: "1 kg", categoria: "sushi", foto: "sesamo-blanco-mayamoto.jpg", precio: null, destacado: false },
  { id: "sesamo-negro-mayamoto", nombre: "Sésamo negro Japofood", formato: "1 kg", categoria: "sushi", foto: "sesamo-negro-mayamoto.jpg", precio: null, destacado: false },
  { id: "soya-juwaii", nombre: "Salsa de soya Juwaii", formato: "Bidón 5 litros", categoria: "sushi", foto: "soya-juwaii.jpg", precio: null, destacado: false },
  { id: "soya-kikkoman", nombre: "Salsa de soya Kikkoman", formato: "Balde 18,9 litros", categoria: "sushi", foto: "soya-kikkoman.jpg", precio: null, destacado: true },
  { id: "sachet-soya", nombre: "Salsa de soya en sachet", formato: "30 ml · caja de 250 unidades", categoria: "sushi", foto: "sachet-soya.jpg", precio: null, destacado: false },
  { id: "sachet-teriyaki", nombre: "Salsa teriyaki en sachet", formato: "30 ml · caja de 250 unidades", categoria: "sushi", foto: "sachet-teriyaki.jpg", precio: null, destacado: false },
  { id: "jengibre-rosado-japofood", nombre: "Jengibre rosado Japofood", formato: "1 kg", categoria: "sushi", foto: "jengibre-rosado-japofood.jpg", precio: null, destacado: false },
  { id: "wasabi-mayamoto", nombre: "Wasabi Hiroshi", formato: "1 kg", categoria: "sushi", foto: "wasabi-mayamoto.jpg", precio: null, destacado: false },
  { id: "palillos-chinos", nombre: "Palillos para sushi", formato: "Paquete de 100 unidades", categoria: "sushi", foto: "palillos-chinos.jpg", precio: null, destacado: false },
  // Quesos
  { id: "queso-crema-gran-d", nombre: "Queso crema Gran D", formato: "Barra 1,36 kg", categoria: "quesos", foto: "queso-crema-gran-d.jpg", precio: null, destacado: false },
  { id: "queso-crema-green-bay", nombre: "Queso crema Green Bay tradicional", formato: "Barra 1,36 kg", categoria: "quesos", foto: "queso-crema-green-bay.jpg", precio: null, destacado: false },
  { id: "queso-crema-rafulco", nombre: "Queso crema Rafulco", formato: "1,36 kg", categoria: "quesos", foto: "queso-crema-rafulco.jpg", precio: null, destacado: false },
  { id: "queso-crema-reny-picot", nombre: "Queso crema Reny Picot", formato: "Barra 1,36 kg", categoria: "quesos", foto: "queso-crema-reny-picot.jpg", precio: null, destacado: false },
  { id: "queso-crema-schreiber", nombre: "Queso crema Schreiber", formato: "Barra 1,36 kg", categoria: "quesos", foto: "queso-crema-schreiber.jpg", precio: null, destacado: true },
  { id: "queso-crema-smithfield", nombre: "Queso crema Smithfield", formato: "1,36 kg", categoria: "quesos", foto: "queso-crema-smithfield.jpg", precio: null, destacado: false },
  { id: "mozzarella-corlasa", nombre: "Queso mozzarella Corlasa", formato: "Barra", categoria: "quesos", foto: "mozzarella-corlasa.jpg", precio: null, destacado: false },
  { id: "mozzarella-pampa-cheese", nombre: "Queso mozzarella Pampa Cheese", formato: "Barra", categoria: "quesos", foto: "mozzarella-pampa-cheese.jpg", precio: null, destacado: false },
  { id: "queso-cheddar", nombre: "Queso cheddar laminado", formato: "Consultar formato", categoria: "quesos", foto: "queso-cheddar.jpg", precio: null, destacado: false },
  // Pescados y mariscos
  { id: "salmon-filete", nombre: "Salmón premium con piel", formato: "Calibre 3-4", categoria: "mar", foto: "salmon-filete.jpg", precio: null, destacado: true },
  { id: "camaron-36-40", nombre: "Camarón 36/40 GAG", formato: "Pelado desvenado asiático", categoria: "mar", foto: "camaron-36-40.jpg", precio: null, destacado: true },
  { id: "camaron-jetro", nombre: "Camarón 36/40 Jetro", formato: "Pelado desvenado", categoria: "mar", foto: "camaron-jetro.jpg", precio: null, destacado: false },
  { id: "camaron-premium-pacific", nombre: "Camarón 36/40 Premium Pacific", formato: "Pelado desvenado · 20% glaseado", categoria: "mar", foto: "camaron-premium-pacific.jpg", precio: null, destacado: false },
  { id: "pulpo-sg", nombre: "Pulpo SG", formato: "Calibre 2-3", categoria: "mar", foto: "pulpo-sg.jpg", precio: null, destacado: false },
  { id: "tilapia-filete", nombre: "Tilapia filete", formato: "5-7 oz", categoria: "mar", foto: "tilapia-filete.jpg", precio: null, destacado: false },
  { id: "tilapia-filete-183", nombre: "Tilapia filete", formato: "3-5 oz · granel", categoria: "mar", foto: "tilapia-filete.jpg", precio: null, destacado: false },
  { id: "kanikama-jetro", nombre: "Kanikama Jetro", formato: "500 g", categoria: "mar", foto: "kanikama-jetro.jpg", precio: null, destacado: false },
  { id: "kanikama", nombre: "Kanikama Sea Garden", formato: "Consultar formato", categoria: "mar", foto: "kanikama.jpg", precio: null, destacado: false },
  // Abarrotes y cocina
  { id: "aceite-maxifrits", nombre: "Aceite Maxi Frits", formato: "Bidón 10 litros", categoria: "abarrotes", foto: "aceite-maxifrits.jpg", precio: null, destacado: true },
  { id: "aceite-fc-5l", nombre: "Aceite para freír F&C", formato: "Bidón 5 litros", categoria: "abarrotes", foto: "aceite-fc-5l.jpg", precio: null, destacado: false },
  { id: "champinones-el-buho", nombre: "Champiñón entero El Búho", formato: "Lata 400 g", categoria: "abarrotes", foto: "champinones-el-buho.jpg", precio: null, destacado: false },
  { id: "champinon-laminado-el-buho", nombre: "Champiñón laminado El Búho", formato: "Lata 400 g", categoria: "abarrotes", foto: "champinon-laminado-el-buho.jpg", precio: null, destacado: false },
  { id: "choclito-el-buho", nombre: "Choclito cóctel El Búho", formato: "425 g", categoria: "abarrotes", foto: "choclito-el-buho.jpg", precio: null, destacado: false },
  { id: "esparragos-el-buho", nombre: "Espárragos verdes El Búho", formato: "425 g", categoria: "abarrotes", foto: "esparragos-el-buho.jpg", precio: null, destacado: false },
  { id: "nutella-3kg", nombre: "Nutella Food Service", formato: "3 kg", categoria: "abarrotes", foto: "nutella-3kg.jpg", precio: null, destacado: false },
  { id: "palmitos-dona-alicia", nombre: "Palmitos enteros Doña Alicia", formato: "400 g", categoria: "abarrotes", foto: "palmitos-dona-alicia.jpg", precio: null, destacado: false },
  { id: "palmito-el-buho", nombre: "Palmitos enteros El Búho", formato: "Lata 400 g", categoria: "abarrotes", foto: "palmito-el-buho.jpg", precio: null, destacado: false },
  { id: "palmito-el-buho-800", nombre: "Palmitos enteros El Búho", formato: "800 g", categoria: "abarrotes", foto: "palmito-el-buho-800.jpg", precio: null, destacado: false },
  { id: "pepperoni-sugardale", nombre: "Pepperoni americano Sugardale", formato: "5,67 kg", categoria: "abarrotes", foto: "pepperoni-sugardale.jpg", precio: null, destacado: false },
  { id: "vinagre-manzana-juwaii", nombre: "Vinagre de manzana", formato: "Bidón 5 litros", categoria: "abarrotes", foto: "vinagre-manzana-juwaii.jpg", precio: null, destacado: false },
  // Envases
  { id: "bandeja-pet-243", nombre: "Bandeja PET 243", formato: "Unidad", categoria: "envases", foto: "bandeja-pet-243.jpg", precio: null, destacado: false },
  { id: "bandeja-aluminio-c10", nombre: "Bandeja de aluminio C10", formato: "125 unidades", categoria: "envases", foto: "bandeja-aluminio-c10.jpg", precio: null, destacado: false },
  { id: "film-pvc-japofood", nombre: "Film PVC Japofood", formato: "300 metros", categoria: "envases", foto: "film-pvc-japofood.jpg", precio: null, destacado: false },
  { id: "papel-aluminio", nombre: "Papel aluminio", formato: "100 metros", categoria: "envases", foto: "papel-aluminio.jpg", precio: null, destacado: false },
  { id: "pocillo-1-5oz", nombre: "Pocillo 1,5 oz", formato: "100 unidades", categoria: "envases", foto: "pocillo-1-5oz.jpg", precio: null, destacado: false },
  { id: "salad-bowl-750", nombre: "Salad bowl 750 cc", formato: "10 unidades", categoria: "envases", foto: "salad-bowl-750.jpg", precio: null, destacado: false }
];
