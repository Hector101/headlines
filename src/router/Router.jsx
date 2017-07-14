import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../components/Home';
import Dashboard from '../components/Dashboard';
import Auth from '../auth/auth';
import store from '../flux/store/store';


/**
 * @description React router component
 * @class Routes
 * @extends {React.Component}
 */
class Routes extends React.Component {

  /**
   * @description Creates an instance of Routes.
   * @description set initial component state.
   * @param {Object} props
   * @memberof Routes
   * @constructs Routes
   */
  constructor(props) {
    super(props);
    if (Auth.ifLoggedin()) {
      this.state = {
        auth: Auth.ifLoggedin(),
      };
    } else {
      this.state = {
        auth: false,
      };
    }
    this.updateAuth = this.updateAuth.bind(this);
  }

  /**
   * @description check if store updates
   * @memberof Routes
   * @method componentWillMount
   */
  componentWillMount() {
    store.on('change', this.updateAuth);
  }

  /**
   * @description remove this.updateAuth from the store
   * @description event listener before component unmounts
   * @memberof Routes
   * @method componentWillUnmount
   */
  componentWillUnmount() {
    store.removeListener('change', this.updateAuth);
  }

  /**
   * @description set state property "auth"
   * @description with authentication value
   * @memberof Routes
   * @method updateAuth
   * @return {void}
   */
  updateAuth() {
    this.setState({
      auth: Auth.ifLoggedin(),
    });
  }
  /**
   * @description render jsx to DOM
   * @method render
   * @return {JSX}
   * @memberof Routes
   */
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (this.state.auth ? (<Redirect push to="/dashboard" />)
            : (<Home />))}
            />
            <Route
              path="/dashboard"
              render={() => (!this.state.auth ? (<Redirect to="/" />)
            : (<Dashboard />))}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Routes;

