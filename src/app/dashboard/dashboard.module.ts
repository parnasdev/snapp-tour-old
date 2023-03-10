import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { IndexComponent } from './index/index.component';
import {StoreModule} from "../store/store.module";
import {HeaderComponent} from "../store/header/header.component";


@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    StoreModule
  ]
})
export class DashboardModule { }
