import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { urls } from './util';
import LandingPage from './landing-page';

export const AppRouter = ({ history }: any) => (
  <ConnectedRouter history={history}>
      <Switch>
        <Route exact path={urls.landingPage()} component={LandingPage} />
        <Redirect to={urls.landingPage()} />
      </Switch>
  </ConnectedRouter>
);
