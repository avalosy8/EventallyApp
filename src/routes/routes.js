import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/home';
import Events from '../pages/events';
import Points from '../pages/points';
import Login from '../Components/Login'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/home" component={Home} />
    <Route path="/events" component={Events} />
    <Route path="/points" component={Points} />
    {/* <Route path="*" component={NotFound}/> */}
  </Switch>
);

export default Routes;