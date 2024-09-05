import { Component } from '@angular/core';
import { MovieService } from '../../../Core/Services/movie.service';
import { CarouselModule } from 'primeng/carousel';
import { SkeletonModule } from 'primeng/skeleton';
import {
  TrendingResponse,
  TrendingResult,
} from '../../../Core/Models/trending';
import { RatingModule } from 'primeng/rating';
import { RouterLink } from '@angular/router';
import { ImgPrefixPipe } from "../../../Core/Pipes/img-prefix.pipe";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CarouselModule, SkeletonModule, RatingModule, RouterLink, ImgPrefixPipe],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  responsiveOptions = [

    {
      breakpoint: '1024px',
      numVisible: 5,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 4,
      numScroll: 1
    },
    {
      breakpoint: '600px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '480px',
      numVisible: 2,
      numScroll: 1
    }

  ];
  trendingMovies: TrendingResult[] = [];
  activeMovie!: TrendingResult ;
  constructor(private trending: MovieService) {}
  ngOnInit() {
    this.getAlltrending('day');
  }

  getAlltrending(time: 'day' | 'week') {
    this.trending.getTrendingMovies(time).subscribe({
      next: (res: TrendingResponse) => {
        this.trendingMovies = res.results;

        if (this.trendingMovies.length > 0) {
          this.activeMovie = this.trendingMovies[0];
        }
      },
    });
  }
  onCarouselChange(event: any) {
    this.activeMovie = this.trendingMovies[event.page];
  }
}
