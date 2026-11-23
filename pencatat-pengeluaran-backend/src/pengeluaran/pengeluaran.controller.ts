import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePengeluaranDto } from './dto/create-pengeluaran.dto';
import { UpdatePengeluaranDto } from './dto/update-pengeluaran.dto';
import { PengeluaranService } from './pengeluaran.service';

@Controller('pengeluaran')
export class PengeluaranController {
  // Dependency Injection: service disediakan oleh PengeluaranModule.
  constructor(private readonly pengeluaranService: PengeluaranService) {}

  @Post()
  create(@Body() createPengeluaranDto: CreatePengeluaranDto) {
    return this.pengeluaranService.create(createPengeluaranDto);
  }

  @Get()
  findAll() {
    return this.pengeluaranService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pengeluaranService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePengeluaranDto: UpdatePengeluaranDto,
  ) {
    return this.pengeluaranService.update(id, updatePengeluaranDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.pengeluaranService.remove(id);
  }
}
