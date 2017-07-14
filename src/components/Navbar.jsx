import React from 'react';
  // import dependency
import GoogleLogin from 'react-google-login';

import Auth from '../auth/auth';

/**
 * Navbar component containing the signin
 * and signout logic.
 * @class Navbar
 * @extends {React.Component}
 */
class Navbar extends React.Component {

  /**
  * Authenticate user
  * @param {Object} response
  * @method responseGoogle
  */
  responseGoogle(response) {
    Auth.signIn(response);
  }

  /**
   * signout user
   * @memberof Navbar
   * @method signOut
   * @return {void}
   */
  signOut() {
    Auth.signOut();
  }

  /**
   * @description render jsx to the dom
   * @returns {void}
   * @memberof Navbar
   */
  render() {
    return (
      <nav className="navbar-fixed #616161 grey darken-2">
        <div id="navbar" className="nav-wrapper">
          <a className="brand-logo logo">News Feed</a>
          <a
            href="#!"
            data-activates="slide-out"
            className="button-collapse"
          >
            <i className={'material-icons'}>menu</i></a>
          <ul id="nav-mobile" className="right">
            <li>
              {
              !Auth.isLoggedin() ? (<GoogleLogin
                clientId={`${process.env.CLIENT_ID}`}
                buttonText="Sign in"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                tag="a"
                className="login"
              ><span className="white-text">Sign in</span>
                <i className="material-icons left">arrow_forward</i>
              </GoogleLogin>) : (<a href="/" onClick={this.signOut} >
              Sign out<i className="material-icons signout left">arrow_back</i></a>)
            }
            </li>
          </ul>
        </div>
      </nav>
    );
  }

}
export default Navbar;

