/* @flow */
import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import InstagramLogin from 'react-instagram-login';
import FacebookLogin from 'react-facebook-login';
import { Icon, Alert, Steps, Button, message } from 'antd';
import PropTypes from 'prop-types';
import { AuthState, SessionData } from 'helpers/auth';
import * as cookie from 'js-cookie';
import * as api from 'helpers/library/api';

import { IGCard } from '../../components'; 
import styles from './styles.scss';

const Step = Steps.Step;
const steps = [
  { title: 'Login Instagram' },
  { title: 'Load Images' },
  { title: 'Submitted Succefully' }
];
export default class PrivateDoor extends PureComponent {
  state={
    returnframe:[],
    current: 0,
    igresponse:[]
  };
  componentWillMount() {
    if (
      SessionData('token') === undefined &&
      (AuthState() === 'false' || AuthState() === undefined)
    ) {
      this.props.history.push('/');
    }
  }
  componentDidMount() {    
    this.renderIGCard();
  }
  renderIGCard = async () => {
    const { data } = await api.getIgRecentPost(SessionData('igtoken'));
    this.setState({igresponse:data});
    console.log(this.state.igresponse);
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  renderPrivateDoor = () => {
    const { current } = this.state;
    const responseInstagram = (response) => {
      cookie.set('igtoken', response, { expires: 1 });
    }
    const responseFacebook = (response) => {
      console.log(response);
    }
    const componentClicked = (response) => {
      console.log(response);
    }

    return(
      <div className={styles.container}>
        <Alert type="info" message="You will need to login to instagram for the best experienced of my site..." banner />
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className={styles.stepsContent}>
          {
            this.state.current === 0
            &&
            <div>
              <InstagramLogin
                clientId={__IGCLIENTID__}
                implicitAuth="true"
                onSuccess={responseInstagram}
                onFailure={responseInstagram}
              >
                <Icon type="instagram" />
                <span> Login with Instagram</span>
              </InstagramLogin>
              <FacebookLogin
                appId="174974206508127"
                autoLoad={true}
                fields="name,email,picture"
                onClick={componentClicked}
                callback={responseFacebook} />
            </div>
          }
          {
            this.state.current === 1
            &&
            <div>
              <IGCard info={this.state.igresponse} />
            </div>
          }
          {
            this.state.current === 2
            &&
            <div>3</div>
          }
        </div>
        <div className={styles.stepsAction}>
          {
            this.state.current < steps.length - 1
            &&
            <Button type="primary" onClick={() => this.next()}>Next</Button>
          }
          {
            this.state.current === steps.length - 1
            &&
            <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
          }
          {
            this.state.current > 0
            &&
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          }
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className={styles.PrivateDoor}>
        <Helmet title="Dayrlism..." />
        {this.renderPrivateDoor()}
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
