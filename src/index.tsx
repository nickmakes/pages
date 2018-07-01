import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ClientFactory } from 'mmdb-client-factory';

import { AppHarness } from './app-harness';
import { AppRouter } from './app-router';

require('../static/favicon.ico');
require('../static/main.less');

ClientFactory.buildHttp().then(client => {
  const app = new AppHarness(client, process.env);

  const renderApp = (Component: typeof AppRouter) =>
    render(
      <Provider store={app.store}>
        <AppContainer>
          <Component history={app.history} />
        </AppContainer>
      </Provider>,
      document.getElementById('root')
    );

  renderApp(AppRouter);

  if ((module as any).hot) {
    (module as any).hot.accept('./app-router', () => {
      const appRouter = require('./app-router');
      renderApp(appRouter);
    });
  }
});
