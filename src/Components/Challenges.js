import React from 'react';
import { useNavigate } from 'react-router-dom';

function Challenges() {
    var gameDescription = "Win 1 game by submission, KO, or decision in the next hour!";
    const navigate = useNavigate();
    function handleClick(event)  {
        navigate("/login")
    }
    function handleGame(event) {
        var game = document.getElementById("gameChoice").value;
        switch (game) {
            case "UFC":
                document.getElementById("description").innerHTML = "Win 1 game by submission, KO, or decision in the next hour!";
                break;
            case "FIFA":
            case "NBA 2K":
            case "Madden23":
                document.getElementById("description").innerHTML = "Win 1 game in the next hour!";
                break;
            case "Rocket League":
            case "Fortnite":
                document.getElementById("description").innerHTML = "Coming soon...";
                break;
            default: 
                gameDescription = "Win 1 game in the next hour!";
        }
    }
    
    return (
        <div class="card">
            <h1 class="title">Daily Challenges</h1>
            <form class="form1"/>
            <select class = 'Choice' id = "gameChoice" onChange = {handleGame}>
            <option value = "UFC"> UFC 4</option>
            <option value = "FIFA">FIFA 23</option>
            <option value = "Madden23">NFL Madden23</option>
            <option value = "NBA 2K">NBA 2K23</option>
            <option value = "Rocket League">Rocket League</option>
            <option value = "Fortnite">Fortnite</option>
            </select>
            <h2 class="description" id = "description">{gameDescription}</h2>
            <div>
                <button class = "submit" onClick = {handleClick}>I'm in!</button>
            </div>
        </div>
      );
  }

export default Challenges;