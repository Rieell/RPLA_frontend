import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import API_URL from '../../api';

const LoginForm = () => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState(''); // Only for registration
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const endpoint = isRegisterMode
        ? `${API_URL}/register`
        : `${API_URL}/login`;
        const body = isRegisterMode
            ? { name, email, password }
            : { email: name, password };

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Request failed');
        }

        const data = await response.json();
        console.log('Success:', data);
        alert(isRegisterMode ? 'Registration successful!' : 'Login successful!');
    } catch (error) {
        console.error('Error:', error.message);
        setError(error.message);
    }
};

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    setError('');
    setSuccess('');
    setUsername('');
    setEmail('');
    setPassword('');
  };

  const wrapperStyle = {
    position: 'absolute', // Positioning it to the center of the screen
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '420px',
    height: isRegisterMode ? '520px' : '450px',
    background: 'transparent',
    color: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    transition: 'height .2s ease',
  };

  const formBoxStyle = {
    width: '100%',
    padding: '40px',
  };

  const inputBoxStyle = {
    position: 'relative',
    width: '100%',
    height: '50px',
    margin: '30px 0',
  };

  const inputStyle = {
    width: '100%',
    height: '100%',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    border: '2px solid rgba(255, 255, 255, .1)',
    borderRadius: '40px',
    fontSize: '16px',
    color: '#fff',
    padding: '20px 45px 20px 20px',
  };

  const iconStyle = {
    position: 'absolute',
    right: '20px',
    top: '50%',
    transform: 'translate(0, -50%)',
    fontSize: '16px',
  };

  const rememberForgotStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14.5px',
    margin: '-15px 0 15px',
  };

  const buttonStyle = {
    width: '100%',
    height: '45px',
    background: '#fff',
    border: 'none',
    outline: 'none',
    borderRadius: '40px',
    boxShadow: '0 0 10px rgba(0, 0, 0, .1)',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#333',
    fontWeight: '700',
  };

  const registerLinkStyle = {
    fontSize: '14.5px',
    textAlign: 'center',
    margin: '20px 0 15px',
  };

  const titleStyle = {
    fontSize: '30px', // Memperbesar ukuran font "Login"
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
  };

  return (
    <div className={`wrapper ${isRegisterMode ? 'active' : ''}`} style={wrapperStyle}>
      <div className="form-box" style={formBoxStyle}>
        <form onSubmit={handleSubmit}>
          <h1 style={titleStyle}>{isRegisterMode ? 'Registration' : 'Login'}</h1>
          <div className="input-box" style={inputBoxStyle}>
            <input
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={inputStyle}
            />
            <FaUser className="icon" style={iconStyle} />
          </div>
          {isRegisterMode && (
            <div className="input-box" style={inputBoxStyle}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
              />
              <FaEnvelope className="icon" style={iconStyle} />
            </div>
          )}
          <div className="input-box" style={inputBoxStyle}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
            <FaLock className="icon" style={iconStyle} />
          </div>
          {isRegisterMode && (
            <div className="remember-forgot" style={rememberForgotStyle}>
              <label>
                <input type="checkbox" required /> I agree to the terms & conditions
              </label>
            </div>
          )}
          {!isRegisterMode && (
            <div className="remember-forgot" style={rememberForgotStyle}>
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a
                href="/remember-forgot" 
                onClick={(e) => {
                    e.preventDefault();
                    console.log('Forgot password clicked');
                }}
                className="clickable-text">
                Forgot password?
              </a>
            </div>
          )}
          <button type="submit" style={buttonStyle}>{isRegisterMode ? 'Register' : 'Login'}</button>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <div className="register-link" style={registerLinkStyle}>
            <p>
              {isRegisterMode
                ? 'Already have an account? '
                : "Don't have an account? "}
              <a
                href="/register-link"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMode();
                }}
                className="clickable-text">
                {isRegisterMode ? 'Login' : 'Register'}
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
