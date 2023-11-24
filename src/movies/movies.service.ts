import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entity/movie.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { FilterMovieDto } from './dto/filter-movie.dto';

@Injectable()
export class MoviesService {
    constructor(@InjectRepository(Movie)
    private readonly movierepo: Repository<Movie>
    ) { }

    async getBooks(filter: FilterMovieDto): Promise<any> {
        const { name } = filter;
        let query = "SELECT * FROM movie";
        const options: FindManyOptions<Movie> = {};
        if (name) {
            query += " WHERE name LIKE '%" + name + "%'";
        }
        const movies = await this.movierepo.find(options);

        if (!movies || movies.length === 0) {
            throw new NotFoundException('Data not found');
        }
        return {
            statusCode: 200,
            message: 'Success',
            data: movies,
        };
    }
}
