import { useState, useContext, useEffect } from "react";
import { StateContext } from "../Contexts/StateContext";
import { useResource } from "react-request-hook";

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

  // state hook to keep track of status of register request
  const [status, setStatus] = useState("");

  // create a Resource hook to register new users
  const [user, register] = useResource((username, password) => ({
    url: "/auth/register",
    method: "post",
    data: { username, password, passwordConfirmation: password },
  }));

  // use useEffect hook to take action when user variable changes -- for json server backend
  // useEffect(() => {
  //   if (user && user.data && user.data.user.email) {
  //     dispatch({ type: "REGISTER", username: user.data.user.email });
  //   }
  // }, [user]);

  // use useEffect hook to take action when user variable changes -- for Express backend
  useEffect(() => {
    if (user && user.isLoading === false && (user.data || user.error)) {
      if (user.error) {
        setStatus("Registration failed, please try again later.");
      } else {
        setStatus("Registration successful. You may now login.");
      }
    }
  }, [user]);

  return (
    // preventDefault stops page from refreshing when Register button is clicked
    <form
      onSubmit={(e) => {
        e.preventDefault();
        register(username, password);
        //dispatch({ type: "REGISTER", username });
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
      <p>{status}</p>
    </form>
  );
}
