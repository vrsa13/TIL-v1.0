import React from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiYW1pdHNhdGh5YSIsImEiOiJja2VmNndiMDcwMWJmMzFxYmpiZjg1M3l2In0.Cf0bp1u7zBpntXdxhtcUfw';

class CarriersMap extends React.Component {
  componentDidMount() {
    // Creates new map instance
    const location = window.navigator && window.navigator.geolocation;
    if (location) {
      location.getCurrentPosition(
        position => {
          var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v10',
            center: [position.coords.longitude, position.coords.latitude],
            zoom: 5,
          });

          var marker = new mapboxgl.Marker({ color: '#b40219' }).setLngLat([position.coords.longitude, position.coords.latitude]).addTo(map);

          var stores = {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [84.6897321, 20.5431241],
                },
                properties: {
                  distance: '8',
                  destination: 'Bangalore',
                  origin: 'Odisha',
                  price: '14000-15000',
                },
              },
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [79.0006411, 12.7948109],
                },
                properties: {
                  distance: '8',
                  destination: 'Bangalore',
                  origin: 'Vellore',
                  price: '14000-15000',
                },
              },
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [80.48529054, 16.49982588],
                },
                properties: {
                  distance: '8',
                  destination: 'Odisha',
                  origin: 'Andhra Pradesh',
                  price: '14000-15000',
                },
              },
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [77.5912997, 12.9791198],
                },
                properties: {
                  distance: '8',
                  destination: 'Andhra Pradesh',
                  origin: 'Bangalore',
                  price: '14000-15000',
                },
              },
            ],
          };

          stores.features.forEach(function (store, i) {
            store.properties.id = i;
          });

          map.on('load', function (e) {
            map.loadImage(
              'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
              // Add an image to use as a custom marker
              function (error, image) {
                if (error) throw error;
                map.addImage('custom-marker', image);

                map.addLayer({
                  id: 'locations',
                  type: 'symbol',
                  /* Add a GeoJSON source containing place coordinates and information. */
                  source: {
                    type: 'geojson',
                    data: stores,
                  },
                  layout: {
                    'icon-image': 'custom-marker',
                    'icon-allow-overlap': true,
                  },
                });
              }
            );
          });
          function buildLocationList(data) {
            data.features.forEach(function (store, i) {
              /**
               * Create a shortcut for `store.properties`,
               * which will be used several times below.
               **/
              var prop = store.properties;

              /* Add a new listing section to the sidebar. */
              var listings = document.getElementById('listings');
              var listing = listings.appendChild(document.createElement('div'));
              /* Assign a unique `id` to the listing. */
              listing.id = 'listing-' + prop.id;
              /* Assign the `item` class to each listing for styling. */
              listing.className = 'item';

              /* Add the link to the individual listing created above. */
              var link = listing.appendChild(document.createElement('a'));
              link.href = '#';
              link.className = 'title';
              link.id = 'link-' + prop.id;
              link.innerHTML = prop.origin;

              /* Add details to the individual listing. */
              var details = listing.appendChild(document.createElement('div'));
              details.innerHTML = prop.destination + ' · ' + prop.distance + ' Km';
            });
          }
          buildLocationList(stores);
          function flyToStore(currentFeature) {
            map.flyTo({
              center: currentFeature.geometry.coordinates,
              zoom: 5,
            });
          }

          function createPopUp(currentFeature) {
            var popUps = document.getElementsByClassName('mapboxgl-popup');
            /** Check if there is already a popup on the map and if so, remove it */
            if (popUps[0]) popUps[0].remove();

            var popup = new mapboxgl.Popup({ closeOnClick: false })
              .setLngLat(currentFeature.geometry.coordinates)
              .setHTML(
                '<h5>Shipment</h5>' +
                  '<h6>' +
                  '<b>Distance: </b>' +
                  currentFeature.properties.distance +
                  ' Km' +
                  '</br>' +
                  '<b>Destination:</b> ' +
                  currentFeature.properties.destination +
                  '</br>' +
                  '<b>Origin: </b>' +
                  currentFeature.properties.origin +
                  '</br>' +
                  '<b>Price:</b> ' +
                  '&#x20B9;' +
                  currentFeature.properties.price +
                  '</h6>' +
                  `<button className='button' href='#!'>
                  Accept
                </button>`
              )
              .addTo(map);
          }

          /* This will let you use the .remove() function later on */
          if (!('remove' in Element.prototype)) {
            Element.prototype.remove = function () {
              if (this.parentNode) {
                this.parentNode.removeChild(this);
              }
            };
          }
          map.on('click', function (e) {
            /* Determine if a feature in the "locations" layer exists at that point. */
            var features = map.queryRenderedFeatures(e.point, {
              layers: ['locations'],
            });

            /* If yes, then: */
            if (features.length) {
              var clickedPoint = features[0];

              /* Fly to the point */
              flyToStore(clickedPoint);

              /* Close all other popups and display popup for clicked store */
              createPopUp(clickedPoint);

              /* Highlight listing in sidebar (and remove highlight for all other listings) */
              var activeItem = document.getElementsByClassName('active');
              if (activeItem[0]) {
                activeItem[0].classList.remove('active');
              }
              var listing = document.getElementById('listing-' + clickedPoint.properties.id);
              listing.classList.add('active');
            }
          });
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  render() {
    return (
      <div>
        <div className='sidebar'>
          <div className='heading'>
            <h4>Our locations</h4>
          </div>
          <div id='listings' className='listings'></div>
        </div>
        <div id='map' className='map'>
          Map
        </div>
      </div>
    );
  }
}

export default CarriersMap;
