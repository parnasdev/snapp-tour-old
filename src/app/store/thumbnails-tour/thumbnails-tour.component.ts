import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TourListResDTO} from "../../Core/Models/tourDTO";
import {CalenderServices} from "../../Core/Services/calender-service";

@Component({
  selector: 'prs-thumbnails-tour',
  templateUrl: './thumbnails-tour.component.html',
  styleUrls: ['./thumbnails-tour.component.scss']
})
export class ThumbnailsTourComponent implements OnInit {
@Input() call = false;
  @Input() tours: TourListResDTO[] = [];
  @Input() sortByDate = false;

  constructor(public calenderServices: CalenderServices) { }


  ngOnInit(): void {
  }

}
