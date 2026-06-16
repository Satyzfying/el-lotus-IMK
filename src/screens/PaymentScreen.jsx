import { Icon } from "../components/Icon.jsx";
import { paymentGroups } from "../data/catalog.js";
import { rupiah } from "../utils/format.js";

export function PaymentScreen({ selectedPayment, setSelectedPayment, cartTotal, payNow, goTo }) {
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
