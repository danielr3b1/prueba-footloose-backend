import { Module } from '@nestjs/common';
import { MarcasService } from './marcas.service';
import { MarcasController } from './marcas.controller';
import { Marca } from './entities/marca.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Marca
    ])
  ],
  controllers: [MarcasController],
  providers: [MarcasService],
  exports: [
    TypeOrmModule
  ]
})
export class MarcasModule {}
