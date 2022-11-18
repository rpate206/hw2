import { useState, useEffect } from "react";
import { useContext } from "react";
import { StateContext } from "../Contexts/StateContext";
import { useResource } from "react-request-hook";

export default function Login() {
  // new State Hook : handles username input
  // Implementing new state hook instead of using 'setUser' because 'setUser' will be used when whole form is filled out
  //        'setUsername' is just for the username component ; may have another state hook for password as well
  const [username, setUsername] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const [password, setPassword] = useState("");

  // get 'dispatch' from StateContext
  const { dispatch } = useContext(StateContext);

  function handleUsername(event) {
    setUsername(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  // Resource hook
  const [user, login] = useResource((username, password) => ({
    url: "/login",
    method: "post",
    data: { email: username, password },
  }));

  // Check if user logged in successfully with useEffect hook
  useEffect(() => {
    // if response from server contains a user object..login successful
    if (user?.data?.user) {
      setLoginFailed(false);
      dispatch({ type: "LOGIN", username: user.data.user.email });
    }
    
    if (user?.error) {
      console.log(user?.error);
      setLoginFailed(true);
    }
    
  }, [user]);

  return (
    <>
      {/* conditional rending for login success/failure */}
      {loginFailed && (
        <span style={{ color: "red" }}>Invalid username or password</span>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login(username, password);
          //dispatch({ type: "LOGIN", username });
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
        <input
          type="password"
          value={password}
          onChange={handlePassword}
          name="login-username"
          id="login-username"
        />
        <input type="submit" value="Login" disabled={username.length === 0} />
      </form>
    </>
  );
}
