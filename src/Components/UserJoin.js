import React, {useState, useEffect, useRef} from "react";
import Navbar from './Navbar.js';
import { useNavigate, useParams } from "react-router-dom";
import { addUser, getRoom } from "../util/firebase.js";

export default function UserJoin() {
    //in this page, the user join a room by the id,
    //the user fill in their information and uploads it to the firestore collection according to the id name
    //then the user is redirected to the lobby page where they wait for the tournament to start
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [roomInfo, setRoomInfo] = useState();
    const [username, setUsername] = useState("");
    const [venmo, setVenmo] = useState("");
    
    async function handleSubmit(e){
        e.preventDefault();
        if(username === "" || venmo === ""){
            alert("Please fill out all fields");
            return;
        } else {
            const lobby = localStorage.getItem("room");
            console.log(username);
            console.log(venmo);
            await addUser(id, username, venmo);
            navigate(`/view/${lobby}`);
        }
    }

    useEffect(() => {
        console.log(id);
        localStorage.setItem("room", id);
        localStorage.setItem("admin", false);
        const getRoomInfo = async () =>{
            const temp = await getRoom(id);
            setRoomInfo(temp);
            setLoading(false);
        }
        getRoomInfo();
    }, []);

    return (
        <>
            <div>
            <Navbar></Navbar>
            <main className="bg-stone-950 shadow">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col flex-1 justify-center items-center gap-4">
                <div className = "text-center text-gray-50 text-2xl font-bold" id = "title">
                Join {!loading && roomInfo.roomName}
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="what's your name?"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-200 bg-stone-800 shadow-sm ring-3 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                    onChange = {e => setUsername(e.target.value)} 
                  />
                </div>

                <div className="mt-2">
                  <input
                    id="venmo"
                    name="venmo"
                    type="text"
                    placeholder="what's ur venmo?"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-200 bg-stone-800 shadow-sm ring-3 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                    onChange = {e => setVenmo(e.target.value)} 
                  />
                </div>

                <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-amber-400 px-3 py-1.5 text-sm font-semibold leading-6 text-stone-950 shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick = {handleSubmit}
                >
                  JOIN
                </button>
              </div>
                </form>

                <div className = "text-center text-gray-50 text-l font-semibold">
                Venmo {!loading && roomInfo.venmo} ${!loading && roomInfo.buyin} before joining
                </div>

            </div>
            </div>
            </main>
            </div>
        
        </>
    );
}