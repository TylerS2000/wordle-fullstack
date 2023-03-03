import React from 'react';
import { useState, useEffect } from 'react';
import Main from './Components/Main';
import Header from './Components/Header';

function App() {
const [mode, setMode] = useState("home");
  return (
    <div className="App"> 
    <Header/>
    <Main/>
    </div>
  );
}

export default App;
