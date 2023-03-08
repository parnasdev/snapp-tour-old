import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ValidateComponent} from "./validate/validate.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ForgetComponent} from "./forget/forget.component";
import { AgencyValidateComponent } from './agency-validate/agency-validate.component';

const routes: Routes = [
  {
    path: '',
    component: ValidateComponent
  },
  {
    path: 'partner',
    component: AgencyValidateComponent
  },
  {
    path: 'login/:phoneNumber',
    component: LoginComponent
  },
  {
    path: 'register/:phoneNumber',
    component: RegisterComponent
  },
  {
    path: 'forget/:phone',
    component: ForgetComponent
  },
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
