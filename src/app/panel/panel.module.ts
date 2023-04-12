import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelRoutingModule } from './panel-routing.module';
import { PanelComponent } from './panel/panel.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RequestReserveComponent } from './request-reserve/request-reserve.component';


@NgModule({
    declarations: [PanelComponent, SidebarComponent, HeaderComponent, RequestReserveComponent],
    exports: [
        PanelComponent
    ],
    imports: [
        CommonModule,
        PanelRoutingModule,
        NgxPaginationModule,
    ]
})
export class PanelModule { }
