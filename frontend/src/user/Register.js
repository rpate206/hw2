import { useState, useContext } from "react";
import { StateContext } from "../Contexts/StateContext";

export default function Register() {
  // new State Hook : handles username input
  const [username, setUsername] = useState("");

  // new State Hook : handles password input
  const [password, setPassword] = useState("");

  // new State Hook : handles passwordRepeat input
  const [passwordRepeat, setPasswordRepeat] = useState("");

  // destructure 'dispatch' from StateContext
  const { dispatch } = useContext(StateContext);

  function handleUsername(event) {
    setUsername(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  function handlePasswordRepeat(event) {
    setPasswordRepeat(event.target.value);
  }

  return (
    // preventDefault stops page from refreshing when Register button is clicked
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "REGISTER", username });
      }}
    >
      <label htmlFor="register-username">Username:</label>
      <input
        type="text"
        value={username}
        onChange={handleUsername}
        name="register-username"
        id="register-username"
      />
      <label htmlFor="register-password">Password:</label>
      <input
        type="password"
        value={password}
        onChange={handlePassword}
        name="register-password"
        id="register-password"
      />
      <label htmlFor="register-password-repeat">Repeat password:</label>
      <input
        type="password"
        value={passwordRepeat}
        onChange={handlePasswordRepeat}
        name="register-password-repeat"
        id="register-password-repeat"
      />
      <input
        type="submit"
        value="Register"
        disabled={
          username.length === 0 ||
          password.length === 0 ||
          password !== passwordRepeat
        }
      />
    </form>
  );
}
