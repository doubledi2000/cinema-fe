import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '../shared/core/layout/main-layout/main-layout.component';
import { ReportModule } from './report/report.module';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
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
        loadChildren: () => import('./film/film.module').then((m) => m.FilmModule),
      },
      {
        path: 'setting',
        loadChildren: () =>
          import('./setting/setting.module').then((m) => m.SettingModule),
      },
      {
        path: 'booking',
        loadChildren: () =>
          import('./booking/booking.module').then((m) => m.BookingModule),
      },
      {
        path: 'type-of-film',
        loadChildren: () =>
          import('./type-of-film/type-of-film.module').then(
            (m) => m.TypeOfFilmModule
          ),
      },
      {
        path: 'location',
        loadChildren: () =>
          import('./location/location.module').then((m) => m.LocationModule),
      },
      {
        path: 'producer',
        loadChildren: () =>
          import('./producer/producer.module').then((m) => m.ProducerModule),
      },
      {
        path: 'dashboard',
        loadChildren: ()=> import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'report',
        loadChildren: ()=> import('./report/report.module').then((m) => m.ReportModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessRoutingModule {}
