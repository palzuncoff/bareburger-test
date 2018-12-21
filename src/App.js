import React, { Component } from 'react';
import StoresList from './components/stores-list'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <StoresList />
      </div>
    );
  }
}

export default App;
