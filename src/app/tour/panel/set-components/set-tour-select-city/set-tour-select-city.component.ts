import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { MatDialog } from '@angular/material/dialog';
import { ResponsiveService } from 'src/app/Core/Services/responsive.service';
import {CityResponseDTO } from 'src/app/Core/Models/cityDTO';
import { CityApiService } from 'src/app/Core/Https/city-api.service';
import { MessageService } from 'src/app/Core/Services/message.service';
import { SelectCityPopupComponent } from 'src/app/common-project/select-city-popup/select-city-popup.component';
import { SetTourService } from '../../set-tour.service';

@Component({
  selector: 'prs-set-tour-select-city',
  templateUrl: './set-tour-select-city.component.html',
  styleUrls: ['./set-tour-select-city.component.scss']
})
export class SetTourSelectCityComponent implements OnInit, OnChanges {
  @Output() citySelected = new EventEmitter()
  @Input() cities: CityResponseDTO[] = []
  @Input() hasHotel: boolean = false;
  @Input() hasOriginTour: boolean = false;
  @Input() type: number | null = null;
  @Input() city: number | null = null;
isMobile = false;
  @Input() hasDestTour: boolean = false;
  @Input() inCommingCity: any;
  @Input() title = 'شهر خود را وارد کنید';
  isLoading = false

  constructor(
    public cityApi: CityApiService,
    public dialog: MatDialog,
    public setService: SetTourService,
    public mobileService: ResponsiveService,
    public message: MessageService) {
      this.isMobile = mobileService.isMobile();
  }

  cityFC = new FormControl();
  filteredOptions!: Observable<CityResponseDTO[]>;

  ngOnInit() {
    // this.getCities();
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
    if (this.inCommingCity && this.inCommingCity !== '') {
      if (this.cities.filter(c => c.slugEn === this.inCommingCity.slugEn).length > 0) {
        this.cityFC.setValue(this.cities.filter(c => c.slugEn === this.inCommingCity.slugEn)[0].name)
        // this.citySelected.emit(this.cities.filter(c => c.slugEn === this.inCommingCity)[0])
      }
    }
  }



  openSelectCity() {
    const dialog = this.dialog.open(SelectCityPopupComponent, {
      data: {
        cities : this.cities
      }
    
    })
    dialog.afterClosed().subscribe(Result => {
      if (Result) {
        this.cityFC.setValue(Result.name)
        this.citySelected.emit(Result)
      }
    })
  }



}
