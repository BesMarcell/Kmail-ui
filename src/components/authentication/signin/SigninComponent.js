import React, { Component, PropTypes} from 'react';
import { Grid, Form, Input, Label, Button, Message, Header} from 'semantic-ui-react'
import { Link, browserHistory } from 'react-router';

import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import { joiSchema } from './validation';

class Signin extends Component {
  constructor(){
    super();
    this.state={
      accountInfo:{
        email: '',
        password:''
      },
      errorMessages: {
        email: {
          message: '',
          show: false
        },
        password: {
          message: '',
          show: false
        }
      },
      isWasSigninAttempt: false,
      isWasSendSigninRequestAttempt: false
    }
    this.handleFormChange = this.handleFormChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  validatorTypes = joiSchema;

  getValidatorData() {
    return this.state.accountInfo;
  }

  componentWillMount() {
    if (this.props.account.isAuthenticated) {
      browserHistory.push('/')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.account.isAuthenticated) {
      browserHistory.push('/')
    }
  }

  submitForm(event) {
    event.preventDefault();
    const onValidate = errors => {
      if (errors) {
        this.validateErrorHandler(errors);
      } else {
        this.props.signin(this.state.accountInfo)
        this.setState({
          isWasSigninAttempt: true
        })
      };
      this.setState({
        isWasSendSigninRequestAttempt :true
      })
    };
    this.props.validate(onValidate.bind(this))
  }

  handleFormChange(event) {
    const accountInfo = this.state.accountInfo;
    accountInfo[event.target.name] = event.target.value;
    this.setState({accountInfo});
    if (this.state.isWasSendSigninRequestAttempt) {
      this.props.validate(this.validateErrorHandler.bind(this));
    }
  }

  validateErrorHandler(errors = {}) {
    Object.keys(this.state.errorMessages).forEach(field => {
      const errorMessages = this.state.errorMessages;
      if (errors.hasOwnProperty(field)) {
        const message = errors[field][0];
        errorMessages[field].message = message;
        errorMessages[field].show = true;
      } else {
        errorMessages[field].message = '';
        errorMessages[field].show = false;
      }
      this.setState({errorMessages});
    })
  }

  showServerErrors() {
    const {account} = this.props;
    if (account.statusCode===401 && !account.isAuthenticated && this.state.isWasSigninAttempt)
      return (
        <Message negative>
          <p>
            Incorrect email and password
          </p>
        </Message>
      )
  }

  renderConnectError() {
    const { account } = this.props;

    if (account.statusCode === 502) {
      return (
        <Message negative>
          <Message.Header>
            Problems with api server
          </Message.Header>
          <p>
            Can nott connect to the api server.<br />
            Try later.
          </p>
        </Message>
      );
    }
  }

  render(){
    return(
      <Grid verticalAlign="middle" columns={1} centered>
        <Grid.Column width="5">
        <Grid.Row>
          <Grid.Row>
          <Grid.Column>
            <Header>
              SIGN IN FORM
            </Header>
          </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              {this.showServerErrors()}
              {this.renderConnectError()}
              <Form onSubmit={this.submitForm}>
                <Form.Field>
                  <Label>
                    Input email
                  </Label>
                  <Input
                    placeholder="input email"
                    name="email"
                    value={this.state.accountInfo.email}
                    onChange={this.handleFormChange}
                  />
                  { this.state.errorMessages.email.show ?
                  <Label basic color="red" pointing>{ this.state.errorMessages.email.message }</Label>:null}
                </Form.Field>
                <Form.Field>
                  <Label>
                    Input password
                  </Label>
                  <Input
                    placeholder="input password"
                    name="password"
                    value={this.state.accountInfo.password}
                    onChange={this.handleFormChange}
                  />
                  { this.state.errorMessages.password.show?
                  <Label basic color="red" pointing>{ this.state.errorMessages.password.message }</Label> : null}
                </Form.Field>
                <Button onClick={this.submitForm} color="blue">
                  Sign in
                </Button>
              </Form>
            </Grid.Column>
            <Message attached='bottom'>
              Not registered yet? <Link to="/signup"> sign up </Link> or go <Link to="/"> Home </Link>
            </Message>
          </Grid.Row>
        </Grid.Row>
        </Grid.Column>
      </Grid>
    )
  }
}

Signin.propTypes = {
  account: PropTypes.object.isRequired,
  signin: PropTypes.func.isRequired
}

export default validation(strategy)(Signin);
