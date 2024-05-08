import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Role
    ]),
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
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
