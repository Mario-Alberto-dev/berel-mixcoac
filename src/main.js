/* =========================================================
   TIENDA DE PINTURAS - JS PRINCIPAL
   - Catálogo dinámico (filtros)
   - Modal de detalles
   - Carrito (se guarda en localStorage)
   - Botones WhatsApp (mensajes automáticos)
   ========================================================= */

/* =========================
   1) CONFIGURACIÓN (EDITA AQUÍ)
   ========================= */
const STORE = {
  name: "Pinturas Berel Mixcoac",
  whatsappNumber: "522722487124",
  address: "Castañeda #37-A, Mixcoac, Benito Juárez, CDMX",
  hours: "Lun–Vie 8:30–18:00 • Sáb 8:30–13:30 • Dom CERRADO",
  deliveryNote: "Entrega local según zona. Confírmanos tu colonia para costo/tiempo.",
  hoursDetailed: [
    { day: "Lunes", time: "8:30 a. m. - 6:00 p. m." },
    { day: "Martes", time: "8:30 a. m. - 6:00 p. m." },
    { day: "Miércoles", time: "8:30 a. m. - 6:00 p. m." },
    { day: "Jueves", time: "8:30 a. m. - 6:00 p. m." },
    { day: "Viernes", time: "8:30 a. m. - 6:00 p. m." },
    { day: "Sábado", time: "8:30 a. m. - 1:30 p. m." },
    { day: "Domingo", time: "CERRADO" },
  ],

  // Link para abrir la ruta en Google Maps
mapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Pinturas%20Berel%20Mixcoac",

// Iframe del mapa (embed)
mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d996.9418039707626!2d-99.19089840192837!3d19.37127364134806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d201c83edb31e1%3A0xc2c9a9a27fa79437!2sPinturas%20Berel%20Mixcoac!5e0!3m2!1ses-419!2smx!4v1766228160688!5m2!1ses-419!2smx",

socialsFooter: {
  tiktok: "" /* "https://www.tiktok.com/@berel"*/,
  x:"https://x.com/BerelMixcoac",
  facebook: "https://www.facebook.com/profile.php?id=100088952366296",
  instagram: "https://www.instagram.com/berel.mixcoac/",
  pinterest: "https://mx.pinterest.com/GrupoBerel/",
  linkedin: ""/* " https://www.linkedin.com/company/berel"*/,
  youtube: "https://www.youtube.com/@BerelGroup",
},
legal: {
  privacy: "#",
  terms: "#",
},


};

/* =========================
   2) DATOS (CATÁLOGO, SERVICIOS, PROMOS)
   - Aquí agregas/quitas productos
   ========================= */
   const BASE = import.meta.env.BASE_URL;
