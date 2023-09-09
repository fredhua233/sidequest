import React, {useState, useEffect, useRef} from "react";
import {useNavigate} from 'react-router-dom';
import { openRooms } from "../util/firebase.js";


export default function CurrentRooms() {
    const navigate = useNavigate();

    var rooms = useRef([]);
    const [roomList, setRoomList] = useState([]);
    
    useEffect(() => {
        const getRooms = async () => {
            rooms.current = await openRooms();
            setRoomList(...[rooms.current]);
            console.log(roomList.map(element => element.roomName));
        };
        getRooms();
    }, []);

    async function onJoinRoom(event, roomName){
        event.preventDefault();
        localStorage.setItem("lobby", roomName);
        navigate("/lobby");
    }

    return (
        <div className = "container mx-auto mt-8">
            <h1 className="text-2xl text-start font-bold tracking-tight text-slate-100">Open Challenges:</h1>
            <div className="container mx-auto mt-8 space-y-5">
                {roomList.map(element => (
                <div className="p-4 rounded shadow-md bg-blue-400 hover:bg-gray-100 transition flow-root">
                    <div className="grid grid-row-2 float-left">
                    <span className="font-bold text-3l">{element.roomName}</span>
                    <span className="text-2l">Prize: ${element.prize}</span>
                    </div>
                    <button 
                    className="border bg-blue-400 hover:bg-green-500 text-white border-white font-bold py-3 px-6 rounded float-right"
                    onClick={(e) => onJoinRoom(e, element.roomName)}
                    >Join</button>
                </div>

                ))}

            </div>
        </div>
    );
}