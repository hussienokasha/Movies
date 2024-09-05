import { Routes } from '@angular/router';
import { HomeComponent } from './Featured/Views/home/home.component';
import { MovieDetailsComponent } from './Featured/Views/movie-details/movie-details.component';
import { MoviesHubComponent } from './Featured/Views/movies-hub/movies-hub.component';
import { PersonDetailsComponent } from './Featured/Views/person-details/person-details.component';
import { PeopleComponent } from './Featured/Views/people/people.component';
import { TvHubComponent } from './Featured/Views/tv-hub/tv-hub.component';
import { TvDetailsComponent } from './Featured/Views/tv-details/tv-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'movies', component: MoviesHubComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'tv', component: TvHubComponent },
  { path: 'tv/:id', component: TvDetailsComponent },
  { path: 'people', component: PeopleComponent },
  { path: 'person/:id', component: PersonDetailsComponent },

  // {path:'**',}
];
