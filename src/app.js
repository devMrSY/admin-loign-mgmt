import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Login from './components/login';
import Error from './components/error';
import Dashboard from './components/dashboard';

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="*" component={Error} />
        </Switch>
      </BrowserRouter>
    );
  }
}
