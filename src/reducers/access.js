/* @flow */

import fp from 'lodash/fp';

import type { AccessInfo, Action } from '../types';

type State = AccessInfo;

export default (state: State = {}, action: Action): State => {
  switch (action.type) {
    case 'AUTHENTICATING':
      return fp.assign(state, {
        [action.userId]: {
          readyStatus: 'AUTHENTICATING'
        }
      });
    case 'AUTHENTICATE_FAILURE':
      return fp.assign(state, {
        [action.userId]: {
          readyStatus: 'AUTHENTICATE_FAILURE',
          err: action.err
        }
      });
    case 'AUTHENTICATE_SUCCESS':
      return fp.assign(state, {
        [action.userId]: {
          readyStatus: 'AUTHENTICATE_SUCCESS',
          info: action.data
        }
      });
    default:
      return state;
  }
};
