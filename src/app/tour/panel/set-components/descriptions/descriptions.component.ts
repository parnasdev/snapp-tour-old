import { Component, OnInit } from '@angular/core';
import { SetTourService } from '../../set-tour.service';



@Component({
  selector: 'prs-descriptions',
  templateUrl: './descriptions.component.html',
  styleUrls: ['./descriptions.component.scss']
})
export class DescriptionsComponent implements OnInit {


  constructor(public setService: SetTourService) {
  }


  ngOnInit() {

  }
}