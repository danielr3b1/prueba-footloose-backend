import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateColorDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(3, { message: "El nombre de la marca tiene que ser mas de 3 caracter" })
    nombreColor: string;

}
