import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {addUser} from "../util/firebase.js";

function Login() {
    const navigate = useNavigate();
    const game = useLocation().state.game;

    async function handlePSNSignIn(){
      console.log(document.getElementById("username").value);
      console.log(document.getElementById("consoleChoice").value);
      console.log(game.toString());
      await addUser(document.getElementById("username").value, document.getElementById("consoleChoice").value, game);
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
            <input type = 'text' placeholder='Username' class = 'user' id = "username" required></input>
            <button class = "submit" onClick = {handlePSNSignIn}>Login</button>
            <h2 class = "description" id = "description"> </h2>
        </div>
      );
  }



export default Login;