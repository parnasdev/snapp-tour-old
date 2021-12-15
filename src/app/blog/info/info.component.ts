import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BlogApiService} from "../../Core/Https/blog-api.service";
import {ArchiveDTO, PostResDTO} from "../../Core/Models/BlogDTO";
import {CalenderServices} from "../../Core/Services/calender-service";
import {FormControl} from "@angular/forms";
import {CategoryApiService} from "../../Core/Https/category-api.service";
import {CategoryReqDTO, CategoryResDTO} from "../../Core/Models/CategoryDTO";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'prs-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  keywordFC = new FormControl();
  slug = '';
  info: PostResDTO = {} as any;
  isLoading = false;
  tags: string[] = []
  archived: ArchiveDTO[] = []
  categories: CategoryResDTO[] = []
  myUrl = ''

  constructor(public route: ActivatedRoute,
              public sanitizer: DomSanitizer,
              public router: Router,
              public categoryApiService: CategoryApiService,
              public calenderServices: CalenderServices,
              public api: BlogApiService) {
    this.myUrl = window.location.href

  }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    // @ts-ignore
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.getInfo();
  }
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  getInfo(): void {
    this.isLoading = true;
    this.api.getPost(this.slug).subscribe((res: any) => {
      this.isLoading = false;
      if (res.isDone) {
        this.info = res.data;
        this.getTags();
        this.getCategories();
        this.getArchived();
        this.info.body = this.replaceAll(this.info.body, '/upload/', 'http://satrap.parnasweb.com/upload/')
      } else {
      }
    }, (error: any) => {
      this.isLoading = false;
    });
  }

  getTags(): void {
    this.isLoading = true;
    this.api.getTags().subscribe((res: any) => {
      this.isLoading = false;
      if (res.isDone) {
        this.tags = res.data;
      } else {
      }
    }, (error: any) => {
      this.isLoading = false;
    });
  }
  shareURLToMail(): string {
    return 'mailto:xyz@example.com?Subject=Hello&body=' + this.myUrl
  }
  getArchived(): void {
    this.isLoading = true;
    this.api.getArchived().subscribe((res: any) => {
      this.isLoading = false;
      if (res.isDone) {
        this.archived = res.data;
      } else {
      }
    }, (error: any) => {
      this.isLoading = false;
    });
  }

  getCategories(): void {
    this.isLoading = true;
    const reqDTO: CategoryReqDTO = {
      getParent: false,
      paginate: false,
      perPage: 20,
      search: null
    }
    this.categoryApiService.getCategories(reqDTO).subscribe((res: any) => {
      this.isLoading = false;
      if (res.isDone) {
        this.categories = res.data;
      } else {
      }
    }, (error: any) => {
      this.isLoading = false;
    });
  }

  replaceAll(str: any, find: any, replace: any): any {
    return str.replace(new RegExp(find, 'g'), replace);
  }

  goToSearch(keyword: string) {
    this.router.navigate(['/blogs'], {queryParams: {search: keyword}})
  }
}
