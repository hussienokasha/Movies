import { Component, EventEmitter, Output, output } from '@angular/core';
import { MovieService, SortBy } from '../../../Core/Services/movie.service';
import { MovieRespone, MovieResult } from '../../../Core/Models/movies-list';
import { CommonModule } from '@angular/common';

import { GenrePipe } from '../../../Core/Pipes/genre.pipe';
import { SkeletonModule } from 'primeng/skeleton';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    CommonModule,
    GenrePipe,
    SkeletonModule,
    RouterLink,
    PaginatorModule,
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent {
  constructor(
    private moviesService: MovieService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}


  totalResult = output<number>();
  resultPerPage = output<number>();
  category = output<SortBy>();
  moviesList: MovieResult[] = [];
  moviesResponse!: MovieRespone;
  selectedType: SortBy = 'popular';
  pageNum!: number;


  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params) => {
      this.pageNum = +params['page'] || 1;
      this.selectedType = params['cat'] || 'popular';
      this.getAllMovies(this.selectedType, this.pageNum);
    });
  }

  getAllMovies(type: SortBy, page: number) {
    this.moviesService.getMoviesLists({ sortBy: type, pageNum: page }).subscribe({
      next: (val: MovieRespone) => {
        this.moviesList = val.results;
        this.moviesResponse = val;
        this.totalResult.emit(this.moviesResponse.total_results);
        this.resultPerPage.emit(this.moviesList.length);
      },
    });
  }

  onRadioChange(type: SortBy) {
    this.selectedType = type;
    this.category.emit(type);
    this.router.navigate([], {
      queryParams: { page: 1, cat: this.selectedType },
    });
    this.getAllMovies(type, this.pageNum);
  }
}
