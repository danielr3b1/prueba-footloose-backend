import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTallaDto } from './dto/create-talla.dto';
import { UpdateTallaDto } from './dto/update-talla.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Talla } from './entities/talla.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TallasService {

  constructor(
    @InjectRepository(Talla)
    private tallasRepository: Repository<Talla>
  ) { }

  async create(talla: CreateTallaDto) {
    const newTalla = this.tallasRepository.create(talla)
    await this.tallasRepository.save(newTalla)

    return { message: "Se creo correctamente" }

  }

  findAll() {
    return this.tallasRepository.find({
      where: {
        isActive: true
      }
    })
  }

  async findOne(id: number) {

    const tallaExist = await this.tallasRepository.findOneBy({ idTalla: id })

    if (!tallaExist) {
      throw new HttpException("La talla con esa id no existe.", HttpStatus.NOT_FOUND)
    }

    return tallaExist
  }

  async update(id: number, talla: UpdateTallaDto) {

    const tallaExist = await this.tallasRepository.findOne({
      where: {
        idTalla: id
      }
    })

    if (!tallaExist) {
      throw new HttpException("La talla con esa id no existe.", HttpStatus.NOT_FOUND)
    }

    Object.assign(tallaExist, talla)

    await this.tallasRepository.save(tallaExist)

    return { message: "Se actulizo correctamente." }

  }

  async active(id: number) {
    let tallaExist = await this.tallasRepository.findOne({ where: { idTalla: id } })

    if (!tallaExist) {
      throw new HttpException("La talla con esa id no existe.", HttpStatus.NOT_FOUND)
    }

    if (tallaExist.isActive) {
      tallaExist.isActive = false
    } else {
      tallaExist.isActive = true
    }

    await this.tallasRepository.save(tallaExist)

    return { message: "Se actulizo correctamente." }
  }

  async getDashboardTallas() {

    const count = await this.tallasRepository.count({
      where: {
        isActive: true
      }
    })

    return {
      total: count
    }

  }

}
