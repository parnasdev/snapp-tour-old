import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {MessageService} from "../../Core/Services/message.service";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {CityListRequestDTO, CityResponseDTO} from "../../Core/Models/cityDTO";
import {CityApiService} from "../../Core/Https/city-api.service";

@Component({
  selector: 'prs-select-city',
  templateUrl: './select-city.component.html',
  styleUrls: ['./select-city.component.scss']
})
export class SelectCityComponent implements OnInit {
  @Output() citySelected = new EventEmitter()
  @Input() cities: CityResponseDTO[] = []

  @Input() callCity: boolean = false;
  @Input() inCommingCity: any

  constructor(
    public cityApi: CityApiService,
    public message: MessageService) {
  }

  cityFC = new FormControl();
  filteredOptions!: Observable<CityResponseDTO[]>;

  ngOnInit() {
    this.filteredOptions = this.cityFC.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): CityResponseDTO[] {
    const filterValue = value.toLowerCase();

    return this.cities.filter(city => city.name.toLowerCase().includes(filterValue));
  }

  changed(item: any): void {
    this.citySelected.emit(item)

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.inCommingCity) {
      this.cityFC.setValue(this.inCommingCity.name)
    }

    if (this.callCity) {
      this.getCities()
    }
  }

  getCities(): void {
    const req: CityListRequestDTO = {
      type: null,
      hasHotel: true,
      hasTour: false,
      search: null,
      perPage: 20
    }
    this.cityApi.getCities(req).subscribe((res: any) => {
      if (res.isDone) {
        this.cities = res.data;
      }
    }, (error: any) => {
      this.message.error()
    })
  }

}
