import { BadRequestException, Injectable } from '@nestjs/common';
import { SimpanAnggaranDto } from './dto/simpan-anggaran.dto';
import { Anggaran } from './entities/anggaran.entity';

@Injectable()
export class AnggaranService {
  private readonly data: Anggaran[] = [];

  findOne(bulan: string): Anggaran | { bulan: string; configured: false } {
    this.validateMonth(bulan);
    return this.data.find((item) => item.bulan === bulan) ?? { bulan, configured: false };
  }

  save(bulan: string, dto: SimpanAnggaranDto): Anggaran {
    this.validateMonth(bulan);

    const totalAlokasi = dto.pokok + dto.nabung + dto.belanja;
    if (totalAlokasi !== dto.totalBulanan) {
      throw new BadRequestException(
        'Jumlah alokasi Pokok, Nabung, dan Belanja harus sama dengan uang bulanan.',
      );
    }

    const anggaran: Anggaran = {
      bulan,
      ...dto,
      updatedAt: new Date(),
    };

    const index = this.data.findIndex((item) => item.bulan === bulan);
    if (index === -1) {
      this.data.push(anggaran);
    } else {
      this.data[index] = anggaran;
    }

    return anggaran;
  }

  private validateMonth(bulan: string): void {
    if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(bulan)) {
      throw new BadRequestException('Format bulan harus YYYY-MM, contoh 2026-11.');
    }
  }
}
