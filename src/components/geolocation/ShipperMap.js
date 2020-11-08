import React from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoiYW1pdHNhdGh5YSIsImEiOiJja2VmNndiMDcwMWJmMzFxYmpiZjg1M3l2In0.Cf0bp1u7zBpntXdxhtcUfw';

class LeafletMap extends React.Component {
  componentDidMount() {
    // Creates new map instance
    var container1 = document.getElementById('container1');
    const location = window.navigator && window.navigator.geolocation;
    if (location) {
      location.getCurrentPosition(
        (position) => {
          const map = new mapboxgl.Map({
            container: this.mapWrapper,
            style: 'mapbox://styles/mapbox/streets-v10',
            center: [position.coords.longitude, position.coords.latitude],
            zoom: 5,
          });

          // Creates new directions control instance
          const directions = new MapboxDirections({
            accessToken: mapboxgl.accessToken,
            unit: 'metric',
            profile: 'mapbox/driving',
          });
          // Integrates directions control with map
          map.addControl(directions, 'top-left');
          container1.style.display = 'block';
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      quantity: '',
      type: '',
      units: '',
      lat1: '',
      lat2: '',
      long2: '',
      long3: '',
      origin: '',
      destination: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
    });
    this.state.lat2 = directions.getDestination().geometry.coordinates[0];
    this.state.long2 = directions.getDestination().geometry.coordinates[1];
    this.state.lat1 = directions.getOrigin().geometry.coordinates[0];
    this.state.long1 = directions.getOrigin().geometry.coordinates[1];
    let url =
      'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
      this.state.lat1 +
      ',' +
      this.state.long1 +
      '.json?access_token=' +
      mapboxgl.accessToken;
    let response = await fetch(url);
    let json = await response.json();
    this.state.origin = json.features[0].place_name;
    url =
      'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
      this.state.lat2 +
      ',' +
      this.state.long2 +
      '.json?access_token=' +
      mapboxgl.accessToken;
    response = await fetch(url);
    json = await response.json();
    this.state.destination = json.features[0].place_name;
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      // Populates map by referencing map's container property
      <div>
        <div ref={(el) => (this.mapWrapper = el)} className='mapWrapper'></div>
        <pre id='container1' className='container1'>
          <form onSubmit={this.handleSubmit} className='form-inline'>
            <label>
              Type:
              <select
                name='type'
                onChange={this.handleChange}
                value={this.state.type}
              >
                <option value='na'></option>
                <option value='Fragile'>Fragile</option>
                <option value='Perishable'>Perishable</option>
                <option value='Livestock'>Livestock</option>
                <option value='Machinery'>Machinery</option>
              </select>
            </label>
            <br />
            <table>
              <label>Quantity:</label>
              <tr>
                <td>
                  <div className='input_with_appended_unit'>
                    <input
                      type='number'
                      name='quantity'
                      value={this.state.quantity}
                      onChange={this.handleChange}
                    />
                  </div>
                </td>
                <td style={{ width: '100px' }}>
                  <select
                    name='units'
                    onChange={this.handleChange}
                    value={this.state.units}
                  >
                    <option value='na'></option>
                    <option>units</option>
                    <option>kilograms</option>
                    <option>litres</option>
                    <option>cubic size</option>
                  </select>
                </td>
              </tr>
            </table>
            <br />
            <a
              class='waves-effect waves-light indigo darken-3 btn modal-trigger'
              href='#modal6'
            >
              Confirm
            </a>
          </form>
        </pre>

        <div id='modal6' class='modal'>
          <div className='row'>
            <div className='col s12'>
              <div className='card'>
                <div className='card-content black-text'>
                  <span
                    className='card-title'
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '20px',
                    }}
                  >
                    <div class='modal-content'>
                      <h4>Confirm your order!</h4>
                      <p>
                        <table>
                          <tr>
                            <td>Type</td>
                            <td>{this.state.type}</td>
                          </tr>
                          <tr>
                            <td>Quantity</td>
                            <td>
                              {this.state.quantity + ' ' + this.state.units}
                            </td>
                          </tr>
                          <tr>
                            <td>Origin</td>
                            <td>{this.state.origin}</td>
                          </tr>
                          <tr>
                            <td>Destination</td>
                            <td>{this.state.destination}</td>
                          </tr>
                          <tr>
                            <td>Amount</td>
                            <td>
                              {Math.random() * (99999 - 1000 + 1000) + 1000}
                            </td>
                          </tr>
                        </table>
                      </p>
                    </div>
                  </span>
                  <a
                    href='/ShipperPay'
                    class='modal-close indigo darken-3 btn-flat'
                    style={{ marginLeft: '30px', color: 'white' }}
                  >
                    Pay
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LeafletMap;
