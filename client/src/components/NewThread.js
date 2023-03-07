import React, { useState } from 'react';

function NewThread({ jwt }) {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('/api/threads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
      body: JSON.stringify({ text })
    })
      .then(response => response.json())
      .then(data => {
        // Redirect to the thread list
      })
      .catch(error => {
        console.error('Error creating new thread:', error);
      });
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="text">New Thread:</label>
        <textarea id="text" name="text" value={text} onChange={handleChange}></textarea>
      </div>
      <div>
        <button type="submit">Create Thread</button>
      </div>
    </form>
  );
}

export default NewThread;
