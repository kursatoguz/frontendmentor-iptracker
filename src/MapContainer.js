import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import React from "react";
import Loading from "./Loading";
const MapContainer = ({ lat, lng, google }) => {
  // show loading until map is loaded
  if (!google) {
    return <Loading />;
  }

  return (
    <div className="map">
      <Map google={google} zoom={15} center={{ lat: lat, lng: lng }}>
        <Marker position={{ lat: lat, lng: lng }} />
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAPS_KEY,
})(MapContainer);
