import React from 'react';
import { useState, useEffect } from 'react';
import Main from './Components/Main';
import Header from './Components/Header';
import io from 'socket.io-client';

const socket = io();

function App() {
const [mode, setMode] = useState("home");
  return (
    <div className="App">
    {mode==="home"&&<div className="Home"><button onClick={()=>{setMode("single")}}>Single</button> <button onClick={()=>{setMode("double")}}>double</button></div>}  
    <Header/>
     {mode==="single"&&<Main/>}
    </div>
  );
}

export default App;
