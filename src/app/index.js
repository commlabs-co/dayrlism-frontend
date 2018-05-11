/* @flow */

import React from 'react';
import { renderRoutes } from 'react-router-config';
import Helmet from 'react-helmet';
import config from '../config';
// Import your global styles here
// import '../../../node_modules/normalize.css/normalize.css';
import styles from './styles.scss';

type Props = { route: Object };

export default ({ route }: Props) => (
  <div className={styles.App}>
    <Helmet {...config.app} />
    {/* child routes won't render without this */}
    {renderRoutes(route.routes)}
  </div>
);
