import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeOfFilmDetailComponent } from './type-of-film-detail/type-of-film-detail.component';
import { TypeOfFilmListComponent } from './type-of-film-list/type-of-film-list.component';

const routes: Routes = [
  {
    path: '',
    component: TypeOfFilmListComponent
  },
  {
    path: '/:id/detail',
    component: TypeOfFilmDetailComponent
  },
  {
    path: '/:id/update',
    component: TypeOfFilmDetailComponent
  },
  {
    path: 'create',
    component: TypeOfFilmDetailComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeOfFilmRoutingModule { }
