# Authentication Flow Documentation

## Overview
This application uses a clean, non-redundant authentication flow with JWT tokens and automatic token refresh.

## Flow Description

### 1. Login Process
1. User submits email/password to `/login` endpoint
2. If successful, server returns `verificationUuid` (OTP required)
3. User is redirected to `/otp` page with verification data
4. User enters OTP code
5. OTP verification returns JWT token and refresh token
6. Tokens are saved to localStorage and user is authenticated

### 2. Token Management
- **JWT Token**: Used for API authentication, stored in localStorage as `authToken`
- **Refresh Token**: Used to get new JWT tokens, stored in localStorage as `refreshToken`
- **Automatic Refresh**: API interceptor automatically refreshes expired tokens

### 3. Token Refresh Flow
1. API request is made with JWT token
2. If token is expired (401 response), interceptor catches it
3. Interceptor calls `/refresh-token` endpoint with:
   - Body: `{ "refreshToken": "stored_refresh_token" }`
   - Header: `Authorization: Bearer expired_token`
4. Server returns new JWT token and refresh token
5. New tokens are saved to localStorage
6. Original API request is retried with new token

## File Structure

### Core Files
- `src/services/authService.js` - Consolidated authentication API calls
- `src/services/api.js` - Axios instance with interceptors for token management
- `src/store/authStore.jsx` - React context for auth state management
- `src/hooks/useAuth.jsx` - Custom hook for authentication operations
- `src/utils/jwtUtils.js` - JWT token validation utilities

### Pages
- `src/pages/auth/LoginPage.jsx` - Login form
- `src/pages/auth/OTPPage.jsx` - OTP verification
- `src/pages/auth/SignupPage.jsx` - Registration form

## Key Features

### ✅ Non-Redundant
- Single auth service file (`authService.js`)
- No duplicate functions across files
- Clean separation of concerns

### ✅ Automatic Token Refresh
- API interceptor handles token refresh automatically
- No manual token refresh calls needed
- Seamless user experience

### ✅ JWT Validation
- Token expiration checked before each request
- Automatic logout on token expiration
- Utility functions for token validation

### ✅ Error Handling
- Consistent error handling across all auth operations
- User-friendly error messages
- Graceful fallbacks

## Usage Examples

### Login
```javascript
const { login } = useAuth();
const response = await login({ email, password });

if (response.verificationUuid) {
  // Navigate to OTP page
} else if (response.result?.token) {
  // Login successful, navigate to dashboard
}
```

### OTP Verification
```javascript
const { verifyOtp } = useAuth();
const response = await verifyOtp({ verification_uuid, otpCode, action });

if (response.result?.token) {
  // Verification successful, user is authenticated
}
```

### API Calls
```javascript
// Tokens are automatically handled by the interceptor
const response = await api.get('/some-protected-endpoint');
```

## Security Features
- JWT tokens with expiration
- Automatic token refresh
- Secure token storage in localStorage
- Token validation before each request
- Automatic logout on token expiration 