import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <header className="App-header text-center mt-5">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="mt-4">
            Welcome to <strong>RIIMS</strong>
          </p>
          <button className="btn btn-primary mt-3">Learn More</button>
        </header>
      </div>
    </div>
  );
}

export default App;