import { IsNotEmpty, IsString } from "class-validator";

export class CreateTallaDto {

    @IsNotEmpty()
    @IsString()
    nombreTalla: string

}
