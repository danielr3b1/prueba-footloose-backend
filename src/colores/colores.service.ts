import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from './entities/color.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ColoresService {

  constructor(
    @InjectRepository(Color)
    private coloresRepository: Repository<Color>
  ) { }

  async create(color: CreateColorDto) {
    const newColor = this.coloresRepository.create(color)
    await this.coloresRepository.save(newColor)

    return { message: "Se creo correctamente." }
  }

  findAll() {
    return this.coloresRepository.find({
      where: {
        isActive: true
      }
    })
  }

  async findOne(id: number) {

    const colorExist = await this.coloresRepository.findOneBy({
      idColor: id
    })

    if (!colorExist) {
      throw new HttpException("El color con esa id no existe.", HttpStatus.NOT_FOUND)
    }

    return colorExist
  }

  async update(id: number, color: UpdateColorDto) {

    const colorExist = await this.coloresRepository.findOne({
      where: {
        idColor: id
      }
    })

    Object.assign(colorExist, color)

    await this.coloresRepository.save(colorExist)

    return { message: "Se actulizo correctamente." }
  }

  async active(id: number) {
    let colorExist = await this.coloresRepository.findOne({ where: { idColor: id } })

    if (!colorExist) {
      throw new HttpException("La marca con esa id no existe.", HttpStatus.NOT_FOUND)
    }

    if (colorExist.isActive) {
      colorExist.isActive = false
    } else {
      colorExist.isActive = true
    }

    await this.coloresRepository.save(colorExist)

    return { message: "Se actulizo correctamente." }
  }

  async getDashboardColores() {

    const count = await this.coloresRepository.count({
      where: {
        isActive: true
      }
    })

    return {
      total: count
    }

  }

}
