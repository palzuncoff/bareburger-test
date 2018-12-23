import React, { Component } from 'react';
import StoresList from './components/stores-list'
import Admin from './components/admin'
import { Route, Switch } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <Switch>
          <Route path="/admin" component={Admin}/>
          <Route path="/" component={StoresList} />
      </Switch>
    );
  }
}

export default App;
