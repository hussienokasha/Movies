import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { SearchComponent } from '../search/search.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    SearchComponent,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    DropdownModule,
    DynamicDialogModule,

  ],
  providers:[DialogService],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  constructor(public dialogService: DialogService){}
  selectedLang = new FormControl('');
  langs: any = [
    { name: 'عربي', code: 'ar-EG' },
    { name: 'En', code: 'en-US' },
  ];
  openSearchDialog() {
    this.dialogService.open(SearchComponent, {
      width: '50%',
      height: '600px',
      breakpoints: {
        '960px': '75vw',  // 75% of the viewport width for screens smaller than 960px
        '640px': '90vw',  // 90% of the viewport width for screens smaller than 640px
        '540px': '95vw',  // Additional breakpoint for smaller screens
      },
      style: {
        maxHeight: '90vh', // Ensures the dialog doesn't exceed 90% of the viewport height
        overflow: 'auto',  // Enables scrolling within the dialog if content overflows
      },
    });
  }
}
