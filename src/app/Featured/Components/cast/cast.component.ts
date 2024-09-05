import { Component, input } from '@angular/core';
import { Cast } from '../../../Core/Models/cast';
import { CastService } from '../../../Core/Services/cast.service';
import { ImgPrefixPipe } from '../../../Core/Pipes/img-prefix.pipe';
import { CarouselModule } from 'primeng/carousel';

import { SkeletonModule } from 'primeng/skeleton';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cast',
  standalone: true,
  imports: [ImgPrefixPipe,CarouselModule,SkeletonModule,RouterLink],
  templateUrl: './cast.component.html',
  styleUrl: './cast.component.scss',
})
export class CastComponent {
  castList!: Cast[];
  mediaType= input.required<'tv' | 'movie'>();
  mediaId = input.required<number>();
  responsiveOptions: any[] | undefined;
  constructor(private cast: CastService) {}
  ngOnInit() {
    this.getAllCast(this.mediaType(),this.mediaId());
    this.responsiveOptions = [
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




  getAllCast(mediaType: 'tv' | 'movie', mediaId: number) {
    this.cast.getMediaCasts(mediaType, mediaId).subscribe({
      next: (value: Cast[]) => {
        this.castList = value;
      },
    });
  }
}
