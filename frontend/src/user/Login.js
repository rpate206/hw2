import { useState } from "react";
import { useContext } from "react";
import { StateContext } from "../Contexts/StateContext";

export default function Login() {
  // new State Hook : handles username input
  // Implementing new state hook instead of using 'setUser' because 'setUser' will be used when whole form is filled out
  //        'setUsername' is just for the username component ; may have another state hook for password as well
  const [username, setUsername] = useState("");

  // get 'dispatch' from StateContext
  const { dispatch } = useContext(StateContext);

  function handleUsername(event) {
    setUsername(event.target.value);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN", username });
      }}
    >
      <label htmlFor="login-username">Username:</label>
      <input
        type="text"
        value={username}
        onChange={handleUsername}
        name="login-username"
        id="login-username"
      />
      <label htmlFor="login-password">Password:</label>
      <input type="password" name="login-password" id="login-password" />
      <input type="submit" value="Login" disabled={username.length === 0} />
    </form>
  );
}
