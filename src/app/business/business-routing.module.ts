import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessRoutingModule {}
