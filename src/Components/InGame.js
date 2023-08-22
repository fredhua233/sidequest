import {React, useState, useEffect } from 'react';
import { uploadImage } from '../util/firebase';
import { useNavigate } from 'react-router-dom';

//TODO: 
// 1. Fix page so that it only shows up when user enters from challenges/login page

function InGame() {
    const navigate = useNavigate();
    const [file, setFile] = useState();
    const [fileUp, setFileUp] = useState();

    const Timer = ({ onTimerEnd }) => {
        
        const [remainingTime, setRemainingTime] = useState(3600);

        useEffect(() => {
          const interval = setInterval(() => {
            const currentTime = new Date().getTime();
            if(localStorage.getItem("expireTime") === null){
              localStorage.setItem("expireTime", currentTime + remainingTime * 1000);
            }
            const expirationTime = localStorage.getItem("expireTime");
            const timeDifference = expirationTime - currentTime;
      
            if (timeDifference <= 0) {
              setRemainingTime(0);
              clearInterval(interval);
            } else {
              const remainingSeconds = Math.floor(timeDifference / 1000);
              setRemainingTime(remainingSeconds);
            }
          }, 1000);
      
          return () => clearInterval(interval);
        }, [remainingTime]);

        const hours = Math.floor(remainingTime / 3600);
        const minutes = Math.floor((remainingTime % 3600) / 60);
        const seconds = remainingTime % 60;
    
      
        return (
          <div>
                  {remainingTime <= 0 
                  ?
                  (<h1 className="title">Times up!</h1>)
                  : 
                  (
                    <h1 className= "title">
                    Submit your match history in: 
                    {` ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
                  </h1>
                  )
                  }
          </div>
        ); 
    };

    function handleImage(e) {
        
      const image = e.target.files;
      console.log(e.target.files);
      if (image){
        setFile(URL.createObjectURL(e.target.files[0]));
        setFileUp(e.target.files[0])
        document.getElementById("up").removeAttribute("hidden");
      }
      
    }  
    
    async function handleUpload(e){

        if(Date.now() > localStorage.getItem("expireTime")){
            alert("You can no longer submit a screenshot. Try again next time!");
            localStorage.setItem("ingame", false);
            navigate("/");
            return;
        } 
        if(localStorage.getItem("expireTime") === null || localStorage.getItem("ingame") === false){
            alert("Please enter a challenge!");
            localStorage.setItem("ingame", false);
            navigate("/");
            return;
        } //this is not working, user can refresh page and reupload screenshot
        
        else if(file === undefined){
            alert("Please upload a screenshot.");
            return;
        } else {
            await uploadImage(localStorage.getItem("username"), fileUp);
            localStorage.setItem("ingame", false);
            localStorage.removeItem("expireTime");
            alert("Submitted! Try a new challenge");
            navigate("/");
        }
    }

    function handleTimerEnd(){
        clearInterval();
    }

//     const handleTimerEnd = () => {
//         valid = false; // set to false when timer ends, so that the user cannot submit a screenshot
//         console.log('Timer ended!');
//         //add upload to firebase storage function here
//     };

      return (  
        <div className = "body">
            <Timer onTimerEnd={handleTimerEnd} />
            <div className="row">
              <input className = "fileUpload" type="file" accept="image/*" onChange={handleImage}/>
            </div>
            <img id = "up" alt = "" class = "uploadedImage" src = {file} hidden/>
            <div className="row">
              <button className = "submit" id = "submitScreenshot" onClick = {handleUpload}>Submit</button>
            </div>
        </div>
      );
      
}
export default InGame;