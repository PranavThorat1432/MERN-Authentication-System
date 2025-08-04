# 📚 API Documentation


A secure and production-grade Authentication API built using the **MERN stack**. This system supports **JWT authentication**, **HTTP-only cookies**, **OTP-based email verification**, and **secure password reset** workflows — ideal for any SaaS or full-stack web project.



## 🌐 Base URL

```bash
Development: http://localhost:4000  
Production: https://your-production-url.com
````

---

## 🧭 Quick Start for Developers

To test protected routes:

1. Register or login a user.
2. JWT token is set in an **HTTP-only cookie**.
3. Pass this cookie in subsequent requests using `credentials: include` (in frontend) or `-b cookies.txt` (in cURL).

---

## 📋 Table of Contents

* [🔐 Authentication Endpoints](#-authentication-endpoints)
* [📧 Email Verification](#-email-verification-endpoints)
* [🔑 Password Reset](#-password-reset-endpoints)
* [👤 User Data](#-user-data-endpoints)
* [📝 Request/Response Format](#-requestresponse-formats)
* [⚠️ Error Handling](#️-error-handling)
* [📊 Status Codes](#-status-codes)
* [🧪 Testing with cURL](#-testing-with-curl)
* [🔒 Security Notes](#-security-notes)
* [📱 Frontend Integration](#-frontend-integration)
* [📞 Support](#-support)

---

## 🔐 Authentication Endpoints

### 1. User Registration

**POST** `/api/user/register`

Registers a new user.

**Request Body**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```
```

**Success Response**

```json
{
  "message": "Account created successfully",
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "isAccountVerified": false
  }
}
```

---

### 2. User Login

**POST** `/api/user/login`

Authenticates user and sets secure cookie.

**Request Body**

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response**

```json
{
  "message": "Logged In Successfully",
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "isAccountVerified": true
  }
}
```

---

### 3. User Logout

**POST** 
>`/api/user/logout`

Logs user out by clearing the token cookie.

---

### 4. Check Authentication Status

**GET** 
>`/api/user/is-auth`

Checks if a valid session token is present.

---

## 📧 Email Verification Endpoints

### 5. Send Verification OTP

**POST** `/api/user/send-verify-otp`

Sends a 6-digit OTP to user's email.

---

### 6. Verify Account

**POST** `/api/user/verify-account`

**Request Body**

```json
{
  "otp": "123456"
}
```

Verifies user account using OTP.

---

## 🔑 Password Reset Endpoints

### 7. Send Password Reset OTP

**POST** `/api/user/send-reset-otp`

**Request Body**

```json
{
  "email": "john@example.com"
}
```

---

### 8. Reset Password

**POST** `/api/user/reset-password`

**Request Body**

```json
{
  "email": "john@example.com",
  "otp": "123456",
  "newPassword": "newSecurePassword123"
}
```

---

## 👤 User Data Endpoints

### 9. Get Authenticated User Info

**GET** `/api/user-data/data`

Returns the logged-in user’s profile.

---

## 📝 Request/Response Formats

* **Content-Type:** `application/json`
* **Auth Token:** Sent in an `HTTP-only cookie` named `token`

**Standard Response Format**

```json
{
  "message": "Response message",
  "success": true,
  "data": { }
}
```

---

## ⚠️ Error Handling

| Error Code | Meaning      | Example Message           |
| ---------- | ------------ | ------------------------- |
| 400        | Bad Input    | "All fields are required" |
| 401        | Unauthorized | "Not Authenticated"       |
| 404        | Not Found    | "User not found"          |
| 409        | Conflict     | "User already exists"     |
| 500        | Server Error | "Internal server error"   |

---

## 📊 Status Codes

| Code | Description           |
| ---- | --------------------- |
| 200  | Success               |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 404  | Not Found             |
| 409  | Conflict              |
| 500  | Internal Server Error |

---

## 🧪 Testing with cURL

> Make sure cookies are saved between requests using `-c` and `-b` flags.

### Register User

```bash
curl -X POST http://localhost:4000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{ "name": "John", "email": "john@example.com", "password": "securePass123" }'
```

### Login User

```bash
curl -X POST http://localhost:4000/api/user/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{ "email": "john@example.com", "password": "securePass123" }'
```

### Get Authenticated User

```bash
curl -X GET http://localhost:4000/api/user-data/data \
  -H "Content-Type: application/json" \
  -b cookies.txt
```

---

## 🔒 Security Notes

* **JWT Tokens:** Stored securely in HTTP-only cookies.
* **Password Hashing:** Uses bcrypt with salting.
* **Rate Limiting:** Helps prevent brute-force attacks.
* **CORS:** Configured for frontend domain.
* **Validation:** All user inputs are sanitized.
* **OTP Expiry:** Each OTP has limited validity.

---

## 📱 Frontend Integration (Axios Example)

```js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true, // Required for cookie-based auth
});

export const registerUser = (data) => API.post('/api/user/register', data);
```

**Handling API Errors**

```js
try {
  const res = await registerUser(data);
  if (res.success) {
    // do something
  }
} catch (err) {
  const errorMsg = err.response?.data?.message || 'Unknown error';
  console.log(errorMsg);
}
```

---

## 📞 Support

* 📧 **Email**: [pranavthorat95@gmail.com](mailto:pranavthorat95@gmail.com)
* 🐙 **GitHub Issues**: [Create Issue](https://github.com/PranavThorat1432/mern-authentication-system/issues)
* 👨‍💻 **Made by**: [Pranav Thorat](https://github.com/PranavThorat1432)

---

<div align="center">

>✨ Built with MERN Stack & Focused on Real-world Security ✨

</div>
