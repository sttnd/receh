import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePengeluaranDto } from './dto/create-pengeluaran.dto';
import { UpdatePengeluaranDto } from './dto/update-pengeluaran.dto';
import { Pengeluaran } from './entities/pengeluaran.entity';

@Injectable()
export class PengeluaranService {
  // Penyimpanan sementara di memori sesuai ketentuan tugas.
  private readonly data: Pengeluaran[] = [
    {
      id: 1,
      keterangan: 'Makan siang di warteg',
      kategori: 'Makanan',
      nominal: 15000,
      tanggal: '2026-10-20',
      createdAt: new Date('2026-10-20T08:00:00.000Z'),
    },
    {
      id: 2,
      keterangan: 'Bensin motor',
      kategori: 'Transportasi',
      nominal: 25000,
      tanggal: '2026-10-21',
      createdAt: new Date('2026-10-21T08:00:00.000Z'),
    },
    {
      id: 3,
      keterangan: 'Fotokopi modul praktikum',
      kategori: 'Pendidikan',
      nominal: 12000,
      tanggal: '2026-10-22',
      createdAt: new Date('2026-10-22T08:00:00.000Z'),
    },
    {
      id: 4,
      keterangan: 'Paket data bulanan',
      kategori: 'Lainnya',
      nominal: 55000,
      tanggal: '2026-10-23',
      createdAt: new Date('2026-10-23T08:00:00.000Z'),
    },
    {
      id: 5,
      keterangan: 'Nonton bareng teman',
      kategori: 'Hiburan',
      nominal: 40000,
      tanggal: '2026-10-24',
      createdAt: new Date('2026-10-24T08:00:00.000Z'),
    },
  ];

  private nextId = 6;

  findAll(): Pengeluaran[] {
    return [...this.data].sort((a, b) => {
      return b.tanggal.localeCompare(a.tanggal) || b.id - a.id;
    });
  }

  findOne(id: number): Pengeluaran {
    const pengeluaran = this.data.find((item) => item.id === id);

    if (!pengeluaran) {
      throw new NotFoundException(`Pengeluaran dengan ID ${id} tidak ditemukan.`);
    }

    return pengeluaran;
  }

  create(dto: CreatePengeluaranDto): Pengeluaran {
    this.ensureNotDuplicate(dto);

    const pengeluaran: Pengeluaran = {
      id: this.nextId++,
      ...dto,
      createdAt: new Date(),
    };

    this.data.push(pengeluaran);
    return pengeluaran;
  }

  update(id: number, dto: UpdatePengeluaranDto): Pengeluaran {
    const index = this.data.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Pengeluaran dengan ID ${id} tidak ditemukan.`);
    }

    const updatedData = {
      ...this.data[index],
      ...dto,
    };

    this.ensureNotDuplicate(updatedData, id);
    this.data[index] = updatedData;

    return updatedData;
  }

  remove(id: number): Pengeluaran {
    const index = this.data.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Pengeluaran dengan ID ${id} tidak ditemukan.`);
    }

    const [deleted] = this.data.splice(index, 1);
    return deleted;
  }

  private ensureNotDuplicate(
    candidate: Partial<Pengeluaran>,
    excludedId?: number,
  ): void {
    const isDuplicate = this.data.some(
      (item) =>
        item.id !== excludedId &&
        item.keterangan.trim().toLowerCase() ===
          candidate.keterangan?.trim().toLowerCase() &&
        item.kategori === candidate.kategori &&
        item.nominal === candidate.nominal &&
        item.tanggal === candidate.tanggal,
    );

    if (isDuplicate) {
      throw new ConflictException(
        'Transaksi dengan keterangan, kategori, nominal, dan tanggal yang sama sudah ada.',
      );
    }
  }
}
