/* @flow */
import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { Row, Col, Button, Form, Input, Icon, notification, Spin, message } from 'antd';
import { AuthenticationLogin } from 'helpers/auth';
import * as api from 'helpers/library/api';
import { Navigator } from '../../components';
import * as actionAccess from '../../actions/access';
import type {
  AccessInfo as UserAccessType,
  Dispatch,
  ReduxState
} from '../../types';
import styles from './styles.scss';
const FormItem = Form.Item;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

type Props = {
  access: UserAccessType,
  match: Object,
  fetchAccessIfNeeded: (id: string) => void
};

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
              AuthenticationLogin(res.jwttoken);
              message.success(`HELLO! `);              
              this.props.history.push('/');
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
      const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
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
          <FormItem>
            <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())} > Log in </Button>
          </FormItem>
        </Form>
      );
    }
  }
);

export  class Access extends PureComponent {
  componentDidMount() {
    const { fetchAccessIfNeeded, match } = this.props;
    fetchAccessIfNeeded(match.params.id);
  }

  renderAccess = () => {
    const { access, match: { params } } = this.props;
    const accessById = access[params.id];

    console.log(accessById);

    if (!accessById || accessById.readyStatus === 'AUTHENTICATING') {
      return <Spin indicator={antIcon} />;
    } else if (accessById.readyStatus === 'AUTHENTICATE_FAILURE') {
      return <p>Oops, Failed to load info!</p>;
    } 
    
    return <AccessForm />;
  }

  render() {
    return (
      <div className={styles.Access}>
        <Helmet title="Access" />
        <Navigator />
        <div className={styles.container}>
          <Row className={styles.bridge}>
            <Col className={styles.Logo} span={24}><span/></Col>
            <Col className={styles.Form} span={24}>
              {this.renderAccess()}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}


const connector = connect(
  ({ access }: ReduxState) => ({ access }),
  (dispatch: Dispatch) => ({
    fetchAccessIfNeeded: (id: string) =>
      dispatch(actionAccess.fetchAccessIfNeeded(id))
  })
);

// Enable hot reloading for async componet
export default compose(hot(module), withRouter, connector)(Access);
