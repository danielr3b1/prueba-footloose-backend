import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { Permiso } from 'src/permisos/entities/permiso.entity';
import { Modulo } from 'src/modulos/entities/modulos.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Role, User, Permiso, Modulo
    ]),

  ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule { }
