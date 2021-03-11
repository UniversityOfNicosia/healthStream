import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {GoogleFitAPI} from './api/GoogleFitAPI'

function App() {

  const [ gData, setGoogleData ] = useState([])

  useEffect(()=> {
    async function fetchActivity() {
      const response = await GoogleFitAPI.getActivity()
      setGoogleData(response)
    }
    fetchActivity()
  }, [] )

     
  return (
     <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
