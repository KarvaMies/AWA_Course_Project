import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function NewComment({ jwt, user, setComments }) {
  const [commentData, setCommentData] = useState({});
  const [commentCreated, setCommentCreated] = useState(false);
  const { id } = useParams();

  const submit = (e) => {
    e.preventDefault();    
    fetch(`/threads/${id}/comment/new`, {
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
        setComments(prevData => [...prevData, data]);
        setCommentData({});
        setCommentCreated(true);

        window.location.href = "http://localhost:3000/threads/" + id;        
      })
      .catch(error => {
        console.error('Error creating new comment:', error);
      });
      
  };

  const handleChange = (e) => {
    setCommentData({ ...commentData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    window.location.href = "http://localhost:3000/threads/" + id; 
  }

  return (
    (commentCreated ? null : (
      <>
      <br/><br/>

        <form onSubmit={submit} onChange={handleChange}>
          <div>
            <label htmlFor="text">Your Comment:</label>
            <textarea id="text" name="text" rows="7" cols="75" placeholder="Write your comment here" required onChange={handleChange}></textarea>
          </div>
          <div>
            <button type="submit">Submit Comment</button>
            <Link to={"http://localhost:3000"} onClick={handleCancel} >Cancel</Link>
          </div>
        </form>
      </>
    ))
  );
}

export default NewComment;