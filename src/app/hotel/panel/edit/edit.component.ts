import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {MapReverseDTO} from "../../../Core/Models/mapDTO";
import {CityDTO, CityListRequestDTO, CityResponseDTO} from "../../../Core/Models/cityDTO";
import {hotelInfoDTO, HotelSetRequestDTO} from "../../../Core/Models/hotelDTO";
import {ActivatedRoute, Router} from "@angular/router";
import {HotelApiService} from "../../../Core/Https/hotel-api.service";
import {MessageService} from "../../../Core/Services/message.service";
import {CommonApiService} from "../../../Core/Https/common-api.service";
import {SessionService} from "../../../Core/Services/session.service";
import {CalenderServices} from "../../../Core/Services/calender-service";
import {PublicService} from "../../../Core/Services/public.service";
import {MapApiService} from "../../../Core/Https/map-api.service";
import {CityApiService} from "../../../Core/Https/city-api.service";
import {UploadSingleComponent} from "../../../common-project/upload-single/upload-single.component";
import {MultipleUploadComponent} from "../../../common-project/multiple-upload/multiple-upload.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'prs-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  hotelName = '';
  hotelInfo!: hotelInfoDTO;
  serviceIDs: string[] = [];
  nameFC = new FormControl('');
  nameEnFC = new FormControl('');
  cityFC = new FormControl('');
  statusFC = new FormControl('Show');
  currentStar = 0;

  starFC = new FormControl('');
  locationFC = new FormControl('');
  addressFC = new FormControl('1');
  bodyFC = new FormControl('');
  cityTypeFC = new FormControl(true)
  lat = 0;
  lng = 0;
  reverseAddressData!: MapReverseDTO;
  cities: CityDTO[] = [];
  public show = true;
  showServices = false;
  citiesResponse: CityResponseDTO[] = []

  req: HotelSetRequestDTO = {
    name: '',
    nameEn: '',
    slug: '',
    slugEn: '',
    city_id: '',
    stars: 3,
    mediaLink: [],
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
  services: any[] = []
  isLoading = false;
  aparatFC = new FormControl();
  youtubeFC = new FormControl();

  constructor(private route: ActivatedRoute,
              private router: Router,
              public hotelApi: HotelApiService,
              public message: MessageService,
              public commonApi: CommonApiService,
              public cityApiService: CityApiService,
              public dialog: MatDialog,
              public session: SessionService,
              public calenderServices: CalenderServices,
              public publicServices: PublicService,
              public mapApi: MapApiService,
              public fb: FormBuilder) {
  }


  ngOnInit(): void {
    // @ts-ignore
    this.hotelName = this.route.snapshot.paramMap.get('slug');
    this.getInfo();

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
      stars: this.starFC.value,
      mediaLink: [{name: 'aparat', link: this.aparatFC.value}, {name: 'youtube', link: this.aparatFC.value}],

      location: this.locationFC.value,
      address: this.addressFC.value,
      coordinate: {
        lat: this.lat,
        lng: this.lng
      },
      thumbnail: this.thumbnail,
      images: this.images,
      body: this.bodyFC.value,
      services: [
        {
          name: 'GroupName',
          ids: [
            "2",
            "3"
          ]
        }
      ],
      status: this.statusFC.value
    }
  }

  cityTypeChange(): void {
    this.getCities()
  }

  reload() {
    this.show = false;
    setTimeout(() => this.show = true);
  }


  getImage(imageStr: string): void {
    this.images.push(imageStr)
  }

  getDescriptionFromEditor(body: any): void {
    this.bodyFC.setValue(body)
  }

  getServices(): void {
    this.showServices = false
    this.hotelApi.getServices().subscribe((res: any) => {
      if (res.isDone) {
        this.services = res.data
        this.setData()
        this.showServices = true

      } else {
        this.showServices = false

        this.message.custom(res.message)
      }
    }, (error: any) => {
      this.showServices = false
      this.message.error()

    })
  }

  edit(): void {
    this.setReq()
    this.hotelApi.edit(this.req, this.hotelName).subscribe((res: any) => {
      if (res.isDone) {
        this.message.custom(res.message);
        this.router.navigateByUrl('/panel/hotel/list')
      } else {
        this.message.custom(res.message)
      }
    }, (error: any) => {
      this.message.error()

    })
  }

  getInfo(): void {
    this.isLoading = true;
    this.hotelApi.getHotel(this.hotelName, true).subscribe((res: any) => {
      this.isLoading = false;
      if (res.isDone) {
        this.hotelInfo = res.data;
        this.currentStar = +this.hotelInfo.stars
        this.cityTypeFC.setValue(this.hotelInfo.city.type != 0)
        this.getCities()
        this.getServices()

      } else {
        this.message.custom(res.message)
      }
    }, (error: any) => {
      this.isLoading = false
      this.message.error()

    })
  }

  getCities(): void {
    const req: CityListRequestDTO = {
      type: this.cityTypeFC.value,
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

  setData(): void {
    this.nameFC.setValue(this.hotelInfo.name)
    this.nameEnFC.setValue(this.hotelInfo.nameEn)
    this.cityFC.setValue(+this.hotelInfo.city.id)
    this.statusFC.setValue(this.hotelInfo.status)
    this.starFC.setValue(this.hotelInfo.stars)
    this.locationFC.setValue(this.hotelInfo.location)
    this.addressFC.setValue(this.hotelInfo.address)
    this.bodyFC.setValue(this.hotelInfo.body)
    if (this.hotelInfo.mediaLink) {
      if (this.hotelInfo.mediaLink.length > 0) {
        this.aparatFC.setValue(this.hotelInfo.mediaLink[0].link)
        this.youtubeFC.setValue(this.hotelInfo.mediaLink[1].link)
      }
    }
    this.images = this.hotelInfo.images
    this.thumbnail = this.hotelInfo.thumbnail
    this.lat = this.hotelInfo.coordinate.lat
    this.lng = this.hotelInfo.coordinate.lng
    this.reload()
  }

  getThumbnail(): void {
    const dialog = this.dialog.open(UploadSingleComponent, {});
    dialog.afterClosed().subscribe(result => {
      this.thumbnail = result
    })
  }

  getServicesResult(services: any): void {
    this.serviceIDs = [];
    services.forEach((x: any) => {
      this.serviceIDs.push(x.id.toString());
    })
  }

  getImages(): void {
    const dialog = this.dialog.open(MultipleUploadComponent, {});
    dialog.afterClosed().subscribe((result: any[]) => {
      result.forEach(x => {
        this.images.push(x.path);
      })

    })
  }

  removeImage(index: any): void {
    this.images.splice(index, -1);
  }
}
