import React, { Component } from 'react';
import logo from './myimage.png';
import './App.css';
import Scene from './UI/Scene/Scene';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Scene></Scene>
      </div>
    );
  }
}

export default App;
