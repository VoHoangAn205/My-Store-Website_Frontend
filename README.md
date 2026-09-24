# Full-Stack E-Commerce Client (React, Redux Toolkit, Tailwind)

A responsive Single Page Application (SPA) designed to interface with a secure, dual-token Express REST API. Built with resilient session persistence and centralized state management.

> **Backend Repository:** [Link to Backend Repo](https://github.com/VoHoangAn205/My-Online-Store-API)  
> **Live Website:** [https://myWebsite.vercel.app](https://hoangan-online-store-918.vercel.app)

---

## 🚀 Technical Highlights

- **Silent Token Refresh Queueing:** Implemented a custom Axios interceptor utilizing a request queue (`processQueue`) to handle expired access tokens seamlessly without interrupting user actions or dropping concurrent API requests.
- **In-Memory Token Storage (XSS Defense):** Access tokens are stored strictly in Redux memory state, while HTTP-Only cookies handle refresh sessions.
- **SPA Client-Side Routing:** Configured Vercel rewrite rules to ensure seamless deep-linking and browser refreshes across protected routes (`/account`, `/category`).
- **Optimized Image Uploads:** Communicates directly with backend Multer streams for centralized image processing and validation.

---

## 🛠 Tech Stack

- **Framework:** React.js (Vite / CRA)
- **State Management:** Redux Toolkit
- **Routing:** React Router v6
- **HTTP Client:** Axios (Private & Public Instances with Interceptors)
- **Styling:** Tailwind CSS / Ant Design
- **Hosting:** Vercel

---

## ⚙️ Environment Variables

```env
VITE_API_BASE_URL=[https://hoangan-online-store.onrender.com](https://hoangan-online-store.onrender.com)
```
