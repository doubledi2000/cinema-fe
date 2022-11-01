import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { ShowtimeListComponent } from './showtime-list/showtime-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: ShowtimeListComponent
  },
  {
    path: 'booking',
    component: BookingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowtimesRoutingModule { }
