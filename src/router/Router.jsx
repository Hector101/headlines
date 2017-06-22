import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../components/Home';
import Dashboard from '../components/Dashboard';
import Auth from '../auth/auth';
import store from '../flux/store/store';


/**
 * React router component.
 * contains the logic to route users
 * to a particular route base on the available
 * authentication value
 * @class Routes
 * @extends {React.Component}
 */
class Routes extends React.Component {
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
   * Called when component is about to mount.
   * listens for a change of value in the store
   * to call the method updateAuth, which
   * updates the component state with the new value
   * from the store
   * @memberof Routes
   */
  componentWillMount() {
    store.on('change', this.updateAuth);
  }

  /**
   * remove this.updateAuth from the store
   * event listener before component unmounts
   * @memberof Routes
   */
  componentWillUnmount() {
    store.removeListener('change', this.updateAuth);
  }
  
  /**
   * when called, sets the component
   * state with the new value from the local storage
   * @memberof Routes
   */
  updateAuth() {
    this.setState({
      auth: Auth.ifLoggedin(),
    });
  }
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

