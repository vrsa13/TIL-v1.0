import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import firebase from '../../Config';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import M from 'materialize-css/dist/js/materialize.min.js';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { siggnedIn } from '../../actions/loginActions';

const CarrierLogin = ({ log: { isSignedIn }, siggnedIn }) => {
  const getUserData = id => {
    firebase
      .database()
      .ref(`CarrierInfo/${id}/firstName`)
      .once('value', snapshot => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          siggnedIn(true);
        } else {
          firebase.auth().signOut();
          M.toast({
            html: 'User does not exist',
          });
        }
      });
  };

  const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.PhoneAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(x => {
      if (x) {
        getUserData(x.uid);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className='row'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className='col s12 m6' style={regStyle}>
        <div className='card white'>
          <div className='card-content black-text'>
            {isSignedIn ? (
              <Redirect to='/CarrierMap' />
            ) : (
              <div>
                <div>
                  <span className='card-title'>
                    <h4
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      Login Carrier
                    </h4>
                  </span>
                  <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                </div>
              </div>
            )}
            <a
              href='/CarrierRegister'
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              Not Registered? Signup here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const regStyle = {
  margin: '40px',
};

CarrierLogin.propTypes = {
  log: PropTypes.object.isRequired,
  siggnedIn: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  log: state.log,
});

export default connect(mapStateToProps, {
  siggnedIn,
})(CarrierLogin);
