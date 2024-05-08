import { Controller, Post, Body, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Get, Param, Res, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable, of } from 'rxjs';
import { join } from 'path';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post("create")
  @UseInterceptors(FileInterceptor("file"))
  create(
    @UploadedFile(
      /* new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
          new FileTypeValidator({ fileType: ".(png|jpeg|jpg)" })
        ]
      }) */
    )
    file: Express.Multer.File,
    @Body()
    user: CreateUserDto
  ) {

    if (file) {
      return this.usersService.updateWithImage(file, user)
    } else {
      return this.usersService.create(user);
    }
  }

  @Get("profile-image/:imgname")
  findProfileImage(
    @Param("imgname")
    image,
    @Res() res
  ): Observable<Object> {
    return of(res.sendFile(join(process.cwd(), "src/uploads/" + image)))
  }

  @Get("all")
  findAll() {
    return this.usersService.findAll()
  }

  @Post("update/:id")
  @UseInterceptors(FileInterceptor("file"))
  update(
    @UploadedFile()
    file: Express.Multer.File,
    @Param("id")
    id: string,
    @Body()
    user: UpdateUserDto
  ) {

    if (file) {
      return this.usersService.updateWithImageRol(file, +id, user)
    } else {
      return this.usersService.update(+id, user);
    }
  }

  @Patch('state-active/:id')
  active(@Param('id') id: string) {
    return this.usersService.active(+id);
  }

  @Get("total")
  getCountProducts() {
    return this.usersService.getDashboardUsers()
  }

}
