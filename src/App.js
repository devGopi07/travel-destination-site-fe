
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Signin from './Components/Signin';
import Add from './Components/Add';
import Home from './Components/Home';
import View from './Components/View';
import { Updated } from './Components/Update';

export const url="https://www.melivecode.com"

function App() {
  return (
    <div className="App">
     
     <Routes>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/add" element={<Add/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/view/:idx" element={<View/>}/>
      <Route path="/update/:idx" element={<Updated/>}/> 
      <Route path="/*" element={<Navigate to="/signin"/>}/> 
     </Routes>

    </div>
  );
}

export default App;
