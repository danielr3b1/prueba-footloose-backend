import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ColoresService } from './colores.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';

@Controller('colores')
export class ColoresController {
  constructor(private readonly coloresService: ColoresService) { }

  @Post("create")
  create(@Body() createColoreDto: CreateColorDto) {
    return this.coloresService.create(createColoreDto);
  }

  @Get("all")
  findAll() {
    return this.coloresService.findAll();
  }

  @Get('detail/:id')
  findOne(@Param('id') id: string) {
    return this.coloresService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateColoreDto: UpdateColorDto) {
    return this.coloresService.update(+id, updateColoreDto);
  }

  @Patch('state-active/:id')
  active(@Param('id') id: string) {
    return this.coloresService.active(+id);
  }

  @Get("total")
  getCountColores() {
    return this.coloresService.getDashboardColores()
  }
}
