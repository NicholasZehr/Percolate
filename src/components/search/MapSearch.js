import React, { useEffect, useState} from 'react';
import GoogleMapReact from 'google-map-react';
import algoliasearch from 'algoliasearch';
import {Link} from 'react-router-dom'

const client = algoliasearch(
  "JP955S508F",
  "3de80a48e4011b0c171789a11801fb58"
);

const index = client.initIndex('businesses');

const AnyReactComponent = ({ rating, displayName, id }) => <Link className='marker-hover' to={`businesses/${id}`}><div>{displayName} {rating?(rating):(null)}</div><img className="marker"src = '/color-bean.png' alt=""/></Link>;

const MapSearch =()=> {
  let [center, setCenter] = useState({lat: 0.00, lng: 0.00})
  let [markers, setMarkers] = useState([])
  useEffect(()=>{
  var options = {
    enableHighAccuracy: true,
    maximumAge: 0
  };

  function success(pos) {
    var crd = pos.coords;
    setCenter({lat: parseFloat(crd.latitude), lng: parseFloat(crd.longitude)});
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options)
},[]);

  useEffect(()=>{
  index.search('', {
    aroundLatLng: `${center.lat}, ${center.lng}`,
    aroundRadius: 10000 // 10 km
  }).then(({ hits }) => {
    setMarkers(hits)
  });
},[center]);

    return (
      center.lng?(
      <div id="map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyD9zxNq0hPgKWsXAIdCsBCGyCoszWaRCEk'}}
          defaultCenter={center}
          defaultZoom={14}
        >
          {markers.map(marker=>{
            return(
           <AnyReactComponent
           key={marker.objectID}
           lat = {marker._geoloc.lat}
           lng = {marker._geoloc.lng}
           id = {marker.objectID}
           displayName = {marker.name}
           rating={marker.rating?(marker.rating):(null)}
           />)})}
        </GoogleMapReact>
      </div>):(<h1>loading location...</h1>)
    );
}

export default MapSearch;
