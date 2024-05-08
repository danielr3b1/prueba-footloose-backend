import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TallasService } from './tallas.service';
import { CreateTallaDto } from './dto/create-talla.dto';
import { UpdateTallaDto } from './dto/update-talla.dto';

@Controller('tallas')
export class TallasController {
  constructor(private readonly tallasService: TallasService) { }

  @Post("create")
  create(@Body() createTallaDto: CreateTallaDto) {
    return this.tallasService.create(createTallaDto);
  }

  @Get("all")
  findAll() {
    return this.tallasService.findAll();
  }

  @Get('detail/:id')
  findOne(@Param('id') id: string) {
    return this.tallasService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateTallaDto: UpdateTallaDto) {
    return this.tallasService.update(+id, updateTallaDto);
  }

  @Patch('state-active/:id')
  active(@Param('id') id: string) {
    return this.tallasService.active(+id);
  }

  @Get("total")
  getCountTallas() {
    return this.tallasService.getDashboardTallas()
  }

}

