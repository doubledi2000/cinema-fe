import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { FilmListComponent } from './film-list/film-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: FilmListComponent
  },
  {
    path: 'detail',
    component: FilmDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmRoutingModule { }
