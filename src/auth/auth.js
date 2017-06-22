import Actions from '../flux/actions/Actions';

class Auth {
  constructor() {
    this.ifLoggedin = this.ifLoggedin.bind(this);
  }

  /**
   * set values authentication value to local strorage to true,
   * to allow user to be authenticated if authentication was
   * successful, else set to false to log user out.
   * @param {Object} signInResonse
   */
  signIn(signInResonse) {
    if (!signInResonse.error) {
      localStorage.setItem('auth', true);
      localStorage.setItem('userDetail', JSON.stringify(signInResonse.profileObj));
      Actions.getAuth(this.ifLoggedin);
    } else {
      localStorage.removeItem('auth');
    }
  }

  /**
   * set values authentication value to local strorage to false,
   * to allow user to signout of the app.
   * @memberof Auth
   */
  signOut() {
    localStorage.removeItem('auth');
    localStorage.removeItem('userDetail');
    Actions.getAuth(this.ifLoggedin);
  }

  /**
   * Method checks if user is logged in to return true,
   * else return false to log user out
   * @returns true if auth object exist in the local staorage
   * @returns false if auth object doesn't exist in the local staorage
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
