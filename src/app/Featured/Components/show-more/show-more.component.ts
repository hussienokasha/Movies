import { Component, Input, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-show-more',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './show-more.component.html',
  styleUrl: './show-more.component.scss',
})
export class ShowMoreComponent {
  target = input.required<string>();
}
