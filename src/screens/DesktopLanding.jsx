import { Icon } from "../components/Icon.jsx";
import { assets, outlets, products, promos } from "../data/catalog.js";
import { rupiah } from "../utils/format.js";

const menuItems = [
  { label: "Home", href: "#desktop-home" },
  { label: "Menu", href: "#desktop-menu" },
  { label: "Promo", href: "#desktop-promos" },
  { label: "Outlet", href: "#desktop-outlets" },
  { label: "About", href: "#desktop-about" },
  { label: "Contact", href: "#desktop-contact" },
];

const popularMenu = [
  products[4],
  products[1],
  products[2],
  products[3],
  products[0],
  products[5],
];

const outletCards = outlets.map((name, index) => ({
  name: name.replace("el Lotus ", ""),
  address: [
    "Jl. Raya MERR No. 123, Surabaya",
    "Jl. Kertajaya No. 45, Surabaya",
    "Jl. Keputih No. 1, Surabaya",
    "Jl. Perumdos ITS, Sukolilo",
  ][index],
}));

export function DesktopLanding() {
  return (
    <div className="desktop-landing" id="desktop-home">
      <header className="desktop-nav">
        <a className="desktop-brand" href="#desktop-home" aria-label="el Lotus home">
          <img src={assets.logoMark} alt="" />
          <span>el <strong>Lotus</strong></span>
        </a>
        <nav aria-label="Desktop navigation">
          {menuItems.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
        </nav>
        <a className="desktop-order-button" href="#desktop-menu">
          Order Now <Icon name="bag" />
        </a>
      </header>

      <section className="desktop-hero">
        <div className="desktop-hero-copy">
          <h1>a place to bloom, chill, and connect</h1>
          <p>coffee, matcha, and good vibes made for your every moment.</p>
          <div className="desktop-hero-actions">
            <a className="desktop-primary" href="#desktop-menu">Explore Menu <span aria-hidden="true">{"\u203A"}</span></a>
            <a className="desktop-secondary" href="#desktop-outlets">Order Now <Icon name="bag" /></a>
          </div>
          <div className="desktop-social-proof">
            <div aria-hidden="true"><span /> <span /> <span /> <span /></div>
            <p>Loved by 10K+<br />bloomers every day</p>
          </div>
        </div>
        <div className="desktop-hero-art" aria-label="Signature drinks el Lotus">
          <img className="hero-drink main" src={products[4].image} alt="Iced Matcha Latte" />
          <img className="hero-drink back" src={products[2].image} alt="Ice Cafe Latte" />
          <img className="hero-drink cup" src={products[1].image} alt="Cappuccino" />
        </div>
      </section>

      <section className="desktop-quick-grid" aria-label="Quick actions">
        {[
          ["bag", "Order Online", "pickup / dine-in", "#desktop-menu"],
          ["percent", "Promos", "special for you", "#desktop-promos"],
          ["mapPin", "Find Us", "our location", "#desktop-outlets"],
          ["cup", "Popular Picks", "customer favorites", "#desktop-menu"],
        ].map(([symbol, title, subtitle, href]) => (
          <a className="desktop-quick-card" href={href} key={title}>
            <span><Icon name={symbol} /></span>
            <strong>{title}</strong>
            <small>{subtitle}</small>
            <b aria-hidden="true">{"\u203A"}</b>
          </a>
        ))}
      </section>

      <section className="desktop-section" id="desktop-menu">
        <div className="desktop-section-head">
          <h2>popular picks</h2>
          <a href="#desktop-menu">see all menu <span aria-hidden="true">{"\u2192"}</span></a>
        </div>
        <div className="desktop-products">
          {popularMenu.map((item) => (
            <article className="desktop-product-card" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <strong>{rupiah(item.price)}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="desktop-pass">
        <div className="desktop-pass-card">
          <img src={assets.logoMark} alt="" />
          <strong>Lotus Pass</strong>
        </div>
        <div>
          <h2>earn points,<br />bloom more!</h2>
          <p>3 orders lagi untuk voucher minuman favoritmu.</p>
        </div>
        <div className="desktop-pass-progress">
          <strong>7 / 10 orders</strong>
          <span><i /></span>
        </div>
        <a href="#desktop-promos">Learn More <span aria-hidden="true">{"\u203A"}</span></a>
      </section>

      <section className="desktop-about" id="desktop-about">
        <img src={assets.interior} alt="Interior cafe el Lotus" />
        <div>
          <span>more than coffee</span>
          <h2>we're a place to bloom</h2>
          <p>El Lotus is where every sip brings calm, every corner feels like home, and every moment helps you grow.</p>
          <a href="#desktop-contact">Learn Our Story <span aria-hidden="true">{"\u203A"}</span></a>
        </div>
        <div className="desktop-about-stack">
          <img src={products[1].image} alt="Hot cappuccino" />
          <img src={products[0].image} alt="Hot matcha" />
        </div>
      </section>

      <section className="desktop-section" id="desktop-outlets">
        <div className="desktop-section-head">
          <h2>our outlets</h2>
          <a href="#desktop-outlets">view all outlets <span aria-hidden="true">{"\u2192"}</span></a>
        </div>
        <div className="desktop-outlets">
          {outletCards.map((outlet) => (
            <article className="desktop-outlet-card" key={outlet.name}>
              <img src={assets.storefront} alt={`Outlet ${outlet.name}`} />
              <div>
                <h3>{outlet.name}</h3>
                <p><Icon name="mapPin" /> {outlet.address}</p>
                <p><Icon name="clock" /> 08.00 - 22.00</p>
                <div>
                  <a href="#desktop-outlets">View Maps</a>
                  <a href="#desktop-menu">Select Outlet</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="desktop-how">
        <h2>how to order</h2>
        {[
          ["home", "Choose Outlet", "Pick your nearest el Lotus outlet"],
          ["cup", "Pick Your Drink", "Choose your favorite drink from our menu"],
          ["bag", "Pay & Enjoy", "Pay easily and enjoy your moment"],
        ].map(([symbol, title, text], index) => (
          <article key={title}>
            <span className="desktop-step-number">{index + 1}</span>
            <Icon name={symbol} />
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="desktop-section" id="desktop-promos">
        <div className="desktop-section-head">
          <h2>promos for you</h2>
          <a href="#desktop-promos">see all promos <span aria-hidden="true">{"\u2192"}</span></a>
        </div>
        <div className="desktop-promos">
          {promos.map((promo, index) => (
            <article className={`desktop-promo-card promo-${index}`} key={promo.id}>
              <span>{index === 0 ? "STUDENT DEAL" : "MATCHA LOVER"}</span>
              <h3>{promo.label}</h3>
              <p>{promo.caption}</p>
              <strong>-{rupiah(promo.amount)}</strong>
            </article>
          ))}
          <article className="desktop-promo-card wide">
            <span>BUY 2 GET 1</span>
            <h3>free signature drinks</h3>
            <p>everyday cozy deal for your favorite table.</p>
          </article>
        </div>
      </section>

      <section className="desktop-cta">
        <img src={products[2].image} alt="Ice Cafe Latte" />
        <div>
          <h2>ready to bloom with your favorite drink?</h2>
          <p>order now and enjoy your cozy moment with el Lotus.</p>
        </div>
        <a href="#desktop-menu">Order Now <Icon name="bag" /></a>
      </section>

      <footer className="desktop-footer" id="desktop-contact">
        <div>
          <a className="desktop-brand" href="#desktop-home">
            <img src={assets.logoMark} alt="" />
            <span>el <strong>Lotus</strong></span>
          </a>
          <p>bloom, coffee & good vibes always.</p>
        </div>
        <div>
          <h3>explore</h3>
          {menuItems.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
        </div>
        <div>
          <h3>our outlets</h3>
          {outletCards.map((outlet) => <span key={outlet.name}>{outlet.name}</span>)}
        </div>
        <div>
          <h3>contact us</h3>
          <span>0812 3456 7890</span>
          <span>hello@ellotus.co.id</span>
          <span>08.00 - 22.00 Everyday</span>
        </div>
        <form>
          <h3>newsletter</h3>
          <label>
            <span>stay updated with our latest promo & events</span>
            <input type="email" placeholder="your email address" />
          </label>
          <button type="button" aria-label="Subscribe"><Icon name="share" /></button>
        </form>
      </footer>
    </div>
  );
}
