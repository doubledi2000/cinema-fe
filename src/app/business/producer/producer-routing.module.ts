import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth/auth.guard';
import { RULE } from 'src/app/shared/constant/authority.constant';
import { ProducerListComponent } from './producer-list/producer-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProducerListComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: [RULE.PRODUCER_VIEW]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProducerRoutingModule { }
