# 🔐 Advanced Authentication System

A professional-grade authentication system built using **React**, **Vite**, and **Firebase**. This project demonstrates best practices for secure user authentication, state management, and custom session persistence logic with a 24-hour Time-To-Live (TTL).

---

## 🎯 Key Objectives

The primary goal of this project is to provide a seamless, secure, and persistent authentication experience, featuring:

- **Firebase Google Auth**: Modern and secure federated login.
- **Route Protection**: Automated redirects for unauthorized access.
- **Custom Session TTL**: Smart session management with a 24-hour expiration.
- **Premium UI/UX**: Responsive design built with **Tailwind CSS** and **Flowbite**.

---

## ✨ Latest Updates

- **Simplified EventGrid**: Event listing, loading skeleton, and empty state are now handled in a cleaner single component flow.
- **Event Search UX**: Dashboard includes event-name filtering with a quick `Clear` action.
- **Clickable Active Event State**: Last selected event card is highlighted and restored using `localStorage`.
- **Context-Driven Event Data**: Event fetch + filtering are managed in `AuthContext`, keeping UI components lightweight.

---

## 🛠️ Technology Stack

| Component | Technology |
| :--- | :--- |
| **Frontend Framework** | React 19+ (Hooks & Context API) |
| **Build Tooling** | Vite |
| **Styling** | Tailwind CSS & Flowbite |
| **Backend/Auth** | Firebase Authentication |
| **Persistence** | LocalStorage API |
| **Routing** | React Router v7 |

---

## 📂 Project Architecture

```text
src/
├── components/
│   ├── DashboardHome.jsx    # Dashboard header/user info block
│   ├── EventGrid.jsx        # Search + loading + event cards UI
│   ├── Footer.jsx           # Footer section
│   ├── Navbar.jsx           # Top navigation bar
│   └── ProtectedRoute.jsx   # Route guard for private pages
├── context/
│   └── AuthContext.jsx      # Auth state + event state + filtering logic
├── firebase/
│   └── firebaseCofig.js     # Firebase auth/provider initialization
├── pages/
│   ├── Dashboard.jsx        # Protected dashboard page
│   ├── Login.jsx            # Login page
│   ├── Register.jsx         # Register page
│   └── NotFound.jsx         # 404 fallback page
├── services/
│   └── eventService.js      # Event data fetch helper
└── App.jsx                  # Main routing configuration
```

---

## 🚀 Getting Started

### 📋 Prerequisites

- **Node.js**: Ensure you have Node.js installed (v18.x or above).
- **Firebase Project**: A Firebase project with Google Authentication enabled.

### 📥 Installation

1.  **Clone the Repository**:
    ```bash
    git clone <your-repository-url>
    cd Assignment-1_Authentication celebrare
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

### ⚙️ Environment Configuration

Create a `.env` file in the root directory and add your Firebase credentials for the application to interact with your Firebase project:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_APP_NAME="Authentication System"
```

### 🏃 Running Locally

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## 🔒 Security & Persistence

### ⏳ Custom Session TTL (24-Hour Expiry)

To ensure security, the system implements a strict 24-hour Time-To-Live (TTL) for sessions:

- **Initialization**: On login, a timestamp is calculated (`currentTime + 24hrs`).
- **Persistence**: This timestamp is stored in `localStorage` alongside the user profile.
- **Validation**: On each app load/refresh, the system checks if the current time has exceeded the stored timestamp.
- **Purge Logic**: If expired, the session is cleared, and the user is redirected to the login view.

## 🚀 Live Demo

👉 [https://internship-assignments-mu.vercel.app](https://internship-assignments-mu.vercel.app/)

### 🛡️ Protected Routes

The application uses a `ProtectedRoute` component to secure sensitive pages. Unauthorized attempts to access `/dashboard` or other private routes are intercepted and redirected to the login page, maintaining data integrity and user privacy.

---

