import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { ShowtimeListComponent } from './showtime-list/showtime-list.component';
import { ShowtimeCreateComponent } from './showtime-create/showtime-create.component';
import { ShowtimeConfigComponent } from './showtime-config/showtime-config.component';

const routes: Routes = [
  {
    path: '',
    component: ShowtimeListComponent
  },
  {
    path: 'booking',
    component: BookingComponent
  },
  {
    path: 'create',
    component: ShowtimeCreateComponent,
  },
  {
    path: 'config',
    component: ShowtimeConfigComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowtimesRoutingModule { }
