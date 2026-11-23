import { Type } from 'class-transformer';
import {
  IsDateString,
  IsIn,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import {
  KATEGORI_PENGELUARAN,
  KategoriPengeluaran,
} from '../entities/pengeluaran.entity';

export class CreatePengeluaranDto {
  @IsString({ message: 'Keterangan harus berupa teks.' })
  @MinLength(3, { message: 'Keterangan minimal 3 karakter.' })
  @MaxLength(100, { message: 'Keterangan maksimal 100 karakter.' })
  keterangan: string;

  @IsIn([...KATEGORI_PENGELUARAN], {
    message: 'Kategori harus Makanan, Transportasi, Pendidikan, Hiburan, atau Lainnya.',
  })
  kategori: KategoriPengeluaran;

  @Type(() => Number)
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2 },
    { message: 'Nominal harus berupa angka yang valid.' },
  )
  @Min(1, { message: 'Nominal minimal Rp1.' })
  @Max(100000000000, { message: 'Nominal terlalu besar.' })
  nominal: number;

  @IsDateString(
    {},
    { message: 'Tanggal harus menggunakan format tanggal ISO, contoh 2026-11-23.' },
  )
  tanggal: string;
}
