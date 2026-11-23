import { Module } from '@nestjs/common';
import { PengeluaranController } from './pengeluaran.controller';
import { PengeluaranService } from './pengeluaran.service';

@Module({
  controllers: [PengeluaranController],
  providers: [PengeluaranService],
  exports: [PengeluaranService],
})
export class PengeluaranModule {}
