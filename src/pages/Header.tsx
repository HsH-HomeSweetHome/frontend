import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("token");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition duration-300 
                ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}
                ${location.pathname === "/" ? "" : "bg-white shadow-md"}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className={`text-xl font-bold transition duration-300
                      ${
                        isScrolled || location.pathname !== "/"
                          ? "text-blue-600"
                          : "text-white"
                      }`}
          >
            집 커뮤니티
          </Link>

          <nav className="flex items-center space-x-6">
            <Link
              to="/map"
              className={`transition duration-300 hover:text-blue-600
                        ${
                          isScrolled || location.pathname !== "/"
                            ? "text-gray-700"
                            : "text-white"
                        }`}
            >
              지도보기
            </Link>

            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg border border-blue-600 
                           text-blue-600 hover:bg-blue-50 transition duration-200"
                >
                  로그인
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white 
                           hover:bg-blue-700 transition duration-200"
                >
                  회원가입
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/";
                }}
                className="px-4 py-2 rounded-lg border border-red-600 
                         text-red-600 hover:bg-red-50 transition duration-200"
              >
                로그아웃
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
