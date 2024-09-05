import { Component } from '@angular/core';
import { Person } from '../../../Core/Models/person';
import { CommonModule } from '@angular/common';
import { PeopleService } from '../../../Core/Services/people.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GenderPipe } from '../../../Core/Pipes/gender.pipe';
import { ImgPrefixPipe } from '../../../Core/Pipes/img-prefix.pipe';
import { PersonSocial } from '../../../Core/Models/person-social';
import { PersonCombined } from '../../../Core/Models/person-combined';
import { CarouselModule } from 'primeng/carousel';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-person-details',
  standalone: true,
  imports: [CommonModule, GenderPipe, ImgPrefixPipe,CarouselModule,SkeletonModule,RouterLink],
  templateUrl: './person-details.component.html',
  styleUrl: './person-details.component.scss',
})
export class PersonDetailsComponent {
  personDetails!: Person;
  personSocials!: PersonSocial;
  personCombined!: PersonCombined[];
  personId: any;
  movies: any[] = [];
  constructor(private person: PeopleService, private route: ActivatedRoute) {}
  ngOnInit() {
    this.personId = this.route.snapshot.params['id'];
    this.getPersonDetails(this.personId);
    this.getPersonSocial(this.personId);
    this.getPersonCombined(this.personId);
  }
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 5,
      numScroll: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: '600px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '480px',
      numVisible: 2,
      numScroll: 1,
    },
  ];
  getPersonDetails(personId: number) {
    this.person.getPersonDetails(personId).subscribe({
      next: (data: Person) => {
        this.personDetails = data;
      },
    });
  }
  getPersonCombined(personId: number) {
    this.person.getPersonCombined(personId).subscribe({
      next: (val: PersonCombined[]) => {
        this.personCombined = val;
      },
    });
  }
  getPersonSocial(personId: number) {
    this.person.getPersonSocial(personId).subscribe({
      next: (val: PersonSocial) => {
        this.personSocials = val;
      },
    });
  }
}
