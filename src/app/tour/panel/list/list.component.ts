import { Component, OnInit } from '@angular/core';
import { TourListRequestDTO, TourListResDTO } from "../../../Core/Models/tourDTO";
import { TourApiService } from "../../../Core/Https/tour-api.service";
import { ActivatedRoute } from "@angular/router";
import { CheckErrorService } from "../../../Core/Services/check-error.service";
import { ErrorsService } from "../../../Core/Services/errors.service";
import { MessageService } from "../../../Core/Services/message.service";
import { CalenderServices } from "../../../Core/Services/calender-service";
import { CityListRequestDTO, CityResponseDTO } from "../../../Core/Models/cityDTO";
import { CityApiService } from "../../../Core/Https/city-api.service";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { AlertDialogComponent, AlertDialogDTO } from "../../../common-project/alert-dialog/alert-dialog.component";
import { LogsComponent } from "../logs/logs.component";
import { PublicService } from "../../../Core/Services/public.service";
import { SettingService } from "../../../Core/Services/setting.service";
import { SessionService } from 'src/app/Core/Services/session.service';

declare let $: any;

@Component({
  selector: 'prs-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  status = 'All'
  tourReq: TourListRequestDTO = {
    origin: null,
    dest: null,
    night: null,
    status: null,
    stDate: null,
    paginate: true,
    sortByDate: false,
    isAdmin: true,
    search: '',
    perPage: 15,
    type: null
  };
  tours: TourListResDTO[] = [];
  paginate: any;
  paginateConfig: any;
  loading = false;
  city = '';
  originCities: CityResponseDTO[] = []
  originCityTypeFC = new FormControl(true);
  p = 1;
  sortByDate = false
  printContent = '';

  constructor(public tourApiService: TourApiService,
    public setting: SettingService,
    public cityApi: CityApiService,
    public session: SessionService,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public checkErrorService: CheckErrorService,
    public calService: CalenderServices,
    public errorService: ErrorsService,
    public publicService: PublicService,
    public message: MessageService) {
  }

  ngOnInit(): void {
    $(document).ready(() => {
      $(".item:even").css('background', '#e6e6e6')
      $(".item:odd").css('background', '#f4f7fa')
    })
    this.getTours();
    this.setting.getUserPermission();
  }

  getTours(): void {
    this.loading = true;
    this.tourReq = {
      origin: null,
      dest: null,
      night: null,
      status: null,
      stDate: null,
      paginate: true,
      sortByDate: this.sortByDate,
      isAdmin: true,
      search: '',
      perPage: 15,
      type: null
    };
    this.tourApiService.getTours(this.tourReq, this.p).subscribe((res: any) => {
      if (res.isDone) {
        this.tours = res.data;
        this.paginate = res.meta;
        this.paginateConfig = {
          itemsPerPage: this.paginate.per_page,
          totalItems: this.paginate.total,
          currentPage: this.paginate.current_page
        }
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

  getOriginCities(): void {
    const req: CityListRequestDTO = {
      type: this.originCityTypeFC.value,
      hasHotel: false,
      hasDestTour: false,
      hasOriginTour: false,
      search: null,
      perPage: 10
    }
    this.cityApi.getCities(req).subscribe((res: any) => {
      if (res.isDone) {
        this.originCities = res.data;
        this.tourReq.origin = this.originCities[0].id.toString();
        this.getTours();
      }
    }, (error: any) => {
      this.message.error()
    })
  }

  originCityTypeChange(): void {
    this.getOriginCities()
  }

  statusChanged(): void {

  }

  deleteTour(slug: string): void {
    this.loading = true;
    this.tourApiService.deleteTour(slug).subscribe((res: any) => {
      if (res.isDone) {
        this.message.custom('تور مورد نظر حذف شد');
        this.getTours();
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

  onPageChanged(event: any) {
    this.p = event;
    this.getTours();
  }

  deleteClicked(slug: string) {
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
        this.deleteTour(slug)
      }
    });
  }

  openLogs(id: any): void {
    const dialog = this.dialog.open(LogsComponent, {
      width: '30%',
      data: { id: id, type: 'tour' }
    });
    dialog.afterClosed().subscribe(result => {
    });
  }


  getTagsHtml(tagName: keyof HTMLElementTagNameMap): string {
    const htmlStr: string[] = [];
    const elements = document.getElementsByTagName(tagName);
    for (let idx = 0; idx < elements.length; idx++) {
      htmlStr.push(elements[idx].outerHTML);
    }

    return htmlStr.join('\r\n');
  }

  print() {
    let popupWin;
    // @ts-ignore
    // contents = document.getElementById('output').innerHTML;
    // const stylesHtml = this.getTagsHtml('style');
    // const linksHtml = this.getTagsHtml('link');
    // const scriptsHtml = this.getTagsHtml('script');
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    // @ts-ignore
    popupWin.document.open();
    // @ts-ignore
    popupWin.document.write(this.printContent);
    // @ts-ignore
    popupWin.document.close();
  }

  exportTour(slug: string) {
    this.loading = true;
    this.tourApiService.exportTour(slug).subscribe((res: any) => {
      if (res.isDone) {
        this.printContent = res.data
        this.print();
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
  
}
