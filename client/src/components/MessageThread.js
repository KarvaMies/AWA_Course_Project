import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const MessageThread = ({ messages }) => {
  const user = useSelector(state => state.user);
  const [newMessage, setNewMessage] = useState('');

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  }

  const handleNewMessageSubmit = (event) => {
    event.preventDefault();
    postMessage(newMessage, user.token); // Call the API to add the new message
    setNewMessage(''); // Clear the input field
  }

  return (
    <div>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <p>{message.text}</p>
            <button>Reply</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleNewMessageSubmit}>
        <input type="text" value={newMessage} onChange={handleNewMessageChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default MessageThread;
