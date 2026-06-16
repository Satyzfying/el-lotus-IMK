import { assets, outlets, products } from "../data/catalog.js";
import { rupiah, shortOutlet } from "../utils/format.js";

export function OrderScreen({ selectedOutlet, outletOpen, setOutletOpen, selectOutlet, openProductDetail }) {
  return (
    <section className="screen order-screen">
      <header className="order-top">
        <span>Pick your spot</span>
        <h1>Pesan dari outlet terdekat.</h1>
      </header>

      <div className="location-box">
        <button
          className="location-toggle"
          onClick={() => setOutletOpen((open) => !open)}
          aria-expanded={outletOpen}
          aria-controls="outlet-list"
        >
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

      <img className="store-hero" src={assets.storefront} alt="Tampak depan outlet el Lotus" />

      <div className="menu-title">
        <div>
          <span>{shortOutlet(selectedOutlet)}</span>
          <h1>Menu el <strong>Lotus</strong></h1>
        </div>
        <img src={assets.logoMark} alt="" />
      </div>

      <div className="menu-grid">
        {products.map((item) => (
          <article className="menu-card" key={item.id}>
            <button className="menu-product" onClick={() => openProductDetail(item.id)} aria-label={`Lihat detail ${item.name}`}>
              <h2>{item.name}</h2>
              <img src={item.image} alt={item.name} />
            </button>
            <div className="menu-card-footer">
              <span>{rupiah(item.price)}</span>
              <button className="add-menu-button" onClick={() => openProductDetail(item.id)}>Tambah</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
