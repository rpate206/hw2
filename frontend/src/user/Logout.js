import { useContext } from "react";
import { StateContext } from "../Contexts/StateContext";

export default function Logout() {
  const { state, dispatch } = useContext(StateContext);

  // destructure 'user' out of 'state'
  const { user } = state;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "LOGOUT" });
      }}
    >
      Logged in as: <b>{user.username}</b>
      <input type="submit" value="Logout" />
    </form>
  );
}
