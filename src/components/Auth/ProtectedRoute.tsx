import { useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
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
  const msalIsAuthenticated = useIsAuthenticated();
  const { setAuthenticated, setUser } = useAuthStore();

  // Check MSAL accounts synchronously - this prevents flash
  // useMemo ensures this only recalculates when instance changes
  const hasValidAccount = useMemo(() => {
    const accounts = instance.getAllAccounts();
    return accounts.length > 0;
  }, [instance]);

  useEffect(() => {
    // Sync store with MSAL state after initial check
    const accounts = instance.getAllAccounts();
    if (accounts.length > 0) {
      const account = accounts[0];
      setUser({
        name: account.name,
        email: account.username,
      });
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [instance, setAuthenticated, setUser]);

  // Use MSAL's authentication status as the primary source of truth
  // Check both MSAL hook and direct account check for maximum reliability
  const userIsAuthenticated = msalIsAuthenticated || hasValidAccount;

  // If not authenticated, redirect to login
  if (!userIsAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the protected content
  return <>{children}</>;
}
