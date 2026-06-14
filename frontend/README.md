# RoomieMart — Frontend

## Frontend
### Technologies Used
- React JS
- Vite
- Tailwind CSS
- React Router DOM
- Zustand
- Axios
- Socket.IO Client
- Lucide React (icons)

---

# Project Structure
```bash
frontend
│
├── public
│
├── src
│   ├── assets
│   │   ├── hero.png
│   │   └── roomiemart-logo.png
│   │
│   ├── api
│   │   ├── aiApi.js
│   │   ├── authApi.js
│   │   ├── axios.js
│   │   ├── chatApi.js
│   │   ├── demandApi.js
│   │   ├── productApi.js
│   │   ├── rentalApi.js
│   │   ├── reviewApi.js
│   │   ├── userApi.js
│   │   └── wishlistApi.js
│   │
│   ├── components
│   │   ├── EmptyState.jsx
│   │   ├── Footer.jsx
│   │   ├── Loader.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProtectedRoute.jsx
│   │
│   ├── pages
│   │   ├── AIInsights.jsx
│   │   ├── Browse.jsx
│   │   ├── Chat.jsx
│   │   ├── CreateBarter.jsx
│   │   ├── CreateDemand.jsx
│   │   ├── CreateRental.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Demands.jsx
│   │   ├── EditProduct.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── MyListings.jsx
│   │   ├── NotFound.jsx
│   │   ├── Notifications.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Profile.jsx
│   │   ├── Register.jsx
│   │   ├── Rentals.jsx
│   │   ├── Reviews.jsx
│   │   ├── SellItem.jsx
│   │   └── Wishlist.jsx
│   │
│   ├── store
│   │   └── authStore.jsx
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

---

# What I Built

## API Layer
Created a dedicated `api/` folder with separate files for each feature — products, auth, chat, wishlist, demands, rentals, reviews, and AI. All requests go through a shared `axios.js` instance with the base URL and credentials configured once.

## Pages
Built 23 pages covering the full user journey — browsing and searching listings, selling items with AI assistance, real-time chat, demand board, rentals, barter, wishlist, reviews, notifications, admin panel, and user profile.

## Components
Built reusable components including `Navbar`, `ProductCard`, `SearchBar`, `ProtectedRoute`, `Loader`, `EmptyState`, and `Footer` used across multiple pages.

## State Management
Used Zustand for global auth state — stores the logged-in user and token, persists across page refreshes, and exposes login and logout actions used throughout the app.

## Authentication
Implemented JWT-based login and registration along with Google OAuth using `@react-oauth/google`. Protected routes redirect unauthenticated users to the login page.

## Real-time Chat
Built a full chat system using Socket.IO Client. Each conversation has a unique room ID. Messages are emitted and received in real time. An inbox sidebar shows all conversations the user is part of.

## AI Features
Integrated AI price suggestion and AI description generation on the Sell Item page. Users fill in category, condition, and original price to get a smart suggested selling price, or click to auto-generate a product description.

## Deployment
Deployed the frontend on Vercel with `VITE_BACKEND_URL` set to the Render backend URL in environment variables.

---

# Environment Variables
```env
VITE_BACKEND_URL=https://roomiemart.onrender.com
```

---

# Deployment Link
```bash
https://roomie-mart.vercel.app
```
