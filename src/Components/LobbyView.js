import React, {useState, useEffect, useRef} from "react";
import Navbar from './Navbar.js';

export default function LobbyView(){

    return (
        <>
        <div>
            <Navbar></Navbar>
            <main className="bg-stone-950 shadow flex min-h-full flex-1 flex-col justify-center">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col justify-center items-center">
                        <div className="text-center text-2xl font-bold text-gray-50">
                            That's all we need for now! 
                        </div>
                    </div>
                </div>
            </main>
        </div>
        </>
    );
}