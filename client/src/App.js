import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Login from './components/auth/Login'; 
import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';
import Transact from './components/pages/Transact';
import setAuthToken from './utils/setAuthToken';
import configureStore from './store/configureStore';
import './App.css';
import { Provider } from 'react-redux';
import image from './background.jpg';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <div style = {{
            'backgroundImage': `url(${image})`,
            'backgroundRepeat': 'no-repeat',
            'backgroundAttachment': 'fixed',
            'backgroundSize': 'cover',
            'height':'100%'
          }}>
            <div className='container'>
              <Alerts />
              <Switch>
                <PrivateRoute exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <PrivateRoute exact path= '/:id/:type' component={Transact} />
              </Switch>
            </div>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
