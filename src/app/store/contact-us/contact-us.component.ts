import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {SettingService} from "../../Core/Services/setting.service";

@Component({
  selector: 'prs-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  constructor(public title: Title,
              public setting: SettingService) { }

  ngOnInit(): void {
    this.setting.Setting$.subscribe(x => {
      if (x === 'true') {
        this.title.setTitle('تماس با ما' + '|' +  this.setting.settings.title)
      }
    })
  }

}
