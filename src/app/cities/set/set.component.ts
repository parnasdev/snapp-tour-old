import {Component, OnInit} from '@angular/core';
import {CityApiService} from "../../Core/Https/city-api.service";
import {MessageService} from "../../Core/Services/message.service";
import {CitySetRequestDTO, FaqDTO} from "../../Core/Models/cityDTO";
import {FormBuilder, FormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {MultipleUploadComponent} from "../../common-project/multiple-upload/multiple-upload.component";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment.prod";
import {UploadSingleComponent} from "../../common-project/upload-single/upload-single.component";

@Component({
  selector: 'prs-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.scss']
})
export class SetComponent implements OnInit {
  req: CitySetRequestDTO = {
    description: '',
    meta_description: '',
    images: [],
    imageSlider: '',
    name: '',
    country: '',
    faq: [],
    nameEn: '',
    type: false
  }
  nameFC = new FormControl();
  nameEnFC = new FormControl();
  desFC = new FormControl();
  countryFC = new FormControl();
  metaDescriptionFC = new FormControl();
  isLoading = false;
  images: any[] = [];
  imageSlider = '';
  typeFC = new FormControl(true);
  city: string | null = '';
  info!: CitySetRequestDTO;
  faqList: FaqDTO[] = [];
  incomingFaq = '';

  fileManagerAddress = environment.fileManagerAddress;
  editorConfig = {
    selector: '.editor',
    width: '100%',
    height: 500,
    theme: 'silver',
    menubar: true,
    branding: false,
    skin: 'oxide',
    toolbar1: 'undo redo | formatSelect | bold italic blockquote strikethrough underline forecolor backcolor | numlist bullist | alignright aligncenter alignleft alignjustify | rtl ltr | link unlink | removeformat',
    toolbar2: 'fontselect | fontsizeselect | indent outdent | cut copy paste pastetext | charmap image media responsivefilemanager table emoticons hr | searchreplace preview code fullscreen help editormode',
    plugins: 'lists,advlist,directionality,link,paste,charmap,table,emoticons,codesample,preview,code,fullscreen,help,hr,nonbreaking,searchreplace,visualblocks,visualchars,autolink,image,media,responsivefilemanager',
    advlist_bullet_styles: 'square,circle,disc',
    advlist_number_styles: 'lower-alpha,lower-roman,upper-alpha,upper-roman',
    help_tabs: ['shortcuts'],
    fontsize_formats: "6pt 7pt 8pt 9pt 10pt 11pt 12pt 13pt 14pt 15pt 16pt 17pt 18pt 19pt 20pt 21pt 22pt 23pt 24pt 25pt 26pt 27pt 28pt 29pt 30pt 32pt 34pt 36pt 40pt",
    lineheight_formats: "1pt 2pt 3pt 4pt 5pt 6pt 7pt 8pt 9pt 10pt 11pt 12pt 14pt 16pt 18pt 20pt 22pt 24pt 26pt 36pt 38pt 40pt 42pt 44pt 46pt 48pt 50pt 60pt 70pt 80pt 100pt",
    // directionality :'rtl',
    language: 'fa_IR',
    external_filemanager_path: `${this.fileManagerAddress}/filemanager/`,
    filemanager_title: "مدیریت فایل ها",
    external_plugins: {"filemanager": `${this.fileManagerAddress}/filemanager/plugin.min.js`},
    filemanager_crossdomain: true,
  }

  constructor(public api: CityApiService,
              public dialog: MatDialog,
              public router: Router,
              public fb: FormBuilder,
              public route: ActivatedRoute,
              public message: MessageService) {
  }

  ngOnInit(): void {
    this.city = this.route.snapshot.paramMap.get('city')
    this.getInfo();
  }

  /*############### Add Dynamic Elements ###############*/

  submit(): void {
    if (this.city) {
      this.setReq()
      this.isLoading = true;
      this.api.edit(this.req, this.city).subscribe((res: any) => {
        this.isLoading = false;
        if (res.isDone) {
          this.message.custom(res.message);
          this.router.navigateByUrl('/cities')
        }
      }, (error: any) => {
        this.isLoading = false;
      })
    } else {
      this.setReq()
      this.isLoading = true;
      this.api.add(this.req).subscribe((res: any) => {
        this.isLoading = false;
        if (res.isDone) {
          this.message.custom(res.message);
          this.router.navigateByUrl('/cities')
        }
      }, (error: any) => {
        this.isLoading = false;
      })
    }
  }

  setValue(): void {
    this.nameFC.setValue(this.info.name)
    this.nameEnFC.setValue(this.info.nameEn)
    this.countryFC.setValue(this.info.country)
    this.desFC.setValue(this.info.description)
    this.metaDescriptionFC.setValue(this.info.meta_description)
    this.images = this.info.images;
    this.imageSlider = this.info.imageSlider;
    this.typeFC.setValue(this.info.type);
    this.incomingFaq = JSON.stringify(this.info.faq);
  }

  setReq(): void {
    this.req = {
      description: this.desFC.value,
      meta_description: this.metaDescriptionFC.value,
      images: this.images,
      imageSlider: this.imageSlider,
      name: this.nameFC.value,
      nameEn: this.nameEnFC.value,
      country: this.countryFC.value,
      faq: this.faqList,
      type: this.typeFC.value
    }
  }

  getInfo(): void {
    if (this.city) {
      this.api.getCity(this.city).subscribe((res: any) => {
        if (res.isDone) {
          this.info = res.data;
          this.setValue();
        }
      }, (error: any) => {
        this.message.error()
      })
    }
  }

  getImages(): void {
    const dialog = this.dialog.open(MultipleUploadComponent, {});
    dialog.afterClosed().subscribe((result: any[]) => {
      result.forEach(x => {
        this.images.push(x.path);
      })
    })
  }

  getSliderImage(): void {
    const dialog = this.dialog.open(UploadSingleComponent, {});
    dialog.afterClosed().subscribe((result: any) => {
      this.imageSlider = result;
    })
  }

  removeThumbnailImage(): void {
    this.imageSlider = '';
  }

  removeImage(index: any): void {
    this.images.splice(index, 1);
  }

  getFaqResult(faq: any): void {
    this.faqList = faq;
  }
}
