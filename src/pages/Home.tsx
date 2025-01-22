import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const features = [
    {
      title: "층간소음",
      description: "실제 거주자들의 층간소음 경험 공유",
      icon: "🔊",
    },
    {
      title: "누수 문제",
      description: "건물의 누수 이력과 해결 과정",
      icon: "💧",
    },
    {
      title: "벌레 문제",
      description: "해충 관련 이슈와 대처 방법",
      icon: "🐜",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            더 나은 주거 생활을 위한 현명한 선택
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            실제 거주자들의 생생한 경험을 바탕으로 더 좋은 집을 찾아보세요
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/map"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                         transition duration-200 shadow-lg hover:shadow-xl"
            >
              지도에서 확인하기
            </Link>
            <Link
              to="/signup"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-50 
                         transition duration-200 border border-blue-600"
            >
              회원가입하기
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl 
                         transition duration-200 transform hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">
            당신의 경험이 누군가에게 도움이 됩니다
          </h2>
          <p className="text-xl mb-8">
            지금 바로 집 커뮤니티에 참여하고 더 나은 주거 환경을 만들어가요
          </p>
          <Link
            to="/signup"
            className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold 
                       hover:bg-gray-100 transition duration-200"
          >
            시작하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
