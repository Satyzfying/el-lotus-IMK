export const STORAGE_KEYS = {
  address: "elLotus.selectedAddress",
  cart: "elLotus.cart",
  outlet: "elLotus.selectedOutlet",
  orders: "elLotus.orders",
  promo: "elLotus.selectedPromo",
};

export const readJson = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const readString = (key, fallback = "") => localStorage.getItem(key) || fallback;
