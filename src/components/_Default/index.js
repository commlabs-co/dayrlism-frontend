/* @flow */

import React from 'react';
import { Row, Col, Calendar } from 'antd';
import styles from './styles.scss';

function onPanelChange(value, mode) {
  console.log(value, mode);
}

export default () => (
  <div className={styles.UserList}>
    <h4>User List</h4>
    <Row className={styles.Test} gutter={16}>
      <Col className="gutter-row" span={6}>
        <div className="gutter-box">col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className="gutter-box">col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className="gutter-box">col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className="gutter-box">col-6</div>
      </Col>
    </Row>
    <Calendar onPanelChange={onPanelChange} />
  </div>
);
