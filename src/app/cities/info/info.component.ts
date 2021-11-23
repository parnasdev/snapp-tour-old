import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {CityApiService} from "../../Core/Https/city-api.service";
import {MessageService} from "../../Core/Services/message.service";
import {Gallery, GalleryItem, ImageItem} from "ng-gallery";
import {CityInfoResDTO, CityListRequestDTO, CityResponseDTO} from "../../Core/Models/cityDTO";
import {TourListRequestDTO, TourListResDTO} from "../../Core/Models/tourDTO";
import {TourApiService} from "../../Core/Https/tour-api.service";
import {endWith} from "rxjs/operators";
import {FormControl} from "@angular/forms";

declare let $: any;

@Component({
  selector: 'prs-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  city = ''
  info!: CityInfoResDTO;
  galleryId = 'myLightbox';
  items: GalleryItem[] = [];
  cityFC = new FormControl();
  tabClicked = 'about'
  tours: TourListResDTO[] = [];
  show = false;
  isLoading = false;
  cities: CityResponseDTO[] = [];
  cityReq!: CityListRequestDTO;
  Loading = false;

  constructor(public route: ActivatedRoute,
              public router: Router,
              public message: MessageService,
              public cityApiService: CityApiService,
              public tourApi: TourApiService,
              public gallery: Gallery,
              public api: CityApiService) {

  }

  ngOnInit(): void {
    // @ts-ignore
    this.city = this.route.snapshot.paramMap.get('city')
    this.checkCityInfoExist()


    $(window).ready(() => {
      $(".question-tab").click(() => {
        this.tabClicked = 'question'
        $("html").animate({scrollTop: 970}, 300)
      })
      $(".news-tab").click(() => {
        this.tabClicked = 'news'
        console.log(this.tabClicked)
        $("html").animate({scrollTop: 1310}, 300)
      })
      $(".about-tab").click(() => {
        this.tabClicked = 'about'
        $("html").animate({scrollTop: 180}, 300)
      })
      $(".tour-tab").click(() => {
        this.tabClicked = 'tour'
        $("html").animate({scrollTop: 1830}, 300)
      })
    })
    $(window).scroll(() => {
      if ($(this).scrollTop() > 970) {
        $(".question-tab").addClass("tab-ul-list-fix")
      } else {
        $(".question-tab").removeClass("tab-ul-list-fix")
      }
    })
    this.getCities()
  }

  getCities(): void {
    this.cityReq = {
      type: null,
      perPage: 20,
      search: null,
      hasTour: true,
      hasHotel: false,
    }
    this.cityApiService.getCities(this.cityReq).subscribe((res: any) => {
      if (res.isDone) {
        this.cities = res.data
      } else {
        this.message.custom(res.message);
      }
      this.Loading = false;
    }, (error: any) => {
      this.Loading = false;
    });
  }


  search(): void {
    this.router.navigateByUrl('تور-' + `${this.cityFC.value.slug}`).then(m => {
        // @ts-ignore
      this.city = this.route.snapshot.paramMap.get('city')
        this.checkCityInfoExist()
      }
    )
  }

  checkCityInfoExist(): void {
    if (this.city.indexOf('تور-') !== -1) {
      // @ts-ignore
      this.city = this.city.split('-')[1]
      this.show = true;
      this.getInfo()
      this.getTours()
    } else {
      this.router.navigateByUrl('not-found')
    }
  }

  getTours(): void {
    const reqDTO: TourListRequestDTO = {
      city: this.city,
      paginate: false,
      limit: 5,
      perPage: 10,
      search: '',
      type: null
    }
    this.tourApi.getTours(reqDTO).subscribe((res: any) => {
      if (res.isDone) {
        this.tours = res.data;
      }
    })
  }

  getInfo(): void {
    this.isLoading = true
    this.api.getCity(this.city).subscribe((res: any) => {
      this.isLoading = false;
      if (res.isDone) {
        this.info = res.data
        this.fillAlbum(this.info.images);
      } else {
        this.message.custom(res.messsage)
      }
    }, (error: any) => {
      this.isLoading = false;
      this.message.error()
    })
  }


  fillAlbum(images: string[]): void {
    this.items = images.map(item => new ImageItem({src: item, thumb: item}));
    const galleryRef = this.gallery.ref(this.galleryId);
    galleryRef.load(this.items);
  }
}
