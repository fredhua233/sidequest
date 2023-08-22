import {React, useState, useEffect } from 'react';
import { uploadImage } from '../util/firebase';
import { useNavigate } from 'react-router-dom';

//TODO: 
// 1. Fix page so that it only shows up when user enters from challenges/login page

function InGame() {
    const navigate = useNavigate();
    const [file, setFile] = useState();

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
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
    }  

    function handleTimerEnd(){
        clearInterval();
    }

    async function handleUpload(e){

        if(Date.now() > localStorage.getItem("expireTime")){
            alert("You can no longer submit a screenshot. Try again next time!");
            localStorage.setItem("ingame", false);
            navigate("/");
            return;
        } else if(file === undefined){
            alert("Please upload a screenshot.");
            return;
        } else {
            await uploadImage(localStorage.getItem("username"), file);
            localStorage.setItem("ingame", false);
            alert("Submitted! Try a new challenge");
            navigate("/");
        }


    }

      return (  
        <div className = "body">
            <Timer onTimerEnd={handleTimerEnd} />
            <div className="row">
              <input className = "fileUpload" type="file" accept="image/*" onChange={handleImage}/>
            </div>
            <div className="row">
      
              <button className = "submit" id = "submitScreenshot" onClick = {handleUpload}>Submit</button>
            </div>
        </div>
      );
      
}
export default InGame;