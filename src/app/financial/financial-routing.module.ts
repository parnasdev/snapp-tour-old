import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaidReservationsListComponent } from './paid-reservations-list/paid-reservations-list.component';

const routes: Routes = [
  {
    path: '',
    component: PaidReservationsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialRoutingModule { }
