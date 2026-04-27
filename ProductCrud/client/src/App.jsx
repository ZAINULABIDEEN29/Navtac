import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ToastProvider } from './context/ToastContext';
import UserProvider from './context/UserProvider.jsx';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import AddEditProduct from './pages/AddEditProduct';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProtectedRoute from './pages/ProctectedRoute.jsx';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>

        <ToastProvider>
          <Router>
            <Navbar />
            <Toaster position="top-right" reverseOrder={false} />
            <main className="container fade-in">
              <Routes>
                <Route element={<ProtectedRoute authorized={false} />} >
                  <Route path="/" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Route>
                <Route element={<ProtectedRoute authorized={true} />} >
                  <Route path="/dashboard" element={<Home />} />
                  <Route path="/product/:_id" element={<ProductDetails />} />
                  <Route path="/add" element={<AddEditProduct />} />
                  <Route path="/edit/:_id" element={<AddEditProduct />} />
                </Route>
              </Routes>
            </main>
          </Router>
        </ToastProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
