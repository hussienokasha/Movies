import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { MovieDetailsComponent } from '../../Views/movie-details/movie-details.component';
import { ActivatedRoute } from '@angular/router';
import { TrailerService } from '../../../Core/Services/trailer.service';
import { SafeUrlPipe } from '../../../Core/Pipes/safe-url.pipe';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-trailer-dialog',
  standalone: true,
  imports: [DialogModule, SafeUrlPipe],
  templateUrl: './trailer-dialog.component.html',
  styleUrl: './trailer-dialog.component.scss',
})
export class TrailerDialogComponent {
  trailerKeys: string[] = [];
  baseLink: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private trailer: TrailerService,
  
  ) {}
  ngOnInit() {
    let movie_id = this.activatedRoute.snapshot.params['id'];
    this.getTrailers(movie_id);
  }

  getTrailers(movieId: number) {
    this.trailer.getMovieTrailer(movieId).subscribe({
      next: (val: string[]) => {
        this.trailerKeys = val;
        this.baseLink = `https://www.youtube.com/embed/${this.trailerKeys[0]}`;
      },
    });
  }
}
