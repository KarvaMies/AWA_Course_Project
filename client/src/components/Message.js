import moment from 'moment';
import {Link} from 'react-router-dom';

function Message({data: messageData}) {

  const date = moment(messageData.date);

  const formattedDate = date.isBefore(moment().subtract(1, 'day'))
    ? date.format('D.M.YYYY H:mm') : date.fromNow();

  return (
    <tr>
        <td>{messageData.name}</td>
        <td>{messageData.comment}</td>
        <td>{formattedDate}</td>
        <td><Link to={`/data/${messageData.id}`}>Open</Link></td>
    </tr>
  )
}

export default Message