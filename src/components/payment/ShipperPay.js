import React from 'react';

class ShipperPay extends React.Component {
  render() {
    return (
      <div style={{ marginLeft: '30%', marginTop: '5%' }}>
        <div class='row'>
          <div class='col s12 m6'>
            <div class='card'>
              <div class='card-content black-text'></div>
              <form action='#'>
                <span
                  class='card-title'
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '20px',
                  }}
                >
                  <h4>Select your payment mode</h4>
                </span>
                <div style={{ padding: '20px' }}>
                  <p>
                    <label>
                      <input
                        class='with-gap'
                        name='group1'
                        type='radio'
                        checked
                      />
                      <span>Credit card</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input class='with-gap' name='group1' type='radio' />
                      <span>Debit card</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input class='with-gap' name='group1' type='radio' />
                      <span>UPI</span>
                    </label>
                  </p>
                  <a
                    class='btn-small'
                    style={{ marginLeft: '80%', backgroundColor: '#142850' }}
                  >
                    Pay
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ShipperPay;
