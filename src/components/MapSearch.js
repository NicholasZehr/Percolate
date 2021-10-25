import React, { useEffect, useState} from 'react';
import GoogleMapReact from 'google-map-react';
import {
  GeoSearch,
  Control,
  Marker,
} from 'react-instantsearch-dom-maps';
/*resources for algolia search
https://www.algolia.com/doc/api-reference/widgets/geo-search/js/
https://www.algolia.com/doc/guides/managing-results/refine-results/geolocation/
https://www.algolia.com/doc/guides/managing-results/refine-results/geolocation/how-to/filter-results-around-a-location/?client=javascript*/
// for the default version
import algoliasearch from 'algoliasearch';


// or just use algoliasearch if you are using a <script> tag
// if you are using AMD module loader, algoliasearch will not be defined in window,
// but in the AMD modules of the page
const client = algoliasearch(
  "JP955S508F",
  "3de80a48e4011b0c171789a11801fb58"
);

const index = client.initIndex('businesses');



const AnyReactComponent = ({ text }) => <div>{text}</div>;

const MapSearch =()=> {
  let [center, setCenter] = useState({})
  useEffect(()=>{
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos) {
    var crd = pos.coords;
    setCenter({lat: crd.latitude, lng: crd.longitude});
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options)},[]);
  index.search('', {
    aroundLatLng: `${center.lat}, ${center.lng}`,
    aroundRadius: 1000000 // 1000 km
  }).then(({ hits }) => {
    console.log(hits);
  });
    return (
      // Important! Always set the container height explicitly
      center.lng?(
      <div id="map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyD9zxNq0hPgKWsXAIdCsBCGyCoszWaRCEk'}}
          defaultCenter={center}
          defaultZoom={14}
        >
          <AnyReactComponent
            lat={40.7128}
            lng={-74.0060}
            text="NYC"
          />
        </GoogleMapReact>
      </div>):(<h1>loading location...</h1>)
    );
}

export default MapSearch;
