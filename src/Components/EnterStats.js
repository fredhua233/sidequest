import React, {useState, version} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import { makeRoom, addHost } from "../util/firebase";

export default function EnterStats() {
    const navigate = useNavigate();
    var id = useParams();
    const [buyin, setBuyin] = useState(0);
    // const [otherNumber, setOtherNumber] = useState(2);
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [venmo, setVenmo] = useState("");
    const [game, setGame] = useState("FIFA");

    async function handleSubmit(event){
      event.preventDefault();
      if(username === "" || room === ""){
        alert("Please fill out all fields");
        return;
      } else {
        await makeRoom(room, username, venmo, buyin, game);
        await addHost(room, username, true, venmo);
        localStorage.setItem("room", room);
        localStorage.setItem("username", username);
        localStorage.setItem("admin", true);
        id = room;
        navigate(`/lobby/${room}`);
      }
    };
    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <select className="block appearance-none w-full bg-stone-800 text-gray-200 border border-stone-800 hover:border-amber-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                <option>FIFA</option>
                {/* <option>Poker</option> */}
                </select>
              </div>
                <div className="mt-2">
                  <input
                    id="roomName"
                    name="roomName"
                    type="text"
                    placeholder="your best tournament needs a name!"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-200 bg-stone-800 shadow-sm ring-3 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                    onChange = {e => setRoom(e.target.value)} 
                  />
                </div>
              <div>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="hosted by the awesome..."
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-200 bg-stone-800 shadow-sm ring-3 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                    onChange = {e => setUsername(e.target.value)} 
                  />
                </div>
              </div>

              <div>
                <div className="mt-2 flex flex-row gap-4">
                  <input
                    id="buyin"
                    name="buyin"
                    type="number"
                    placeholder="$  buy-in"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-200 bg-stone-800 shadow-sm ring-3 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                    onChange = {e => setBuyin(e.target.value)} 
                  />
                  <input
                    id="venmo"
                    name="venmo"
                    type="text"
                    placeholder="your venmo"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-200 bg-stone-800 shadow-sm ring-3 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                    onChange = {e => setVenmo(e.target.value)} 
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-amber-400 px-3 py-1.5 text-sm font-semibold leading-6 text-stone-950 shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick = {handleSubmit}
                >
                  CREATE
                </button>
              </div>
            </form>

          </div>
        </div>
      </>
    )
  }