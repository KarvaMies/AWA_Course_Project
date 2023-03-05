import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'


function Data() {
    const {id} = useParams()
    const [data, setData] = useState("");
    
    useEffect(() => {
        fetch("/api/data/"+ id)
            .then(response => response.json())
            .then(json => setData(json))

    }, [id])
    
    return (
        <div>
            {id} – {data.name}
        </div>
    )
}

export default Data
