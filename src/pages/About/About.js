/* @flow */
import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { Navigator } from '../../components';
import { Row, Col } from 'antd';
import styles from "./styles.scss";

export default class About extends PureComponent {
  renderNavigator = () => {
    return (
      <div>
        <Navigator />
        <div className={styles.background}> </div>
        <div className={styles.container}>
          <Row className={styles.bridge}>
            <Col className={styles.bridge} span={24}><div className={styles.title}>Dayrl General Info</div></Col>
            <Col className={styles.bridge} span={24}><div className={styles.logo}></div></Col>
          </Row>
          <Row className={styles.infos}>
            <Col className={styles.details} lg={5} md={12} sm={24}>
              <Col className={styles.bridge} span={12}>Full Name</Col> <Col className={styles.bridge} span={12}>: <span>Lee Pui Shin</span></Col> 
              <Col className={styles.bridge} span={12}>D.O.B</Col> <Col className={styles.bridge} span={12}>: 13. 01. 1994</Col> 
              <Col className={styles.bridge} span={12}>Skin</Col> <Col className={styles.bridge} span={12}>: Fair</Col> 
              <Col className={styles.bridge} span={12}>Height</Col> <Col className={styles.bridge} span={12}>: 174 cm, 5.7ft</Col> 
              <Col className={styles.bridge} span={12}>Weight</Col> <Col className={styles.bridge} span={12}>: 69 kg, 152 Pound</Col> 
              <Col className={styles.bridge} span={12}>Status</Col> <Col className={styles.bridge} span={12}>: Single</Col> 
              <Col className={styles.bridge} span={12}>Race</Col> <Col className={styles.bridge} span={12}>: Chinese, Buddhist</Col> 
              <Col className={styles.bridge} span={12}>Hobby</Col> <Col className={styles.bridge} span={12}>: Sports, Tech, Travel</Col> 
              <Col className={styles.bridge} span={12}>Personality</Col> <Col className={styles.bridge} span={12}>: Ambitious, Leader, tranqualility spiritual, sophisticated, balance</Col> 
            </Col>
            <Col className={styles.title} lg={5} md={12} sm={24}>
              <Col className={styles.bridge} span={24}>Job Title</Col>
              <Col className={styles.bridge} span={24}><span>Web Developer<br/>Software Engineer</span></Col>
              <Col className={styles.bridge} span={24}>Highest Qualification</Col>
              <Col className={styles.bridge} span={24}>Diploma in IT</Col>
            </Col>

            <Col className={styles.contact} lg={5} md={13} sm={24}>
              <Col className={styles.bridge} span={24}>Hp Number</Col>
              <Col className={styles.bridge} span={24}>+6 0183663236<br/>+6 0166727208</Col>
              <Col className={styles.bridge} span={24}>Email</Col>
              <Col className={styles.bridge} span={24}>findme@lesach.com<br/>dayrl94@gmail.com<br/>halo@dayrlism.com</Col>
            </Col>
            <Col className={styles.quote} lg={5} md={11} sm={24}>
              <Col className={styles.bridge} span={24}>Quote</Col>
              <Col className={styles.bridge} span={24}><span>Life is a game of luck,</span><br/><span>but dream made possible<br/>when excuse no more</span></Col>
            </Col>
            
            <Col className={styles.resume} lg={4} md={24} sm={24}>CV</Col>
          </Row>
        </div>
      </div>
    );
  };
  render() {
    return (
      <div className={styles.About}>
        <Helmet title="About" />
        {this.renderNavigator()}
      </div>
    );
  }
}
