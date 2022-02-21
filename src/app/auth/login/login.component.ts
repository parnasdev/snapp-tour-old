import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AuthApiService} from "../../Core/Https/auth-api.service";
import {AuthRequestDTO} from "../../Core/Models/AuthDTO";
import {MessageService} from "../../Core/Services/message.service";
import {ErrorsService} from "../../Core/Services/errors.service";
import {CheckErrorService} from "../../Core/Services/check-error.service";
import {SessionService} from "../../Core/Services/session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'prs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userNameFC = new FormControl();
  passwordFC = new FormControl();
  req!: AuthRequestDTO
  isLoading = false;


  formGroup: FormGroup = this.fb.group({
    username: this.userNameFC,
    password: this.passwordFC
  })

  constructor(public api: AuthApiService,
              public message: MessageService,
              public errorService: ErrorsService,
              public fb: FormBuilder,
              public router: Router,
              public session: SessionService,
              public checkError: CheckErrorService) {
  }

  ngOnInit(): void {
    if (this.session.isLoggedIn()) {
      this.router.navigateByUrl('/panel')
    }
  }


  login(): void {
    this.setReq()
    this.isLoading = true
    this.api.login(this.req).subscribe((res: any) => {
      this.isLoading = false;
      if (res.isDone) {
        this.session.setUserToSession(res.data);
        this.router.navigate(['/'])
      }
    }, (error: any) => {
      this.isLoading = false;
      this.message.error();
      this.errorService.recordError(error.error.data);
      this.checkError.check(error);
    })
  }

  setReq(): void {
    this.req = {
      phone: this.userNameFC.value,
      password: this.passwordFC.value,
    }
  }

}
