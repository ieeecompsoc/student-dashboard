import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route,hashHistory } from 'react-router';
import App from './components/App/App.jsx';
import Report from './components/Report/Report.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import LogIn from './components/Login/LogIn.jsx';
import Reset from './components/Reset/Reset.jsx';
import NotFound from './components/404/404.jsx';
import serviceWorker from './registerServiceWorker';


ReactDOM.render(
  <Router history={hashHistory}>
    <Route component={LogIn}>
      <Route path="/" component={App}>
        <IndexRoute component={Dashboard} />
        <Route path="/report" component={Report} />
      </Route>
    </Route>
    <Route path="/reset/:enrollment/:token" component={Reset} />
    <Route path="*" component={NotFound} />
  </Router>
  , document.getElementById('root'));

serviceWorker();
