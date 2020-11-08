import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import firebase from '../../Config';
import { Link, useHistory } from 'react-router-dom';

import { siggnedIn } from '../../actions/loginActions';

const NavBar = ({ log: { isSignedIn } }) => {
  let history = useHistory();
  function logout() {
    firebase.auth().signOut();
    siggnedIn(false);
    history.replace('/');
    window.location.reload(false);
  }

  return (
    <div id='root'>
      <nav>
        <div className='nav-wrapper' style={navbarStyle}>
          <Link to={'/'} className='brand-logo'>
            Trans India
          </Link>

          <ul className='right hide-on-med-and-down'>
            <li>
              <a href='/'></a>
            </li>
            <li>
              {isSignedIn ? (
                <button className='button' onClick={logout}>
                  Sign out
                </button>
              ) : (
                <button className='button modal-trigger' href='#modal1'>
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

const navbarStyle = {
  backgroundColor: '#142850',
  padding: '0px 20px 0px 20px',
};
NavBar.propTypes = {
  log: PropTypes.object.isRequired,
  siggnedIn: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  log: state.log,
});

export default connect(mapStateToProps, {
  siggnedIn,
})(NavBar);
