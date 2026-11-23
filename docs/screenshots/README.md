### 1. Menyiapkan resource NestJS

Folder resource `pengeluaran` sudah disiapkan dengan susunan file NestJS untuk Controller, Service, Module, Entity, dan DTO. Perintah Nest CLI untuk membuat resource pada project NestJS baru adalah:

```bash
npx nest g resource pengeluaran
```

Pilih REST API pada pertanyaan generator. Karena folder resource pada repository ini sudah berisi implementasi CRUD, DTO, dan controller, jangan jalankan generator tersebut kembali pada folder yang sama agar file yang sudah disesuaikan tidak tertimpa. Untuk mengambil screenshot demonstrasi generator tanpa mengubah file, gunakan:

```bash
npx nest g resource pengeluaran --dry-run
```

### 2. Menjalankan backend NestJS

Buka terminal pada folder backend:

```bash
cd pencatat-pengeluaran-backend
npm install
npm run start:dev
```

Backend berjalan pada:

```text
http://localhost:3000
```

Endpoint pemeriksaan:

```text
GET http://localhost:3000
```

### 3. Menjalankan frontend React

Buka terminal baru pada folder frontend:

```bash
cd pencatat-pengeluaran-frontend
npm install
```

Salin `.env.example` menjadi `.env` jika ingin mengatur alamat backend secara eksplisit. Isi variabelnya:

```env
VITE_API_URL=http://localhost:3000
```

Jalankan frontend:

```bash
npm run dev
```

Frontend berjalan pada:

```text
http://localhost:5173
```

Backend dan frontend harus berjalan bersamaan.

## REST API

Base URL: `http://localhost:3000`

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/pengeluaran` | Mengambil seluruh transaksi |
| GET | `/pengeluaran/:id` | Mengambil satu transaksi |
| POST | `/pengeluaran` | Menambahkan transaksi |
| PATCH | `/pengeluaran/:id` | Mengubah transaksi |
| DELETE | `/pengeluaran/:id` | Menghapus transaksi |

Contoh request POST:

```json
{
  "keterangan": "Makan siang",
  "kategori": "Makanan",
  "nominal": 15000,
  "tanggal": "2026-11-23"
}
```

## DTO dan Validasi

`CreatePengeluaranDto` menerapkan aturan berikut:

- `keterangan`: wajib berupa string, minimal 3 karakter, maksimal 100 karakter.
- `kategori`: wajib salah satu dari Makanan, Transportasi, Pendidikan, Hiburan, atau Lainnya.
- `nominal`: wajib berupa angka, minimal 1, maksimal 100.000.000.000, dan maksimal dua angka desimal.
- `tanggal`: wajib berupa tanggal valid dalam format ISO.

`UpdatePengeluaranDto` menggunakan `PartialType`, sehingga seluruh properti bersifat opsional. Aturan validasi tetap diterapkan pada properti yang dikirim.

Validasi diaktifkan secara global melalui `ValidationPipe` pada `main.ts` dengan `whitelist`, `forbidNonWhitelisted`, dan `transform`.

## Penanganan Error

| Exception | HTTP Status | Kondisi |
|---|---:|---|
| `NotFoundException` | 404 | ID pengeluaran tidak ditemukan |
| `ConflictException` | 409 | Transaksi dengan keterangan, kategori, nominal, dan tanggal yang sama sudah ada |
| `BadRequestException` dari ValidationPipe | 400 | Request tidak memenuhi aturan validasi DTO |

## Pengujian REST Client

1. Pasang ekstensi **REST Client** pada Visual Studio Code.
2. Jalankan backend NestJS.
3. Buka `pencatat-pengeluaran-backend/rest-client/pengeluaran.http`.
4. Klik **Send Request** di atas setiap request.
5. Periksa status HTTP dan response yang dihasilkan.
6. Jalankan request POST sebelum GET detail, PATCH, dan DELETE.
7. Sesuaikan nilai `@id` dengan ID yang dikembalikan oleh request POST.