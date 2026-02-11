# 🔐 MERN Authentication System

 A complete full-stack **authentication system** built using the **MERN stack**, offering enterprise-level security, smooth UX, and essential auth features like email verification, OTP-based password reset, and protected user sessions.

---

## 📛 Tech Stack & Tools

<div>

###### ✅ Frontend

<div align='center'>

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge\&logo=react) ![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?style=for-the-badge\&logo=vite) ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-UI-06B6D4?style=for-the-badge\&logo=tailwind-css)

</div>


###### 🚀 Backend

<div align='center'>

![Node.js](https://img.shields.io/badge/Node.js-Server-339933?style=for-the-badge\&logo=node.js) ![Express.js](https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge\&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge\&logo=mongodb) ![Mongoose](https://img.shields.io/badge/Mongoose-ODM-880000?style=for-the-badge\&logo=mongoose)

</div>

###### 🔒 Authentication & Security

<div align='center'>

![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge\&logo=jsonwebtokens) ![Nodemailer](https://img.shields.io/badge/Nodemailer-Email-FCC624?style=for-the-badge\&logo=maildotru)

</div>

###### ⚙️ Utilities & Tools

<div align='center'>

![Axios](https://img.shields.io/badge/Axios-HTTP_Client-5A29E4?style=for-the-badge) ![Toastify](https://img.shields.io/badge/React--Toastify-Notifications-FF6F00?style=for-the-badge) 
![Postman](https://img.shields.io/badge/Postman-Test-FF6C37?style=for-the-badge\&logo=postman) ![dotenv](https://img.shields.io/badge/dotenv-Environment-8DD6F9?style=for-the-badge)
![Concurrently](https://img.shields.io/badge/Concurrently-Dev-1E90FF?style=for-the-badge)

</div>

---
 
## 📋 Table of Contents

- [🌟 Features](#-features)
- [📸 Project Preview](#-project-preview)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Architecture](#️-architecture)
- [⚡ Quick Start](#-quick-start)
- [🔧 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [🚀 Usage](#-usage)
- [📚 API Documentation](#-api-documentation)
- [🔒 Security Features](#-security-features)
- [🎨 UI/UX Features](#-uiux-features)
- [📁 Project Structure](#-project-structure)
- [🧪 Testing](#-testing)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🌟 Features

### 🔐 **Authentication & Security**
- ✅ **User Registration** with email verification
- ✅ **Secure Login/Logout** with JWT tokens
- ✅ **Password Reset** via OTP
- ✅ **Email Verification** system
- ✅ **HTTP-only Cookies** for token storage
- ✅ **Bcrypt Password Hashing** (12 salt rounds)
- ✅ **Protected Routes** with middleware

### 🎨 **User Experience**
- ✅ **Modern UI/UX** with Tailwind CSS
- ✅ **Responsive Design** for all devices
- ✅ **Password Visibility Toggle** (show/hide)
- ✅ **Toast Notifications** for user feedback
- ✅ **Loading States** and error handling
- ✅ **Intuitive OTP Input** with auto-focus

### 🛡️ **Enterprise-Grade Security**
- ✅ **Rate Limiting** to prevent brute force attacks
- ✅ **Input Validation** and sanitization
- ✅ **CORS Protection** with whitelist
- ✅ **Security Headers** (XSS, CSRF protection)
- ✅ **Environment Variables** validation
- ✅ **Error Handling** with proper HTTP status codes

---

## 📸 Project Preview

![1](https://github.com/user-attachments/assets/6e5bc754-2bee-4f82-8041-249b044815d5)

![2](https://github.com/user-attachments/assets/c7ed4a6e-e06c-493e-bc2c-c05baeccf1b9)

![3](https://github.com/user-attachments/assets/b1ead099-7380-47a9-9f32-c374b4c1b524)

![4](https://github.com/user-attachments/assets/0833586b-45c0-452e-9140-da1d87bd3e57)

![5](https://github.com/user-attachments/assets/1b981cd5-9d9c-45d6-a313-eab15c06e0ff)

![6](https://github.com/user-attachments/assets/c9822810-5085-4b15-acc0-b911cf42cc4d)


> *Feel free to replace these links with your actual hosted image URLs (from GitHub, Cloudinary, etc.)*

---

## 🛠️ Tech Stack

### **Frontend**
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.1.0 | UI Library |
| **Vite** | 7.0.4 | Build Tool |
| **Tailwind CSS** | 4.1.11 | Styling |
| **React Router** | 7.7.1 | Navigation |
| **Axios** | 1.11.0 | HTTP Client |
| **React Toastify** | 11.0.5 | Notifications |

### **Backend**
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | Latest | Runtime |
| **Express.js** | 5.1.0 | Web Framework |
| **MongoDB** | 8.17.0 | Database |
| **Mongoose** | 8.17.0 | ODM |
| **JWT** | 9.0.2 | Authentication |
| **Bcrypt** | 3.0.2 | Password Hashing |
| **Nodemailer** | 7.0.5 | Email Service |

---

## 🏗️ Architecture

```mermaid
graph TB
    A[Client - React App] --> B[Express.js Server]
    B --> C[Authentication Middleware]
    B --> D[Rate Limiting Middleware]
    B --> E[MongoDB Database]
    B --> F[Email Service - Nodemailer]
    
    subgraph "Security Layer"
        C
        D
        G[Input Validation]
        H[CORS Protection]
    end
    
    subgraph "Database"
        E --> I[User Collection]
        I --> J[User Schema]
    end
```

---

## ⚡ Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/mern-authentication-system.git
cd mern-authentication-system

# Install dependencies for both client and server
npm run install-all

# Set up environment variables
cp Server/.env.example Server/.env
cp Client/.env.example Client/.env

# Start development servers
npm run dev
```

🎉 **That's it!** Your application will be running at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:4000

---

## 🔧 Installation

### **Prerequisites**
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Git

### **Step-by-Step Setup**

#### 1️⃣ **Clone & Navigate**
```bash
git clone https://github.com/yourusername/mern-authentication-system.git
cd mern-authentication-system
```

#### 2️⃣ **Install Server Dependencies**
```bash
cd Server
npm install
```

#### 3️⃣ **Install Client Dependencies**
```bash
cd ../Client
npm install
```

#### 4️⃣ **Environment Configuration**
Create `.env` files in both Server and Client directories:

**Server/.env**
```env

# Database
MONGODB_URI=mongodb://localhost:27017/mern_auth
# or MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/mern_auth

# JWT Secret (minimum 32 characters)
JWT=your-super-secure-jwt-secret-key-here-32-chars-minimum

# Email Configuration
SENDER_EMAIL=your-email@gmail.com
SENDER_PASSWORD=your-app-password

# Server Configuration
PORT=4000
NODE_ENV=development
```


**Client/.env**
```env
VITE_BACKEND_URL=http://localhost:4000
```

---

## ⚙️ Configuration

### **MongoDB Setup**

#### **Option 1: Local MongoDB**
```bash
# Install MongoDB locally
# Start MongoDB service
mongod

# Create database (optional - will be created automatically)
mongo
use mern_auth
```

#### **Option 2: MongoDB Atlas (Recommended)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

----

### **Email Service Setup**

#### **Gmail Setup**
1. Enable 2-Factor Authentication
2. Generate App Password
3. Use App Password in `SENDER_PASSWORD`

#### **Other Email Providers**
Update `Server/config/nodemailer.js` with your provider settings.

---

## 🚀 Usage

### **Development Mode**
```bash
# Start both client and server concurrently
npm run dev

# Or start individually
cd Server && npm run dev    # Backend on :4000
cd Client && npm run dev    # Frontend on :5173
```

### **Production Mode**
```bash
# Build client
cd Client && npm run build

# Start server
cd Server && npm start
```

### **Available Scripts**

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development servers |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests |

---

## 📚 API Documentation

### **Base URL**
```
http://localhost:4000/api
```

### **Authentication Endpoints**

#### **Register User**
```http
POST /api/user/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### **Login User**
```http
POST /api/user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### **Send Verification OTP**
```http
POST /api/user/send-verify-otp
Cookie: token=jwt_token_here
```

#### **Verify Email**
```http
POST /api/user/verify-account
Cookie: token=jwt_token_here
Content-Type: application/json

{
  "otp": "123456"
}
```

#### **Reset Password**
```http
POST /api/user/send-reset-otp
Content-Type: application/json

{
  "email": "john@example.com"
}
```

For complete API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

---

## 🔒 Security Features

### **🛡️ Authentication Security**
- **JWT Tokens**: Secure, stateless authentication
- **HTTP-only Cookies**: Prevents XSS attacks
- **Bcrypt Hashing**: 12 salt rounds for password security
- **Token Expiration**: 7-day automatic expiry

### **🚫 Attack Prevention**
- **Rate Limiting**: 5 auth attempts per 15 minutes
- **Input Validation**: Prevents injection attacks
- **CORS Protection**: Whitelist-based origin control
- **Security Headers**: XSS, CSRF, and clickjacking protection

### **🔐 Data Protection**
- **Password Strength**: Enforced complexity requirements
- **Email Verification**: Prevents fake account creation
- **OTP System**: Time-limited verification codes
- **Environment Variables**: Sensitive data protection

---

## 🎨 UI/UX Features

### **🎯 User Interface**
- **Modern Design**: Clean, professional appearance
- **Responsive Layout**: Works on all screen sizes
- **Dark Theme**: Easy on the eyes
- **Gradient Backgrounds**: Beautiful visual appeal

### **🚀 User Experience**
- **Password Toggle**: Show/hide password functionality
- **Auto-focus**: Seamless OTP input experience
- **Toast Notifications**: Real-time feedback
- **Loading States**: Clear progress indicators
- **Error Handling**: User-friendly error messages

### **📱 Mobile Optimization**
- **Touch-friendly**: Optimized for mobile devices
- **Responsive Design**: Adapts to all screen sizes
- **Fast Loading**: Optimized performance

---

## 📁 Project Structure

```
mern-authentication-system/
├── 📁 Client/                    # React Frontend
│   ├── 📁 public/               # Static assets
│   ├── 📁 src/
│   │   ├── 📁 Pages/            # React pages
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── VerifyEmail.jsx
│   │   │   └── ResetPassword.jsx
│   │   ├── 📁 Context/          # React Context
│   │   │   └── AppContext.jsx
│   │   ├── 📁 MyComponents/     # Reusable components
│   │   ├── 📁 assets/           # Images, icons
│   │   └── 📁 utils/            # Utility functions
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── 📁 Server/                   # Node.js Backend
│   ├── 📁 config/              # Configuration files
│   │   ├── mongodb.js
│   │   ├── nodemailer.js
│   │   ├── emailTemplates.js
│   │   └── validateEnv.js
│   ├── 📁 controllers/         # Route controllers
│   │   ├── userController.js
│   │   └── userDetails.js
│   ├── 📁 middlewares/         # Custom middleware
│   │   ├── userAuth.js
│   │   └── rateLimiter.js
│   ├── 📁 models/              # Database models
│   │   └── UserModel.js
│   ├── 📁 routes/              # API routes
│   │   ├── userRouter.js
│   │   └── userDetails.js
│   ├── 📁 utils/               # Utility functions
│   │   └── validation.js
│   ├── server.js               # Entry point
│   └── package.json
│
├── 📄 README.md                # Project documentation
├── 📄 API_DOCUMENTATION.md     # API reference
└── 📄 LICENSE                  # License file
```

---

## 🧪 Testing

### **Running Tests**
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### **Test Coverage**
- ✅ Unit Tests for utilities
- ✅ Integration Tests for API endpoints
- ✅ Component Tests for React components
- ✅ E2E Tests for user flows

---

## 🚀 Deployment

### **Frontend Deployment (Vercel/Netlify)**
```bash
# Build the client
cd Client
npm run build

# Deploy to Vercel
vercel --prod

# Or deploy to Netlify
netlify deploy --prod --dir=dist
```

### **Backend Deployment (Railway/Heroku)**
```bash
# Deploy to Railway
railway login
railway link
railway up

# Or deploy to Heroku
heroku create your-app-name
git push heroku main
```

### **Environment Variables for Production**
Remember to set all environment variables in your deployment platform:
- `MONGODB_URI`
- `JWT`
- `SENDER_EMAIL`
- `SENDER_PASSWORD`
- `NODE_ENV=production`

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

### **Getting Started**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm test`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### **Development Guidelines**
- Follow ESLint configuration
- Write tests for new features
- Update documentation
- Use conventional commit messages

### **Code Style**
- Use ES6+ features
- Follow React best practices
- Maintain consistent formatting
- Add comments for complex logic

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- **React Team** for the amazing library
- **Express.js** for the robust backend framework
- **MongoDB** for the flexible database
- **Tailwind CSS** for the utility-first CSS framework
- **Open Source Community** for inspiration and support

---

## 📞 Support


| Platform              | Link                                                          |
| --------------------- | ------------------------------------------------------------- |
| 🌐 **Live Demo**      | [View Now](https://mern-authentication-system-liart.vercel.app)                        |
| 🧑‍💻 **GitHub Repo** | [View Code](https://github.com/PranavThorat1432/MERN-Authentication-System) |
| 💼 **LinkedIn**       | [Connect with Me](https://www.linkedin.com/in/curiouspranavthorat)       |
| 📩 **Email**          | [pranavthorat95@gmail.com](mailto:pranavthorat95@gmail.com)   |


---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by [Pranav Thorat](https://github.com/PranavThorat1432)

</div>