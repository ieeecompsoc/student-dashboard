import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import App from './components/App/App.jsx';
import Report from './components/Report/Report.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import LogIn from './components/Login/LogIn.jsx';
import './app.css';
import serviceWorker from './registerServiceWorker';


ReactDOM.render(
  <Router history={createBrowserHistory()}>
        <LogIn>
          <Route path="/" component={App}>
              <div>
                <IndexRoute component={Dashboard} />
                <Route path="/report" component={Report} />
            </div>
          </Route>
      </LogIn>
  </Router>
  , document.getElementById('root'));

serviceWorker();
