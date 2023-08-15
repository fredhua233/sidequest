import React from 'react';

function Login() {
    function handleGoogleSignIn(){
        alert("Fuck you jacob");
    }
    function handleConsole(event) {
      var console = document.getElementById("consoleChoice").value;
      if(console === "Xbox"){
        document.getElementById("description").innerHTML = "Support for Xbox coming soon...";
      } else {
        document.getElementById("description").innerHTML = " ";
      }
    }
    return (
        <div class = "card">
          <h1 class="title">Login</h1>
          <form class = "form1">
          <select class = "Choice" id = "consoleChoice" onChange = {handleConsole}>
            <option value = "PSN">PlayStation</option>
            <option value = "Xbox">Xbox</option>
          </select>
          </form>
            <input type = 'text' placeholder='Username' class = 'user' required></input>
            <button class = "submit" onClick = {handleGoogleSignIn}>Login</button>
            <h2 class = "description" id = "description"> </h2>
        </div>
      );
  }



export default Login;