import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, startLoading, stopLoading } from '../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import '../style.css';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(startLoading());
    dispatch(login({ email, password }));
    setTimeout(() => {
      dispatch(stopLoading());
      const logged = localStorage.getItem('loggedInUser');
      if (logged) navigate('/');
      else alert('Invalid credentials');
    }, 300);
  };

  return (
    <form className="auth-form card" onSubmit={handleLogin} style={{maxWidth:420, margin:'40px auto', padding:24}}>
      <h2>Login</h2>
      <input type="email" required placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" required placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <div style={{display:'flex',gap:8,alignItems:'center',marginTop:10}}>
        <button type="submit" className="btn-primary">Login</button>
        <Link to="/register" style={{marginLeft:12,alignSelf:'center'}}>New user? Register</Link>
      </div>
    </form>
  );
};

export default Login;
