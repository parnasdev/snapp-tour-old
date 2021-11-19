import {Component, OnInit} from '@angular/core';
import {HotelApiService} from "../../Core/Https/hotel-api.service";
import {MessageService} from "../../Core/Services/message.service";
import {CityApiService} from "../../Core/Https/city-api.service";
import {CommonApiService} from "../../Core/Https/common-api.service";
import {SessionService} from "../../Core/Services/session.service";
import {hotelInfoDTO, ServiceDTO} from "../../Core/Models/hotelDTO";
import {ActivatedRoute, Router} from "@angular/router";
import {Lightbox} from "ng-gallery/lightbox";
import {Gallery, GalleryItem, ImageItem} from 'ng-gallery';

@Component({
  selector: 'prs-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  isLoading = false
  galleryId = 'myLightbox';
  imgs = ['https://www.imgonline.com.ua/examples/bee-on-daisy.jpg',
    'https:http://tour-api.parnasweb.com///source///images///2021///46366665.jpg']
  items: GalleryItem[] = [];
  hotelInfo!: hotelInfoDTO;
  hotelName = '';
  public lightbox!: Lightbox
  allServices: ServiceDTO[] = []
  hotelServices: ServiceDTO[] = []

  constructor(public hotelApi: HotelApiService,
              public route: ActivatedRoute,
              public router: Router,
              public gallery: Gallery,
              public message: MessageService,
              public cityApiService: CityApiService,
              public commonApi: CommonApiService,
              public session: SessionService,) {
  }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    // @ts-ignore
    this.hotelName = this.route.snapshot.paramMap.get('slug');
    this.getInfo();

  }

  getInfo(): void {
    this.isLoading = true;
    this.hotelApi.getHotel(this.hotelName, false).subscribe((res: any) => {
      this.isLoading = false;
      if (res.isDone) {
        this.hotelInfo = res.data;
        this.fillAlbum(this.hotelInfo.images)
        this.getServices();
      } else {
        this.message.custom(res.message)
      }
    }, (error: any) => {
      this.isLoading = false;
      this.message.error()

    })
  }


  getServices(): void {
    this.hotelApi.getServices().subscribe((res: any) => {
      if (res.isDone) {
        this.allServices = res.data;
        this.fillServices()
      } else {
        this.message.custom(res.message)
      }
    }, (error: any) => {
      this.message.error()
    })
  }

  fillServices(): void {
    this.allServices.forEach(x => {
      this.hotelInfo.services[0].ids.forEach(y => {
        if (x.id === +y) {
          this.hotelServices.push(x)
        }
      })
    })
  }

  fillAlbum(images: string[]): void {
    this.items = images.map(item => new ImageItem({src: item, thumb: item}));
    const galleryRef = this.gallery.ref(this.galleryId);
    galleryRef.load(this.items);
    console.log(this.items)
  }

  getStars(count: string): number[] {
    return Array.from(Array(+count).keys());
  }

}
