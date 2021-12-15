import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
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
export class SelectCityComponent implements OnInit, OnChanges {
  @Output() citySelected = new EventEmitter()
  @Input() cities: CityResponseDTO[] = []

  @Input() callCity: boolean = false;
  @Input() hasHotel: boolean = false;
  @Input() hasTour: boolean = false;
  @Input() inCommingCity: any
  isLoading = false

  constructor(
    public cityApi: CityApiService,
    public message: MessageService) {
  }

  cityFC = new FormControl();
  filteredOptions!: Observable<CityResponseDTO[]>;

  ngOnInit() {

  }

  private _filter(value: string): CityResponseDTO[] {
    const filterValue = value.toLowerCase();

    return this.cities.filter(city => city.name.toLowerCase().includes(filterValue));
  }

  changed(item: any): void {
    this.citySelected.emit(item)

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filteredOptions = this.cityFC.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
    console.log(changes)
    if (changes.inCommingCity && changes.inCommingCity.currentValue) {
      this.cityFC.setValue(this.inCommingCity.name)
    }

    if (this.callCity) {
      this.getCities()
    }
  }

  getCities(): void {
    this.isLoading = true
    const req: CityListRequestDTO = {
      type: null,
      hasHotel: this.hasHotel,
      hasTour: this.hasTour,
      search: null,
      perPage: 20
    }
    this.cityApi.getCities(req).subscribe((res: any) => {
      this.isLoading = false
      if (res.isDone) {
        this.cities = res.data;
        this.filteredOptions = this.cityFC.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value)),
        );
      }
    }, (error: any) => {
      this.isLoading = false
      this.message.error()
    })
  }

}
