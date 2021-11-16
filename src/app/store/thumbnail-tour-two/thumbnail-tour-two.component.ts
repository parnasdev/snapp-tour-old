import {Component, Input, OnInit} from '@angular/core';
import {TourInfoDTO} from "../../Core/Models/tourDTO";

@Component({
  selector: 'prs-thumbnail-tour-two',
  templateUrl: './thumbnail-tour-two.component.html',
  styleUrls: ['./thumbnail-tour-two.component.scss']
})
export class ThumbnailTourTwoComponent implements OnInit {

  @Input() tourInfo!: TourInfoDTO;

  constructor() { }

  ngOnInit(): void {
  }

  getStars(count: string): number[]{
    return Array.from(Array(+count).keys());
  }

}
