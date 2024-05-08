import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ModulosModule } from './modulos/modulos.module';
import { ProductosModule } from './productos/productos.module';
import { MarcasModule } from './marcas/marcas.module';
import { ModelosModule } from './modelos/modelos.module';
import { ColoresModule } from './colores/colores.module';
import { TallasModule } from './tallas/tallas.module';
import { PermisosModule } from './permisos/permisos.module';
import { RolesModule } from './roles/roles.module';
import { MulterConfigModule } from './multer/multer-config.module';
import { MailsModule } from './mails/mails.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "footloose_db",
      entities: [
        __dirname + "/**/*.entity{.ts,.js}"
      ],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ModulosModule,
    ProductosModule,
    MarcasModule,
    ModelosModule,
    ColoresModule,
    TallasModule,
    PermisosModule,
    RolesModule,
    MulterConfigModule,
    MailsModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule { }
