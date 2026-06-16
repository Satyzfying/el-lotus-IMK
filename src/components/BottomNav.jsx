import { Icon } from "./Icon.jsx";

export function BottomNav({ screen, cartCount, goTo }) {
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
