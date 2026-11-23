export const KATEGORI_PENGELUARAN = [
  'Makanan',
  'Transportasi',
  'Pendidikan',
  'Hiburan',
  'Lainnya',
] as const;

export type KategoriPengeluaran = (typeof KATEGORI_PENGELUARAN)[number];

export class Pengeluaran {
  id: number;
  keterangan: string;
  kategori: KategoriPengeluaran;
  nominal: number;
  tanggal: string;
  createdAt: Date;
}
