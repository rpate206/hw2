// create Reducer Function for user
function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return {
        username: action.username,
        access_token: action.access_token,
      };
    case "LOGOUT":
      return null;
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
        _id: action._id,
      };
      // pre-pend newToDoItem to copy of current ToDoList array
      return [...state, newToDoItem];
    case "TOGGLE_TODO":
      let copyState = state.slice();

      let element = copyState.find((element) => {
        return element._id === action._id;
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
        return element._id !== action._id;
      });

      return copyDeleteState;
    case "FETCH_TODOS":
      return action.todoList;
    // clear user posts locally upon logout
    case "CLEAR_TODOS":
      return [];
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
