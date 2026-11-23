export const KATEGORI_PENGELUARAN = [
  'Makanan',
  'Transportasi',
  'Pendidikan',
  'Tagihan',
  'Kesehatan',
  'Hiburan',
  'Belanja',
  'Lainnya',
] as const;

export type KategoriPengeluaran = (typeof KATEGORI_PENGELUARAN)[number];

export const POS_ANGGARAN = ['Pokok', 'Nabung', 'Belanja'] as const;
export type PosAnggaran = (typeof POS_ANGGARAN)[number];

export class Pengeluaran {
  id: number;
  keterangan: string;
  kategori: KategoriPengeluaran;
  posAnggaran: PosAnggaran;
  nominal: number;
  tanggal: string;
  createdAt: Date;
}
