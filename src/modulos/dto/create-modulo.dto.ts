import { IsBoolean, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateModuleDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(3, { message: "El nombre del modulo tiene que ser mas de 3 caracter" })
    name: string;

    check?: boolean;

}
