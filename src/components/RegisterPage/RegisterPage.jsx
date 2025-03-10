import { useState, useEffect } from 'react';
import useStore from '../../zustand/store';
import './RegisterPage.css'; // Ensure the CSS file is imported correctly

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const register = useStore((state) => state.register);
  const errorMessage = useStore((state) => state.authErrorMessage);
  const setAuthErrorMessage = useStore((state) => state.setAuthErrorMessage);

  useEffect(() => {
    // Clear the auth error message when the component unmounts:
    return () => {
      setAuthErrorMessage('');
    };
  }, [setAuthErrorMessage]);

  const handleRegister = (event) => {
    event.preventDefault();
    register({
      username,
      password,
      name,
      phone,
    });
  };

  return (
    <div className="register-container">
      <h2>Marwa's Henna Register Page</h2>
      <form onSubmit={handleRegister} className="register-form">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button className="btn btn-dark register-button" type="submit">
          Register
        </button>
      </form>
      {errorMessage && (
        <h3 className="error-message">{errorMessage}</h3>
      )}
    </div>
  );
}

export default RegisterPage;
