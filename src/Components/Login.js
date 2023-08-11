import React from 'react';

function Login() {
    function handleGoogleSignIn(){
        alert("Fuck you jacob");
    }
    return (
        <div class = "main">
          <h1 class="sign">Login</h1>
            <form class="form1"/>
            <select class = 'gameChoice'>
            <option value="Fortnite">Fortnite</option>
            <option value="NFL Madden">NFL Madden23</option>
            <option value="FIFA">FIFA 23</option>
            <option value="Rocket League">Rocket League</option>
            <option value = "UFC"> UFC </option>
            <option value = "NBA 2K">NBA 2K</option>
            </select>
            <input type = 'text' placeholder='Username' class = 'user' required></input>
            <button class = "submit" onClick = {handleGoogleSignIn}> Google Sign In</button>
        </div>
      );
  }



export default Login;