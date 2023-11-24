
import { IsNotEmpty } from "class-validator";

export class createUserDto {

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password: string
}