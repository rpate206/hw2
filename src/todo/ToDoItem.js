import { ThemeContext } from "../contexts";
import { useContext } from "react";

export default function ToDoItem({
  title,
  description,
  author,
  dateCreated,
  completed,
  dateCompleted,
  id,
  dispatch,
}) {
  function handleComplete(event) {
    dispatch({ type: "TOGGLE_TODO", id });
  }

  // destructure 'secondaryColor' from ThemeContext
  const { secondaryColor } = useContext(ThemeContext);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({
          type: "DELETE_TODO",
          id,
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
