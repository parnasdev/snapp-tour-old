import {Component, Input, OnInit} from '@angular/core';
import {TourListResDTO} from "../../Core/Models/tourDTO";

@Component({
  selector: 'prs-thumbnail-tour',
  templateUrl: './thumbnail-tour.component.html',
  styleUrls: ['./thumbnail-tour.component.scss']
})
export class ThumbnailTourComponent implements OnInit {

  @Input() tours: TourListResDTO[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
