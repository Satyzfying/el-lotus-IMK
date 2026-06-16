export const assets = {
  avatar: new URL("../../assets/avatar-hd.jpg", import.meta.url).href,
  interior: new URL("../../assets/interior-hd.png", import.meta.url).href,
  logoMark: new URL("../../assets/logo-only.svg", import.meta.url).href,
  qris: new URL("../../assets/qris-code.png", import.meta.url).href,
  storefront: new URL("../../assets/storefront-hd.png", import.meta.url).href,
};

export const outlets = [
  "el Lotus MERR Surabaya",
  "el Lotus Kertajaya",
  "el Lotus Keputih",
  "el Lotus Perumdos ITS",
];

export const products = [
  {
    id: "hot-matcha",
    name: "Hot Matcha",
    price: 24000,
    image: new URL("../../assets/product-hot-matcha.png", import.meta.url).href,
    description: "Matcha khas el Lotus dengan perpaduan aroma matcha dan tekstur lembut.",
  },
  {
    id: "hot-cappuccino",
    name: "Hot Cappuccino",
    price: 24000,
    image: new URL("../../assets/product-hot-cappuccino.png", import.meta.url).href,
    description: "Espresso hangat dengan foam lembut dan aroma kopi yang tebal.",
  },
  {
    id: "ice-cafe-latte",
    name: "Ice Cafe Latte",
    price: 26000,
    image: new URL("../../assets/product-ice-cafe-latte.png", import.meta.url).href,
    description: "Latte dingin dengan susu creamy dan espresso seimbang.",
  },
  {
    id: "ice-pink-matcha",
    name: "Ice Pink Matcha",
    price: 28000,
    image: new URL("../../assets/product-ice-pink-matcha.png", import.meta.url).href,
    description: "Matcha dingin dengan layer pink berry yang ringan dan segar.",
  },
  {
    id: "ice-matcha-latte",
    name: "Ice Matcha Latte",
    price: 30000,
    image: new URL("../../assets/product-ice-matcha-latte.png", import.meta.url).href,
    description: "Matcha latte dingin favorit dengan rasa creamy yang kalem.",
  },
  {
    id: "ice-americano",
    name: "Ice Americano",
    price: 22000,
    image: new URL("../../assets/product-ice-americano.png", import.meta.url).href,
    description: "Americano dingin yang bersih, ringan, dan cocok untuk menemani fokus.",
  },
];

export const popularProducts = [
  {
    id: "hot-matcha",
    name: "Matcha Lalu",
    price: 50000,
    image: products[0].image,
  },
  {
    id: "hot-cappuccino",
    name: "Ice Cappuccino",
    price: 35000,
    image: products[1].image,
  },
  {
    id: "ice-matcha-latte",
    name: "Ice Matcha Latte",
    price: 35000,
    image: products[4].image,
  },
];

export const sizes = [
  { label: "Reguler", extra: 0 },
  { label: "Large", extra: 2000 },
];

export const sweetnessLevels = ["30%", "70%", "100%"];
export const iceLevels = ["30%", "70%", "100%"];

export const toppings = [
  { label: "Tanpa Topping", extra: 0 },
  { label: "Grass Jelly", extra: 4000 },
  { label: "Boba", extra: 4000 },
  { label: "Cheese Cream", extra: 5000 },
];

