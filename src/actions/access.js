/* @flow */

import axios from 'axios';

import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';

// Export this for unit testing more easily
/* istanbul ignore next */
export const fetchAccess = (
  userId: string,
  URL: string = `${__APIURL__}/login/guestUser`
): ThunkAction => async (dispatch: Dispatch) => {
  // debugger
  dispatch({ type: 'AUTHENTICATING', userId });

  try {
    const { data } = await axios({
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      url: `${URL}`,
      data: {
        email:"dayrl94@gmail.com",
        token:"184cf859-e6e9-4d3b-af67-90afb8075bde"
      }
    });

    /* istanbul ignore next */
    dispatch({ type: 'AUTHENTICATE_SUCCESS', userId, data });
  } catch (err) {
    /* istanbul ignore next */
    dispatch({ type: 'AUTHENTICATE_FAILURE', userId, err: err.message });
  }
};

/* istanbul ignore next */
const shouldFetchAccess = (state: ReduxState, userId: string): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  const access = state.access[userId];

  // Fetching data once in production
  if (access && access.readyStatus === 'AUTHENTICATE_SUCCESS')
    return false;

  return true;
};

/* istanbul ignore next */
export const fetchAccessIfNeeded = (userId: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState
) => {
  /* istanbul ignore next */
  if (shouldFetchAccess(getState(), userId)) {
    /* istanbul ignore next */
    return dispatch(fetchAccess(userId));
  }

  /* istanbul ignore next */
  return null;
};
