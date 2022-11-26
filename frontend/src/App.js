import { useReducer, useEffect, useState } from "react";
import UserBar from "./user/UserBar";
import ToDoList from "./todo/ToDoList";
import CreateToDo from "./todo/CreateToDo";
import Header from "./Header";
import { ThemeContext } from "./Contexts/ThemeContext";
import { StateContext } from "./Contexts/StateContext";
import ChangeTheme from "./Components/Theme/ChangeTheme";
import { useResource } from "react-request-hook";
import React from "react";

import appReducer from "./reducers";

// import appReducter from reducer.js file
// import userReducer from "./reducers";
// import todoReducer from "./reducers";

function App() {
  // create state hook for user
  //const [ user, setUser ] = useState('')

  // create state hook for to do list
  //const [ ListToDo, setListToDo ] = useState([])

  // create reducerHook for user : initialState for user = empty string
  //const [user, dispatchUser] = useReducer(userReducer, "");

  // create reducerHook for posts : initialState for posts =
  //const [ListToDo, dispatchToDos] = useReducer(todoReducer, []);

  //Replace user & ListToDo state hooks with single reducerHook :
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    ListToDo: [],
  });

  // if there is a value for 'user', title will be ' user's Blog', else (no value for user) title will be 'Blog'
  useEffect(() => {
    if (state.user) {
      document.title = `${state.user}’s To Do List`;
    } else {
      document.title = "To Do List";
    }
  }, [state.user]);

  // state hook to dynamically change the theme
  const [theme, setTheme] = useState({
    primaryColor: "deepskyblue",
    secondaryColor: "coral",
  });

  // // issuing Fetch request for themes
  // useEffect(() => {
  //   fetch("/api/themes")
  //     .then((result) => result.json())
  //     .then((themes) => setTheme(themes));
  // }, []);

  // // issuing Fetch request for Todos
  // useEffect(() => {
  //   fetch("/api/todoList")
  //     .then((result) => result.json())
  //     .then((todoList) => dispatch({ type: "FETCH_TODOS", todoList }));
  // }, []);

  // define Resource hook for requesting TodoList -- get all posts regardless of author
  // const [todoList, getToDoList] = useResource(() => ({
  //   url: "/todoList",
  //   method: "get",
  // }));

  // define Resource hook for requesting TodoList -- get posts authored by signed in user
  const [todoList, getToDoList] = useResource(() => ({
    url: "/todos",
    method: "get",
    headers: { Authorization: `${state?.user?.access_token}` },
  }));

  // Effect hook for requesting todoList when App component loads -- invoke when user signs in (user object changes)
  useEffect(() => {
    if (state?.user?.access_token) {
      getToDoList();
    } else {
      dispatch({ type: "CLEAR_TODOS" });
    }
  }, [state?.user?.access_token]);

  // Effect hook for requesting todoList when todoList variable is updated -- updated useEffect to only dispatch once
  useEffect(() => {
    if (todoList && todoList.isLoading === false && todoList.data) {
      dispatch({
        type: "FETCH_TODOS",
        todoList: todoList.data.todoList.reverse(),
      });
    }
  }, [todoList]);

  return (
    // Need parent JSX component when trying to render more than 1 component (UserBar & ToDoList)
    // Need to wrap components in a div tag
    // Can only create todo if user is not false or not an empty string : only render CreatToDo when user is logged in
    // UserBar : pass in dispatchUser function
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
        <ThemeContext.Provider value={theme}>
          <Header title="My To Do List" />
          <ChangeTheme theme={theme} setTheme={setTheme} />
          <React.Suspense fallback={"Loading..."}>
            <UserBar />
          </React.Suspense>
          {state.user && <CreateToDo />}
          <ToDoList />
        </ThemeContext.Provider>
      </StateContext.Provider>
    </div>
  );
}

export default App;
