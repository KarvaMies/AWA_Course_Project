import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MessageForm from './MesageForm';
import MessageThread from './MessageThread';

function Thread() {
  const { id } = useParams();
  const [thread, setThread] = useState(null);

  useEffect(() => {
    fetch(`/api/threads/${id}`)
      .then(response => response.json())
      .then(data => setThread(data));
  }, [id]);

  const handleNewCommentSubmit = (comment) => {
    fetch(`/api/threads/${id}/comments`, {
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

  
  if (!thread) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{thread.title}</h1>
      <p>{thread.text}</p>
      <MessageThread comments={thread.comments} />
      <MessageForm onCommentSubmit={handleNewCommentSubmit} />
    </div>
  );
}

export default Thread;
