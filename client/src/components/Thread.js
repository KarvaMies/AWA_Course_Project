import '../App.css'
import { useEffect, useState } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import Comment from './Comment';
import moment from 'moment';
import NewComment from './NewComment';

function Thread() {
  const { id } = useParams();
  const [thread, setThread] = useState({});
  const [comments, setComments] = useState([]);
  const [jwt, setJWT] = useState(localStorage.getItem('jwt') || '');
  const [user, setUser] = useState({});
  const [newCommentPressed, setNewCommentPressed] = useState(false);

  useEffect(() => {
    fetch(`/threads/${id}`)
      .then(response => response.json())
      .then(data => {
        setThread(data.thread);
        setComments(data.thread.comments);
      })
      .catch(error => {
        console.error('Error retrieving thread:', error);
      });
  }, [id]);

  useEffect(() => {
    if (jwt) {
      // Parsing the user from jwt
      const decodedToken = jwt.split('.')[1];
      const decodedUser = JSON.parse(atob(decodedToken));
      setUser(decodedUser);
    }
  }, [jwt]);

  const handleNewComment = (newComment) => {
    setComments(prevData => {
      return [...prevData, newComment];
    });
  };

  // Formatting the date for the posts/comments
  const date = moment(thread.date, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
  const formattedDate = date.isBefore(moment().subtract(1, 'day'))
    ? date.format('D.M.YYYY H:mm') : date.fromNow();
  
  return (
    <div className="App">
      <h2>{thread.title}</h2>
      <table>
        <tbody>
          <tr>
            <th>{thread.owner}</th>
            <th className='code-cell'>{thread.text}</th>
            <th>{formattedDate}</th>
          </tr>
          {thread.comments && thread.comments.length !== 0 && (
            thread.comments.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))
          )}
        </tbody>
      </table>

      {jwt && !newCommentPressed ?
        <Link to={`/threads/${id}/comment/new`}>
          <button onClick={() => {setNewCommentPressed(true)}}>New Comment</button>
        </Link> : ""
      }

      <Routes>
        <Route
          path={`/threads/:id/comment/new`}
          element={
            <NewComment
              jwt={jwt}
              id={id}
              user={user}
              setComments={setComments}
              handleNewComment={handleNewComment}
              setNewCommentPressed={setNewCommentPressed}
              thread={thread}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default Thread;