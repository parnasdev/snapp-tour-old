import { Component, OnInit } from '@angular/core';
import { HotelApiService } from "../../Core/Https/hotel-api.service";
import { MessageService } from "../../Core/Services/message.service";
import { CityApiService } from "../../Core/Https/city-api.service";
import { CommonApiService } from "../../Core/Https/common-api.service";
import { SessionService } from "../../Core/Services/session.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Lightbox } from "ng-gallery/lightbox";
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery';
import { MatDialog } from "@angular/material/dialog";
import { PopupVideoComponent } from "../../common-project/popup-video/popup-video.component";
import { Title } from "@angular/platform-browser";
import { SettingService } from "../../Core/Services/setting.service";
import { CalenderServices } from 'src/app/Core/Services/calender-service';
import { TourApiService } from 'src/app/Core/Https/tour-api.service';
import { ResponsiveService } from 'src/app/Core/Services/responsive.service';
import { RoomTypePriceDTO } from 'src/app/Core/Models/roomTypeDTO';
import { ShowRoomsPopupComponent } from 'src/app/room-type/show-rooms-popup/show-rooms-popup.component';
import { AuthPopupComponent } from 'src/app/auth/auth-popup/auth-popup.component';
import { hotelInfoReqDTO, hotelInfoV2DTO } from 'src/app/Core/Models/hotelDTO';
import { CityResponseDTO } from 'src/app/Core/Models/cityDTO';
import { RateDTO, hotelRates, newTourPackageInfoDTO } from 'src/app/Core/Models/tourDTO';
import * as moment from 'moment';

@Component({
  selector: 'prs-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  isLoading = false
  isMobile = false;
  isTablet = false;
  isDesktop = false;
  clicked = false;
  galleryId = 'myLightbox';
  imgs = ['https://www.imgonline.com.ua/examples/bee-on-daisy.jpg',
    'https:http://tour-api.parnasweb.com///source///images///2021///46366665.jpg']
  items: GalleryItem[] = [];
  hotelInfo: hotelInfoV2DTO = {
    address: null,
    body: '',
    city: {} as CityResponseDTO,
    coordinate: {
      lat: 0,
      lng: 0
    },
    images: [],
    images_paths: [],
    location: '',
    rates: [],
    mediaLink: [],
    name: '',
    nameEn: '',
    packages: [],
    roomPrices: [],
    services: [],
    stars: '',
    status: '',
    thumbnail: '',
    thumbnail_paths: '',
  };

  rooms: hotelRates[] = []

  stDate: string = '';
  night: string = '';
  origin: string = '';
  dest: string = '';

  hotelName = '';
  public lightbox!: Lightbox
  defineTour = true;

  minPrice = '';

  hotelInfoReq: hotelInfoReqDTO = {
    isAdmin: false,
    night: 0,
    stDate: null,
    origin: '',
    dest: ''

  }

  originCities: any[] = [];
  filterOriginCity: string = ''

  constructor(public hotelApi: HotelApiService,
    public route: ActivatedRoute,
    public router: Router,
    public title: Title,
    public setting: SettingService,
    public dialog: MatDialog,
    public gallery: Gallery,
    public calenderService: CalenderServices,
    public message: MessageService,
    public cityApiService: CityApiService,
    public commonApi: CommonApiService,
    public tourApi: TourApiService,
    public session: SessionService,
    public responsive: ResponsiveService
  ) {
    this.isMobile = responsive.isMobile();
    this.isTablet = responsive.isTablet();
    this.isDesktop = responsive.isDesktop();
  }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    // @ts-ignore
    this.hotelName = this.route.snapshot.paramMap.get('slug');
    this.route.queryParams
      .subscribe(params => {
        this.stDate = params.stDate ? this.calenderService.convertDateSpecial(params.stDate, 'en') : null
        this.night = params.night
        this.origin = params.origin
        this.dest = params.dest
      }
      );
    this.getInfo();

  }

  getInfo(): void {
    this.hotelInfoReq = {
      isAdmin: false,
      night: +this.night,
      stDate: this.stDate,
      origin: this.origin,
      dest: this.dest
    }
    this.isLoading = true;
    this.hotelApi.getHotelV2(this.hotelName, this.hotelInfoReq).subscribe((res: any) => {
      this.isLoading = false;
      if (res.isDone) {
        this.hotelInfo = res.data;
        this.getPrices();
        this.title.setTitle(this.hotelInfo.name + '|' + this.setting.settings.title)
        this.getStarterPrice();
        if (this.hotelInfo.images && this.hotelInfo.images.length > 0) {
          this.fillAlbum(this.hotelInfo.images)
        }
      } else {
        this.message.custom(res.message)
      }
    }, (error: any) => {
      this.isLoading = false;
      this.message.error()

    })
  }

  openMedia(data: any): void {
    const dialog = this.dialog.open(PopupVideoComponent, {
      data: {
        list: data,
        name: this.hotelInfo.name
      }
    })
  }

  fillAlbum(images: string[]): void {
    this.items = images.map(item => new ImageItem({ src: item, thumb: item }));
    const galleryRef = this.gallery.ref(this.galleryId);
    galleryRef.load(this.items);
    console.log(this.items)
  }

  getStars(count: string): number[] {
    return Array.from(Array(+count).keys());
  }

  checkReserve(packageId: number, transferRateId: number) {
    this.getReserve(packageId, transferRateId)
  }


  loginPopup(id: number, transferRateId: number): void {
    const dialog = this.dialog.open(AuthPopupComponent, {
      width: this.isMobile ? '95%' : '30%',
      maxWidth: this.isMobile ? '95%' : '30%',
      data: id,
    })
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.message.custom('ورود شما با موفقیت انجام شد')
        this.getReserve(id, transferRateId)
      }
    })
  }

  openRoom(rooms: RoomTypePriceDTO[]): void {
    const dialog = this.dialog.open(ShowRoomsPopupComponent, {
      width: this.isMobile ? '95%' : '30%',
      maxWidth: this.isMobile ? '95%' : '30%',

      data: rooms,
    })
    dialog.afterClosed().subscribe(result => {

    })
  }

  getReserve(packageId: number, transferRateId: number): void {
    this.clicked = true;
    const req = {
      package_id: packageId,
      transferRateId: transferRateId
    }
    this.tourApi.reserve(req).subscribe((res: any) => {
      if (res.isDone) {
        this.clicked = false;
        // this.message.custom(res.message);
        this.router.navigate(['/tours/info/' + res.data.reserve_id]);
      } else {
        this.clicked = false;
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.clicked = false;
      this.message.error()
    })
  }

  getStarterPrice() {
    let Prices: any = []

    this.hotelInfo.packages.forEach((item: newTourPackageInfoDTO, index: number) => {
      Prices.push(item.tour.newTransfers.sort(function (a: any, b: any) { return a.adl_price - b.adl_price })[0].adl_price + (+item.prices.twin))
    });
    return Prices.sort(function (a: any, b: any) { return a - b })[0]
  }

  getFullPrice(roomName: string, flighPrice: number) {
    let result = 0
    this.hotelInfo.rates.forEach((item: hotelRates) => {
      if (item.roomType.name === roomName) {
        result += item.price
      }
    })
    result = result + flighPrice;
    return result;
  }
  getPrices() {

    this.hotelInfo.rates.forEach((item: hotelRates) => {
      if (!this.rooms.find(x => x.roomType.name === item.roomType.name)) {
        this.rooms.push(item)
      }
    })
  }

}