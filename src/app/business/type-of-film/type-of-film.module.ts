import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypeOfFilmRoutingModule } from './type-of-film-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TypeOfFilmDetailComponent } from './type-of-film-detail/type-of-film-detail.component';
import { TypeOfFilmListComponent } from './type-of-film-list/type-of-film-list.component';


@NgModule({
  declarations: [
    TypeOfFilmDetailComponent,
    TypeOfFilmListComponent
  ],
  imports: [
    CommonModule,
    TypeOfFilmRoutingModule,
    SharedModule
  ],
  exports: [
    TypeOfFilmDetailComponent,
    TypeOfFilmListComponent
  ]
})
export class TypeOfFilmModule { }
