import { useState } from 'react'
import UserBar from "./user/UserBar";
import ToDoList from "./todo/ToDoList"
import CreateToDo from "./todo/CreateToDo"

function App() {


  // create state hook for user
  const [ user, setUser ] = useState('')

  // create state hook for to do list
  const [ ListToDo, setListToDo ] = useState([])

  return (
    // Need parent JSX component when trying to render more than 1 component (UserBar & PostList)
    // Need to wrap components in a div tag
    <div>
      <UserBar user={user} setUser={setUser}/>
      {user && <CreateToDo user={user} ListToDo={ListToDo} setListToDo={setListToDo}/>}
      <ToDoList ListToDo={ListToDo} />
    </div>
  )
}

export default App;
