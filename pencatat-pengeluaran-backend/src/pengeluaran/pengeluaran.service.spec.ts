import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreatePengeluaranDto } from './dto/create-pengeluaran.dto';
import { PengeluaranService } from './pengeluaran.service';

describe('PengeluaranService', () => {
  let service: PengeluaranService;

  const transaksiBaru: CreatePengeluaranDto = {
    keterangan: 'Membeli buku catatan',
    kategori: 'Pendidikan',
    posAnggaran: 'Pokok',
    sumberDana: 'Tunai',
    nominal: 22000,
    tanggal: '2026-11-23',
  };

  beforeEach(() => {
    service = new PengeluaranService();
  });

  it('mengembalikan daftar transaksi awal', () => {
    expect(service.findAll()).toHaveLength(5);
  });

  it('menambahkan transaksi baru', () => {
    const result = service.create(transaksiBaru);

    expect(result.id).toBe(6);
    expect(result.keterangan).toBe(transaksiBaru.keterangan);
    expect(result.posAnggaran).toBe('Pokok');
  });

  it('menolak transaksi duplikat dengan ConflictException', () => {
    expect(() =>
      service.create({
        keterangan: 'Belanja kebutuhan dapur',
        kategori: 'Makanan',
        posAnggaran: 'Pokok',
        sumberDana: 'Tunai',
        nominal: 85000,
        tanggal: '2026-11-20',
      }),
    ).toThrow(ConflictException);
  });

  it('mengembalikan NotFoundException jika ID tidak tersedia', () => {
    expect(() => service.findOne(999999)).toThrow(NotFoundException);
  });

  it('mengubah transaksi berdasarkan ID', () => {
    const result = service.update(1, { nominal: 17000 });

    expect(result.nominal).toBe(17000);
    expect(result.id).toBe(1);
  });

  it('menghapus transaksi berdasarkan ID', () => {
    service.remove(1);

    expect(service.findAll()).toHaveLength(4);
    expect(() => service.findOne(1)).toThrow(NotFoundException);
  });
});
