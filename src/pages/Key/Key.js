/* @flow */
import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import axios from 'axios';
import moment from 'moment';
import * as api from 'helpers/library/api';
import { Row, Col, Button, Form, Input, Icon, DatePicker, Radio, notification, Select } from 'antd';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;

import { Navigator } from '../../components';
import styles from './styles.scss';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


const KeyForm = Form.create()(
  class extends React.Component {
    componentDidMount() {
      this.props.form.validateFields();
    }
    handleNotification = (type, msg, des) => {
      notification[type]({
        message: msg,
        description: des,
      });
    };
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);

          let guestinfos = {};
          Object.assign(values, {dob : values.dob? moment(values.dob._d).format("YYYY-MM-DD"):undefined});
          Object.assign(values, {profile_image : "-"});
          Object.assign(guestinfos, {guestinfos:values});

          api.createRequest(guestinfos).then(res => {
              if(!res.error){
                this.handleNotification('success', res.message, 'Kindly be awaited for approved...');
                this.props.form.resetFields();
                this.props.form.validateFields();
                return;
              } else if(res.error){
                this.handleNotification('info', res.errMessage, 'Ops, you have registered before...');
              }else {
                this.handleNotification("error", res.errMessage, "Ops, something went wrong...");
              }
            });
            return;
        }
        this.handleNotification('error');

      });


    }
    render() {
      const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

      // Only show error after a field is touched.
      const calendarError = isFieldTouched('dob') && getFieldError('dob');
      const genderError = isFieldTouched('gender') && getFieldError('gender');
      const reasonrequestError = isFieldTouched("reason_request") && getFieldError("reason_request");
      const nameError = isFieldTouched('name') && getFieldError('name');
      const emailError = isFieldTouched("email") && getFieldError("email");
      const passwordError = isFieldTouched('password') && getFieldError('password');

      return <Form onSubmit={this.handleSubmit}>
          <FormItem validateStatus={nameError ? "error" : ""} help={nameError || ""}>
            {getFieldDecorator("name", {
              rules: [
                { required: true, message: "Please input your name!" }
              ]
            })(<Input prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="Name" />)}
          </FormItem>
          <FormItem validateStatus={emailError ? "error" : ""} help={emailError || ""}>
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]
            })(<Input prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />} type="email" placeholder="Email" />)}
          </FormItem>
          <FormItem validateStatus={reasonrequestError ? "error" : ""} help={reasonrequestError || ""}>
            {getFieldDecorator("reason_request", {
              rules: [
                { required: true, message: "Please select reason!" }
              ]
            })(<Select placeholder="Please select reason request">
                <Option value="knowing_me">Knowing Dayrl</Option>
                <Option value="for_my_profession">
                  For His Profession
                </Option>
                <Option value="build_website">
                  Wanna build a website
                </Option>
                <Option value="others">Others</Option>
              </Select>)}
          </FormItem>
          <FormItem validateStatus={calendarError ? "error" : ""} help={calendarError || ""}>
            {getFieldDecorator("dob", {
              rules: [
                {
                  type: "object",
                  required: true,
                  message: "Please select time!"
                }
              ]
            })(<DatePicker />)}
          </FormItem>

          <FormItem validateStatus={genderError ? "error" : ""} help={genderError || ""}>
            {getFieldDecorator("gender", {
              rules: [
                { required: true, message: "Please input your Gender" }
              ]
            })(<RadioGroup>
                <RadioButton value="Male">Male</RadioButton>
                <RadioButton value="Female">Female</RadioButton>
              </RadioGroup>)}
          </FormItem>

          <FormItem>
            <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
              Submit
            </Button>
          </FormItem>
        </Form>;
    }
  }
);

export default class Key extends PureComponent {
  componentDidMount(){
    console.log(this.props.history);

    if(this.props.route.authNeeded){
      this.props.history.push('/');
    }
  }
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
