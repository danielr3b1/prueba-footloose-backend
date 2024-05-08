import { IsDecimal, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductoDto {

    @IsNotEmpty()
    @IsString()
    nombreProducto: string;

    @IsNotEmpty()
    idMarca: number;

    @IsNotEmpty()
    idModelo: number;

    @IsNotEmpty()
    idColor: number;

    @IsNotEmpty()
    idTalla: number;

    imagen?: string;

    @IsNotEmpty()
    precioVenta: number

}
