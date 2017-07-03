import Actions from '../flux/actions/Actions';

class Auth {
  constructor() {
    this.ifLoggedin = this.ifLoggedin.bind(this);
  }

  /**
   * set authentication value to local strorage to true.
   * save user details to local storage
   * @param {Object} signInResonse
   */
  signIn(signInResonse) {
    if (!signInResonse.error) {
      localStorage.setItem('auth', true);
      localStorage.setItem('userDetail', JSON.stringify(signInResonse.profileObj));
      Actions.getAuth(this.ifLoggedin());
    } else {
      localStorage.removeItem('auth');
    }
  }

  /**
   * set authentication value to local strorage to false.
   * remove user details from local storage.
   * @memberof Auth
   */
  signOut() {
    localStorage.removeItem('auth');
    localStorage.removeItem('userDetail');
    Actions.getAuth(this.ifLoggedin());
  }

  /**
   * check if user is logged in to return true,
   * else return false to log user out
   * @memberof Auth
   */
  ifLoggedin() {
    if (localStorage.getItem('auth')) {
      return true;
    }
    return false;
  }
}

export default new Auth();