const PRODUCTS = [
  { id:"p1", name:"Vinílica Interior Mate", category:"Pintura", use:"Interior", size:"19 L", yield:"90–110 m² (aprox.)", price:1250, desc:"Acabado mate, excelente cobertura para muros y plafones. Ideal para casa u oficina.", img: BASE + "img/catalogo/berelex.green.png"  },
  { id:"p2", name:"Vinílica Exterior Lavable", category:"Pintura", use:"Exterior", size:"19 L", yield:"80–100 m² (aprox.)", price:1650, desc:"Resiste intemperie y es lavable. Buena durabilidad para fachadas.", img: BASE + "img/catalogo/kover.restaurador.png" },
  { id:"p3", name:"Esmalte Base Agua Brillante", category:"Esmalte", use:"Interior/Exterior", size:"4 L", yield:"30–40 m² (aprox.)", price:620, desc:"Para herrería, puertas y barandales. Secado rápido, menos olor.", img: BASE + "img/catalogo/mancha.al.aceite.png" },
  { id:"p4", name:"Esmalte Anticorrosivo", category:"Esmalte", use:"Exterior", size:"1 L", yield:"8–10 m² (aprox.)", price:190, desc:"Protección contra óxido para metal. Recomendado como base.", img: BASE + "img/catalogo/Qualik.png" },
  { id:"p5", name:"Impermeabilizante 3 años", category:"Impermeabilizante", use:"Exterior", size:"19 L", yield:"18–22 m² (2 manos)", price:1450, desc:"Sistema básico para techos en buen estado. Aplicación en 2 manos." },
  { id:"p6", name:"Impermeabilizante 5 años", category:"Impermeabilizante", use:"Exterior", size:"19 L", yield:"16–20 m² (2 manos)", price:1850, desc:"Mayor elasticidad y durabilidad. Recomendado para mantenimiento preventivo." },
  { id:"p7", name:"Sellador Acrílico", category:"Sellador", use:"Interior/Exterior", size:"19 L", yield:"80–100 m²", price:980, desc:"Mejora adherencia y uniforma absorción del muro. Reduce consumo de pintura." },
  { id:"p8", name:"Juego Rodillo + Charola", category:"Herramienta", use:"General", size:"9”", yield:"—", price:145, desc:"Ideal para aplicación rápida. Compatible con pinturas vinílicas." },
  { id:"p9", name:"Brocha Profesional", category:"Herramienta", use:"General", size:"2”", yield:"—", price:85, desc:"Cerdas firmes y buen trazo para recortes y detalles." },
  { id:"p10", name:"Primer para Metal", category:"Sellador", use:"Exterior", size:"1 L", yield:"8–10 m²", price:210, desc:"Base para mejorar adherencia del esmalte en superficies metálicas." },
  { id:"p11", name:"Pintura Tráfico Amarillo", category:"Especialidad", use:"Exterior", size:"4 L", yield:"25–35 m²", price:780, desc:"Alta visibilidad para señalización. Recomendado para piso/cajones." },
  { id:"p12", name:"Resanador Acrílico", category:"Complementos", use:"Interior", size:"1 kg", yield:"—", price:75, desc:"Rellena grietas y pequeños huecos. Lijable y fácil de aplicar." },
];

const SERVICES = [
  { title:"Sistema de igualación", text:"Preparamos el color exacto que necesitas, con precisión y consistencia." },
  { title:"Aceptamos tarjetas", text:"Paga con tarjeta para mayor comodidad en tus compras." },
  { title:"Servicio a domicilio", text:"Si lo necesitas, coordinamos entrega en la zona (según cobertura)." },
  { title:"Asesoría por proyecto", text:"Te decimos qué comprar según área, tipo de superficie y acabado." },
  { title:"Cotización rápida", text:"Mándanos medidas y ubicación; te respondemos con opción buena/mejor/ideal." },
  { title:"Facturación", text:"Te apoyamos con tus datos fiscales y comprobantes." },
];

const PROMOS = [
  { title:"Combo Pintura + Herramienta", text:"Compra 19L de pintura y llévate 10% en rodillo/charola." },
  { title:"Impermeabilizante + Sellador", text:"En sistemas completos aplican descuentos por volumen." },
  { title:"Igualación sin costo", text:"En compras seleccionadas, la igualación va incluida." },
];

/* =========================
   3) HELPERS (funciones pequeñas)
   ========================= */
const $ = (sel, root=document) => root.querySelector(sel);

// Elemento donde va la imagen del modal (existe en tu HTML)
const modalImgEl = document.querySelector("#modalBackdrop .modalImg");


// Formato de moneda MXN
const money = (n) => new Intl.NumberFormat("es-MX",{ style:"currency", currency:"MXN" }).format(n);



// Crea un link de WhatsApp con mensaje
function waLink(message){
  const num = STORE.whatsappNumber.replace(/\D/g,""); // deja solo números
  const txt = encodeURIComponent(message);
  return `https://wa.me/${num}?text=${txt}`;
}

// Scroll suave a una sección por id
function smoothTo(id){
  const el = document.getElementById(id);
  if(!el) return;
  el.scrollIntoView({ behavior:"smooth", block:"start" });
}

