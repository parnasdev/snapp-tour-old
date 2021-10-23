import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PanelComponent} from "./panel/panel.component";

const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    children: [
      {
        path: 'tour',
        loadChildren: () => import('../tour/panel/tour-panel.module').then(m => m.TourPanelModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule {
}
