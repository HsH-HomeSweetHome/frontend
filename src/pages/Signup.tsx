// src/pages/SignUp.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제 회원가입 로직 => 성공 시 자동 로그인 or Login 페이지 이동
    // 여기서는 데모로 바로 토큰 저장
    localStorage.setItem("token", "dummy");
    navigate("/map");
  };

  return (
    <div className="max-w-md mx-auto mt-8 border p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">회원가입</h2>
      <form onSubmit={handleSignUp} className="space-y-4">
        <div>
          <label className="block mb-1">이메일</label>
          <input
            type="email"
            className="border w-full p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">비밀번호</label>
          <input
            type="password"
            className="border w-full p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUp;