export const paymentGroups = [
  {
    title: "E-Wallet",
    options: [
      { id: "gopay", label: "GoPay", caption: "Bayar cepat dari aplikasi GoPay" },
      { id: "ovo", label: "OVO", caption: "Saldo OVO atau OVO Points" },
      { id: "dana", label: "DANA", caption: "Pembayaran dompet digital DANA" },
      { id: "linkaja", label: "LinkAja", caption: "Terhubung dengan akun LinkAja" },
      { id: "shopeepay", label: "ShopeePay", caption: "Gunakan saldo ShopeePay" },
    ],
  },
  {
    title: "Virtual Account",
    options: [
      { id: "bca", label: "BCA", caption: "Virtual Account BCA" },
      { id: "mandiri", label: "Mandiri", caption: "Virtual Account Mandiri" },
      { id: "bni", label: "BNI", caption: "Virtual Account BNI" },
      { id: "bri", label: "Bank BRI", caption: "Virtual Account BRI" },
    ],
  },
  {
    title: "Kartu Pembayaran",
    options: [
      { id: "card", label: "Credit/Kartu Debit", caption: "Visa, Mastercard, dan debit online" },
    ],
  },
  {
    title: "Metode Lainnya",
    options: [
      { id: "qris", label: "QRIS", caption: "Scan, unduh, atau bagikan QR code" },
    ],
  },
];

export const promos = [
  {
    id: "ongkir-8",
    label: "Diskon ongkir 8rb",
    caption: "Potongan langsung untuk biaya pengiriman.",
    amount: 8000,
  },
  {
    id: "lotus-pass",
    label: "Lotus Pass Reward",
    caption: "Reward member untuk pesanan minuman favorit.",
    amount: 5000,
  },
];

export const deliveryAddresses = [
  {
    id: "home",
    label: "Jl. Simo Pomahan Baru",
    detail: "Rumah Minji, pagar putih dekat pos satpam",
  },
  {
    id: "campus",
    label: "Gedung Rektorat ITS",
    detail: "Drop point lobby utama",
  },
  {
    id: "studio",
    label: "Creative Studio Kertajaya",
    detail: "Titip resepsionis lantai 2",
  },
];

export const notifications = [
  {
    id: "notif-1",
    title: "Promo sore aktif",
    body: "Diskon ongkir 8rb bisa dipakai untuk checkout hari ini.",
    tone: "promo",
  },
  {
    id: "notif-2",
    title: "QRIS demo siap",
    body: "Pilih metode QRIS untuk mencoba alur pembayaran penuh.",
    tone: "payment",
  },
  {
    id: "notif-3",
    title: "Lotus Pass",
    body: "3 order lagi menuju voucher minuman favorit.",
    tone: "reward",
  },
];

export const profileUser = {
  name: "Minji Sastro",
  email: "minjisastro@gmail.com",
  phone: "+(62) 851 0851 0851",
  points: 720,
  memberId: "LOTUS-2406-087",
};

export const dummyOrders = [
  {
    id: "dummy-1",
    outlet: "el Lotus MERR Surabaya",
    date: "24 Apr 2026",
    time: "16:54",
    status: "Sudah Diproses",
    items: ["Latte Lalu (Ice, Regular)", "Signature Blend, Normal Sugar"],
    total: 28000,
    active: false,
    image: products[4].image,
  },
  {
    id: "dummy-2",
    outlet: "el Lotus Kertajaya",
    date: "20 Apr 2026",
    time: "12:30",
    status: "Selesai",
    items: ["Americano (Ice, Regular)", "Robusta Beans, No Sugar"],
    total: 20000,
    active: false,
    image: products[5].image,
  },
  {
    id: "dummy-3",
    outlet: "el Lotus Keputih",
    date: "16 Apr 2026",
    time: "10:34",
    status: "Selesai",
    items: ["Cappuccino (Ice, Large)", "Oat Milk"],
    total: 30000,
    active: false,
    image: products[1].image,
  },
  {
    id: "dummy-4",
    outlet: "el Lotus Perumdos ITS",
    date: "24 Apr 2026",
    time: "19:34",
    status: "Selesai",
    items: ["Vanilla Milkshake (Ice, Large)", "Normal Sugar"],
    total: 20000,
    active: false,
    image: products[3].image,
  },
];

export const defaultDetail = (productId = "hot-matcha") => ({
  size: "Reguler",
  sweetness: "70%",
  ice: productId.startsWith("hot") ? "30%" : "70%",
  topping: "Tanpa Topping",
  quantity: 1,
  note: "",
});
