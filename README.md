# Receh

Receh adalah aplikasi pengelolaan uang bulanan dan pencatatan pengeluaran. Aplikasi membantu pengguna membagi uang bulanan ke tiga pos, memantau penggunaan dana, dan mencatat transaksi harian. Memiliki fitur utama seperti dashboard bulanan, tiga pos anggaran, sistem anggaran berjenjang, CRUD transaksi, pencarian dan filter.

## Struktur Repository

```text
receh/
├── pencatat-pengeluaran-frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── services/
│       ├── utils/
│       ├── App.jsx
│       ├── App.css
│       └── index.css
├── pencatat-pengeluaran-backend/
│   ├── rest-client/
│   └── src/
│       ├── anggaran/
│       ├── pengeluaran/
│       ├── app.module.ts
│       └── main.ts
└── docs/
    └── screenshots/
```

## Teknologi

- Frontend: React 19 dan Vite
- Backend: NestJS 11 dan TypeScript
- Validasi: class-validator dan class-transformer
- API: REST API dengan JSON
- Pengujian API: REST Client untuk Visual Studio Code

## Struktur Data Transaksi

Data utama aplikasi adalah `Pengeluaran`.

| Field | Tipe | Keterangan |
|---|---|---|
| `id` | number | ID unik transaksi |
| `keterangan` | string | Deskripsi transaksi |
| `kategori` | string | Makanan, Transportasi, Pendidikan, Tagihan, Kesehatan, Hiburan, Belanja, atau Lainnya |
| `posAnggaran` | string | Pokok, Nabung, atau Belanja |
| `sumberDana` | string | Tunai, Rekening Bank, GoPay, DANA, OVO, ShopeePay, Kartu Debit, Kartu Kredit, atau Lainnya |
| `nominal` | number | Nominal pengeluaran |
| `tanggal` | string | Tanggal transaksi dengan format YYYY-MM-DD |
| `createdAt` | Date | Waktu data dibuat |

`posAnggaran` dan `sumberDana` memiliki fungsi berbeda. `posAnggaran` menentukan alokasi uang yang digunakan dalam sistem anggaran berjenjang. `sumberDana` mencatat media penyimpanan atau metode pembayaran transaksi.