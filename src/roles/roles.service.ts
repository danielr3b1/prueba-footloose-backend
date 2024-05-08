import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Not, Repository } from 'typeorm';
import { Permiso } from 'src/permisos/entities/permiso.entity';
import { HeaderModulo } from 'src/modulos/interface/header-modulo.interface';
import { Modulo } from 'src/modulos/entities/modulos.entity';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    @InjectRepository(Permiso)
    private permisosRepository: Repository<Permiso>,
    @InjectRepository(Modulo)
    private modulosRepository: Repository<Modulo>
  ) {

  }

  async create(rolesCreate: CreateRoleDto) {

    const rolContent = rolesCreate.nombreModelo

    const rol = await this.rolesRepository.save({
      nombre: rolContent.name
    })

    for (const item of rolContent.roles) {

      const modulo = await this.modulosRepository.findOne({
        where: {
          id: item.id
        }
      })

      const permiso = this.permisosRepository.create({
        role: rol,
        modulo: modulo
      })

      await this.permisosRepository.save(permiso)

    }

    return { message: "Se creo correctamente" }
  }

  async update(id: number, rolesCreate: CreateRoleDto) {

    const rolContent = rolesCreate.nombreModelo

    await this.permisosRepository.delete({ role: { id: id } });

    await this.rolesRepository.update(id, { nombre: rolContent.name });

    for (const item of rolContent.roles) {
      const modulo = await this.modulosRepository.findOne({
        where: {
          id: item.id
        }
      });

      const permiso = this.permisosRepository.create({
        role: { id: id },
        modulo: modulo
      });

      await this.permisosRepository.save(permiso);
    }
    return { message: "Se actualizo correctamente." }
  }

  findAll() {
    return this.rolesRepository.find({
      where: {
        isActive: true
      }
    })
  }

  async findAllHeaders() {

    const headersList = await this.modulosRepository.find({
      where: {
        header: 0
      }
    });

    return headersList

  }

  async findAllChilds() {

    const childrenList = await this.modulosRepository.find({
      where: {
        header: Not(0)
      }
    });

    return childrenList

  }

  async findAllChildsById(id: number) {

    const childrenList = await this.permisosRepository.createQueryBuilder("P")
      .innerJoinAndSelect("P.modulo", "M")
      .where("P.id_rol = :id_rol", { id_rol: id })
      .andWhere("M.header <> :header", { header: 0 })
      .getMany()

    const customChilren: any = childrenList.map(child => ({
      id: child.modulo.id,
      name: child.modulo.name,
      header: child.modulo.header,
      position: child.modulo.position,
      ruta: child.modulo.ruta,
      icon: child.modulo.icon
    }))


    return customChilren

  }

  async findAllHeadersById(id: number) {
    const headersList = await this.permisosRepository.createQueryBuilder("P")
      .innerJoinAndSelect("P.modulo", "M")
      .where("P.id_rol = :id_rol", { id_rol: id })
      .andWhere("M.header = :header", { header: 0 })
      .getMany()

    const customHeader: any = headersList.map(header => (
      {
        id: header.modulo.id,
        name: header.modulo.name,
        header: header.modulo.header,
        position: header.modulo.position,
        ruta: header.modulo.ruta,
        icon: header.modulo.icon

      }
    ))

    return customHeader
  }


  async findAllPermisos() {

    const headersList = await this.modulosRepository.find({
      where: {
        header: 0
      }
    });

    const childrenList = await this.modulosRepository.find({
      where: {
        header: Not(0)
      }
    });

    const list: HeaderModulo[] = []

    for (let i = 0; i < headersList.length; i++) {
      list.push({ id: headersList[i].id, name: headersList[i].name, childList: [] })

      for (let u = 0; u < childrenList.length; u++) {
        if (headersList[i].position === childrenList[u].header) {
          list[i].childList.push(
            {
              id: childrenList[u].id,
              name: childrenList[u].name,
              ruta: childrenList[u].ruta,
              icon: childrenList[u].icon
            })
        }
      }

    }



    return list

  }

  async getDashboardRoles() {

    const count = await this.rolesRepository.count({
      where: {
        isActive: true
      }
    })

    return {
      total: count
    }

  }

  async active(id: number) {
    let rolExist = await this.rolesRepository.findOne(
      {
        where: { id: id }
      }
    )

    if (!rolExist) {
      throw new HttpException("El rol con esa id no existe.", HttpStatus.NOT_FOUND)
    }

    if (rolExist.isActive) {
      rolExist.isActive = false
    } else {
      rolExist.isActive = true
    }

    await this.rolesRepository.save(rolExist)

    return { message: "Se actulizo correctamente." }
  }
}
