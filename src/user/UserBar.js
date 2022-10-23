import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";

// UserBar handles the logic on whether to display the Logout component or the Login/Register Components
// UserBar = Parent Components ; Logout/Login/Register = Child Components
// Need to pass 'dispatchUser' as a prop to Child components so that it can update the state in the Parent Component
export default function UserBar({ user, dispatch }) {
  // If user has value (not empty string)
  if (user) {
    // Render user with Logout button
    return <Logout user={user} dispatch={dispatch} />;
  }
  // If user is empty string
  else {
    return (
      // Render Login and Register components
      <>
        <Login dispatch={dispatch} />
        <Register dispatch={dispatch} />
      </>
    );
  }
}
