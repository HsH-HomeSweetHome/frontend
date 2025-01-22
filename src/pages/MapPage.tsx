import React from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";

interface House {
  id: number;
  lat: number;
  lng: number;
  issueType: "noise" | "bug" | "water";
  address: string;
}

const dummyHouses: House[] = [
  {
    id: 1,
    lat: 37.5665,
    lng: 126.978,
    issueType: "noise",
    address: "서울 somewhere",
  },
  {
    id: 2,
    lat: 37.57,
    lng: 126.975,
    issueType: "bug",
    address: "서울 somewhere else",
  },
  {
    id: 3,
    lat: 37.56,
    lng: 126.982,
    issueType: "water",
    address: "서울 again",
  },
];

const MapPage = () => {
  // 이슈 타입별 색상 정의
  const markerColors = {
    noise: "#FF0000", // 빨간색
    bug: "#4B0082", // 보라색
    water: "#0000FF", // 파란색
  };

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <Map
        center={{ lat: 37.5665, lng: 126.978 }}
        style={{ width: "100%", height: "100%" }}
        level={3}
      >
        {dummyHouses.map((house) => (
          <React.Fragment key={house.id}>
            <MapMarker
              position={{ lat: house.lat, lng: house.lng }}
              // 이미지 대신 컬러 설정
              image={{
                src: `https://dapi.kakao.com/v2/maps/sdk.js/marker_default.png`,
                size: {
                  width: 24,
                  height: 35,
                },
              }}
            />
            <CustomOverlayMap
              position={{ lat: house.lat, lng: house.lng }}
              clickable={true}
              xAnchor={0.5}
              yAnchor={1.5}
            >
              <div
                style={{
                  backgroundColor: "white",
                  padding: "16px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  minWidth: "150px",
                  borderLeft: `4px solid ${markerColors[house.issueType]}`,
                }}
              >
                <p style={{ marginBottom: "8px", fontSize: "14px" }}>
                  주소: {house.address}
                </p>
                <p
                  style={{
                    marginBottom: "8px",
                    fontSize: "14px",
                    color: markerColors[house.issueType],
                  }}
                >
                  이슈: {house.issueType}
                </p>
                <a
                  href={`/review/${house.id}`}
                  style={{
                    color: "#4A90E2",
                    textDecoration: "underline",
                    fontSize: "14px",
                  }}
                >
                  리뷰 보기/작성
                </a>
              </div>
            </CustomOverlayMap>
          </React.Fragment>
        ))}
      </Map>
    </div>
  );
};

export default MapPage;
