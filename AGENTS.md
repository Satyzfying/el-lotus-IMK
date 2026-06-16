# AGENTS.md — el Lotus IMK Web App

## Project Context

This project is a final project for the Human-Computer Interaction / Interaksi Manusia dan Komputer course.

The goal is to convert the existing el Lotus UI/UX prototype into a functional web-based application. The brand and prototype are based on the uploaded PDF: `IMK el Lotus.pdf`, and the visual design files inside the `UI-UX Designs/` and `assets/` folders.

Reference document: `IMK el Lotus.pdf` :contentReference[oaicite:0]{index=0}

el Lotus is a café ordering application with a simple, calm, and Gen-Z friendly experience. The core brand tagline is:

> “a place to bloom, chill, and connect”

The website should feel like a mobile café ordering app, not a generic desktop website.

## Important Project Files

The current project structure includes:

```txt
EL-LOTUS-IMK/
├── assets/
│   ├── avatar.png
│   ├── checkout-product.png
│   ├── cup.png
│   ├── detail-hot-matcha.png
│   ├── home-hero.png
│   ├── hot-cappuccino.png
│   ├── hot-matcha.png
│   ├── ice-americano.png
│   ├── ice-cafe-latte.png
│   ├── ice-matcha-latte.png
│   ├── ice-pink-matcha.png
│   ├── logo-1.svg
│   ├── logo-2.svg
│   ├── logo.svg
│   ├── popular-cappucino.png
│   ├── popular-latte.png
│   ├── popular-matchalalu.png
│   ├── qris-code.png
│   ├── store-hero.png
│   └── storefront-wide.png
├── UI-UX Designs/
│   ├── aktivitas.png
│   ├── home page.png
│   ├── iPhone 17 - 1.png
│   ├── loading.png
│   ├── menu order 1.png
│   ├── menu order 2.png
│   ├── pembayaran.png
│   ├── profile.png
│   └── qriss.png
├── app.js
├── dev-server.js
├── index.html
├── package.json
└── styles.css
```

Use the provided assets and UI design images as the main visual reference. Do not replace them with unrelated external images.

## Main Goal

Build a polished single-page web application that implements the el Lotus prototype flow:

1. Loading screen
2. Home page
3. Menu / order page
4. Location outlet dropdown
5. Product detail page
6. Checkout / cart summary
7. Payment method page
8. QRIS payment page
9. Payment success screen
10. Activity / order history page
11. Profile page

The prototype explanation in the PDF describes the product as a calm, simple, Gen-Z friendly café ordering experience, with clear order flow, location selection, payment method selection, QRIS payment, activity tracking, and profile/account features.

## Tech Stack Rules

Use the existing project setup.

Preferred implementation:

- HTML
- CSS
- JavaScript
- No React, Vue, Svelte, Tailwind, Bootstrap, or other frameworks unless already installed in `package.json`
- Keep the project lightweight and easy to understand for an IMK final project
- Use modular JavaScript where possible, but keep it beginner-friendly

Do not over-engineer the project.

## Visual Design Direction

Follow the high-fidelity prototype closely.

### Brand Feel

The UI should feel:

- simple
- calm
- warm
- clean
- Gen-Z friendly
- café-oriented
- mobile-first

### Suggested Color Palette

Use colors close to the prototype:

```css
--cream: #fff8e8;
--soft-cream: #f8efd9;
--brown: #7b563d;
--dark-brown: #4b2f22;
--light-brown: #a8795f;
--text-dark: #1f1a17;
--muted-text: #76695f;
--border-soft: #e5d8c2;
--white: #ffffff;
```

### Layout Rules

- Mobile-first layout
- Main app width should imitate a phone screen
- Recommended wrapper:

```css
.app-shell {
  max-width: 430px;
  min-height: 100vh;
  margin: 0 auto;
  background: var(--cream);
}
```

- On desktop, center the mobile app preview
- Do not stretch the layout too wide
- Use rounded cards, soft borders, subtle shadows, and warm background tones
- Keep spacing consistent

## Required Pages / Screens

Because this is likely a single-page project, implement screens using JavaScript state and CSS classes instead of creating many separate HTML files.

Recommended screen system:

