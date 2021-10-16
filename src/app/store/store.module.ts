import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreRoutingModule} from './store-routing.module';
import {IndexComponent} from './index/index.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {LoginComponent} from "../auth/login/login.component";
import {ToolsModule} from "../tools/tools/tools.module";

@NgModule({
  declarations: [IndexComponent, HeaderComponent, FooterComponent],
  exports: [
    IndexComponent,
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    ToolsModule,
  ]
})
export class StoreModule {
}
