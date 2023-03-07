import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'prs-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  url = 'https://api.snapptour.com/filemanager/dialog.php?type=0';
  time = new Date().getTime();
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  transform(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
