import "./App.css";

// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import MapPage from "./pages/MapPage";
import ReviewDetail from "./pages/ReviewDetail";
import RequireAuth from "./components/RequireAuth";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* 헤더 */}
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            집 커뮤니티
          </Link>
          <nav>
            <Link to="/map" className="mr-4 hover:underline">
              지도보기
            </Link>
            <Link to="/login" className="mr-4 hover:underline">
              로그인
            </Link>
            <Link to="/signup" className="hover:underline">
              회원가입
            </Link>
          </nav>
        </header>

        {/* 메인 영역 (라우트) */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* 인증이 필요한 페이지들은 RequireAuth로 감싸기 */}
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

        {/* 푸터 */}
        <footer className="bg-gray-200 text-center p-4">
          © 2025 집 커뮤니티. All rights reserved.
        </footer>
      </div>
    </Router>
  );
};

export default App;
