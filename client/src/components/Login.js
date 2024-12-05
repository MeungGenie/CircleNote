import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import authService from '../services/authService';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthToken } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await authService.login(username, password);
    if (token) {
      setAuthToken(token);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
