/* @flow */
import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { Row, Col, Button, Form, Input, Icon, notification } from "antd";
import * as api from 'helpers/library/api';
import { Navigator } from '../../components';
import styles from './styles.scss';
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const AccessForm = Form.create()(
  class extends React.Component {
    componentDidMount() {
      this.props.form.validateFields();
    }
    handleNotification = (type, msg, des) => {
      notification[type]({
        message: msg,
        description: des
      });
    };
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          api.loginAccess(values.userName, values.password).then(res => {
            if (!res.error) {
              this.handleNotification('success', res.message, 'Going to log you in...');
              this.props.form.resetFields();
              this.props.form.validateFields();
              console.log(res);
              return;
            } else if (res.error) {
              this.handleNotification('info', res.errMessage, 'Ops, admin hasnt approved you yet, kindly wait for hashkey from dayrl soon...');
            } else {
              this.handleNotification('error', res.errMessage, 'Ops, something went wrong...');
            }
          });
        }
      });
    };
    render() {
      const {
        getFieldDecorator,
        getFieldsError,
        getFieldError,
        isFieldTouched
      } = this.props.form;

      // Only show error after a field is touched.
      const userNameError = isFieldTouched("userName") && getFieldError("userName");
      const passwordError = isFieldTouched("password") && getFieldError("password");

      return (
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem validateStatus={userNameError ? "error" : ""} help={userNameError || ""} >
            {getFieldDecorator("userName", {
              rules: [ { required: true, message: "Please input your username!" } ]
            })(
              <Input prefix={ <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} /> } placeholder="Username" />
            )}
          </FormItem>
          <FormItem validateStatus={passwordError ? "error" : ""} help={passwordError || ""} >
            {getFieldDecorator("password", {
              rules: [ { required: true, message: "Please input your Password!" } ]
            })(
              <Input prefix={ <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} /> } type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem> <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())} > Log in </Button>
          </FormItem>
        </Form>
      );
    }
  }
);

export default class Access extends PureComponent {
  

  render() {
    return (
      <div className={styles.Access}>
        <Helmet title="Home" />
        <Navigator />
        <div className={styles.container}>
          <Row className={styles.bridge}>
            <Col className={styles.Logo} span={24}><span/></Col>
            <Col className={styles.Form} span={24}>
              <AccessForm />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
