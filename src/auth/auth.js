import Actions from '../flux/actions/Actions';

/**
 * @description Authentication class
 * @class Auth
 */
class Auth {

  /**
   * Creates an instance of Auth.
   * @memberof Auth
   */
  constructor() {
    this.isLoggedin = this.isLoggedin.bind(this);
  }

  /**
   * set authentication value to local strorage to true.
   * save user details to local storage
   * @param {Object} signInResonse - authentication response object
   * @return {void}
   */
  signIn(signInResonse) {
    if (!signInResonse.error) {
      localStorage.setItem('auth', true);
      localStorage.setItem('userDetail', JSON.stringify(signInResonse.profileObj));
      Actions.getAuth(this.isLoggedin());
    } else {
      localStorage.removeItem('auth');
    }
  }

  /**
   * @description set authentication value to local strorage to false.
   * @description remove user details from local storage.
   * @memberof Auth
   * @returns {void}
   */
  signOut() {
    localStorage.removeItem('auth');
    localStorage.removeItem('userDetail');
    Actions.getAuth(this.isLoggedin());
  }

  /**
   * @description check if user is logged in to return true,
   * else return false to log user out
   * @memberof Auth
   * @returns {void}
   */
  isLoggedin() {
    if (localStorage.getItem('auth')) {
      return true;
    }
    return false;
  }
}

export default new Auth();
