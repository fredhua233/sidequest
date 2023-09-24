import { Fragment, useState} from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
// import Login from './Login.js';
import Navbar from './Navbar.js';
import Typewriter from 'typewriter-effect';
import EnterStats from './EnterStats.js';
import CurrentRooms from './CurrentRooms.js';


export default function Home() {
  //change tagline to clearer: Money solution for x games?
  return (
    <>
      <div>
        <Navbar></Navbar>
        <main className="bg-stone-950 shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center grid grid-row-2 gap-4">
              <div className = "text-center text-gray-50 text-2xl font-bold" id = "title">
                Easily host{<Typewriter
                options={{
                  strings: ["FIFA", "Poker", "Fantasy League", "Super Smash Bros", "Mario Kart"],
                  autoStart: true,
                  delay: 125,
                  pauseFor: 2000,
                  loop: true,
                }}
              />} tournaments
              </div> 
              <div className = "flex justify-center items-center text-center text-gray-300 text-m font-bold">
                One place for brackets, buy-ins, and payouts
              </div>
            </div>
            <div className="grid grid-row-2 gap-4">
            <EnterStats ></EnterStats>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}