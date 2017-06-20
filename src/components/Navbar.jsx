import React from 'react';
  // import dependency
import GoogleLogin from 'react-google-login';

import Auth from '../auth/auth';

/**
 * Navbar react componet
 */
class Navbar extends React.Component {
  /**
  * call each time login authentication is either
  successful or faiiled
  * @param {Object} response
  */
  responseGoogle(response) {
    Auth.signIn(response);
  }

  /**
  * sign user on fire
  */
  signOut() {
    Auth.signOut();
  }
  
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
              !Auth.ifLoggedin() ? (<GoogleLogin
                clientId={'280387982886-h6rndqluquvvgujtos24h4vbkjv7rq6l.apps.googleusercontent.com'}
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

