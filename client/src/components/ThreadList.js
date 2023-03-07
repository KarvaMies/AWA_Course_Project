import moment from 'moment';
import { Link } from 'react-router-dom';

function ThreadList({ 'data': thread }) {
  /*
  console.log("-------------------------Threads:-----------------------")
  console.log(thread);
  console.log("thread.id: " + thread.id);
  console.log("thread._id: " + thread._id);
  console.log("--------------------------------------------------------")
  */

  const date = moment(thread.date);
  
  const formattedDate = date.isBefore(moment().subtract(1, 'day'))
    ? date.format('D.M.YYYY H:mm') : date.fromNow();

  return (
    <>
      <tr key={thread._id}>
        <td>{thread._id}</td>
        <td>{thread.owner}</td>
        <td>{thread.title}</td>
        <td>{formattedDate}</td>
        <td>
          <Link to={`/thread/${thread._id}`}>Open</Link>
        </td>
      </tr>
    </>
  );
}

export default ThreadList;
