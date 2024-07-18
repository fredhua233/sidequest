import React, {useMediaQuery, useState, useEffect, useRef} from "react";
import Navbar from './Navbar.js';
import {app, db, userAddWin, userLose, addUser, getRoom, addWinnersToNextRound, winnerToNextRound} from "../util/firebase.js";
import {onSnapshot, doc, collection, query, getDocs} from "firebase/firestore"

export default function Lobby() {
    const [roomName, setRoomName] = useState(localStorage.getItem("room"));
    const [name, setName] = useState(localStorage.getItem("username"));
    const isHost = localStorage.getItem('admin');
    const [ingame, setInGame] = useState(false);
    const [users, setUsers] = useState([]);
    const [rounds, setRounds] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth);

    console.log("b4 admin" + localStorage.getItem("admin"));
    if(!localStorage.getItem("admin")){
        console.log("admin is "+localStorage.getItem("admin"));
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(`Join ${name}'s FIFA tournament at https://sidequest-bet.vercel.app/join/${roomName}`);
    }
    
    async function toggleInGame() {
        if(!localStorage.getItem("admin")){
            alert("Please wait for host to start!");
            return;
        }
        for (let i = 0; i < users.length; i++) {
            if (!users[i].paid) {
                alert("Not everyone has paid!");
                return;
            }
        }
        setRounds(rounds+1);
        setInGame(true);
        await addWinnersToNextRound(roomName, rounds, users);
        console.log("startGame" + ingame);
    }
    
    
    function WaitingRoom(props){ // this is the content for the page when waiting for people to join
        return (
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-center items-center">
                <button
                  id="copy-button"
                  type="button"
                  onClick={copyToClipboard}
                  class="inline-flex items-center py-2 px-12 rounded-xl bg-stone-950 hover:bg-stone-850 active:bg-stone-800 text-2l font-bold text-amber-400 border-2 border-stone-600 outline-none focus:ring focus:border-transparent focus:text-green-600">
                    <svg class="w-4 h-4 ml-1.5 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>
                    Invite your friends!
                </button>

                <div className="container mx-auto mt-8" id="userList">
    <ul className = "flex min-h-full flex-1 flex-col justify-center">
        {users.map((user, index) => {
        const ready = user.paid ? "✅" : "❌";
        return <li key={user.id} className="flex flex-row justify-between bg-stone-800">
            <div className = "block max-w-sm p-2 bg-stone-800 text-2l text-start font-bold tracking-tight text-slate-100">
            {ready + "  " + user.name}
            </div>
            <div className = "block max-w-sm p-2 bg-stone-800 text-2l text-start tracking-tight text-slate-300">
            {user.venmo}
            </div>
            </li>
        })}
    </ul>
    </div>
    <button className = "fixed bottom-10 inline-flex items-center py-2 px-12 rounded-xl font-semibold shadow-sm text-stone-950 bg-amber-400 hover:bg-amber-500"
            id = "startButton"
                        onClick={toggleInGame}
                        >
                            Start Game
                        </button>

            </div>
            <div>

            </div>
        </div>
        );
    }


    function Brackets(props){
        
        // this is the content for the page when the game is in progress
            const [initUsers, setInitUsers] = useState([]);
            const [winners, setWinners] = useState([]);
            const [end, setEnd] = useState(false);
        
            function MatchBracket(a, b, roomName){
                //component to display a match between two users
            
                return (
                    <div class="flex justify-center">
              <button class="border border-transparent focus:border-amber-400 rounded-l-lg px-8 py-2 w-full bg-stone-800 hover:bg-stone-600 text-stone-50"

                onClick={() => {
                    setWinners(oldArray => [...oldArray, a]);
                    console.log("pushed to winners " + a.name);
                }}
              >
                {a.name}
              </button>
              <h1 class="px-4 py-2 bg-stone-800 text-stone-50 font-semibold">
                VS.
              </h1>
              <button class="border border-transparent focus:border-amber-400 rounded-r-lg px-8 py-2 w-full bg-stone-800 hover:bg-stone-600 text-stone-50"
                onClick={() => {
                    setWinners(oldArray => [...oldArray, b]);
                    console.log("pushed to winners " + b.name);
                }}
                // onClick={setWinners(oldArray => [...oldArray, a])}
              >
                {b.name}
              </button>
            </div>
                );
            }
            
            useEffect(() => { //scratch users collection, use each round as collection of users
                const fetchDocuments = async () => {
                    const roundminus1 = rounds - 1;
                    console.log("rounds minus 1 is " + roundminus1)
                    const collectionName = collection(doc(db, "rooms", roomName), `round${roundminus1}`);
                    try {
                      const querySnapshot = await getDocs(collectionName);
                      const fetchedDocuments = [];
                      if(querySnapshot.length < 1 ){
                        setEnd(true);
                        console.log("game has ended" + end);
                      }
                      querySnapshot.forEach((doc) => {
                        // Add each document's data to the array
                        fetchedDocuments.push({...doc.data()});
                      });
                      // Set the state with the fetched documents
                      setInitUsers(fetchedDocuments);
                    } catch (error) {
                      console.error('Error fetching documents: ', error);
                    }
                  };
                  fetchDocuments();
            }, []);

            
            //add back button to go back to waiting room
            return (
                <div className="mx-auto max-w-10xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex flex-col justify-center items-center">
                    <div>
                        <h1 className = "text-center text-gray-50 text-2xl font-bold">Round {rounds}:</h1>
                    </div>
    
                    <div className="container mx-auto mt-8" id="userList">
                    <ul className="flex min-h-full flex-1 flex-col justify-center gap-4">
                        {

                            initUsers.map((user, index, arr) => {
                                if(initUsers.length === 1 && end){
                                    

                                    alert(`${initUsers[0].name} has won! Their venmo username is ${initUsers[0].venmo}`);
                                    window.location.href = `venmo://users/${initUsers[0].venmo}`;
                                    return (
                                        <div>
                                            <span>
                                            ${initUsers[0].name} has won!
                                            </span>
                                            <br></br>
                                            <button onClick={window.location.href = `venmo://users/${initUsers[0].venmo}`}>
                                                Venmo {initUsers[0].venmo}
                                            </button>
                                        </div>
                                    );
                                }
                                if (index % 2 === 0) {
                                    // Get two elements at a time and perform some operation
                                    const firstElement = user;
                                    const secondElement = arr[index + 1];
                                     // Get the next element
                                    console.log("inside brackets" + user.name)
                                    if (secondElement !== undefined) {
                                      // Check if there's a next element
                                      return MatchBracket(firstElement, secondElement, roomName) // Return as an array of two elements
                                    }
                                } 
                            })
                        }

                    </ul>
                </div>
                
                    
                    <button className = "fixed bottom-10 inline-flex items-center py-2 px-12 rounded-xl font-semibold shadow-sm text-stone-950 bg-amber-400 hover:bg-amber-500"
                    id="nextRoundButton"
                    onClick={async () => {
                        
                        if(!localStorage.getItem("admin")){
                            alert("Please wait for host to start!");
                            return;
                        }
                        if(initUsers.length <= 1){
                            setEnd(true);
                            alert(`${initUsers[0].name} has won! Their venmo username is ${initUsers[0].venmo}`);
                            if (isMobile <= 768){ 
                                window.location = `venmo://users/${initUsers[0].venmo}`;
                            } else {
                                window.location= `https://account.venmo.com/u/${initUsers[0].venmo}/`;
                            }
                        }
                        console.log("initUsers length " + initUsers.length);
                        if(initUsers.length%2 === 1){
                           const newArr = [initUsers.pop(), ...winners];
                           console.log(newArr.length);
                           await addWinnersToNextRound(roomName, rounds, newArr);
                           setRounds(rounds+1);
                        } else {
                            await addWinnersToNextRound(roomName, rounds, winners);
                            setRounds(rounds+1);
                        }
                    }}
                    >
                        Next Round
                    </button>
    
                </div>
                <div>
    
                </div>
            </div>
                //pairs of buttons as pairs of users
                //select one of users to be winner, update to db
                //submit button to update db and rerender only winners
            );
    }

    useEffect(() => {
        const q = query(collection(doc(db, "rooms", roomName), "users"));
        const unsubscribe = onSnapshot(q, (snap) => {
            const tempUsers = [];
            snap.forEach((doc) => {
                tempUsers.push(doc.data());
                
            });
            setUsers(tempUsers);
        }
        );
        return () => unsubscribe()
    }, []);

    return (
        <>
        <div>
            <Navbar></Navbar>
            <main className="bg-stone-950 shadow flex min-h-full flex-1 flex-col justify-center">
                {!ingame ? <WaitingRoom toggleBool={toggleInGame} ></WaitingRoom> : <Brackets></Brackets>}
            </main>
        </div>
        </>
        
    )
}
