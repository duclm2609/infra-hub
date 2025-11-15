import { useState } from "react";
import "./App.css";
import LoginForm from "@/components/LoginForm/LoginForm";
import { Dashboard } from "@/components/Dashboard/Dashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (isAuthenticated) {
    return <Dashboard onLogout={handleLogout} />;
  }

  return (
    <div className="flex h-screen">
      {/* Cột trái - Marketing */}
      <div className="w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-12">
        <div className="text-white max-w-md">
          <h2 className="text-4xl font-bold mb-6">
            Chào mừng đến với ứng dụng của chúng tôi
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Khám phá những tính năng tuyệt vời và trải nghiệm dịch vụ tốt nhất.
            Đăng nhập ngay để bắt đầu hành trình của bạn.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Bảo mật cao</h3>
                <p className="text-sm opacity-80">
                  Dữ liệu của bạn được bảo vệ an toàn
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Hiệu suất nhanh</h3>
                <p className="text-sm opacity-80">
                  Trải nghiệm mượt mà và phản hồi tức thì
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Dễ sử dụng</h3>
                <p className="text-sm opacity-80">
                  Giao diện thân thiện và trực quan
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cột phải - Login Form */}
      <div className="w-1/2 flex items-center justify-center bg-gray-50">
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </div>
    </div>
  );
}

export default App;
