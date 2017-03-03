/*
import React, { Component } from 'react';
import { connect} from 'react-redux';
import logo from './logo.svg';
import './App.css';
import { ACCOUNT_FETCH_REQUESTED } from './constants/account';
import MainRouter from './containers/MainRouter';
// import setLocale from './locales';

class App extends Component {

  componentWillMount() {

    const {dispatch} = this.props;

    dispatch({
      type: ACCOUNT_FETCH_REQUESTED
    });

  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h3>Welcome to React!</h3>
        </div>
        <MainRouter />
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    tempText: state.test,
    serverInfo: state.serverInfo,
    account: state.account
  }
);

export default connect(mapStateToProps)(App);
*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MainRouter from './containers/MainRouter';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Kmail service</h2>
        </div>
        <p className="App-intro">
          Here will be something
        </p>
        <MainRouter />
      </div>
    );
  }
}

export default App;
