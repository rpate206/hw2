import ToDoItem from "./ToDoItem";

export default function ToDoList({ ListToDo = [], dispatch }) {
  // ToDoList is accepting a list of ToDoItems (ToDoList array) as a prop
  // Then iterating over that 'ToDoList' array and creating ToDo Components dynamically
  return (
    // Every ToDo object has properties
    // Using 'Spread' operator : {...t} -- spreading every ToDo property as an attribute on the ToDo
    //      Can explicitly write out the properties instead of using Spread Operator, but this isn't efficient for lots of properties
    // Key = database identifier (primary key) for each element in the list
    <div>
      {ListToDo.map((t) => (
        <ToDoItem {...t} dispatch={dispatch} key={t.id} />
      ))}
    </div>
  );
}
