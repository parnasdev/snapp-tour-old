import {Component, Input, OnInit} from '@angular/core';
import {TourListResDTO} from "../../Core/Models/tourDTO";
import {CalenderServices} from "../../Core/Services/calender-service";

@Component({
  selector: 'prs-thumbnails-tour',
  templateUrl: './thumbnails-tour.component.html',
  styleUrls: ['./thumbnails-tour.component.scss']
})
export class ThumbnailsTourComponent implements OnInit {

  @Input() tours: TourListResDTO[] = [];
  @Input() city: string = '';

  constructor(public calenderServices: CalenderServices) { }

  ngOnInit(): void {
  }

}
