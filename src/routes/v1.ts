import { usersRoute } from './index';

export const routesVersion1: IRoute[] = [
  // { url: '/api/v1/auth', component: authRoute },
  // { url: '/api/v1/categories', component: categoriesRoute },
  // { url: '/api/v1/hotels', component: hotelsRoute },
  // { url: '/api/v1/rooms', component: roomsRoute },
  { url: '/api/v1/users', service: usersRoute }
];
