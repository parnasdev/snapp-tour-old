import { Component, Input, OnInit } from '@angular/core';
import { CityDTO } from 'src/app/Core/Models/cityDTO';
import { CityTourInfoDTO, TourListResDTO } from 'src/app/Core/Models/tourDTO';
import { CalenderServices } from 'src/app/Core/Services/calender-service';

@Component({
  selector: 'prs-horizontal-thumbnail-tour',
  templateUrl: './horizontal-thumbnail-tour.component.html',
  styleUrls: ['./horizontal-thumbnail-tour.component.scss']
})
export class HorizontalThumbnailTourComponent implements OnInit {
  @Input() tour: TourListResDTO = {
    title: '',
    createdAt: '',
    dayNum: 0,
    endCity: {} as CityTourInfoDTO,
    expireDate: '',
    minPrice: '',
    nightNum: 0,
    offered: '',
    slug: '',
    transfers: [],
    stCity: {} as CityDTO,
    status: '',
    user: {
      name: '',
      family: '',
    },
    viewCount: 0,
  };

  constructor(public calenderServices: CalenderServices) { }

  ngOnInit(): void {
  }

}
