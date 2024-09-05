import { Component, output } from '@angular/core';
import { TvService, tvType } from '../../../Core/Services/tv.service';
import { TvResults } from '../../../Core/Models/tv-results';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GenrePipe } from '../../../Core/Pipes/genre.pipe';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-tv',
  standalone: true,
  imports: [RouterLink, GenrePipe, SkeletonModule],
  templateUrl: './tv.component.html',
  styleUrl: './tv.component.scss',
})
export class TvComponent {
  constructor(private tv: TvService, private activeRoute: ActivatedRoute,private router:Router) {}
  totalResult = output<number>();
  resultPerPage = output<number>();
  category = output<tvType>();
  selectedType: tvType = 'popular';
  pageNum!: number;
  tvList: TvResults | undefined;

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params) => {
      this.pageNum = +params['page'] || 1;
      this.selectedType = params['cat'] || 'popular';
      this.getAllTvShows(this.selectedType, this.pageNum);
    });
  }

  getAllTvShows(type: tvType, page: number) {
    this.tv.getTvShows(type,page).subscribe({
      next: (val: TvResults) => {
        this.tvList = val;
        this.totalResult.emit(this.tvList.total_results);
        this.resultPerPage.emit(this.tvList.results.length);
      },
    });
  }

  onRadioChange(type: tvType) {
    this.selectedType = type;
    this.category.emit(type);
    this.router.navigate([], {
      queryParams: { page: 1, cat: this.selectedType },
    });
    this.getAllTvShows(type,this.pageNum);
  }
}
