import { PartialType } from '@nestjs/mapped-types';
import { CreatePengeluaranDto } from './create-pengeluaran.dto';

// Semua properti menjadi opsional, tetapi aturan validasi Create tetap berlaku
// untuk setiap properti yang dikirim pada request PATCH.
export class UpdatePengeluaranDto extends PartialType(CreatePengeluaranDto) {}
