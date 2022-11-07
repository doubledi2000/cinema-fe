import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { ShowtimeListComponent } from './showtime-list/showtime-list.component';
import { ShowtimeCreateComponent } from './showtime-create/showtime-create.component';

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
    component: ShowtimeCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowtimesRoutingModule { }
