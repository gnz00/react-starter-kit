/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './TeaStore.css';
import withStyles from '../../decorators/withStyles';
import Tea from '../Tea';

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

@withStyles(styles)
class TeaStore extends React.Component {
  render() {
    const title = 'Tea Store';
    return <div className="TeaStore">
      <div className="TeaStore-container">
        <h1>{title}</h1>
        <ul className="TeaStore-TeaList">
        {
          this.props.store.teas.map((tea, index) => {
            return <Tea key={`${tea}-${index}`} tea={tea} />;
          })
        }
        </ul>;
      </div>
    </div>
  }
}

export default TeaStore;
