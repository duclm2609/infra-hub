# Product Requirements Document: Azure AD SSO Authentication (MVP)

## 1. Introduction/Overview

This feature implements Single Sign-On (SSO) authentication using Microsoft Azure Active Directory to replace the current mock authentication in the Service Catalog application. Users will authenticate using their corporate Microsoft credentials, and upon successful authentication, they will be redirected to the Service Catalog dashboard.

**Problem it solves:** Currently, the application uses a mock login button that simulates authentication. This PRD defines the implementation of real Azure AD authentication to secure the application and integrate with the organization's identity provider.

**Goal:** Enable users to securely log in to the Service Catalog application using their Microsoft Azure AD credentials with minimal friction.

## 2. Goals

- Replace the mock Microsoft login button with real Azure AD SSO authentication
- Implement secure token management using HTTP-only cookies
- Redirect authenticated users to the Service Catalog page
- Provide a working MVP authentication flow within 1-2 weeks
- Ensure the authentication flow is reliable and user-friendly

## 3. User Stories

**As a Developer/Platform Engineer**, I want to log in to the Service Catalog using my corporate Microsoft account, so that I can securely access the application without creating a separate password.

**As a Developer**, I want the application to remember my authentication session, so that I don't have to re-authenticate every time I refresh the page (within a reasonable session duration).

**As a System Administrator**, I want authentication to be handled by Azure AD, so that I can centrally manage user access and leverage existing security policies.

**As a User**, I want to see a clear error message if login fails, so that I understand what went wrong and can try again.

## 4. Functional Requirements

### 4.1 Authentication Flow

1. **Login Initiation:** When a user clicks the "Đăng nhập với Microsoft" button on the Login page, the system must redirect them to the Microsoft Azure AD login portal.

2. **Azure AD Authentication:** The system must integrate with Azure AD using the OAuth 2.0 / OpenID Connect protocol to authenticate users.

3. **Callback Handling:** After successful authentication at Azure AD, the system must handle the callback redirect with the authorization code.

4. **Token Exchange:** The backend must exchange the authorization code for access and ID tokens from Azure AD.

5. **Session Creation:** The backend must create a secure session and return an HTTP-only cookie containing the authentication token to the frontend.

6. **Redirect to Dashboard:** Upon successful authentication, the frontend must redirect the user to the Service Catalog page (`/catalog` or main dashboard route).

### 4.2 Token Management

7. **HTTP-Only Cookies:** Authentication tokens must be stored in HTTP-only cookies (not accessible via JavaScript) to prevent XSS attacks.

8. **Token Validation:** The frontend must verify the presence of a valid authentication cookie before allowing access to protected routes.

9. **Session Persistence:** The authentication session must persist across browser refreshes until the token expires or the user logs out.

### 4.3 Error Handling

10. **Login Failure:** If Azure AD authentication fails, the system must display a clear error message to the user (e.g., "Authentication failed. Please try again.").

11. **Network Errors:** If the backend is unreachable during login, the system must show an error message (e.g., "Unable to connect. Please check your connection.").

12. **Invalid/Expired Tokens:** If a user tries to access a protected route with an invalid or expired token, the system must redirect them to the login page.

### 4.4 User Experience

13. **Loading State:** While authenticating (during redirect and token exchange), the system must display a loading indicator to the user.

14. **Login Page Accessibility:** Unauthenticated users attempting to access protected routes must be redirected to the login page.

15. **No User Profile Display:** For this MVP, the system does NOT need to display user profile information (name, email, avatar) in the UI. Authentication state management is sufficient.

## 5. Non-Goals (Out of Scope for MVP)

- **Role-Based Access Control (RBAC):** Authorization and permission management based on Azure AD groups/roles is NOT included in this MVP.
- **User Profile Display:** Showing user name, email, or avatar in the header/navigation is NOT required for MVP.
- **Advanced Error Handling:** Retry mechanisms, timeout handling, and detailed error recovery flows are NOT included.
- **Logout Functionality:** Explicit logout (sign-out from Azure AD and clear session) is deferred to a future phase.
- **Multi-Factor Authentication (MFA):** MFA configuration is handled at the Azure AD level, not in this application.
- **Token Refresh Logic:** Automatic token refresh before expiration is NOT included in MVP.

## 6. Design Considerations

### UI/UX Requirements

- **Login Page:** Update the existing `LoginForm.tsx` component to trigger the real Azure AD authentication flow instead of the mock timeout.
- **Loading State:** Use existing Shadcn UI components (e.g., spinner, skeleton) to show loading during authentication.
- **Error Messages:** Display error messages using Shadcn UI Alert or Toast components for consistency with the design system.
- **No Visual Changes:** The login button appearance should remain the same (Indigo theme, Microsoft icon, existing styling).

### Protected Routes

