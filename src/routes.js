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
import TeaStore from './components/TeaStore';
import Tea from './components/Tea';

import Schema from './schema';
import {graphql} from 'graphql';

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

const router = new Router(on => {
  on('*', async (state, next) => {
    const component = await next();
    return component && <App context={state.context}>{component}</App>;
  });

  on('/contact', async () => <ContactPage />);

  // Relay example. Relay isn't fully isomorphic yet, so..
  on('/teas', async () => {
    if (canUseDOM) {
      const Relay = require('react-relay');

      let TeaContainer = Relay.createContainer(TeaStore, {
        fragments: {
          store: () => Relay.QL`
            fragment on Store {
              teas { ${Tea.getFragment('tea')} },
            }
          `,
        },
      });

      class TeaHomeRoute extends Relay.Route {
        static routeName = 'Home';
        static queries = {
          store: (Component) => Relay.QL`
            query TeaStoreQuery {
              store { ${Component.getFragment('store')} },
            }
          `,
        };
      }

      // Client rendering...
      return <Relay.RootContainer
        Component={TeaContainer}
        route={new TeaHomeRoute()}
      />
    }

    // Server rendering...
    let data = await graphql(Schema, '{ store { teas { name, steepingTime } } }');
    return <TeaStore store={data.data.store}/>;
  });

  on('/register', async () => <RegisterPage />);
  on('/login', async () => <LoginPage />);

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
