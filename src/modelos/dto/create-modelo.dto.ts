import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateModeloDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(3, { message: "El nombre de la marca tiene que ser mas de 3 caracter" })
    nombreModelo: string

}
