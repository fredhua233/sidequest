import React from 'react';


function Login() {
    function handleGoogleSignIn(){
        alert("Fuck you jacob");
    }
    return (
        <div>
          <h1>Login</h1>
        <select name = 'games' id = 'gameChoice'>
          <option value="Fortnite">Fortnite</option>
          <option value="NFL Madden">NFL Madden23</option>
          <option value="FIFA">FIFA 23</option>
          <option value="Rocket League">Rocket League</option>
          <option value = "UFC"> UFC </option>
          <option value = "NBA 2K">NBA 2K</option>
        </select>
        <input type = 'text' placeholder='Username' id = 'user' required></input>
        <button onClick = {handleGoogleSignIn}> Google Sign In</button>
        </div>
      );
  }



export default Login;