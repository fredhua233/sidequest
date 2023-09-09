import {React, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { currentBalance, updateBalance} from '../util/firebase';

function Challenges() {
    localStorage.removeItem("expireTime");
    var [gameDescription, setDescription] = useState("Win 1 game!");
    const navigate = useNavigate();
    localStorage.setItem("ingame", false);


    const handleClick = async() => {
        const username = localStorage.getItem("username");
        console.log(username);

        if(document.getElementById("gameChoice").value === "Rocket League" || document.getElementById("gameChoice").value === "Fortnite"){
            alert("Please try another game.");
        }else {
        if(username === null || username === ""){
            navigate("/login", {state:{game: document.getElementById("gameChoice").value}});
        } else {
            var curBalance = await currentBalance(localStorage.getItem("username"));
            if(curBalance < 500){
                alert("Please recharge your account balance to continue.");
            } else {
                await updateBalance(localStorage.getItem("username"), curBalance - 500); //500 hardcoded entry fee
                localStorage.setItem("ingame", true);
                navigate("/ingame");
            }
        }
    }
    }
    
    function handleGame(event) {
        var game = document.getElementById("gameChoice").value;
        switch (game) {
            case "UFC":
                setDescription("Win 3 games!");
                break;
            case "FIFA":
            case "NBA 2K":
            case "Madden23":
                setDescription("Win 3 games!");
                break;
            case "Rocket League":
            case "Fortnite":
                setDescription("Coming soon...");
                break;
            default: 
                document.getElementById("description").innerHTML = " ";
                break;
        }
    }
    function findPlayers(event) {
        navigate("/enterstats");
    }
    return (
        <h1 class="title">Daily Challenges
            <form class="form1"/>
            <select class = 'Choice' id = "gameChoice" defaultValue = "UFC" onChange = {handleGame}>
            <option value = "UFC"> UFC 4</option>
            <option value = "FIFA">FIFA 23</option>
            <option value = "Madden23">NFL Madden23</option>
            <option value = "NBA 2K">NBA 2K23</option>
            <option value = "Rocket League">Rocket League</option>
            <option value = "Fortnite">Fortnite</option>
            </select>
            <div class = "row">
            <div class = "challenge">
                <h2 class="descriptionBig" id = "description">{gameDescription}</h2>
                <h2 class="description">Time: 60 min</h2>
                <h2 class="description">Stake $5, Win $20</h2>
                <button class = "submit" onClick={handleClick}>I'm in!</button>
             {/* <h2 class="description" id = "description">{gameDescription}</h2>
            
             <div class = "stakes">
                 <h2 class="text">Stake $5</h2>
                 <br></br>
                 <button class = "submit" onClick = {handleClick}>I'm in!</button>
                 <br></br>
                 <br></br>
                 <h2 class="text">Max win: 5x</h2> */}
            </div>
            <div class = "challenge">
                <h2 class="descriptionBig" id = "description">Get to the next division!</h2>
                <h2 class="description">Time: 7 days</h2>
                <h2 class="description">Stake $10, Win $0</h2>
                <button class = "submit" onClick={handleClick}>I'm in!</button>
            </div>
            <div class = "challenge">
                <h2 class="descriptionBig" id = "description">Win by submission!</h2>
                <h2 class="description">Time: 30 min</h2>
                <h2 class="description">Stake $5, Win $20</h2>
                <button class = "submit" onClick={handleClick}>I'm in!</button>
            </div>
            </div>
            <h1 class= "title">Or bet against friends!</h1>
            <button class = "submit" onClick={findPlayers}>Queue up</button>
        </h1>
      );
  }

export default Challenges;
