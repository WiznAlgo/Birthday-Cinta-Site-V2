# Birthday Website Ulang Tahun Cinta

Website ulang tahun romantis interaktif berbasis **Next.js**, dirancang untuk dibuka scene demi scene, dengan 2 password gate, secret route, dan form balasan yang bisa tersimpan ke database jika `POSTGRES_URL` diisi.

## Stack

- Next.js App Router
- React
- Tailwind CSS
- Framer Motion
- PostgreSQL opsional via `@vercel/postgres`
- Deploy target: Vercel

## Struktur folder

```bash
birthday-cinta-site/
├── app/
│   ├── api/
│   │   ├── messages/
│   │   │   └── route.ts
│   │   └── unlock/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── animated-sky.tsx
│   ├── birthday-journey.tsx
│   ├── password-gate.tsx
│   ├── progress-bar.tsx
│   ├── response-form.tsx
│   ├── reveal-cards.tsx
│   ├── section-card.tsx
│   └── typewriter.tsx
├── data/
│   └── content.ts
├── lib/
│   ├── messages.ts
│   └── utils.ts
├── public/
├── .env.example
├── .gitignore
├── eslint.config.mjs
├── next-env.d.ts
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

## Jalankan lokal

```bash
npm install
cp .env.example .env.local
npm run dev
```

Lalu buka `http://localhost:3000`.

## Environment variable

Isi file `.env.local` seperti ini:

```env
PASSWORD_GATE_1=14022007
PASSWORD_GATE_2=25112006
NEXT_PUBLIC_WHATSAPP_NUMBER=6281234567890
NEXT_PUBLIC_WHATSAPP_TEXT=aku udah lihat website-nya 😆🌻
POSTGRES_URL=
```

## Catatan penting

- `POSTGRES_URL` **opsional**. Kalau belum diisi, form tetap bisa dipakai, tapi balasan tidak disimpan ke database dan user akan diarahkan ke WhatsApp fallback.
- Password gate dicek di server lewat `/api/unlock`.
- Folder `public/` dipakai untuk aset statis seperti gambar, icon, atau audio.

## Deploy ke Vercel

1. Push project ke GitHub.
2. Import repo ke Vercel.
3. Isi environment variable di Settings → Environment Variables.
4. Kalau mau menyimpan balasan ke database, sambungkan Postgres lalu isi `POSTGRES_URL`.
5. Redeploy.
