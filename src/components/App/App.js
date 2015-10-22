/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './App.css';
import withContext from '../../decorators/withContext';
import withStyles from '../../decorators/withStyles';
import Header from '../Header';
import Feedback from '../Feedback';
import Footer from '../Footer';

class App extends Component {

  render() {

    return !this.props.error ? (
      <div className="App">
        <div>{this.props.example.text}</div>
      </div>
    ) : this.props.children;
  }

}

export default App;