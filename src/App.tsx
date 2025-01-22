import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import MapPage from "./pages/MapPage";
import ReviewDetail from "./pages/ReviewDetail";
import RequireAuth from "./components/RequireAuth";

// 헤더 컴포넌트
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("token");
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? "bg-white shadow-md py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center group">
            <span className="text-2xl font-bold tracking-tight transition-colors text-blue-600 mr-2">
              홈스윗홈
            </span>
            <span className="text-sm font-medium text-gray-500 border-l border-gray-300 pl-2 transition-colors group-hover:text-blue-500">
              좋은 집 찾기 커뮤니티
            </span>
          </Link>

          <nav className="flex items-center space-x-8">
            <Link
              to="/map"
              className={`transition-colors hover:text-blue-500 ${
                isScrolled || !isHomePage
                  ? "text-gray-700"
                  : "text-white hover:text-gray-200"
              }`}
            >
              지도보기
            </Link>

            {!isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-lg transition-all hover:scale-105 ${
                    isScrolled || !isHomePage
                      ? "text-blue-600 border border-blue-600 hover:bg-blue-50"
                      : "text-white border border-white hover:bg-white hover:text-blue-600"
                  }`}
                >
                  로그인
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white 
                           transition-all hover:bg-blue-700 hover:scale-105 shadow-md"
                >
                  회원가입
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                  }}
                  className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 
                           transition-all border border-gray-300"
                >
                  로그아웃
                </button>
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-medium">M</span>
                </div>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

// 푸터 컴포넌트
const Footer = () => {
  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">집 커뮤니티</h3>
            <p className="text-gray-600 text-sm">
              더 나은 주거 생활을 위한 현명한 선택
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-4">서비스</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/map" className="hover:text-blue-600">
                  지도 보기
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-blue-600">
                  리뷰 모아보기
                </Link>
              </li>
              <li>
                <Link to="/guide" className="hover:text-blue-600">
                  이용 가이드
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-4">고객지원</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/faq" className="hover:text-blue-600">
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-600">
                  문의하기
                </Link>
              </li>
              <li>
                <Link to="/notice" className="hover:text-blue-600">
                  공지사항
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-4">법적 고지</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/privacy" className="hover:text-blue-600">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-600">
                  이용약관
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © 2025 집 커뮤니티. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/map"
              element={
                <RequireAuth>
                  <MapPage />
                </RequireAuth>
              }
            />
            <Route
              path="/review/:id"
              element={
                <RequireAuth>
                  <ReviewDetail />
                </RequireAuth>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
