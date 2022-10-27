import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeOfFilmListComponent } from './type-of-film/type-of-film-list/type-of-film-list.component';

const routes: Routes = [
  {
    path: 'room',
    loadChildren: () => import('./room/room.module').then((m) => m.RoomModule),
  },
  {
    path: 'showtime',
    loadChildren: () =>
      import('./showtimes/showtimes.module').then((m) => m.ShowtimesModule),
  },
  {
    path: 'film',
    loadChildren: ()=> import('./film/film.module').then(m => m.FilmModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then(m=>m.SettingModule )
  },
  {
    path: 'booking',
    loadChildren: ()=> import('./booking/booking.module').then(m => m.BookingModule)
  },
  {
    path: 'type-of-films',
    loadChildren: ()=> import('./type-of-film/type-of-film.module').then(m=>m.TypeOfFilmModule)
  },{
    path: 'test',
    component: TypeOfFilmListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessRoutingModule {}
