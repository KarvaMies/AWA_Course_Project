import moment from 'moment';
import { Link } from 'react-router-dom';

function ThreadList({ 'data': thread }) {

  // Formatting the date for the posts/comments
  const date = moment(thread.date, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
  const formattedDate = date.isBefore(moment().subtract(1, 'day'))
    ? date.format('D.M.YYYY H:mm') : date.fromNow();

  return (
    <>
      <tr key={thread._id}>
        <td>{thread.owner}</td>
        <td>{thread.title}</td>
        <td>{formattedDate}</td>
        <td>
          <Link to={`/threads/${thread._id}`}>Open</Link>
        </td>
      </tr>
    </>
  );
}

export default ThreadList;