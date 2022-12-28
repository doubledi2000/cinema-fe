import { RULE } from './shared/constant/authority.constant';
import { IMenu } from './shared/types/sidebar.type';
import { ROUTER_UTILS } from './shared/utils/router.utils';

export const SidebarConstant: IMenu[] = [
  {
    path: `${ROUTER_UTILS.base.dashboard}`,
    title: 'Dashboard',
    icon: 'appstore',
    root: true,
    authorities: [RULE.REPORT_VIEW]
  },
  {
    path: ROUTER_UTILS.showtime.root,
    title: 'Đặt phim',
    icon: 'appstore',
    root: false,
    authorities: [RULE.BOOKING_VIEW],
    submenu: [
      {
        path: ROUTER_UTILS.showtime.root,
        title: 'Dat phim',
        authorities: [RULE.BOOKING_VIEW]
      },
      {
        path: ROUTER_UTILS.showtime.config,
        title: 'Lich chieu phim',
        authorities: [RULE.BOOKING_VIEW]
      }
    ]
  },
  {
    path: `${ROUTER_UTILS.film.root}`,
    title: 'Quản lý phim',
    icon: 'appstore',
    root: true,
    authorities: [RULE.FILM_VIEW],
    submenu: [
      {
        path: ROUTER_UTILS.film.root,
        title: 'Quản lý phim',
        authorities: [RULE.FILM_VIEW]
      },
    ]
  },
  {
    path: ROUTER_UTILS.setting.root,
    title: 'Cài đặt',
    icon: 'setting',
    authorities: [RULE.USER_VIEW, RULE.ROLE_VIEW, RULE.PRICE_VIEW, RULE.ZOOM_VIEW, RULE.DRINK_VIEW],
    submenu: [
      {
        path:  ROUTER_UTILS.setting.user.root,
        title: 'Quản lý nhân viên',
        authorities: [RULE.USER_VIEW]
      },
      {
        path: ROUTER_UTILS.setting.role.root,
        title: 'Quản lý vai trò',
        authorities: [RULE.ROLE_VIEW]
      },
      {
        path: ROUTER_UTILS.setting.ticketPrice.root,
        title: 'Quản lý giá vé',
        authorities: [RULE.PRICE_VIEW]
      },
      {
        path: ROUTER_UTILS.room.root,
        title: 'Quản lý phòng',
        authorities: [RULE.ZOOM_VIEW]
      },
      {
        path: ROUTER_UTILS.setting.drink.root,
        title: 'Quản lý đồ uống',
        authorities: [RULE.DRINK_VIEW]
      }
    ]
  },
  {
    title: 'Quản lý danh mục',
    icon: 'appstore',
    root: false,
    authorities: [RULE.FILM_TYPE_VIEW, RULE.LOCATION_VIEW, RULE.PRODUCER_VIEW],
    submenu: [
      {
        path: ROUTER_UTILS.typeOfFilm.root,
        title: 'Quản lý thể loại phim',
        authorities: [RULE.FILM_TYPE_VIEW]
      },
      {
        path: ROUTER_UTILS.location.root,
        title: 'Quản lý chi nhánh',
        authorities: [RULE.LOCATION_VIEW]
      },
      {
        path: ROUTER_UTILS.producer.root,
        title: 'Quản lý nhà sản xuất',
        authorities: [RULE.PRODUCER_VIEW]
      },

    ]
  }
]
