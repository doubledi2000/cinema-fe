export const ROUTER_UTILS = {
    base: {
      home: '',
      dashboard: 'dashboard',
      freeRoute: '**'
    },
    authentication: {
      root: 'authenticate',
      login: 'login'
    },
    film: {
      root: 'film',
      create: 'create',
      update: ':id/upcate',
      detail: ':id/detail'
    },
    showtime: {
      root: 'showtime'
    },
    setting: {
      root:'setting',
      user: {
        root: 'setting/user',
        create: 'setting/user/create',
        update: 'setting/user/:id/update',
        detail: 'setting/user/:id/detail'
      },
      role: {
        root: 'setting/role',
        update: 'setting/role/:id/update',
        updatePermission: 'setting/role/:id/update-permission'
      },
      ticketPrice: {
        root: 'setting/ticket-price'
      },
      drink: {
        root: 'setting/drink'
      }
    },
    location: {
      root: 'location',
    },
    producer: {
      root: 'producer'
    },
    typeOfFilm: {
      root: 'type-of-film'
    },
    room:{
      root: 'room'
    },
    booking: {
      root: 'booking'
    }
}

export enum ROUTER_ACTIONS {
    CREATE = 'create',
    UPDATE = 'update',
    DETAIL = 'detail',
    VIEW = 'view',
    DELETE = 'delete',
    ACTIVE = 'active',
    INACTIVE = 'inactive',
  }
