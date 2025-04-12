Sure! Here's a clean and informative `README.md` for your project based on everything we've discussed:

---

# 🛍️ ShopFake – React E-Commerce Demo

**ShopFake** is a minimalistic e-commerce frontend built with **React** and **Context API**, simulating user authentication using fake JWT tokens and `localStorage`. It includes light/dark theme toggling, a fake login/register system, and a responsive design for a smooth user experience.

🌐 **Live Site**: [https://shopfakereact.netlify.app/](https://shopfakereact.netlify.app/)

---

## 🚀 Features

- 🛒 Product pages and mock cart
- 🌙 Light/Dark theme toggle with persistence
- 👤 Simulated user login/register using `localStorage`
- 🧠 Global state management with **Context API**
---

## 🔐 Authentication

Authentication is simulated using a custom `AuthContext`. Here's how it works:

- On login/register:
  - A **fake JWT token** and user object are generated
  - These are stored in `localStorage`
  - The user state (`currentUser`) is updated via `useState`
- On page refresh:
  - User data and token are restored from `localStorage`
- Includes a `logout()` function to clear the state and storage

Use the `useAuth()` hook anywhere in your app to access:
```js
const { currentUser, login, register, logout, isAuthenticated } = useAuth()
```

---

## 🎨 Theme Toggle

Implemented using a custom `ThemeContext`:

- Detects system preference (`prefers-color-scheme`)
- Persists the selected theme in `localStorage`
- Dynamically applies the theme using a `data-theme` attribute on `<html>`

Use the `useTheme()` hook to toggle or read the current mode.

---

## 🧱 Tech Stack

- React (with functional components & hooks)
- React Router (for navigation)
- Context API (for auth and theme state)
- LocalStorage (for token/user/theme persistence)
- Basic CSS for styling

---

## 📦 Getting Started

```bash
git clone git@github.com:sreeramp-official/react_fake_store_app.git
cd react_fake_store_app
npm install
npm start
```