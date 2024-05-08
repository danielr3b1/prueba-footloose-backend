import { Module } from '@nestjs/common';
import { ModulosService } from './modulos.service';
import { ModulosController } from './modulos.controller';
import { Modulo } from './entities/modulos.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permiso } from 'src/permisos/entities/permiso.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Modulo, Permiso])
  ],
  controllers: [ModulosController],
  providers: [ModulosService],
})
export class ModulosModule { }
