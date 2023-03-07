import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'


function MessageBoard() {
    const {id} = useParams()
    const [data, setData] = useState("");
    
    useEffect(() => {
        console.log("--------------------------id + data.text----------------");
        console.log(id + "     " + data.text);
        console.log("--------------------------------------------------------")
        fetch("/api/thread/"+ id)
            .then(response => response.json())
            .then(json => setData(json))

    }, [id])
    
    return (
        <div>
            {id} – {data.text}
        </div>
    )
}

export default MessageBoard
