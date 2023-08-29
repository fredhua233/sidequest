import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Challenges from './Components/Challenges'
import InGame from './Components/InGame';
import EnterStats from './Components/EnterStats';
function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Challenges/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/profile" element={<Profile/>}/>
          <Route exact path="/ingame" element={<InGame/>}/>
          <Route exact path="/enterstats" element={<EnterStats/>}/>
        </Routes>
    </Router>
  );
}

export default App;
