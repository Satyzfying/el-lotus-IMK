import { Icon } from "../components/Icon.jsx";

export function SuccessScreen() {
  return (
    <section className="screen success-screen no-nav">
      <div className="success-content">
        <div className="success-icon"><Icon name="check" /></div>
        <h1>Pembayaran Berhasil</h1>
      </div>
    </section>
  );
}
