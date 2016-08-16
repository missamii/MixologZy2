import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router';
// import { Router, Route, browserHistory } from 'react-router';
import Young from './Young';
import Search from './Search';



class App extends Component {
  render() {
    return (
      <div className="App">
        <center><button className="button"><Link id="link" to="/search">21 + ?</Link></button> <button className="button"><Link id="link" to="/young">20 - ?</Link></button></center>
          {this.props.children}
          {/*This will be the welcome/splash page. Here I'll do a splash img, that will route the user to the actually app or away if they are under 21*/}
      </div>
    );
  }
}

export default App
