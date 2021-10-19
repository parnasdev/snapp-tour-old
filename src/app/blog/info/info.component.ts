import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'prs-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  slug = '';
  // info = {} as PostDTO;
  isLoading = false;

  constructor(public route: ActivatedRoute,
            ) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.slug = this.route.snapshot.paramMap.get('slug');
    // this.getInfo();
  }

  // getInfo(): void {
  //   this.isLoading = true;
  //   this.api.getInfo(this.slug).subscribe((res: any) => {
  //     this.isLoading = false;
  //     if (res.isDone) {
  //       this.info = res.data;
  //       this.info.body = this.replaceAll(this.info.body, '/upload/', 'http://satrap.parnasweb.com/upload/')
  //     } else {
  //     }
  //   }, (error: any) => {
  //     this.isLoading = false;
  //   });
  // }

  // replaceAll(str: any, find: any, replace: any): any {
  //   return str.replace(new RegExp(find, 'g'), replace);
  // }
}
