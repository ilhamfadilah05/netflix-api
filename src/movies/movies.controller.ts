import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { FilterMovieDto } from './dto/filter-movie.dto';
import { filter } from 'rxjs';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {
  }

  @Get()
  getBooks(@Query() filter: FilterMovieDto) {
    return this.moviesService.getBooks(filter);
  }


}
