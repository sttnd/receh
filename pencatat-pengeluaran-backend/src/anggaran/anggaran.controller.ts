import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { SimpanAnggaranDto } from './dto/simpan-anggaran.dto';
import { AnggaranService } from './anggaran.service';

@Controller('anggaran')
export class AnggaranController {
  constructor(private readonly anggaranService: AnggaranService) {}

  @Get(':bulan')
  findOne(@Param('bulan') bulan: string) {
    return this.anggaranService.findOne(bulan);
  }

  @Put(':bulan')
  save(
    @Param('bulan') bulan: string,
    @Body() simpanAnggaranDto: SimpanAnggaranDto,
  ) {
    return this.anggaranService.save(bulan, simpanAnggaranDto);
  }
}
