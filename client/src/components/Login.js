import React, { useState } from 'react';

function Login({ handleLogin }) {
  const [userData, setUserData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData),
      mode: 'cors'
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          handleLogin(data.token);
        } else {
          setErrorMessage(data.message);
        }
      });
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter username"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default Login;