import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModulosService } from './modulos.service';
import { CreateModuleDto } from './dto/create-modulo.dto';
import { UpdateModuleDto } from './dto/update-modulo.dto';

@Controller('modulos')
export class ModulosController {

  constructor(private readonly modulesService: ModulosService) { }

  @Post("create")
  create(@Body() modulo: CreateModuleDto) {
    return this.modulesService.create(modulo);
  }

  @Get("all")
  findAllModulos() {
    return this.modulesService.findAll()
  }

  @Get("user/:id")
  async findAll(@Param("id") id: string) {

    const modules = await this.modulesService.findModulosByRolId(
      +id,
    );

    return modules
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modulesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModuleDto: UpdateModuleDto) {
    return this.modulesService.update(+id, updateModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modulesService.remove(+id);
  }
}
