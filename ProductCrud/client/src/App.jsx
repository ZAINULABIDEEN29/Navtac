import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ToastProvider } from './context/ToastContext';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import AddEditProduct from './pages/AddEditProduct';
import Navbar from './components/Navbar';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime: 1000 * 60 * 5
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <Router>
          <Navbar />
          <main className="container fade-in">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:_id" element={<ProductDetails />} />
              <Route path="/add" element={<AddEditProduct />} />
              <Route path="/edit/:_id" element={<AddEditProduct />} />
            </Routes>
          </main>
        </Router>
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;