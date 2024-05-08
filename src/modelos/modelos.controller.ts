import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModelosService } from './modelos.service';
import { CreateModeloDto } from './dto/create-modelo.dto';
import { UpdateModeloDto } from './dto/update-modelo.dto';

@Controller('modelos')
export class ModelosController {
  constructor(private readonly modelosService: ModelosService) { }

  @Post("create")
  create(@Body() createModeloDto: CreateModeloDto) {
    return this.modelosService.create(createModeloDto);
  }

  @Get("all")
  findAll() {
    return this.modelosService.findAll();
  }

  @Get('detail/:id')
  findOne(@Param('id') id: string) {
    return this.modelosService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateModeloDto: UpdateModeloDto) {
    return this.modelosService.update(+id, updateModeloDto);
  }

  @Patch('state-active/:id')
  active(@Param('id') id: string) {
    return this.modelosService.active(+id);
  }

  @Get("total")
  getCountProducts() {
    return this.modelosService.getDashboardModelos()
  }

}