function applyTheme(theme){
  const root = document.documentElement;
  const btn = document.getElementById("btnTheme");

  if(theme === "dark"){
    root.classList.add("theme-dark");
    if(btn) btn.textContent = "☀️";
    localStorage.setItem("paint_theme", "dark");
  }else{
    root.classList.remove("theme-dark");
    if(btn) btn.textContent = "🌙";
    localStorage.setItem("paint_theme", "light");
  }
}

function initTheme(){
  const saved = localStorage.getItem("paint_theme");
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));

  const btn = document.getElementById("btnTheme");
  if(btn){
    btn.addEventListener("click", ()=>{
      const isDark = document.documentElement.classList.contains("theme-dark");
      applyTheme(isDark ? "light" : "dark");
    });
  }
}


/* =========================
   4) ESTADO (filtros + carrito)
   ========================= */
const state = {
  q: "",
  cat: "Todas",
  use: "Todos",
  cart: loadCart(),
  modalProductId: null
};

// Cargar carrito guardado (si existe)
function loadCart(){
  try{
    const raw = localStorage.getItem("paint_store_cart");
    return raw ? JSON.parse(raw) : {};
  }catch{
    return {};
  }
}

// Guardar carrito
function saveCart(){
  localStorage.setItem("paint_store_cart", JSON.stringify(state.cart));
}

// Total de piezas en el carrito
function cartCount(){
  return Object.values(state.cart).reduce((sum, qty)=>sum+qty, 0);
}

// Total de dinero del carrito
function cartTotal(){
  let total = 0;
  for(const [id, qty] of Object.entries(state.cart)){
    const p = PRODUCTS.find(x=>x.id===id);
    if(p) total += p.price * qty;
  }
  return total;
}

/* =========================
   5) RENDER (pintar HTML desde JS)
   ========================= */
function initStaticTexts(){
  // Dirección
  const addressEl = document.getElementById("addressText");
  if (addressEl) addressEl.textContent = STORE.address;

  // Horario resumen (el del hero)
  const hoursEl = document.getElementById("hoursText");
  if (hoursEl) hoursEl.textContent = STORE.hours;

  // Link base WhatsApp (3 botones)
  const baseMsg = `Hola 👋, quiero cotizar. ${STORE.deliveryNote}`;
  const link = waLink(baseMsg);

  const btnWhats = document.getElementById("btnWhats");
  const btnWhats2 = document.getElementById("btnWhats2");
  const footerWhats = document.getElementById("footerWhats");

  if (btnWhats) btnWhats.href = link;
  if (btnWhats2) btnWhats2.href = link;
  if (footerWhats) footerWhats.href = link;

  // Recomendación aleatoria
  const recommendations = [
    "¿Te preocupa el rendimiento? Dinos metros² y tipo de muro y te calculamos litros.",
    "Para exterior: sellador + 2 manos de pintura lavable mejora la durabilidad.",
    "Para metal: primer/anticorrosivo + esmalte. Evita aplicar sobre óxido suelto.",
    "En techo: revisa grietas y aplica sellador antes del impermeabilizante."
  ];

  const recEl = document.getElementById("recommendText");
  if (recEl) recEl.textContent = recommendations[Math.floor(Math.random() * recommendations.length)];

  // ✅ Horario en lista (CONTACTO)
  const list = document.getElementById("hoursList");
  if (list && Array.isArray(STORE.hoursDetailed)) {
    list.innerHTML = STORE.hoursDetailed.map(h => `
      <li class="hoursRow">
        <span class="hoursDay">${escapeHtml(h.day)}</span>
        <span class="hoursTime">${escapeHtml(h.time)}</span>
      </li>
    `).join("");
  }

  // =========================
// MAPA (iframe + botón "Cómo llegar")
// =========================
const addressMapEl = document.getElementById("addressTextMap");
if (addressMapEl) addressMapEl.textContent = STORE.address;

const btnDirections = document.getElementById("btnDirections");
if (btnDirections) btnDirections.href = STORE.mapsDirectionsUrl;

const mapIframe = document.getElementById("mapIframe");
if (mapIframe) mapIframe.src = STORE.mapsEmbedUrl;

// =========================
// FOOTER LEGAL + REDES
// =========================
const y = document.getElementById("footerYear");
if (y) y.textContent = new Date().getFullYear();

const privacy = document.getElementById("privacyLink");
const terms = document.getElementById("termsLink");

if (privacy) privacy.href = STORE.legal?.privacy || "#";
if (terms) terms.href = STORE.legal?.terms || "#";

const mapSocial = {
  fTikTok: STORE.socialsFooter?.tiktok,
  fFacebook: STORE.socialsFooter?.facebook,
  fInstagram: STORE.socialsFooter?.instagram,
  fX: STORE.socialsFooter?.x,
  fPinterest: STORE.socialsFooter?.pinterest,
  fLinkedIn: STORE.socialsFooter?.linkedin,
  fYouTube: STORE.socialsFooter?.youtube,
};

Object.entries(mapSocial).forEach(([id, url])=>{
  const el = document.getElementById(id);
  if (!el) return;
  if (url) el.href = url;
  else el.style.display = "none";
});

}


