import '../App.css';
import moment from 'moment';

function Comment({ comment }) {
  // Formatting the date for the posts/comments
  const date = moment(comment.date, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
  const formattedDate = date.isBefore(moment().subtract(1, 'day'))
    ? date.format('D.M.YYYY H:mm') : date.fromNow();
  
  return (
    <>
      <tr key={comment._id}>
        <td>{comment.owner}</td>
        <td className='code-cell'>{comment.text}</td>
        <td>{formattedDate}</td>
      </tr>
    </>
  );
}

export default Comment;