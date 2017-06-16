import Actions from '../flux/actions/Actions';

class Auth {
  /**
   * creates an instance of the Auth class
   */
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
   * to sign user out.
   */
  signOut() {
    localStorage.removeItem('auth');
    localStorage.removeItem('userDetail');
    Actions.getAuth(this.ifLoggedin);
  }

  /**
   * Method checks if user is logged in to return true,
   * else return false to log user out
   */
  ifLoggedin() {
    if (localStorage.getItem('auth')) {
      return true;
    }
    return false;
  }
}

export default new Auth();