function renderServices(){
  const grid = $("#servicesGrid");
  grid.innerHTML = "";

  // Muestra máximo 6 servicios
  SERVICES.slice(0,6).forEach(s=>{
    const el = document.createElement("article");
    el.className = "sCard";
    el.innerHTML = `
      <h3 class="sCard__title">${escapeHtml(s.title)}</h3>
      <p class="sCard__text">${escapeHtml(s.text)}</p>
    `;
    grid.appendChild(el);
  });
}

function renderFilterOptions(){
  // Crea opciones únicas de categoría y uso
  const cats = ["Todas", ...new Set(PRODUCTS.map(p=>p.category))];
  const uses = ["Todos", ...new Set(PRODUCTS.map(p=>p.use))];

  $("#cat").innerHTML = cats.map(c=>`<option value="${escapeAttr(c)}">${escapeHtml(c)}</option>`).join("");
  $("#use").innerHTML = uses.map(u=>`<option value="${escapeAttr(u)}">${escapeHtml(u)}</option>`).join("");

  // Mantener valores actuales
  $("#cat").value = state.cat;
  $("#use").value = state.use;
}

function filteredProducts(){
  const q = state.q.trim().toLowerCase();

  return PRODUCTS.filter(p=>{
    const matchQ = !q || (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.use.toLowerCase().includes(q) ||
      p.size.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q)
    );

    const matchCat = (state.cat === "Todas") || (p.category === state.cat);
    const matchUse = (state.use === "Todos") || (p.use === state.use);

    return matchQ && matchCat && matchUse;
  });
}

