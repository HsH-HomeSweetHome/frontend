import React from "react";
import { Map } from "react-kakao-maps-sdk";

const MapPage = () => {
  return (
    <Map
      center={{ lat: 37.5665, lng: 126.978 }}
      style={{ width: "100%", height: "600px" }}
      level={3}
    />
  );
};

export default MapPage;
