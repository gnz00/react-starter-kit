import React, { PropTypes, Component } from 'react';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

class Tea extends React.Component {
  render() {
    var {name, steepingTime} = this.props.tea;
    return (
      <li key={name}>
        {name} (<em>{steepingTime} min</em>)
      </li>
    );
  }
}

if (canUseDOM) {
  let Relay = require('react-relay');
  Tea = Relay.createContainer(Tea, {
    fragments: {
      tea: () => Relay.QL`
        fragment on Tea {
          name,
          steepingTime,
        }
      `,
    },
  });
}

export default Tea;