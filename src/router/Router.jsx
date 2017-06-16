import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../components/Home';
import Dashboard from '../components/Dashboard';
import Auth from '../auth/auth';
import store from '../flux/store/store';

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
  componentWillMount() {
    store.on('change', this.updateAuth);
  }
  componentWillUnmount() {
    store.removeListener('change', this.updateAuth);
  }
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