- Implement a route guard or protected route wrapper to check for authentication before rendering protected pages (Service Catalog, Service Detail, etc.).
- Redirect unauthenticated users to `/login`.

## 7. Technical Considerations

### Frontend (React + TypeScript)

- **Library:** Use `@azure/msal-react` and `@azure/msal-browser` for Azure AD integration (Microsoft's official library).
- **Configuration:** Azure AD configuration (client ID, tenant ID, redirect URI) should be stored in environment variables (`.env` file).
- **State Management:** Use existing Zustand store or create a new auth store to manage authentication state (e.g., `isAuthenticated`, `isLoading`).
- **HTTP Requests:** Ensure all API requests to the backend include credentials (`credentials: 'include'`) to send HTTP-only cookies.

### Backend (Assumed API Integration)

- **Assumption:** The backend API has endpoints ready to:
  - Handle the OAuth callback (`/auth/callback` or similar)
  - Validate tokens and create sessions
  - Return HTTP-only cookies with the session token
  - Provide a `/auth/status` endpoint to check if the user is authenticated
- **CORS Configuration:** Backend must allow credentials and specify the frontend origin in CORS settings.

### Azure AD App Registration

- **Prerequisite:** An Azure AD application must be registered with:
  - Redirect URI pointing to the frontend (e.g., `http://localhost:5173/auth/callback` for dev, production URL for prod)
  - API permissions: `User.Read` (or as required by backend)
  - Client ID and Tenant ID provided to the frontend

### Environment Variables

Create a `.env` file in the frontend with:

```
VITE_AZURE_AD_CLIENT_ID=<your-client-id>
VITE_AZURE_AD_TENANT_ID=<your-tenant-id>
VITE_AZURE_AD_REDIRECT_URI=http://localhost:5173/auth/callback
VITE_API_BASE_URL=<backend-api-url>
```

## 8. Success Metrics

- **Functional Success:** Users can successfully log in using Azure AD credentials and access the Service Catalog page.
- **Session Persistence:** Authentication session persists across page refreshes without requiring re-login (until token expiration).
- **Error Handling:** Login failures display clear error messages without crashing the application.
- **Timeline:** Feature is implemented and tested within 1-2 weeks.

## 9. Open Questions

1. **Azure AD App Registration:** Has the Azure AD application been registered? If yes, what are the Client ID, Tenant ID, and Redirect URI?
2. **Backend Endpoints:** What are the exact backend API endpoints for:
   - OAuth callback handling?
   - Authentication status check?
   - Any other auth-related endpoints?
3. **Token Expiration:** What is the desired session duration (e.g., 1 hour, 8 hours, 1 day)?
4. **Development Environment:** Should we support both `localhost` and a staging environment with different redirect URIs?
5. **Testing:** Do we need to test with a specific Azure AD tenant, or can we use a test/demo tenant?

## 10. Implementation Checklist

### Phase 1: Setup & Configuration (Day 1-2)

- [ ] Install `@azure/msal-react` and `@azure/msal-browser` packages
- [ ] Create `.env` file with Azure AD configuration
- [ ] Set up MSAL configuration in the frontend
- [ ] Wrap the app with `MsalProvider`

### Phase 2: Authentication Flow (Day 3-5)

- [ ] Update `LoginForm.tsx` to trigger Azure AD login redirect
- [ ] Create callback route handler for `/auth/callback`
- [ ] Implement token exchange with backend API
- [ ] Store authentication token in HTTP-only cookie (via backend)

### Phase 3: Protected Routes (Day 6-7)

- [ ] Create authentication context or Zustand store for auth state
- [ ] Implement route guard/protected route component
- [ ] Add authentication check to Service Catalog and other protected pages
- [ ] Redirect unauthenticated users to login page

### Phase 4: Error Handling & UX (Day 8-9)

- [ ] Add loading spinner during authentication
- [ ] Display error messages for failed login attempts
- [ ] Test error scenarios (network failure, invalid credentials)

### Phase 5: Testing & Refinement (Day 10-14)

- [ ] Manual testing with real Azure AD credentials
- [ ] Test session persistence across page refreshes
- [ ] Test redirect flow from protected routes
- [ ] Verify HTTP-only cookie security
- [ ] Code review and final adjustments

## 11. Dependencies

- Backend API with OAuth callback and session management endpoints
- Azure AD application registration completed
- Environment variables configured for both development and production

## 12. Risks & Mitigation

| Risk                          | Mitigation                                                                                    |
| ----------------------------- | --------------------------------------------------------------------------------------------- |
| Backend API not ready         | Coordinate with backend team early; use mock API responses if needed for frontend development |
| Azure AD configuration issues | Test with a demo tenant first; document setup steps clearly                                   |
| CORS/Cookie issues            | Ensure backend CORS allows credentials; test in both localhost and deployed environments      |
| Timeline pressure (1-2 weeks) | Focus strictly on MVP scope; defer non-essential features                                     |
