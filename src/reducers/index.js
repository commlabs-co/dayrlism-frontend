/* @flow */

import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import access from './access';

const reducers = {
  access,
  router
};

export type Reducers = typeof reducers;
export default combineReducers(reducers);
