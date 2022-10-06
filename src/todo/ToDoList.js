import ToDoItem from './ToDoItem'

export default function ToDoList ({ListToDo = []}) {
    // ToDoList is accepting a list of ToDoItems (ToDoList array) as a prop
    // Then iterating over that 'ToDoList' array and creating ToDo Components dynamically
    return (
        // Every ToDo object has properties
        // Using 'Spread' operator : {...t} -- spreading every ToDo property as an attribute on the ToDo
        //      Can explicitly write out the properties instead of using Spread Operator, but this isn't efficient for lots of properties
        <div>
            {ListToDo.map((t, i) => <ToDoItem {...t} key={'todo-' + i} />)}
        </div>
    )
}
