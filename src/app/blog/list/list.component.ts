import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'prs-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  // source: PostListDTO[] = [];
  // p = 1;
  // req = {} as PostReqDTO;
  isLoading = false;

  constructor(
              public router: Router) {
  }

  ngOnInit(): void {
    // this.getList();
  }
  //
  // getList(): void {
  //   this.setReq();
  //   this.isLoading = true;
  //   this.api.getList(this.req).subscribe((res: any) => {
  //     this.isLoading = false;
  //     if (res.isDone) {
  //       this.source = res.data;
  //     } else {
  //
  //     }
  //   }, (error: any) => {
  //     this.isLoading = false;
  //
  //   });
  // }
  //
  // setReq(): void {
  //   this.req = {
  //     category: 'پست-ها',
  //     limit: null,
  //     search: null
  //   };
  // }

  goToInfo(slug: string): void {
    // alert('در حال توسعه میباشد');
    this.router.navigateByUrl(`/blog/info/${slug}`);
  }
}
