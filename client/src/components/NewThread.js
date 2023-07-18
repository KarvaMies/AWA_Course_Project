import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function NewThread({ jwt, user, setData, setNewThreadPressed }) {
  const [threadData, setThreadData] = useState({});
  const [threadCreated, setThreadCreated] = useState(false);

  const submit = (e) => {
    e.preventDefault();

    console.log(`userID: ${user}, title: ${threadData.title}, text: ${threadData.text}`);
    console.log(user);
    console.log(jwt);
    
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
        
        console.log("-----------DATA-----------");
        console.log(data)
        console.log("^^^^^^^^^^^DATA^^^^^^^^^^^")

        setData(prevData => [...prevData, data]);

        setThreadData({});
        setNewThreadPressed(false);
        setThreadCreated(true);
      })
      .catch(error => {
        console.error('Error creating new thread:', error);
      });
      
  };

  const handleChange = (e) => {
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
