
import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import './home.css';
import { AppHeader } from '../common/components';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
      </div>
    );
  }
}

export default Home;
