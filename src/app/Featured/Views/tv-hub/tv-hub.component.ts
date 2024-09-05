import { Component } from '@angular/core';
import { TvDetailsComponent } from "../tv-details/tv-details.component";
import { TvComponent } from "../../Components/tv/tv.component";
import { PaginatorModule } from 'primeng/paginator';
import { tvType } from '../../../Core/Services/tv.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tv-hub',
  standalone: true,
  imports: [TvDetailsComponent, TvComponent,PaginatorModule],
  templateUrl: './tv-hub.component.html',
  styleUrl: './tv-hub.component.scss'
})
export class TvHubComponent {
  constructor(private router: Router, private acRou: ActivatedRoute) {
    this.acRou.queryParams.subscribe((params) => {
    
      this.pageNum = params['page'] || 1;
    });
  }

  pageNum: number = 1;
  totalResult!: number;
  resultPerPage!: number;
  selectedType: tvType = 'popular';

  changePage(event: any) {
    this.pageNum = +event.page + 1;
    this.router.navigate([], {
      queryParams: { page: this.pageNum, cat: this.selectedType },
    });
  }
  getTotalResult(val: number) {
    this.totalResult = val;
  }
  getResultPerPage(val: number) {
    this.resultPerPage = val;
  }
  getTvCat(v: tvType) {
    this.selectedType = v;
  }

}
