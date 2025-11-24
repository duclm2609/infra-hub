import { useEffect } from "react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { useAuthStore } from "@/store/authStore";

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * ProtectedRoute Component
 * 
 * This component wraps protected routes and ensures the user is authenticated
 * before allowing access. If not authenticated, redirects to login page.
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { instance } = useMsal();
  const { isAuthenticated, setAuthenticated, setUser } = useAuthStore();

  useEffect(() => {
    // Check if user is already authenticated via MSAL
    const accounts = instance.getAllAccounts();
    if (accounts.length > 0) {
      const account = accounts[0];
      setUser({
        name: account.name,
        email: account.username,
      });
      setAuthenticated(true);
    }
  }, [instance, setAuthenticated, setUser]);

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the protected content
  return <>{children}</>;
}


