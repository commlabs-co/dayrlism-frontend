/* @flow */
import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import styles from './styles.scss';

export default class Default extends PureComponent {
  renderDefault = () => <div className={styles.container} />;

  render() {
    return (
      <div className={styles.Default}>
        <Helmet title="Default" />
        {this.renderDefault()}
      </div>
    );
  }
}
