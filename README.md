# Portofolio — React + Vite

Template portofolio bergaya clean dan modern (font Poppins, aksen biru): ringan, tanpa library tambahan selain React.

## Mulai

```bash
npm install
npm run dev
```

Buka http://localhost:5173

## Ubah isi

Semua teks, proyek, pengalaman, keahlian, dan tautan ada di satu file: `src/data.js`.

## Ubah warna & font

Buka `src/styles.css`, edit variabel di bagian `:root` (terang) dan `:root[data-theme="dark"]` (gelap).
Warna aksen ada di `--accent`. Font diganti lewat tag `<link>` di `index.html` dan variabel `--font`.

## Build & deploy

```bash
npm run build
```

Hasilnya di folder `dist/` — upload ke Vercel, Netlify, Cloudflare Pages, atau GitHub Pages.

## Catatan performa

- Tanpa library UI / animasi: bundle JS hanya React + kode kecil.
- Animasi memakai CSS + IntersectionObserver, dan menghormati `prefers-reduced-motion`.
- Tema terang/gelap diterapkan sebelum render, jadi tidak berkedip.
