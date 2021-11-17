import {Component, Input, OnInit} from '@angular/core';
import {TourInfoDTO, TourPackageDTO} from "../../Core/Models/tourDTO";

@Component({
  selector: 'prs-thumbnail-tour-two',
  templateUrl: './thumbnail-tour-two.component.html',
  styleUrls: ['./thumbnail-tour-two.component.scss']
})
export class ThumbnailTourTwoComponent implements OnInit {

  @Input() packages: TourPackageDTO[] = [];
  @Input() tourType = false;
  @Input() defineTour = false;

  constructor() { }

  ngOnInit(): void {
  }

  getStars(count: string): number[]{
    return Array.from(Array(+count).keys());
  }

}
