import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@/config/authConfig";
import { useAuthStore } from "@/store/authStore";
import reactLogo from "@/assets/react.svg";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Microsoft Logo SVG Component (Colorful version)
const MicrosoftIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0" y="0" width="10" height="10" fill="#F25022" />
    <rect x="11" y="0" width="10" height="10" fill="#7FBA00" />
    <rect x="0" y="11" width="10" height="10" fill="#00A4EF" />
    <rect x="11" y="11" width="10" height="10" fill="#FFB900" />
  </svg>
);

export default function LoginForm() {
  const { instance } = useMsal();
  const { setLoading, setError } = useAuthStore();
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);

  const handleMicrosoftLogin = async () => {
    try {
      setLoading(true);
      setError(null);

      // Redirect to Azure AD login
      await instance.loginRedirect(loginRequest);

      // Note: Code execution stops here as we redirect away from the page
      // The callback will be handled in the AuthCallback component
    } catch (error) {
      console.error("Login error:", error);
      setError("Không thể đăng nhập. Vui lòng thử lại.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md">
      <Card className="w-full border-slate-200 shadow-sm">
        <CardHeader className="text-center space-y-1">
          <div className="flex justify-center mb-4">
            <img
              src={reactLogo}
              alt="App Logo"
              className="w-10 h-10 animate-spin-slow"
            />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
            Welcome back
          </CardTitle>
          <CardDescription className="text-slate-500">
            Đăng nhập bằng tài khoản TCBS để tiếp tục
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 p-6 pt-0">
          <Button
            onClick={handleMicrosoftLogin}
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-10 shadow-sm transition-all duration-200 ease-in-out font-medium flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <MicrosoftIcon />
                <span>Đăng nhập với Microsoft</span>
              </>
            )}
          </Button>
          {error && (
            <p className="text-xs text-center text-rose-600 mt-2">{error}</p>
          )}
          <p className="text-xs text-center text-slate-400 mt-2">
            Bằng việc đăng nhập, bạn đồng ý với điều khoản sử dụng và chính sách
            bảo mật của chúng tôi.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
