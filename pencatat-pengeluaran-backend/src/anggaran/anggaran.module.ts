import { Module } from '@nestjs/common';
import { AnggaranController } from './anggaran.controller';
import { AnggaranService } from './anggaran.service';

@Module({
  controllers: [AnggaranController],
  providers: [AnggaranService],
})
export class AnggaranModule {}
