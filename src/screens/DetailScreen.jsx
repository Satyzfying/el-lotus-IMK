import { Icon } from "../components/Icon.jsx";
import { iceLevels, sizes, sweetnessLevels, toppings } from "../data/catalog.js";
import { rupiah } from "../utils/format.js";

export function DetailScreen({ product, detail, setDetail, detailSubtotal, addCurrentProductToCart, goTo }) {
  const setOption = (key, value) => setDetail((current) => ({ ...current, [key]: value }));
  const setQuantity = (delta) => {
    setDetail((current) => ({ ...current, quantity: Math.max(1, Math.min(20, current.quantity + delta)) }));
  };

  return (
    <>
      <section className="screen detail-screen no-nav">
        <button className="floating-back" onClick={() => goTo("order")} aria-label="Kembali ke menu"><Icon name="arrowLeft" /></button>
        <div className="detail-hero">
          <div className="detail-hero-copy">
            <span>el Lotus order</span>
            <h2>{product.name}</h2>
            <p>Atur ukuran, rasa, es, dan topping sesuai mood hari ini.</p>
          </div>
          <div className="detail-hero-art">
            <img src={product.image} alt={product.name} />
          </div>
        </div>

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
