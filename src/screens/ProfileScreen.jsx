import { Icon } from "../components/Icon.jsx";
import { assets, profileUser } from "../data/catalog.js";

export function ProfileScreen({ openModal, orders = [], goTo, setActivityTab }) {
  const activeOrders = orders.filter((order) => order.active);
  const latestOrder = activeOrders[0] || orders[0] || null;
  const progressIndex = getProgressIndex(latestOrder);
  const openActivity = (tab) => {
    setActivityTab(tab);
    goTo("activity");
  };
  const steps = [
    ["Placed", "check"],
    ["Preparing", "clock"],
    ["On the way", "truck"],
    ["Delivered", "heart"],
  ];

  return (
    <section className="screen profile-screen">
      <img className="profile-hero" src={assets.storefront} alt="Storefront el Lotus" />

      <section className="profile-card">
        <img src={assets.avatar} alt="Avatar Minji Sastro" />
        <div>
          <h1>{profileUser.name}</h1>
          <p>{profileUser.email}<br />{profileUser.phone}</p>
        </div>
      </section>

      <div className="profile-actions">
        <button onClick={() => openModal("profile")}>Lihat Profil</button>
        <button onClick={() => openModal("memberQr")}>QR Code</button>
      </div>

      <section className="profile-section">
        <h2>Pesanan Saya</h2>
        <div className="progress-track" aria-label="Progress pesanan">
          {steps.map(([label, symbol], index) => (
            <button
              className={`progress-step ${index <= progressIndex ? "completed" : ""} ${index === progressIndex ? "current" : ""}`}
              key={label}
              onClick={() => openActivity(index === steps.length - 1 ? "history" : "active")}
              aria-label={`Buka pesanan ${label}`}
            >
              <span><Icon name={symbol} /></span>
              <small>{label}</small>
            </button>
          ))}
        </div>
        <div className="profile-order-summary">
          <div>
            <strong>{activeOrders.length ? `${activeOrders.length} pesanan aktif` : "Tidak ada pesanan aktif"}</strong>
            <span>{latestOrder ? `${latestOrder.outlet} - ${latestOrder.status}` : "Mulai pesan untuk melihat progress di sini."}</span>
          </div>
          <button onClick={() => openActivity(activeOrders.length ? "active" : "history")}>
            {activeOrders.length ? "Lihat Aktif" : "Lihat Riwayat"}
          </button>
        </div>
      </section>

      <ProfileMenu title="Pembayaran" rows={[
        ["Metode Pembayaran", "wallet", "paymentMethods"],
        ["Promos & Vouchers", "percent", "vouchers"],
        ["Alamat Tersimpan", "mapPin", "address"],
      ]} openModal={openModal} />

      <ProfileMenu title="Lainnya" rows={[
        ["Pusat Bantuan", "help", "help"],
        ["Kebijakan Privasi", "shield", "privacy"],
        ["Ketentuan Layanan", "bell", "terms"],
      ]} openModal={openModal} />

      <button className="logout-button" onClick={() => openModal("logout")}>
        <Icon name="logout" /> Keluar
      </button>
    </section>
  );
}

function getProgressIndex(order) {
  if (!order) return -1;
  const status = order.status.toLowerCase();

  if (status.includes("selesai") || status.includes("delivered")) return 3;
  if (status.includes("jalan") || status.includes("way")) return 2;
  if (status.includes("proses") || status.includes("preparing")) return 1;

  return 0;
}

function ProfileMenu({ title, rows, openModal }) {
  return (
    <section className="profile-section">
      <h2>{title}</h2>
      <div className="profile-menu">
        {rows.map(([label, symbol, modalType]) => (
          <button key={label} onClick={() => openModal(modalType)}>
            <Icon name={symbol} />
            <strong>{label}</strong>
            <span aria-hidden="true">{"\u203A"}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
