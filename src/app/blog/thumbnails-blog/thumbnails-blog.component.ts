import {Component, OnInit} from '@angular/core';
import {PostReqDTO, PostResDTO} from "../../Core/Models/BlogDTO";
import {BlogApiService} from "../../Core/Https/blog-api.service";
import {MessageService} from "../../Core/Services/message.service";
import {CalenderServices} from "../../Core/Services/calender-service";

@Component({
  selector: 'prs-thumbnails-blog',
  templateUrl: './thumbnails-blog.component.html',
  styleUrls: ['./thumbnails-blog.component.scss']
})
export class ThumbnailsBlogComponent implements OnInit {
  blogs: PostResDTO[] = [];

  constructor(public blogApiService: BlogApiService,
              public calenderServices: CalenderServices,
              public message: MessageService,
  ) {
  }

  ngOnInit(): void {
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
}
