import { BadRequestException } from '@nestjs/common';
import { AnggaranService } from './anggaran.service';

describe('AnggaranService', () => {
  let service: AnggaranService;

  beforeEach(() => {
    service = new AnggaranService();
  });

  it('menyimpan dan mengambil anggaran bulanan', () => {
    const saved = service.save('2026-11', {
      totalBulanan: 5000000,
      pokok: 3000000,
      nabung: 1250000,
      belanja: 750000,
    });

    expect(saved.bulan).toBe('2026-11');
    expect(service.findOne('2026-11')?.totalBulanan).toBe(5000000);
  });

  it('memperbarui anggaran pada bulan yang sama', () => {
    service.save('2026-11', {
      totalBulanan: 5000000,
      pokok: 3000000,
      nabung: 1250000,
      belanja: 750000,
    });

    service.save('2026-11', {
      totalBulanan: 4000000,
      pokok: 2400000,
      nabung: 1000000,
      belanja: 600000,
    });

    expect(service.findOne('2026-11')?.totalBulanan).toBe(4000000);
  });

  it('menolak alokasi yang tidak sama dengan uang bulanan', () => {
    expect(() => service.save('2026-11', {
      totalBulanan: 5000000,
      pokok: 3000000,
      nabung: 1000000,
      belanja: 500000,
    })).toThrow(BadRequestException);
  });

  it('menolak format bulan yang tidak valid', () => {
    expect(() => service.findOne('November-2026')).toThrow(BadRequestException);
  });
});
