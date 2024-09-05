import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true,
})
export class DurationPipe implements PipeTransform {
  transform(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainderMinutes = minutes % 60;

    if (hours === 0) {
      return `${remainderMinutes}m`;
    } else if (remainderMinutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${remainderMinutes}m`;
    }
  }
}
