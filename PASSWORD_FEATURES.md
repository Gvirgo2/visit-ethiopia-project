# Password Management Features

This document outlines the password management features implemented in the TourMate authentication system.

## Features Added

### 1. Forgot Password
- **Route**: `/forgot-password`
- **Component**: `ForgotPassword.jsx`
- **Functionality**: 
  - Users can request a password reset by entering their email
  - Sends reset link to user's email
  - Shows success message after email is sent
  - Links back to login page

### 2. Reset Password
- **Route**: `/reset-password/:token`
- **Component**: `ResetPassword.jsx`
- **Functionality**:
  - Users can reset their password using a token from email
  - Validates new password requirements
  - Shows success message and redirects to login
  - Handles token validation errors

### 3. Update Password (Logged-in Users)
- **Route**: `/update-password`
- **Component**: `UpdatePassword.jsx`
- **Functionality**:
  - Authenticated users can change their password
  - Requires current password verification
  - Validates new password requirements
  - Shows success message and redirects to dashboard

## API Endpoints Used

### Forgot Password
```
POST /api/v1/users/forgotPassword
Body: { "email": "user@example.com" }
```

### Reset Password
```
PATCH /api/v1/users/resetPassword/:token
Body: { 
  "password": "newPassword", 
  "passwordConfirm": "newPassword" 
}
```

### Update Password
```
PATCH /api/v1/users/updatePassword
Body: { 
  "currentPassword": "oldPassword",
  "newPassword": "newPassword", 
  "newPasswordConfirm": "newPassword" 
}
```

## UI/UX Features

### Form Validation
- Email format validation
- Password strength requirements (minimum 8 characters)
- Password confirmation matching
- Current password verification for updates
- Real-time error clearing on input

### User Experience
- Loading states during API calls
- Success messages with auto-redirect
- Error handling with user-friendly messages
- Consistent styling with existing components
- Responsive design with Tailwind CSS

### Navigation
- "Forgot Password" link added to login page
- "Update Password" button added to dashboard
- Cancel options for password updates
- Automatic redirects after successful operations

## Security Features

- Token-based password reset
- Current password verification for updates
- Automatic logout on authentication errors
- Secure password validation
- Protected routes for authenticated features

## File Structure

```
src/auth/
├── ForgotPassword.jsx    # New - Forgot password form
├── ResetPassword.jsx     # New - Reset password with token
├── UpdatePassword.jsx    # New - Update password for logged-in users
├── Login.jsx            # Updated - Added forgot password link
├── Signup.jsx           # Existing
├── Logout.jsx           # Existing
└── VerifyEmail.jsx      # Existing

src/contexts/
└── AuthContext.jsx      # Updated - Added updatePassword function

src/App.jsx              # Updated - Added new routes
```

## Usage Flow

### Forgot Password Flow
1. User clicks "Forgot your password?" on login page
2. User enters email address
3. System sends reset email
4. User receives email with reset link
5. User clicks link and sets new password
6. User is redirected to login page

### Update Password Flow
1. User logs in and goes to dashboard
2. User clicks "Update Password" button
3. User enters current password and new password
4. System validates and updates password
5. User sees success message and is redirected to dashboard

## Testing

All components include:
- Form validation testing
- API error handling
- Loading state management
- Success/error message display
- Navigation flow testing 