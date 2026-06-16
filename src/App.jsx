import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BottomNav } from "./components/BottomNav.jsx";
import { FeatureModal } from "./components/FeatureModal.jsx";
import { Toast } from "./components/Toast.jsx";
import {
  assets,
  defaultDetail,
  deliveryAddresses,
  outlets,
  products,
  promos,
  sizes,
  toppings,
} from "./data/catalog.js";
import { ActivityScreen } from "./screens/ActivityScreen.jsx";
import { CheckoutScreen } from "./screens/CheckoutScreen.jsx";
import { DetailScreen } from "./screens/DetailScreen.jsx";
import { HomeScreen } from "./screens/HomeScreen.jsx";
import { LoadingScreen } from "./screens/LoadingScreen.jsx";
import { OrderScreen } from "./screens/OrderScreen.jsx";
import { PaymentScreen } from "./screens/PaymentScreen.jsx";
import { ProfileScreen } from "./screens/ProfileScreen.jsx";
import { QrisScreen } from "./screens/QrisScreen.jsx";
import { SuccessScreen } from "./screens/SuccessScreen.jsx";
import { extraFor, formatOrderDate, rupiah, shortOutlet } from "./utils/format.js";
import { readJson, readString, STORAGE_KEYS } from "./utils/storage.js";

