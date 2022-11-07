import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProducerRoutingModule } from './producer-routing.module';
import { ProducerListComponent } from './producer-list/producer-list.component';
import { ProducerUpdateComponent } from './producer-update/producer-update.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ProducerListComponent,
    ProducerUpdateComponent
  ],
  imports: [
    CommonModule,
    ProducerRoutingModule,
    SharedModule
  ]
})
export class ProducerModule { }
