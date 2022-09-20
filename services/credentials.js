import jwt_decode from 'jwt-decode';

//checks refresh,access token expired or not
export function isTokenExpired(token) {
  var decoded = jwt_decode(token);
  if (decoded.exp < Date.now() / 1000) {
    return true;
  } else {
    return false;
  }
}
