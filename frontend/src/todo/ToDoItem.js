import { ThemeContext } from "../Contexts/ThemeContext";
import { StateContext } from "../Contexts/StateContext";
import { useContext } from "react";
import { useResource } from "react-request-hook";
import React from "react";

function ToDoItem({
  title,
  description,
  author,
  dateCreated,
  completed,
  dateCompleted,
  _id,
}) {
  // Resource hook for Toggle Todo
  const [element, updateElement] = useResource((completed, dateCompleted) => ({
    url: "/todos/" + _id,
    method: "patch",
    headers: { Authorization: `${state.user.access_token}` },
    data: {
      completed,
      dateCompleted,
    },
  }));

  // get dispatch from StateContext
  const { state, dispatch } = useContext(StateContext);

  // destructure user from state
  const { user } = state;

  function handleComplete(event) {
    completed = !completed;
    if (dateCompleted === "") {
      dateCompleted = new Date().toString();
    } else {
      dateCompleted = "";
    }
    updateElement(completed, dateCompleted);
    dispatch({ type: "TOGGLE_TODO", _id });
  }

  // Resource hook for Delete Todo
  const [todo, deleteTodo] = useResource(() => ({
    url: "/todos/" + _id,
    method: "delete",
    headers: { Authorization: `${state.user.access_token}` },
  }));

  // destructure 'secondaryColor' from ThemeContext
  const { secondaryColor } = useContext(ThemeContext);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        deleteTodo();
        dispatch({
          type: "DELETE_TODO",
          _id,
        });
      }}
    >
      <div>
        <h3 style={{ color: secondaryColor }}>{title}</h3>
        <div>{description}</div>
        <br />
        <i>
          Written by <b>{author}</b>
        </i>
        <br />
        <i>
          Date Created : <b>{dateCreated}</b>
        </i>
        <br />
        <input
          type="checkbox"
          onChange={handleComplete}
          checked={completed}
        ></input>
        <i> Complete</i>

        <br />
        <i>
          Date Completed : <b>{dateCompleted}</b>
        </i>
        <br />
        <button type="submit">Delete</button>
      </div>
    </form>
  );
}

export default React.memo(ToDoItem);
