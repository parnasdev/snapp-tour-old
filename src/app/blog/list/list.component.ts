import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PostReqDTO, PostResDTO} from "../../Core/Models/BlogDTO";
import {BlogApiService} from "../../Core/Https/blog-api.service";
import {MessageService} from "../../Core/Services/message.service";
import {CalenderServices} from "../../Core/Services/calender-service";

@Component({
  selector: 'prs-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  blogs: PostResDTO[] = [];

  isLoading = false;

  constructor(
    public blogApiService: BlogApiService,
    public message: MessageService,
    public calenderServices: CalenderServices,
    public router: Router) {
  }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.getBlog()
  }

  getBlog(): void {
    const req: PostReqDTO = {
      perPage: 0,
      paginate: false,
      search: null,
      isAdmin: false,
      limit: null,
      withTrash: false,
    }
    this.blogApiService.getPosts(req).subscribe((res: any) => {
      if (res.isDone) {
        this.blogs = res.data
      } else {
        this.message.custom(res.message)
      }
    }, (error: any) => {
      this.message.error()

    })
  }

  goToInfo(slug: string): void {
    // alert('در حال توسعه میباشد');
    this.router.navigateByUrl(`/blog/info/${slug}`);
  }
}
