
import { IsNotEmpty } from "class-validator";

export class userLoginDto {

    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password: string

}