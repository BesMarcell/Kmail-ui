import React, { Component, PropTypes } from 'react';
import { Menu, Header } from 'semantic-ui-react';
import { browserHistory } from 'react-router';

class Sidebar extends Component {
  constructor(){
    super();
    this.state = {active: ''}
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {
    this.props.fetch();
  }

  clickHandler(event, { name }){
    this.setState({active: name});
    if (name === 'signout') {
      this.props.signout();
      return browserHistory.push('/')
    }
    browserHistory.push(`/${name}`);
  }
  render() {
    const active = this.state;
    return(
      <div>
        hello, {this.props.account.info.email}
        <Menu>
          <Menu.Item
            active={active === ''}
            name=""
            onClick={this.clickHandler}
          >
            <Header as="h3">
              Home
            </Header>
          </Menu.Item>
          <Menu.Menu position="right">
            {!this.props.account.isAuthenticated ?
              <Menu.Item
                active={active === 'signin'}
                name="signin"
                onClick={this.clickHandler}
              >
                <Header as="h3">
                  SIGN IN
                </Header>
              </Menu.Item>
              :
              null}
            {!this.props.account.isAuthenticated ?
              <Menu.Item
                name="signup"
                active={active==='signup'}
                onClick={this.clickHandler}
              >
                <Header as="h3">
                  SIGN UP
                </Header>
              </Menu.Item>
              :
              null}
            {this.props.account.isAuthenticated ?
              <Menu.Item
                name="signout"
                active={active==='signout'}
                onClick={this.clickHandler}
              >
                <Header as="h3">
                  SIGN OUT
                </Header>
              </Menu.Item>
              :
              null}
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

Sidebar.propTypes = {
  account: PropTypes.object.isRequired,
  signout: PropTypes.func.isRequired,
  fetch: PropTypes.func.isRequired
}

export default Sidebar;
