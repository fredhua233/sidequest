import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {addUser, getUser} from "../util/firebase.js";

function Login() {
    const navigate = useNavigate();
    const game = useLocation().state.game;

    async function handlePSNSignIn(){
      // await addUser(document.getElementById("username").value, document.getElementById("consoleChoice").value, game);
      // ^firestore func to add user to db
      // await getUser("kms");
      // ^firestore func to get user from db
      navigate("/ingame");
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
            <button class = "submit" onClick = {handlePSNSignIn}>Start Now!</button>
            <h2 class = "description" id = "description"> </h2>
        </div>
      );
  }



export default Login;