import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function NewComment({ jwt, id, user, setData, setNewCommentPressed }) {
  const [commentData, setCommentData] = useState({});
  const [commentCreated, setCommentCreated] = useState(false);

  const submit = (e) => {
    e.preventDefault();

    console.log(`id: ${id} userID: ${user}, title: ${commentData.title}, text: ${commentData.text}`);
    console.log(user);
    console.log(jwt);
    
    fetch(`/threads/${id}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
      body: JSON.stringify({
        ownerID: user.id,
        owner: user.username,
        text: commentData.text,
      })
    })
      .then(response => response.json())
      .then(data => {
        
        console.log("-----------DATA-----------");
        console.log(data)
        console.log("^^^^^^^^^^^DATA^^^^^^^^^^^")

        setData(prevData => [...prevData, data]);

        setCommentData({});
        setNewCommentPressed(false);
        setCommentCreated(true);
      })
      .catch(error => {
        console.error('Error creating new comment:', error);
      });
      
  };

  const handleChange = (e) => {
    setCommentData({ ...commentData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setNewCommentPressed(false);
  }

  return (
    (commentCreated ? null : (
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
          <button type="submit">Create Comment</button>
          <Link to={"http://localhost:3000"} onClick={handleCancel} >Cancel</Link>
        </div>
      </form>
    ))
  );
}

export default NewComment;
