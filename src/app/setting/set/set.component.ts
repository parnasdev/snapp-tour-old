import { Component, OnInit } from '@angular/core';
import { SettingApiService } from "../../Core/Https/setting-api.service";
import { MessageService } from "../../Core/Services/message.service";
import { metaTagsDTO, SettingDTO } from "../../Core/Models/commonDTO";
import { SettingService } from "../../Core/Services/setting.service";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { ErrorsService } from "../../Core/Services/errors.service";
import { FaqDTO } from "../../Core/Models/cityDTO";
import { environment } from "../../../environments/environment.prod";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'prs-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.scss']
})
export class SetComponent implements OnInit {
  isLoading = false;
  settings: SettingDTO = {
    address: '',
    consoleGoogle: '',
    description: '',
    descriptionFooter: '',
    email: '',
    favicon: '',
    location: '',
    logo: '',
    faq: [],
    isClose: false,
    logoFooter: '',
    metaTags: '',
    namads: [],
    socialLinks: '',
    tel: '',
    title: '',
    whatsapp: '',
  };
  settingReq: SettingDTO = {
    address: '',
    consoleGoogle: '',
    description: '',
    descriptionFooter: '',
    email: '',
    isClose: false,
    favicon: '',
    location: '',
    logo: '',
    faq: [],
    logoFooter: '',
    metaTags: '',
    namads: [],
    socialLinks: '',
    tel: '',
    title: '',
    whatsapp: '',
  };
  faqList: FaqDTO[] = [];
  metaTags: metaTagsDTO[] = [];
  thumbnail = '';

  metaNames = [
    'description',
    'keywords',
    'author',
  ]

  metaNameFC = new FormControl('', Validators.required)
  metaValueFC = new FormControl('', Validators.required)

  images: any[] = [];
  banners: any[] = [];

  // footerLinks: FooterLinks[] = [];

  namad1FC = new FormControl('');
  namad2FC = new FormControl('');
  namad3FC = new FormControl('');

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
    external_plugins: { "filemanager": `${this.fileManagerAddress}/filemanager/plugin.min.js` },
    filemanager_crossdomain: true,
  }

  constructor(public settingApi: SettingApiService,
    public dialog: MatDialog,
    public errorService: ErrorsService,
    public settingService: SettingService,
    public fb: FormBuilder,
    public message: MessageService) {
  }

  settingForm = this.fb.group({
    title: new FormControl('', [Validators.required]),
    metaTags: new FormControl('', [Validators.required]),
    logo: new FormControl('', [Validators.required]),
    consoleGoogle: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    favicon: new FormControl('', [Validators.required]),
    faq: new FormControl('', [Validators.required]),
    isClose: new FormControl(false),
    // footer settings
    location: new FormControl('', [Validators.required]),
    socialLinks: new FormControl('', [Validators.required]),
    descriptionFooter: new FormControl('', [Validators.required]),
    logoFooter: new FormControl('', [Validators.required]),
    namads: new FormControl([], [Validators.required]),
    tel: new FormControl('', [Validators.required]),
    whatsapp: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    // footerLinks: new FormControl([], [Validators.required])
  })

  ngOnInit(): void {
    this.getSetting();
  }

  getSetting(): void {
    this.settingApi.getSetting().subscribe((res: any) => {
      if (res.isDone) {
        this.settings = res.data;
        this.setFormData();
        this.getNamads();
        this.getMeta();
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.message.error()
    })
  }

  getFaqResult(faq: any): void {
    console.log(faq);
    this.faqList = faq;
  }

  getLinksResult(links: any): void {
    // this.footerLinks = links;
  }

  setFormData() {
    this.settingForm.controls['title'].setValue(this.settings.title)
    this.settingForm.controls['metaTags'].setValue(this.settings.metaTags)
    this.settingForm.controls['logo'].setValue(this.settings.logo)
    this.settingForm.controls['consoleGoogle'].setValue(this.settings.consoleGoogle)
    this.settingForm.controls['description'].setValue(this.settings.description)
    this.settingForm.controls['favicon'].setValue(this.settings.favicon)
    this.settingForm.controls['faq'].setValue(this.settings.faq)
    this.settingForm.controls['isClose'].setValue((this.settings.isClose === true || this.settings.isClose === '1' )? true : false)
    this.settingForm.controls['location'].setValue(this.settings.location)

    this.settingForm.controls['socialLinks'].setValue(this.settings.socialLinks)
    this.settingForm.controls['descriptionFooter'].setValue(this.settings.descriptionFooter)
    this.settingForm.controls['logoFooter'].setValue(this.settings.logoFooter)
    this.settingForm.controls['namads'].setValue(this.settings.namads)

    this.settingForm.controls['tel'].setValue(this.settings.tel)
    this.settingForm.controls['whatsapp'].setValue(this.settings.whatsapp)
    this.settingForm.controls['address'].setValue(this.settings.address)
    this.settingForm.controls['email'].setValue(this.settings.email)

  }

  getMeta() {
    this.metaTags = this.settingForm.value.metaTags !== '' ? JSON.parse(this.settingForm.value.metaTags) : [];
  }

  getSliderImages() {
    this.images = this.settingForm.value.mainSliderImages !== '' ? JSON.parse(this.settingForm.value.mainSliderImages) : [];
  }

  getBanners() {
    this.banners = this.settingForm.value.mainSliderImages !== '' ? JSON.parse(this.settingForm.value.mainSliderImages) : [];
  }

  removeMetaItem(index: number) {
    this.metaTags.splice(index, 1)
  }

  addMeta() {
    if (this.metaNameFC.value.trim().length > 0 && this.metaValueFC.value.trim().length > 0) {
      const meta = {
        name: this.metaNameFC.value,
        value: this.metaValueFC.value
      }
      this.metaTags.push(meta);
      this.metaNameFC.reset();
      this.metaValueFC.reset();
    } else {
      this.message.custom('لطفا مقدار ورودی خود را کنترل کنید')
    }
  }

  setSettingReq() {
    this.settingReq = {
      title: this.settingForm.value.title,
      metaTags: JSON.stringify(this.metaTags),
      address: '',
      consoleGoogle: '',
      description: this.settingForm.value.description,
      descriptionFooter: this.settingForm.value.descriptionFooter,
      email: this.settingForm.value.email,
      favicon: '',
      location: '',
      isClose: this.settingForm.value.isClose,
      logo: '',
      logoFooter: '',
      // footerLinks: this.footerLinks,
      faq: JSON.stringify(this.faqList),
      namads: this.settingForm.value.namads,
      socialLinks: '',
      tel: '',
      whatsapp: ''
    }
  }

  removeImage(index: any): void {
    this.images.splice(index, 1);
  }

  setNamads() {
    this.settingForm.value.namads = [];
    this.settingForm.value.namads.push(this.namad1FC.value);
    this.settingForm.value.namads.push(this.namad2FC.value);
    this.settingForm.value.namads.push(this.namad3FC.value);
  }

  getNamads() {
    this.namad1FC.setValue(this.settingForm.value.namads);
    this.namad2FC.setValue(this.settingForm.value.namads);
    this.namad3FC.setValue(this.settingForm.value.namads);
  }

  setSetting(): void {
    this.isLoading = true;
    this.setSettingReq();
    this.settingApi.changeSetting(this.settingReq).subscribe((res: any) => {
      if (res.isDone) {
        this.message.custom(res.message);
      }
      this.isLoading = false;
    }, (error: any) => {
      this.isLoading = false;
    });
  }
}
