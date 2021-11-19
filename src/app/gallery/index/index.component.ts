import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'prs-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  url = 'http://tour-api.parnasweb.com/filemanager/dialog.php?type=0';

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  transform(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
