import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateModeloDto } from './dto/create-modelo.dto';
import { UpdateModeloDto } from './dto/update-modelo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Modelo } from './entities/modelo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModelosService {

  constructor(
    @InjectRepository(Modelo)
    private modelosRepository: Repository<Modelo>
  ) { }

  async create(modelo: CreateModeloDto) {

    const newModelo = this.modelosRepository.create(modelo)
    await this.modelosRepository.save(newModelo)

    return { message: "Se creo correctamente" }
  }

  findAll() {
    return this.modelosRepository.find({
      where: {
        isActive: true
      }
    })
  }

  async findOne(id: number) {

    const modeloExist = await this.modelosRepository.findOne({
      where: {
        idModelo: id
      }
    })

    if (!modeloExist) {
      throw new HttpException("El modelo con esa id no existe.", HttpStatus.NOT_FOUND)
    }

    return modeloExist

  }

  async update(id: number, modelo: UpdateModeloDto) {

    const modeloExiste = await this.modelosRepository.findOne({
      where: {
        idModelo: id
      }
    })

    if (!modeloExiste) {
      throw new HttpException("El modelo con esa id no existe.", HttpStatus.NOT_FOUND)
    }

    Object.assign(modeloExiste, modelo)

    await this.modelosRepository.save(modeloExiste)

    return { message: "Se actulizo correctamente." }
  }

  async active(id: number) {
    let modeloExist = await this.modelosRepository.findOne({ where: { idModelo: id } })

    if (!modeloExist) {
      throw new HttpException("El modelo con esa id no existe.", HttpStatus.NOT_FOUND)
    }

    if (modeloExist.isActive) {
      modeloExist.isActive = false
    } else {
      modeloExist.isActive = true
    }

    await this.modelosRepository.save(modeloExist)

    return { message: "Se actulizo correctamente." }
  }

  async getDashboardModelos() {

    const count = await this.modelosRepository.count({
      where: {
        isActive: true
      }
    })

    return {
      total: count
    }

  }

}
