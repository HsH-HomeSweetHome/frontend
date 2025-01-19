// src/pages/MapPage.tsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// 아이콘 이미지(미리 src/assets 폴더에 noise.png, bug.png, water.png 있어야 함)
import noiseIconUrl from "../assets/noise.png";
import bugIconUrl from "../assets/bug.png";
import waterIconUrl from "../assets/water.png";

// 집(위치) 정보 타입
interface House {
  id: number;
  lat: number;
  lng: number;
  issueType: "noise" | "bug" | "water";
  address: string;
}

// 아이콘 생성

// 더미 데이터
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

const MapPage: React.FC = () => {
  const [houses, setHouses] = useState<House[]>([]);

  // 예시: 컴포넌트 마운트 시 더미 데이터 로드
  useEffect(() => {
    // 실제로는 백엔드 API에서 가져올 수 있음
    setHouses(dummyHouses);
  }, []);

  // 아이콘 매퍼

  return (
    <div className="h-[80vh]">
      <MapContainer
        center={[37.5665, 126.978]}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
      >
        {/* 배경 타일 */}
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 마커들 */}
        {houses.map((house) => (
          <Marker key={house.id} position={[house.lat, house.lng]}>
            <Popup>
              <div className="text-sm">
                <p>주소: {house.address}</p>
                <p>이슈: {house.issueType}</p>
                <a
                  href={`/review/${house.id}`}
                  className="text-blue-600 underline"
                >
                  리뷰 보기/작성
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapPage;
