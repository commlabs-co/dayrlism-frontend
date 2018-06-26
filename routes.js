/* @flow */

import { fetchAccessIfNeeded } from './actions/access';
import App from './app';
import {
  asyncHome,
  asyncKey,
  asyncAbout,
  asyncAccess,
  asyncPrivateDoor,
  NotFound
} from './pages';

export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: asyncHome
      },
      {
        path: '/about',
        exact: true,
        component: asyncAbout
      },
      {
        path: '/key',
        exact: true,
        component: asyncKey
      },
      {
        path: '/access',
        exact: true,
        component: asyncAccess,
        loadData: ({ params }: Object) => [fetchAccessIfNeeded(params.id)]
      },
      {
        path: '/privatedoor',
        exact: true,
        component: asyncPrivateDoor
      },
      {
        component: NotFound
      }
    ]
  }
];
