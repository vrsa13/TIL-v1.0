import React from 'react';
import { Link } from 'react-router-dom';

const TypeModal = () => {
  return (
    <div id='modal1' className='modal'>
      <div className='modal-content'>
        <div className='row'>
          <div className='col s12 m6'>
            <div
              className='card'
              style={{
                backgroundColor: '#142850',
              }}
            >
              <div className='card-content white-text'>
                <span
                  className='card-title'
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Link to={'/CarrierLogin'} className=''>
                    <button className='button  modal-close'>CARRIER</button>
                  </Link>
                </span>
              </div>
            </div>
          </div>
          <div className='col s12 m6'>
            <div
              className='card'
              style={{
                backgroundColor: '#142850',
              }}
            >
              <div className='card-content white-text'>
                <span
                  className='card-title'
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Link to={'/ShipperLogin'} className=''>
                    <button className='button  modal-close'> SHIPPER</button>
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <a href='#!' className='modal-close waves-effect waves-green btn-flat'>
          Go Back
        </a>
      </div>
    </div>
  );
};

export default TypeModal;
