import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';

import Notfound from './components/notfound';
import KitchenWrapper from './components/KitchenWrapper';
import * as serviceWorker from './serviceWorker';

import './index.css';

function loggedIn() {
    const cookie = Cookies.get('token');
    console.log('cookie', cookie)
    // ...
  
    return cookie !== '';
  }
  
  function requireAuth(nextState, replace) {
    console.log('require auth')
    if (!loggedIn()) {
      replace({
        pathname: '/login'
      })
    }
  }

const routing = (
    <Router>
        <Switch>
            <Route exact path="/" component={KitchenWrapper} />
            <Route path="/orders" component={KitchenWrapper} />
            <Route component={Notfound} />
        </Switch>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
