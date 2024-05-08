import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExcelProductoDto } from './dto/excel-producto.dto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) { }

  @Post("create")
  @UseInterceptors(FileInterceptor("file"))
  create(
    @UploadedFile()
    file: Express.Multer.File,
    @Body()
    producto: CreateProductoDto
  ) {
    if (file) {
      return this.productosService.updateWithImage(file, producto)
    } else {
      return this.productosService.create(producto);
    }
  }

  @Get("all")
  findAll() {
    return this.productosService.findAll();
  }

  @Get('search/:id')
  findOne(@Param('id') id: string) {
    return this.productosService.findOne(+id);
  }

  @Post('update/:id')
  @UseInterceptors(FileInterceptor("file"))
  update(
    @UploadedFile()
    file: Express.Multer.File, @Param('id') id: string, @Body() producto: UpdateProductoDto) {
    if (file) {
      return this.productosService.updateWithImageProducto(file, +id, producto)
    } else {
      return this.productosService.update(+id, producto);
    }
  }

  @Patch('state-active/:id')
  active(@Param('id') id: string) {
    return this.productosService.active(+id);
  }

  @Post("excel/import")
  importExcel(
    @Body()
    data: ExcelProductoDto
  ) {
    return this.productosService.importExcel(data)
  }

  @Get("total")
  getCountProducts() {
    return this.productosService.getDashboardProducto()
  }
}
