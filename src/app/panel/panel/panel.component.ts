import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {SettingService} from "../../Core/Services/setting.service";

@Component({
  selector: 'prs-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  constructor(public title: Title,
              public setting: SettingService) {

  }

  ngOnInit(): void {

    this.title.setTitle('پنل کاربری همنواز')

  }

}
