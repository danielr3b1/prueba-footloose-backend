import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { Marca } from 'src/marcas/entities/marca.entity';
import { Modelo } from 'src/modelos/entities/modelo.entity';
import { Color } from 'src/colores/entities/color.entity';
import { Talla } from 'src/tallas/entities/talla.entity';
import { MailsService } from 'src/mails/mails.service';
import { ExcelProductoDto } from './dto/excel-producto.dto';

@Injectable()
export class ProductosService {

  constructor(
    @InjectRepository(Producto)
    private productosRepository: Repository<Producto>,
    @InjectRepository(Marca)
    private marcasRepository: Repository<Marca>,
    @InjectRepository(Modelo)
    private modelosRepository: Repository<Modelo>,
    @InjectRepository(Color)
    private coloresRepository: Repository<Color>,
    @InjectRepository(Talla)
    private TallasRepository: Repository<Talla>,
    private mailService: MailsService
  ) { }

  async create(producto: CreateProductoDto) {

    const marca = await this.marcasRepository.findOneBy({ idMarca: producto.idMarca })

    if (!marca) {
      throw new HttpException("id marca no existe", HttpStatus.NOT_FOUND)
    }

    const modelo = await this.modelosRepository.findOneBy({ idModelo: producto.idModelo })

    if (!modelo) {
      throw new HttpException("id modelo no existe", HttpStatus.NOT_FOUND)
    }

    const color = await this.coloresRepository.findOneBy({ idColor: producto.idColor })

    if (!color) {
      throw new HttpException("id color no existe", HttpStatus.NOT_FOUND)
    }

    const talla = await this.TallasRepository.findOneBy({ idTalla: producto.idTalla })

    if (!talla) {
      throw new HttpException("id talla no existe", HttpStatus.NOT_FOUND)
    }

    producto.imagen = "product-not-found.jpg"

    await this.productosRepository.save({
      ...producto,
      marca,
      modelo,
      color,
      talla
    })

    return { message: "Se creo correctamente." }
  }

  async updateWithImage(file: Express.Multer.File, producto: CreateProductoDto) {

    const marca = await this.marcasRepository.findOneBy({ idMarca: producto.idMarca })

    if (!marca) {
      throw new HttpException("id marca no existe", HttpStatus.NOT_FOUND)
    }

    const modelo = await this.modelosRepository.findOneBy({ idModelo: producto.idModelo })

    if (!modelo) {
      throw new HttpException("id modelo no existe", HttpStatus.NOT_FOUND)
    }

    const color = await this.coloresRepository.findOneBy({ idColor: producto.idColor })

    if (!color) {
      throw new HttpException("id color no existe", HttpStatus.NOT_FOUND)
    }

    const talla = await this.TallasRepository.findOneBy({ idTalla: producto.idTalla })

    if (!talla) {
      throw new HttpException("id talla no existe", HttpStatus.NOT_FOUND)
    }

    producto.imagen = file.filename

    await this.productosRepository.save({
      ...producto,
      marca,
      modelo,
      color,
      talla
    })

    return { message: "Se creo correctamente." }
  }

