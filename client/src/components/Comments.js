import moment from 'moment';

function Comments({ 'data': comment }) {
  console.log("comment in Comments component:")
  console.log(comment)
  const date = moment(comment.date, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
  
  const formattedDate = date.isBefore(moment().subtract(1, 'day'))
    ? date.format('D.M.YYYY H:mm') : date.fromNow();

  return (
    <>
      <tr key={comment._id}>
        <td>{comment.owner}</td>
        <td>{comment.text}</td>
        <td>{formattedDate}</td>
      </tr>
    </>
  );
}

export default Comments;


/*todo

(selvitä miks esim hello world -thread aiheuttaa errorin kun avaa (ehkä se että on kommentteja aiheuttaa?))
kun thread on auki ja kirjautuu sisään -> new comment -napin pitäis ilmestyä
kun kirjautuu ulos ja thread on auki -> new comment -napin pitäis kadota
^^ sivun refreshaus kun kirjautuu sisään/ulos hoitaa tän. Pystyykö tekemään automaattisesti??

new comment-nappi ei toimi ollenkaan -> katoaa kun painaa ja selaimeen tulee 2 jotain keltasta warningia
*/