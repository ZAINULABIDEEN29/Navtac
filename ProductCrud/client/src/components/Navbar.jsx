import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Plus } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="glass navbar">
      <div className="container navbar__container">
        <Link to="/" className="navbar__logo">
          <Package size={32} color="var(--primary)" />
          <span>zeeCart</span>
        </Link>
        <Link to="/add" className="btn btn-primary">
          <Plus size={20} />
          <span>Add Product</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

