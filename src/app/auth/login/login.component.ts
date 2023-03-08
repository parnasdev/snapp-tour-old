import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";
import {AuthApiService} from "../../Core/Https/auth-api.service";
import {MessageService} from "../../Core/Services/message.service";
import {ErrorsService} from "../../Core/Services/errors.service";
import {SessionService} from "../../Core/Services/session.service";
import { LoginReqDTO } from 'src/app/Core/Models/authDTO';


declare var $: any;

@Component({
  selector: 'prs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading = false;

  passwordFC = new FormControl('', Validators.required);
  registerReq!: LoginReqDTO;
  phoneNumber: string | null = '';

  constructor(public router: Router,
              public route: ActivatedRoute,
              public api: AuthApiService,
              public errorService: ErrorsService,
              public messageService: MessageService,
              public session: SessionService
  ) {
    // errorService.clear();
  }

  ngOnInit(): void {
    this.phoneNumber = this.route.snapshot.paramMap.get('phoneNumber');
  }

  submit(): void {
    this.registerReq = {
      phone: this.phoneNumber,
      password: this.passwordFC.value
    };
    this.login();
  }

  login(): void {
    this.isLoading = true;
    this.api.login(this.registerReq).subscribe((res: any) => {
      this.isLoading = false;
      if (res.isDone) {
        this.session.setUserToSession(res.data);
        if (this.session.getRole() === 'User') {
          this.router.navigateByUrl('/dashboard');
        } else if (this.session.getRole() === 'Admin' || this.session.getRole() === 'Staff') {
          this.router.navigateByUrl('/panel');
        } else {
          this.router.navigateByUrl('/');

        }

      } else {
        this.messageService.custom(res.message);
      }
    }, (error: any) => {
      this.isLoading = false;
      this.errorService.recordError(error.error.data);
      this.errorService.check(error);
    });
  }

  togglePassword() {
    $(".icon-eye").toggleClass("icon-eye-off");
    var input = $("#togglePassword")
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  }

}
