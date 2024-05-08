import { Producto } from "../entities/producto.entity";
import { ProductoI } from "../interface/producto.interface";
import { CreateProductoDto } from "./create-producto.dto";


export class ExcelProductoDto {

    nombreproducto: string[]
    idmarca: number[]
    idmodelo: number[]
    idtalla: number[]
    idcolor: number[]
    imagen: string[]
    precioventa: number[]

}