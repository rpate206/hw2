import Login from './Login'
import Logout from './Logout'
import Register from './Register'

export default function UserBar({user, setUser}) {
    
    // If user has value (not empty string)
    if (user) { 
        // Render user with Logout button
        return <Logout user={user} setUser={setUser} /> 
    } 
    // If user is empty string 
    else {
        return (
            // Render Login and Register components
            <>
              <Login setUser={setUser}/>
              <Register setUser={setUser}/>
            </>
        )
    }
}