/* @flow */

import React from 'react';
import { Card } from 'antd';
import styles from './styles.scss';

export default () => (
  <div className={styles.Loading}>
    <Card loading={true} title="Im loading">
      Whatever content 
    </Card>
  </div>
);
