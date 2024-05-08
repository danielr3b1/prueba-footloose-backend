import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;

    @IsNotEmpty()
    @IsString()
    username: string;
    //id rol
    photo?: string;

    idRol: number

    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;

}
