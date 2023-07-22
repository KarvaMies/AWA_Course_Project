import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function NewThread({ jwt, user, setData, setNewThreadPressed }) {
  const [threadData, setThreadData] = useState({});
  const [threadCreated, setThreadCreated] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setButtonPressed(true);

    if (threadData.title && threadData.title.length > 100) {
      setTitleError(true);
      return;
    }    
    fetch('/threads/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
      body: JSON.stringify({
        ownerID: user.id,
        owner: user.username,
        title: threadData.title,
        text: threadData.text
      })
    })
      .then(response => response.json())
      .then(data => {
        setData(prevData => [...prevData, data]);
        setThreadData({});
        setNewThreadPressed(false);
        setThreadCreated(true);

        window.location.href = "http://localhost:3000";
      })
      .catch(error => {
        console.error('Error creating new thread:', error);
      });
  };

  const handleChange = (e) => {
    const { name } = e.target;
    setButtonPressed(false);
    
    if (name === 'title') {
      setTitleError(false);
    }

    setThreadData({ ...threadData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setNewThreadPressed(false);
  }

  return (
    (threadCreated ? null : (
      <form onSubmit={submit} onChange={handleChange}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" placeholder="Enter title" required onChange={handleChange} />
          {buttonPressed && threadData.title && threadData.title.length > 100 && (
            <span style={{ color: 'red' }}>Title cannot exceed 100 characters.</span>
          )}
        </div>
        <div>
          <label htmlFor="text">Text:</label>
          <textarea id="text" name="text" rows="7" cols="75" placeholder="Describe your problem here" required onChange={handleChange}></textarea>
        </div>
        <div>
          <button type="submit">Create Thread</button>
          <Link to={"http://localhost:3000"} onClick={handleCancel} >Cancel</Link>
        </div>
      </form>
    ))
  );
}

export default NewThread;