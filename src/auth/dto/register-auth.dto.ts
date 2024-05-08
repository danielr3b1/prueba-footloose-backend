import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MinLength } from "class-validator";


export class RegisterAuthDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;

}