import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "../components/Icon.jsx";
import { assets, popularProducts } from "../data/catalog.js";
import { rupiah } from "../utils/format.js";

export function HomeScreen({ cartCount, goTo, handleQuickAction, openProductDetail, openModal }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(null);
  const quickActions = [
    ["cup", "Order", "pickup / dine-in", "order"],
    ["bag", "Cart", `${cartCount} item`, "checkout"],
    ["percent", "Promos", "special for you", "promo"],
    ["mapPin", "Find Us", "our location", "locations"],
  ];
  const heroSlides = useMemo(() => [
    {
      id: "interior",
      eyebrow: "fresh mood, fresh cup",
      title: "Ngopi biar mekar.",
      body: "a place to bloom, chill, and connect",
      image: assets.interior,
      action: "Mulai pesan",
      onClick: () => goTo("order"),
    },
    {
      id: "storefront",
      eyebrow: "pickup ready",
      title: "Outlet hangat, order cepat.",
      body: "Pilih cabang favorit untuk pickup atau dine-in.",
      image: assets.storefront,
      action: "Pilih outlet",
      onClick: () => goTo("order"),
    },
    {
      id: "matcha",
      eyebrow: "today's pick",
      title: "Matcha dingin, mood tenang.",
      body: "Menu favorit untuk chill sejenak hari ini.",
      image: popularProducts[2].image,
      action: "Lihat menu",
      onClick: () => openProductDetail("ice-matcha-latte"),
    },
  ], [goTo, openProductDetail]);
  const slide = heroSlides[activeSlide];
  const trackStyle = {
    transform: `translateX(calc(-${activeSlide * 100}% + ${dragOffset}px))`,
  };

  const goToSlide = (index) => {
    setActiveSlide((index + heroSlides.length) % heroSlides.length);
  };

  const moveSlide = (direction) => {
    setActiveSlide((index) => (index + direction + heroSlides.length) % heroSlides.length);
  };

  useEffect(() => {
    if (isDragging) return undefined;

    const timer = window.setInterval(() => {
      setActiveSlide((index) => (index + 1) % heroSlides.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [heroSlides.length, isDragging]);

  const startDrag = (event) => {
    if (event.target.closest("button")) return;

    dragStartX.current = event.clientX;
    setIsDragging(true);
    setDragOffset(0);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const moveDrag = (event) => {
    if (dragStartX.current === null) return;

    const delta = event.clientX - dragStartX.current;
    setDragOffset(Math.max(-92, Math.min(92, delta)));
  };

  const finishDrag = (event) => {
    if (dragStartX.current === null) return;

    const delta = event.clientX - dragStartX.current;
    if (Math.abs(delta) > 48) moveSlide(delta < 0 ? 1 : -1);

    dragStartX.current = null;
    setIsDragging(false);
    setDragOffset(0);
  };

  const cancelDrag = () => {
    dragStartX.current = null;
    setIsDragging(false);
    setDragOffset(0);
  };

  return (
    <section className="screen home-screen">
      <header className="topbar">
        <button className="brand-lockup" onClick={() => goTo("home")} aria-label="Beranda el Lotus">
          <img src={assets.logoMark} alt="" />
          <span>el <strong>Lotus</strong></span>
        </button>
        <div className="top-actions">
          <button className="round-button" onClick={() => openModal("notifications")} aria-label="Notifikasi">
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

      <section
        className="home-hero"
        aria-label="Tagline el Lotus"
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={finishDrag}
        onPointerCancel={cancelDrag}
      >
        <div className={`home-hero-track ${isDragging ? "dragging" : ""}`} style={trackStyle}>
          {heroSlides.map((item) => (
            <article className={`home-hero-slide ${item.id}`} key={item.eyebrow} aria-hidden={slide.eyebrow !== item.eyebrow}>
              <img className="home-hero-bg" src={item.image} alt="" aria-hidden="true" draggable="false" />
              <div className="home-hero-copy">
                <span>{item.eyebrow}</span>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
                <button className="soft-pill" onClick={item.onClick}>
                  <span>{item.action}</span>
                  <span aria-hidden="true">{"\u203A"}</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
      <div className="slider-dots" aria-label="Pilih banner">
        {heroSlides.map((item, index) => (
          <button
            key={item.eyebrow}
            className={activeSlide === index ? "active" : ""}
            onClick={() => goToSlide(index)}
            aria-label={`Banner ${index + 1}: ${item.title}`}
            aria-current={activeSlide === index}
          />
        ))}
      </div>

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
        <div className="reward-card-art"><img src={assets.logoMark} alt="" /></div>
        <div>
          <span className="mini-brand">Lotus Pass</span>
          <h2>earn points, bloom more!</h2>
          <p>3 orders lagi untuk voucher minuman favoritmu.</p>
          <div className="reward-meter" aria-hidden="true"><span /></div>
        </div>
        <button onClick={() => openModal("promos")} aria-label="Buka rewards">{"\u203A"}</button>
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
