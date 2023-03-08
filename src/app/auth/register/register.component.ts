import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { LoginReqDTO } from "../../Core/Models/authDTO";
import { AuthApiService } from "../../Core/Https/auth-api.service";
import { PublicService } from "../../Core/Services/public.service";
import { MessageService } from "../../Core/Services/message.service";
import { ErrorsService } from "../../Core/Services/errors.service";
import { SessionService } from "../../Core/Services/session.service";


@Component({
  selector: 'prs-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isLoading = false;
  registerReq!: LoginReqDTO;
  codeFC = new FormControl('');
  phone = ''
  accountType:string = '3';
  constructor(public route: ActivatedRoute,
    public router: Router,
    public api: AuthApiService,
    public publicService: PublicService,
    public messageService: MessageService,
    public checkError: ErrorsService,
    public session: SessionService
  ) {
    checkError.clear();
    this.route.queryParams.subscribe(params => {
      this.accountType = params['type'];
    })
  }

  ngOnInit(): void {
    // @ts-ignore
    this.phone = this.route.snapshot.paramMap.get('phoneNumber');
  }

  getCodeValues(): void {
    const inputCode = this.publicService.fixNumbers(this.codeFC.value);
    this.registerReq = {
      phone: this.phone,
      password: inputCode,
      accountType: this.getAccountTypeLabel()
    };
    this.register();
  }

  getAccountTypeLabel(): string {
    debugger
    switch (this.accountType) {
      case '2':
        return 'staff';
      case '4':
        return 'agency';
      case '1':
        return 'admin'
      default:
        return 'user'
    }
  }

  register(): void {
    this.isLoading = true;
    this.api.register(this.registerReq).subscribe((res: any) => {
      this.isLoading = false;
      if (res.isDone) {
        this.session.setUserToSession(res.data);
        this.router.navigateByUrl('/dashboard/user/profile');
      } else {
        this.messageService.custom(res.message);
      }
    }, (error: any) => {
      this.isLoading = false;
      this.checkError.recordError(error.error.data);
      this.checkError.check(error);
    });
  }

}
