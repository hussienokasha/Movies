import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDefaultImg]',
  standalone: true
})
export class DefaultImgDirective {

  @Input() appDefaultImage: string = 'assets/default-avatar.png'; // Default image path

  constructor(private el: ElementRef) {}

  @HostListener('error') onError() {
    const element = this.el.nativeElement as HTMLImageElement;
    element.src = this.appDefaultImage;
  }

}
