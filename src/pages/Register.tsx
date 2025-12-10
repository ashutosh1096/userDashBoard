import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register, startLoading, stopLoading } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import '../style.css';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(startLoading());
    dispatch(register({ email, password }));
    setTimeout(() => {
      dispatch(stopLoading());
      alert('Successfully registered! Redirecting...');
      navigate('/');
    }, 300);
  };

  return (
    <form className="auth-form card" onSubmit={handleRegister} style={{maxWidth:420, margin:'40px auto', padding:24}}>
      <h2>Register</h2>
      <input type="email" required placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" required placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit" className="btn-primary">Register</button>
    </form>
  );
};

export default Register;
