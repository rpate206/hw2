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

    case "DELETE_TODO":
      const copyDeleteState = state.filter((element) => {
        return element.id !== action.id;
      });

      return copyDeleteState;
    case "FETCH_TODOS":
      return action.todoList;

    default:
      return state;
  }
}

export default function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    ListToDo: todoReducer(state.ListToDo, action),
  };
}
