import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "../styles.css";

const STORAGE_KEYS = {
  cart: "elLotus.cart",
  outlet: "elLotus.selectedOutlet",
  orders: "elLotus.orders",
};

const assetUrl = (path) => new URL(`../assets/${path}`, import.meta.url).href;

const assets = {
  avatar: assetUrl("avatar.png"),
  checkoutProduct: assetUrl("checkout-product.png"),
  cup: assetUrl("cup.png"),
  detailMatcha: assetUrl("detail-hot-matcha.png"),
  homeHero: assetUrl("home-hero.png"),
  logo: assetUrl("logo.svg"),
  qris: assetUrl("qris-code.png"),
  storeHero: assetUrl("store-hero.png"),
  storefront: assetUrl("storefront-wide.png"),
};

const outlets = [
  "el Lotus MERR Surabaya",
  "el Lotus Kertajaya",
  "el Lotus Keputih",
  "el Lotus Perumdos ITS",
];

const products = [
  {
    id: "hot-matcha",
    name: "Hot Matcha",
    price: 24000,
    image: assetUrl("hot-matcha.png"),
    detailImage: assets.detailMatcha,
    checkoutImage: assets.checkoutProduct,
    description: "Matcha khas el Lotus dengan perpaduan aroma matcha dan tekstur lembut.",
  },
  {
    id: "hot-cappucino",
    name: "Hot Cappuccino",
    price: 24000,
    image: assetUrl("hot-cappucino.png"),
    description: "Espresso hangat dengan foam lembut dan aroma kopi yang tebal.",
  },
  {
    id: "ice-cafe-latte",
    name: "Ice Cafe Latte",
    price: 26000,
    image: assetUrl("ice-cafe-latte.png"),
    description: "Latte dingin dengan susu creamy dan espresso seimbang.",
  },
  {
    id: "ice-pink-matcha",
    name: "Ice Pink Matcha",
    price: 28000,
    image: assetUrl("ice-pink-matcha.png"),
    description: "Matcha dingin dengan layer pink berry yang ringan dan segar.",
  },
  {
    id: "ice-matcha-latte",
    name: "Ice Matcha Latte",
    price: 30000,
    image: assetUrl("ice-matcha-latte.png"),
    description: "Matcha latte dingin favorit dengan rasa creamy yang kalem.",
  },
  {
    id: "ice-americano",
    name: "Ice Americano",
    price: 22000,
    image: assetUrl("ice-americano.png"),
    description: "Americano dingin yang bersih, ringan, dan cocok untuk menemani fokus.",
  },
];

const popularProducts = [
  {
    id: "hot-matcha",
    name: "Matcha Lalu",
    price: 50000,
    image: assetUrl("popular-matchalalu.png"),
  },
  {
    id: "hot-cappucino",
    name: "Ice Cappuccino",
    price: 35000,
    image: assetUrl("popular-cappucino.png"),
  },
  {
    id: "ice-matcha-latte",
    name: "Ice Matcha Latte",
    price: 35000,
    image: assetUrl("popular-latte.png"),
  },
];

const sizes = [
  { label: "Reguler", extra: 0 },
  { label: "Large", extra: 2000 },
];

const sweetnessLevels = ["30%", "70%", "100%"];
const iceLevels = ["30%", "70%", "100%"];

const toppings = [
  { label: "Tanpa Topping", extra: 0 },
  { label: "Grass Jelly", extra: 4000 },
  { label: "Boba", extra: 4000 },
  { label: "Cheese Cream", extra: 5000 },
];

const paymentGroups = [
  {
    title: "E-Wallet",
    options: [
      { id: "gopay", label: "GoPay", caption: "Bayar cepat dari aplikasi GoPay" },
      { id: "ovo", label: "OVO", caption: "Saldo OVO atau OVO Points" },
      { id: "dana", label: "DANA", caption: "Pembayaran dompet digital DANA" },
      { id: "linkaja", label: "LinkAja", caption: "Terhubung dengan akun LinkAja" },
      { id: "shopeepay", label: "ShopeePay", caption: "Gunakan saldo ShopeePay" },
    ],
  },
  {
    title: "Virtual Account",
    options: [
      { id: "bca", label: "BCA", caption: "Virtual Account BCA" },
      { id: "mandiri", label: "Mandiri", caption: "Virtual Account Mandiri" },
      { id: "bni", label: "BNI", caption: "Virtual Account BNI" },
      { id: "bri", label: "Bank BRI", caption: "Virtual Account BRI" },
    ],
  },
  {
    title: "Kartu Pembayaran",
    options: [
      { id: "card", label: "Credit/Kartu Debit", caption: "Visa, Mastercard, dan debit online" },
    ],
  },
  {
    title: "Metode Lainnya",
    options: [
      { id: "qris", label: "QRIS", caption: "Scan, unduh, atau bagikan QR code" },
    ],
  },
];