  findAll() {
    return this.productosRepository.find({
      where: {
        isActive: true
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} producto`;
  }

  async update(id: number, producto: UpdateProductoDto) {

    const oldProducto = await this.productosRepository.findOne({
      where: {
        idProducto: id
      }
    })

    if (!oldProducto) {
      throw new HttpException("id producto no existe", HttpStatus.NOT_FOUND)
    }

    const marca = await this.marcasRepository.findOneBy({ idMarca: producto.idMarca })

    if (!marca) {
      throw new HttpException("id marca no existe", HttpStatus.NOT_FOUND)
    }

    const modelo = await this.modelosRepository.findOneBy({ idModelo: producto.idModelo })

    if (!modelo) {
      throw new HttpException("id modelo no existe", HttpStatus.NOT_FOUND)
    }

    const color = await this.coloresRepository.findOneBy({ idColor: producto.idColor })

    if (!color) {
      throw new HttpException("id color no existe", HttpStatus.NOT_FOUND)
    }

    const talla = await this.TallasRepository.findOneBy({ idTalla: producto.idTalla })

    if (!talla) {
      throw new HttpException("id talla no existe", HttpStatus.NOT_FOUND)
    }

    if (oldProducto.precioVenta != producto.precioVenta) {
      await this.mailService.sendCredentialsUser(producto.nombreProducto, oldProducto.precioVenta.toString(), producto.precioVenta.toString(), "daniel03livee@gmail.com")
    }

    const updateProduct = Object.assign(oldProducto, producto)

    await this.productosRepository.save({
      ...updateProduct,
      marca,
      modelo,
      color,
      talla
    })

    return { message: "Se actulizo correctamente." }
  }

  async updateWithImageProducto(file: Express.Multer.File, id: number, producto: UpdateProductoDto) {

    const oldProducto = await this.productosRepository.findOneBy({
      idProducto: id
    })

    if (!oldProducto) {
      throw new HttpException("id producto no existe", HttpStatus.NOT_FOUND)
    }

    const marca = await this.marcasRepository.findOneBy({ idMarca: producto.idMarca })

    if (!marca) {
      throw new HttpException("id marca no existe", HttpStatus.NOT_FOUND)
    }

    const modelo = await this.modelosRepository.findOneBy({ idModelo: producto.idModelo })

    if (!modelo) {
      throw new HttpException("id modelo no existe", HttpStatus.NOT_FOUND)
    }

    const color = await this.coloresRepository.findOneBy({ idColor: producto.idColor })

    if (!color) {
      throw new HttpException("id color no existe", HttpStatus.NOT_FOUND)
    }

    const talla = await this.TallasRepository.findOneBy({ idTalla: producto.idTalla })

    if (!talla) {
      throw new HttpException("id talla no existe", HttpStatus.NOT_FOUND)
    }

    producto.imagen = file.filename

    if (oldProducto.precioVenta != producto.precioVenta) {
      await this.mailService.sendCredentialsUser(producto.nombreProducto, oldProducto.precioVenta.toString(), producto.precioVenta.toString(), "daniel03livee@gmail.com")
    }

    const updateProduct = Object.assign(oldProducto, producto)

    await this.productosRepository.save({
      ...updateProduct,
      marca,
      modelo,
      color,
      talla
    })

    return { message: "Se actulizo correctamente." }

  }

  async active(id: number) {
    let productExist = await this.productosRepository.findOne({ where: { idProducto: id } })

    if (!productExist) {
      throw new HttpException("El producto con esa id no existe.", HttpStatus.NOT_FOUND)
    }

    if (productExist.isActive) {
      productExist.isActive = false
    } else {
      productExist.isActive = true
    }

    await this.productosRepository.save(productExist)

    return { message: "Se elimino correctamente." }

  }

  async importExcel(excelProducto: ExcelProductoDto) {



    for (let i = 0; i < excelProducto.nombreproducto.length; i++) {

      const marca = await this.marcasRepository.findOneBy({ idMarca: excelProducto.idmarca[i] })

      if (!marca) {
        throw new HttpException("id marca no existe", HttpStatus.NOT_FOUND)
      }

      const modelo = await this.modelosRepository.findOneBy({ idModelo: excelProducto.idmodelo[i] })

      if (!modelo) {
        throw new HttpException("id modelo no existe", HttpStatus.NOT_FOUND)
      }

      const color = await this.coloresRepository.findOneBy({ idColor: excelProducto.idcolor[i] })

      if (!color) {
        throw new HttpException("id color no existe", HttpStatus.NOT_FOUND)
      }

      const talla = await this.TallasRepository.findOneBy({ idTalla: excelProducto.idtalla[i] })

      if (!talla) {
        throw new HttpException("id talla no existe", HttpStatus.NOT_FOUND)
      }

      const producto: any = {
        nombreProducto: excelProducto.nombreproducto[i],
        marca: marca,
        modelo: modelo,
        color: color,
        talla: talla,
        imagen: excelProducto.imagen[i],
        precioVenta: excelProducto.precioventa[i]
      }

      await this.productosRepository.save(producto)
    }

    return { message: "Se creo correctamente." }

  }

  async getDashboardProducto() {

    const count = await this.productosRepository.count({
      where: {
        isActive: true
      }
    })

    return {
      total: count
    }

  }

}
