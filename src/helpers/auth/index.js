import jwtDecode from 'jwt-decode';
import * as cookie from 'js-cookie';
import moment from 'moment';

export const AuthenticationLogin = (token, expired) => {
  var decoded_token = jwtDecode(token);
  let decoded_expired = moment.unix(decoded_token.exp).fromNow().split(' ');
  cookie.set('authenticated', true, { expires:1 });
  cookie.set('token', token, { expires:1});
};

export const AuthenticationLogout = (flag) => {
  cookie.set('authenticated', false);
  cookie.remove('token');
};

export const AuthState = () => {
  return cookie.get('authenticated');
}

export const SessionData = (res) => {
  return cookie.getJSON(res);
}