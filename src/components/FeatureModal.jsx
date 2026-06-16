import {
  assets,
  deliveryAddresses,
  notifications,
  outlets,
  paymentGroups,
  profileUser,
  promos,
} from "../data/catalog.js";
import { rupiah, shortOutlet } from "../utils/format.js";
import { Icon } from "./Icon.jsx";

export function FeatureModal({
  modal,
  onClose,
  selectedOutlet,
  onSelectOutlet,
  selectedAddressId,
  onSelectAddress,
  selectedPromo,
  onApplyPromo,
  onClearPromo,
  goTo,
  onLogout,
}) {
  if (!modal) return null;

  const moveTo = (target) => {
    onClose();
    goTo(target);
  };

  const content = renderModalContent({
    modal,
    selectedOutlet,
    onSelectOutlet,
    selectedAddressId,
    onSelectAddress,
    selectedPromo,
    onApplyPromo,
    onClearPromo,
    moveTo,
    onClose,
    onLogout,
  });

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="modal-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="modal-head">
          <div>
            <span>{content.kicker}</span>
            <h2 id="modal-title">{content.title}</h2>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Tutup">
            x
          </button>
        </header>
        <div className="modal-body">{content.body}</div>
        {content.actions && <div className="modal-actions">{content.actions}</div>}
      </section>
    </div>
  );
}

function renderModalContent(props) {
  const { modal } = props;

  switch (modal.type) {
    case "notifications":
      return notificationsContent(props);
    case "promos":
    case "vouchers":
      return promosContent(props);
    case "locations":
      return locationsContent(props);
    case "address":
      return addressContent(props);
    case "orderDetail":
      return orderDetailContent(props);
    case "profile":
      return profileContent();
    case "memberQr":
      return memberQrContent();
    case "paymentMethods":
      return paymentMethodsContent(props);
    case "help":
      return helpContent();
    case "privacy":
      return textContent(
        "Account",
        "Kebijakan Privasi",
        "Data pada aplikasi ini disimpan lokal di browser untuk kebutuhan demo IMK. Tidak ada backend, login nyata, atau pembayaran real yang dikirim ke server.",
      );
    case "terms":
      return textContent(
        "Account",
        "Ketentuan Layanan",
        "el Lotus versi ini adalah prototipe interaktif. Semua pesanan, status, promo, dan pembayaran digunakan untuk simulasi alur pengalaman pengguna.",
      );
    case "logout":
      return logoutContent(props);
    default:
      return textContent("el Lotus", "Fitur Demo", "Fitur ini sudah disiapkan dalam mode prototipe.");
  }
}

function notificationsContent({ moveTo }) {
  return {
    kicker: "Inbox",
    title: "Notifikasi",
    body: (
      <div className="modal-list">
        {notifications.map((item) => (
          <article className="modal-row" key={item.id}>
            <span className={`modal-dot ${item.tone}`} />
            <div>
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </div>
          </article>
        ))}
      </div>
    ),
    actions: <button className="wide-action" onClick={() => moveTo("activity")}>Lihat Aktivitas</button>,
  };
}

function promosContent({ selectedPromo, onApplyPromo, onClearPromo }) {
  return {
    kicker: "Deals",
    title: "Promos & Vouchers",
    body: (
      <div className="modal-list">
        {promos.map((promo) => (
          <button
            className={`promo-option ${selectedPromo === promo.id ? "selected" : ""}`}
            key={promo.id}
            onClick={() => onApplyPromo(promo.id)}
          >
            <Icon name="ticket" />
            <span>
              <strong>{promo.label}</strong>
              <small>{promo.caption}</small>
            </span>
            <b>-{rupiah(promo.amount)}</b>
          </button>
        ))}
      </div>
    ),
    actions: selectedPromo ? (
      <button className="outline-action" onClick={onClearPromo}>Hapus promo aktif</button>
    ) : null,
  };
}

function locationsContent({ selectedOutlet, onSelectOutlet, moveTo }) {
  return {
    kicker: "Find Us",
    title: "Pilih Outlet",
    body: (
      <div className="modal-list">
        {outlets.map((outlet) => (
          <button
            className={`address-option ${selectedOutlet === outlet ? "selected" : ""}`}
            key={outlet}
            onClick={() => {
              onSelectOutlet(outlet);
              moveTo("order");
            }}
          >
            <Icon name="mapPin" />
            <span>
              <strong>{outlet}</strong>
              <small>Siap pickup, dine-in, dan delivery</small>
            </span>
          </button>
        ))}
      </div>
    ),
    actions: <button className="wide-action" onClick={() => moveTo("order")}>Buka Menu Outlet</button>,
  };
}

