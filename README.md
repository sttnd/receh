# Receh

Aplikasi pencatat pengeluaran harian yang dibangun menggunakan React 19 + Vite sebagai frontend dan NestJS sebagai backend. Aplikasi membantu pengguna mencatat, melihat, mengubah, dan menghapus transaksi pengeluaran.

## Struktur Repository

```text
pencatat-pengeluaran/
├── pencatat-pengeluaran-frontend/   # React + Vite
├── pencatat-pengeluaran-backend/    # NestJS REST API
│   ├── src/
│   │   ├── pengeluaran/
│   │   │   ├── dto/
│   │   │   ├── entities/
│   │   │   ├── pengeluaran.controller.ts
│   │   │   ├── pengeluaran.service.ts
│   │   │   └── pengeluaran.module.ts
│   │   ├── app..controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   └── main.ts
│   └── rest-client/
│       └── pengeluaran.http
└── docs/
    └── screenshots/
```

## Teknologi

- React 19 dan Vite
- NestJS 11
- TypeScript
- class-validator dan class-transformer
- REST Client untuk pengujian API

## Data Utama

Data utama aplikasi adalah **Pengeluaran**. Setiap transaksi memiliki enam properti:

| Field | Tipe data | Keterangan |
|---|---|---|
| `id` | number | ID unik transaksi |
| `keterangan` | string | Deskripsi pengeluaran |
| `kategori` | string | Kategori pengeluaran |
| `nominal` | number | Jumlah uang yang dikeluarkan |
| `tanggal` | string | Tanggal transaksi dengan format YYYY-MM-DD |
| `createdAt` | Date | Waktu data dibuat |

Kategori yang tersedia adalah Makanan, Transportasi, Pendidikan, Hiburan, dan Lainnya.