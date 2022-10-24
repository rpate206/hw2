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

  return (
    <div>
      <h3>{title}</h3>
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
    </div>
  );
}
