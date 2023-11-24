
import { IsOptional } from "class-validator";

export class FilterMovieDto {
    @IsOptional()
    name: string;
}