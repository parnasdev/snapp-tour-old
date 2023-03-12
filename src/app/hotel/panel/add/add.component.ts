import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { HotelApiService } from "../../../Core/Https/hotel-api.service";
import { MessageService } from "../../../Core/Services/message.service";
import { CommonApiService } from "../../../Core/Https/common-api.service";
import { SessionService } from "../../../Core/Services/session.service";
import { CalenderServices } from "../../../Core/Services/calender-service";
import { PublicService } from "../../../Core/Services/public.service";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { MapApiService } from "../../../Core/Https/map-api.service";
import { MapReverseDTO } from "../../../Core/Models/mapDTO";
import { CityDTO, CityListRequestDTO, CityResponseDTO } from "../../../Core/Models/cityDTO";
import { HotelSetRequestDTO, ServiceDTO } from "../../../Core/Models/hotelDTO";
import { CityApiService } from "../../../Core/Https/city-api.service";
import { MatDialog } from "@angular/material/dialog";
import { ErrorsService } from "../../../Core/Services/errors.service";
import { CheckErrorService } from "../../../Core/Services/check-error.service";
import { UploadResDTO } from 'src/app/agencies/edit/edit.component';

@Component({
  selector: 'prs-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  aparatFC = new FormControl('');
  youtubeFC = new FormControl('');
  currentStar = 0;
  lat = 0;
  lng = 0;
  reverseAddressData!: MapReverseDTO;
  cities: CityDTO[] = [];
  citiesResponse: CityResponseDTO[] = []
  cityTypeFC = new FormControl(true)
  public show = true;
  req: HotelSetRequestDTO = {
    name: '',
    nameEn: '',
    slug: '',
    slugEn: '',
    city_id: '',
    mediaLink: [],
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
  isLoading = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    public checkError: CheckErrorService,
    public errorService: ErrorsService,
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

  //formGroup
  hotelForm = this.fb.group({
    name: new FormControl('', [Validators.required]),
    nameEn: new FormControl('', [Validators.required]),
    city: new FormControl('', Validators.required),
    status: new FormControl('Show', Validators.required),
    location: new FormControl(''),
    address: new FormControl(''),
    body: new FormControl(''),
    stars: new FormControl(''),
  });


  ngOnInit(): void {
    this.errorService.clear();
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
        this.hotelForm.value.address.setValue(res.address_compact)
      } else {
        this.hotelForm.value.address.setValue('')
        this.lat = this.cities[0].coordinates[1];
        this.lng = this.cities[0].coordinates[0];
        this.message.showMessageBig('این استان پشتیبانی نمیشود')
        this.reload()
      }
    })
  }

  setReq(): void {
    this.req = {
      name: this.hotelForm.value.name,
      nameEn: this.hotelForm.value.nameEn,
      slug: this.hotelForm.value.name.replace(' ', '-'),
      slugEn: this.hotelForm.value.nameEn.replace(' ', '-'),
      city_id: this.hotelForm.value.city,
      stars: this.currentStar,
      mediaLink: [{ name: 'aparat', link: this.aparatFC.value },
      { name: 'youtube', link: this.youtubeFC.value }],
      location: this.hotelForm.value.location,
      address: this.hotelForm.value.address,
      coordinate: {
        lat: this.lat,
        lng: this.lng
      },
      thumbnail: this.thumbnail,
      images: this.images,
      body: this.hotelForm.value.body,
      services: [
        {
          name: 'GroupName',
          ids: this.serviceIDs
        }
      ],
      status: this.hotelForm.value.status,
    }
  }

  getCities(): void {
    const req: CityListRequestDTO = {
      type: this.cityTypeFC.value,
      hasHotel: false,
      hasDestTour: false,
      hasOriginTour: false,
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

  cityTypeChange(): void {
    this.lat = 0;
    this.lng = 0;
    this.getCities()
  }

  reload() {
    this.show = false;
    setTimeout(() => this.show = true);
  }

  getFiles(result: UploadResDTO[]): void {
    this.images = [];
    result.forEach(file => {
      this.getImage(file.path);
    });
  }

  getImage(imageStr: string): void {
    this.images.push(imageStr)
  }

  getThumbnail(image: UploadResDTO): void {
    this.thumbnail = image.path;
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

  getDescriptionFromEditor(body: any): void {
    this.hotelForm.controls['body'].setValue(body);
  }

  markFormGroupTouched(formGroup: any) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  add(): void {
    this.setReq()
    this.hotelApi.add(this.req).subscribe((res: any) => {
      if (res.isDone) {
        this.message.showMessageBig(res.message);
        // this.router.navigateByUrl('panel/hotel/list')
      } else {
        this.message.custom(res.message)
      }
    }, (error: any) => {
      if (error.status == 422) {
        this.errorService.recordError(error.error.data);
        this.markFormGroupTouched(this.hotelForm);
        this.message.showMessageBig('اطلاعات ارسال شده را مجددا بررسی کنید')
      } else {
        this.message.showMessageBig('مشکلی رخ داده است لطفا مجددا تلاش کنید')
      }
      this.checkError.check(error);
    })
  }

  getServicesResult(services: any): void {
    this.serviceIDs = [];
    services.forEach((x: any) => {
      this.serviceIDs.push(x.id.toString());
    })
  }


}
