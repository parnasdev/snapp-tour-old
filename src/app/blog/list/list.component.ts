import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PostReqDTO, PostResDTO} from "../../Core/Models/BlogDTO";
import {BlogApiService} from "../../Core/Https/blog-api.service";
import {MessageService} from "../../Core/Services/message.service";
import {CalenderServices} from "../../Core/Services/calender-service";
import {FormControl, Validators} from "@angular/forms";
import {SettingService} from "../../Core/Services/setting.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'prs-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  blogs: PostResDTO[] = [];
  keywordFC = new FormControl('', Validators.required);
  isLoading = false;

  constructor(
    public blogApiService: BlogApiService,
    public message: MessageService,
    public route: ActivatedRoute,
    public setting: SettingService,
    public title: Title,
    public calenderServices: CalenderServices,
    public router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {
      this.keywordFC.setValue(param['search']);
    })
    window.scrollTo(0, 0)

    this.setting.Setting$.subscribe(res => {
      if (res === 'true') {
        this.title.setTitle('لیست بلاگ ها' + '|' + this.setting.settings.title)
      }
    })

    this.getBlog()
  }

  getBlog(): void {
    if (this.keywordFC.valid) {
      this.router.navigate(['blogs'], {queryParams: {search: this.keywordFC.value}})
    }
    const req: PostReqDTO = {
      perPage: 0,
      paginate: false,
      search: this.keywordFC.value,
      isAdmin: false,
      limit: null,
      withTrash: false,
    }
    this.isLoading = true
    this.blogApiService.getPosts(req).subscribe((res: any) => {
      this.isLoading = false

      if (res.isDone) {
        this.blogs = res.data
      } else {
        this.message.custom(res.message)
      }
    }, (error: any) => {
      this.isLoading = false
      this.message.error()

    })
  }

  goToInfo(slug: string): void {
    // alert('در حال توسعه میباشد');
    this.router.navigateByUrl(`/blogs/${slug}`);
  }
}
