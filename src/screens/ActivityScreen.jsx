import { Icon } from "../components/Icon.jsx";
import { dummyOrders, products } from "../data/catalog.js";
import { rupiah } from "../utils/format.js";

export function ActivityScreen({ orders, activityTab, setActivityTab, goTo, openModal }) {
  const activeOrders = orders.filter((order) => order.active);
  const rows = activityTab === "active" ? activeOrders : [...orders, ...dummyOrders];

  return (
    <section className="screen activity-screen">
      <header className="simple-header">
        <span>el <strong>Lotus</strong></span>
        <button className="round-button" onClick={() => openModal("notifications")} aria-label="Notifikasi"><Icon name="bell" /></button>
      </header>

      <h1 className="page-title">Aktivitas</h1>

      <div className="activity-tabs" role="tablist" aria-label="Filter aktivitas">
        <button className={activityTab === "active" ? "active" : ""} onClick={() => setActivityTab("active")} role="tab">Aktif</button>
        <button className={activityTab === "history" ? "active" : ""} onClick={() => setActivityTab("history")} role="tab">Riwayat</button>
      </div>

      {rows.length ? (
        <div className="order-list">
          {rows.map((order) => <OrderCard key={order.id} order={order} openModal={openModal} />)}
        </div>
      ) : (
        <section className="empty-activity">
          <img src={products[0].image} alt="" />
          <h2>Belum ada pesanan aktif</h2>
          <p>Setelah pembayaran berhasil, status pesananmu akan muncul di sini.</p>
          <button onClick={() => goTo("order")}>Pesan Sekarang</button>
        </section>
      )}
    </section>
  );
}

function OrderCard({ order, openModal }) {
  return (
    <article className="order-card">
      <img src={order.image || products[0].image} alt="Produk el Lotus" />
      <div className="order-copy">
        <div className="order-title">
          <h2>{order.outlet}</h2>
          <span><Icon name="clock" /> {order.status}</span>
        </div>
        <p>{order.date} - {order.time}</p>
        <ul>
          {order.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <div className="order-total">
          <span>Total</span>
          <strong>{rupiah(order.total)}</strong>
          <button onClick={() => openModal("orderDetail", { order })}>Lihat Detail</button>
        </div>
      </div>
    </article>
  );
}
