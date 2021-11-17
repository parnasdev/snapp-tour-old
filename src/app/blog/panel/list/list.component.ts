import {Component, OnInit} from '@angular/core';
import {CityListRequestDTO} from "../../../Core/Models/cityDTO";
import {TourApiService} from "../../../Core/Https/tour-api.service";
import {CityApiService} from "../../../Core/Https/city-api.service";
import {ActivatedRoute} from "@angular/router";
import {CheckErrorService} from "../../../Core/Services/check-error.service";
import {CalenderServices} from "../../../Core/Services/calender-service";
import {ErrorsService} from "../../../Core/Services/errors.service";
import {MessageService} from "../../../Core/Services/message.service";
import {PostReqDTO, PostResDTO} from "../../../Core/Models/BlogDTO";
import {BlogApiService} from "../../../Core/Https/blog-api.service";
import {AlertDialogComponent, AlertDialogDTO} from "../../../common-project/alert-dialog/alert-dialog.component";
import {MatDialog} from "@angular/material/dialog";

declare var $: any;

@Component({
  selector: 'prs-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  postReq: PostReqDTO = {
    perPage: 20,
    paginate: true,
    search: null,
    isAdmin: true,
    limit: null,
    withTrash: false
  };
  posts: PostResDTO[] = [];
  loading = false;

  constructor(public blogApi: BlogApiService,
              public route: ActivatedRoute,
              public dialog: MatDialog,
              public checkErrorService: CheckErrorService,
              public calService: CalenderServices,
              public errorService: ErrorsService,
              public message: MessageService) {
  }

  ngOnInit(): void {
    $(document).ready(() => {
      $(".item:even").css('background', '#e6e6e6')
      $(".item:odd").css('background', '#f4f7fa')
    })
    this.getPosts();
  }

  getPosts(): void {
    this.loading = true;
    this.blogApi.getPosts(this.postReq).subscribe((res: any) => {
      if (res.isDone) {
        this.posts = res.data
      } else {
        this.message.custom(res.message);
      }
      this.loading = false;
    }, (error: any) => {
      this.loading = false;
      this.message.error();
      this.checkErrorService.check(error);
    });
  }
  deleteClicked(slug: string):void {
    const obj: AlertDialogDTO = {
      description: 'حذف شود؟',
      icon: 'null',
      title: 'اطمینان دارید'
    };
    const dialog = this.dialog.open(AlertDialogComponent, {
      width: '30%',
      data: obj
    });
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.deletePost(slug)
      }
    });
  }

  deletePost(slug: string): void {
    this.loading = true;
    this.blogApi.deletePost(slug).subscribe((res: any) => {
      if (res.isDone) {
        this.message.custom(res.message);
        this.getPosts();
      } else {
        this.message.custom(res.message);
      }
      this.loading = false;
    }, (error: any) => {
      this.loading = false;
      this.message.error();
      this.checkErrorService.check(error);
    });
  }
  getStatus(statusEn: string): string {
    switch (statusEn) {
      case 'Show':
        return 'نمایش'
      case 'Draft':
        return 'پیش نویس'
      case 'Suspended':
        return 'معلق/منقضی شده'
      case 'Pending':
        return 'در انتظار'
      default:
        return ''
    }
  }
}
