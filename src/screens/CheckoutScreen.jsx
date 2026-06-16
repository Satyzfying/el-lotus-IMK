import { Icon } from "../components/Icon.jsx";
import { assets, products } from "../data/catalog.js";
import { rupiah, shortOutlet } from "../utils/format.js";

export function CheckoutScreen({
  selectedOutlet,
  selectedAddress,
  cart,
  cartSubtotal,
  deliveryFee,
  serviceFee,
  promoDiscount,
  selectedPromoLabel,
  cartTotal,
  updateCartQuantity,
  goTo,
  openModal,
}) {
  const isEmpty = cart.length === 0;

  return (
    <>
      <section className="screen checkout-screen no-nav">
        <img className="checkout-hero" src={assets.storefront} alt="Outlet el Lotus" />

        <section className="checkout-card delivery-row">
          <Icon name="truck" />
          <div>
            <h1>Delivery</h1>
            <span>{selectedOutlet}</span>
          </div>
          <button onClick={() => goTo("order")}>Ganti</button>
        </section>

        <section className="checkout-card address-row">
          <div>
            <strong>Alamat Pengantaran</strong>
            <span>{selectedAddress.label}</span>
            <small>{selectedAddress.detail}</small>
          </div>
          <button onClick={() => openModal("address")}>Ganti</button>
        </section>

        {isEmpty ? (
          <EmptyCart goTo={goTo} />
        ) : (
          <>
            <section className="cart-list" aria-label="Ringkasan cart">
              {cart.map((item) => <CartItem key={item.id} item={item} updateCartQuantity={updateCartQuantity} />)}
            </section>

            <section className="checkout-card summary-card">
              <h2>Ringkasan pembayaran</h2>
              <div><span>Harga</span><span>{rupiah(cartSubtotal)}</span></div>
              <div><span>Biaya Pengiriman</span><span>{rupiah(deliveryFee)}</span></div>
              <div><span>Biaya Layanan</span><span>{rupiah(serviceFee)}</span></div>
              {promoDiscount > 0 && <div className="discount-line"><span>{selectedPromoLabel}</span><span>-{rupiah(promoDiscount)}</span></div>}
              <div className="total"><strong>Total pembayaran</strong><strong>{rupiah(cartTotal)}</strong></div>
            </section>

            <section className="checkout-card discount-row">
              <div className="discount-icon"><Icon name="percent" /></div>
              <div>
                <strong>{selectedPromoLabel || "Diskon ongkir 8rb"}</strong>
                <span>{selectedPromoLabel ? "Promo aktif di checkout" : "Promo terbaik untukmu"}</span>
              </div>
              <button onClick={() => openModal("promos")}>{selectedPromoLabel ? "Ganti" : "Pakai"}</button>
            </section>
          </>
        )}
      </section>

      <div className="checkout-actions">
        <button className="square-action" onClick={() => goTo("order")} aria-label="Kembali ke menu"><Icon name="arrowLeft" /></button>
        <button className="wide-action" onClick={() => goTo("payment")} disabled={isEmpty}>Lanjut Pembayaran</button>
      </div>
    </>
  );
}

function EmptyCart({ goTo }) {
  return (
    <section className="empty-cart">
      <img src={products[0].image} alt="" />
      <h2>Cart masih kosong</h2>
      <p>Pilih menu favoritmu dulu, lalu ringkasan pesanan akan muncul di sini.</p>
      <button onClick={() => goTo("order")}>Pilih Menu</button>
    </section>
  );
}

function CartItem({ item, updateCartQuantity }) {
  const options = [
    `Ukuran: ${item.options.size}`,
    `Kemanisan: ${item.options.sweetness}`,
    `Ice: ${item.options.ice}`,
    `Topping: ${item.options.topping}`,
  ];

  if (item.options.note) options.push(`Catatan: ${item.options.note}`);

  return (
    <article className="checkout-card checkout-product">
      <div className="cart-copy">
        <h2>{item.name}</h2>
        <p><strong>Outlet:</strong> {shortOutlet(item.outlet)}<br />{options.join(" / ")}</p>
        <div className="cart-controls">
          <button onClick={() => updateCartQuantity(item.id, -1)} aria-label={`Kurangi ${item.name}`}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => updateCartQuantity(item.id, 1)} aria-label={`Tambah ${item.name}`}>+</button>
          <strong>{rupiah(item.unitPrice * item.quantity)}</strong>
        </div>
      </div>
      <img src={item.image} alt={item.name} />
    </article>
  );
}
