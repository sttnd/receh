import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnggaranModule } from './anggaran/anggaran.module';
import { PengeluaranModule } from './pengeluaran/pengeluaran.module';

@Module({
  imports: [PengeluaranModule, AnggaranModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
