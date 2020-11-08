import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import CarrierLogin from './components/login/CarrierLogin';
import CarriersMap from './components/geolocation/CarriersMap';
import TypeModal from './components/login/TypeModal';
import ShipperLogin from './components/login/ShipperLogin';
import ShipperMap from './components/geolocation/ShipperMap';
import ShipperRegister from './components/register/ShipperRegister';
import CarrierRegister from './components/register/CarrierRegister';
import HomePage from './pages/HomePage';
import ShipperPay from './components/payment/ShipperPay';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';

const App = () => {
  useEffect(() => {
    // Init Materialize JS
    M.AutoInit();
  });
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <TypeModal />
          <Switch>
            <Route exact path='/CarrierLogin' component={CarrierLogin} />
            <Route exact path='/ShipperLogin' component={ShipperLogin} />
            <Route exact path='/' component={HomePage} />
            <Route exact path='/ShipperMap' component={ShipperMap} />
            <Route exact path='/ShipperPay' component={ShipperPay} />
            <Route exact path='/CarrierMap' component={CarriersMap} />
            <Route exact path='/ShipperRegister' component={ShipperRegister} />
            <Route exact path='/CarrierRegister' component={CarrierRegister} />
            {/* <Route exact path='/geolocation' component={Geolocation} /> */}
          </Switch>
        </Fragment>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
