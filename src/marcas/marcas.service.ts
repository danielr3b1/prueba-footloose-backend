import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Marca } from './entities/marca.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MarcasService {

  constructor(
    @InjectRepository(Marca)
    private marcasRepository: Repository<Marca>
  ) { }

  async create(marca: CreateMarcaDto) {

    const newMarca = this.marcasRepository.create(marca)

    await this.marcasRepository.save(newMarca)

    return { mesage: "La marca se creo correctamente." }
  }

  findAll() {
    return this.marcasRepository.find({
      where: {
        isActive: true
      }
    })
  }

  async findOne(id: number) {
    const marcaExist = await this.marcasRepository.findOneBy({ idMarca: id })

    if (!marcaExist) {
      throw new HttpException("La marca con esa id no existe.", HttpStatus.NOT_FOUND)
    }

    return marcaExist
  }

  async update(id: number, marca: UpdateMarcaDto) {

    const marcaExist = await this.marcasRepository.findOne({ where: { idMarca: id } })

    if (!marcaExist) {
      throw new HttpException("La marca con esa id no existe.", HttpStatus.NOT_FOUND)
    }

    Object.assign(marcaExist, marca)

    await this.marcasRepository.save(marcaExist)

    return { message: "Se actulizo correctamente." }

  }

  async active(id: number) {
    let marcaExist = await this.marcasRepository.findOne({ where: { idMarca: id } })

    if (!marcaExist) {
      throw new HttpException("La marca con esa id no existe.", HttpStatus.NOT_FOUND)
    }

    if (marcaExist.isActive) {
      marcaExist.isActive = false
    } else {
      marcaExist.isActive = true
    }

    await this.marcasRepository.save(marcaExist)

    return { message: "Se elimino correctamente." }

  }

  async getDashboardMarcas() {

    const count = await this.marcasRepository.count({
      where: {
        isActive: true
      }
    })

    return {
      total: count
    }

  }
}
