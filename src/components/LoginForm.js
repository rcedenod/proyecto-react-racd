import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = ({ onLoginSuccess, onToggleRegister, theme }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (username, password) => {
    fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        onLoginSuccess();
        setErrorMessage('');
      } else {
        setErrorMessage(data.message || 'Usuario o contraseña incorrectos');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setErrorMessage('Error en la conexión');
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  return (
    <div className={`login-form-container ${theme}`}>
      <form className={`login-form ${theme}`} onSubmit={handleSubmit}>
        <div>
          <label>Nombre de usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            maxLength={25}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            maxLength={25}
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>} 
        <button type="submit">Iniciar sesion</button>
        <p>¿No tienes una cuenta?<button type='button' onClick={onToggleRegister}>Regístrate</button></p>
      </form>
    </div>
  );
};

export default LoginForm;