export default function App() {
  const toastTimer = useRef(null);

  const [screen, setScreen] = useState("loading");
  const [selectedOutlet, setSelectedOutlet] = useState(() => {
    const savedOutlet = readString(STORAGE_KEYS.outlet);
    return outlets.includes(savedOutlet) ? savedOutlet : outlets[0];
  });
  const [selectedAddressId, setSelectedAddressId] = useState(() => {
    const savedAddress = readString(STORAGE_KEYS.address);
    return deliveryAddresses.some((address) => address.id === savedAddress) ? savedAddress : deliveryAddresses[0].id;
  });
  const [selectedPromo, setSelectedPromo] = useState(() => {
    const savedPromo = readString(STORAGE_KEYS.promo);
    return promos.some((promo) => promo.id === savedPromo) ? savedPromo : "";
  });
  const [outletOpen, setOutletOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("hot-matcha");
  const [detail, setDetail] = useState(defaultDetail());
  const [cart, setCart] = useState(() => {
    const saved = readJson(STORAGE_KEYS.cart, []);
    return Array.isArray(saved) ? saved : [];
  });
  const [orders, setOrders] = useState(() => {
    const saved = readJson(STORAGE_KEYS.orders, []);
    return Array.isArray(saved) ? saved : [];
  });
  const [selectedPayment, setSelectedPayment] = useState("qris");
  const [activityTab, setActivityTab] = useState("active");
  const [qrisSeconds, setQrisSeconds] = useState(30 * 60);
  const [toast, setToast] = useState("");
  const [modal, setModal] = useState(null);

  const product = useMemo(
    () => products.find((item) => item.id === selectedProductId) || products[0],
    [selectedProductId],
  );

  const selectedAddress = useMemo(
    () => deliveryAddresses.find((address) => address.id === selectedAddressId) || deliveryAddresses[0],
    [selectedAddressId],
  );

  const activePromo = useMemo(
    () => promos.find((promo) => promo.id === selectedPromo) || null,
    [selectedPromo],
  );

  const detailUnitPrice = useMemo(
    () => product.price + extraFor(sizes, detail.size) + extraFor(toppings, detail.topping),
    [detail.size, detail.topping, product],
  );

  const detailSubtotal = detailUnitPrice * detail.quantity;
  const cartSubtotal = cart.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  const deliveryFee = cart.length ? 10000 : 0;
  const serviceFee = cart.length ? 2000 : 0;
  const promoDiscount = cart.length && activePromo ? Math.min(activePromo.amount, cartSubtotal + deliveryFee + serviceFee) : 0;
  const cartTotal = Math.max(0, cartSubtotal + deliveryFee + serviceFee - promoDiscount);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const pushToast = useCallback((message) => {
    window.clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = window.setTimeout(() => setToast(""), 1800);
  }, []);

  const closeModal = useCallback(() => setModal(null), []);

  const openModal = useCallback((type, payload = {}) => {
    setOutletOpen(false);
    setModal({ type, ...payload });
  }, []);

  const goTo = useCallback((target) => {
    setOutletOpen(false);
    setScreen(target);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setScreen((current) => (current === "loading" ? "home" : current));
    }, 1700);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.outlet, selectedOutlet);
  }, [selectedOutlet]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.address, selectedAddressId);
  }, [selectedAddressId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.promo, selectedPromo);
  }, [selectedPromo]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (screen !== "qris") return undefined;

    const timer = window.setInterval(() => {
      setQrisSeconds((seconds) => {
        if (seconds <= 1) {
          window.clearInterval(timer);
          setScreen("payment");
          pushToast("QRIS sudah kedaluwarsa. Buat kode baru dari halaman pembayaran.");
          return 0;
        }

        return seconds - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [pushToast, screen]);

  useEffect(() => {
    if (screen !== "success") return undefined;

    const timer = window.setTimeout(() => {
      setActivityTab("active");
      setScreen("activity");
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [screen]);

  const selectOutlet = (outlet) => {
    setSelectedOutlet(outlet);
    setOutletOpen(false);
    pushToast(`Outlet dipilih: ${shortOutlet(outlet)}`);
  };

  const selectAddress = (addressId) => {
    const address = deliveryAddresses.find((item) => item.id === addressId) || deliveryAddresses[0];
    setSelectedAddressId(address.id);
    closeModal();
    pushToast(`Alamat dipilih: ${address.label}`);
  };

  const applyPromo = (promoId) => {
    const promo = promos.find((item) => item.id === promoId);
    if (!promo) return;

    setSelectedPromo(promo.id);
    closeModal();
    pushToast(`${promo.label} aktif.`);
  };

  const clearPromo = () => {
    setSelectedPromo("");
    closeModal();
    pushToast("Promo aktif dihapus.");
  };

  const openProductDetail = (productId) => {
    setSelectedProductId(productId);
    setDetail(defaultDetail(productId));
    goTo("detail");
  };

  const handleQuickAction = (target) => {
    if (target === "promo") {
      openModal("promos");
      return;
    }

    if (target === "locations") {
      openModal("locations");
      return;
    }

    if (target === "checkout" && !cart.length) {
      pushToast("Cart masih kosong. Pilih minuman dulu ya.");
      goTo("order");
      return;
    }

    goTo(target);
  };

  const addCurrentProductToCart = () => {
    const item = {
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      image: product.image,
      outlet: selectedOutlet,
      unitPrice: detailUnitPrice,
      quantity: detail.quantity,
      options: {
        size: detail.size,
        sweetness: detail.sweetness,
        ice: detail.ice,
        topping: detail.topping,
        note: detail.note.trim(),
      },
    };

    setCart((current) => [...current, item]);
    goTo("checkout");
    pushToast("Produk ditambahkan ke cart.");
  };

  const updateCartQuantity = (itemId, delta) => {
    setCart((current) =>
      current
        .map((item) => (item.id === itemId ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0),
    );
  };

  const payNow = () => {
    if (!cart.length) {
      pushToast("Cart masih kosong. Tambahkan menu dulu.");
      goTo("order");
      return;
    }

    if (!selectedPayment) {
      pushToast("Pilih metode pembayaran dulu.");
      return;
    }

    if (selectedPayment === "qris") {
      setQrisSeconds(30 * 60);
      goTo("qris");
      return;
    }

    completePayment();
  };

  const completePayment = () => {
    if (!cart.length) {
      goTo("activity");
      return;
    }

    const { date, time } = formatOrderDate(new Date());
    const order = {
      id: `order-${Date.now()}`,
      outlet: selectedOutlet,
      address: selectedAddress.label,
      date,
      time,
      status: "Sudah Diproses",
      items: cart.flatMap((item) => [
        `${item.name} (${item.options.ice}, ${item.options.size}) x${item.quantity}`,
        `${item.options.topping}, ${item.options.sweetness} sugar`,
      ]),
      subtotal: cartSubtotal,
      deliveryFee,
      serviceFee,
      promoLabel: activePromo?.label || "",
      promoDiscount,
      total: cartTotal,
      payment: selectedPayment,
      active: true,
      image: cart[0]?.image || products[0].image,
    };

    setOrders((current) => [order, ...current]);
    setCart([]);
    setSelectedPromo("");
    goTo("success");
  };

  const downloadQris = () => {
    const link = document.createElement("a");
    link.href = assets.qris;
    link.download = "el-lotus-qris.png";
    document.body.appendChild(link);
    link.click();
    link.remove();
    pushToast("QR code siap diunduh.");
  };

  const shareQris = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "QRIS el Lotus",
          text: `Total pembayaran el Lotus: ${rupiah(cartTotal)}`,
          url: window.location.href,
        });
        return;
      } catch (error) {
        if (error.name === "AbortError") return;
      }
    }

    pushToast("Link QRIS demo berhasil disiapkan untuk dibagikan.");
  };

  const completeOrderFromActivity = (orderId) => {
    setOrders((current) =>
      current.map((order) =>
        order.id === orderId
          ? { ...order, active: false, status: "Selesai" }
          : order,
      ),
    );
    setActivityTab("history");
    pushToast("Pesanan selesai dan masuk ke Riwayat.");
  };

  const logoutDemo = () => {
    setCart([]);
    setSelectedPromo("");
    closeModal();
    goTo("home");
    pushToast("Mode demo disegarkan.");
  };

  const chrome = (children, hideNav = false) => (
    <>
      {children}
      {!hideNav && <BottomNav screen={screen} cartCount={cartCount} goTo={goTo} />}
      <FeatureModal
        modal={modal}
        onClose={closeModal}
        selectedOutlet={selectedOutlet}
        onSelectOutlet={selectOutlet}
        selectedAddressId={selectedAddressId}
        onSelectAddress={selectAddress}
        selectedPromo={selectedPromo}
        onApplyPromo={applyPromo}
        onClearPromo={clearPromo}
        goTo={goTo}
        onLogout={logoutDemo}
      />
      <Toast message={toast} />
    </>
  );

  if (screen === "loading") return <LoadingScreen />;

  if (screen === "home") {
    return chrome(
      <HomeScreen
        cartCount={cartCount}
        goTo={goTo}
        handleQuickAction={handleQuickAction}
        openProductDetail={openProductDetail}
        openModal={openModal}
      />,
    );
  }

  if (screen === "order") {
    return chrome(
      <OrderScreen
        selectedOutlet={selectedOutlet}
        outletOpen={outletOpen}
        setOutletOpen={setOutletOpen}
        selectOutlet={selectOutlet}
        openProductDetail={openProductDetail}
        cartCount={cartCount}
        cartTotal={cartTotal}
        goTo={goTo}
      />,
    );
  }

  if (screen === "detail") {
    return chrome(
      <DetailScreen
        product={product}
        detail={detail}
        setDetail={setDetail}
        detailSubtotal={detailSubtotal}
        addCurrentProductToCart={addCurrentProductToCart}
        goTo={goTo}
      />,
      true,
    );
  }

  if (screen === "checkout") {
    return chrome(
      <CheckoutScreen
        selectedOutlet={selectedOutlet}
        selectedAddress={selectedAddress}
        cart={cart}
        cartSubtotal={cartSubtotal}
        deliveryFee={deliveryFee}
        serviceFee={serviceFee}
        promoDiscount={promoDiscount}
        selectedPromoLabel={activePromo?.label || ""}
        cartTotal={cartTotal}
        updateCartQuantity={updateCartQuantity}
        goTo={goTo}
        openModal={openModal}
      />,
      true,
    );
  }

  if (screen === "payment") {
    return chrome(
      <PaymentScreen
        selectedPayment={selectedPayment}
        setSelectedPayment={setSelectedPayment}
        cartTotal={cartTotal}
        payNow={payNow}
        goTo={goTo}
      />,
      true,
    );
  }

  if (screen === "qris") {
    return chrome(
      <QrisScreen
        cartTotal={cartTotal}
        qrisSeconds={qrisSeconds}
        downloadQris={downloadQris}
        shareQris={shareQris}
        completePayment={completePayment}
        goTo={goTo}
      />,
      true,
    );
  }

  if (screen === "success") return <SuccessScreen />;

  if (screen === "activity") {
    return chrome(
      <ActivityScreen
        orders={orders}
        activityTab={activityTab}
        setActivityTab={setActivityTab}
        goTo={goTo}
        openModal={openModal}
        completeOrder={completeOrderFromActivity}
      />,
    );
  }

  return chrome(<ProfileScreen openModal={openModal} orders={orders} goTo={goTo} setActivityTab={setActivityTab} />);
}
