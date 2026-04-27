import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Plus, LogOut } from 'lucide-react';
import { useUser } from '../context/UserContext.jsx';
import { useLogout } from '../hooks/useAuth.js';

const Navbar = () => {
  const { state } = useUser();
  const { mutate: logout } = useLogout();
  const isAuthenticated = state.isAuthenticated;

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return isAuthenticated && (
    <nav className="glass navbar">
      <div className="container navbar__container">
        <Link to={isAuthenticated ? "/dashboard" : "/"} className="navbar__logo">
          <Package size={32} color="var(--primary)" />
          <span>zeeCart</span>
        </Link>
        <div className="navbar__actions" style={{ display: 'flex', alignItems: 'center' }}>
          {isAuthenticated ? (
            <>
              <Link to="/add" className="btn btn-primary" style={{ marginRight: '1rem' }}>
                <Plus size={20} />
                <span>Add Product</span>
              </Link>
              <button 
                onClick={handleLogout} 
                className="btn btn-outline"
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link to="/" className="btn btn-outline">
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
