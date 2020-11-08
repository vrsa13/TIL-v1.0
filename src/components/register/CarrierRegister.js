import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import firebase from '../../Config';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import M from 'materialize-css/dist/js/materialize.min.js';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { siggnedIn } from '../../actions/loginActions';

const CarrierRegister = ({ log: { isSignedIn }, siggnedIn }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [uid, setUuid] = useState('');
  const [userExist, setUserExist] = useState(true);

  const onSubmit = () => {
    if (firstname === '' || lastname === '' || phonenumber === '') {
      M.toast({
        html: 'Please enter all the fields',
      });
    } else {
      setUserExist(true);
      writeUserData(firstname, lastname, phonenumber, uid);
    }
  };

  function writeUserData(fname, lname, pno, uid) {
    firebase
      .database()
      .ref(`/CarrierInfo/` + uid)
      .set({
        firstName: fname,
        lastName: lname,
        phonNumber: pno,
        rating: '0.0',
      });
    siggnedIn(true);
  }

  const uiConfig1 = {
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        user
          .linkWithPopup(provider)
          .then(function (result) {
            // Accounts successfully linked.
            var credential = result.credential;
            var user = result.user;
            setUserExist(false);
            setUuid(user.uid);
            setPhonenumber(user.phoneNumber);
            console.log('user', user);
            console.log('credential', credential);
            // ...
          })
          .catch(function (error) {
            // Handle Errors here.
            // ...
          });
      }
    });
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
                    Register Carrier
                  </h4>
                </span>
                <StyledFirebaseAuth uiConfig={uiConfig1} firebaseAuth={firebase.auth()} />
                <div>
                  {isSignedIn ? (
                    <Redirect to='/CarrierMap' />
                  ) : (
                    [
                      !userExist ? (
                        <div>
                          <div className='row m2'>
                            <div className='col s12'>
                              <div className='row'>
                                <div className='input-field col s6'>
                                  <input type='text' name='firstname' value={firstname} onChange={e => setFirstname(e.target.value)} />
                                  <label htmlFor='firstname' className='active'>
                                    First Name
                                  </label>
                                </div>
                                <div className='input-field col s6'>
                                  <input type='text' name='lastname' value={lastname} onChange={e => setLastname(e.target.value)} />
                                  <label htmlFor='lastname' className='active'>
                                    Last Name
                                  </label>
                                </div>
                                <div className='input-field col s6'>
                                  <input type='text' name='phonenumber' value={phonenumber} onChange={e => setPhonenumber(e.target.value)} />
                                  <label htmlFor='phonenumber' className='active'>
                                    Phone Number
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <button className='button ' href='#!' onClick={onSubmit}>
                            Submit
                          </button>
                        </div>
                      ) : (
                        <p>User Registed</p>
                      ),
                    ]
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const regStyle = {
  margin: '40px',
};

CarrierRegister.propTypes = {
  log: PropTypes.object.isRequired,
  siggnedIn: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  log: state.log,
});

export default connect(mapStateToProps, {
  siggnedIn,
})(CarrierRegister);
