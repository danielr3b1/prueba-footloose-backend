import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Post("create")
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Post("update/:id")
  update(
    @Param("id")
    id: number,
    @Body()
    createRoleDto: CreateRoleDto
  ) {
    return this.rolesService.update(id, createRoleDto)
  }

  @Get("all")
  findAll() {
    return this.rolesService.findAll();
  }

  @Get("permisos/all")
  findAllPermisos() {
    return this.rolesService.findAllPermisos()
  }


  @Get("child/:id")
  findAllPermisosChildById(
    @Param("id")
    id: number
  ) {
    return this.rolesService.findAllChildsById(id)
  }

  @Get("header/:id")
  findAllPermisosHeaderById(
    @Param("id")
    id: number
  ) {
    return this.rolesService.findAllHeadersById(id)
  }

  @Get("total")
  getCountRoles() {
    return this.rolesService.getDashboardRoles()
  }

  @Get("child")
  findAllPermisosChild(
  ) {
    return this.rolesService.findAllChilds()
  }

  @Get("header")
  findAllPermisosHeader(
  ) {
    return this.rolesService.findAllHeaders()
  }

  @Patch('state-active/:id')
  active(@Param('id') id: string) {
    return this.rolesService.active(+id);
  }

}
