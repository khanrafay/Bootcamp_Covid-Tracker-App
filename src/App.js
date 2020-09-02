import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import Record from './components/Records';
import Countries from './components/Countries';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Record />
      <Countries />
    </div>
  );
}

export default App;
