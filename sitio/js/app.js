// Comercial Macri · catálogo y pedido por WhatsApp
(() => {
  const WA_NUMBER = "56966460064"; // WhatsApp de ventas
  const FOTOS = "img/productos/";
  const CATS = Object.fromEntries(window.CATEGORIAS.map(c => [c.id, c]));
  const PRODS = window.PRODUCTOS;
  const byId = Object.fromEntries(PRODS.map(p => [p.id, p]));

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const clp = n => "$" + n.toLocaleString("es-CL");
  const wa = msg => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // ---------- enlaces directos a WhatsApp ----------
  $$(".js-wa").forEach(a => {
    a.href = wa(a.dataset.msg || "Hola Comercial Macri");
    a.target = "_blank";
    a.rel = "noopener";
  });

  // ---------- imagen con reemplazo si falta la foto ----------
  const placeholder = p =>
    `<div class="ph"><span class="e">${CATS[p.categoria]?.icono || "📦"}</span><small>Foto pendiente</small></div>`;
  const media = p =>
    p.foto
      ? `<img src="${FOTOS + esc(p.foto)}" alt="${esc(p.nombre)} ${esc(p.formato)}" loading="lazy" data-fallback>`
      : placeholder(p);
  document.addEventListener("error", e => {
    const img = e.target;
    if (img.tagName === "IMG" && img.hasAttribute("data-fallback")) {
      const p = byId[img.closest("[data-id]")?.dataset.id];
      img.outerHTML = p ? placeholder(p) : "";
    }
  }, true);

  // ---------- carrito (se guarda en este navegador) ----------
  let cart = {};
  try { cart = JSON.parse(localStorage.getItem("macri-pedido") || "{}"); } catch { cart = {}; }
  for (const id in cart) if (!byId[id]) delete cart[id];
  const save = () => { try { localStorage.setItem("macri-pedido", JSON.stringify(cart)); } catch {} };
  const count = () => Object.values(cart).reduce((a, b) => a + b, 0);

  function setQty(id, q) {
    if (q <= 0) delete cart[id]; else cart[id] = Math.min(q, 999);
    save();
    renderCart();
    $$(`[data-id="${id}"] .foot`).forEach(f => (f.innerHTML = controls(byId[id])));
  }

  const controls = p => {
    const priceHtml = p.precio ? `<span class="price">${clp(p.precio)}</span>` : `<span class="price ask">Precio a consultar</span>`;
    const q = cart[p.id] || 0;
    const ctl = q
      ? `<span class="stepper"><button type="button" data-act="dec" aria-label="Quitar uno">−</button><output>${q}</output><button type="button" data-act="inc" aria-label="Agregar uno">+</button></span>`
      : `<button type="button" class="add" data-act="add">+ Agregar</button>`;
    return priceHtml + ctl;
  };

  // ---------- catálogo ----------
  const grid = $("#grid");
  let filtro = "todos", busqueda = "";

  function renderGrid() {
    const q = busqueda.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
    const list = PRODS.filter(p =>
      (filtro === "todos" || p.categoria === filtro) &&
      (!q || (p.nombre + " " + p.formato).normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().includes(q))
    );
    grid.innerHTML = list.length
      ? list.map(p => `
        <article class="card" data-id="${p.id}">
          <div class="media">${media(p)}${p.destacado ? '<span class="tag">Más vendido</span>' : ""}</div>
          <div class="body">
            <span class="cat-name">${esc(CATS[p.categoria]?.nombre || "")}</span>
            <h3>${esc(p.nombre)}</h3>
            <span class="fmt">${esc(p.formato)}</span>
            <div class="foot">${controls(p)}</div>
          </div>
        </article>`).join("")
      : `<p class="empty">No encontramos "${esc(busqueda)}". <a class="js-wa-q" href="${wa("Hola, ¿tienen " + busqueda + "?")}" target="_blank" rel="noopener">Pregúntanos por WhatsApp</a>, lo más probable es que lo tengamos.</p>`;
  }

  grid.addEventListener("click", e => {
    const btn = e.target.closest("[data-act]");
    if (!btn) return;
    const id = btn.closest("[data-id]").dataset.id;
    const q = cart[id] || 0;
    if (btn.dataset.act === "add") { setQty(id, 1); toast(`${byId[id].nombre} agregado a tu pedido`); }
    if (btn.dataset.act === "inc") setQty(id, q + 1);
    if (btn.dataset.act === "dec") setQty(id, q - 1);
  });

  function setFiltro(id) {
    filtro = id;
    $$(".tab").forEach(t => t.setAttribute("aria-pressed", t.dataset.cat === id));
    renderGrid();
  }

  $("#tabs").innerHTML =
    `<button class="tab" data-cat="todos" aria-pressed="true">Todos</button>` +
    window.CATEGORIAS.map(c => `<button class="tab" data-cat="${c.id}" aria-pressed="false">${c.icono} ${c.nombre}</button>`).join("");
  $("#tabs").addEventListener("click", e => { const t = e.target.closest(".tab"); if (t) setFiltro(t.dataset.cat); });
  $("#buscar").addEventListener("input", e => { busqueda = e.target.value.trim(); renderGrid(); });

  // tarjetas de categoría -> filtran el catálogo
  $("#cats").innerHTML = window.CATEGORIAS.map(c => `
    <button class="cat" data-cat="${c.id}">
      <span class="ic">${c.icono}</span><h3>${c.nombre}</h3><p>${c.texto}</p><span class="go">Ver productos →</span>
    </button>`).join("");
  $("#cats").addEventListener("click", e => {
    const c = e.target.closest(".cat"); if (!c) return;
    setFiltro(c.dataset.cat);
    $("#catalogo").scrollIntoView();
  });

  // collage de portada con los destacados
  const PORTADA = ["salmon-filete", "nori-gold-yaki", "qc-schreiber", "soya-kikkoman"];
  $("#collage").innerHTML = PORTADA.map(id => byId[id]).filter(Boolean).map(p =>
    `<div class="tile" data-id="${p.id}"><div class="ph-wrap" style="aspect-ratio:1/1;border-radius:12px;overflow:hidden">${media(p).replace('loading="lazy"', "")}</div><b>${esc(p.nombre)}</b></div>`
  ).join("");

  // ---------- panel del pedido ----------
  const items = $("#cart-items");
  function renderCart() {
    const n = count();
    $$(".cart-count").forEach(el => { el.textContent = n; el.dataset.n = n; });
    const ids = Object.keys(cart);
    items.innerHTML = ids.length
      ? ids.map(id => {
          const p = byId[id];
          return `<div class="line" data-id="${id}">
            <div class="thumb">${media(p)}</div>
            <div><b>${esc(p.nombre)}</b><span>${esc(p.formato)}</span></div>
            <span class="stepper"><button type="button" data-act="dec" aria-label="Quitar uno">−</button><output>${cart[id]}</output><button type="button" data-act="inc" aria-label="Agregar uno">+</button></span>
          </div>`;
        }).join("")
      : `<div class="empty-cart"><p style="font-size:2rem;margin:0">🛒</p><p>Tu pedido está vacío.<br>Agrega productos desde el catálogo.</p></div>`;
    $("#send").disabled = !ids.length;
  }
  items.addEventListener("click", e => {
    const btn = e.target.closest("[data-act]"); if (!btn) return;
    const id = btn.closest("[data-id]").dataset.id;
    setQty(id, (cart[id] || 0) + (btn.dataset.act === "inc" ? 1 : -1));
  });

  const open = () => document.body.classList.add("cart-open");
  const close = () => document.body.classList.remove("cart-open");
  $$(".js-open-cart").forEach(b => b.addEventListener("click", open));
  $$(".js-close-cart").forEach(b => b.addEventListener("click", close));
  document.addEventListener("keydown", e => e.key === "Escape" && close());

  $("#order-form").addEventListener("submit", e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const lines = Object.entries(cart).map(([id, q]) => `• ${q} x ${byId[id].nombre} (${byId[id].formato})`);
    const msg = [
      "Hola Comercial Macri, quiero hacer este pedido:",
      "",
      ...lines,
      "",
      `Nombre: ${f.get("nombre")}`,
      f.get("local") ? `Local: ${f.get("local")}` : null,
      f.get("comuna") ? `Comuna: ${f.get("comuna")}` : null,
      `Entrega: ${f.get("entrega")}`,
      f.get("nota") ? `Comentario: ${f.get("nota")}` : null
    ].filter(v => v !== null).join("\n");
    window.open(wa(msg), "_blank", "noopener");
  });

  // ---------- aviso breve ----------
  const t = $("#toast");
  let timer;
  function toast(text) {
    t.innerHTML = `<span>${esc(text)}</span><button type="button" class="js-open-cart">Ver pedido</button>`;
    $(".js-open-cart", t).addEventListener("click", open);
    t.classList.add("show");
    clearTimeout(timer);
    timer = setTimeout(() => t.classList.remove("show"), 2600);
  }

  $("#year").textContent = new Date().getFullYear();
  renderGrid();
  renderCart();
})();
