import { ROUTER_UTILS } from './shared/utils/router.utils';
import { IMenu } from './shared/types/sidebar.type';
import { TypeOfFilm } from './shared/model/type-of-film.model';
import { Room } from './shared/model/room.model';
import { Router, RouterOutlet } from '@angular/router';
export const SidebarConstant: IMenu[] = [
  {
    path: `${ROUTER_UTILS.base.dashboard}`,
    title: 'Dashboard',
    icon: 'appstore',
    root: true,
    authorities: []
  },
  {
    path: ROUTER_UTILS.booking.root,
    title: 'Đặt phim',
    icon: 'appstore',
    root: true,
    authorities: []
  },
  {
    path: `${ROUTER_UTILS.film.root}`,
    title: 'Quản lý phim',
    icon: 'appstore',
    root: true,
    authorities: [],
    submenu: [
      {
        path: ROUTER_UTILS.film.root,
        title: 'Quản lý phim',
        authorities: []
      },
    ]
  },
  {
    path: ROUTER_UTILS.setting.root,
    title: 'Cài đặt',
    icon: 'setting',
    authorities: [],
    submenu: [
      {
        path:  ROUTER_UTILS.setting.user.root,
        title: 'Quản lý nhân viên',
        authorities: []
      },
      {
        path: ROUTER_UTILS.setting.role.root,
        title: 'Quản lý vai trò',
        authorities: []
      },
      {
        path: ROUTER_UTILS.setting.ticketPrice.root,
        title: 'Quản lý giá vé',
        authorities: []
      }
    ]
  },
  {
    title: 'Quản lý danh mục',
    icon: 'appstore',
    root: false,
    authorities: [],
    submenu: [
      {
        path: ROUTER_UTILS.typeOfFilm.root,
        title: 'Quản lý thể loại phim',
        authorities: []
      },
      {
        path: ROUTER_UTILS.location.root,
        title: 'Quản lý chi nhánh',
        authorities: []
      },
      {
        path: ROUTER_UTILS.producer.root,
        title: 'Quản lý nhà sản xuất',
        authorities: []
      },

    ]
  }
]
