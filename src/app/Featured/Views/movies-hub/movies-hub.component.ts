import { Component, Signal, viewChild, ViewChild } from '@angular/core';
import { MoviesComponent } from '../../Components/movies/movies.component';
import { PaginatorModule } from 'primeng/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService, SortBy } from '../../../Core/Services/movie.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-movies-hub',
  standalone: true,
  imports: [
    MoviesComponent,
    PaginatorModule,
    DropdownModule,
    ReactiveFormsModule,
  ],
  templateUrl: './movies-hub.component.html',
  styleUrl: './movies-hub.component.scss',
})
export class MoviesHubComponent {
  // @ViewChild(MoviesComponent) movie!: MoviesComponent;
  movie: Signal<MoviesComponent> = viewChild<any>(MoviesComponent);
  constructor(private router: Router, private acRou: ActivatedRoute) {
    this.acRou.queryParams.subscribe((params) => {
      this.pageNum = params['page'] || 1;
    });
  }
  selectedType: SortBy = 'popular';
  sortOptions: { name: string; value: SortBy }[] = [
    { name: 'Popularity Ascending', value: 'popularity.asc' },
    { name: 'Rating Descending', value: 'top_rated.desc' },
    { name: 'Release Date Ascending', value: 'release_date.asc' },
    { name: 'Release Date Descending', value: 'release_date.desc' },
    { name: 'Title (A-Z)', value: 'titleAZ' },
    { name: 'Title (Z-A)', value: 'titleZA' },
  ];

  pageNum: number = 1;
  totalResult!: number;
  resultPerPage!: number;

  changePage(event: any) {
    this.pageNum = +event.page + 1;
    this.router.navigate([], {
      queryParams: { page: this.pageNum, cat: this.selectedType },
    });
  }

  applyFilter(e: any) {
    console.log(e.value.value);
    this.movie().getAllMovies(e.value.value, this.movie().pageNum);
  }
  getTotalResult(val: number) {
    this.totalResult = val;
  }
  getResultPerPage(val: number) {
    this.resultPerPage = val;
  }
  getMovieCat(v: SortBy) {
    this.selectedType = v;
  }
}
