import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {CityApiService} from "../../../Core/Https/city-api.service";
import {TransferAPIService} from "../../../Core/Https/transfer-api.service";
import {MessageService} from "../../../Core/Services/message.service";
import {CheckErrorService} from "../../../Core/Services/check-error.service";
import {ErrorsService} from "../../../Core/Services/errors.service";
import {Router} from "@angular/router";
import {CommonApiService} from "../../../Core/Https/common-api.service";
import {SessionService} from "../../../Core/Services/session.service";
import {CalenderServices} from "../../../Core/Services/calender-service";
import {PublicService} from "../../../Core/Services/public.service";
import {ResponsiveService} from "../../../Core/Services/responsive.service";
import {PostSetReqDTO} from "../../../Core/Models/BlogDTO";
import {BlogApiService} from "../../../Core/Https/blog-api.service";
import {CategoryApiService} from "../../../Core/Https/category-api.service";
import {MatDialog} from "@angular/material/dialog";
import {UploadSingleComponent} from "../../../common-project/upload-single/upload-single.component";

@Component({
  selector: 'prs-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  //public Variable
  isMobile;
  isLoading = false;
  isSlugGenerated = false;
  selectedTags: string[] = []
  thumbnail = '';
  categories: number[] = []
  postReq: PostSetReqDTO = {
    title: '',
    slug: '',
    body: '',
    categories: [],
    description: '',
    status: 'Show',
    tags: [],
    thumbnail: ''
  };

  constructor(
    public categoryApi: CategoryApiService,
    public cityApi: CityApiService,
    public transferApi: TransferAPIService,
    public message: MessageService,
    public blogApi: BlogApiService,
    public checkError: CheckErrorService,
    public errorService: ErrorsService,
    public router: Router,
    public commonApi: CommonApiService,
    public dialog: MatDialog,
    public session: SessionService,
    public calenderServices: CalenderServices,
    public publicServices: PublicService,
    public fb: FormBuilder,
    public mobileService: ResponsiveService) {
    this.isMobile = mobileService.isMobile();
  }


////formGroup
  postForm = this.fb.group({
    title: new FormControl(''),
    slug: new FormControl(''),
    body: new FormControl(''),
    tags: new FormControl(),
    description: new FormControl(''),
    status: new FormControl('Show'),
  });


  ngOnInit() {
  }

  setSlug() {
    this.generateSlug();
  }


  submit(): void {
    // if (this.postForm.controls.body.value !== '') {
    //   this.createPost()
    // } else {
    //   this.message.custom('لطفا متن بلاگ خود را وارد کنید')
    // }
    this.createPost()
  }

  createPost(): void {
    this.isLoading = true;
    this.fillObj();
    this.blogApi.createPost(this.postReq).subscribe((res: any) => {
      this.isLoading = false;
      if (res.isDone) {
        this.message.showMessageBig(res.message);
        this.postForm.reset();
        this.router.navigateByUrl('/panel/blog/list')
      }
    }, (error: any) => {
      this.isLoading = false;
      if (error.status == 422) {
        this.errorService.recordError(error.error.data);
        this.markFormGroupTouched(this.postForm);
        this.message.showMessageBig('اطلاعات ارسال شده را مجددا بررسی کنید')
      } else {
        this.message.showMessageBig('مشکلی رخ داده است لطفا مجددا تلاش کنید')
      }
      this.checkError.check(error);
    })
  }

  fillObj() {
    this.postReq = {
      title: this.postForm.value.title,
      slug: this.postForm.value.slug,
      body: this.postForm.value.body,
      categories: this.categories,
      description: this.postForm.value.description,
      status: this.postForm.value.status,
      tags: this.postForm.value.tags,
      thumbnail: this.thumbnail
    }
  }

  getThumbnail(): void {
    const dialog = this.dialog.open(UploadSingleComponent, {});
    dialog.afterClosed().subscribe(result => {
      this.thumbnail = result
    })
  }

  getBody(body: any): void {
    this.postForm.controls.body.setValue(body);
  }

  getCategories(categories: any): void {
    this.categories = categories
  }

  private markFormGroupTouched(formGroup: any) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  generateSlug(): void {
    if (!this.isSlugGenerated) {
      this.blogApi.generateSlug(this.postForm.value.title).subscribe((res: any) => {
        if (res.data) {
          this.postForm.controls.slug.setValue(res.data);
          this.isSlugGenerated = true
        } else {
          this.message.custom(res.message)
        }
      }, (error: any) => {
        this.message.error()
      })
    } else {
    }
  }

  getTags(tags: string[]): void {
    this.postForm.controls.tags.setValue(tags);
  }
}
