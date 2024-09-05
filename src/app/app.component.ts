import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieService } from './Core/Services/movie.service';
import { NavComponent } from "./Shared/Components/nav/nav.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private movie:MovieService){}

}
