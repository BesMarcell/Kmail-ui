import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
// import Signin from './signin/signinComponent';
// import Signup from './signup/signupComponent';
import Root from './root/rootContainer';
import App from '../App';
import Signin from './signin/signinContainer';
import Signup from './signup/signupContainer';

const routes = (
  <div>
  <Route path="/" component={ Root }>
    // <IndexRoute component={ App } />
    <Route path="app" component={ App } />
  </Route>
  <Route path="/signin" component={ Signin } />
  <Route path="/signup" component={ Signup } />
  </div>
);

const MainRouter = () => (
  <Router history={browserHistory}>
    { routes }
  </Router>
);

export default MainRouter;
