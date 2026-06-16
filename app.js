const app = document.querySelector("#app");

const assets = {
  logo: "assets/lotus-logo.png",
  homeHero: "assets/home-hero.png",
  storeHero: "assets/store-hero.png",
  storefront: "assets/storefront-wide.png",
  qris: "assets/qris-code.png",
  cup: "assets/cup.png",
  detailMatcha: "assets/detail-hot-matcha.png",
  checkoutProduct: "assets/checkout-product.png",
};

const menus = [
  { id: "hot-matcha", name: "Hot Matcha", price: 24000, img: "assets/hot-matcha.png", desc: "Matcha khas el Lotus dengan perpaduan antara matcha dan ekstrak bunga lotus." },
  { id: "hot-cappucino", name: "Hot Cappucino", price: 24000, img: "assets/hot-cappucino.png", desc: "Espresso hangat dengan foam lembut dan aroma kopi yang tebal." },
  { id: "ice-cafe-latte", name: "Ice Cafe Latte", price: 25000, img: "assets/ice-cafe-latte.png", desc: "Latte dingin dengan susu creamy dan espresso seimbang." },
  { id: "ice-pink-matcha", name: "Ice Pink Matcha", price: 28000, img: "assets/ice-pink-matcha.png", desc: "Matcha dingin dengan sentuhan stroberi yang manis dan ringan." },
  { id: "ice-matcha-latte", name: "Ice Matcha Latte", price: 35000, img: "assets/ice-matcha-latte.png", desc: "Matcha latte dingin favorit el Lotus." },
  { id: "ice-americano", name: "Ice Americano", price: 20000, img: "assets/ice-americano.png", desc: "Americano dingin yang bersih, ringan, dan segar." },
];

const popular = [
  { name: "matchalalu", price: 35000, img: "assets/popular-matchalalu.png" },
  { name: "ice cappucino", price: 35000, img: "assets/popular-cappucino.png" },
  { name: "ice mekar latte", price: 35000, img: "assets/popular-latte.png" },
  { name: "matchalalu", price: 35000, img: "assets/popular-matchalalu.png" },
  { name: "ice cappucino", price: 35000, img: "assets/popular-cappucino.png" },
  { name: "ice mekar latte", price: 35000, img: "assets/popular-latte.png" },
];

const outlets = ["el Lotus MERR Surabaya", "el Lotus Kertajaya", "el Lotus Keputih", "el Lotus Perumdos ITS"];
const branchMenus = {
  "el Lotus MERR Surabaya": ["hot-matcha", "hot-cappucino", "ice-cafe-latte", "ice-pink-matcha", "ice-matcha-latte", "ice-americano"],
  "el Lotus Kertajaya": ["hot-matcha", "ice-cafe-latte", "ice-pink-matcha", "ice-americano"],
  "el Lotus Keputih": ["hot-cappucino", "ice-cafe-latte", "ice-matcha-latte", "ice-americano"],
  "el Lotus Perumdos ITS": ["hot-matcha", "hot-cappucino", "ice-pink-matcha", "ice-matcha-latte"],
};
const paymentMethods = [
  { id: "qris", label: "QRIS", caption: "Scan atau bagikan QR code" },
  { id: "ewallet", label: "E-Wallet", caption: "GoPay, OVO, Dana" },
  { id: "va", label: "Virtual Account", caption: "Transfer bank otomatis" },
  { id: "card", label: "Kartu Debit/Kredit", caption: "Visa atau Mastercard" },
];
const brandCopy = {
  intro: "A simple, calm, and Gen-Z friendly cafe ordering experience.",
  profile: "A place for interaction, comfort, and experience.",
};
const state = {
  view: "loading",
  tab: "home",
  user: {
    isLoggedIn: false,
    name: "Nama Pengguna",
    email: "email@example.com",
    phone: "+62 8xx xxxx xxxx",
  },
  selectedMenu: menus[0],
  qty: 1,
  location: "Pilih Lokasi",
  locationOpen: false,
  size: "Reguler",
  sweetness: "100%",
  ice: "0%",
  topping: "Boba",
  note: "",
  promoApplied: false,
  paymentMethod: "qris",
  activityMode: "active",
  toast: "",
  locationError: false,
  orders: [],
};