const dummyOrders = [
  {
    id: "dummy-1",
    outlet: "el Lotus MERR Surabaya",
    date: "24 Apr 2026",
    time: "16:54",
    status: "Sudah Diproses",
    items: ["Latte Lalu (Ice, Regular)", "Signature Blend, Normal Sugar"],
    total: 28000,
    active: false,
  },
  {
    id: "dummy-2",
    outlet: "el Lotus Kertajaya",
    date: "20 Apr 2026",
    time: "12:30",
    status: "Selesai",
    items: ["Americano (Ice, Regular)", "Robusta Beans, No Sugar"],
    total: 20000,
    active: false,
  },
  {
    id: "dummy-3",
    outlet: "el Lotus Keputih",
    date: "16 Apr 2026",
    time: "10:34",
    status: "Selesai",
    items: ["Cappuccino (Ice, Large)", "Oat Milk"],
    total: 30000,
    active: false,
  },
  {
    id: "dummy-4",
    outlet: "el Lotus Perumdos ITS",
    date: "24 Apr 2026",
    time: "19:34",
    status: "Selesai",
    items: ["Vanilla Milkshake (Ice, Large)", "Normal Sugar"],
    total: 20000,
    active: false,
  },
];

const defaultDetail = (productId = "hot-matcha") => ({
  size: "Reguler",
  sweetness: "70%",
  ice: productId.startsWith("hot") ? "30%" : "70%",
  topping: "Tanpa Topping",
  quantity: 1,
  note: "",
});

const readJson = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const rupiah = (value) => `Rp ${Number(value || 0).toLocaleString("id-ID")}`;

const formatCountdown = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const rest = seconds % 60;
  return [hours, minutes, rest].map((unit) => String(unit).padStart(2, "0")).join(":");
};

const extraFor = (list, label) => list.find((item) => item.label === label)?.extra || 0;

function Icon({ name }) {
  const paths = {
    arrowLeft: '<path d="M15 18 9 12l6-6"/><path d="M20 12H9"/>',
    bag: '<path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/><path d="M9 13h6"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
    card: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/><path d="M7 15h3"/>',
    cart: '<path d="M4 5h2l2 12h10l2-8H8"/><circle cx="10" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/>',
    check: '<path d="m4 13 5 5L20 6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    cup: '<path d="M5 8h11l-1 13H7L5 8Z"/><path d="M8 3h6"/><path d="M9 3v5"/><path d="M15 11h2a3 3 0 0 1 0 6h-1"/>',
    download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a3 3 0 1 1 4.5 2.6c-1.2.7-2 1.3-2 2.4"/><path d="M12 17h.01"/>',
    home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v11h14V10"/><path d="M9 21v-7h6v7"/>',
    logout: '<path d="M10 17 15 12l-5-5"/><path d="M15 12H3"/><path d="M21 3v18"/>',
    mapPin: '<path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
    percent: '<path d="M19 5 5 19"/><circle cx="7" cy="7" r="2"/><circle cx="17" cy="17" r="2"/>',
    qris: '<path d="M4 4h6v6H4z"/><path d="M14 4h6v6h-6z"/><path d="M4 14h6v6H4z"/><path d="M14 14h2v2h-2z"/><path d="M18 14h2v6h-4v-2h2z"/><path d="M12 7h1"/><path d="M7 12v1"/><path d="M12 19h1"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="M9 12l2 2 4-5"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 10.5 6.8-4"/><path d="m8.6 13.5 6.8 4"/>',
    ticket: '<path d="M3 9a3 3 0 0 0 0 6v3h18v-3a3 3 0 0 0 0-6V6H3v3Z"/><path d="M9 9h.01"/><path d="M15 15h.01"/><path d="M16 8 8 16"/>',
    truck: '<path d="M10 17h4V6H3v11h2"/><path d="M14 9h4l3 4v4h-2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    wallet: '<path d="M3 7h18v12H3z"/><path d="M16 12h5"/><path d="M3 7l4-4h11v4"/>',
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" dangerouslySetInnerHTML={{ __html: paths[name] || "" }} />
  );
}

