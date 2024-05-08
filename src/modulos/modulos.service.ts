import { Injectable } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-modulo.dto';
import { UpdateModuleDto } from './dto/update-modulo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Modulo } from './entities/modulos.entity';
import { Repository } from 'typeorm';
import { Permiso } from 'src/permisos/entities/permiso.entity';
import { HeaderModulo } from './interface/header-modulo.interface';

@Injectable()
export class ModulosService {

  constructor(
    @InjectRepository(Modulo)
    private modulosRepository: Repository<Modulo>,
    @InjectRepository(Permiso)
    private permisosRepository: Repository<Permiso>
  ) { }

  async create(modulo: CreateModuleDto) {
    const newModulo = this.modulosRepository.create(modulo)

    const moduloSave = await this.modulosRepository.save(newModulo)

    const data = {
      message: "Se creo correctamente.",
      modulo: moduloSave
    }

    return data
  }

  async findModulosByRolId(id: number) {

    const headersList = await this.permisosRepository.createQueryBuilder("P")
      .innerJoinAndSelect("P.modulo", "M")
      .where("P.id_rol = :id_rol", { id_rol: id })
      .andWhere("M.header = :header", { header: 0 })
      .getMany()

    const childrenList = await this.permisosRepository.createQueryBuilder("P")
      .innerJoinAndSelect("P.modulo", "M")
      .where("P.id_rol = :id_rol", { id_rol: id })
      .andWhere("M.header <> :header", { header: 0 })
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

    const customChilren: any = childrenList.map(child => ({
      id: child.modulo.id,
      name: child.modulo.name,
      header: child.modulo.header,
      position: child.modulo.position,
      ruta: child.modulo.ruta,
      icon: child.modulo.icon
    }))

    const list: HeaderModulo[] = []

    for (let i = 0; i < customHeader.length; i++) {
      list.push({ id: customHeader[i].id, name: customHeader[i].name, childList: [] })

      for (let u = 0; u < customChilren.length; u++) {
        if (customHeader[i].position === customChilren[u].header) {
          list[i].childList.push(
            {
              id: customChilren[u].id,
              name: customChilren[u].name,
              ruta: customChilren[u].ruta,
              icon: customChilren[u].icon
            })
        }
      }

    }

    return list
  }

  findAll() {
    return this.modulosRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} module`;
  }

  update(id: number, updateModuleDto: UpdateModuleDto) {
    return `This action updates a #${id} module`;
  }

  remove(id: number) {
    return `This action removes a #${id} module`;
  }
}
