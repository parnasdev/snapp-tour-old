import {Injectable} from '@angular/core';
import {SettingDTO} from "../Models/commonDTO";
import {SettingApiService} from "../Https/setting-api.service";
import {MessageService} from "./message.service";
import {Meta, Title} from "@angular/platform-browser";
import {PublicService} from "./public.service";

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  isLoading = false;
  settings!: SettingDTO;
  // @ts-ignore
  favIcon: HTMLLinkElement = document.querySelector('#favIcon');

  constructor(public settingApi: SettingApiService,
              public publicService: PublicService,
              public titleService: Title,
              public meta: Meta,
              public message: MessageService) {
  }


  getSetting(): void {
    this.settingApi.getSetting().subscribe((res: any) => {
      if (res.isDone) {
        this.settings = res.data
        this.setSiteSettings();
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.message.error()
    })
  }

  setMetaTags(){

  }

  setSiteSettings(){
    // this.favIcon.href = this.publicService.setPrefix(this.settings.favicon);
    this.titleService.setTitle(this.settings.title);
    this.meta.addTags([
      {name: 'description', content: this.settings.description},
    ]);
  }

}
