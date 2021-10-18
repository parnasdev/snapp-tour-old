import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import {ToolsModule} from "../tools/tools/tools.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        LoginComponent
    ],
    exports: [
        LoginComponent
    ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    ToolsModule
  ]
})
export class AuthModule { }
