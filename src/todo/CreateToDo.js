import { useState } from "react"

export default function CreateToDo ({user, ListToDo, setListToDo}) {
    
    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')

    function handleTitle(event) {
        setTitle(event.target.value)
    }

    function handleDescription(event) {
        setDescription(event.target.value)
    }
    
    return (
         <form onSubmit={e => {
            e.preventDefault(); 
            // create new ToDoItem
            const newToDoItem = {
                title, 
                description, 
                author: user, 
                dateCreated: new Date().toString(), 
                completed: false, 
                dateCompleted: "", 
            }

            // pre-pend the new ToDoItem to the front of the current ListToDo (To Do List array)
            setListToDo([...ListToDo, newToDoItem])
        }}>
            <br />
            <br />
            <div>Author: <b>{user}</b></div>
            <br />
            <div>
                <label htmlFor="create-title">Title:</label>
                <input type="text" value={title} onChange={handleTitle} name="create-title" id="create-title" />
            </div>
            <br />
            <div>
                <label htmlFor="create-description">Description:</label>
                <input type="text" value={description} onChange={handleDescription} name="create-description" id="create-description" />
            </div>
            <br />
            
            <input type="submit" value="Create" disabled={title.length === 0}/>
            <br />
            <br />
        </form>
    )
}