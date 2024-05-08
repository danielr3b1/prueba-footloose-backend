import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarcasService } from './marcas.service';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';

@Controller('marcas')
export class MarcasController {
  constructor(private readonly marcasService: MarcasService) { }

  @Post("create")
  create(@Body() createMarcaDto: CreateMarcaDto) {
    return this.marcasService.create(createMarcaDto);
  }

  @Get("all")
  findAll() {
    return this.marcasService.findAll()
  }

  @Get('detail/:id')
  findOne(@Param('id') id: string) {
    return this.marcasService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateMarcaDto: UpdateMarcaDto) {
    return this.marcasService.update(+id, updateMarcaDto);
  }

  @Patch('state-active/:id')
  active(@Param('id') id: string) {
    return this.marcasService.active(+id);
  }

  @Get("total")
  getCountProducts() {
    return this.marcasService.getDashboardMarcas()
  }

}
