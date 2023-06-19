import React, { useState } from 'react';

function Register({ setJWT }) {
  const [userData, setUserData] = useState({});
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const submit = (e) => {
    e.preventDefault();

    if (userData.password !== userData.confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    fetch('/user/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(userData),
      mode: 'cors'
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.token) {
        setJWT(data.token);
      }
    });
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setPasswordsMatch(confirmPassword === userData.password);
    setUserData({ ...userData, confirmPassword });
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={submit} onChange={handleChange}>
        <div>
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" id="username" placeholder="Enter username" required onChange={handleChange} />
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" placeholder="Enter password" required onChange={handleChange} />
        </div>
        <div>
            <label htmlFor="confirmPassword">Confirm password:</label>
            <input type="password" name="confirmPassword" id="confimrPassword" placeholder="Confirm password" required onChange={handleConfirmPasswordChange} />
            {!passwordsMatch && <p style={{color: 'red'}}>Passwords do not match</p>}
        </div>
        <div>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" placeholder="Enter email" required onChange={handleChange} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
