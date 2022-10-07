import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowtimesRoutingModule } from './showtimes-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShowtimeListComponent } from './showtime-list/showtime-list.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ShowtimeListComponent
  ],
  imports: [
    CommonModule,
    ShowtimesRoutingModule,
    SharedModule,
    FormsModule
  ],
})
export class ShowtimesModule { }
