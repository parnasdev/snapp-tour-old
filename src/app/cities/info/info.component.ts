import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CityApiService} from "../../Core/Https/city-api.service";
import {MessageService} from "../../Core/Services/message.service";
import {Gallery, GalleryItem, ImageItem} from "ng-gallery";
import {CityInfoResDTO} from "../../Core/Models/cityDTO";

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

  constructor(public router: ActivatedRoute,
              public message: MessageService,
              public gallery: Gallery,
              public api: CityApiService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.city = this.router.snapshot.paramMap.get('city')
    this.getInfo()


    $(document).ready(() => {

      $(".tab-ul-list").on("click", "li", () => {
        $("li").removeClass("active-li-city");
        $(this).addClass("active-li-city")
      })
      $(".tab-ul-list li:first-child").addClass('active-li-city')
      // ----tab-info-city
      $(".about-tab").click(() => {
        $("#about").show()
        $("#tour").hide()
        $("#question").hide()
        $("#news").hide()
      })
      $(".tour-tab").click(() => {
        $("#about").hide()
        $("#tour").show()
        $("#question").hide()
        $("#news").hide()
      })
      $(".question-tab").click(() => {
        $("#question").show()
        $("#news").hide()
        $("#tour").hide()
        $("#about").hide()
      })
      $(".news-tab").click(() => {
        $("#news").show()
        $("#question").hide()
        $("#tour").hide()
        $("#about").hide()
      })
      $("#question").hide()
      $("#tour").hide()
      $("#news").hide()
      // end
    })
  }


  getInfo(): void {
    this.api.getCity(this.city).subscribe((res: any) => {
      if (res.isDone) {
        this.info = res.data
        this.fillAlbum(this.info.images);
      } else {
        this.message.custom(res.messsage)
      }
    }, (error: any) => {
      this.message.error()
    })
  }


  fillAlbum(images: string[]): void {
    this.items = images.map(item => new ImageItem({src: item, thumb: item}));
    const galleryRef = this.gallery.ref(this.galleryId);
    galleryRef.load(this.items);
  }
}