```js
showScreen("home");
showScreen("order");
showScreen("detail");
showScreen("checkout");
showScreen("payment");
showScreen("qris");
showScreen("success");
showScreen("activity");
showScreen("profile");
```

Only one main screen should be visible at a time.

---

## 1. Loading Screen

Create a loading screen based on the prototype.

Requirements:

- Show el Lotus logo
- Show brand name: `el Lotus`
- Show tagline: `a place to bloom, chill, and connect`
- Background should use calm cream or brown color
- Automatically transition to home page after around 1.5–2 seconds
- Add a simple fade animation

Do not make the loading screen too crowded.

---

## 2. Home Page

The home page should include:

- Header with logo / brand name
- Greeting text, for example:

```txt
hey, good to see you!
ready for bloom, coffee and good vibes?
```

- Notification icon or small profile/avatar icon
- Hero banner using `home-hero.png` or `storefront-wide.png`
- Main tagline banner:

```txt
“a place to bloom, chill, and connect”
```

- Quick action cards:
  - Order
  - Cart
  - Promos
  - Find Us
- Popular picks section
- Popular product cards using available product assets
- Bottom navigation

Popular product examples:

```js
[
  {
    name: "Matcha Lalu",
    price: 50000,
    image: "assets/popular-matchalalu.png"
  },
  {
    name: "Ice Cappuccino",
    price: 35000,
    image: "assets/popular-cappucino.png"
  },
  {
    name: "Ice Matcha Latte",
    price: 35000,
    image: "assets/popular-latte.png"
  }
]
```

Clicking a product card should open the product detail page.

---

## 3. Bottom Navigation

Create a fixed bottom navigation similar to the prototype.

Navigation items:

- Beranda
- Pesan
- Aktivitas
- Profil

Behavior:

- Beranda opens home page
- Pesan opens order/menu page
- Aktivitas opens activity page
- Profil opens profile page
- Active nav item should be visually highlighted
- Keep the nav visible on main app screens
- Hide or simplify it on loading, QRIS, and success screens if needed

---

## 4. Order / Menu Page

The order page should include:

- Location dropdown at the top
- Store hero image using `store-hero.png`
- Section title:

```txt
Menu el Lotus
```

- Product grid with two columns
- Product cards with image, name, price, and `Tambahkan` button

Location options:

```js
[
  "el Lotus MERR Surabaya",
  "el Lotus Kertajaya",
  "el Lotus Keputih",
  "el Lotus Perumdos ITS"
]
```

Menu products:

```js
[
  {
    id: "hot-matcha",
    name: "Hot Matcha",
    price: 24000,
    image: "assets/hot-matcha.png",
    description: "Matcha khas el Lotus dengan perpaduan aroma matcha dan tekstur lembut."
  },
  {
    id: "hot-cappuccino",
    name: "Hot Cappuccino",
    price: 24000,
    image: "assets/hot-cappuccino.png"
  },
  {
    id: "ice-cafe-latte",
    name: "Ice Cafe Latte",
    price: 26000,
    image: "assets/ice-cafe-latte.png"
  },
  {
    id: "ice-pink-matcha",
    name: "Ice Pink Matcha",
    price: 28000,
    image: "assets/ice-pink-matcha.png"
  },
  {
    id: "ice-matcha-latte",
    name: "Ice Matcha Latte",
    price: 30000,
    image: "assets/ice-matcha-latte.png"
  },
  {
    id: "ice-americano",
    name: "Ice Americano",
    price: 22000,
    image: "assets/ice-americano.png"
  }
]
```

Behavior:

- Dropdown should expand/collapse properly
- Selected outlet should update the displayed outlet name
- Product card click opens product detail
- `Tambahkan` can either add directly to cart or open product detail first
- Prefer opening detail first because the prototype includes customization

---

## 5. Product Detail Page

The detail page should include:

- Back button
- Product image, preferably `detail-hot-matcha.png` for Hot Matcha
- Product name
- Product price
- Short description
- Customization sections:
  - Ukuran
  - Tingkat Kemanisan
  - Tingkat Ice
  - Topping
- Quantity selector
- Add-to-cart button

Customization options:

