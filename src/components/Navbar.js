// import React from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout, startLoading, stopLoading } from '../store/authSlice';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const user = useSelector(state => state.auth && state.auth.user);
//   const isLoggedIn = Boolean(user);

//   function handleLogout() {
//     dispatch(startLoading());
//     setTimeout(() => {
//       dispatch(logout());
//       dispatch(stopLoading());
//       navigate('/login');
//     }, 300);
//   }

//   return (
//     <nav className="navbar">
//       <div className="nav-brand">WeEnggs Dashboard</div>
//       <div className="nav-links">
//         {isLoggedIn && (
//           <>
//             <NavLink to="/" className={({isActive})=> isActive? 'active':''} end>Dashboard</NavLink>
//             <NavLink to="/users" className={({isActive})=> isActive? 'active':''}>Users</NavLink>
//             <NavLink to="/projects" className={({isActive})=> isActive? 'active':''}>Projects</NavLink>
//           </>
//         )}
//       </div>
//       <div className="nav-actions">
//         {isLoggedIn ? (
//           <button className="btn-logout" onClick={handleLogout}>Logout</button>
//         ) : (
//           <NavLink to="/login">Login</NavLink>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, startLoading, stopLoading } from '../store/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux user
  const reduxUser = useSelector(state => state.auth && state.auth.user);

  // LocalStorage user (for page refresh)
  const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Final user (Redux OR localStorage)
  const user = reduxUser || storedUser;

  const isLoggedIn = Boolean(user);

  function handleLogout() {
    dispatch(startLoading());
    setTimeout(() => {
      dispatch(logout());
      dispatch(stopLoading());
      navigate('/login');
    }, 300);
  }

  return (
    <nav className="navbar">
      <div className="nav-brand">WeEnggs Dashboard</div>

      <div className="nav-links">
        {isLoggedIn && (
          <>
            <NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>
              Dashboard
            </NavLink>
            <NavLink to="/users" className={({isActive}) => isActive ? 'active' : ''}>
              Users
            </NavLink>
            <NavLink to="/projects" className={({isActive}) => isActive ? 'active' : ''}>
              Projects
            </NavLink>
          </>
        )}
      </div>

      <div className="nav-actions">
        {isLoggedIn ? (
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
