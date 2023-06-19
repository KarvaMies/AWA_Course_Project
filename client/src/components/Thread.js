import { useEffect, useState } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';
//import MessageForm from './MesageForm';
//import MessageThread from './MessageThread';
import Login from './Login';
import Register from './Register';
import Comments from './Comments';
import moment from 'moment';
import NewComment from './NewComment';

function Thread() {
  const { id } = useParams();
  const [thread, setThread] = useState({});
  const [comments, setComments] = useState([]);
  const [jwt, setJWT] = useState("");
  const [user, setUser] = useState({});
  const [showRegister, setShowRegister] = useState(false);
  const [newCommentPressed, setNewCommentPressed] = useState(false);

  useEffect(() => {
    fetch(`/threads/${id}`)
      .then(response => response.json())
      .then(data => {
        setThread(data.thread);
        setComments(data.comments);
      })
      .catch(error => {
        console.error('Error retrieving thread:', error);
      });
  }, [id]);

  const handleNewComment = (newComment) => {
    setComments(prevData => {
      return [...prevData, newComment];
    });
  };

  const handleLogout = () => {
    setJWT("");
    setUser({});
  };

  const date = moment(thread.date, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
  
  const formattedDate = date.isBefore(moment().subtract(1, 'day'))
    ? date.format('D.M.YYYY H:mm') : date.fromNow();


  return (
    <div className="App">
      {jwt ? (
        <>
          <h2>Welcome {user.username}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          {!showRegister ? (
            <Login setJWT={setJWT} jwt={jwt} setUser={setUser} setShowRegister={setShowRegister} />
          ) : (
            <Register setShowRegister={setShowRegister} setJWT={setJWT} />
          )}
          <button onClick={() => setShowRegister(!showRegister)}>
            {showRegister ? "Already have an account?" : "Register instead"}
          </button>
        </>
      )}

      <h1>Threads</h1>
      <h2>{thread.title}</h2>
      <table>
      <tbody>
        <tr>
          <th>{thread.owner}</th>
          <th>{thread.text}</th>
          <th>{formattedDate}</th>
        </tr>
        {thread.comments && thread.comments.length !== 0 && (
          comments.map((d) => (
            <Comments key={d._id} comment={d} />
          ))
        )}
      </tbody>
      </table>
      <Routes>
        
        <Route
          path={`/threads/${id}/comment`}
          element={
            <NewComment
              jwt={jwt}
              id={id}
              user={user}
              setComments={setComments}
              handleNewComment={handleNewComment}
              setNewCommentPressed={setNewCommentPressed}
            />
          }
        />
      </Routes>
      {jwt && !newCommentPressed ?
        <Link to={`/threads/${id}/comment`}>
          <button onClick={() => setNewCommentPressed(true)}>New Comment</button>
        </Link> : ""
      }
    </div>
  );
}

export default Thread;

//TODO! kommenttien lisäys

  /*<Route path="threads/:id/comment" element={<Comment />} />
  const handleNewComment = (comment) => {
    fetch(`/threads/${id}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ comment: comment })
    })
      .then(response => response.json())
      .then(data => {
        setThread(prevThread => {
          return {
            ...prevThread,
            comments: [...prevThread.comments, data]
          };
        });
      });
  };
  */

/* </tr> ja </tbody> väliin
{thread.comments.map((d) => (
  <Comments key={d._id} data={d} />
))}
*/

/* </table> ja {jwt väliin
<MessageThread comments={thread.comments} />
<MessageForm onCommentSubmit={handleNewCommentSubmit} />
*/