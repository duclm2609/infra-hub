# Azure AD SSO Setup Instructions

## ✅ Implementation Complete!

Tất cả code đã được implement. Bây giờ bạn cần cung cấp **Azure AD credentials thực tế** để chức năng hoạt động.

---

## 🔐 Bước 1: Tạo file `.env` 

Tạo file `.env` trong thư mục root của project với nội dung sau:

```env
# Azure AD Configuration - THAY BẰNG GIÁ TRỊ THẬT TỪ AZURE PORTAL
VITE_AZURE_AD_CLIENT_ID=your-actual-client-id-here
VITE_AZURE_AD_TENANT_ID=your-actual-tenant-id-here
VITE_AZURE_AD_REDIRECT_URI=http://localhost:5173/auth/callback

# Backend API (nếu có)
VITE_API_BASE_URL=http://localhost:3000/api
```

---

## 📋 Bước 2: Lấy Azure AD Credentials từ Azure Portal

### 2.1. Đăng nhập Azure Portal
1. Truy cập https://portal.azure.com
2. Đăng nhập bằng tài khoản Microsoft có quyền admin

### 2.2. Tạo App Registration (nếu chưa có)
1. Vào **Azure Active Directory** > **App registrations** > **New registration**
2. Điền thông tin:
   - **Name:** `Service Catalog App` (hoặc tên khác)
   - **Supported account types:** `Accounts in this organizational directory only`
   - **Redirect URI:** 
     - Platform: `Single-page application (SPA)`
     - URI: `http://localhost:5173/auth/callback`
3. Click **Register**

### 2.3. Lấy Client ID và Tenant ID
Sau khi tạo xong, bạn sẽ thấy trang **Overview** với:
- **Application (client) ID** → Copy giá trị này vào `VITE_AZURE_AD_CLIENT_ID`
- **Directory (tenant) ID** → Copy giá trị này vào `VITE_AZURE_AD_TENANT_ID`

### 2.4. Cấu hình Redirect URI
1. Vào **Authentication** (trong menu bên trái)
2. Trong phần **Single-page application**, đảm bảo đã thêm:
   - `http://localhost:5173/auth/callback` (cho development)
   - Production URL của bạn (khi deploy, ví dụ: `https://yourdomain.com/auth/callback`)
3. Trong phần **Implicit grant and hybrid flows**, KHÔNG CẦN check bất kỳ checkbox nào (MSAL 2.0+ dùng Authorization Code Flow with PKCE)
4. Click **Save**

### 2.5. Cấu hình API Permissions
1. Vào **API permissions** (trong menu bên trái)
2. Đảm bảo có permission `User.Read` (Microsoft Graph):
   - Nếu chưa có, click **Add a permission** > **Microsoft Graph** > **Delegated permissions** > check `User.Read`
3. Click **Grant admin consent** (nếu có nút này)

---

## 🚀 Bước 3: Chạy ứng dụng

```bash
# Cài đặt dependencies (nếu chưa cài)
pnpm install

# Chạy dev server
pnpm dev
```

Truy cập http://localhost:5173 → Click nút "Đăng nhập với Microsoft"

---

## 📁 Files đã được tạo/cập nhật

### Cấu hình
- ✅ `src/config/authConfig.ts` - Azure AD MSAL configuration
- ✅ `src/store/authStore.ts` - Zustand auth state management
- ✅ `.env.example` - Template cho environment variables

### Components
- ✅ `src/components/LoginForm/LoginForm.tsx` - Updated với Azure AD login
- ✅ `src/components/Auth/AuthCallback.tsx` - Handle OAuth callback
- ✅ `src/components/Auth/ProtectedRoute.tsx` - Route guard component
- ✅ `src/App.tsx` - Updated với React Router và MSAL Provider

### Packages đã cài
- ✅ `@azure/msal-react` v3.0.22
- ✅ `@azure/msal-browser` v4.26.2

---

## 🔍 Authentication Flow

```
1. User clicks "Đăng nhập với Microsoft"
   ↓
2. App redirects to Azure AD login page
   ↓
3. User enters Microsoft credentials
   ↓
4. Azure AD redirects back to /auth/callback with authorization code
   ↓
5. AuthCallback component processes the code
   ↓
6. User is authenticated and redirected to /catalog
   ↓
7. ProtectedRoute checks authentication before showing Dashboard
```

---

## ⚠️ Troubleshooting

### Lỗi "AADSTS50011: The redirect URI ... does not match"
**Nguyên nhân:** Redirect URI trong code không khớp với Azure Portal  
**Giải pháp:** Đảm bảo URI trong `.env` giống hệt với URI trong Azure Portal (kể cả http/https, port, trailing slash)

### Lỗi "Configuration object is invalid. Please check..."
**Nguyên nhân:** Client ID hoặc Tenant ID không đúng  
**Giải pháp:** Kiểm tra lại giá trị trong file `.env`, đảm bảo không có khoảng trắng thừa

### Lỗi "User does not have consent for the application"
**Nguyên nhân:** User chưa được cấp quyền  
**Giải pháp:** Admin cần "Grant admin consent" trong Azure Portal > API permissions

### Redirect loop hoặc blank page
**Nguyên nhân:** MSAL config chưa đúng hoặc sessionStorage bị lỗi  
**Giải pháp:** 
- Clear browser cache/cookies
- Check console logs
- Đảm bảo `redirectUri` đúng format

---

## 📝 Next Steps (Sau khi login thành công)

Các tính năng có thể thêm sau (ngoài scope MVP):

1. **Logout functionality:** Thêm nút logout và clear session
2. **User profile display:** Hiển thị tên, email, avatar trong header
3. **Token refresh:** Tự động refresh token trước khi expire
4. **RBAC:** Implement role-based access control từ Azure AD groups
5. **Backend integration:** Call backend API với access token
6. **Error boundary:** Handle authentication errors toàn cục

---

## 📞 Support

Nếu gặp vấn đề, check:
1. Browser console logs
2. Network tab (XHR/Fetch requests)
3. Azure AD sign-in logs (Azure Portal > Azure Active Directory > Sign-in logs)

**Current Status:** ✅ All code implemented, waiting for Azure AD credentials

---

## 🎯 Checklist trước khi chạy

- [ ] Đã tạo App Registration trong Azure Portal
- [ ] Đã lấy được Client ID và Tenant ID
- [ ] Đã cấu hình Redirect URI trong Azure Portal
- [ ] Đã tạo file `.env` với đúng giá trị
- [ ] Đã cài đặt dependencies (`pnpm install`)
- [ ] Đã chạy `pnpm dev` và truy cập localhost:5173

Chúc may mắn! 🚀


