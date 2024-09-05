import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../../Core/Services/movie.service';
import { MovieDetails } from '../../../Core/Models/movie-details';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { DurationPipe } from '../../../Core/Pipes/duration.pipe';
import { TrailerService } from '../../../Core/Services/trailer.service';
import { TrailerDialogComponent } from '../../Components/trailer-dialog/trailer-dialog.component';
import { ImgPrefixPipe } from '../../../Core/Pipes/img-prefix.pipe';
import { CastComponent } from '../../Components/cast/cast.component';
import { RecommendationComponent } from '../../Components/recommendation/recommendation.component';
@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    DurationPipe,
    DynamicDialogModule,
    ImgPrefixPipe,
    CastComponent,
    RecommendationComponent,
  ],
  providers: [DialogService],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent {
  movie: MovieDetails | undefined;
  movie_id!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private mov: MovieService,

    public dialogService: DialogService
  ) {}
  ngOnInit() {
    this.movie_id = this.activatedRoute.snapshot.params['id'];
    this.getMovieDetails(this.movie_id);
  }
  getMovieDetails(movie_id: number) {
    this.mov.getMoviesDetails(movie_id).subscribe({
      next: (val: MovieDetails) => {
        this.movie = val;
      },
    });
  }

  showTrailerDialog() {
    this.dialogService.open(TrailerDialogComponent, {
      header: `${this.movie?.title} Trailer`,
      maximizable: true,
      modal: true,
      width: '70vw',
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    });
  }
}
