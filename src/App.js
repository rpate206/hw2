import { useReducer } from "react";
import UserBar from "./user/UserBar";
import ToDoList from "./todo/ToDoList";
import CreateToDo from "./todo/CreateToDo";

// import appReducter from reducer.js file
// import userReducer from "./reducers";
// import todoReducer from "./reducers";

// create Reducer Function for user
function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return action.username;
    case "LOGOUT":
      return "";
    default:
      return state;
  }
}

// create Reducer Function for posts
function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE_TODO":
      // create new ToDoItem
      const newToDoItem = {
        title: action.title,
        description: action.description,
        author: action.author,
        dateCreated: action.dateCreated,
        completed: action.completed,
        dateCompleted: action.dateCompleted,
        id: action.id,
      };
      // pre-pend newToDoItem to copy of current ToDoList array
      return [...state, newToDoItem];
    case "TOGGLE_TODO":
      let copyState = state.slice();

      let element = copyState.find((element) => {
        return element.id === action.id;
      });

      // update element's DateCompleted
      if (!element.completed) {
        element.completed = true;
        element.dateCompleted = new Date().toString();
      } else {
        element.completed = false;
        element.dateCompleted = "";
      }
      return copyState;

    //case "DELETE_TODO"
    default:
      return state;
  }
}

function App() {
  // create state hook for user
  //const [ user, setUser ] = useState('')

  // create state hook for to do list
  //const [ ListToDo, setListToDo ] = useState([])

  // create reducerHook for user : initialState for user = empty string
  const [user, dispatchUser] = useReducer(userReducer, "");

  // create reducerHook for posts : initialState for posts =
  const [ListToDo, dispatchToDos] = useReducer(todoReducer, []);

  // Replace user & ListToDo state hooks with single reducerHook :
  // const [state, dispatch] = useReducer(appReducer, {
  //   user: "",
  //   ListToDo: [],
  // });

  return (
    // Need parent JSX component when trying to render more than 1 component (UserBar & ToDoList)
    // Need to wrap components in a div tag
    // Can only create todo if user is not false or not an empty string : only render CreatToDo when user is logged in
    // UserBar : pass in dispatchUser function
    <div>
      <UserBar user={user} dispatch={dispatchUser} />
      {user && (
        <CreateToDo user={user} ListToDo={ListToDo} dispatch={dispatchToDos} />
      )}
      <ToDoList ListToDo={ListToDo} dispatch={dispatchToDos} />
    </div>
  );
}

export default App;
