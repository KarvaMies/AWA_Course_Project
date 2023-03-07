import React, { useState } from 'react';

function MessageForm({ onMessageSubmit }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!message.trim()) return;
    onMessageSubmit(message);
    setMessage('');
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" value={message} onChange={handleChange}></textarea>
      </div>
      <div>
        <button type="submit">Send</button>
      </div>
    </form>
  );
}

export default MessageForm;
