import { Icon } from "../components/Icon.jsx";
import { assets } from "../data/catalog.js";
import { formatCountdown, rupiah } from "../utils/format.js";

export function QrisScreen({ cartTotal, qrisSeconds, downloadQris, shareQris, completePayment, goTo }) {
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
