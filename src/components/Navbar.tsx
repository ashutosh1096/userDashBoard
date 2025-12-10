import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, startLoading, stopLoading } from '../store/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reduxUser = useSelector((state: any) => state.auth && state.auth.user);
  const storedUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");
  const user = reduxUser || storedUser;

  const isLoggedIn = Boolean(user);
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    dispatch(startLoading());
    setTimeout(() => {
      dispatch(logout());
      dispatch(stopLoading());
      navigate('/login');
    }, 300);
  }

  function handleToggleMenu() {
    setMenuOpen(prev => !prev);
  }

  return (
    <nav className="navbar">
      <div className="nav-brand">Ashutosh Dashboard</div>
      <button className="nav-toggle" onClick={handleToggleMenu} aria-label="Toggle navigation">
        <span className="nav-toggle-icon">☰</span>
      </button>
      <div className={`nav-links${menuOpen ? ' open' : ''}`}>
        {isLoggedIn && (
          <>
            <NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''} onClick={() => setMenuOpen(false)}>
              Dashboard
            </NavLink>
            <NavLink to="/users" className={({isActive}) => isActive ? 'active' : ''} onClick={() => setMenuOpen(false)}>
              Users
            </NavLink>
            <NavLink to="/projects" className={({isActive}) => isActive ? 'active' : ''} onClick={() => setMenuOpen(false)}>
              Projects
            </NavLink>
            <button className="btn-logout" onClick={() => { setMenuOpen(false); handleLogout(); }} style={{marginTop: 12}}>
              Logout
            </button>
          </>
        )}
        {!isLoggedIn && (
          <NavLink to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
