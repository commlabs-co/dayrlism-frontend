/* @flow */

// import type { Dispatch } from './types';

import { fetchUserIfNeeded } from './actions/user';
import App from './app';
import {
  asyncHome,
  asyncKey,
  asyncAbout,
  asyncAccess,
  asyncUserInfo,
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
        component: asyncAccess
      },
      {
        path: '/UserInfo/:id',
        component: asyncUserInfo,
        loadData: ({ params }: Object) => [fetchUserIfNeeded(params.id)]
      },
      {
        component: NotFound
      }
    ]
  }
];
