import {Component, OnInit} from '@angular/core';
import {SettingApiService} from "../../Core/Https/setting-api.service";
import {MessageService} from "../../Core/Services/message.service";

@Component({
  selector: 'prs-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.scss']
})
export class SetComponent implements OnInit {
  setting: any

  constructor(public api: SettingApiService,
              public message: MessageService) {
  }

  ngOnInit(): void {
    this.getSetting();
  }

  getSetting(): void {
    this.api.getSetting().subscribe((res: any) => {
      if (res.isDone) {
        this.setting = res.data
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {

      this.message.error()
    })
  }
}
