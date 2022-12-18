import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowtimesRoutingModule } from './showtimes-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShowtimeListComponent } from './showtime-list/showtime-list.component';
import { FormsModule } from '@angular/forms';
import { BookingComponent } from './booking/booking.component';
import { ShowtimeCreateComponent } from './showtime-create/showtime-create.component';
import { ShowtimeConfigComponent } from './showtime-config/showtime-config.component';



@NgModule({
  declarations: [
    ShowtimeListComponent,
    BookingComponent,
    ShowtimeCreateComponent,
    ShowtimeConfigComponent
  ],
  imports: [
    CommonModule,
    ShowtimesRoutingModule,
    SharedModule,
    FormsModule
  ],
})
export class ShowtimesModule { }
