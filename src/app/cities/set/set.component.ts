import {Component, OnInit} from '@angular/core';
import {CityApiService} from "../../Core/Https/city-api.service";
import {MessageService} from "../../Core/Services/message.service";
import {CitySetRequestDTO} from "../../Core/Models/cityDTO";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'prs-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.scss']
})
export class SetComponent implements OnInit {
  req: CitySetRequestDTO = {
    data: {
      description: '',
      images: []
    },
    name: '',
    type: false
  }
  nameFC = new FormControl();
  desFC = new FormControl();
  isLoading = false;
  constructor(public api: CityApiService,
              public message: MessageService) {
  }

  ngOnInit(): void {
  }


  submit(): void {
    this.setReq()
    this.isLoading = true;
    this.api.add(this.req).subscribe((res: any) => {
      this.isLoading = false;
      if (res.isDone) {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.isLoading = false;
    })
  }

  setReq(): void {
    this.req = {
      data: {
        description: this.desFC.value,
        images: []
      },
      name: this.nameFC.value,
      type: false
    }
  }
  getFile(file: any):void {

  }
}
