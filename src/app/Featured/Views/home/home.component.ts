import { Component } from '@angular/core';
import { LandingComponent } from '../../Components/landing/landing.component';
import { MoviesComponent } from '../../Components/movies/movies.component';
import { ShowMoreComponent } from '../../Components/show-more/show-more.component';
import { TvComponent } from "../../Components/tv/tv.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LandingComponent, MoviesComponent, ShowMoreComponent, TvComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
