import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginAuthDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(3, { message: "El nombre de usuario tiene que ser mas de 3 caracter" })
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

}