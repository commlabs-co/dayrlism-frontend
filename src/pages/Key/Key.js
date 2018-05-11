/* @flow */
import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import axios from 'axios';
import moment from 'moment';
import * as api from 'helpers/library/api';
import { Row, Col, Button, Form, Input, Icon, DatePicker, Radio, notification } from 'antd';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

import { Navigator } from '../../components';
import styles from './styles.scss';

const KeyForm = Form.create()(
  class extends React.Component {
    componentDidMount() {
      // To disabled submit button at the beginning.
      this.props.form.validateFields();    
    }
    handleNotification = (type) => {
      notification[type]({
        message: 'Notification Title',
        description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      });
    };
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          api
            .createRequest(
              values.name,
              moment(values.date_picker._d).format("YYYY-MM-DD"),
              values.radio_Gender,
              values.password,
              values.email
            )
            .then(res => {
              if(!res.error){
                this.handleNotification('success');
                this.props.form.resetFields();
                this.props.form.validateFields();  
                return;
              }
              this.handleNotification('error');
            });
            return;
        }
        this.handleNotification('error');
        
      });
      
      
    }
    render() {
      const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

      // Only show error after a field is touched.
      const calendarError = isFieldTouched('date_picker') && getFieldError('date_picker');
      const genderError = isFieldTouched('radio_Gender') && getFieldError('radio_Gender');
      const nameError = isFieldTouched('name') && getFieldError('name');
      const userNameError = isFieldTouched("userName") && getFieldError("userName");
      const emailError = isFieldTouched("email") && getFieldError("email");
      const passwordError = isFieldTouched('password') && getFieldError('password');

      const config = {
        rules: [{ type: 'object', required: true, message: 'Please select time!' }],
      };

      return (
        <Form onSubmit={this.handleSubmit}>      
          <FormItem
            validateStatus={nameError ? 'error' : ''}
            help={nameError || ''}
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input your name!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
            )}
          </FormItem>
          <FormItem 
            validateStatus={calendarError ? 'error' : ''}
            help={calendarError || ''}
          >
            {getFieldDecorator('date_picker', config)(
              <DatePicker />
            )}
          </FormItem>
          <FormItem
            validateStatus={genderError ? 'error' : ''}
            help={genderError || ''}
          >
            {getFieldDecorator('radio_Gender',{
              rules: [{ required: true, message: 'Please input your Gender' }],
            })(
              <RadioGroup>
                <RadioButton value="Male">Male</RadioButton>
                <RadioButton value="Female">Female</RadioButton>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}
          >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem
            validateStatus={emailError ? 'error' : ''}
            help={emailError || ''}
          >
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
            })(
              <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Email" />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              Log in
          </Button>
          </FormItem>
        </Form>
      );
    }
  }
);

export default class Key extends PureComponent {
  render() {
    return (
      <div className={styles.Keys}>
        <Helmet title="Keys" />
        <Navigator />
        <div className={styles.container}>
          <Row className={styles.bridge}>
            <Col className={styles.Logo} span={24}><span /></Col>
            <Row className={styles.Form}>
              <KeyForm />              
            </Row>
          </Row>
        </div>
      </div>
    );
  }
}
