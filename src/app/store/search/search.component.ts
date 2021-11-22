import {Component, OnInit} from '@angular/core';
import {CityApiService} from "../../Core/Https/city-api.service";
import {CityListRequestDTO, CityResponseDTO} from "../../Core/Models/cityDTO";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorsService} from "../../Core/Services/errors.service";
import {CheckErrorService} from "../../Core/Services/check-error.service";
import {MessageService} from "../../Core/Services/message.service";
import {CalenderServices} from "../../Core/Services/calender-service";
import {Router} from "@angular/router";

@Component({
  selector: 'prs-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  cities: CityResponseDTO[] = [];
  cityReq!: CityListRequestDTO;
  cityFC = new FormControl('', Validators.required);
  dateFC = new FormControl(new Date());
  Loading = false;
  date = '';

  constructor(public cityApiService: CityApiService,
              public router: Router,
              public checkErrorService: CheckErrorService,
              public message: MessageService,
              public calendarService: CalenderServices,
              public errorService: ErrorsService) {
  }

  ngOnInit(): void {
    this.getCities();
  }

  getCities(): void {
    this.cityReq = {
      type: null,
      perPage: 20,
      search: null,
      hasTour: true,
      hasHotel: false,
    }
    this.cityApiService.getCities(this.cityReq).subscribe((res: any) => {
      if (res.isDone) {
        this.cities = res.data
      } else {
        this.message.custom(res.message);
      }
      this.Loading = false;
    }, (error: any) => {
      this.Loading = false;
      this.message.error();
      this.checkErrorService.check(error);
    });
  }

  cityChanged(): void {
  }

  search() {
    this.router.navigate(['tours/' + this.cityFC.value]);
  }

}
