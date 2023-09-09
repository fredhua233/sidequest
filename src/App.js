import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Challenges from './Components/Challenges'
import InGame from './Components/InGame';
import EnterStats from './Components/EnterStats';
import Home from './Components/Home';
import Lobby from './Components/Lobby';
import UserJoin from './Components/UserJoin';

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/challenges" element={<Challenges/>}/>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/profile" element={<Profile/>}/>
          <Route exact path="/ingame" element={<InGame/>}/>
          <Route path="/lobby/:id" element={<Lobby/>}/>
          <Route path="/join/:id" element = {<UserJoin/>}/>
          <Route exact path="/enterstats" element={<EnterStats/>}/>
        </Routes>
    </Router>
  );
}

export default App;
