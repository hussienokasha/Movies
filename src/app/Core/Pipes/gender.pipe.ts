import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender',
  standalone: true,
})
export class GenderPipe implements PipeTransform {
  private genderMap: { [key: number]: string } = {
    1: 'Female',
    2: 'Male',
    3: 'Non-binary',
  };

  transform(value: number): unknown {
    return this.genderMap[value] || 'Unknown';
  }
}
