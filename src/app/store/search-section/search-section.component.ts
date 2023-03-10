import { Component, OnInit } from '@angular/core';
import { MessageService } from "../../Core/Services/message.service";
import { Router } from "@angular/router";
import { ResponsiveService } from 'src/app/Core/Services/responsive.service';


@Component({
  selector: 'prs-search-section',
  templateUrl: './search-section.component.html',
  styleUrls: ['./search-section.component.scss']
})
export class SearchSectionComponent implements OnInit {
  rnd = 0
  isMobile = false;
  constructor(
    public router: Router,
    public mobileService: ResponsiveService,
    public message: MessageService) {
    this.isMobile = mobileService.isMobile();
  }

  ngOnInit(): void {
  }

  search(result:any) {
    this.router.navigate([`/tours/`], {
      queryParams: result
    })
  }



}
