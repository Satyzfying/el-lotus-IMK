import { Icon } from "../components/Icon.jsx";
import { assets, profileUser } from "../data/catalog.js";

export function ProfileScreen({ openModal }) {
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
          {[
            ["Placed", "check"],
            ["Preparing", "clock"],
            ["On the way", "truck"],
            ["Delivered", "heart"],
          ].map(([label, symbol]) => (
            <div key={label}>
              <span><Icon name={symbol} /></span>
              <small>{label}</small>
            </div>
          ))}
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
