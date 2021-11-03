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
import {CityDTO, CityListRequestDTO, CityResponseDTO, MapCityResponseDTO} from "../../../Core/Models/cityDTO";
import {HotelSetRequestDTO, ServiceDTO} from "../../../Core/Models/hotelDTO";
import {CityApiService} from "../../../Core/Https/city-api.service";
import {MatDialog} from "@angular/material/dialog";
import {UploadSingleComponent} from "../../../common-project/upload-single/upload-single.component";

@Component({
  selector: 'prs-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  nameFC = new FormControl('تست نام هتل');
  nameEnFC = new FormControl('test-name-hotel');
  cityFC = new FormControl('1');
  statusFC = new FormControl('show');
  locationFC = new FormControl('تهرانپارس');
  addressFC = new FormControl('باقری 182 غربی پلاک 1');
  bodyFC = new FormControl('تست توضیحات');
  currentStar = 0;
  lat = 0;
  lng = 0;
  reverseAddressData!: MapReverseDTO;
  cities: CityDTO[] = [];
  citiesResponse: CityResponseDTO[] = []

  public show = true;
  req: HotelSetRequestDTO = {
    name: '',
    nameEn: '',
    slug: '',
    slugEn: '',
    city_id: '',
    stars: 3,
    location: '',
    address: '',
    coordinate: {
      lat: 0,
      lng: 0
    },
    thumbnail: '',
    images: [],
    body: '',
    services: [
      {
        name: '',
        ids: []
      }
    ],
    status: ''
  }
  images: any[] = [];
  thumbnail = ''
  services: ServiceDTO[] = []
  serviceIDs: string[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              public cityApiService: CityApiService,
              public hotelApi: HotelApiService,
              public message: MessageService,
              public commonApi: CommonApiService,
              public dialog: MatDialog,
              public session: SessionService,
              public calenderServices: CalenderServices,
              public publicServices: PublicService,
              public mapApi: MapApiService,
              public fb: FormBuilder) {
  }


  ngOnInit(): void {
    this.getServices();
    this.getCities()
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
        this.addressFC.setValue(res.address_compact)
      } else {
        this.addressFC.setValue('')
        this.lat = this.cities[0].coordinates[1];
        this.lng = this.cities[0].coordinates[0];
        this.message.showMessageBig('این استان پشتیبانی نمیشود')
        this.reload()
      }
    })
  }

  setReq(): void {
    this.req = {
      name: this.nameFC.value,
      nameEn: this.nameEnFC.value,
      slug: this.nameFC.value.replace(' ', '-'),
      slugEn: this.nameEnFC.value.replace(' ', '-'),
      city_id: this.cityFC.value,
      stars: this.currentStar,
      location: this.locationFC.value,
      address: this.addressFC.value,
      coordinate: {
        lat: this.lat,
        lng: this.lng
      },
      thumbnail: this.thumbnail,
      images: [],
      body: this.bodyFC.value,
      services: [
        {
          name: 'GroupName',
          ids: this.serviceIDs
        }
      ],
      status: this.statusFC.value
    }
  }

  getCities(): void {
    const req: CityListRequestDTO = {
      type: true,
      hasHotel: false,
      hasTour: false,
      search: null,
      perPage: 20
    }
    this.cityApiService.getCities(req).subscribe((res: any) => {
      if (res.isDone) {
        this.citiesResponse = res.data;
      }
    }, (error: any) => {
      this.message.error()
    })
  }


  reload() {
    this.show = false;
    setTimeout(() => this.show = true);
  }

  //
  // getThumbnail(imageStr: string): void {
  //   this.thumbnail = imageStr
  // }

  getImage(imageStr: string): void {
    this.images.push(imageStr)
  }

  getServices(): void {
    this.hotelApi.getServices().subscribe((res: any) => {
      if (res.isDone) {
        this.services = res.data;
      } else {
        this.message.custom(res.message)
      }
    }, (error: any) => {
      this.message.error()

    })
  }

  add(): void {
    this.setReq()
    console.log(this.req)
    this.hotelApi.add(this.req).subscribe((res: any) => {
      if (res.isDone) {
        this.message.showMessageBig(res.message);
        this.router.navigateByUrl('hotel/list')
      } else {
        this.message.custom(res.message)
      }
    }, (error: any) => {
      this.message.error()

    })
  }

  getServicesResult(services: any): void {
    this.serviceIDs = [];
    services.forEach((x: any) => {
      this.serviceIDs.push(x.id.toString());
    })
  }

  getThumbnail(): void {
    const dialog = this.dialog.open(UploadSingleComponent, {});
    dialog.afterClosed().subscribe(result => {
      console.log(result);
      this.thumbnail = result
    })
  }
}
