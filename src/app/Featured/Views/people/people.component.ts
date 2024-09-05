import { Component } from '@angular/core';
import { People } from '../../../Core/Models/people';
import { PeopleService } from '../../../Core/Services/people.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ImgPrefixPipe } from '../../../Core/Pipes/img-prefix.pipe';
import { TooltipModule } from 'primeng/tooltip';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [RouterLink, ImgPrefixPipe, TooltipModule, PaginatorModule],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss',
})
export class PeopleComponent {

  totalResult: unknown;
  resultPerPage: any;

  people!: People;
  pageNum: number = 1;
  constructor(private pepol: PeopleService,private activeRoute:ActivatedRoute,private router:Router) {}
  ngOnInit() {
    this.fetchPeople(this.pageNum);
    this.activeRoute.queryParams.subscribe({next:(param)=>{
      this.pageNum = param['page'] || 1;
      this.fetchPeople(this.pageNum);
    }})
  }
  fetchPeople(page: number) {
    this.pepol.getPeople(page).subscribe({
      next: (val: People) => {
        this.people = val;
      },
    });
  }
  changePage(event: any) {
    this.pageNum = +event.page + 1;
    this.router.navigate([], { queryParams: { page: this.pageNum } });
    this.fetchPeople(this.pageNum);
  }
}
