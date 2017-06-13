import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../components/Home';
import Dashboard from '../components/Dashboard';
import Auth from '../auth/auth';

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
  }
  componentWillMount() {
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
              render={() => (this.state.auth ? (<Redirect to="/dashboard" {...this.props} />)
            : (<Home />))}
            />
            <Route
              path="/dashboard"
              exact
              render={() => (!this.state.auth ? (<Redirect to="/" {...this.props} />)
            : (<Dashboard />))}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Routes;

