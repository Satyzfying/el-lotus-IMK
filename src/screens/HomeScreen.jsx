import { useEffect, useMemo, useState } from "react";
import { Icon } from "../components/Icon.jsx";
import { assets, popularProducts } from "../data/catalog.js";
import { rupiah } from "../utils/format.js";

export function HomeScreen({ cartCount, goTo, handleQuickAction, openProductDetail, openModal }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const quickActions = [
    ["cup", "Order", "pickup / dine-in", "order"],
    ["bag", "Cart", `${cartCount} item`, "checkout"],
    ["percent", "Promos", "special for you", "promo"],
    ["mapPin", "Find Us", "our location", "locations"],
  ];
  const heroSlides = useMemo(() => [
    {
      eyebrow: "fresh mood, fresh cup",
      title: "Ngopi biar mekar.",
      body: "a place to bloom, chill, and connect",
      image: assets.interior,
      action: "Mulai pesan",
      onClick: () => goTo("order"),
    },
    {
      eyebrow: "pickup ready",
      title: "Outlet hangat, order cepat.",
      body: "Pilih cabang favorit dan lanjutkan pesananmu.",
      image: assets.storefront,
      action: "Pilih outlet",
      onClick: () => goTo("order"),
    },
    {
      eyebrow: "today's pick",
      title: "Matcha dingin, mood tenang.",
      body: "Menu favorit untuk chill sejenak hari ini.",
      image: popularProducts[2].image,
      action: "Lihat menu",
      onClick: () => openProductDetail("ice-matcha-latte"),
    },
  ], [goTo, openProductDetail]);
  const slide = heroSlides[activeSlide];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((index) => (index + 1) % heroSlides.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

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

      <section className="home-hero" aria-label="Tagline el Lotus">
        <img key={slide.image} className="home-hero-bg" src={slide.image} alt="" aria-hidden="true" />
        <div className="home-hero-copy">
          <span>{slide.eyebrow}</span>
          <h2>{slide.title}</h2>
          <p>{slide.body}</p>
          <button className="soft-pill" onClick={slide.onClick}>
            <span>{slide.action}</span>
            <span aria-hidden="true">{"\u203A"}</span>
          </button>
        </div>
      </section>
      <div className="slider-dots" aria-label="Pilih banner">
        {heroSlides.map((item, index) => (
          <button
            key={item.eyebrow}
            className={activeSlide === index ? "active" : ""}
            onClick={() => setActiveSlide(index)}
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
