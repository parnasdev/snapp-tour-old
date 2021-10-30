import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HotelApiService} from "../../../Core/Https/hotel-api.service";
import {MessageService} from "../../../Core/Services/message.service";
import {CommonApiService} from "../../../Core/Https/common-api.service";
import {SessionService} from "../../../Core/Services/session.service";
import {CalenderServices} from "../../../Core/Services/calender-service";
import {PublicService} from "../../../Core/Services/public.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {MapApiService} from "../../../Core/Https/map-api.service";
import {MapReverseDTO} from "../../../Core/Models/mapDTO";
import {CityDTO, CityResponseDTO, MapCityResponseDTO} from "../../../Core/Models/cityDTO";

@Component({
  selector: 'prs-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  status = false;

  lat = 0;
  lng = 0;
  reverseAddressData!: MapReverseDTO;
  citiesSource: MapCityResponseDTO[] = [];
  cities: CityDTO[] = [];
  addressFC = new FormControl('', Validators.required);
  provinceFC = new FormControl('', Validators.required);
  cityFC = new FormControl('', Validators.required);
  public show = true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public hotelApi: HotelApiService,
              public message: MessageService,
              public commonApi: CommonApiService,
              public session: SessionService,
              public calenderServices: CalenderServices,
              public publicServices: PublicService,
              public mapApi: MapApiService,
              public fb: FormBuilder) {
  }

  hotelForm = this.fb.group({
    name: new FormControl('هتل استقلال'),
    nameEn: new FormControl(''),
    slug: new FormControl(''),
    slugEn: new FormControl(''),
    city_id: new FormControl(''),
    stars: new FormControl(''),
    location: new FormControl(''),
    address: new FormControl(''),
    coordinate: new FormControl(),
    coor: {
      lat: 35.432,
      lng: 35.432,
    },
    body: new FormControl('test'),
    thumbnail: new FormControl('test'),
    images: this.fb.array([]),
    services: new FormControl(),
    servic: {
      name: "GroupName",
      ids: []
    },
    status: new FormControl('show'),
  });

  ngOnInit(): void {
  }

  getStatus(event: any) {
    this.status = event;
  }

  getLatLng(latLng: any): void {
    this.lat = latLng.lat;
    this.lng = latLng.lng;
    this.reverseAddress(latLng.token)
  }

  reverseAddress(token: string): void {
    this.mapApi.reverse(this.lat, this.lng, token).subscribe((res: any) => {
      if (res) {
        this.reverseAddressData = res

        if (this.checkCity().cities.length > 0) {
          this.provinceFC.setValue(this.checkCity().id.toString())
          this.provinceChanged()
          this.addressFC.setValue(res.address_compact)
          this.checkCity().cities.forEach(city => {
            if (city.name === this.reverseAddressData.city) {
              this.cityFC.setValue(city.id.toString())
            }
          })
        } else {
          this.addressFC.setValue('')
          this.provinceFC.setValue(this.citiesSource[0].id.toString())
          this.provinceChanged()
          this.lat = this.cities[0].coordinates[1];
          this.lng = this.cities[0].coordinates[0];
          this.message.showMessageBig('این استان پشتیبانی نمیشود')
          this.reload()
        }
      }
    })
  }

  provinceChanged(): void {
    debugger
    this.citiesSource.forEach((province: MapCityResponseDTO) => {
      if (province.id === +this.provinceFC.value) {
        this.cities = province.cities;
        this.cityFC.setValue(province.cities[0].id.toString())
      }
    });
    this.reload()
  }

  checkCity(): MapCityResponseDTO {
    let result: MapCityResponseDTO = {
      id: 0,
      name: '',
      cities: []
    }
    this.citiesSource.forEach(province => {
      if (province.name.split(' ')[1] === this.reverseAddressData.province) {
        result = province
      }
    })
    return result
  }

  cityChanged(): void {
    this.citiesSource.forEach((province: CityResponseDTO) => {
      this.cities.forEach(city => {
        if (city.id === +this.cityFC.value) {
          if (city.coordinates.length > 0) {
            this.lat = city.coordinates[1];
            this.lng = city.coordinates[0];
          }
        }
      })
    });
    this.reload()
  }

  reload() {
    this.show = false;
    setTimeout(() => this.show = true);
  }

}
