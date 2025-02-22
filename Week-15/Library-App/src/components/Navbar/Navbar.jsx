import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Navbar stilini içeren CSS dosyasını içe aktar

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Uygulamanın farklı sayfalarına yönlendiren bağlantılar */}
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Anasayfa
      </NavLink>
      <NavLink
        to="/publishers"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Yayıncılar
      </NavLink>
      <NavLink
        to="/categories"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Kategoriler
      </NavLink>
      <NavLink
        to="/authors"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Yazarlar
      </NavLink>
      <NavLink
        to="/books"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Kitaplar
      </NavLink>
      <NavLink
        to="/borrow"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Ödünç Alma
      </NavLink>
    </nav>
  );
};

export default Navbar;
