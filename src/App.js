import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Challenges from './Components/Challenges'
function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Challenges/>}/>
          <Route exact path="/login" element={<Login/>}/>
        </Routes>
    </Router>
  );
}

export default App;