function renderCatalog(){
  const grid = $("#catalogGrid");
  const items = filteredProducts();

  $("#resultInfo").textContent = `${items.length} producto(s) mostrado(s)`;
  grid.innerHTML = "";

  items.forEach(p=>{
    const card = document.createElement("article");
    card.className = "pCard";
    card.innerHTML = `
      <div class="pImg">
      <img src="${p.img || '/img/catalogo/default.png'}" alt="${escapeAttr(p.name)}" loading="lazy">
      </div>

      <div class="pBody">
        <h4 class="pName">${escapeHtml(p.name)}</h4>
        <p class="pMeta">Uso: ${escapeHtml(p.use)} • ${escapeHtml(p.size)}</p>
        <p class="pMeta">Rinde: ${escapeHtml(p.yield)}</p>

        <div class="pRow">
          <button class="ghost" data-action="details" data-id="${escapeAttr(p.id)}">Detalles</button>
          <button class="btn" data-action="add" data-id="${escapeAttr(p.id)}">Agregar</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* =========================
   6) MODAL (detalles del producto)
   ========================= */
function openModal(productId){
  const p = PRODUCTS.find(x=>x.id===productId);
  if(!p) return;

  state.modalProductId = productId;

  $("#mName").textContent = p.name;
  $("#mDesc").textContent = p.desc;
  $("#mUse").textContent = p.use;
  $("#mYield").textContent = p.yield;
  $("#mSize").textContent = p.size;
  $("#mPrice").textContent = money(p.price);

  // ✅ AQUÍ VA LA IMAGEN DEL MODAL
  const imgSrc = p.img || "/img/catalogo/default.png";
  if(modalImgEl){
    modalImgEl.innerHTML = `
      <img src="${imgSrc}" alt="${escapeAttr(p.name)}" loading="lazy">
    `;
  }


  const bd = $("#modalBackdrop");
  bd.classList.add("show");
  bd.setAttribute("aria-hidden","false");

  


}

function closeModal(){
  state.modalProductId = null;

  if(modalImgEl) modalImgEl.innerHTML= "";
  
  const bd = $("#modalBackdrop");
  bd.classList.remove("show");
  bd.setAttribute("aria-hidden","true");
}

/* =========================
   7) CARRITO (agregar, quitar, pintar)
   ========================= */
function addToCart(productId, qty=1){
  state.cart[productId] = (state.cart[productId] || 0) + qty;

  // Si llega a 0 o menos, lo borramos
  if(state.cart[productId] <= 0) delete state.cart[productId];

  saveCart();
  renderCartBadge();
  renderCart();
}

function renderCartBadge(){
  $("#cartCount").textContent = String(cartCount());
}

function renderCart(){
  const root = $("#cartItems");
  root.innerHTML = "";

  const ids = Object.keys(state.cart);

  // Si está vacío
  if(ids.length === 0){
    root.innerHTML = `<p class="small">Tu carrito está vacío. Agrega productos del catálogo.</p>`;
    $("#cartTotal").textContent = money(0);
    return;
  }

  // Pintar items
  ids.forEach(id=>{
    const p = PRODUCTS.find(x=>x.id===id);
    if(!p) return;

    const qty = state.cart[id];

    const el = document.createElement("div");
    el.className = "cartItem";
    el.innerHTML = `
      <div>
        <h5>${escapeHtml(p.name)}</h5>
        <p>${escapeHtml(p.size)} • ${money(p.price)} c/u</p>
      </div>

      <div class="qty">
        <button aria-label="Quitar" data-action="dec" data-id="${escapeAttr(id)}">−</button>
        <span>${qty}</span>
        <button aria-label="Agregar" data-action="inc" data-id="${escapeAttr(id)}">+</button>
      </div>
    `;

    root.appendChild(el);
  });

  $("#cartTotal").textContent = money(cartTotal());
}

function openCart(){
  $("#cartDrawer").classList.add("show");
}
function closeCart(){
  $("#cartDrawer").classList.remove("show");
}

/* =========================
   8) MENSAJES PARA WHATSAPP
   ========================= */
function cartToWhatsMessage(){
  const ids = Object.keys(state.cart);
  const lines = [];

  lines.push(`Hola 👋, quiero hacer un pedido/cotización en ${STORE.name}:`);
  lines.push("");

  ids.forEach(id=>{
    const p = PRODUCTS.find(x=>x.id===id);
    if(!p) return;
    const qty = state.cart[id];
    lines.push(`• ${qty} x ${p.name} (${p.size}) — ${money(p.price)} c/u`);
  });

  lines.push("");
  lines.push(`Total estimado: ${money(cartTotal())}`);
  lines.push(`Notas: ${STORE.deliveryNote}`);

  return lines.join("\n");
}

function promosToWhatsMessage(){
  const lines = [];

  lines.push("Hola 👋, ¿me compartes disponibilidad/precios de estas promos?");
  lines.push("");

  PROMOS.forEach(pr => lines.push(`• ${pr.title}: ${pr.text}`));

  lines.push("");
  lines.push("Mi zona/colonia es: ______");

  return lines.join("\n");
}

/* =========================
   9) EVENTOS (clics, filtros, etc.)
   ========================= */
function bindEvents(){
  // Botones del hero
  $("#btnVerServicios").addEventListener("click", ()=> smoothTo("servicios"));

  $("#btnCotizar").addEventListener("click", ()=>{
    const msg = `Hola 👋, quiero cotizar.
    
• Tipo de proyecto: ____
• Interior/Exterior: ____
• Metros² aproximados: ____
• Color/acabado: ____
• Ubicación/colonia: ____

${STORE.deliveryNote}`;

    window.open(waLink(msg), "_blank", "noopener");
  });

  // Promos
  $("#btnPromo").addEventListener("click", ()=>{
    window.open(waLink(promosToWhatsMessage()), "_blank", "noopener");
  });

  // Filtros
  $("#q").addEventListener("input", (e)=>{
    state.q = e.target.value;
    renderCatalog();
  });

  $("#cat").addEventListener("change", (e)=>{
    state.cat = e.target.value;
    renderCatalog();
  });

  $("#use").addEventListener("change", (e)=>{
    state.use = e.target.value;
    renderCatalog();
  });

  $("#btnClear").addEventListener("click", ()=>{
    // Reinicia filtros
    state.q = "";
    state.cat = "Todas";
    state.use = "Todos";

    // Limpia inputs
    $("#q").value = "";
    $("#cat").value = "Todas";
    $("#use").value = "Todos";

    renderCatalog();
  });

  // Clicks dentro del catálogo (con delegación)
  $("#catalogGrid").addEventListener("click", (e)=>{
    const btn = e.target.closest("button[data-action]");
    if(!btn) return;

    const id = btn.getAttribute("data-id");
    const action = btn.getAttribute("data-action");

    if(action === "details") openModal(id);
    if(action === "add") addToCart(id, 1);
  });

  // Modal
  $("#btnCloseModal").addEventListener("click", closeModal);
  $("#modalBackdrop").addEventListener("click", (e)=>{
    if(e.target.id === "modalBackdrop") closeModal();
  });

  // Tecla ESC cierra modal/carrito
  document.addEventListener("keydown", (e)=>{
    if(e.key === "Escape"){
      closeModal();
      closeCart();
    }
  });

  // Botón dentro del modal
  $("#btnAddFromModal").addEventListener("click", ()=>{
    if(state.modalProductId) addToCart(state.modalProductId, 1);
  });

  $("#btnAskWhats").addEventListener("click", ()=>{
    if(!state.modalProductId) return;

    const p = PRODUCTS.find(x=>x.id===state.modalProductId);
    if(!p) return;

    const msg = `Hola 👋, tengo una pregunta sobre: ${p.name} (${p.size}).

• Uso: ${p.use}
• ¿Disponible?
• ¿Qué color/acabado recomiendas?

Mi colonia es: ____`;

    window.open(waLink(msg), "_blank", "noopener");
  });

  // Carrito: abrir/cerrar
  $("#btnCart").addEventListener("click", ()=>{
    renderCart();
    openCart();
  });
  $("#btnCloseCart").addEventListener("click", closeCart);

  // Carrito: + y - (delegación)
  $("#cartItems").addEventListener("click", (e)=>{
    const btn = e.target.closest("button[data-action]");
    if(!btn) return;

    const id = btn.getAttribute("data-id");
    const action = btn.getAttribute("data-action");

    if(action === "inc") addToCart(id, 1);
    if(action === "dec") addToCart(id, -1);
  });

  // Vaciar carrito
  $("#btnEmpty").addEventListener("click", ()=>{
    state.cart = {};
    saveCart();
    renderCartBadge();
    renderCart();
  });

  // Checkout (manda el carrito por WhatsApp)
  $("#btnCheckout").addEventListener("click", ()=>{
    if(cartCount() === 0){
      alert("Tu carrito está vacío.");
      return;
    }
    window.open(waLink(cartToWhatsMessage()), "_blank", "noopener");
  });
}

/* =========================
   10) SEGURIDAD BÁSICA
   - Evita inyectar HTML raro
   ========================= */
function escapeHtml(s){
  return String(s)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}
function escapeAttr(s){
  return escapeHtml(s).replaceAll("`","&#096;");
}

/* =========================
   11) INIT (arranque)
   ========================= */
function init(){
  initTheme();
  initStaticTexts();
  renderServices();
  renderFilterOptions();
  renderCatalog();
  renderCartBadge();
  bindEvents();
}
init();