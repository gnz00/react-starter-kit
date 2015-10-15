/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import {Router} from 'react-routing';
import http from './core/HttpClient';
import App from './components/App';
import ContentPage from './components/ContentPage';
import ContactPage from './components/ContactPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';

import ExampleRoot from './roots/ExampleRoot';
import Application from './containers/App';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

if ( canUseDOM ) {
  let Relay = require('react-relay');
  class Root extends React.Component {
    render() {
      return (
        <Relay.RootContainer
          Component={ Application }
          route={ new ExampleRoot() } />
      );
    }
  }
}

const router = new Router(on => {
  on('*', async (state, next) => {
    const component = await next();

    console.log(typeof window);
    if (canUseDOM) {
      return component && <Root context={state.context}>{component}</Root>;
    } else {
      return component && <App context={state.context}>{component}</App>;
    }
  });

  on('/contact', async () => <ContactPage />);

  on('/login', async () => <LoginPage />);

  on('/register', async () => <RegisterPage />);

  on('*', async (state) => {
    const content = await http.get(`/api/content?path=${state.path}`);
    return content && <ContentPage {...content} />;
  });

  on('error', (state, error) => state.statusCode === 404 ?
    <App context={state.context} error={error}><NotFoundPage /></App> :
    <App context={state.context} error={error}><ErrorPage /></App>
  );
});

export default router;
