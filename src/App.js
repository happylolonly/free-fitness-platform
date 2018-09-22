import React, { Component } from 'react';
import logo from './logo.svg'

import { Link } from 'react-router-dom';



import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">

      <div className="header">
       <Link to="/">Главная</Link>
       <Link to="/faq">FAQ</Link>
      </div>

      {this.props.children}
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        
      </div>
    );
  }
}

export default App;
