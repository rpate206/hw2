import React from "react";

import Login from "./Login";

//import Logout from "./Logout";

import Register from "./Register";

import { StateContext } from "../Contexts/StateContext";
import { useContext } from "react";

// lazy load the logout component since it's not needed on website load
const Logout = React.lazy(() => import("./Logout"));

// UserBar handles the logic on whether to display the Logout component or the Login/Register Components
// UserBar = Parent Components ; Logout/Login/Register = Child Components
export default function UserBar() {
  // destructure state from StateContext
  const { state } = useContext(StateContext);

  // If user has value (not empty string)
  if (state.user) {
    // Render user with Logout button
    return <Logout />;
  }
  // If user is empty string
  else {
    return (
      // Render Login and Register components
      <>
        <Login />
        <Register />
      </>
    );
  }
}
