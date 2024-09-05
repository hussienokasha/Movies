import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TvDetails } from '../../../Core/Models/tv-details';
import { TvService } from '../../../Core/Services/tv.service';
import { CastComponent } from "../../Components/cast/cast.component";
import { RecommendationComponent } from "../../Components/recommendation/recommendation.component";
import { ImgPrefixPipe } from "../../../Core/Pipes/img-prefix.pipe";

@Component({
  selector: 'app-tv-details',
  standalone: true,
  imports: [CastComponent, RecommendationComponent, ImgPrefixPipe],
  templateUrl: './tv-details.component.html',
  styleUrl: './tv-details.component.scss',
})
export class TvDetailsComponent {

  constructor(private activeRoute: ActivatedRoute,private tv:TvService) {}
  tvId: number | undefined;
  tvDetails: TvDetails | undefined;
  ngOnInit() {
    this.tvId = this.activeRoute.snapshot.params['id'];
    this.getTvDetails(this.tvId!);

  }

  getTvDetails(id:number){
    this.tv.getTvDetails(this.tvId!).subscribe({
      next:(val:TvDetails)=>{
        this.tvDetails = val;
      }
    })
  }
  showTrailerDialog() {
  
    }
}
