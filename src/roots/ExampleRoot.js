import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
let exampleRoot = {};

if (canUseDOM) {
  let Relay = require('react-relay');
  exampleRoot = class extends Relay.Route {
    static path = '/';
    static queries = {
      example: (Component) => Relay.QL`
        query {
          example {
            ${Component.getFragment('example')}
          }
        }
      `
    };
    static routeName = 'ExampleRoute';
  }
}

export default exampleRoot;