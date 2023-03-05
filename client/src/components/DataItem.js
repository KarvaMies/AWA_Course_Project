import {Link} from 'react-router-dom'

function DataItem({data}) {
  return (
    <tr>
        <td>{data.id}</td><td><Link to={`/data/${data.id}`}>{data.name}</Link></td>
    </tr>
  )
}

export default DataItem