import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth/auth.guard';
import { RULE } from 'src/app/shared/constant/authority.constant';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { FilmListComponent } from './film-list/film-list.component';

const routes: Routes = [
  {
    path: '',
    component: FilmListComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: [RULE.FILM_VIEW]
    }
  },
  {
    path: ':id/detail',
    component: FilmDetailComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: [RULE.FILM_VIEW]
    }
  },
  {
    path: ':id/update',
    component: FilmDetailComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: [RULE.FILM_UPDATE]
    }
  },
  {
    path: 'create',
    component: FilmDetailComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: [RULE.FILM_CREATE]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmRoutingModule { }
