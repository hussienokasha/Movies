import { Component, input } from '@angular/core';
import { RecommendationService } from '../../../Core/Services/recommendation.service';
import { Recommendation } from '../../../Core/Models/recommendation';
import { ImgPrefixPipe } from '../../../Core/Pipes/img-prefix.pipe';
import { CarouselModule } from 'primeng/carousel';
import { SkeletonModule } from 'primeng/skeleton';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-recommendation',
  standalone: true,
  imports: [ImgPrefixPipe, CarouselModule, SkeletonModule, RouterLink],
  templateUrl: './recommendation.component.html',
  styleUrl: './recommendation.component.scss',
})
export class RecommendationComponent {
  recommendation!: Recommendation[];
  mediaType = input.required<'tv' | 'movie'>();
  mediaId = input.required<number>();
  constructor(
    private recommend: RecommendationService,
    private router: Router
  ) {}
  ngOnInit() {
    this.getAllRecommendations(this.mediaType(), this.mediaId());
  }

  getAllRecommendations(media_type: 'tv' | 'movie', mediaId: number) {
    this.recommend.getRecommendation(media_type, mediaId).subscribe({
      next: (value: Recommendation[]) => {
        this.recommendation = value;
      },
    });
  }
  navigateToDetails(id: number) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/movie', id]));
  }

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 5,
      numScroll: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: '600px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '480px',
      numVisible: 2,
      numScroll: 1,
    },
  ];
}
