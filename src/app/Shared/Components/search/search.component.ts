import { Component } from '@angular/core';

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SearchService } from '../../../Core/Services/search.service';
import { SearchResponse, SearchResult } from '../../../Core/Models/search';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ImgPrefixPipe } from '../../../Core/Pipes/img-prefix.pipe';
import { switchMap } from 'rxjs';
import { GenrePipe } from '../../../Core/Pipes/genre.pipe';
import { Route, Router, RouterLink } from '@angular/router';
import { routes } from '../../../app.routes';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AutoCompleteModule,
    RatingModule,
    FormsModule,
    CommonModule,
    FloatLabelModule,
    InputTextModule,
    ImgPrefixPipe,
    GenrePipe,
    RouterLink
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  constructor(private searchService: SearchService,private router:Router) {}
goToDetails(type: string,id: number) {
this.router.navigate(['/'+type ,id]).then(()=>location.reload())
}
  filteredMedia: SearchResult[] = [];
  searchControl = new FormControl();

  ngOnInit() {
    this.search();
  }

  private search() {
    this.searchControl.valueChanges
      .pipe(switchMap((searchValue) => this.searchService.search(searchValue)))
      .subscribe((val: SearchResponse) => {
        this.filteredMedia = val.results;
      });
  }
}
