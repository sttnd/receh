import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class SimpanAnggaranDto {
  @Type(() => Number)
  @IsInt({ message: 'Uang bulanan harus berupa bilangan bulat.' })
  @Min(1, { message: 'Uang bulanan minimal Rp1.' })
  totalBulanan: number;

  @Type(() => Number)
  @IsInt({ message: 'Alokasi Pokok harus berupa bilangan bulat.' })
  @Min(0, { message: 'Alokasi Pokok tidak boleh negatif.' })
  pokok: number;

  @Type(() => Number)
  @IsInt({ message: 'Alokasi Nabung harus berupa bilangan bulat.' })
  @Min(0, { message: 'Alokasi Nabung tidak boleh negatif.' })
  nabung: number;

  @Type(() => Number)
  @IsInt({ message: 'Alokasi Belanja harus berupa bilangan bulat.' })
  @Min(0, { message: 'Alokasi Belanja tidak boleh negatif.' })
  belanja: number;
}
