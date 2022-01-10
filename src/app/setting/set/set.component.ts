import {Component, OnInit} from '@angular/core';
import {SettingApiService} from "../../Core/Https/setting-api.service";
import {MessageService} from "../../Core/Services/message.service";
import {SettingDTO} from "../../Core/Models/commonDTO";
import {SettingService} from "../../Core/Services/setting.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorsService} from "../../Core/Services/errors.service";
import {JSDocComment} from "@angular/compiler";
import {FaqDTO} from "../../Core/Models/cityDTO";


export interface metaTagsDTO {
  name: string;
  value: string;
}


@Component({
  selector: 'prs-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.scss']
})
export class SetComponent implements OnInit {

  isLoading = false;
  settings!: SettingDTO;
  settingReq!: SettingDTO;
  faqList: FaqDTO[] = []
  metaTags: metaTagsDTO[] = [];

  metaNames = [
    'description',
    'keywords',
    'author',
  ]

  metaNameFC = new FormControl('', Validators.required)
  metaValueFC = new FormControl('', Validators.required)

  constructor(public settingApi: SettingApiService,
              public errorService: ErrorsService,
              public settingService: SettingService,
              public fb: FormBuilder,
              public message: MessageService) {
  }

  settingForm = this.fb.group({
    title: new FormControl('', [Validators.required]),
    metaTags: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    consoleGoogle: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    descriptionFooter: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    favicon: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    logo: new FormControl('', [Validators.required]),
    logoFooter: new FormControl('', [Validators.required]),
    namads: new FormControl('', [Validators.required]),
    socialLinks: new FormControl('', [Validators.required]),
    tel: new FormControl('', [Validators.required]),
    whatsapp: new FormControl('', [Validators.required]),
  })

  ngOnInit(): void {
    this.getSetting();
  }

  getSetting(): void {
    this.settingApi.getSetting().subscribe((res: any) => {
      if (res.isDone) {
        this.settings = res.data
        this.setFormData();
        this.getMeta();
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.message.error()
    })
  }

  getFaqResult(faq: any): void {
    // console.log(faq);
    this.faqList = faq;
  }

  setFormData() {
    this.settingForm.setValue(this.settings);
  }

  getMeta() {
    this.metaTags = this.settingForm.value.metaTags !== '' ? JSON.parse(this.settingForm.value.metaTags) : [];
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
      descriptionFooter: '',
      email: this.settingForm.value.email,
      favicon: '',
      location: '',
      logo: '',
      logoFooter: '',
      faq: JSON.stringify(this.faqList),
      namads: '',
      socialLinks: '',
      tel: '',
      whatsapp: ''
    }
  }

  setSetting(): void {
    this.isLoading = true;
    this.setSettingReq();
    this.settingApi.changeSetting(this.settingReq).subscribe((res: any) => {
      if (res.isDone) {
        console.log(res.data);
      }
      this.isLoading = false;
    }, (error: any) => {
      this.isLoading = false;
    });
  }
}
