# el Lotus IMK Web App

Aplikasi web berbasis React + Vite untuk prototype pemesanan cafe el Lotus.

## How to Run

Pastikan Node.js dan npm sudah terinstall.

Install dependency:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Buka URL yang muncul di terminal, biasanya:

```txt
http://localhost:5173/
```

Development server dikunci ke port `5173`. Jika port tersebut sedang dipakai, matikan proses yang memakai port `5173` terlebih dahulu lalu jalankan ulang `npm run dev`.

## Deploy Netlify

Build command:

```bash
npm run build
```

Publish directory:

```txt
dist
```

Konfigurasi ini juga sudah ditulis di `netlify.toml`, jadi Netlify dapat membaca command dan publish directory secara otomatis.

## Build

Untuk membuat production build:

```bash
npm run build
```

Untuk mengecek build project:

```bash
npm run check
```

Untuk preview hasil build:

```bash
npm run preview
```
