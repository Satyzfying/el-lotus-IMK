import { Icon } from "../components/Icon.jsx";
import { dummyOrders, products } from "../data/catalog.js";
import { rupiah } from "../utils/format.js";

export function ActivityScreen({ orders, activityTab, setActivityTab, goTo, openModal }) {
  const activeOrders = orders.filter((order) => order.active);
  const historyRows = [...orders, ...dummyOrders];
  const rows = activityTab === "active" ? activeOrders : historyRows;

  return (
    <section className="screen activity-screen">
      <header className="simple-header">
        <span>el <strong>Lotus</strong></span>
        <button className="round-button" onClick={() => openModal("notifications")} aria-label="Notifikasi"><Icon name="bell" /></button>
      </header>

      <section className="activity-hero" aria-labelledby="activity-title">
        <div>
          <span>Order tracking</span>
          <h1 id="activity-title">Aktivitas</h1>
          <p>{activeOrders.length ? "Pesananmu sedang bergerak. Cek statusnya di sini." : "Riwayat dan status pesanan el Lotus tersimpan rapi di sini."}</p>
        </div>
        <div className="activity-count">
          <strong>{activeOrders.length}</strong>
          <small>aktif</small>
        </div>
      </section>

      <div className="activity-tabs" role="tablist" aria-label="Filter aktivitas">
        <button className={activityTab === "active" ? "active" : ""} onClick={() => setActivityTab("active")} role="tab" aria-selected={activityTab === "active"}>
          <span>Aktif</span>
          <small>{activeOrders.length}</small>
        </button>
        <button className={activityTab === "history" ? "active" : ""} onClick={() => setActivityTab("history")} role="tab" aria-selected={activityTab === "history"}>
          <span>Riwayat</span>
          <small>{historyRows.length}</small>
        </button>
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
  const isDone = order.status.toLowerCase().includes("selesai");
  const itemPreview = order.items.slice(0, 3);

  return (
    <article className={`order-card ${isDone ? "is-done" : "is-active"}`}>
      <div className="order-card-top">
        <div className="order-thumb">
          <img src={order.image || products[0].image} alt="Produk el Lotus" />
          <span><Icon name={isDone ? "check" : "truck"} /></span>
        </div>
        <div className="order-title">
          <span className="order-status"><Icon name="clock" /> {order.status}</span>
          <h2>{order.outlet}</h2>
          <p>{order.date} - {order.time}</p>
        </div>
      </div>

      <div className={`order-flow ${isDone ? "complete" : ""}`} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="order-copy">
        <div className="order-items">
          {itemPreview.map((item) => <span key={item}>{item}</span>)}
        </div>
        <div className="order-total">
          <div>
            <span>Total</span>
            <strong>{rupiah(order.total)}</strong>
          </div>
          <button onClick={() => openModal("orderDetail", { order })}>Lihat Detail</button>
        </div>
      </div>
    </article>
  );
}
