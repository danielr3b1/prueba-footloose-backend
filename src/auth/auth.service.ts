import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { compare } from "bcrypt"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService
  ) { }

  async register(user: RegisterAuthDto) {

    const usernameExist = await this.usersRepository.findOneBy({
      username: user.username
    })

    if (usernameExist) {
      throw new HttpException("El nombre de usuario ya esta existe.", HttpStatus.CONFLICT)
    }

    const newUser = this.usersRepository.create(user)
    await this.usersRepository.save(newUser)

    const data = {
      message: "Se creo correctamente."
    }

    return data
  }


  async login(user: LoginAuthDto) {

    const userFound = await this.usersRepository.findOne(
      {
        where: { username: user.username },
        relations: ["roles"]
      }
    )

    if (!userFound) {
      throw new HttpException("El nombre de usuario y/o contraseña es incorrecto", HttpStatus.FORBIDDEN)
    }

    const isPasswordValid = await compare(user.password, userFound.password)
    if (!isPasswordValid) {
      throw new HttpException("El nombre de usuario y/o contraseña es incorrecto", HttpStatus.FORBIDDEN)
    }

    const playload = { id: userFound.id, username: userFound.username, rol: userFound.roles[0].id }
    const token = this.jwtService.sign(playload)

    const data = {
      message: "Inicio sesión correctamente.",
      user: userFound,
      token: token
    }

    delete data.user.password
    delete data.user.updated_at

    return data
  }

}
