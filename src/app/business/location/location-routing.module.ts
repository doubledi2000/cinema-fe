import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth/auth.guard';
import { RULE } from 'src/app/shared/constant/authority.constant';
import { LocationListComponent } from './location-list/location-list.component';

const routes: Routes = [
  {
    path: '',
    component: LocationListComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: [RULE.LOCATION_VIEW]
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
