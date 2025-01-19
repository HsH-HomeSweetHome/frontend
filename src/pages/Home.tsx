// src/pages/Home.tsx
import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-8">
      <h1 className="text-3xl font-bold mb-4">우리 동네 정보를 공유해요!</h1>
      <p className="max-w-xl mb-6">
        층간소음, 벌레, 누수, 집 상태 등 경험담을 모아, 모두가 더 좋은 집을 찾고
        살 수 있도록 정보를 나누는 커뮤니티입니다.
      </p>
      <Link
        to="/map"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        지도에서 위치 확인하기
      </Link>
    </div>
  );
};

export default Home;
