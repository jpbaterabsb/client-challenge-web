import React, { Component } from 'react';
import './App.css';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from './routes'



class App extends Component {
  state = {
    isLoading: true,
    groups: []
  };



  render() {
    return (<Routes/>);
  }
}

export default App;
