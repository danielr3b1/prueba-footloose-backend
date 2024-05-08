import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { hash } from "bcrypt"

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>
  ) { }

  async create(user: CreateUserDto) {

    user.photo = "profile_default.jpg"

    const newUser = this.usersRepository.create(user)


    const roles = await this.rolesRepository.findBy({
      id: user.idRol
    })
    newUser.roles = roles

    await this.usersRepository.save(newUser)

    return { message: "Se creo correctamente" }
  }

  async updateWithImage(file: Express.Multer.File, user: CreateUserDto) {

    user.photo = file.filename
    const newUser = this.usersRepository.create(user)

    const roles = await this.rolesRepository.findBy({
      id: user.idRol
    })
    newUser.roles = roles

    await this.usersRepository.save(newUser)

    return { message: "Se creo correctamente" }

  }

  findAll() {
    return this.usersRepository.find({
      where: {
        isActive: true
      },
      relations: ["roles"]
    })
  }

  async update(id: number, user: UpdateUserDto) {

    console.log(user);


    const oldUser = await this.usersRepository.findOne({
      where: {
        id: id
      }
    })

    if (!oldUser) {
      throw new HttpException("id usuario no existe", HttpStatus.NOT_FOUND)
    }

    const rol = await this.rolesRepository.findOne({
      where: {
        id: user.idRol
      }
    })

    if (!rol) {
      throw new HttpException("id rol no existe", HttpStatus.NOT_FOUND)
    }

    oldUser.roles = [rol]

    if (oldUser.password !== user.password) {
      const encryPassword = await hash(user.password, Number(process.env.HASH_SALT))
      user.password = encryPassword
    }

    const updateUser = Object.assign(oldUser, user)

    await this.usersRepository.save(updateUser)


    return { message: "Se actulizo correctamente." }

  }

  async updateWithImageRol(file: Express.Multer.File, id: number, user: UpdateUserDto) {

    const oldUser = await this.usersRepository.findOneBy({
      id: id
    })

    if (!oldUser) {
      throw new HttpException("id user no existe", HttpStatus.NOT_FOUND)
    }

    const rol = await this.rolesRepository.findOneBy({
      id: user.idRol
    })

    if (!rol) {
      throw new HttpException("id rol no existe", HttpStatus.NOT_FOUND)
    }

    user.photo = file.filename

    oldUser.roles = [rol]

    if (oldUser.password !== user.password) {
      const encryPassword = await hash(user.password, Number(process.env.HASH_SALT))
      user.password = encryPassword
    }

    const updateUser = Object.assign(oldUser, user)

    await this.usersRepository.save(updateUser)

    return { message: "Se actulizo correctamente." }

  }

  async active(id: number) {
    let userExist = await this.usersRepository.findOne({ where: { id: id } })

    if (!userExist) {
      throw new HttpException("El usuario con esa id no existe.", HttpStatus.NOT_FOUND)
    }

    if (userExist.isActive) {
      userExist.isActive = false
    } else {
      userExist.isActive = true
    }

    await this.usersRepository.save(userExist)

    return { message: "Se elimino correctamente." }

  }

  async getDashboardUsers() {

    const count = await this.usersRepository.count({
      where: {
        isActive: true
      }
    })

    return {
      total: count
    }

  }

}
