import { useState } from "react";
import reactLogo from "@/assets/react.svg";

// Microsoft Logo SVG Component (White version)
const MicrosoftIcon = () => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0" y="0" width="10" height="10" fill="white" />
    <rect x="11" y="0" width="10" height="10" fill="white" />
    <rect x="0" y="11" width="10" height="10" fill="white" />
    <rect x="11" y="11" width="10" height="10" fill="white" />
  </svg>
);

interface LoginFormProps {
  onLoginSuccess?: () => void;
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleMicrosoftLogin = () => {
    setIsClicked(true);
    // TODO: Implement Microsoft Azure AD login
    console.log("Microsoft Azure AD login clicked");

    // Simulate login success after 500ms
    setTimeout(() => {
      setIsClicked(false);
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    }, 500);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md px-8">
      <img src={reactLogo} alt="React Logo" className="w-10 h-10 mb-6" />
      <h1 className="text-2xl font-bold mb-2">Welcome</h1>
      <p className="text-sm text-gray-500 mb-8 text-center">
        Đăng nhập bằng tài khoản TCBS để tiếp tục
      </p>
      <div className="flex flex-col gap-4 w-full">
        <button
          onClick={handleMicrosoftLogin}
          onMouseDown={() => setIsClicked(true)}
          onMouseUp={() => setIsClicked(false)}
          onMouseLeave={() => setIsClicked(false)}
          className={`w-full p-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 ease-in-out flex items-center justify-center gap-3 font-medium shadow-sm ${
            isClicked
              ? "bg-purple-700 scale-95 shadow-sm"
              : "bg-purple-500 hover:bg-purple-600 hover:shadow-md scale-100"
          }`}
        >
          <MicrosoftIcon />
          <span>Đăng nhập với Microsoft</span>
        </button>
      </div>
    </div>
  );
}
