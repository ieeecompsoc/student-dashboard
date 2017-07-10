import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route,hashHistory } from 'react-router';
import App from './components/App/App.jsx';
import Report from './components/Report/Report.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import LogIn from './components/Login/LogIn.jsx';
import './app.css';
import serviceWorker from './registerServiceWorker';


ReactDOM.render(
  <Router history={hashHistory}>
    <Route component={LogIn}>
      <Route path="/" component={App}>
        <IndexRoute component={Dashboard} />
        <Route path="/report" component={Report} />
      </Route>
    </Route>
  </Router>
  , document.getElementById('root'));

serviceWorker();
