import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ValidateComponent } from './validate/validate.component';
import { CodeComponent } from './code/code.component';
import { LoginComponent } from './login/login.component';
import {AppModule} from "../app.module";
import {ToolsModule} from "../tools/tools/tools.module";


@NgModule({
    declarations: [
        ValidateComponent,
        CodeComponent,
        LoginComponent
    ],
    exports: [
        LoginComponent
    ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ToolsModule
  ]
})
export class AuthModule { }
