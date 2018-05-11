/* @flow */

import React from 'react';
import { Row, Col, Calendar, Card } from 'antd';
import styles from './styles.scss';
import { Link } from "react-router-dom";

function onPanelChange(value, mode) {
  console.log(value, mode);
}

export default () => (
  <div className={styles.Navigator}>
    <Row className={styles.Row} type="flex" justify="center" align="top">
      <Col className={styles.bridge} span={12}><Link to="/" className={styles.home}><span className={styles.logo}></span></Link></Col>
      <Col className={styles.bridge} span={12}>
        <Link to="/about" className={styles.lee}>
          <span className={styles.word}>
            <span>LEE</span>
            <span className={styles.underLine}> </span>
          </span>
        </Link>
      </Col>
    </Row>
    <Row className={styles.Row} type="flex" justify="center" align="bottom">
      <Col className={styles.bridge} span={12}><Link to="/key" className={styles.key}>KEY</Link></Col>
      <Col className={styles.bridge} span={12}><Link to="/access" className={styles.access}>Access</Link></Col>
    </Row>
  </div>
);
