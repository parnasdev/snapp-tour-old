import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRoutingModule } from './support-routing.module';
import { ListComponent } from './list/list.component';
import { ChatComponent } from './chat/chat.component';


@NgModule({
  declarations: [
    ListComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    SupportRoutingModule
  ]
})
export class SupportModule { }
