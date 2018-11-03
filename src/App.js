import './App.css';

import React, { Component } from 'react';

import Canvas from './canvas/Canvas';
import Navbar from './navbar/Navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Canvas />
        <Navbar />
      </div>
    );
  }
}

export default App;
