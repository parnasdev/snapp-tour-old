import { Component, OnInit } from '@angular/core';
import { AgencyApiService } from "../../Core/Https/agency-api.service";
import { MessageService } from "../../Core/Services/message.service";
import { MatDialog } from "@angular/material/dialog";
import { CommonApiService } from "../../Core/Https/common-api.service";
import { PublicService } from "../../Core/Services/public.service";
import { SessionService } from "../../Core/Services/session.service";
import { ErrorsService } from "../../Core/Services/errors.service";
import { ActivatedRoute } from "@angular/router";
import { AgencyEditDTO } from "../../Core/Models/AgencyDTO";
import { AuthApiService } from 'src/app/Core/Https/auth-api.service';
import { UserApiService } from 'src/app/Core/Https/user-api.service';

@Component({
  selector: 'prs-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  infoLoading = false;
  forgetIsLoading = false;
  isLoading = false
  id = '';
  info: AgencyEditDTO = {
    username: '',
    family: '',
    name: '',
    phone: '',
    city: 0,
    email: '',
    gender: '',
    id_code: '',
    agency: {
      name: '',
      logo: {
        path: '',
        url: ''
      },
      isManager: null,
      LicenseFileA: {
        path: '',
        url: ''
      },
      id: 0,
      LicenseFileB: {
        path: '',
        url: ''
      },
      extra: '',
      email: '',
      address: '',
      tell: '',
      site: '',
      necessaryPhone: '',
    },
    birthDay: '',
    createdAt: '',
    role: '',
  }

  constructor(
    public api: AgencyApiService,
    public authApi: AuthApiService,
    public dialog: MatDialog,
    public userApi: UserApiService,
    public commonApi: CommonApiService,
    public publicService: PublicService,
    public session: SessionService,
    public route: ActivatedRoute,
    public message: MessageService,
    public errorsService: ErrorsService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.id = this.route.snapshot.paramMap.get('id')

    if (this.session.getRole() === 'Admin') {
      this.getAgency();
    } else {
      this.getInfo();
    }
  }


  getInfo(): void {
    this.infoLoading = true;
    this.userApi.getProfile().subscribe((res: any) => {
      this.infoLoading = false;
      if (res.isDone) {
        this.info = res.data
      }
    }, (error: any) => {
      this.infoLoading = false;
      this.errorsService.check(error);
    })
  }
  getAgency(): void {
    this.infoLoading = true;
    this.api.getAgency(+this.id).subscribe((res: any) => {
      this.infoLoading = false;
      if (res.isDone) {
        this.info = res.data
      }
    }, (error: any) => {
      this.infoLoading = false;
      this.errorsService.check(error);
    })
  }


}
