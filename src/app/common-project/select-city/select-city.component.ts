import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MessageService } from "../../Core/Services/message.service";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { CityListRequestDTO, CityResponseDTO } from "../../Core/Models/cityDTO";
import { CityApiService } from "../../Core/Https/city-api.service";

@Component({
  selector: 'prs-select-city',
  templateUrl: './select-city.component.html',
  styleUrls: ['./select-city.component.scss']
})
export class SelectCityComponent implements OnInit, OnChanges {
  @Output() citySelected = new EventEmitter()
  @Input() cities: CityResponseDTO[] = []
  @Input() hasHotel: boolean = false;
  @Input() hasOriginTour: boolean = false;
  @Input() type: number | null = null;
  @Input() hasDestTour: boolean = false;
  @Input() inCommingCity: any
  isLoading = false

  constructor(
    public cityApi: CityApiService,
    public message: MessageService) {
  }

  cityFC = new FormControl();
  filteredOptions!: Observable<CityResponseDTO[]>;

  ngOnInit() {
    this.getCities();
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


  }

  getCities(): void {
    this.isLoading = true
    const req: CityListRequestDTO = {
      type: this.type,
      hasHotel: this.hasHotel,
      hasOriginTour: this.hasOriginTour,
      hasDestTour: this.hasDestTour,
      search: null,
      perPage: 20
    }
    this.cityApi.getCities(req).subscribe((res: any) => {
      this.isLoading = false
      if (res.isDone) {
        this.cities = res.data;
        if (this.inCommingCity && this.inCommingCity !== '') {
          console.log(this.inCommingCity)
          if(this.cities.filter(c => c.slugEn === this.inCommingCity).length > 0) {
            this.cityFC.setValue(this.cities.filter(c => c.slugEn === this.inCommingCity)[0].name)
          }
        }
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
