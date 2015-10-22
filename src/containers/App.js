import App from '../components/App';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

let container = {};

if ( canUseDOM ) {
  let Relay = require('react-relay');
  container = Relay.createContainer(App, {
    fragments: {
      example: () => Relay.QL`
        fragment on Example {
          text,
          id
        }
      `
    }
  });
}

export default container;