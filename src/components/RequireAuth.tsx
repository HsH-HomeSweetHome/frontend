// src/components/RequireAuth.tsx
import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

const RequireAuth: React.FC<Props> = ({ children }) => {
  // 간단 예시: 로컬스토리지에 'token'이 있으면 로그인 상태로 가정
  const isLoggedIn = !!localStorage.getItem("token");

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default RequireAuth;