```js
sizes = [
  { label: "Reguler", extra: 0 },
  { label: "Large", extra: 2000 }
];

sweetness = ["30%", "70%", "100%"];
ice = ["30%", "70%", "100%"];

toppings = [
  { label: "Grass Jelly", extra: 4000 },
  { label: "Boba", extra: 4000 },
  { label: "Cheese Cream", extra: 5000 }
];
```

Behavior:

- Selected option should be highlighted
- Price should update based on selected size, topping, and quantity
- Add-to-cart should save item into cart state
- After adding item, go to checkout page or show cart confirmation

---

## 6. Checkout Page

Create a checkout summary screen based on the existing prototype asset `checkout-product.png`.

The checkout page should include:

- Selected outlet
- Order type, for example `Delivery`
- Cart items
- Product image
- Product name
- Selected customization
- Quantity
- Subtotal
- Delivery fee or service fee
- Total payment
- Button:

```txt
Lanjut Pembayaran
```

Behavior:

- User can increase/decrease quantity
- Total updates dynamically
- If cart is empty, show friendly empty cart message
- Clicking `Lanjut Pembayaran` opens payment method page

---

## 7. Payment Method Page

The payment method page should follow the PDF/prototype description.

It should include:

- Header title:

```txt
Pilih Metode Pembayaran
```

- E-Wallet options:
  - GoPay
  - OVO
  - DANA
  - LinkAja
  - ShopeePay
- Virtual Account:
  - BCA
  - Mandiri
  - BNI
  - Bank BRI
- Kartu Pembayaran:
  - Credit/Kartu Debit
- Metode Lainnya:
  - QRIS
- Total payment
- Button:

```txt
Bayar Sekarang
```

Behavior:

- Payment option cards should be selectable
- Selected option should be highlighted
- If user selects QRIS, clicking `Bayar Sekarang` opens QRIS payment page
- For other methods, clicking `Bayar Sekarang` may go directly to success page, but QRIS should be fully implemented because the prototype includes it

---

## 8. QRIS Payment Page

The QRIS page should include:

- Header title:

```txt
QRIS
```

- Text:

```txt
Scan atau unduh QR code
```

- QR image using `assets/qris-code.png`
- Countdown timer, starting from `00:30:00`
- Total payment
- Button:

```txt
Unduh QR code
```

- Button:

```txt
Bagikan QR Code
```

- Button or simulation action:

```txt
Selesaikan Pembayaran
```

Behavior:

- Timer should count down every second
- `Unduh QR code` can trigger fake success toast or download the QR image
- `Bagikan QR Code` can use Web Share API if available, otherwise show alert
- `Selesaikan Pembayaran` should simulate successful payment and go to success screen

---

## 9. Payment Success Screen

The success screen should match the prototype:

- Brown background
- Large check icon
- Text:

```txt
Pembayaran Berhasil
```

Behavior:

- After 1.5–2 seconds, redirect to activity page
- Add the completed order into activity/order history state
- Clear the cart after successful payment

---

## 10. Activity Page

The activity page should include:

- Header with logo/name
- Title:

```txt
Aktivitas
```

- Tabs:
  - Aktif
  - Riwayat
- Order cards

Each order card should show:

- Outlet name
- Order date/time
- Product list
- Status, for example:
  - Sudah Diproses
  - Selesai
- Total
- Button:

```txt
Lihat Detail
```

Use dummy order history if there are no real orders yet.

Example dummy data:

```js
[
  {
    outlet: "el Lotus MERR Surabaya",
    status: "Sudah Diproses",
    items: ["Latte Lalu (Ice, Regular)", "Signature Blend"],
    total: 28000
  },
  {
    outlet: "el Lotus Kertajaya",
    status: "Selesai",
    items: ["Robusta Beans", "No Sugar"],
    total: 20000
  }
]
```

---

## 11. Profile Page

The profile page should include:

- Header image using `storefront-wide.png`
- Avatar using `avatar.png`
- User name, for example:

```txt
Minji Sastro
```

- User email and phone placeholder
- Buttons:
  - Lihat Profil
  - QR Code
- Loyalty / personal score section
- My Orders progress:
  - Placed
  - Preparing
  - On the way
  - Delivered
- Payment section:
  - Metode Pembayaran
  - Promos & Vouchers
  - Alamat Tersimpan
- More section:
  - Pusat Bantuan
  - Kebijakan Privasi
  - Ketentuan Layanan
