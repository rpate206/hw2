import { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { StateContext } from "../Contexts/StateContext";
import { useResource } from "react-request-hook";

export default function CreateToDo() {
  // stateHook for Title entered by user
  const [title, setTitle] = useState("");

  // stateHook for Description entered by user
  const [description, setDescription] = useState("");

  // destructure state and dispatch from StateContext
  const { state, dispatch } = useContext(StateContext);

  // destructure user from state
  const { user } = state;

  // define Resource hook for created post : destructure ‘title’, ‘content’, ‘author’ fields for ‘data’  to use. Resource hook will take ‘data’ and post it to server as json
  // 'createPost' should be invoked when user clicks 'Create' button
  const [post, createPost] = useResource(
    ({
      title,
      description,
      author,
      dateCreated,
      completed,
      dateCompleted,
    }) => ({
      url: "/todoList",
      method: "post",
      data: {
        title,
        description,
        author,
        dateCreated,
        completed,
        dateCompleted,
      },
    })
  );

  // handler function for title input
  function handleTitle(event) {
    setTitle(event.target.value);
  }

  // handler function for description input
  function handleDescription(event) {
    setDescription(event.target.value);
  }

  // use useEffect hook to check for server errors when Todo is created
  useEffect(() => {
    // verify each object exists when trying to find error message; won't throw exception is one of the objects isn't defined
    if (post?.data?.error) {
      alert(post.data.error.code);
    }
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        createPost({
          title,
          description,
          author: user,
          dateCreated: new Date().toString(),
          completed: false,
          dateCompleted: "",
        });
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
