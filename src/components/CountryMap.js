import axios from "axios";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Pane } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const CountryMap = ({ country }) => {
  const { latlng, name } = country;
  const icon = new L.Icon({
    iconUrl:
      "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png",
    iconSize: [35, 35],
  });
  return (
    <MapContainer
      key={country.alpha3Code}
      center={latlng}
      zoom={8}
      style={{ height: "400px" }}
      scrollWheelZoom={true}
      className="rounded-lg"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={latlng} icon={icon}>
        <Popup>{name}</Popup>
      </Marker>
    </MapContainer>
  );
};
export default CountryMap;
