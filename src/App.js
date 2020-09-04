import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import Record from './components/Records';
import Countries from './components/Countries';
import Statistics from './components/Statistics';
import Map from './components/Map';
import Playground from './components/Test';
import RadarChart from './components/RadarChart';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Statistics />
      <Countries />
    
      <Map />

    </div>
  );
}

export default App;
