import type { Configuration, PopupRequest } from "@azure/msal-browser";

/**
 * Configuration object for Azure AD MSAL
 *
 * IMPORTANT: Update .env file with your actual Azure AD credentials:
 * - VITE_AZURE_AD_CLIENT_ID: From Azure Portal > App Registrations > Application (client) ID
 * - VITE_AZURE_AD_TENANT_ID: From Azure Portal > App Registrations > Directory (tenant) ID
 * - VITE_AZURE_AD_REDIRECT_URI: Must match the redirect URI configured in Azure AD
 */
export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_AD_CLIENT_ID || "",
    authority: `https://login.microsoftonline.com/${
      import.meta.env.VITE_AZURE_AD_TENANT_ID
    }`,
    redirectUri:
      import.meta.env.VITE_AZURE_AD_REDIRECT_URI ||
      window.location.origin + "/auth/callback",
  },
  cache: {
    cacheLocation: "sessionStorage", // Use sessionStorage for better security
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case 0: // Error
            console.error(message);
            return;
          case 1: // Warning
            console.warn(message);
            return;
          case 2: // Info
            console.info(message);
            return;
          case 3: // Verbose
            console.debug(message);
            return;
        }
      },
    },
  },
};

/**
 * Scopes for login request
 */
export const loginRequest: PopupRequest = {
  scopes: ["User.Read"], // Basic profile reading permission
};

/**
 * API base URL for backend requests
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
