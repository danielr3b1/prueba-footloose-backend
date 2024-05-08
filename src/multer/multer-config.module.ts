import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
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
})
export class MulterConfigModule { }
