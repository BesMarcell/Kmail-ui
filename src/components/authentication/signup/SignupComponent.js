import React, { Component, PropTypes } from 'react';
import { Grid, Form, Label, Input, Button, Header, Message } from 'semantic-ui-react';
import { browserHistory, Link } from 'react-router';
import _ from 'lodash';
import validateErrorTranslater from './../../../utils/validateErrorTranslater';

import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import { joiSchema } from './validation';

class Signup extends Component {
  validatorTypes = joiSchema;

  constructor(){
    super();
    this.state = {
      accountInfo: {
        nickname:'',
        firstname:'',
        lastname:'',
        email:'',
        password:'',
        confirmPassword:''
      },
      errorMessages: {
        email: {
          show: false,
          message: ''
        },
        nickname: {
          show: false,
          message: ''
        },
        firstname: {
          show: false,
          message: ''
        },
        lastname: {
          show: false,
          message: ''
        },
        password: {
          show: false,
          message: ''
        },
        confirmPassword: {
          show: false,
          message: ''
        }
      },
      isWasSendSignupRequestAttempt: false,
      isWasSignupAttempt: false
    };
    this.submitForm = this.submitForm.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  componentWillMount(){
    if (this.props.account.isAuthenticated) {
      browserHistory.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.account.isAuthenticated) {
      browserHistory.push('/')
    }
  }

  getValidatorData() {
    return this.state.accountInfo;
  }

  handleFormChange(event){
    event.preventDefault();
    const account = this.state.accountInfo;
    account[event.target.name] = event.target.value;
    this.setState({account});
    if (this.state.isWasSendSignupRequestAttempt) {
      this.props.validate(this.validateErrorHandler.bind(this));
    }
  }

  submitForm(event) {
    event.preventDefault();
    const onValidate = errors => {
      if (errors) {
        this.validateErrorHandler(errors);
      } else {
        this.props.signup(_.pick(this.state.accountInfo, ['email', 'password', 'nickname', 'firstname', 'lastname']));
        this.setState({
          isWasSignupAttempt: true
        })
      }
      this.setState({
        isWasSendSignupRequestAttempt: true
      })
    }
    this.props.validate(onValidate.bind(this));
  }

  validateErrorHandler(errors = {}) {

    Object.keys(this.state.errorMessages).forEach((field) => {
      const errorMessages = this.state.errorMessages;

      if (errors.hasOwnProperty(field)) {
        const message = errors[field][0];
        errorMessages[field].message = validateErrorTranslater(message);
        errorMessages[field].show = true;
      } else {
        errorMessages[field].message = '';
        errorMessages[field].show = false;
      }

      this.setState({
        errorMessages
      });
    });
  }

  showServerErrors () {
    const { account } = this.props;
    if (this.state.isWasSignupAttempt && account.statusCode === 400 && account.errorMessage === 'email exists') {
      return (
        <Message negative>
          <p>
            Account with this email already exists
          </p>
        </Message>)
    }
    if (this.state.isWasSignupAttempt && account.statusCode === 400 && account.errorMessage === 'nickname exists') {
      return (
        <Message negative>
          <p>
            Account with this nickname already exists
          </p>
        </Message>)
    }
  }

  render() {
    return(
      <Grid verticalAlign="middle" columns={1} centered>
        <Grid.Column width="5">
          <Grid.Row>
            <Grid.Column>
              <Header as="h3" textAlign="center">
                SIGN UP FORM
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Form>
              <Form.Field>
                <Label>
                  Input nickname
                </Label>
                <Input
                  placeholder="input nickname"
                  name="nickname"
                  value={this.state.accountInfo.nickname}
                  onChange={this.handleFormChange}
                />
                {this.state.errorMessages.nickname.show
                  ? <Label basic color='red' pointing>
                      {this.state.errorMessages.nickname.message}
                    </Label>
                  : null}
              </Form.Field>
              <Form.Field>
                <Label>
                  Input firstname
                </Label>
                <Input
                  placeholder="Input firstname"
                  name="firstname"
                  onChange={this.handleFormChange}>
                </Input>
                {this.state.errorMessages.firstname.show
                  ? <Label basic color='red' pointing>
                      {this.state.errorMessages.firstname.message}
                    </Label>
                  : null}
              </Form.Field>
              <Form.Field>
                <Label>
                  Input lastname
                </Label>
                <Input
                  placeholder="Input lastname"
                  name="lastname"
                  onChange={this.handleFormChange}>
                </Input>
                {this.state.errorMessages.lastname.show
                  ? <Label basic color='red' pointing>
                      {this.state.errorMessages.lastname.message}
                    </Label>
                  : null}
              </Form.Field>
              <Form.Field>
                <Label>
                  Input email
                </Label>
                <Input
                  placeholder="Input email"
                  name="email"
                  onChange={this.handleFormChange}>
                </Input>
                {this.state.errorMessages.email.show
                  ? <Label basic color='red' pointing>
                      {this.state.errorMessages.email.message}
                    </Label>
                  : null}
              </Form.Field>
              <Form.Field>
                <Label>
                  Input password
                </Label>
                <Input
                  placeholder="Input password"
                  type="password"
                  name="password"
                  onChange={this.handleFormChange}>
                </Input>
                {this.state.errorMessages.password.show
                  ? <Label basic color='red' pointing>
                      {this.state.errorMessages.password.message}
                    </Label>
                  : null}
              </Form.Field>
              <Form.Field>
                <Label>
                  Confirm password
                </Label>
                <Input
                  placeholder="Confirm password"
                  type="password"
                  name="confirmPassword"
                  onChange={this.handleFormChange}>
                </Input>
                {this.state.errorMessages.confirmPassword.show
                  ? <Label basic color='red' pointing>
                      {this.state.errorMessages.confirmPassword.message}
                    </Label>
                  : null}
              </Form.Field>
              <Form.Field>
                <Button
                  color="blue"
                  onClick={this.submitForm}>
                  Sign up
                </Button>
              </Form.Field>
            </Form>
            <Message>
              Already signed up? <Link to="/signin">sign in</Link>  or go <Link to="/"> Home </Link>
            </Message>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    )
  }
}

Signup.PropTypes = {
  account: PropTypes.object.isRequired,
}

export default validation(strategy)(Signup);
