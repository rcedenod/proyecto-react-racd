import React, { useState } from 'react';
import './RegisterForm.css';

const RegisterForm = ({ onRegisterSuccess, onToggleRegister, theme}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = (username, password, confirmPassword) => {
    
    if (!username || !password || !confirmPassword) {
      setErrorMessage('Todos los campos son obligatorios');
      setSuccessMessage('');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      setSuccessMessage(''); 
      return;
    }

    fetch('http://localhost:8000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, confirmPassword }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === "Usuario registrado exitosamente") {
          setErrorMessage(''); 
          setSuccessMessage("Registro exitoso"); 
          onRegisterSuccess();
        } else {
          setErrorMessage(data.message || 'Error en el registro');
          setSuccessMessage('');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setErrorMessage('Error en la conexión');
        setSuccessMessage(''); 
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(username, password, confirmPassword);
  };

  return (
    <div className={`register-form-container ${theme}`}>
      <form className={`register-form ${theme}`}onSubmit={handleSubmit}>
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
        <div>
          <label>Confirmar contraseña:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            maxLength={25}
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        
        <button type="submit">Registrarse</button>
        <p>¿Ya tienes una cuenta?<button type='button' onClick={onToggleRegister}>Inicia sesión</button></p>
      </form>
    </div>
  );
};

export default RegisterForm;
