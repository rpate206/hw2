import { useState } from 'react'

export default function ToDoItem ({ title, description, author, dateCreated, completed, dateCompleted}) {
    const [ complete, setComplete ] = useState(false)
    const [ dateComplete, setDateComplete ] = useState(dateCompleted)

    function handleComplete(event) {
        setComplete(!complete)
        if (event.target.checked) {
            setDateComplete(new Date().toString())
        }
        else {
            setDateComplete("")
        }
        
    }
    


    return (
         <div>
            <h3>{title}</h3>
            <div>{description}</div>
            <br />
            <i>Written by <b>{author}</b></i>
            <br />
            <i>Date Created : <b>{dateCreated}</b></i>
            <br />
            <input type="checkbox" checked={complete} onChange={handleComplete}></input><i> Complete</i>
            
            <br />
            <i>Date Completed : <b>{dateComplete}</b></i>
        </div>
    )
}