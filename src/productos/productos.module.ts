import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { MarcasModule } from 'src/marcas/marcas.module';
import { MarcasService } from 'src/marcas/marcas.service';
import { ModelosModule } from 'src/modelos/modelos.module';
import { ColoresModule } from 'src/colores/colores.module';
import { TallasModule } from 'src/tallas/tallas.module';
import { ModelosService } from 'src/modelos/modelos.service';
import { ColoresService } from 'src/colores/colores.service';
import { TallasService } from 'src/tallas/tallas.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MailsModule } from 'src/mails/mails.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto]),
    MulterModule.register({
      storage: diskStorage({
        destination: './src/uploads', // Directorio donde se guardarán las imágenes
        filename: (req, file, cb) => {
          const ext = file.originalname.split(".").pop()
          const newImageName = `${Date.now()}.${ext}`
          cb(null, newImageName);
        },
      }),
    }),
    MarcasModule,
    ModelosModule,
    ColoresModule,
    TallasModule,
    MailsModule
  ],
  controllers: [ProductosController],
  providers: [
    ProductosService,
    MarcasService,
    ModelosService,
    ColoresService,
    TallasService
  ],
})
export class ProductosModule { }