const rupiah = (value) => `Rp${value.toLocaleString("id-ID")}`;
const selectedOutlet = () => state.location !== "Pilih Lokasi";
const deliveryFee = () => 10000;
const promoDiscount = () => (state.promoApplied ? 8000 : 0);
const grandTotal = () => Math.max(0, totalProduct() + deliveryFee() - promoDiscount());
const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
}[char]));
const icon = (name) => {
  const paths = {
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
    cup: '<path d="M6 8h10l-1 13H7L6 8Z"/><path d="M5 8h12"/><path d="M8 3h6"/><path d="M9 3v5"/><path d="M15 11h2a3 3 0 0 1 0 6h-1"/>',
    bag: '<path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/><path d="M9 13h6"/>',
    ticket: '<path d="M3 9a3 3 0 0 0 0 6v3h18v-3a3 3 0 0 0 0-6V6H3v3Z"/><path d="M9 9h.01"/><path d="M15 15h.01"/><path d="M16 8 8 16"/>',
    pin: '<path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
    home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v11h14V10"/><path d="M9 21v-7h6v7"/>',
    cart: '<path d="M4 5h2l2 12h10l2-8H8"/><circle cx="10" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    check: '<path d="m4 13 5 5L20 6"/>',
    arrow: '<path d="M15 18 9 12l6-6"/>',
    wallet: '<path d="M3 7h18v12H3z"/><path d="M16 12h5"/><path d="M3 7l4-4h11v4"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="M9 12l2 2 4-5"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a3 3 0 1 1 4.5 2.6c-1.2.7-2 1.3-2 2.4"/><path d="M12 17h.01"/>',
    card: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/><path d="M7 15h3"/>',
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name] || ""}</svg>`;
};

function render() {
  if (state.view === "loading") return renderLoading();
  if (state.view === "detail") return renderDetail();
  if (state.view === "checkout") return renderCheckout();
  if (state.view === "payment") return renderPayment();
  if (state.view === "qris") return renderQris();
  if (state.view === "success") return renderSuccess();
  if (state.tab === "order") return renderMenu();
  if (state.tab === "activity") return renderActivity();
  if (state.tab === "profile") return renderProfile();
  return renderHome();
}

function setTab(tab) {
  state.tab = tab;
  state.view = "main";
  state.locationOpen = false;
  render();
}

function flash(message) {
  state.toast = message;
  render();
  window.clearTimeout(flash.timer);
  flash.timer = window.setTimeout(() => {
    state.toast = "";
    render();
  }, 1500);
}

function toastMarkup() {
  return state.toast ? `<div class="toast">${state.toast}</div>` : "";
}

function nav() {
  return `
    <nav class="bottom-nav">
      ${[
        ["home", "Beranda", "home"],
        ["order", "Pesan", "cart"],
        ["activity", "Aktivitas", "clock"],
        ["profile", "Profil", "user"],
      ].map(([tab, label, symbol]) => `
        <button class="nav-item ${state.tab === tab ? "active" : ""}" onclick="setTab('${tab}')">
          ${icon(symbol)}<span>${label}</span>
        </button>
      `).join("")}
    </nav>
  `;
}

function renderLoading() {
  app.innerHTML = `
    <section class="loading-screen">
      <div>
        <img class="loading-mark" src="${assets.logo}" alt="el Lotus" />
        <h1 class="brand-word">el <strong>Lotus</strong></h1>
        <p class="tagline">a place to bloom,<br />chill, and connect</p>
      </div>
    </section>
  `;
}

function renderHome() {
  app.innerHTML = `
    <section class="screen">
      <header class="topbar">
        <div class="logo-row"><img class="logo" src="${assets.logo}" alt="" /><span class="logo-word">el <strong>Lotus</strong></span></div>
        <div class="top-actions">
          <button class="round-icon" aria-label="Notifikasi">${icon("bell")}</button>
          <button class="avatar avatar-default" onclick="setTab('profile')" aria-label="Profil">${icon("user")}</button>
        </div>
      </header>

      <div class="hello">
        <h1>hey, good to see you!</h1>
        <p>${brandCopy.intro}</p>
      </div>

      <section class="home-hero">
        <img src="${assets.homeHero}" alt="Interior el Lotus" />
        <div class="home-hero-content">
          <h2>&ldquo;a place to bloom, chill, and connect&rdquo;</h2>
          <button class="pill-button" onclick="setTab('order')">explore el Lotus &rsaquo;</button>
        </div>
      </section>
      <div class="dots"><span class="active"></span><span></span><span></span></div>

      <div class="quick-grid">
        ${[
          ["cup", "order", "pickup / dine-in", "order"],
          ["bag", "order ahead", "skip the queue", "order"],
          ["ticket", "promos", "special for you", "profile"],
          ["pin", "find us", "our location", "order"],
        ].map(([symbol, title, text, target]) => `
          <button class="quick-card" onclick="setTab('${target}')">
            ${icon(symbol)}<div><strong>${title}</strong><span>${text}</span></div>
          </button>
        `).join("")}
      </div>

      <section class="promo">
        <div class="tiny-logo">&#10047; el Lotus</div>
        <h2>earn points, bloom more!</h2>
        <p>air, air apa yang semangat? airobik xixixi</p>
        <button onclick="applyPromoFromHome()" aria-label="Lihat promo">&rsaquo;</button>
      </section>

      <div class="section-title"><h2>popular picks</h2><button onclick="setTab('order')">see all &rsaquo;</button></div>
      <div class="popular-grid">
        ${popular.map((item, index) => `
          <button class="popular-card" onclick="openDetail('${menus[index % menus.length].id}')">
            <img src="${item.img}" alt="${item.name}" />
            <strong>${item.name}</strong>
            <span>Rp ${item.price.toLocaleString("id-ID")}</span>
          </button>
        `).join("")}
      </div>
    </section>
    ${nav()}
    ${toastMarkup()}
  `;
}

function renderMenu() {
  const visibleMenus = selectedOutlet() ? menus.filter((item) => branchMenus[state.location].includes(item.id)) : menus;
  app.innerHTML = `
    <section class="screen menu-screen">
      <div class="location-box">
        <button class="location-toggle ${state.locationError ? "error" : ""}" onclick="toggleLocation()">${state.location}<span>&#8964;</span></button>
        ${state.locationOpen ? `<div class="location-menu">
          ${outlets.map((outlet) => `<button onclick="chooseLocation('${outlet}')">${outlet}</button>`).join("")}
        </div>` : ""}
      </div>
      ${selectedOutlet() ? `<div class="branch-chip">Menu tersedia di ${state.location.replace("el Lotus ", "")}</div>` : ""}
      <div class="hero-photo"><img src="${assets.storeHero}" alt="Outlet el Lotus" /></div>
      <h1 class="menu-title">Menu el Lotus <img src="${assets.logo}" alt="" /></h1>
      <div class="menu-grid">
        ${visibleMenus.map((item) => `
          <button class="menu-card" onclick="openDetail('${item.id}')">
            <h3>${item.name}</h3>
            <img src="${item.img}" alt="${item.name}" />
            <span>Tambahkan</span>
          </button>
        `).join("")}
      </div>
    </section>
    ${nav()}
    ${toastMarkup()}
  `;
}

function toggleLocation() {
  state.locationOpen = !state.locationOpen;
  render();
}

function chooseLocation(outlet) {
  state.location = outlet;
  state.locationOpen = false;
  state.locationError = false;
  flash(`Outlet dipilih: ${outlet.replace("el Lotus ", "")}`);
}

function requireLocation() {
  if (selectedOutlet()) return true;
  state.locationError = true;
  state.tab = "order";
  state.view = "main";
  flash("Pilih lokasi outlet dulu sebelum memesan.");
  return false;
}

function applyPromoFromHome() {
  state.promoApplied = true;
  flash("Promo ongkir 8rb siap dipakai.");
}

function openDetail(id) {
  if (!requireLocation()) return;
  state.selectedMenu = menus.find((item) => item.id === id) || menus[0];
  state.qty = 1;
  state.view = "detail";
  state.tab = "order";
  state.locationError = false;
  render();
}

function renderDetail() {
  const item = state.selectedMenu;
  const safeNote = escapeHtml(state.note);
  app.innerHTML = `
    <section class="screen no-nav detail-screen">
      <div class="detail-hero"><img class="detail-photo" src="${item.id === "hot-matcha" ? assets.detailMatcha : item.img}" alt="${item.name}" /></div>
      <div class="detail-head">
        <div><h1>${item.name}</h1><p>${item.desc}</p></div>
        <strong class="price">${rupiah(item.price)}</strong>
      </div>
      ${optionBox("Ukuran", ["Reguler", "Large"], "size", ["", "+2000"], "two")}
      ${optionBox("Tingkat Kemanisan", ["30%", "70%", "100%"], "sweetness")}
      ${optionBox("Tingkat Ice", ["30%", "70%", "100%"], "ice")}
      ${optionBox("Topping", ["Grass Jelly", "Boba", "Cheese Cream"], "topping")}
      <section class="option-box">
        <div class="option-head"><h2>Catatan</h2><span>Opsional</span></div>
        <textarea class="note-input" oninput="setNote(this.value)" placeholder="Tulis request tambahan">${safeNote}</textarea>
      </section>
    </section>
    <div class="add-bar">
      <button class="qty-btn" onclick="changeQty(-1)">&minus;</button>
      <div class="qty">${state.qty}</div>
      <button class="qty-btn" onclick="changeQty(1)">+</button>
      <button class="back-small" onclick="setTab('order')" aria-label="Kembali">&lsaquo;</button>
      <button class="primary-action" onclick="goCheckout()">+ ${rupiah(totalProduct())}</button>
    </div>
    ${toastMarkup()}
  `;
}

function optionBox(title, options, key, sub = [], mode = "") {
  return `
    <section class="option-box">
      <div class="option-head"><h2>${title}</h2><span>Wajib, pilih 1</span></div>
      <div class="option-grid ${mode}">
        ${options.map((value, index) => `
          <button class="option ${state[key] === value ? "selected" : ""}" onclick="setOption('${key}', '${value}')">
            ${value}${sub[index] ? `<small>${sub[index]}</small>` : ""}
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function setOption(key, value) {
  state[key] = value;
  const labels = { size: "Ukuran", sweetness: "Kemanisan", ice: "Ice", topping: "Topping" };
  flash(`${labels[key]} dipilih: ${value}`);
}

function setNote(value) {
  state.note = value;
}

function resetOrderOptions() {
  state.size = "Reguler";
  state.sweetness = "100%";
  state.ice = "0%";
  state.topping = "Boba";
  state.note = "";
}

function choosePayment(id) {
  state.paymentMethod = id;
  render();
}

function changeQty(delta) {
  state.qty = Math.max(1, state.qty + delta);
  render();
}

function totalProduct() {
  const sizeFee = state.size === "Large" ? 2000 : 0;
  return (state.selectedMenu.price + sizeFee) * state.qty;
}

function goCheckout() {
  if (!requireLocation()) return;
  state.view = "checkout";
  flash("Produk ditambahkan ke ringkasan pesanan.");
}

function renderCheckout() {
  const item = state.selectedMenu;
  const subtotal = totalProduct();
  const safeNote = escapeHtml(state.note);
  app.innerHTML = `
    <section class="screen no-nav checkout-screen">
      <div class="profile-hero-wrap"><img class="profile-hero" src="${assets.storefront}" alt="Outlet el Lotus" /></div>
      <div class="checkout-card checkout-row"><h2>Delivery</h2><button class="change">Ganti</button></div>
      <div class="checkout-card checkout-row"><p><strong>Alamat Pengantaran</strong><br />Jl. Simo Pomahan Baru</p><button class="change">Ganti</button></div>
      <div class="checkout-card checkout-product">
        <div>
          <h1>${item.name}</h1>
          <p><strong>Outlet:</strong> ${state.location.replace("el Lotus ", "")}<br /><strong>Ukuran:</strong> ${state.size}<br /><strong>Kemanisan:</strong> ${state.sweetness}<br /><strong>Ice:</strong> ${state.ice}<br /><strong>Topping:</strong> ${state.topping}${state.note ? `<br /><strong>Catatan:</strong> ${safeNote}` : ""}</p>
          <button class="mini-secondary" onclick="state.view='detail';render()">Kembali</button>
        </div>
        <img src="${item.id === "hot-matcha" ? assets.checkoutProduct : item.img}" alt="${item.name}" />
      </div>
      <div class="checkout-card summary">
        <h2>Ringkasan pembayaran</h2>
        <div class="summary-row"><span>Harga</span><span>${subtotal.toLocaleString("id-ID")}</span></div>
        <div class="summary-row"><span>Biaya Penanganan dan Pengiriman</span><span>${deliveryFee().toLocaleString("id-ID")}</span></div>
        ${state.promoApplied ? `<div class="summary-row promo-line"><span>Diskon ongkir</span><span>-${promoDiscount().toLocaleString("id-ID")}</span></div>` : ""}
        <div class="total-row"><span>Total pembayaran</span><span>${grandTotal().toLocaleString("id-ID")}</span></div>
      </div>
      <div class="checkout-card discount ${state.promoApplied ? "active" : ""}">
        <div><h2>Diskon ongkir 8rb</h2><p>Promo terbaik untukmu</p></div>
        <button class="outline-pill" onclick="togglePromo()">${state.promoApplied ? "Dipakai" : "Pakai"}</button>
      </div>
      <div class="checkout-actions">
        <button class="square-back" onclick="state.view='detail';render()">&lsaquo;</button>
        <button class="wide-primary" onclick="goPayment()">Lanjut Pembayaran</button>
      </div>
    </section>
    ${toastMarkup()}
  `;
}

function togglePromo() {
  state.promoApplied = !state.promoApplied;
  flash(state.promoApplied ? "Diskon ongkir diterapkan." : "Diskon ongkir dilepas.");
}

function goPayment() {
  state.view = "payment";
  render();
}

function renderPayment() {
  app.innerHTML = `
    <section class="screen no-nav payment-screen">
      <div class="payment-top">
        <button class="plain-back" onclick="state.view='checkout';render()">${icon("arrow")}</button>
        <h1>Payment Methode</h1>
      </div>
      <div class="payment-list">
        ${paymentMethods.map((method) => `
          <button class="payment-card ${state.paymentMethod === method.id ? "selected" : ""}" onclick="choosePayment('${method.id}')">
            <span class="payment-icon">${icon(method.id === "card" ? "card" : method.id === "qris" ? "ticket" : "wallet")}</span>
            <span><strong>${method.label}</strong><small>${method.caption}</small></span>
            <span class="radio-dot"></span>
          </button>
        `).join("")}
      </div>
      <div class="payment-total"><span>Total Pembayaran</span><strong>${rupiah(grandTotal())}</strong></div>
      <button class="wide-primary payment-pay" onclick="payNow()">Bayar Sekarang</button>
    </section>
    ${toastMarkup()}
  `;
}

function payNow() {
  if (state.paymentMethod === "qris") {
    state.view = "qris";
    render();
    return;
  }
  finishPayment();
}

function renderQris() {
  app.innerHTML = `
    <section class="screen no-nav qris-screen">
      <h1>Payment Methode</h1>
      <div class="qris-label">QRIS</div>
      <div class="qris-card">
        <h2>Scan atau unduh QR code</h2>
        <img src="${assets.qris}" alt="QRIS" />
      </div>
      <div class="countdown-card"><div>Selesaikan pembayaran dalam<strong>00:30:00</strong></div></div>
      <div class="qris-total"><strong>Total Pembayaran</strong><strong>${rupiah(grandTotal())}</strong></div>
      <button class="qris-primary" onclick="finishPayment()">Unduh QR code</button>
      <button class="qris-secondary" onclick="finishPayment()">Bagikan QR Code</button>
    </section>
  `;
}

function finishPayment() {
  const now = new Date();
  state.orders.unshift({
    outlet: state.location === "Pilih Lokasi" ? "el Lotus MERR Surabaya" : state.location,
    date: now.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
    time: now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    item: state.selectedMenu.name,
    note: `${state.size}, ${state.topping}, ${state.sweetness} Sugar`,
    total: grandTotal(),
    active: true,
  });
  resetOrderOptions();
  state.view = "success";
  render();
  window.setTimeout(() => {
    state.view = "main";
    state.tab = "activity";
    state.activityMode = "active";
    render();
  }, 1450);
}

function renderSuccess() {
  app.innerHTML = `
    <section class="success-screen">
      <div>
        <div class="success-check">${icon("check")}</div>
        <h1>Pembayaran Berhasil</h1>
      </div>
    </section>
  `;
}

function renderActivity() {
  const defaults = [
    { outlet: "el Lotus MERR Surabaya", date: "24 Apr 2026", time: "16:54", item: "Lotus Latte (Ice, Regular)", note: "Signature Blend, Normal Sugar", total: 28000, active: false },
    { outlet: "el Lotus Kertajaya", date: "20 Apr 2026", time: "12:30", item: "Americano (Ice, Regular)", note: "Robusta Bean, No Sugar", total: 20000, active: false },
    { outlet: "el Lotus Keputih", date: "16 Apr 2026", time: "10:34", item: "Cappuccino (Ice, Large)", note: "Oat Milk", total: 30000, active: false },
    { outlet: "el Lotus Perumdos ITS", date: "24 Apr 2026", time: "19:34", item: "Vanilla Milkshake (Ice, Large)", note: "Normal Sugar", total: 20000, active: false },
  ];
  const activeRows = state.orders.filter((order) => order.active);
  const rows = state.activityMode === "active" ? activeRows : defaults;
  app.innerHTML = `
    <section class="screen activity-screen">
      <header class="activity-head">
        <span class="logo-word">el <strong>Lotus</strong></span>
        <button class="round-icon">${icon("bell")}</button>
      </header>
      <h1 class="activity-title">Aktivitas</h1>
      <div class="activity-tabs">
        <button class="${state.activityMode === "active" ? "active" : ""}" onclick="setActivityMode('active')">&#9749; Pesan Lagi</button>
        <button class="${state.activityMode === "history" ? "active" : ""}" onclick="setActivityMode('history')">&#9719; Riwayat</button>
      </div>
      ${rows.length ? rows.map((row) => `
        <article class="activity-card">
          <img src="${assets.cup}" alt="" />
          <div>
            <h2>${row.outlet}<span class="status">&#9719; ${row.active ? "Sedang Diproses" : "Sudah Diproses"}</span></h2>
            <div class="date">${row.date} &middot; ${row.time}</div>
            <ul><li>${row.item}</li><li>${row.note}</li></ul>
            <div class="activity-total"><span>Total</span><strong>${rupiah(row.total)}</strong><button class="detail-btn">Lihat Detail</button></div>
          </div>
        </article>
      `).join("") : `
        <div class="empty-state">
          <strong>Belum ada pesanan aktif</strong>
          <span>Pesan kopi favoritmu, lalu tracking akan muncul di sini.</span>
          <button onclick="setTab('order')">Pesan Sekarang</button>
        </div>
      `}
    </section>
    ${nav()}
    ${toastMarkup()}
  `;
}

function setActivityMode(mode) {
  state.activityMode = mode;
  render();
}

function renderProfile() {
  const profileNote = state.user.isLoggedIn ? "Member el Lotus" : "Lengkapi profil setelah fitur login tersedia";
  app.innerHTML = `
    <section class="screen profile-screen">
      <div class="profile-top"><img class="profile-hero" src="${assets.storefront}" alt="Outlet el Lotus" /></div>
      <div class="profile-card">
        <div class="profile-identity">
          <div class="profile-avatar profile-avatar-default">${icon("user")}</div>
          <div><h1>${state.user.name}</h1><p>${state.user.email}<br />${state.user.phone}<br />${profileNote}</p></div>
        </div>
        <div class="profile-actions"><button>Lihat Profil</button><button>QR Code</button></div>
      </div>
      <section class="profile-section">
        <h2>Pesanan Saya</h2>
        <div class="progress-panel"><span>&check;</span><span>&#8987;</span><span>&#9749;</span><span>&#9787;</span></div>
      </section>
      <section class="profile-section">
        <h2>Tentang el Lotus</h2>
        <div class="about-panel">
          <strong>a place to bloom, chill, and connect</strong>
          <span>${brandCopy.profile}</span>
        </div>
      </section>
      ${profileSection("Pembayaran", [["Metode Pembayaran", "wallet"], ["Promos & Vouchers", "ticket"], ["Alamat Tersimpan", "pin"]])}
      ${profileSection("Lainnya", [["Pusat Bantuan", "help"], ["Kebijakan Privasi", "shield"], ["Ketentuan Layanan", "bell"]])}
      <button class="logout">Keluar</button>
    </section>
    ${nav()}
    ${toastMarkup()}
  `;
}

function profileSection(title, rows) {
  return `
    <section class="profile-section">
      <h2>${title}</h2>
      ${rows.map(([label, symbol]) => `
        <button class="profile-row">${icon(symbol)}<strong>${label}</strong><span>&rsaquo;</span></button>
      `).join("")}
    </section>
  `;
}

window.setTab = setTab;
window.toggleLocation = toggleLocation;
window.chooseLocation = chooseLocation;
window.openDetail = openDetail;
window.setOption = setOption;
window.setNote = setNote;
window.changeQty = changeQty;
window.goCheckout = goCheckout;
window.togglePromo = togglePromo;
window.goPayment = goPayment;
window.choosePayment = choosePayment;
window.payNow = payNow;
window.finishPayment = finishPayment;
window.applyPromoFromHome = applyPromoFromHome;
window.setActivityMode = setActivityMode;

render();
window.setTimeout(() => {
  state.view = "main";
  render();
}, 900);
