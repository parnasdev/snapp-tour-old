import {Component, OnInit} from '@angular/core';
import {AgencyApiService} from "../../Core/Https/agency-api.service";
import {MessageService} from "../../Core/Services/message.service";
import {FormBuilder, FormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {CommonApiService} from "../../Core/Https/common-api.service";
import {PublicService} from "../../Core/Services/public.service";
import {SessionService} from "../../Core/Services/session.service";
import {ErrorsService} from "../../Core/Services/errors.service";
import {ActivatedRoute} from "@angular/router";
import {AgencyDTO} from "../../Core/Models/AgencyDTO";

@Component({
  selector: 'prs-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  isLoading = false
  info: AgencyDTO = {
    id: 0,
    name: '',
    site: '',
    commissions: [],
    LicenseFileA: null,
    user: {name: '',family: ''},
    users: [],
    verify: false,
    // LicenseFileA: '',
    LicenseFileB: '',
    address: '',
    crewCount: 0,
    email: '',
    logo: '',
    necessaryPhone: '',
    tell: ''
  }

  constructor(public fb: FormBuilder,
              public api: AgencyApiService,
              public dialog: MatDialog,
              public commonApi: CommonApiService,
              public publicService: PublicService,
              public route: ActivatedRoute,
              public session: SessionService,
              public message: MessageService,
              public errorsService: ErrorsService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    // @ts-ignore
    this.getInfo(+id);
  }

  getInfo(id: number): void {
    this.api.getAgency(id).subscribe((res: any) => {
      if (res.isDone) {
        this.info = res.data
      }
    }, (error: any) => {
      this.errorsService.check(error);
    })
  }


}
