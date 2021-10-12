import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ValidateComponent } from './validate/validate.component';
import { CodeComponent } from './code/code.component';


@NgModule({
  declarations: [
    ValidateComponent,
    CodeComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
