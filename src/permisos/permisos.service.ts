import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permiso } from './entities/permiso.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermisosService {

  constructor(
    @InjectRepository(Permiso)
    private permisosRepository: Repository<Permiso>
  ) { }

  create(createPermisoDto: CreatePermisoDto) {
    return 'This action adds a new permiso';
  }

  findAll() {
    return this.permisosRepository.find()
  }

  async findOne(id: number) {

    /* const modulos = await this.modulosRepository.createQueryBuilder("modulo")
      .innerJoin("modulo.permisos", "permiso")
      .where("permiso.id_user = :idUsuario", { idUsuario: id })
      .getMany(); */


    return
  }

  update(id: number, updatePermisoDto: UpdatePermisoDto) {
    return `This action updates a #${id} permiso`;
  }

  remove(id: number) {
    return `This action removes a #${id} permiso`;
  }
}
