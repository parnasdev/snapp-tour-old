import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {SettingService} from "../../Core/Services/setting.service";

@Component({
  selector: 'prs-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor(public title: Title,
              public setting: SettingService) {
  }

  ngOnInit(): void {
    this.setting.Setting$.subscribe(x => {
      if (x === 'true') {
        this.title.setTitle('تماس با ما' + '|' +  this.setting.settings.title)
      }
    })
  }

}
