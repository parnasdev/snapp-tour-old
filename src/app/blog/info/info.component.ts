import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BlogApiService} from "../../Core/Https/blog-api.service";
import {PostResDTO} from "../../Core/Models/BlogDTO";

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
              public api: BlogApiService) {
  }

  ngOnInit(): void {
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
