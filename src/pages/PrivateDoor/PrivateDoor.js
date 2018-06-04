/* @flow */
import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { AuthState, SessionData } from 'helpers/auth';

import styles from './styles.scss';

export default class PrivateDoor extends PureComponent {
  componentWillMount() {
    if (
      SessionData('token') === undefined &&
      (AuthState() === 'false' || AuthState() === undefined)
    ) {
      this.props.history.push('/');
    }
  }
  render() {
    return (
      <div className={styles.PrivateDoor}>
        <Helmet title="Dayrlism..." />
      </div>
    );
  }
}

PrivateDoor.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.any.isRequired
  })
};

PrivateDoor.defaultProps = {
  history: {
    push: ''
  }
};
