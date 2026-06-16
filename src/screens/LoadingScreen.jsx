import { assets } from "../data/catalog.js";

export function LoadingScreen() {
  return (
    <section className="screen loading-screen no-nav" aria-label="Loading el Lotus">
      <div className="loading-content">
        <img className="loading-logo" src={assets.logoMark} alt="Logo el Lotus" />
        <h1>el <strong>Lotus</strong></h1>
        <p>a place to bloom,<br />chill, and connect</p>
      </div>
    </section>
  );
}
