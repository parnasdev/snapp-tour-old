import {Component, OnInit} from '@angular/core';
import { SetTourService } from '../set-tour.service';

@Component({
  selector: 'prs-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  //public Variable
  isLoading = false;


  constructor(
    public setService: SetTourService) {
      setService.removeRequestObject()  }



  ngOnInit() {

  }

  submit() {

  }
}