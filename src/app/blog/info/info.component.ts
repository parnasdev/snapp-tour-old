import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BlogApiService} from "../../Core/Https/blog-api.service";
import {PostResDTO} from "../../Core/Models/BlogDTO";
import {CalenderServices} from "../../Core/Services/calender-service";

@Component({
  selector: 'prs-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  slug = '';
  info: PostResDTO = {} as any;
  isLoading = false;
  constructor(public route: ActivatedRoute,
              public calenderServices: CalenderServices,
              public api: BlogApiService) {
  }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    // @ts-ignore
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.getInfo();
  }

  getInfo(): void {
    this.isLoading = true;
    this.api.getPost(this.slug).subscribe((res: any) => {
      this.isLoading = false;
      if (res.isDone) {
        this.info = res.data;
        this.info.body = this.replaceAll(this.info.body, '/upload/', 'http://satrap.parnasweb.com/upload/')
      } else {
      }
    }, (error: any) => {
      this.isLoading = false;
    });
  }

  replaceAll(str: any, find: any, replace: any): any {
    return str.replace(new RegExp(find, 'g'), replace);
  }
}
