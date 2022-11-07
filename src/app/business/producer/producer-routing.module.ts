import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProducerListComponent } from './producer-list/producer-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProducerListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProducerRoutingModule { }
