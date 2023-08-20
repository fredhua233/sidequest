import {React, useState, useEffect } from 'react';

function InGame() {
    var valid = true;
    const [file, setFile] = useState();
    
    const Timer = ({ onTimerEnd }) => {
        const [seconds, setSeconds] = useState(59);
        const [minutes, setMinutes] = useState(59);
        const [hours, setHours] = useState(0);
      
        useEffect(() => {
          const interval = setInterval(() => {
            if (seconds === 0 && minutes === 0 && hours === 0) {
              clearInterval(interval);
              onTimerEnd();
            } else if (seconds === 0 && minutes === 0) {
              setHours(hours - 1);
              setMinutes(59);
              setSeconds(59);
            } else if (seconds === 0) {
              setMinutes(minutes - 1);
              setSeconds(59);
            } else {
              setSeconds(seconds - 1);
            }
          }, 1000);
          
        //   const interval = setInterval(() => {
        //     if (seconds === 0 && minutes === 0) {
        //       clearInterval(interval);
        //       onTimerEnd();
        //     } else if (seconds === 0) {
        //       setMinutes(minutes - 1);
        //       setSeconds(59);
        //     } else {
        //       setSeconds(seconds - 1);
        //     }
        //   }, 1000);

          return () => clearInterval(interval);
        }, [seconds, minutes, hours, onTimerEnd]);
      
        return (
          <div>
            <h1 class = "title">
                {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
            </h1>
          </div>
        );
    };

    function handleImage(e) {
      const image = e.target.files;
      console.log(e.target.files);
      if (image){
        setFile(URL.createObjectURL(e.target.files[0]));
        document.getElementById("up").removeAttribute("hidden");
      }
      
    };  
      
    const handleTimerEnd = () => {
        valid = false; // set to false when timer ends, so that the user cannot submit a screenshot
        console.log('Timer ended!');
        //add upload to firebase storage function here
    };
    
      return (
        <div>
          <div class = "card">
              <h1 class = "title">Countdown Timer</h1>
              <Timer onTimerEnd={handleTimerEnd} />
              <h2 class = "description">Add Image:</h2>
              <input class ="fileSubmit" type="file" onChange={handleImage} />
              <br></br>
              <input type= "submit" value="Submit Photo"/>
          </div>
        <img id = "up" class = "uploadedImage" src = {file} hidden/>
        </div>
      );
      
}
export default InGame;