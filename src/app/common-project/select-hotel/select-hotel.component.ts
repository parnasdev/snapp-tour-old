import {Component, Input, OnInit, EventEmitter, Output, OnChanges, SimpleChanges} from '@angular/core';
import {HotelListResponseDTO, HotelRequestDTO} from "../../Core/Models/hotelDTO";
import {FormBuilder, FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {HotelApiService} from "../../Core/Https/hotel-api.service";
import {MessageService} from "../../Core/Services/message.service";


@Component({
  selector: 'prs-select-hotel',
  templateUrl: './select-hotel.component.html',
  styleUrls: ['./select-hotel.component.scss']
})
export class SelectHotelComponent implements OnInit,OnChanges {
  @Output() hotelSelected = new EventEmitter()
  @Input() hotels: any[] =  [];
  @Input() callHotel: boolean =  false;
  @Input() inCommingHotel : any

  constructor(
    public hotelApi: HotelApiService,
    public message: MessageService) {
  }
  hotelFC = new FormControl();
  filteredOptions!: Observable<HotelListResponseDTO[]>;

  ngOnInit() {
    this.filteredOptions = this.hotelFC.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): HotelListResponseDTO[] {
    const filterValue = value.toLowerCase();

    return this.hotels.filter(hotel => hotel.name.toLowerCase().includes(filterValue));
  }

  changed(item: any):void {
    this.hotelSelected.emit(item)

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.inCommingHotel) {
      this.hotelFC.setValue(this.inCommingHotel.name)
    }

    if (this.callHotel) {
      this.getHotels()
    }
  }

  getHotels(): void {
    const req: HotelRequestDTO = {
      isAdmin: true,
      paginate: false,
      city: null,
      search: null,
    }
    this.hotelApi.getHotels(req).subscribe((res: any) => {
      if (res.isDone) {
        this.hotels = res.data;
      }
    }, (error: any) => {
      this.message.error();
    })
  }
}
