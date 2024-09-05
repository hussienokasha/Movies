import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ImgPrefixPipe } from "../../../Core/Pipes/img-prefix.pipe";
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CarouselModule, ImgPrefixPipe,SkeletonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {

  items: any[] | undefined;
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
