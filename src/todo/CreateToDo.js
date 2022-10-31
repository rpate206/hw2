import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { StateContext } from "../Contexts/StateContext";

export default function CreateToDo() {
  // stateHook for Title entered by user
  const [title, setTitle] = useState("");

  // stateHook for Description entered by user
  const [description, setDescription] = useState("");

  // destructure state and dispatch from StateContext
  const { state, dispatch } = useContext(StateContext);

  // destructure user from state
  const { user } = state;

  // handler function for title input
  function handleTitle(event) {
    setTitle(event.target.value);
  }

  // handler fuNCtion for description input
  function handleDescription(event) {
    setDescription(event.target.value);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({
          type: "CREATE_TODO",
          title,
          description,
          author: user,
          dateCreated: new Date().toString(),
          completed: false,
          dateCompleted: "",
          id: uuidv4(),
        });
      }}
    >
      <br />
      <br />
      <div>
        Author: <b>{user}</b>
      </div>
      <br />
      <div>
        <label htmlFor="create-title">Title:</label>
        <input
          type="text"
          value={title}
          onChange={handleTitle}
          name="create-title"
          id="create-title"
        />
      </div>
      <br />
      <div>
        <label htmlFor="create-description">Description:</label>
        <input
          type="text"
          value={description}
          onChange={handleDescription}
          name="create-description"
          id="create-description"
        />
      </div>
      <br />

      <input type="submit" value="Create" disabled={title.length === 0} />
      <br />
      <br />
    </form>
  );
}