function addressContent({ selectedAddressId, onSelectAddress }) {
  return {
    kicker: "Delivery",
    title: "Alamat Tersimpan",
    body: (
      <div className="modal-list">
        {deliveryAddresses.map((address) => (
          <button
            className={`address-option ${selectedAddressId === address.id ? "selected" : ""}`}
            key={address.id}
            onClick={() => onSelectAddress(address.id)}
          >
            <Icon name="mapPin" />
            <span>
              <strong>{address.label}</strong>
              <small>{address.detail}</small>
            </span>
          </button>
        ))}
      </div>
    ),
  };
}

function orderDetailContent({ modal, moveTo }) {
  const order = modal.order;

  if (!order) {
    return textContent("Order", "Detail Pesanan", "Detail pesanan tidak tersedia.");
  }

  return {
    kicker: order.status,
    title: order.outlet,
    body: (
      <div className="order-detail">
        <img src={order.image || assets.logoMark} alt="Produk pesanan el Lotus" />
        <div className="info-grid">
          <span>Tanggal</span>
          <strong>{order.date} - {order.time}</strong>
          <span>Status</span>
          <strong>{order.status}</strong>
          <span>Total</span>
          <strong>{rupiah(order.total)}</strong>
        </div>
        <ul>
          {order.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
        {order.promoLabel && <p className="copy-box">Promo dipakai: {order.promoLabel}</p>}
      </div>
    ),
    actions: <button className="wide-action" onClick={() => moveTo("order")}>Pesan Lagi</button>,
  };
}

function profileContent() {
  return {
    kicker: "Account",
    title: "Profil Member",
    body: (
      <div className="member-card">
        <img src={assets.avatar} alt="Avatar Minji Sastro" />
        <div>
          <h3>{profileUser.name}</h3>
          <p>{profileUser.email}<br />{profileUser.phone}</p>
        </div>
        <div className="info-grid full">
          <span>Member ID</span>
          <strong>{profileUser.memberId}</strong>
          <span>Lotus Points</span>
          <strong>{profileUser.points} pts</strong>
        </div>
      </div>
    ),
  };
}

function memberQrContent() {
  return {
    kicker: "Membership",
    title: "QR Code Member",
    body: (
      <div className="member-qr">
        <div className="fake-qr" aria-label="QR member demo">
          <img src={assets.logoMark} alt="" />
        </div>
        <strong>{profileUser.memberId}</strong>
        <p>Tunjukkan kode ini ke kasir untuk menambahkan Lotus Points.</p>
      </div>
    ),
  };
}

function paymentMethodsContent({ moveTo }) {
  return {
    kicker: "Wallet",
    title: "Metode Pembayaran",
    body: (
      <div className="modal-list compact">
        {paymentGroups.map((group) => (
          <article className="copy-box" key={group.title}>
            <strong>{group.title}</strong>
            <p>{group.options.map((option) => option.label).join(", ")}</p>
          </article>
        ))}
      </div>
    ),
    actions: <button className="wide-action" onClick={() => moveTo("checkout")}>Atur di Checkout</button>,
  };
}

function helpContent() {
  return {
    kicker: "Support",
    title: "Pusat Bantuan",
    body: (
      <div className="modal-list compact">
        <article className="copy-box">
          <strong>Bagaimana cek status pesanan?</strong>
          <p>Buka tab Aktivitas untuk melihat pesanan aktif dan riwayat.</p>
        </article>
        <article className="copy-box">
          <strong>Apakah QRIS ini pembayaran nyata?</strong>
          <p>Tidak. QRIS pada aplikasi ini dipakai untuk simulasi alur prototype.</p>
        </article>
        <article className="copy-box">
          <strong>Bagaimana mengganti outlet?</strong>
          <p>Gunakan dropdown di halaman Pesan atau tombol Find Us di Beranda.</p>
        </article>
      </div>
    ),
  };
}

function logoutContent({ onLogout, onClose }) {
  return {
    kicker: "Account",
    title: "Keluar dari Demo?",
    body: (
      <p className="copy-box">
        Keranjang dan promo aktif akan dikosongkan. Riwayat pesanan tetap tersimpan agar flow aktivitas masih bisa diperiksa.
      </p>
    ),
    actions: (
      <>
        <button className="outline-action" onClick={onClose}>Batal</button>
        <button className="wide-action danger" onClick={onLogout}>Keluar Demo</button>
      </>
    ),
  };
}

function textContent(kicker, title, text) {
  return {
    kicker,
    title,
    body: <p className="copy-box">{text}</p>,
  };
}
