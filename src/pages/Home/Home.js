/* @flow */
import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { Navigator } from '../../components';
import styles from "./styles.scss";

export default class Home extends PureComponent {
  renderNavigator = () => {
    return (
      <div>
        <Navigator />
        <div className={styles.logo}></div>
      </div>
    );
  };
  render() {
    return (
      <div className={styles.Home}>
        <Helmet title="Home" />
        {this.renderNavigator()}
      </div>
    );
  }
}
