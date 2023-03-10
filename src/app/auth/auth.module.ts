import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {ValidateComponent} from './validate/validate.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ForgetComponent} from "./forget/forget.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ResendCodeComponent} from './resend-code/resend-code.component';
import {StoreModule} from "../store/store.module";
import {RouterModule} from "@angular/router";
import { AgencyValidateComponent } from './agency-validate/agency-validate.component';
import { AgencyLoginComponent } from './agency-login/agency-login.component';
import { AuthPopupComponent } from './auth-popup/auth-popup.component';


@NgModule({
  declarations: [
    ValidateComponent,
    LoginComponent,
    RegisterComponent,
    ForgetComponent,
    ResendCodeComponent,
    AgencyValidateComponent,
    AgencyLoginComponent,
    AuthPopupComponent
  ],
    exports: [
        RegisterComponent,
        LoginComponent,
        ResendCodeComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AuthRoutingModule,
    StoreModule
  ]
})
export class AuthModule {
}
