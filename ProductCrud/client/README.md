# Product Management App

A premium, fully responsive React application for managing products, built with the DummyJSON API.

## 🚀 Features

- **Full CRUD Operations**: Create, Read, Update, and Delete products seamlessly.
- **Global State Management**: Powered by React Context API for a unified data flow.
- **Dynamic Search**: Real-time filtering with debouncing for optimal performance.
- **Responsive Design**: Optimized for all screen sizes using Vanilla CSS and glassmorphism.
- **Modern UI/UX**: Features smooth animations, custom scrollbars, and a sleek dark theme.

## 🛠️ Tech Stack

- **Frontend**: React (Vite)
- **Routing**: React Router DOM v7
- **Icons**: Lucide React
- **Styling**: Vanilla CSS with CSS Variables
- **API**: [DummyJSON](https://dummyjson.com/)

## 📂 Project Structure

- `src/context/ProductContext.jsx`: Global state and API logic.
- `src/components/`: Reusable UI components (Navbar, SearchBar, ProductCard).
- `src/pages/`: Main application views (Home, ProductDetails, AddEditProduct).
- `src/index.css`: Design system and global styles.

## 🗺️ Routing structure

- `/` → Product List
- `/product/:id` → Product Details
- `/add` → Add Product
- `/edit/:id` → Edit Product