- Logout button

This page does not need real authentication. Use dummy user data.

---

## State Management

Use simple JavaScript state.

Example structure:

```js
const state = {
  currentScreen: "loading",
  selectedOutlet: "el Lotus MERR Surabaya",
  selectedProduct: null,
  cart: [],
  selectedPayment: null,
  orders: []
};
```

Use `localStorage` to persist:

- cart
- selected outlet
- order history

Do not use a real backend.

---

## Interaction Requirements

The web app should feel interactive, not just static HTML.

Required interactions:

- Loading screen transition
- Navigation between screens
- Outlet dropdown
- Product detail selection
- Quantity increment/decrement
- Add to cart
- Checkout total calculation
- Payment method selection
- QRIS timer
- Payment success simulation
- Activity history update after successful payment

Optional but recommended:

- Toast notifications
- Small button animations
- Smooth page transitions
- Empty cart state
- Form-like selected states

---

## Code Quality Rules

Write clean, readable code.

### HTML

- Use semantic structure where possible
- Keep `index.html` readable
- Prefer rendering dynamic content from JavaScript when needed

### CSS

- Use CSS variables
- Organize styles by section
- Avoid unnecessary complex animations
- Use responsive layout
- Maintain visual consistency with the prototype

### JavaScript

- Keep functions small and clear
- Use meaningful names
- Avoid duplicated rendering logic
- Comment only important parts
- Do not write minified or unreadable code

Recommended function names:

```js
initApp()
showScreen(screenName)
renderHome()
renderOrderPage()
renderProductDetail(productId)
renderCheckout()
renderPaymentPage()
renderQrisPage()
renderSuccessPage()
renderActivityPage()
renderProfilePage()
addToCart(product, options)
updateCartTotal()
saveState()
loadState()
```

---

## Accessibility Requirements

Add basic accessibility improvements:

- Use readable font sizes
- Maintain sufficient contrast
- Buttons should be keyboard-focusable
- Images should have meaningful `alt` text
- Avoid text that is too small
- Do not rely only on color to show selected states

---

## Responsive Requirements

Primary target is mobile layout.

Desktop behavior:

- Center the app
- Keep max width around 390–430px
- Add neutral page background outside the app shell
- Do not stretch cards across the entire desktop screen

---

## Development Command

Check `package.json` first.

If the project already has scripts, use them.

If no script exists, add a simple dev command only if needed.

Possible command:

```bash
npm install
npm run dev
```

or if using the existing `dev-server.js`:

```bash
node dev-server.js
```

Do not introduce unnecessary build tools.

---

## Implementation Priority

Follow this order:

1. Review `IMK el Lotus.pdf`
2. Review all files inside `UI-UX Designs/`
3. Review all files inside `assets/`
4. Understand current `index.html`, `styles.css`, and `app.js`
5. Create the app shell and loading screen
6. Implement navigation and screen switching
7. Implement home page
8. Implement order/menu page
9. Implement product detail and cart logic
10. Implement checkout page
11. Implement payment method page
12. Implement QRIS page
13. Implement success screen
14. Implement activity page
15. Implement profile page
16. Polish responsiveness, spacing, colors, and interactions
17. Test the full user flow from opening app to payment success

---

## Acceptance Criteria

The project is considered complete if:

- The app visually resembles the high-fidelity el Lotus prototype
- The app is mobile-first and centered on desktop
- Users can move through this flow:

```txt
Loading → Home → Order → Product Detail → Checkout → Payment → QRIS → Success → Activity
```

- Bottom navigation works
- Product cards use real assets from the `assets/` folder
- Outlet dropdown works
- Product options can be selected
- Cart total updates correctly
- Payment method can be selected
- QRIS screen uses the QR image
- Payment success screen appears
- Activity page shows the completed order
- Profile page is implemented
- No broken image paths
- No JavaScript console errors
- The code remains understandable for a student project

---

## Important Notes

Do not create a full e-commerce system with backend, login, database, or real payment integration.

This is an IMK final project, so the main focus is:

- usability
- interaction flow
- visual consistency
- prototype accuracy
- smooth user experience

Prioritize making the application feel close to the prototype rather than adding unnecessary technical complexity.