function App() {
  const savedOutlet = localStorage.getItem(STORAGE_KEYS.outlet);
  const initialOutlet = outlets.includes(savedOutlet) ? savedOutlet : outlets[0];
  const toastTimer = useRef(null);

  const [screen, setScreen] = useState("loading");
  const [selectedOutlet, setSelectedOutlet] = useState(initialOutlet);
  const [outletOpen, setOutletOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("hot-matcha");
  const [detail, setDetail] = useState(defaultDetail());
  const [cart, setCart] = useState(() => {
    const saved = readJson(STORAGE_KEYS.cart, []);
    return Array.isArray(saved) ? saved : [];
  });
  const [orders, setOrders] = useState(() => {
    const saved = readJson(STORAGE_KEYS.orders, []);
    return Array.isArray(saved) ? saved : [];
  });
  const [selectedPayment, setSelectedPayment] = useState("qris");
  const [activityTab, setActivityTab] = useState("active");
  const [qrisSeconds, setQrisSeconds] = useState(30 * 60);
  const [toast, setToast] = useState("");

  const product = useMemo(
    () => products.find((item) => item.id === selectedProductId) || products[0],
    [selectedProductId],
  );

  const detailUnitPrice = useMemo(
    () => product.price + extraFor(sizes, detail.size) + extraFor(toppings, detail.topping),
    [detail.size, detail.topping, product],
  );

  const detailSubtotal = detailUnitPrice * detail.quantity;
  const cartSubtotal = cart.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  const deliveryFee = cart.length ? 10000 : 0;
  const serviceFee = cart.length ? 2000 : 0;
  const cartTotal = cartSubtotal + deliveryFee + serviceFee;
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const pushToast = useCallback((message) => {
    window.clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = window.setTimeout(() => setToast(""), 1600);
  }, []);

  const goTo = useCallback((target) => {
    setOutletOpen(false);
    setScreen(target);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setScreen((current) => (current === "loading" ? "home" : current));
    }, 1700);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.outlet, selectedOutlet);
  }, [selectedOutlet]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (screen !== "qris") return undefined;

    const timer = window.setInterval(() => {
      setQrisSeconds((seconds) => {
        if (seconds <= 1) {
          window.clearInterval(timer);
          setScreen("payment");
          pushToast("QRIS sudah kedaluwarsa. Buat kode baru dari halaman pembayaran.");
          return 0;
        }

        return seconds - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [pushToast, screen]);

  useEffect(() => {
    if (screen !== "success") return undefined;

    const timer = window.setTimeout(() => {
      setActivityTab("active");
      setScreen("activity");
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [screen]);

  const openProductDetail = (productId) => {
    setSelectedProductId(productId);
    setDetail(defaultDetail(productId));
    goTo("detail");
  };

  const handleQuickAction = (target) => {
    if (target === "promo") {
      pushToast("Promo ongkir akan otomatis muncul di checkout.");
      return;
    }

    if (target === "checkout" && !cart.length) {
      pushToast("Cart masih kosong. Pilih minuman dulu ya.");
      goTo("order");
      return;
    }

    goTo(target);
  };

  const addCurrentProductToCart = () => {
    const item = {
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      image: product.checkoutImage || product.image,
      outlet: selectedOutlet,
      unitPrice: detailUnitPrice,
      quantity: detail.quantity,
      options: {
        size: detail.size,
        sweetness: detail.sweetness,
        ice: detail.ice,
        topping: detail.topping,
        note: detail.note.trim(),
      },
    };

    setCart((current) => [...current, item]);
    goTo("checkout");
    pushToast("Produk ditambahkan ke cart.");
  };

  const updateCartQuantity = (itemId, delta) => {
    setCart((current) =>
      current
        .map((item) => (item.id === itemId ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0),
    );
  };

  const payNow = () => {
    if (!selectedPayment) {
      pushToast("Pilih metode pembayaran dulu.");
      return;
    }

    if (selectedPayment === "qris") {
      setQrisSeconds(30 * 60);
      goTo("qris");
      return;
    }

    completePayment();
  };

  const completePayment = () => {
    if (!cart.length) {
      goTo("activity");
      return;
    }

    const now = new Date();
    const order = {
      id: `order-${Date.now()}`,
      outlet: selectedOutlet,
      date: now.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
      time: now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      status: "Sudah Diproses",
      items: cart.flatMap((item) => [
        `${item.name} (${item.options.ice}, ${item.options.size}) x${item.quantity}`,
        `${item.options.topping}, ${item.options.sweetness} sugar`,
      ]),
      total: cartTotal,
      active: true,
    };

    setOrders((current) => [order, ...current]);
    setCart([]);
    goTo("success");
  };

  const downloadQris = () => {
    const link = document.createElement("a");
    link.href = assets.qris;
    link.download = "el-lotus-qris.png";
    document.body.appendChild(link);
    link.click();
    link.remove();
    pushToast("QR code siap diunduh.");
  };

  const shareQris = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "QRIS el Lotus",
          text: `Total pembayaran el Lotus: ${rupiah(cartTotal)}`,
          url: window.location.href,
        });
        return;
      } catch (error) {
        if (error.name === "AbortError") return;
      }
    }

    pushToast("Link QRIS demo berhasil disiapkan untuk dibagikan.");
  };

  const chrome = (children, hideNav = false) => (
    <>
      {children}
      {!hideNav && <BottomNav screen={screen} cartCount={cartCount} goTo={goTo} />}
      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  );

  if (screen === "loading") return <LoadingScreen />;

  if (screen === "home") {
    return chrome(
      <HomeScreen
        cartCount={cartCount}
        goTo={goTo}
        handleQuickAction={handleQuickAction}
        openProductDetail={openProductDetail}
        pushToast={pushToast}
      />,
    );
  }

  if (screen === "order") {
    return chrome(
      <OrderScreen
        selectedOutlet={selectedOutlet}
        outletOpen={outletOpen}
        setOutletOpen={setOutletOpen}
        selectOutlet={(outlet) => {
          setSelectedOutlet(outlet);
          setOutletOpen(false);
          pushToast(`Outlet dipilih: ${outlet.replace("el Lotus ", "")}`);
        }}
        openProductDetail={openProductDetail}
      />,
    );
  }

  if (screen === "detail") {
    return chrome(
      <DetailScreen
        product={product}
        detail={detail}
        setDetail={setDetail}
        detailSubtotal={detailSubtotal}
        addCurrentProductToCart={addCurrentProductToCart}
        goTo={goTo}
      />,
      true,
    );
  }

  if (screen === "checkout") {
    return chrome(
      <CheckoutScreen
        selectedOutlet={selectedOutlet}
        cart={cart}
        cartSubtotal={cartSubtotal}
        deliveryFee={deliveryFee}
        serviceFee={serviceFee}
        cartTotal={cartTotal}
        updateCartQuantity={updateCartQuantity}
        goTo={goTo}
        pushToast={pushToast}
      />,
      true,
    );
  }

  if (screen === "payment") {
    return chrome(
      <PaymentScreen
        selectedPayment={selectedPayment}
        setSelectedPayment={setSelectedPayment}
        cartTotal={cartTotal}
        payNow={payNow}
        goTo={goTo}
      />,
      true,
    );
  }

  if (screen === "qris") {
    return chrome(
      <QrisScreen
        cartTotal={cartTotal}
        qrisSeconds={qrisSeconds}
        downloadQris={downloadQris}
        shareQris={shareQris}
        completePayment={completePayment}
        goTo={goTo}
      />,
      true,
    );
  }

  if (screen === "success") return <SuccessScreen />;

  if (screen === "activity") {
    return chrome(
      <ActivityScreen
        orders={orders}
        activityTab={activityTab}
        setActivityTab={setActivityTab}
        goTo={goTo}
        pushToast={pushToast}
      />,
    );
  }

  return chrome(<ProfileScreen pushToast={pushToast} />);
}

function LoadingScreen() {
  return (
    <section className="screen loading-screen no-nav" aria-label="Loading el Lotus">
      <div className="loading-content">
        <img className="loading-logo" src={assets.logo} alt="Logo el Lotus" />
        <h1>el <strong>Lotus</strong></h1>
        <p>a place to bloom,<br />chill, and connect</p>
      </div>
    </section>
  );
}

function BottomNav({ screen, cartCount, goTo }) {
  const items = [
    ["home", "Beranda", "home"],
    ["order", "Pesan", "cart"],
    ["activity", "Aktivitas", "clock"],
    ["profile", "Profil", "user"],
  ];

  return (
    <nav className="bottom-nav" aria-label="Navigasi utama">
      {items.map(([target, label, symbol]) => (
        <button
          key={target}
          className={`nav-item ${screen === target ? "active" : ""} ${target === "order" && cartCount ? "has-cart" : ""}`}
          onClick={() => goTo(target)}
          aria-label={label}
        >
          <Icon name={symbol} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

function HomeScreen({ cartCount, goTo, handleQuickAction, openProductDetail, pushToast }) {
  const quickActions = [
    ["cup", "Order", "pickup / dine-in", "order"],
    ["bag", "Cart", `${cartCount} item`, "checkout"],
    ["percent", "Promos", "special for you", "promo"],
    ["mapPin", "Find Us", "our location", "order"],
  ];

  return (
    <section className="screen home-screen">
      <header className="topbar">
        <button className="brand-lockup" onClick={() => goTo("home")} aria-label="Beranda el Lotus">
          <img src={assets.logo} alt="" />
          <span>el <strong>Lotus</strong></span>
        </button>
        <div className="top-actions">
          <button className="round-button" onClick={() => pushToast("Belum ada notifikasi baru.")} aria-label="Notifikasi">
            <Icon name="bell" />
          </button>
          <button className="avatar-button" onClick={() => goTo("profile")} aria-label="Buka profil">
            <img src={assets.avatar} alt="Avatar Minji Sastro" />
          </button>
        </div>
      </header>

      <section className="greeting" aria-labelledby="home-greeting">
        <h1 id="home-greeting">hey, good to see you!</h1>
        <p>ready for bloom, coffee and good vibes?</p>
      </section>

      <section className="home-hero" aria-label="Tagline el Lotus">
        <img src={assets.homeHero} alt="Interior cafe el Lotus" />
        <div className="home-hero-copy">
          <h2>&ldquo;a place to bloom, chill, and connect&rdquo;</h2>
          <button className="soft-pill" onClick={() => goTo("order")}>
            <span>explore el Lotus</span>
            <span aria-hidden="true">{"\u203A"}</span>
          </button>
        </div>
      </section>
      <div className="slider-dots" aria-hidden="true"><span className="active" /><span /><span /></div>

      <div className="quick-grid" aria-label="Aksi cepat">
        {quickActions.map(([symbol, title, subtitle, target]) => (
          <button className="quick-card" key={title} onClick={() => handleQuickAction(target)}>
            <Icon name={symbol} />
            <strong>{title}</strong>
            <span>{subtitle}</span>
          </button>
        ))}
      </div>

      <section className="reward-banner">
        <div className="reward-card-art"><img src={assets.logo} alt="" /></div>
        <div>
          <span className="mini-brand">el Lotus</span>
          <h2>earn points, bloom more!</h2>
          <p>air, air apa yang semangat? airobik xixixi</p>
        </div>
        <button onClick={() => pushToast("Voucher loyalty siap dipakai di checkout.")} aria-label="Buka rewards">{"\u203A"}</button>
      </section>

      <section className="popular-section" aria-labelledby="popular-title">
        <div className="section-head">
          <h2 id="popular-title">popular picks</h2>
          <button onClick={() => goTo("order")}>see all <span aria-hidden="true">{"\u203A"}</span></button>
        </div>
        <div className="popular-grid">
          {[...popularProducts, ...popularProducts].map((item, index) => (
            <button className="popular-card" key={`${item.id}-${index}`} onClick={() => openProductDetail(item.id)}>
              <img src={item.image} alt={item.name} />
              <strong>{item.name}</strong>
              <span>{rupiah(item.price)}</span>
            </button>
          ))}
        </div>
      </section>
    </section>
  );
}

function OrderScreen({ selectedOutlet, outletOpen, setOutletOpen, selectOutlet, openProductDetail }) {
  return (
    <section className="screen order-screen">
      <div className="location-box">
        <button className="location-toggle" onClick={() => setOutletOpen((open) => !open)} aria-expanded={outletOpen} aria-controls="outlet-list">
          <span>{selectedOutlet || "Pilih Lokasi"}</span>
          <span className="chevron" aria-hidden="true">⌄</span>
        </button>
        {outletOpen && (
          <div id="outlet-list" className="location-menu" role="listbox">
            {outlets.map((outlet) => (
              <button
                key={outlet}
                className={selectedOutlet === outlet ? "selected" : ""}
                onClick={() => selectOutlet(outlet)}
                role="option"
                aria-selected={selectedOutlet === outlet}
              >
                {outlet}
              </button>
            ))}
          </div>
        )}
      </div>

      <img className="store-hero" src={assets.storeHero} alt="Tampak depan outlet el Lotus" />

      <div className="menu-title">
        <h1>Menu el <strong>Lotus</strong></h1>
        <img src={assets.logo} alt="" />
      </div>

      <div className="menu-grid">
        {products.map((item) => (
          <article className="menu-card" key={item.id}>
            <button className="menu-product" onClick={() => openProductDetail(item.id)} aria-label={`Lihat detail ${item.name}`}>
              <h2>{item.name}</h2>
              <img src={item.image} alt={item.name} />
            </button>
            <button className="add-menu-button" onClick={() => openProductDetail(item.id)}>Tambahkan</button>
          </article>
        ))}
      </div>
    </section>
  );
}

function DetailScreen({ product, detail, setDetail, detailSubtotal, addCurrentProductToCart, goTo }) {
  const setOption = (key, value) => setDetail((current) => ({ ...current, [key]: value }));
  const setQuantity = (delta) => setDetail((current) => ({ ...current, quantity: Math.max(1, Math.min(20, current.quantity + delta)) }));

  return (
    <>
      <section className="screen detail-screen no-nav">
        <button className="floating-back" onClick={() => goTo("order")} aria-label="Kembali ke menu"><Icon name="arrowLeft" /></button>
        <img className="detail-hero" src={product.detailImage || product.image} alt={product.name} />

        <div className="detail-intro">
          <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
          </div>
          <strong>{rupiah(product.price)}</strong>
        </div>

        <OptionPanel title="Ukuran" helper="Wajib, pilih 1" className="two">
          {sizes.map((option) => (
            <ChoiceButton key={option.label} selected={detail.size === option.label} onClick={() => setOption("size", option.label)}>
              {option.label}
              {option.extra > 0 && <small>+{rupiah(option.extra).replace("Rp ", "")}</small>}
            </ChoiceButton>
          ))}
        </OptionPanel>

        <OptionPanel title="Tingkat Kemanisan" helper="Wajib, pilih 1" className="three">
          {sweetnessLevels.map((option) => (
            <ChoiceButton key={option} selected={detail.sweetness === option} onClick={() => setOption("sweetness", option)}>{option}</ChoiceButton>
          ))}
        </OptionPanel>

        <OptionPanel title="Tingkat Ice" helper="Wajib, pilih 1" className="three">
          {iceLevels.map((option) => (
            <ChoiceButton key={option} selected={detail.ice === option} onClick={() => setOption("ice", option)}>{option}</ChoiceButton>
          ))}
        </OptionPanel>

        <OptionPanel title="Topping" helper="Opsional" className="toppings">
          {toppings.map((option) => (
            <ChoiceButton key={option.label} selected={detail.topping === option.label} onClick={() => setOption("topping", option.label)}>
              {option.label}
              {option.extra > 0 && <small>+{rupiah(option.extra).replace("Rp ", "")}</small>}
            </ChoiceButton>
          ))}
        </OptionPanel>

        <section className="option-panel">
          <div className="option-head">
            <h2>Catatan</h2>
            <span>Opsional</span>
          </div>
          <textarea
            className="note-input"
            value={detail.note}
            onChange={(event) => setOption("note", event.target.value)}
            placeholder="Contoh: less foam, cup terpisah"
          />
        </section>
      </section>

      <div className="add-to-cart-bar">
        <button className="qty-button" onClick={() => setQuantity(-1)} aria-label="Kurangi jumlah">-</button>
        <span className="qty-value">{detail.quantity}</span>
        <button className="qty-button" onClick={() => setQuantity(1)} aria-label="Tambah jumlah">+</button>
        <button className="back-chip" onClick={() => goTo("order")} aria-label="Kembali"><Icon name="arrowLeft" /></button>
        <button className="primary-bar-button" onClick={addCurrentProductToCart}>+ {rupiah(detailSubtotal)}</button>
      </div>
    </>
  );
}

function OptionPanel({ title, helper, className, children }) {
  return (
    <section className="option-panel">
      <div className="option-head">
        <h2>{title}</h2>
        <span>{helper}</span>
      </div>
      <div className={`choice-grid ${className}`}>{children}</div>
    </section>
  );
}

function ChoiceButton({ selected, onClick, children }) {
  return (
    <button className={`choice-button ${selected ? "selected" : ""}`} onClick={onClick}>
      {children}
    </button>
  );
}

function CheckoutScreen({ selectedOutlet, cart, cartSubtotal, deliveryFee, serviceFee, cartTotal, updateCartQuantity, goTo, pushToast }) {
  const isEmpty = cart.length === 0;

  return (
    <>
      <section className="screen checkout-screen no-nav">
        <img className="checkout-hero" src={assets.storefront} alt="Outlet el Lotus" />

        <section className="checkout-card delivery-row">
          <Icon name="truck" />
          <div>
            <h1>Delivery</h1>
            <span>{selectedOutlet}</span>
          </div>
          <button onClick={() => goTo("order")}>Ganti</button>
        </section>

        <section className="checkout-card address-row">
          <div>
            <strong>Alamat Pengantaran</strong>
            <span>Jl. Simo Pomahan Baru</span>
          </div>
          <button onClick={() => pushToast("Alamat demo berhasil dipilih.")}>Ganti</button>
        </section>

        {isEmpty ? (
          <EmptyCart goTo={goTo} />
        ) : (
          <>
            <section className="cart-list" aria-label="Ringkasan cart">
              {cart.map((item) => <CartItem key={item.id} item={item} updateCartQuantity={updateCartQuantity} />)}
            </section>

            <section className="checkout-card summary-card">
              <h2>Ringkasan pembayaran</h2>
              <div><span>Harga</span><span>{rupiah(cartSubtotal)}</span></div>
              <div><span>Biaya Pengiriman</span><span>{rupiah(deliveryFee)}</span></div>
              <div><span>Biaya Layanan</span><span>{rupiah(serviceFee)}</span></div>
              <div className="total"><strong>Total pembayaran</strong><strong>{rupiah(cartTotal)}</strong></div>
            </section>

            <section className="checkout-card discount-row">
              <div className="discount-icon"><Icon name="percent" /></div>
              <div>
                <strong>Diskon ongkir 8rb</strong>
                <span>Promo terbaik untukmu</span>
              </div>
              <button onClick={() => pushToast("Promo demo tersimpan untuk transaksi berikutnya.")}>Pakai</button>
            </section>
          </>
        )}
      </section>

      <div className="checkout-actions">
        <button className="square-action" onClick={() => goTo("order")} aria-label="Kembali ke menu"><Icon name="arrowLeft" /></button>
        <button className="wide-action" onClick={() => goTo("payment")} disabled={isEmpty}>Lanjut Pembayaran</button>
      </div>
    </>
  );
}

function EmptyCart({ goTo }) {
  return (
    <section className="empty-cart">
      <img src={assets.cup} alt="" />
      <h2>Cart masih kosong</h2>
      <p>Pilih menu favoritmu dulu, lalu ringkasan pesanan akan muncul di sini.</p>
      <button onClick={() => goTo("order")}>Pilih Menu</button>
    </section>
  );
}

function CartItem({ item, updateCartQuantity }) {
  const options = [
    `Ukuran: ${item.options.size}`,
    `Kemanisan: ${item.options.sweetness}`,
    `Ice: ${item.options.ice}`,
    `Topping: ${item.options.topping}`,
  ];

  if (item.options.note) options.push(`Catatan: ${item.options.note}`);

  return (
    <article className="checkout-card checkout-product">
      <div className="cart-copy">
        <h2>{item.name}</h2>
        <p><strong>Outlet:</strong> {item.outlet.replace("el Lotus ", "")}<br />{options.map((option) => <React.Fragment key={option}>{option}<br /></React.Fragment>)}</p>
        <div className="cart-controls">
          <button onClick={() => updateCartQuantity(item.id, -1)} aria-label={`Kurangi ${item.name}`}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => updateCartQuantity(item.id, 1)} aria-label={`Tambah ${item.name}`}>+</button>
          <strong>{rupiah(item.unitPrice * item.quantity)}</strong>
        </div>
      </div>
      <img src={item.image} alt={item.name} />
    </article>
  );
}

function PaymentScreen({ selectedPayment, setSelectedPayment, cartTotal, payNow, goTo }) {
  return (
    <section className="screen payment-screen no-nav">
      <header className="page-header">
        <button className="plain-icon-button" onClick={() => goTo("checkout")} aria-label="Kembali ke checkout"><Icon name="arrowLeft" /></button>
        <h1>Pilih Metode Pembayaran</h1>
      </header>

      <div className="payment-groups">
        {paymentGroups.map((group) => (
          <section className="payment-group" key={group.title}>
            <h2>{group.title}</h2>
            <div className="payment-list">
              {group.options.map((option) => (
                <PaymentOption
                  key={option.id}
                  option={option}
                  selected={selectedPayment === option.id}
                  onClick={() => setSelectedPayment(option.id)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="payment-bottom">
        <div>
          <span>Total payment</span>
          <strong>{rupiah(cartTotal)}</strong>
        </div>
        <button className="wide-action" onClick={payNow}>Bayar Sekarang</button>
      </div>
    </section>
  );
}

function PaymentOption({ option, selected, onClick }) {
  const symbol = option.id === "qris" ? "qris" : option.id === "card" ? "card" : "wallet";

  return (
    <button className={`payment-option ${selected ? "selected" : ""}`} onClick={onClick}>
      <span className="payment-symbol"><Icon name={symbol} /></span>
      <span>
        <strong>{option.label}</strong>
        <small>{option.caption}</small>
      </span>
      <span className="radio-mark" aria-hidden="true" />
    </button>
  );
}

function QrisScreen({ cartTotal, qrisSeconds, downloadQris, shareQris, completePayment, goTo }) {
  return (
    <section className="screen qris-screen no-nav">
      <header className="page-header centered">
        <button className="plain-icon-button" onClick={() => goTo("payment")} aria-label="Kembali ke metode pembayaran"><Icon name="arrowLeft" /></button>
        <h1>QRIS</h1>
      </header>

      <p className="qris-kicker">Scan atau unduh QR code</p>

      <section className="qris-card">
        <img src={assets.qris} alt="Kode QRIS pembayaran el Lotus" />
      </section>

      <section className="timer-card">
        <span>Selesaikan pembayaran dalam</span>
        <strong>{formatCountdown(qrisSeconds)}</strong>
      </section>

      <div className="qris-total">
        <strong>Total Pembayaran</strong>
        <strong>{rupiah(cartTotal)}</strong>
      </div>

      <div className="qris-actions">
        <button className="wide-action" onClick={downloadQris}><Icon name="download" /> Unduh QR code</button>
        <button className="outline-action" onClick={shareQris}><Icon name="share" /> Bagikan QR Code</button>
        <button className="ghost-action" onClick={completePayment}>Selesaikan Pembayaran</button>
      </div>
    </section>
  );
}

function SuccessScreen() {
  return (
    <section className="screen success-screen no-nav">
      <div className="success-content">
        <div className="success-icon"><Icon name="check" /></div>
        <h1>Pembayaran Berhasil</h1>
      </div>
    </section>
  );
}

function ActivityScreen({ orders, activityTab, setActivityTab, goTo, pushToast }) {
  const activeOrders = orders.filter((order) => order.active);
  const rows = activityTab === "active" ? activeOrders : [...orders, ...dummyOrders];

  return (
    <section className="screen activity-screen">
      <header className="simple-header">
        <span>el <strong>Lotus</strong></span>
        <button className="round-button" onClick={() => pushToast("Order tracking diperbarui otomatis.")} aria-label="Notifikasi"><Icon name="bell" /></button>
      </header>

      <h1 className="page-title">Aktivitas</h1>

      <div className="activity-tabs" role="tablist" aria-label="Filter aktivitas">
        <button className={activityTab === "active" ? "active" : ""} onClick={() => setActivityTab("active")} role="tab">Pesan Lagi</button>
        <button className={activityTab === "history" ? "active" : ""} onClick={() => setActivityTab("history")} role="tab">Riwayat</button>
      </div>

      {rows.length ? (
        <div className="order-list">
          {rows.map((order) => <OrderCard key={order.id} order={order} pushToast={pushToast} />)}
        </div>
      ) : (
        <section className="empty-activity">
          <img src={assets.cup} alt="" />
          <h2>Belum ada pesanan aktif</h2>
          <p>Setelah pembayaran berhasil, status pesananmu akan muncul di sini.</p>
          <button onClick={() => goTo("order")}>Pesan Sekarang</button>
        </section>
      )}
    </section>
  );
}

function OrderCard({ order, pushToast }) {
  return (
    <article className="order-card">
      <img src={assets.cup} alt="Cup el Lotus" />
      <div className="order-copy">
        <div className="order-title">
          <h2>{order.outlet}</h2>
          <span><Icon name="clock" /> {order.status}</span>
        </div>
        <p>{order.date} - {order.time}</p>
        <ul>
          {order.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <div className="order-total">
          <span>Total</span>
          <strong>{rupiah(order.total)}</strong>
          <button onClick={() => pushToast("Detail pesanan demo ditampilkan di kartu ini.")}>Lihat Detail</button>
        </div>
      </div>
    </article>
  );
}

function ProfileScreen({ pushToast }) {
  return (
    <section className="screen profile-screen">
      <img className="profile-hero" src={assets.storefront} alt="Storefront el Lotus" />

      <section className="profile-card">
        <img src={assets.avatar} alt="Avatar Minji Sastro" />
        <div>
          <h1>Minji Sastro</h1>
          <p>minjisastro@gmail.com<br />+(62) 851 0851 0851</p>
        </div>
      </section>

      <div className="profile-actions">
        <button onClick={() => pushToast("Fitur lihat profil belum memerlukan login.")}>Lihat Profil</button>
        <button onClick={() => pushToast("QR member el Lotus berhasil dibuka.")}>QR Code</button>
      </div>

      <section className="profile-section">
        <h2>Pesanan Saya</h2>
        <div className="progress-track" aria-label="Progress pesanan">
          {[
            ["Placed", "check"],
            ["Preparing", "clock"],
            ["On the way", "truck"],
            ["Delivered", "heart"],
          ].map(([label, symbol]) => (
            <div key={label}>
              <span><Icon name={symbol} /></span>
              <small>{label}</small>
            </div>
          ))}
        </div>
      </section>

      <ProfileMenu title="Pembayaran" rows={[
        ["Metode Pembayaran", "wallet"],
        ["Promos & Vouchers", "percent"],
        ["Alamat Tersimpan", "mapPin"],
      ]} pushToast={pushToast} />

      <ProfileMenu title="Lainnya" rows={[
        ["Pusat Bantuan", "help"],
        ["Kebijakan Privasi", "shield"],
        ["Ketentuan Layanan", "bell"],
      ]} pushToast={pushToast} />

      <button className="logout-button" onClick={() => pushToast("Logout demo: belum ada autentikasi nyata.")}>
        <Icon name="logout" /> Keluar
      </button>
    </section>
  );
}

function ProfileMenu({ title, rows, pushToast }) {
  return (
    <section className="profile-section">
      <h2>{title}</h2>
      <div className="profile-menu">
        {rows.map(([label, symbol]) => (
          <button key={label} onClick={() => pushToast(`${label} dibuka dalam mode demo.`)}>
            <Icon name={symbol} />
            <strong>{label}</strong>
            <span aria-hidden="true">{"\u203A"}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

createRoot(document.getElementById("app")).render(<App />);
