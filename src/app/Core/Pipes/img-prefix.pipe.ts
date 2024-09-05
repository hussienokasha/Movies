import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgPrefix',
  standalone: true,
})
export class ImgPrefixPipe implements PipeTransform {
  private readonly baseUrl = 'https://image.tmdb.org/t/p/';
  private readonly defaultSize = 'original';
  private readonly sizeMap = {
    w500: 'w500',
    original: this.defaultSize,
  };

  transform(img: string, size: 'w500' | 'original' = 'original'): string {
    if (!img) return '';

    const sizePath = this.sizeMap[size] || this.defaultSize;
    return `${this.baseUrl}${sizePath}${img}`;
  }
}
