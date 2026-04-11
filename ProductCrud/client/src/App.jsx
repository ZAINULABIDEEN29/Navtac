import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
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
        <ProductProvider>
          <Router>
            <Navbar />
            <main className="container fade-in">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/add" element={<AddEditProduct />} />
                <Route path="/edit/:id" element={<AddEditProduct />} />
              </Routes>
            </main>
          </Router>
        </ProductProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;