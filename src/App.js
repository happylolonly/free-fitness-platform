import React, { Component } from 'react';
import logo from './logo.svg'

import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';



import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">

      <AppBar position="static" color="primary" className="header">
        <Toolbar>
          <Link to="/">Главная</Link>
          <Link to="/faq">FAQ</Link>
        </Toolbar>
      </AppBar>

      <div className="header">
       
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
